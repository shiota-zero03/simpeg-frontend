/* eslint-disable */
import { TitleCase } from "@/components/card/TitleCase";
import DataTables from "@/components/DataTables";
import { SPPDDummy } from "@/constants/DummyData";
import {
  Button,
  DateRangePicker,
  Input,
  Pagination,
  RangeValue,
  Tab,
  Tabs,
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
import { useNavigate } from "react-router-dom";
import DeleteModal from "@/components/modals/UtilsModal/DeleteModal";
import { SuccessToast } from "@/utils/ToastMessage";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link } from "react-router-dom";
import { DMYIndoToFormat } from "@/utils/dateFormater";
import { CalendarDate, parseDate } from "@internationalized/date";
import CreateModal from "@/components/modals/SPPSModal/CreatedModal";

interface SPPDprops {
  id: number;
  pegawai: string;
  kegiatan: string;
  waktu: string;
  lokasi: string;
  anggaran: number;
  pengikut: string[];
}

export default function BobotKinerja() {
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
  }, [search, limit, allData]);

  const paginatedData = useMemo(() => {
    return data.slice(pageIndex * limit, (pageIndex + 1) * limit);
  }, [data, limit, pageIndex]);

  const startData = paginatedData.length > 0 ? pageIndex * limit + 1 : 0;
  const endData = Math.min((pageIndex + 1) * limit, data.length);
  const totalPages = Math.ceil(data.length / limit);

  const navigate = useNavigate();

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
          <ul>
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
      <BreadcrumbAdmin location="/Penilaian Kinerja" />
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
          title="Penilaian Kinerja"
          text="Berikut ini menampilkan Penilaian Kinerja Berdasarkan Bobot"
        />
        <div className="bg-white shadow-md rounded-xl border min-h-[64vh]">
          <div className="md:p-4 p-2">
            <Tabs
              variant="bordered"
              radius="sm"
              size="sm"
              classNames={{
                tabList: "!border-[0.8px] !rounded-lg p-1",
                tab: "!rounded-lg",
                tabContent:
                  "group-data-[selected=true]:!text-accent-primary group-data-[selected=true]:!font-semibold",
              }}
            >
              <Tab title="Rekap Penilaian" className="!rounded-sm">
                <div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th
                            className="border-y-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal"
                            rowSpan={3}
                          >
                            No
                          </th>
                          <th
                            className="border-y-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal"
                            colSpan={5}
                          >
                            Rekap Kategori Penilaian Keseluruhan Pegawai
                          </th>
                          <th
                            className="border-y-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal"
                            rowSpan={3}
                          >
                            Total
                          </th>
                        </tr>
                        <tr>
                          <th className="border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#FFF3F6]">
                            Sangat Rendah
                          </th>
                          <th className="border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#FFF9D9]">
                            Rendah
                          </th>
                          <th className="border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#F1F8FF]">
                            Sedang
                          </th>
                          <th className="border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#E1FFDD]">
                            Tinggi
                          </th>
                          <th className="border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#CEFFC7]">
                            Sangat Tinggi
                          </th>
                        </tr>
                        <tr>
                          <th className="border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#FFF3F6]">
                            {"<= 50"}
                          </th>
                          <th className="border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#FFF9D9]">
                            51 - 60
                          </th>
                          <th className="border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#F1F8FF]">
                            61 - 70
                          </th>
                          <th className="border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#E1FFDD]">
                            71 - 80
                          </th>
                          <th className="border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#CEFFC7]">
                            81 - 100
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center sm:text-sm text-xs min-w-6 p-2 border-b-2 border-accent-gray">
                            1
                          </td>
                          <td className="text-center sm:text-sm text-xs min-w-32 p-2 border-b-2 border-accent-gray">
                            0
                          </td>
                          <td className="text-center sm:text-sm text-xs min-w-32 p-2 border-b-2 border-accent-gray">
                            0
                          </td>
                          <td className="text-center sm:text-sm text-xs min-w-32 p-2 border-b-2 border-accent-gray">
                            0
                          </td>
                          <td className="text-center sm:text-sm text-xs min-w-32 p-2 border-b-2 border-accent-gray">
                            0
                          </td>
                          <td className="text-center sm:text-sm text-xs min-w-32 p-2 border-b-2 border-accent-gray">
                            0
                          </td>
                          <td className="text-center sm:text-sm text-xs min-w-16 p-2 border-b-2 border-accent-gray">
                            0
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <br />
                  <div className="overflow-x-auto">
                    <table className="w-auto">
                      <tbody>
                        <tr>
                          <td className="p-2 sm:text-sm text-xs min-w-24 text-gray-600 font-normal bg-[#FFF3F6]">
                            {"Nilai <= 50"}
                          </td>
                          <td className="p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#FFF3F6]">
                            |
                          </td>
                          <td className="p-2 sm:text-sm text-xs min-w-96 text-gray-600 font-normal bg-[#FFF3F6]">
                            Tidak dapat direkomendasikan
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 sm:text-sm text-xs min-w-24 text-gray-600 font-normal bg-[#FFF9D9]">
                            {"Nilai 51 - 60"}
                          </td>
                          <td className="p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#FFF9D9]">
                            |
                          </td>
                          <td className="p-2 pe-8 sm:text-sm text-xs min-w-96 text-gray-600 font-normal bg-[#FFF9D9]">
                            Dapat dipertimbangkan untuk direkomendasikan dengan
                            catatan
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 sm:text-sm text-xs min-w-24 text-gray-600 font-normal bg-[#F1F8FF]">
                            {"Nilai 61 - 70"}
                          </td>
                          <td className="p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#F1F8FF]">
                            |
                          </td>
                          <td className="p-2 sm:text-sm text-xs min-w-96 text-gray-600 font-normal bg-[#F1F8FF]">
                            Dapat dipertimbangkan untuk direkomendasikan dengan
                            catatan
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 sm:text-sm text-xs min-w-24 text-gray-600 font-normal bg-[#E1FFDD]">
                            {"Nilai 71 - 80"}
                          </td>
                          <td className="p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#E1FFDD]">
                            |
                          </td>
                          <td className="p-2 sm:text-sm text-xs min-w-96 text-gray-600 font-normal bg-[#E1FFDD]">
                            Direkomendasikan dengan catatan
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 sm:text-sm text-xs min-w-24 text-gray-600 font-normal bg-[#CEFFC7]">
                            {"Nilai 81 - 100"}
                          </td>
                          <td className="p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#CEFFC7]">
                            |
                          </td>
                          <td className="p-2 sm:text-sm text-xs min-w-96 text-gray-600 font-normal bg-[#CEFFC7]">
                            Direkomendasikan
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Tab>
              <Tab title="Daftar Penialian" className="!rounded-sm"></Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
