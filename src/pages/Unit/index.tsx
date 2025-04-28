import { TitleCase } from "@/components/card/TitleCase";
import DataTables from "@/components/DataTables";
import { Button, Input, Pagination, useDisclosure } from "@heroui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { LuPencilLine, LuSearch, LuTrash2 } from "react-icons/lu";
import { BiReset, BiSearch, BiSolidPlusSquare } from "react-icons/bi";
import DeleteModal from "@/components/modals/UtilsModal/DeleteModal";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import CreateModal from "@/components/modals/UnitModal/CreatedModal";
import { useDeleteUnit, useGetAllUnit } from "@/services/unit";
import { UnitRes } from "@/interface/responses/unit.interface";
import UpdateModal from "@/components/modals/UnitModal/UpdateModal";

interface DataProps {
  id: number;
  idUnit: string;
  capacity: number;
  nameUnit: string;
  description: string | null;
}

export default function Unit() {
  const limit = 20;
  const [pageIndex, setPageIndex] = useState(0);
  const [search, setSearch] = useState("");

  const [startData, setStartData] = useState<number>(0);
  const [endData, setEndData] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalData, setTotalData] = useState<number>(0);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const {
    data: allData,
    isFetching: isFetchingData,
    refetch: refetchData,
  } = useGetAllUnit(pageIndex + 1, limit, search);

  const paginatedData: DataProps[] = useMemo(() => {
    if (allData) {
      const data = allData.data;
      setTotalData(data.pagination.totalData || 0);
      setTotalPages(data.pagination.totalPages || 1);

      const start = pageIndex * limit + 1;
      const end = Math.min(
        (pageIndex + 1) * limit,
        data.pagination.totalData || 0,
      );

      setStartData(start);
      setEndData(end);

      return data.response
        .sort((a, b) => a.id - b.id)
        .map((item: UnitRes) => ({
          id: item.id,
          idUnit: item.idUnit,
          capacity: item.ketersediaan || 0,
          nameUnit: item.nameUnit,
          description: item.description,
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
      accessorKey: "idUnit",
      header: "ID Unit",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      accessorKey: "nameUnit",
      header: "Nama Unit",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      accessorKey: "description",
      header: "Tugas dan Fungsi",
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
                setSelectedId(id);
                onOpenUpdate();
              }}
              isIconOnly
              radius="sm"
              size="sm"
              className="bg-alert-info text-info shadow-sm"
            >
              <LuPencilLine size={14} />
            </Button>
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
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure();
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
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
  const { mutate: mutateDelete } = useDeleteUnit();

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

  const handleClose = () => {
    setSelectedId(null);
    setPageIndex(0);
    onCloseCreate();
    onCloseDelete();
    onCloseUpdate();
    refetchData();
  };

  return (
    <>
      <BreadcrumbAdmin location="/Unit" />
      {selectedId && (
        <DeleteModal
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          isLoading={isLoadingDelete}
          handleSubmit={handleDelete}
        />
      )}
      <CreateModal
        isOpen={isOpenCreate}
        onClose={onCloseCreate}
        handleClose={handleClose}
      />
      {selectedId && (
        <UpdateModal
          id={selectedId}
          isOpen={isOpenUpdate}
          onClose={onCloseUpdate}
          handleClose={handleClose}
        />
      )}
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <TitleCase
          title="Data Unit"
          text="Berikut ini menampilkan Daftar dari Master Data Unit"
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
                    }}
                    radius="sm"
                    size="sm"
                    variant="bordered"
                    placeholder="Cari nama unit disini"
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
                    onPress={() => onOpenCreate()}
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
