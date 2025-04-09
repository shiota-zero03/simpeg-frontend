import { TitleCase } from "@/components/card/TitleCase";
import DataTables from "@/components/DataTables";
import { Button, Input, Pagination, useDisclosure } from "@heroui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { LuImage, LuPencilLine, LuSearch, LuTrash2 } from "react-icons/lu";
import { BiReset, BiSearch, BiSolidPlusSquare } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import DeleteModal from "@/components/modals/UtilsModal/DeleteModal";
import { SuccessToast } from "@/utils/ToastMessage";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { useGetAllBerita } from "@/services/berita";
import { BeritaRes } from "@/interface/responses/berita.interface";

interface BeritaDataProps {
  id: string;
  thumbnail: string;
  slug: string;
  title: string;
  createdAt: string;
  content: string;
}

export default function News() {
  const limit = 5;
  const [pageIndex, setPageIndex] = useState(0);
  const [search, setSearch] = useState("");

  const [startData, setStartData] = useState<number>(0);
  const [endData, setEndData] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);

  const {
    data: allData,
    isFetching: isFetchingData,
    refetch: refetchData,
  } = useGetAllBerita(pageIndex + 1, limit, search);

  const paginatedData: BeritaDataProps[] = useMemo(() => {
    if (allData) {
      const data = allData.data;
      setTotalData(data.pagination.totalData || 0);
      setTotalPages(data.pagination.totalPages || 0);

      const start = pageIndex * limit + 1;
      const end = Math.min(
        (pageIndex + 1) * limit,
        data.pagination.totalData || 0,
      );
      setStartData(start);
      setEndData(end);

      return data.response.map((item: BeritaRes) => ({
        id: item.id,
        thumbnail: item.images,
        slug: item.id,
        title: item.title,
        createdAt: item.createdAt,
        content: item.description,
      }));
    } else {
      return [];
    }
  }, [search, limit, pageIndex, allData]);

  const navigate = useNavigate();

  const columns: ColumnDef<BeritaDataProps>[] = [
    {
      header: "No",
      cell: ({ row }) => {
        const number = pageIndex * limit + row.index + 1;
        return <div>{number}</div>;
      },
      meta: { align: "center", cellWidth: "10" },
    },
    {
      accessorKey: "thumbnail",
      header: "Foto",
      cell: (info) => {
        const picture = info.getValue() as string | null;
        return picture ? (
          <div className="flex items-center justify-center">
            <img
              src={picture}
              alt="news-picture"
              width={80}
              className="rounded-lg"
            />
          </div>
        ) : (
          <LuImage size={80} className="border p-4  rounded-lg" />
        );
      },
      meta: { align: "center" },
    },
    {
      accessorKey: "title",
      header: "Judul",
      cell: (info) => info.getValue() as string,
      meta: { align: "center" },
    },
    {
      accessorKey: "content",
      header: "Konten",
      cell: (info) => {
        const content = info.getValue() as string | null;
        return content
          ? content.length > 60
            ? content.slice(0, 60) + "..."
            : content
          : "-";
      },
      meta: { align: "center" },
    },
    {
      header: "Aksi",
      cell: ({ row }) => {
        const { id } = row.original;
        return (
          <div className="flex items-center gap-2 justify-center">
            <Button
              onPress={() => navigate(`/news/edit-data/${id}`)}
              isIconOnly
              radius="sm"
              size="sm"
              className="bg-alert-info text-info shadow-sm"
            >
              <LuPencilLine size={14} />
            </Button>
            <Button
              onPress={onOpenDelete}
              isIconOnly
              radius="sm"
              size="sm"
              className="bg-alert-danger text-danger shadow-sm"
            >
              <LuTrash2 size={14} />
            </Button>
          </div>
        );
      },
      meta: { align: "center" },
    },
  ];

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const handleSearch = () => {
    setPageIndex(0);
    refetchData();
  };

  const handleReset = () => {
    setSearch("");
    setPageIndex(0);
    setTimeout(() => {
      refetchData();
    }, 100);
  };

  useEffect(() => {
    refetchData();
  }, [pageIndex, refetchData]);

  const [isLoadingDelete, setLoadingDelete] = useState<boolean>(false);
  const handleDelete = () => {
    setLoadingDelete(true);
    setTimeout(() => {
      setPageIndex(0);
      SuccessToast({ text: "Data berhasil dihapus" });
      setLoadingDelete(false);
      onCloseDelete();
    }, 1000);
  };

  return (
    <>
      <BreadcrumbAdmin location="/Berita" />
      <DeleteModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        isLoading={isLoadingDelete}
        handleSubmit={handleDelete}
      />
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <TitleCase
          title="Berita"
          text="Berikut ini menampilkan Daftar Berita yang sudah tersimpan"
        />
        <div className="bg-white shadow-md rounded-xl border min-h-[70vh]">
          <div className="flex lg:items-center items-end lg:px-0 px-4 lg:flex-row flex-col justify-between lg:gap-0 gap-2">
            <div className="pt-8 px-4 w-full text-primary shadow-sm">
              <div className="flex sm:flex-row flex-col justify-between gap-2 sm:items-end">
                <div className="flex sm:flex-row flex-col gap-2 items-end w-full">
                  <Input
                    aria-label="search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPageIndex(0);
                    }}
                    radius="sm"
                    size="sm"
                    variant="bordered"
                    placeholder="Cari judul berita disini"
                    startContent={
                      <LuSearch className="text-accent-gray text-xs" />
                    }
                    classNames={{
                      inputWrapper: "border-[0.8px]",
                      input: "text-xs",
                    }}
                  />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    onPress={handleSearch}
                    variant="solid"
                    radius="sm"
                    size="sm"
                    className="bg-accent-success text-white text-xs"
                    isIconOnly
                  >
                    <BiSearch size={12} />
                  </Button>
                  <Button
                    onPress={handleReset}
                    variant="bordered"
                    color="danger"
                    radius="sm"
                    size="sm"
                    isIconOnly
                    className="border-[0.8px] text-xs"
                  >
                    <BiReset size={12} />
                  </Button>
                  <Button
                    onPress={() => navigate("/news/tambah-data")}
                    variant="solid"
                    radius="sm"
                    size="sm"
                    startContent={<BiSolidPlusSquare size={12} />}
                    className="border-[0.8px] w-24 text-xs bg-button-primary text-white"
                  >
                    Tambah
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="py-8">
              <DataTables
                isLoading={isFetchingData}
                columns={columns}
                data={paginatedData}
              />
            </div>
          </div>
          <div className="pb-4 px-4 flex md:flex-row flex-col items-center justify-between gap-4">
            <span className="sm:text-sm text-xs text-[#8C8C8C]">
              {startData} - {endData} dari {totalData} data
            </span>
            <Pagination
              showControls
              variant="bordered"
              color="primary"
              size="sm"
              radius="sm"
              total={totalPages}
              page={pageIndex + 1}
              initialPage={pageIndex + 1}
              onChange={(page) => setPageIndex(page - 1)}
              classNames={{
                item: "border-[0.8px] text-primary border-accent-gray",
                prev: "sm:flex hidden border-[0.8px] border-accent-gray text-primary",
                next: "sm:flex hidden border-[0.8px] border-accent-gray text-primary",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
