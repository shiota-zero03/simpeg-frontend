import DataTables from "@/components/DataTables";
import { Button, Input, Pagination, useDisclosure } from "@heroui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { LuEye, LuSearch, LuTrash2 } from "react-icons/lu";
import { BiReset, BiSearch, BiSolidPlusSquare } from "react-icons/bi";
import DeleteModal from "@/components/modals/UtilsModal/DeleteModal";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { YMToIndoFormat } from "@/utils/dateFormater";
import { useNavigate } from "react-router-dom";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDeleteIKP, useGetAllIKP } from "@/services/ikp";
import { IKPListRes } from "@/interface/responses/ikp.interface";
import store from "@/redux/store";

interface IKPProps {
  id: string;
  namaPegawai: string;
  nip: string;
  jabatan: string;
  waktu: string;
  status: string;
}

export default function IKP() {
  const { role } = store.getState().auth;
  const limit = 10;
  const [pageIndex, setPageIndex] = useState(0);

  const [search, setSearch] = useState("");
  const [searchMonth, setSearchMonth] = useState("");

  const [startData, setStartData] = useState<number>(0);
  const [endData, setEndData] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalData, setTotalData] = useState<number>(0);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const navigate = useNavigate();

  const {
    data: allData,
    isFetching: isFetchingData,
    refetch: refetchData,
  } = useGetAllIKP(
    pageIndex + 1,
    limit,
    search,
    searchMonth.split("-")[1] || "",
    searchMonth.split("-")[0] || "",
    "pengirim",
  );

  const paginatedData: IKPProps[] = useMemo(() => {
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

      return data.response.map((item: IKPListRes) => {
        const ikps = item.ikps; // misalnya item.ikps adalah array of object dengan properti "status"

        const hasMenunggu = ikps.some((el) => el.status === "MENUNGGU");
        const allSetujui = ikps.every((el) => el.status === "DISETUJUI");

        let status = "MENUNGGU"; // default

        if (hasMenunggu) {
          status = "MENUNGGU";
        } else if (allSetujui) {
          status = "SETUJUI";
        }

        return {
          id: item.id,
          namaPegawai: item.name,
          nip: item.nip,
          jabatan: item.jabatan,
          waktu: item.createdAt,
          status: status,
        };
      });
    } else {
      return [];
    }
  }, [search, limit, pageIndex, allData]);

  const columns: ColumnDef<IKPProps>[] = [
    {
      header: "No",
      cell: ({ row }) => {
        const number = pageIndex * limit + row.index + 1;
        return <div>{number}</div>;
      },
      meta: { align: "center", cellWidth: "10" },
    },
    {
      accessorKey: "namaPegawai",
      header: "Nama Pegawai",
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "nip",
      header: "NIP",
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "jabatan",
      header: "Jabatan",
      cell: (info) => info.getValue() as string,
    },
    {
      accessorKey: "waktu",
      header: "Bulan",
      cell: (info) => {
        const bulan = info.getValue() as string;
        return bulan ? YMToIndoFormat(bulan) : "-";
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => {
        const status = info.getValue() as string;
        return (
          <ul className="px-6">
            {status === "MENUNGGU" ? (
              <li className="list-disc font-semibold text-warning">Menunggu</li>
            ) : status === "DITOLAK" ? (
              <li className="list-disc font-semibold text-danger">Ditolak</li>
            ) : (
              <li className="list-disc font-semibold text-success">
                Disetujui
              </li>
            )}
          </ul>
        );
      },
    },
    {
      header: "Aksi",
      cell: ({ row }) => {
        const { id } = row.original;
        return (
          <div className="flex items-center gap-2 justify-center">
            <Button
              onPress={() => navigate(`/dialog-kinerja/detail-data/${id}`)}
              isIconOnly
              radius="sm"
              size="sm"
              className="bg-alert-warning text-warning shadow-sm"
            >
              <LuEye size={14} />
            </Button>
            <Link
              to={`/dialog-kinerja/export-pdf/${id}`}
              target="__blank"
              className="bg-[#FFF3F6] text-danger shadow-sm p-2 rounded-md"
            >
              <FaFilePdf size={14} />
            </Link>
            {(role === "ADMIN" || role === "SUPERUSERS") && (
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

  const handleSearch = () => {
    setPageIndex(0);
    refetchData();
  };

  useEffect(() => {
    refetchData();
  }, [pageIndex, refetchData]);

  const handleReset = () => {
    setSearch("");
    setSearchMonth("");
    setPageIndex(0);
    setTimeout(() => {
      refetchData();
    }, 100);
  };

  const [isLoadingDelete, setLoadingDelete] = useState<boolean>(false);
  const { mutate: mutateDelete } = useDeleteIKP();

  const handleDelete = () => {
    if (isLoadingDelete) return; // Cegah pemanggilan ganda

    setLoadingDelete(true);

    try {
      mutateDelete(
        { id: String(selectedId || "") },
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
      <DeleteModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        isLoading={isLoadingDelete}
        handleSubmit={handleDelete}
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
                  aria-label="searchMonth"
                  value={searchMonth}
                  onChange={(e) => {
                    setSearchMonth(e.target.value);
                    setPageIndex(0);
                  }}
                  type="month"
                  radius="sm"
                  size="sm"
                  variant="bordered"
                  placeholder="Cari berdasarkan bulan disini"
                  startContent={
                    <LuSearch className="text-accent-gray text-xs" />
                  }
                  classNames={{
                    inputWrapper: "border-[0.8px]",
                    input: "text-xs",
                  }}
                />
              </div>
              <div className="flex items-center sm:flex-nowrap flex-wrap justify-end gap-2">
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
                {(role === "ADMIN" || role === "SUPERUSERS") && (
                  <Link
                    to={`/dialog-kinerja/export-excel?month=${searchMonth}`}
                    className="border-[0.8px] w-24 text-xs border-success text-success flex items-center gap-2 px-2 py-1.5 rounded-md justify-center"
                  >
                    <FaFileExcel size={12} /> Export
                  </Link>
                )}
                <Button
                  onPress={() => navigate("/dialog-kinerja/tambah-data")}
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
