import DataTables from "@/components/DataTables";
import {
  Button,
  DateRangePicker,
  Input,
  Pagination,
  RangeValue,
  useDisclosure,
} from "@heroui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { LuPencilLine, LuSearch, LuTrash2 } from "react-icons/lu";
import { BiReset, BiSearch, BiSolidPlusSquare } from "react-icons/bi";
import DeleteModal from "@/components/modals/UtilsModal/DeleteModal";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { useNavigate } from "react-router-dom";
import { DMYIndoToFormat } from "@/utils/dateFormater";
import {
  CalendarDate,
  getLocalTimeZone
} from "@internationalized/date";
import { useDeleteSPPD, useGetAllSPPD } from "@/services/sppd";
import { SPPDRes } from "@/interface/responses/sppd.interface";
import PegawaiModal from "@/components/modals/SPPDModal/PegawaiModal";
import { Link } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";
import store from "@/redux/store";

interface SPPDprops {
  id: string;
  nomorSurat: string;
  kegiatan: string;
  waktu: string;
  lokasi: string;
  anggaran: number;
  participantsLeader?: {
    id: number;
    userId: string;
    bankAccount: string;
    position: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    user: {
      id: string;
      name: string;
      nip: string;
      jabatan: {
        nameJob: string;
      } | null;
    };
    budgets: {
      id: number;
      transport: number;
      volTransport: number;
      representatif: number;
      volRepresentatif: number;
      dailyAllowance: number;
      volDailyAllowance: number;
      bankAccount: string;
    }[];
  };
  participants: {
    id: number;
    userId: string;
    bankAccount: string;
    position: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    user: {
      id: string;
      name: string;
      nip: string;
      jabatan: {
        nameJob: string;
      } | null;
    };
    budgets: {
      id: number;
      transport: number;
      volTransport: number;
      representatif: number;
      volRepresentatif: number;
      dailyAllowance: number;
      volDailyAllowance: number;
      bankAccount: string;
    }[];
  }[];
}

interface PegawaiProps {
  id: number;
  userId: string;
  bankAccount: string;
  position: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    nip: string;
    jabatan: {
      nameJob: string;
    } | null;
  };
  budgets: {
    id: number;
    transport: number;
    volTransport: number;
    representatif: number;
    volRepresentatif: number;
    dailyAllowance: number;
    volDailyAllowance: number;
    bankAccount: string;
  }[];
}

export default function News() {
  const { role } = store.getState().auth;

  const navigate = useNavigate();
  const limit = 10;
  const [selectedId, setSelectedId] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [searchKegiatan, setSearchKegiatan] = useState("");
  const [listPegawai, setListPegawai] = useState<PegawaiProps[] | null>(null);

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

  const [startData, setStartData] = useState<number>(0);
  const [endData, setEndData] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalData, setTotalData] = useState<number>(0);

  const {
    data: allData,
    isFetching: isFetchingData,
    refetch: refetchData,
  } = useGetAllSPPD(
    pageIndex + 1,
    limit,
    search,
    "PERJALANAN_DALAM_KOTA", //PERJALANAN_DALAM_KOTA
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

      return data.response.map((item: SPPDRes) => {
        let anggaran = 0;
        const participantLeader = item.participants.find(
          (it) => it.role === "PEGAWAI",
        );
        item.participants.map((it) => {
          anggaran +=
            (it.budgets[0]?.dailyAllowance ||
              0 * it.budgets[0]?.volDailyAllowance ||
              0) +
            (it.budgets[0]?.transport || 0 * it.budgets[0]?.volTransport || 0) +
            (it.budgets[0]?.representatif ||
              0 * it.budgets[0]?.volRepresentatif ||
              0);
        });

        return {
          id: item.id,
          nomorSurat: item.nomorSurat,
          kegiatan: item.activity,
          waktu: `${item.startDate ? DMYIndoToFormat(item.startDate) : ""} - ${item.endDate ? DMYIndoToFormat(item.endDate) : ""}`,
          lokasi: item.location,
          anggaran: anggaran,
          participantsLeader: participantLeader,
          participants: item.participants,
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
      header: "Nama Pegawai",
      cell: ({ row }) => {
        const { participantsLeader } = row.original;
        return participantsLeader ? participantsLeader.user.name : "-";
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
    {
      header: "Total Pegawai",
      cell: ({ row }) => {
        const { participants } = row.original;
        return (
          <div
            className="text-info underline cursor-pointer"
            onClick={() => {
              setListPegawai(participants);
              setTimeout(() => {
                onOpenPegawai();
              }, 100);
            }}
          >
            {participants.length} Orang
          </div>
        );
      },
    },
    {
      header: "Aksi",
      cell: ({ row }) => {
        const { id } = row.original;
        return (
          <div className="flex items-center gap-2 justify-center">
            {(role === "ADMIN_SPPD" || role === "SUPERUSERS") && (
              <Button
                onPress={() =>
                  navigate(`/sppd/update-data/${id}?type=PERJALANAN_DALAM_KOTA`)
                }
                isIconOnly
                radius="sm"
                size="sm"
                className="bg-alert-info text-info shadow-sm"
              >
                <LuPencilLine size={14} />
              </Button>
            )}
            <Link
              to={`/sppd/export-pdf/${id}`}
              target="__blank"
              className="bg-[#FFF3F6] text-danger shadow-sm p-2 rounded-md"
            >
              <FaFilePdf size={14} />
            </Link>
            {(role === "ADMIN_SPPD" || role === "SUPERUSERS") && (
              <Button
                onPress={() => {
                  setSelectedId(id);
                  setTimeout(() => {
                    onOpenDelete();
                  }, 100);
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
    isOpen: isOpenPegawai,
    onOpen: onOpenPegawai,
    onClose: onClosePegawai,
  } = useDisclosure();

  const handleSearch = () => {
    setPageIndex(0);
    refetchData();
  };

  const handleReset = () => {
    setSearch("");
    setSearchKegiatan("");
    setRangeDate(null);
    setTimeout(() => {
      refetchData();
    }, 100);
  };

  useEffect(() => {
    refetchData();
  }, [pageIndex, refetchData]);

  const [isLoadingDelete, setLoadingDelete] = useState<boolean>(false);
  const { mutate: mutateDelete } = useDeleteSPPD();

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
            setSelectedId("");
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
      {listPegawai && (
        <PegawaiModal
          pegawai={listPegawai}
          onClose={onClosePegawai}
          isOpen={isOpenPegawai}
        />
      )}
      <DeleteModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        isLoading={isLoadingDelete}
        handleSubmit={handleDelete}
      />
      <div className="grid grid-cols-1 gap-8">
        <div className="">
          <div className="flex lg:items-center items-end lg:px-0 px-4 lg:flex-row flex-col justify-between lg:gap-0 gap-2">
            <div className="pt-8 px-4 w-full text-primary shadow-sm">
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
                    aria-label="searchKegiatan"
                    value={searchKegiatan}
                    onChange={(e) => {
                      setSearchKegiatan(e.target.value);
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
                  {(role === "ADMIN_SPPD" ||
                    role === "SUPERUSERS" ||
                    role === "PEGAWAI") && (
                    <Button
                      onPress={() =>
                        navigate("/sppd/tambah-data?type=PERJALANAN_DALAM_KOTA")
                      }
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
