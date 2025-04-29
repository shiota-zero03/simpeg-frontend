import DataTables from "@/components/DataTables";
import { Button, Input, Pagination, useDisclosure } from "@heroui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { LuPencilLine, LuSearch, LuTrash2 } from "react-icons/lu";
import { BiReset, BiSearch, BiSolidPlusSquare } from "react-icons/bi";
import DeleteModal from "@/components/modals/UtilsModal/DeleteModal";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import store from "@/redux/store";
import CreateModal from "@/components/modals/Asset/pembelanjaan/item-belanja/CreatedModal";
import UpdateModal from "@/components/modals/Asset/pembelanjaan/item-belanja/UpdateModal";
import {
  useDeleteDataBelanja,
  useGetAllDataBelanja,
} from "@/services/asset/asset-pembelanjaan/data-pembelanjaan";
import { DMYIndoToFormat } from "@/utils/dateFormater";

interface DataProps {
  id: number;
  name: string;
  namaBarang: string;
  jumlah: number;
  satuan: string;
  hargaPerItem: number;
  jumlahPagu: number;
  tanggal: string;
  dataBelanja: {
    id: number;
    namaBelanja: string;
    kegiatan: {
      id: number;
      name: string;
    };
    subKegiatan: {
      id: number;
      name: string;
    };
  };
}

export default function AssetIndex() {
  const role = store.getState().auth.role as string;

  const limit = 10;
  const [pageIndex, setPageIndex] = useState(0);
  const [search, setSearch] = useState("");

  const [startData, setStartData] = useState<number>(0);
  const [endData, setEndData] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalData, setTotalData] = useState<number>(0);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const {
    data: allData,
    isFetching: isFetchingData,
    refetch: refetchData,
  } = useGetAllDataBelanja(pageIndex + 1, limit, search);

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

      return data.response;
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
      accessorKey: "tanggal",
      header: "Tanggal",
      cell: (info) => DMYIndoToFormat(info.getValue() as string),
      // meta: { align: "center" },
    },
    {
      accessorKey: "namaBarang",
      header: "Nama Item Belanja",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      accessorKey: "jumlah",
      header: "Jumlah Item",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      accessorKey: "satuan",
      header: "Satuan Item",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      header: "Aksi",
      cell: ({ row }) => {
        const { id } = row.original;
        return (
          <div className="flex items-center gap-2 justify-center">
            {(role === "SUPERUSERS" || role === "ADMIN_ASSET") && (
              <Button
                onPress={() => {
                  setSelectedId(String(id));
                  setTimeout(() => {
                    onOpenUpdate();
                  }, 100);
                }}
                isIconOnly
                radius="sm"
                size="sm"
                className="bg-alert-info text-info shadow-sm"
              >
                <LuPencilLine size={14} />
              </Button>
            )}
            {(role === "SUPERUSERS" || role === "ADMIN_ASSET") && (
              <Button
                onPress={() => {
                  setSelectedId(String(id));
                  onOpenDelete();
                }}
                isIconOnly
                radius="sm"
                size="sm"
                className="bg-alert-danger text-danger shadow-sm"
              >
                <LuTrash2 size={14} />
              </Button>
            )}
          </div>
        );
      },
      meta: { align: "center" },
    },
  ];

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
  const { mutate: mutateDelete } = useDeleteDataBelanja();

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
      <DeleteModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        isLoading={isLoadingDelete}
        handleSubmit={handleDelete}
      />

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

      <div>
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
                  placeholder="Cari disini"
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
                {(role === "SUPERUSERS" || role === "ADMIN_ASSET") && (
                  <Button
                    onPress={onOpenCreate}
                    variant="solid"
                    radius="sm"
                    size="sm"
                    startContent={<BiSolidPlusSquare size={12} />}
                    className="border-[0.8px] w-24 text-xs bg-button-primary text-white"
                  >
                    Tambah
                  </Button>
                )}
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
    </>
  );
}
