import { TitleCase } from "@/components/card/TitleCase";
import DataTables from "@/components/DataTables";
import { Button, Input, Pagination, useDisclosure } from "@heroui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { LuEye, LuSearch, LuTrash2 } from "react-icons/lu";
import { BiReset, BiSearch, BiSolidPlusSquare } from "react-icons/bi";
import DeleteModal from "@/components/modals/UtilsModal/DeleteModal";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { useNavigate } from "react-router-dom";
import { SuratPemanggilanRes } from "@/interface/responses/surat.interface";
import { useDeleteSuratPemanggilan } from "@/services/surat/pemanggilan";
import { DMYIndoToFormat } from "@/utils/dateFormater";
import { FaFilePdf } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetAllSuratPemanggilan } from "@/services/surat/pemanggilan";
import KopSuratModal from "@/components/modals/Surat/KopSuratModal";
import { LucideMail } from "lucide-react";
import { useGetKopSuratBySlug } from "@/services/surat/kopsurat";

interface DataProps {
  id: number;
  nomorSurat: string;
  nomorPemanggilan: string;
  tanggalSurat: string;
  waktu: string;
  pemanggil: string;
  diPanggil: string;
}

export default function SuratPemanggilan() {
  const limit = 10;
  const [pageIndex, setPageIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [searchNo, setSearchNo] = useState("");

  const navigate = useNavigate();

  const [startData, setStartData] = useState<number>(0);
  const [endData, setEndData] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalData, setTotalData] = useState<number>(0);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const {
    data: allData,
    isFetching: isFetchingData,
    refetch: refetchData,
  } = useGetAllSuratPemanggilan(pageIndex + 1, limit, search, searchNo);

  const {
    data: allKop,
    isFetching: isFetchingKop,
    refetch: refetchKop,
  } = useGetKopSuratBySlug("SURAT_PEMANGGILAN");

  const kopSuratData = useMemo(() => {
    if (!allKop) return null;
    return allKop.data;
  }, [allKop]);

  useEffect(() => {
    refetchKop();
  }, []);

  const paginatedData: DataProps[] = useMemo(() => {
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

      return data.response.map((item: SuratPemanggilanRes) => ({
        id: item.id,
        nomorSurat: item.nomorSurat,
        nomorPemanggilan: item.nomorPemanggilan,
        tanggalSurat: item.tanggalSurat,
        waktu: item.waktu,
        pemanggil: item.pemanggil,
        diPanggil: item.diPanggil,
      }));
    } else {
      return [];
    }
  }, [search, limit, pageIndex, allData]);

  const columns: ColumnDef<DataProps>[] = [
    {
      header: "No",
      cell: ({ row }) => {
        const number = pageIndex * limit + row.index + 1;
        return <div>{number}</div>;
      },
      meta: { align: "center", cellWidth: "10" },
    },
    {
      accessorKey: "tanggalSurat",
      header: "Tanggal",
      cell: (info) =>
        info.getValue() ? DMYIndoToFormat(info.getValue() as string) : "-",
      // meta: { align: "center" },
    },
    {
      accessorKey: "nomorSurat",
      header: "Nomor Surat",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      accessorKey: "nomorPemanggilan",
      header: "Surat Pemanggilan",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      accessorKey: "pemanggil",
      header: "Untuk Menghadap",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      header: "Aksi",
      cell: ({ row }) => {
        const { id } = row.original;
        return (
          <div className="flex items-center gap-2 justify-center">
            <Button
              onPress={() => {
                navigate(`/surat-pemanggilan/detail-data/${id}`);
              }}
              isIconOnly
              radius="sm"
              size="sm"
              className="bg-alert-warning text-warning shadow-sm"
            >
              <LuEye size={14} />
            </Button>
            <Link
              target="__blank"
              to={`/surat-pemanggilan/export-data/${id}`}
              className="bg-alert-info text-info shadow-sm p-2 rounded-md"
            >
              <FaFilePdf size={14} />
            </Link>
            <Button
              onPress={() => {
                setSelectedId(id);
                onOpenDelete();
              }}
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

  const {
    isOpen: isOpenKop,
    onOpen: onOpenKop,
    onClose: onCloseKop,
  } = useDisclosure();

  const handleSearch = () => {
    setPageIndex(0);
    refetchData();
  };

  const handleReset = () => {
    setSearch("");
    setSearchNo("");
    setPageIndex(0);
    setTimeout(() => {
      refetchData();
    }, 100);
  };

  useEffect(() => {
    refetchData();
  }, [pageIndex, refetchData]);

  const [isLoadingDelete, setLoadingDelete] = useState<boolean>(false);
  const { mutate: mutateDelete } = useDeleteSuratPemanggilan();

  const handleDelete = () => {
    if (isLoadingDelete) return;

    setLoadingDelete(true);

    try {
      mutateDelete(
        { id: String(selectedId) },
        {
          onSuccess() {
            SuccessToast({ text: "Data berhasil dihapus" });
            setLoadingDelete(false);
            setSelectedId(null);
            onCloseDelete();
            setPageIndex(0);
            setTimeout(() => {
              refetchData();
            }, 100);
          },
          onError(error) {
            setLoadingDelete(false);
            ErrorToast({
              text:
                error.response?.data.message ||
                "Terjadi kesalahan saat mengirim data",
            });
            throw error;
          },
        },
      );
    } catch (error) {
      ErrorToast({ text: "Terjadi kesalahan di server" });
      setLoadingDelete(false);
      throw error;
    }
  };

  return (
    <>
      <BreadcrumbAdmin location="/Surat-Pemanggilan" />
      <DeleteModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        isLoading={isLoadingDelete}
        handleSubmit={handleDelete}
      />
      {!isFetchingKop && kopSuratData && (
        <KopSuratModal
          isOpen={isOpenKop}
          onClose={onCloseKop}
          id={kopSuratData?.id}
          fileShow={kopSuratData?.kopSurat || ""}
          handleClose={() => {
            onCloseKop();
            refetchKop();
          }}
        />
      )}
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="flex items-center justify-between gap-2 md:flex-row flex-col">
          <TitleCase
            title="Daftar Surat Pemanggilan"
            text="Berikut ini Mengelola Daftar Surat Pemanggilan"
          />
          <Button
            onPress={onOpenKop}
            className="bg-alert-warning text-warning font-semibold flex items-center gap-2 border border-warning"
            size="sm"
          >
            <LucideMail size={16} /> Kop Surat
          </Button>
        </div>
        <div className="bg-white shadow-md rounded-xl border min-h-[70vh]">
          <div className="flex lg:items-center items-end lg:px-0 px-4 lg:flex-row flex-col justify-between lg:gap-0 gap-2">
            <div className="pt-8 px-4 w-full text-primary shadow-sm">
              <div className="flex sm:flex-row flex-col justify-between gap-2 sm:items-end">
                <div className="flex sm:flex-row flex-col gap-2 items-end w-full">
                  <Input
                    aria-label="search"
                    value={searchNo}
                    onChange={(e) => {
                      setSearchNo(e.target.value);
                    }}
                    radius="sm"
                    size="sm"
                    variant="bordered"
                    placeholder="Cari nomor surat disini"
                    startContent={
                      <LuSearch className="text-accent-gray text-xs" />
                    }
                    classNames={{
                      inputWrapper: "border-[0.8px]",
                      input: "text-xs",
                    }}
                  />
                  <Input
                    aria-label="search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    radius="sm"
                    size="sm"
                    variant="bordered"
                    placeholder="Cari berdasarkan nama disini"
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
                    onPress={() => navigate(`/surat-pemanggilan/tambah-data`)}
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
