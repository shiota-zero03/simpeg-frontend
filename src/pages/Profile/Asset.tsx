import DataTables from "@/components/DataTables";
import {
  Button,
  DateRangePicker,
  Input,
  Pagination,
  RangeValue,
} from "@heroui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { BiReset, BiSearch, BiSolidPlusSquare } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { DMYIndoToFormat } from "@/utils/dateFormater";
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";
import store from "@/redux/store";
import { useGetAllAssetbyHolder } from "@/services/asset/asset";
import { Link } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";
import { LucideInfo } from "lucide-react";

interface AssetProps {
  id: string;
  createdAt: string;
  idBarang: string;
  kodeBarang: string;
  nomorRegistrasi: string;
  namaBarang: string;
  merkTipe: string;

  holders: {
    id: number;
    dokumenPendukung: string;
    noBast: string;
    file: string;
  }[];
}

export default function News() {
  const { role } = store.getState().auth;

  const navigate = useNavigate();
  const limit = 10;
  const [pageIndex, setPageIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [searchKegiatan, setSearchKegiatan] = useState("");
  const [searchNomorRegistrasi, setSearchNomorRegistrasi] = useState("");

  const [rangeDate, setRangeDate] = useState<RangeValue<CalendarDate> | null>(
    null,
  );

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

  const [startData, setStartData] = useState<number>(0);
  const [endData, setEndData] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalData, setTotalData] = useState<number>(0);

  const {
    data: allData,
    isFetching: isFetchingData,
    refetch: refetchData,
  } = useGetAllAssetbyHolder(
    pageIndex + 1,
    limit,
    search,
    searchKegiatan,
    searchNomorRegistrasi,
    formatDateToJakarta(rangeDate?.start),
    formatDateToJakarta(rangeDate?.end),
  );

  const paginatedData: AssetProps[] = useMemo(() => {
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

      return data.response;
    } else {
      return [];
    }
  }, [allData]);

  const columns: ColumnDef<AssetProps>[] = [
    {
      header: "No",
      cell: ({ row }) => {
        const number = pageIndex * limit + row.index + 1;
        return <div>{number}</div>;
      },
      meta: { align: "center", cellWidth: "10" },
    },
    {
      accessorKey: "createdAt",
      header: "Tanggal",
      cell: (info) => DMYIndoToFormat(info.getValue() as string),
    },
    {
      accessorKey: "idBarang",
      header: "ID Barang",
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "kodeBarang",
      header: "Kode Barang",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "nomorRegistrasi",
      header: "Nomor Registrasi",
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "namaBarang",
      header: "Nama Barang",
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "namaBarang",
      header: "Nama Barang",
      cell: (info) => info.getValue() as string,
    },
    {
      header: "Dokumen Pendukung",
      cell: ({ row }) => {
        const { holders } = row.original;
        return holders.length > 0
          ? holders[0].dokumenPendukung === "BAST"
            ? "Dokumen BAST"
            : holders[0].dokumenPendukung === "PAKTA_INTEGRITAS"
              ? "Fakta Integritas"
              : holders[0].dokumenPendukung === "SURAT_PINJAM"
                ? "Surat Izin Pinjam Pakai"
                : holders[0].dokumenPendukung === "SURAT_PEMEGANG_ASET"
                  ? "Surat Izin Pemegang Aset Kendaraan"
                  : "Lainnya"
          : "-";
      },
    },
    {
      header: "Nomor BAST",
      cell: ({ row }) => {
        const { holders } = row.original;
        return holders.length > 0 ? holders[0].noBast || "-" : "-";
      },
    },
    {
      header: "File Dokumen",
      cell: ({ row }) => {
        const { holders } = row.original;
        return holders.length > 0 ? (
          holders[0].file ? (
            <Link to={holders[0].file} target="__blank">
              <FaFileAlt className="text-button-primary" />
            </Link>
          ) : (
            <LucideInfo className="text-danger" />
          )
        ) : (
          "-"
        );
      },
    },
  ];

  const handleSearch = () => {
    setPageIndex(0);
    refetchData();
  };

  const handleReset = () => {
    setSearch("");
    setSearchKegiatan("");
    setSearchNomorRegistrasi("");
    setRangeDate(null);
    setTimeout(() => {
      refetchData();
    }, 100);
  };

  useEffect(() => {
    refetchData();
  }, [pageIndex, refetchData]);

  return (
    <>
      <div className="grid grid-cols-1 gap-8">
        <div className="">
          <div className="flex lg:items-center items-end lg:px-0 px-4 lg:flex-row flex-col justify-between lg:gap-0 gap-2">
            <div className="pt-8 px-4 w-full text-primary shadow-sm">
              <div className="flex lg:flex-row flex-col justify-between gap-2 sm:items-end">
                <div className="flex lg:flex-row flex-col gap-2 items-end w-full">
                  <Input
                    aria-label="searchKegiatan"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    radius="sm"
                    size="sm"
                    variant="bordered"
                    placeholder="Cari id barang disini"
                    startContent={
                      <LuSearch className="text-accent-gray text-xs" />
                    }
                    classNames={{
                      inputWrapper: "border-[0.8px]",
                      input: "text-xs",
                    }}
                  />
                  <Input
                    aria-label="searchKegiatan"
                    value={searchKegiatan}
                    onChange={(e) => {
                      setSearchKegiatan(e.target.value);
                    }}
                    radius="sm"
                    size="sm"
                    variant="bordered"
                    placeholder="Cari kode barang disini"
                    startContent={
                      <LuSearch className="text-accent-gray text-xs" />
                    }
                    classNames={{
                      inputWrapper: "border-[0.8px]",
                      input: "text-xs",
                    }}
                  />
                  <Input
                    aria-label="searchKegiatan"
                    value={searchNomorRegistrasi}
                    onChange={(e) => {
                      setSearchNomorRegistrasi(e.target.value);
                    }}
                    radius="sm"
                    size="sm"
                    variant="bordered"
                    placeholder="Cari nomor registrasi disini"
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
                  {(role === "ADMIN_SPPD" || role === "SUPERUSERS") && (
                    <Button
                      onPress={() => navigate("/sppd/tambah-data")}
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
