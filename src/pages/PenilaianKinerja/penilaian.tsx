import DataTables from "@/components/DataTables";
import { Button, Input, Pagination } from "@heroui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { LuCalendarDays, LuEye, LuSearch } from "react-icons/lu";
import { BiReset, BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";
import { useGetAllPenilaian } from "@/services/penilaian";
import { PernilaianListRes } from "@/interface/responses/penilaian.interface";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

interface DataProps {
  id: string;
  nip?: string;
  nama: string;
  jabatan?: string;
  totalBobot: number;
  totalNilai: number;
}

export default function ListKaryawan() {
  const limit = 10;
  const [pageIndex, setPageIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [searchMonth, setSearchMonth] = useState(dayjs().format("YYYY-MM"));

  const navigate = useNavigate();

  const [startData, setStartData] = useState<number>(0);
  const [endData, setEndData] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);

  const {
    data: allData,
    isFetching: isFetchingData,
    refetch: refetchData,
  } = useGetAllPenilaian(
    pageIndex + 1,
    limit,
    search,
    searchMonth.split("-")[1],
    searchMonth.split("-")[0],
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

      return data.response.map((item: PernilaianListRes) => ({
        id: item.user.id,
        nip: item.user.nip || "",
        nama: item.user.name || "",
        jabatan: item.user.jabatan ? item.user.jabatan.nameJob : "-",
        totalBobot:
          (item.attitudeBobot || 0) +
          (item.loyaltyBobot || 0) +
          (item.disciplineBobot || 0) +
          (item.cooperationBobot || 0) +
          (item.performanceBobot || 0),
        totalNilai:
          (item.attitudeNilai || 0) +
          (item.loyaltyNilai || 0) +
          (item.disciplineNilai || 0) +
          (item.cooperationNilai || 0) +
          (item.performanceNilai || 0),
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
      accessorKey: "nip",
      header: "NIP",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      accessorKey: "nama",
      header: "Nama Pegawai",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      accessorKey: "jabatan",
      header: "Jabatan",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      accessorKey: "totalBobot",
      header: "Total Penilaian Berdasarkan Bobot",
      cell: (info) => (info.getValue() as number) || 0,
      meta: { align: "center" },
    },
    {
      accessorKey: "totalNilai",
      header: "Total Penilaian Berdasarkan Nilai",
      cell: (info) => (info.getValue() as number) || 0,
      meta: { align: "center" },
    },
    {
      header: "Aksi",
      cell: ({ row }) => {
        const { id } = row.original;
        return (
          <div className="flex items-center gap-2 justify-center">
            <Button
              onPress={() => {
                navigate(
                  `/penilaian-kinerja/detail-data/${id}?m=${searchMonth}`,
                );
              }}
              isIconOnly
              radius="sm"
              size="sm"
              className="bg-alert-warning text-warning shadow-sm"
            >
              <LuEye size={14} />
            </Button>
            <Link
              to={`/penilaian-kinerja/export-pdf/${id}?m=${searchMonth}`}
              target="__blank"
              className="bg-[#FFF3F6] text-danger shadow-sm p-2 rounded-md"
            >
              <FaFilePdf size={14} />
            </Link>
          </div>
        );
      },
      meta: { align: "center" },
    },
  ];

  const handleSearch = () => {
    setPageIndex(0);
    refetchData();
  };

  const handleReset = () => {
    setSearch("");
    setSearchMonth(dayjs().format("YYYY-MM"));
    setPageIndex(0);
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
        <div className="bg-white shadow-md rounded-xl border min-h-[70vh]">
          <div className="flex lg:items-center items-end lg:px-0 px-4 lg:flex-row flex-col justify-between lg:gap-0 gap-2">
            <div className="pt-8 px-4 w-full text-primary shadow-sm">
              <div className="flex md:items-center xl:flex-row flex-col md:justify-between gap-2">
                <h1 className="font-semibold">
                  Daftar Penilaian Kinerja Pegawai
                </h1>
                <div className="flex lg:flex-row flex-col justify-between gap-2 sm:items-end">
                  <div className="flex lg:flex-row flex-col gap-2 items-end w-full">
                    <Input
                      aria-label="search"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      radius="sm"
                      size="sm"
                      variant="bordered"
                      placeholder="Cari nama pegawai disini"
                      startContent={
                        <LuSearch className="text-accent-gray text-xs" />
                      }
                      classNames={{
                        inputWrapper: "border-[0.8px]",
                        input: "text-xs",
                      }}
                    />
                    <Input
                      type="month"
                      aria-label="search"
                      value={searchMonth}
                      onChange={(e) => {
                        if (e.target.value) {
                          setSearchMonth(e.target.value);
                        } else {
                          setSearchMonth(dayjs().format("YYYY-MM"));
                        }
                      }}
                      radius="sm"
                      size="sm"
                      variant="bordered"
                      placeholder="Cari nama pegawai disini"
                      startContent={
                        <LuCalendarDays className="text-accent-gray text-xs" />
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
                  </div>
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
