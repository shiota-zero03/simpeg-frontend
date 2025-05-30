import DataTables from "@/components/DataTables";
import {
  Button,
  CalendarDate,
  DateRangePicker,
  Input,
  Pagination,
  RangeValue,
  useDisclosure,
} from "@heroui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { LuPencilLine, LuSearch, LuTrash2 } from "react-icons/lu";
import { BiReset, BiSearch } from "react-icons/bi";
import DeleteModal from "@/components/modals/UtilsModal/DeleteModal";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { useNavigate } from "react-router-dom";
import store from "@/redux/store";
import { useDeleteAsset, useGetAllAsset } from "@/services/asset/asset";
import { AssetRes } from "@/interface/responses/asset.interface";
import { DMYIndoToFormat } from "@/utils/dateFormater";
import { getLocalTimeZone } from "@internationalized/date";
import { LucideEye } from "lucide-react";
import ViewModal from "@/components/modals/Asset/DeetailAsset";
import { FaFileExcel } from "react-icons/fa";
import { Link } from "react-router-dom";

interface DataProps {
  id: string;
  tanggal: string;
  idBarang: string;
  kodeBarang: string;
  nama: string;
  noRegistrasi: string;
  kategori: string;
  harga: string;
  merk: string;
  status: boolean | null;
}

export default function AssetIndex() {
  const role = store.getState().auth.role as string;

  const limit = 10;
  const [pageIndex, setPageIndex] = useState(0);
  const [search, setSearch] = useState("");

  const [rangeDate, setRangeDate] = useState<RangeValue<CalendarDate> | null>(null);

  const formatDateToJakarta = (
    calendarDate: CalendarDate | null | undefined,
  ) => {
    if (!calendarDate) return null;
    const date = calendarDate.toDate(getLocalTimeZone()); // Konversi ke zona waktu lokal
    return new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .format(date)
      .split("/")
      .reverse()
      .join("-");
  };

  const navigate = useNavigate();

  const [startData, setStartData] = useState<number>(0);
  const [endData, setEndData] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalData, setTotalData] = useState<number>(0);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const {
    data: allData,
    isFetching: isFetchingData,
    refetch: refetchData,
  } = useGetAllAsset(
    pageIndex + 1,
    limit,
    search,
    rangeDate && formatDateToJakarta(rangeDate.start),
    rangeDate && formatDateToJakarta(rangeDate.end),
  );

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

      return data.response.map((item: AssetRes) => ({
        id: item.id,
        tanggal: DMYIndoToFormat(item.createdAt),
        nama: item.namaBarang,
        idBarang: item.idBarang,
        kodeBarang: item.kodeBarang,
        noRegistrasi: item.nomorRegistrasi,
        kategori: item.kategori,
        harga: item.harga ? `Rp ${item.harga.toLocaleString("id-ID")}` : "-",
        merk: item.merkTipe,
        status: item.status,
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
      accessorKey: "tanggal",
      header: "Tanggal",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      accessorKey: "nama",
      header: "Nama Barang",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      accessorKey: "idBarang",
      header: "ID Barang",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      accessorKey: "kodeBarang",
      header: "Kode Barang",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      accessorKey: "noRegistrasi",
      header: "No. Registrasi",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      accessorKey: "kategori",
      header: "Kategori",
      cell: (info) =>
        (info.getValue() as string) === "PERALATAN"
          ? "Peralatan Kantor / Mesin"
          : "Kendaraan",
      // meta: { align: "center" },
    },
    {
      accessorKey: "harga",
      header: "Harga",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      accessorKey: "merk",
      header: "Merk/Tipe",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      header: "Aksi",
      cell: ({ row }) => {
        const { id, status } = row.original;
        return (
          <div className="flex items-center gap-2 justify-center">
            <Button
              onPress={() => {
                setSelectedId(id);
                setTimeout(() => {
                  onOpenView();
                }, 100);
              }}
              isIconOnly
              radius="sm"
              size="sm"
              className="bg-alert-warning text-warning shadow-sm"
            >
              <LucideEye size={14} />
            </Button>
            {(role === "SUPERUSERS" || role === "ADMIN_ASSET") && (
              <Button
                onPress={() => {
                  navigate(`/manajemen-aset/edit-aset/${id}`);
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
                isDisabled={status === true}
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
            )}
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
    isOpen: isOpenView,
    onOpen: onOpenView,
    onClose: onCloseView,
  } = useDisclosure();

  const handleSearch = () => {
    setPageIndex(0);
    refetchData();
  };

  const handleReset = () => {
    setSearch("");
    setRangeDate(null);
    setPageIndex(0);
    setTimeout(() => {
      refetchData();
    }, 100);
  };

  useEffect(() => {
    refetchData();
  }, [pageIndex, refetchData]);

  const [isLoadingDelete, setLoadingDelete] = useState<boolean>(false);
  const { mutate: mutateDelete } = useDeleteAsset();

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
      <DeleteModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        isLoading={isLoadingDelete}
        handleSubmit={handleDelete}
      />
      {selectedId && (
        <ViewModal id={selectedId} isOpen={isOpenView} onClose={onCloseView} />
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
                  placeholder="Cari nama barang/merk"
                  startContent={
                    <LuSearch className="text-accent-gray text-xs" />
                  }
                  classNames={{
                    inputWrapper: "border-[0.8px]",
                    input: "text-xs",
                  }}
                />
                <DateRangePicker
                  aria-label="range-date"
                  value={rangeDate}
                  onChange={setRangeDate}
                  radius="sm"
                  size="sm"
                  variant="bordered"
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
                  <Link
                    to={
                      `/manajemen-aset/export-aset`
                    }
                    target="__blank"
                    className="border-[0.8px] w-24 text-xs bg-success text-white flex items-center justify-center rounded-lg p-2 gap-2"
                  >
                    <FaFileExcel size={12} /> Export
                  </Link>
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
