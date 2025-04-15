import { TitleCase } from "@/components/card/TitleCase";
import DataTables from "@/components/DataTables";
import { SPPDDummy } from "@/constants/DummyData";
import {
  Button,
  DateRangePicker,
  Input,
  Pagination,
  RangeValue,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import {
  LuFileArchive,
  LuPencilLine,
  LuSearch,
  LuTrash2,
} from "react-icons/lu";
import {
  BiErrorAlt,
  BiReset,
  BiSearch,
  BiSolidPlusSquare,
} from "react-icons/bi";
import DeleteModal from "@/components/modals/UtilsModal/DeleteModal";
import { SuccessToast } from "@/utils/ToastMessage";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link } from "react-router-dom";
import { DMYIndoToFormat } from "@/utils/dateFormater";
import { CalendarDate, parseDate } from "@internationalized/date";
import CreateModal from "@/components/modals/SPPDModal/CreatedModal";

interface SPPDprops {
  id: number;
  pegawai: string;
  kegiatan: string;
  waktu: string;
  lokasi: string;
  anggaran: number;
  pengikut: string[];
}

export default function News() {
  const limit = 5;
  const [pageIndex, setPageIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [searchKegiatan, setSearchKegiatan] = useState("");

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const [rangeDate, setRangeDate] = useState<RangeValue<CalendarDate> | null>({
    start: parseDate(firstDayOfMonth.toISOString().split("T")[0]),
    end: parseDate(today.toISOString().split("T")[0]),
  });

  // const formatDateToJakarta = (calendarDate: CalendarDate | null | undefined) => {
  //     if (!calendarDate) return null;
  //     const date = calendarDate.toDate(getLocalTimeZone()); // Konversi ke zona waktu lokal
  //     return new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Jakarta", year: "numeric", month: "2-digit", day: "2-digit" })
  //         .format(date)
  //         .split("/")
  //         .reverse()
  //         .join("-");
  // }

  // const { data: allData, isFetching: isFetchingData, refetch: refetchData } = useGetAllRiwayatObat();
  const allData = SPPDDummy;

  const data: SPPDprops[] = useMemo(() => {
    if (allData) {
      return allData;
    } else {
      return [];
    }
  }, [allData]);

  const paginatedData = useMemo(() => {
    return data.slice(pageIndex * limit, (pageIndex + 1) * limit);
  }, [data, limit, pageIndex]);

  const startData = paginatedData.length > 0 ? pageIndex * limit + 1 : 0;
  const endData = Math.min((pageIndex + 1) * limit, data.length);
  const totalPages = Math.ceil(data.length / limit);

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
      accessorKey: "pegawai",
      header: "Pegawai",
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "kegiatan",
      header: "Kegiatan",
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "waktu",
      header: "Waktu",
      cell: (info) =>
        info.getValue() ? DMYIndoToFormat(info.getValue() as string) : "-",
    },
    {
      accessorKey: "lokasi",
      header: "Lokasi",
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "anggaran",
      header: "Anggaran",
      cell: (info) =>
        "Rp " + ((info.getValue() as number) || 0).toLocaleString("id-ID"),
    },
    {
      accessorKey: "pengikut",
      header: "Pengikut",
      cell: (info) => {
        const pengikut = info.getValue() as string[];
        return (
          <ul className="px-6">
            {pengikut.length > 0 ? (
              pengikut.map((item, index) => (
                <li className="list-disc" key={index}>
                  {item}
                </li>
              ))
            ) : (
              <li className="list-disc text-danger italic">
                Tidak ada pengikut
              </li>
            )}
          </ul>
        );
      },
    },
    {
      accessorKey: "file",
      header: "File",
      cell: (info) => {
        const file = info.getValue() as string | null;
        if (file) {
          return (
            <Link to={file} target="__blank">
              <LuFileArchive
                className="border p-1 rounded-md text-accent-primary border-accent-primary"
                size={20}
              />
            </Link>
          );
        } else {
          return (
            <Tooltip
              content="Tidak ada file"
              radius="sm"
              color="danger"
              placement="top-start"
              size="sm"
            >
              <BiErrorAlt
                className="border p-1 rounded-md text-danger border-danger"
                size={20}
              />
            </Tooltip>
          );
        }
      },
    },
    {
      header: "Aksi",
      cell: () => {
        return (
          <div className="flex items-center gap-2 justify-center">
            <Button
              onPress={onOpenCreate}
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
  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure();

  const handleReset = () => {
    setSearch("");
    setSearchKegiatan("");
    setRangeDate({
      start: parseDate(firstDayOfMonth.toISOString().split("T")[0]),
      end: parseDate(today.toISOString().split("T")[0]),
    });
  };

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

  const handleClose = () => {
    setPageIndex(0);
    onCloseCreate();
    onCloseDelete();
    onCloseCreate();
  };

  return (
    <>
      <BreadcrumbAdmin location="/SPPD" />
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
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <TitleCase
          title="SPPD"
          text="Berikut ini menampilkan Daftar Surat Perintah Perjalanan Dinas "
        />
        <div className="bg-white shadow-md rounded-xl border">
          <div className="flex lg:items-center items-end lg:px-0 px-4 lg:flex-row flex-col justify-between lg:gap-0 gap-2">
            <div className="pt-8 px-4 w-full text-primary shadow-sm">
              <div className="flex lg:flex-row flex-col justify-between gap-2 sm:items-end">
                <div className="flex lg:flex-row flex-col gap-2 items-end w-full">
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
                    aria-label="searchKegiatan"
                    value={searchKegiatan}
                    onChange={(e) => {
                      setSearchKegiatan(e.target.value);
                      setPageIndex(0);
                    }}
                    radius="sm"
                    size="sm"
                    variant="bordered"
                    placeholder="Cari nama kegiatan disini"
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
                    onPress={handleReset}
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
                    onPress={onOpenCreate}
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
                isLoading={false}
                columns={columns}
                data={paginatedData}
              />
            </div>
          </div>
          <div className="pb-4 px-4 flex md:flex-row flex-col items-center justify-between gap-4">
            <span className="sm:text-sm text-xs text-[#8C8C8C]">
              {startData} - {endData} dari {data.length} data
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
