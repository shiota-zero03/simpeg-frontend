import { TitleCase } from "@/components/card/TitleCase";
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
import { LuEye, LuPencilLine, LuSearch, LuTrash2 } from "react-icons/lu";
import { BiReset, BiSearch, BiSolidPlusSquare } from "react-icons/bi";
import DeleteModal from "@/components/modals/UtilsModal/DeleteModal";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { DMYIndoToFormat } from "@/utils/dateFormater";
import {
  CalendarDate,
  getLocalTimeZone,
  parseDate,
} from "@internationalized/date";
import CreateModal from "@/components/modals/E-DisposisiModal/CreatedModal";
import UpdateModal from "@/components/modals/E-DisposisiModal/UpdateModal";
import { EDisposisiRes } from "@/interface/responses/e-disposisi.interface";
import {
  useDeleteEDisposisi,
  useGetAllEDisposisi,
} from "@/services/e-disposisi";
import store from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { useGetProfile } from "@/services/auth";
import { LucideChevronRightCircle } from "lucide-react";
import UpdateDataModal from "@/components/modals/E-DisposisiModal/UpdateDataModal";
import { Link } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa6";

export default function EDisposisi() {
  const { role } = store.getState().auth;
  const limit = 10;
  const [pageIndex, setPageIndex] = useState(0);
  const [searchJudul, setSearchJudul] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const navigate = useNavigate();

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
  } = useGetAllEDisposisi(
    pageIndex + 1,
    limit,
    searchJudul,
    formatDateToJakarta(rangeDate?.start),
    formatDateToJakarta(rangeDate?.end),
  );

  const paginatedData: EDisposisiRes[] = useMemo(() => {
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
  }, [searchJudul, rangeDate, limit, pageIndex, allData]);

  let columns: ColumnDef<EDisposisiRes>[] = [];

  const { data: dataProfile, refetch: refetchProfile } = useGetProfile(!!role);
  const getDataProfile = useMemo(() => {
    if (dataProfile) return dataProfile.data;
    return null;
  }, [dataProfile]);

  if (role === "ADMIN_SPPD" || role === "SUPERUSERS") {
    columns = [
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
        accessorKey: "suratDari",
        header: "Surat Dari",
        cell: (info) => info.getValue() as string,
      },
      {
        accessorKey: "tanggalSurat",
        header: "Tanggal Surat",
        cell: (info) =>
          info.getValue() ? DMYIndoToFormat(info.getValue() as string) : "-",
      },
      {
        accessorKey: "tanggalDiterima",
        header: "Diterima Tanggal",
        cell: (info) =>
          info.getValue() ? DMYIndoToFormat(info.getValue() as string) : "-",
      },
      {
        accessorKey: "sifat",
        header: "Sifat",
        cell: (info) => {
          const sifat = info.getValue() as string;
          return sifat === "SANGAT_SEGERA"
            ? "Sangat Segera"
            : sifat === "SEGERA"
              ? "Segera"
              : sifat === "PENTING"
                ? "Penting"
                : sifat === "BIASA"
                  ? "Biasa"
                  : "Rahasia";
        },
      },
      {
        header: "Dokumen",
        cell: ({ row }) => {
          const { file } = row.original;
          return (
            <div className="flex items-center gap-2 justify-center text-danger">
              {file ? (
                <Link target="___blank" to={file}>
                  <FaFilePdf size={14} />
                </Link>
              ) : (
                "-"
              )}
            </div>
          );
        },
        meta: { align: "center" },
      },
      {
        header: "Aksi",
        cell: ({ row }) => {
          const { id, paraf } = row.original;
          return (
            <div className="flex items-center gap-2 justify-center">
              {!paraf && (
                <Button
                  onPress={() => {
                    setSelectedId(String(id));
                    onOpenUpdateData();
                  }}
                  isIconOnly
                  radius="sm"
                  size="sm"
                  className="bg-alert-info text-info shadow-sm"
                >
                  <LuPencilLine size={14} />
                </Button>
              )}
              <Button
                onPress={() => {
                  navigate(`/e-disposisi/detail-data/${id}`);
                }}
                isIconOnly
                radius="sm"
                size="sm"
                className="bg-alert-warning text-warning shadow-sm"
              >
                <LuEye size={14} />
              </Button>
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
            </div>
          );
        },
        meta: { align: "center" },
      },
    ];
  } else {
    columns = [
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
        accessorKey: "suratDari",
        header: "Surat Dari",
        cell: (info) => info.getValue() as string,
      },
      {
        accessorKey: "tanggalSurat",
        header: "Tanggal Surat",
        cell: (info) =>
          info.getValue() ? DMYIndoToFormat(info.getValue() as string) : "-",
      },
      {
        accessorKey: "tanggalDiterima",
        header: "Diterima Tanggal",
        cell: (info) =>
          info.getValue() ? DMYIndoToFormat(info.getValue() as string) : "-",
      },
      {
        accessorKey: "sifat",
        header: "Sifat",
        cell: (info) => {
          const sifat = info.getValue() as string;
          return sifat === "SANGAT_SEGERA"
            ? "Sangat Segera"
            : sifat === "SEGERA"
              ? "Segera"
              : sifat === "PENTING"
                ? "Penting"
                : sifat === "BIASA"
                  ? "Biasa"
                  : "Rahasia";
        },
      },
      {
        header: "Posisi Disposisi",
        cell: ({ row }) => {
          const { instruksi, paraf } = row.original;
          if (instruksi && instruksi.length > 0) {
            if (instruksi[1]) {
              const instruction = instruksi[1].diteruskan
                .split(";")
                .map((item) => item.trim());
              return (
                <ol className="ms-3">
                  {instruction.map((item) => (
                    <li className="list-decimal" key={item}>
                      {item}
                    </li>
                  ))}
                </ol>
              );
            } else {
              const instruction = instruksi[0].diteruskan
                .split(";")
                .map((item) => item.trim());
              return (
                <ol className="ms-3">
                  {instruction.map((item) => (
                    <li className="list-decimal" key={item}>
                      {item}
                    </li>
                  ))}
                </ol>
              );
            }
          } else {
            if (!paraf) {
              return "Sekretaris Dinas";
            } else {
              return "Kepala Dinas";
            }
          }
        },
      },
      {
        header: "Status",
        cell: ({ row }) => {
          const { paraf, instruksi } = row.original;
          if (getDataProfile?.jabatan.nameJob.includes("SEKRETARIS")) {
            return paraf ? (
              <div className="text-success">Sudah Diteruskan</div>
            ) : (
              <div className="text-danger">Belum Diteruskan</div>
            );
          } else if (getDataProfile?.jabatan.nameJob.includes("KEPALA DINAS")) {
            return !paraf ? (
              <div className="text-danger">Belum Diteruskan</div>
            ) : instruksi && instruksi.length > 0 ? (
              <div className="text-success">Sudah Diverifikasi</div>
            ) : (
              <div className="text-danger">Belum Diverifikasi</div>
            );
          } else {
            return "-";
          }
        },
      },
      {
        header: "Dokumen",
        cell: ({ row }) => {
          const { file } = row.original;
          return (
            <div className="flex items-center gap-2 justify-center text-danger">
              {file ? (
                <Link target="___blank" to={file}>
                  <FaFilePdf size={14} />
                </Link>
              ) : (
                "-"
              )}
            </div>
          );
        },
        meta: { align: "center" },
      },
      {
        header: "Aksi",
        cell: ({ row }) => {
          const { id, paraf, instruksi } = row.original;
          if (getDataProfile?.jabatan.nameJob.includes("SEKRETARIS")) {
            let instruction: string[] = [];
            if (instruksi && instruksi[0] && instruksi[0].diteruskan) {
              instruction = instruksi[0].diteruskan
                .split(";")
                .map((item) => item.trim());
            }

            return (
              <div className="flex items-center gap-2 justify-center">
                {paraf ? (
                  instruksi &&
                  instruksi[0] &&
                  instruction.includes("Sekretariat") ? (
                    instruksi[1] ? (
                      <Button
                        onPress={() => {
                          navigate(`/e-disposisi/detail-data/${id}`);
                        }}
                        isIconOnly
                        radius="sm"
                        size="sm"
                        className="bg-alert-warning text-warning shadow-sm"
                      >
                        <LuEye size={14} />
                      </Button>
                    ) : (
                      <Button
                        onPress={() => {
                          navigate(`/e-disposisi/verifikasi-data/${id}`);
                        }}
                        isIconOnly
                        radius="sm"
                        size="sm"
                        className="bg-alert-success text-primary shadow-sm"
                      >
                        <LucideChevronRightCircle size={14} />
                      </Button>
                    )
                  ) : (
                    <Button
                      onPress={() => {
                        navigate(`/e-disposisi/detail-data/${id}`);
                      }}
                      isIconOnly
                      radius="sm"
                      size="sm"
                      className="bg-alert-warning text-warning shadow-sm"
                    >
                      <LuEye size={14} />
                    </Button>
                  )
                ) : (
                  <Button
                    onPress={() => {
                      setSelectedId(String(id));
                      onOpenUpdate();
                    }}
                    isIconOnly
                    radius="sm"
                    size="sm"
                    className="bg-alert-success text-primary shadow-sm"
                  >
                    <LucideChevronRightCircle size={14} />
                  </Button>
                )}
              </div>
            );
          } else if (getDataProfile?.jabatan.nameJob.includes("KEPALA DINAS")) {
            return (
              <div className="flex items-center gap-2 justify-center">
                {!paraf ? (
                  <Button
                    onPress={() => {
                      navigate(`/e-disposisi/detail-data/${id}`);
                    }}
                    isIconOnly
                    radius="sm"
                    size="sm"
                    className="bg-alert-warning text-warning shadow-sm"
                  >
                    <LuEye size={14} />
                  </Button>
                ) : instruksi && instruksi.length > 0 ? (
                  <Button
                    onPress={() => {
                      navigate(`/e-disposisi/detail-data/${id}`);
                    }}
                    isIconOnly
                    radius="sm"
                    size="sm"
                    className="bg-alert-warning text-warning shadow-sm"
                  >
                    <LuEye size={14} />
                  </Button>
                ) : (
                  <Button
                    onPress={() => {
                      navigate(`/e-disposisi/verifikasi-data/${id}`);
                    }}
                    isIconOnly
                    radius="sm"
                    size="sm"
                    className="bg-alert-success text-primary shadow-sm"
                  >
                    <LucideChevronRightCircle size={14} />
                  </Button>
                )}
              </div>
            );
          }
        },
        meta: { align: "center" },
      },
    ];
  }

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
  const {
    isOpen: isOpenUpdateData,
    onOpen: onOpenUpdateData,
    onClose: onCloseUpdateData,
  } = useDisclosure();

  const handleSearch = () => {
    setPageIndex(0);
    refetchData();
  };

  const handleReset = () => {
    setSearchJudul("");
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

  const [isLoadingDelete, setLoadingDelete] = useState<boolean>(false);
  const { mutate: mutateDelete } = useDeleteEDisposisi();

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

  const handleClose = () => {
    setPageIndex(0);
    onCloseCreate();
    onCloseDelete();
    onCloseUpdate();
    onCloseUpdateData();
    refetchData();
  };

  useEffect(() => {
    refetchProfile();
  }, []);

  return (
    <>
      <BreadcrumbAdmin location="/E-Disposisi" />
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
      {selectedId && (
        <UpdateDataModal
          id={selectedId}
          isOpen={isOpenUpdateData}
          onClose={onCloseUpdateData}
          handleClose={handleClose}
        />
      )}
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <TitleCase
          title="E-Disposisi"
          text="Berikut ini menampilkan E-Disposisi "
        />
        <div className="bg-white shadow-md rounded-xl border">
          <div className="flex lg:items-center items-end lg:px-0 px-4 lg:flex-row flex-col justify-between lg:gap-0 gap-2">
            <div className="pt-8 px-4 w-full text-primary shadow-sm">
              <div className="flex lg:flex-row flex-col justify-between gap-2 sm:items-end">
                <div className="flex lg:flex-row flex-col gap-2 items-end w-full">
                  <Input
                    aria-label="searchJudul"
                    value={searchJudul}
                    onChange={(e) => {
                      setSearchJudul(e.target.value);
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
                  {(role === "SUPERUSERS" || role === "ADMIN_SPPD") && (
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
