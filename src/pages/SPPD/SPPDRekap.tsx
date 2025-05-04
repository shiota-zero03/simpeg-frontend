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
import { BiReset, BiSearch } from "react-icons/bi";
import { DMYIndoToFormat } from "@/utils/dateFormater";
import {
  CalendarDate,
  getLocalTimeZone,
  parseDate,
} from "@internationalized/date";
import { useGetAllSPPDRekap } from "@/services/sppd";
import { SPPDRekapRes } from "@/interface/responses/sppd.interface";
import store from "@/redux/store";
import { FaFileExcel } from "react-icons/fa";
import { Link } from "react-router-dom";

interface SPPDprops {
  id: number;
  nomorSurat: string;
  nama: string;
  nomorRek: string;
  kegiatan: string;
  waktu: string;
  tipe: string;
  lokasi: string;
  anggaran: number;
}

export default function News() {
  const { role } = store.getState().auth;
  const limit = 10;
  const [pageIndex, setPageIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [searchKegiatan, setSearchKegiatan] = useState("");

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const [rangeDate, setRangeDate] = useState<RangeValue<CalendarDate> | null>({
    start: parseDate(firstDayOfMonth.toISOString().split("T")[0]),
    end: parseDate(today.toISOString().split("T")[0]),
  });

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
  } = useGetAllSPPDRekap(
    pageIndex + 1,
    limit,
    search,
    "", //PERJALANAN_DALAM_KOTA
    searchKegiatan,
    formatDateToJakarta(rangeDate?.start),
    formatDateToJakarta(rangeDate?.end),
  );

  const paginatedData: SPPDprops[] = useMemo(() => {
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

      return data.response.map((item: SPPDRekapRes) => {
        let anggaran = 0;
        anggaran +=
          (item.budgets[0]?.dailyAllowance ||
            0 * item.budgets[0]?.volDailyAllowance ||
            0) +
          (item.budgets[0]?.transport ||
            0 * item.budgets[0]?.volTransport ||
            0) +
          (item.budgets[0]?.representatif ||
            0 * item.budgets[0]?.volRepresentatif ||
            0);

        return {
          id: item.id,
          nomorSurat: item.sppd.nomorSurat,
          nama: item.user.name,
          nomorRek: item.sppd.kodeRekening,
          kegiatan: item.sppd.activity,
          waktu: `${item.sppd.startDate ? DMYIndoToFormat(item.sppd.startDate) : ""} - ${item.sppd.endDate ? DMYIndoToFormat(item.sppd.endDate) : ""}`,
          tipe: item.sppd.type,
          lokasi: item.sppd.location,
          anggaran: anggaran,
        };
      });
    } else {
      return [];
    }
  }, [allData]);

  const columns: ColumnDef<SPPDprops>[] = [
    {
      header: "No",
      cell: ({ row }) => {
        const number = pageIndex * limit + row.index + 1;
        return <div>{number}</div>;
      },
      meta: { align: "center", cellWidth: "10" },
    },
    {
      accessorKey: "nomorSurat",
      header: "Nomor Surat",
      cell: (info) => info.getValue() as string,
    },
    {
      header: "Nama",
      cell: ({ row }) => {
        const { nama } = row.original;
        return nama;
      },
    },
    {
      header: "Nomor Rekening",
      cell: ({ row }) => {
        const { nomorRek } = row.original;
        return nomorRek;
      },
    },
    {
      accessorKey: "kegiatan",
      header: "Kegiatan",
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "waktu",
      header: "Waktu",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "lokasi",
      header: "Lokasi",
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "anggaran",
      header: "Total Anggaran",
      cell: (info) =>
        "Rp " + ((info.getValue() as number) || 0).toLocaleString("id-ID"),
    },
  ];

  const handleSearch = () => {
    setPageIndex(0);
    refetchData();
  };

  const handleReset = () => {
    setSearch("");
    setSearchKegiatan("");
    setRangeDate({
      start: parseDate(firstDayOfMonth.toISOString().split("T")[0]),
      end: parseDate(today.toISOString().split("T")[0]),
    });
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
                    value={searchKegiatan}
                    onChange={(e) => {
                      setSearchKegiatan(e.target.value);
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
                    <Link
                      to={`/sppd/export-data?sd=${rangeDate && formatDateToJakarta(rangeDate.start)}&ed=${rangeDate && formatDateToJakarta(rangeDate.end)}`}
                      target="__blank"
                      className="border-[0.8px] w-24 text-xs border-button-primary text-button-primary flex items-center justify-center gap-2 py-1.5 rounded-md"
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
