import { useEffect, useMemo, useState } from "react";
import { TitleCase } from "@/components/card/TitleCase";
import {
  Button,
  Checkbox,
  Input,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { LuArrowLeft, LuFilePenLine } from "react-icons/lu";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { useNavigate, useParams } from "react-router-dom";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link } from "react-router-dom";
import {
  LucideCheckCircle,
  LucideFileCheck2,
  LucideSave,
  LucideSend,
  LucideTrash2,
  LucideX,
  LucideXCircle,
} from "lucide-react";
import {
  useDeleteDataIKP,
  useGetDetailIKP,
  useUpdateIKP,
  useUpdateStatusIKP,
  useUpdateStatusPerubahanIKP,
} from "@/services/ikp";
import { TbFaceIdError } from "react-icons/tb";
import ConfirmModal from "@/components/modals/UtilsModal/ConfirmModal";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreIKPSetuju } from "@/interface/request/ikp.interface";
import TolakModal from "@/components/modals/ikp/TolakModal.tsx";
import { FaFilePdf, FaQuestionCircle } from "react-icons/fa";
import DeleteModal from "@/components/modals/UtilsModal/DeleteModal";

interface PropsPerubahan {
  id: number;
  sasaran: string;
  indicator: string;
  count: number;
  target: string;
  description: string;
  dialog: string;
  ubahTarget: string;
  status: string;
}

export default function DetailIKP() {
  const { id, type } = useParams();
  const [status, setStatus] = useState<string>("MENUNGGU");

  const [isEditAll, setIsEditAll] = useState<boolean>(false);
  const [formRealisasi, setFormRealisasi] = useState<
    { isOpenRealisasi: boolean; id: number; realisasi: string }[]
  >([]);

  const { data, isFetching, refetch, error } = useGetDetailIKP(id || "");
  const DATA_DETAIL = useMemo(() => {
    if (!data) return null;
    const ikps = data.data.ikps; // misalnya item.ikps adalah array of object dengan properti "status"

    const newRealisasi = ikps.map(
      (item: {
        id: number | null;
        sasaran: string | null;
        target: string | null;
        indicator: string | null;
        description: string | null;
        dialog: string | null;
        status: string | null;
        ubahTarget: string | null;
        realisasi: string | null;
        reasoning: string | null;
        count: number | null;
      }) => ({
        isOpenRealisasi: false,
        id: Number(item.id),
        realisasi: String(item.realisasi),
      }),
    );

    // Update state satu kali
    setIsEditAll(false);
    setFormRealisasi(newRealisasi);

    const hasMenunggu = ikps.some((el) => el.status === "MENUNGGU");
    const allSetujui = ikps.every((el) => el.status === "DISETUJUI");

    if (hasMenunggu) {
      setStatus("MENUNGGU");
    } else if (allSetujui) {
      setStatus("DISETUJUI");
    }

    return data.data;
  }, [data, id]);

  const openEditRealisasi = (index: number) => {
    setFormRealisasi((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isOpenRealisasi: true } : item,
      ),
    );
  };
  const closeEditRealisasi = (index: number) => {
    setFormRealisasi((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isOpenRealisasi: false } : item,
      ),
    );
  };

  useEffect(() => {
    if (formRealisasi.length > 0) {
      if (isEditAll) {
        formRealisasi.map((_item, index) => {
          openEditRealisasi(index);
        });
      } else {
        formRealisasi.map((_item, index) => {
          closeEditRealisasi(index);
        });
      }
    }
  }, [isEditAll]);

  const handleChangeRealisasi = (index: number, value: string) => {
    setFormRealisasi((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, realisasi: value } : item,
      ),
    );
  };

  useEffect(() => {
    refetch();
  }, [data]);

  const navigate = useNavigate();
  useEffect(() => {
    if (type !== "pengirim" && type !== "penerima") {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate(`/dialog-kinerja?tab=${type}`);
    }
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate(`/dialog-kinerja?tab=${type}`);
    }
  }, [isFetching, refetch]);

  const {
    isOpen: isOpenConfirm,
    onClose: onCloseConfirm,
    onOpen: onOpenConfirm,
  } = useDisclosure();
  const {
    isOpen: isOpenConfirm2,
    onClose: onCloseConfirm2,
    onOpen: onOpenConfirm2,
  } = useDisclosure();
  const {
    isOpen: isOpenConfirm3,
    onClose: onCloseConfirm3,
    onOpen: onOpenConfirm3,
  } = useDisclosure();
  const {
    isOpen: isOpenConfirm4,
    onClose: onCloseConfirm4,
    onOpen: onOpenConfirm4,
  } = useDisclosure();
  const {
    // isOpen: isOpenConfirm5,
    onClose: onCloseConfirm5,
    // onOpen: onOpenConfirm5,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onClose: onCloseDelete,
    onOpen: onOpenDelete,
  } = useDisclosure();
  
  const [isPengajuaun, setIsPengajuan] = useState<boolean>(false);

  const [isLoadingConfirm, setIsLoadingConfirm] = useState<boolean>(false);
  const { mutateAsync: mutatePost } = useUpdateStatusIKP();
  const handleConfirm = async () => {
    if (!DATA_DETAIL?.ikps) return;

    setIsLoadingConfirm(true);

    try {
      for (const element of DATA_DETAIL.ikps) {
        await mutatePost({
          id: String(element.id),
          formData: { status: "DISETUJUI" },
        });
      }

      SuccessToast({ text: "Data berhasil diperbarui" });
      onCloseConfirm();
      navigate(`/dialog-kinerja?tab=${type}`);
    } catch (error) {
      const err = error as AxiosError<BaseErrorRes>;
      ErrorToast({
        text:
          (err.response?.data.message as string) ||
          "Terjadi kesalahan saat mengubah data",
      });
    } finally {
      setIsLoadingConfirm(false);
    }
  };

  const [formDataPerubahan, setFormDataPerubahan] = useState<PropsPerubahan[]>(
    [],
  );

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    const item = DATA_DETAIL?.ikps.find((ikp) => String(ikp.id) === id);
    if (!item) return;

    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((itemId) => itemId !== id),
    );

    setFormDataPerubahan((prev) => {
      if (checked) {
        const newItem: PropsPerubahan = {
          id: item.id || 0,
          count: item.count || 0,
          sasaran: item.sasaran || "",
          indicator: item.indicator || "",
          target: item.target || "",
          description: item.description || "",
          dialog: item.dialog || "",
          ubahTarget: item.ubahTarget || "",
          status: "KONFIRMASI",
        };
        return [...prev, newItem];
      } else {
        return prev.filter((data) => String(data.id) !== id);
      }
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked && DATA_DETAIL?.ikps) {
      const filteredIKPs = DATA_DETAIL.ikps.filter(
        (item) => item.status === "DITOLAK" || item.status === "MENUNGGU",
      );
      const allIds = filteredIKPs.map((item) => String(item.id));

      setSelectedIds(allIds);

      const allFormData: PropsPerubahan[] = filteredIKPs.map((item) => ({
        id: item.id || 0,
        count: item.count || 0,
        sasaran: item.sasaran || "",
        indicator: item.indicator || "",
        target: item.target || "",
        description: item.description || "",
        dialog: item.dialog || "",
        ubahTarget: item.ubahTarget || "",
        status: "KONFIRMASI",
      }));
      setFormDataPerubahan(allFormData);
    } else {
      setSelectedIds([]);
      setFormDataPerubahan([]);
    }
  };

  const handleUbahTargetChange = (
    index: number,
    value: string,
    type: "ubahTarget" | "dialog" | "description",
  ) => {
    setFormDataPerubahan((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [type]: value,
      };
      return updated;
    });
  };

  const { mutateAsync: mutatePerubahan } = useUpdateStatusPerubahanIKP();
  const handleConfirmPerubahan = async () => {
    if (!DATA_DETAIL?.ikps) return;

    setIsLoadingConfirm(true);

    try {
      const existingIds = formDataPerubahan.map((data) => data.id);
      const approvedData: PropsPerubahan[] = DATA_DETAIL.ikps
        .filter(
          (item) =>
            !existingIds.includes(item.id || 0) &&
            (item.status === "DITOLAK" || item.status === "MENUNGGU"), // <--- tambahkan ini
        )
        .map((item) => ({
          id: item.id || 0,
          count: item.count || 0,
          sasaran: item.sasaran || "",
          indicator: item.indicator || "",
          target: item.target || "",
          description: item.description || "",
          dialog: item.dialog || "",
          ubahTarget: item.ubahTarget || "",
          status: "DISETUJUI",
        }));
      const finalData = [...formDataPerubahan, ...approvedData];

      for (const element of finalData) {
        await mutatePerubahan({
          id: String(element.id),
          formData: {
            description: element.description,
            dialog: element.dialog,
            ubahTarget: element.ubahTarget,
            status: element.status,
          },
        });
      }

      SuccessToast({ text: "Data berhasil diperbarui" });
      onCloseConfirm();
      navigate(`/dialog-kinerja?tab=${type}`);
    } catch (error) {
      const err = error as AxiosError<BaseErrorRes>;
      ErrorToast({
        text:
          (err.response?.data.message as string) ||
          "Terjadi kesalahan saat mengubah data",
      });
    } finally {
      setIsLoadingConfirm(false);
    }
  };

  const [selectedId, setSelectedid] = useState<number | null>(null);
  const [selectedCount, setSelectedCount] = useState<number | null>(null);
  const { mutate: mutateUpdate } = useUpdateIKP();
  const handleUpdate = async () => {
    setIsLoadingConfirm(true);

    const item = DATA_DETAIL?.ikps.find((ikp) => ikp.id === selectedId);

    const dataToSend: StoreIKPSetuju = {
      sasaran: item?.sasaran || "",
      indicator: item?.indicator || "",
      target: item?.ubahTarget || "",
      status: "DISETUJUI",
      realisasi: "",
    };

    try {
      mutateUpdate(
        {
          id: String(selectedId),
          formData: dataToSend,
        },
        {
          onSuccess: () => {
            SuccessToast({ text: "Data berhasil disetujui" });
            setIsLoadingConfirm(false);
            setSelectedid(null);
            handleConfirmClose();
          },
          onError: (error: AxiosError<BaseErrorRes>) => {
            setIsLoadingConfirm(false);
            onCloseConfirm();
            setSelectedid(null);
            ErrorToast({
              text:
                (error.response?.data.message as string) ||
                "Terjadi kesalahan saat menambah data",
            });
            throw error;
          },
        },
      );
    } catch (error) {
      setIsLoadingConfirm(false);
      onCloseConfirm();
      setSelectedid(null);
      throw error;
    }
  };

  const { mutate: mutateDelete } = useDeleteDataIKP();

  const handleDelete = async () => {
    setIsLoadingConfirm(true);
    try {
      mutateDelete(
        {
          id: String(selectedId)
        },
        {
          onSuccess: () => {
            SuccessToast({ text: "Data berhasil dihapus" });
            setIsLoadingConfirm(false);
            setSelectedid(null);
            handleConfirmClose();
          },
          onError: (error: AxiosError<BaseErrorRes>) => {
            setIsLoadingConfirm(false);
            onCloseDelete();
            setSelectedid(null);
            ErrorToast({
              text:
                (error.response?.data.message as string) ||
                "Terjadi kesalahan saat menghapus data",
            });
            throw error;
          },
        },
      );
    } catch (error) {
      setIsLoadingConfirm(false);
      onCloseDelete();
      setSelectedid(null);
      throw error;
    }
  };

  const handleConfirmClose = () => {
    refetch();
    onCloseConfirm5();
    onCloseConfirm4();
    onCloseConfirm3();
    onCloseConfirm2();
    onCloseConfirm();
    onCloseDelete();
  };

  const handleUpdateById = async (idx: number) => {
    setIsLoadingConfirm(true);

    const dataToSend: StoreIKPSetuju = {
      realisasi: formRealisasi[idx].realisasi,
    };

    try {
      mutateUpdate(
        {
          id: String(formRealisasi[idx].id),
          formData: dataToSend,
        },
        {
          onSuccess: () => {
            SuccessToast({ text: "Data berhasil diperbarui" });
            setIsLoadingConfirm(false);
            setSelectedid(null);
            closeEditRealisasi(idx);
            refetch();
          },
          onError: (error: AxiosError<BaseErrorRes>) => {
            setIsLoadingConfirm(false);
            setSelectedid(null);
            ErrorToast({
              text:
                (error.response?.data.message as string) ||
                "Terjadi kesalahan saat menambah data",
            });
            throw error;
          },
        },
      );
    } catch (error) {
      setIsLoadingConfirm(false);
      setSelectedid(null);
      throw error;
    }
  };

  const handleUpdateAll = async () => {
    setIsLoadingConfirm(true);

    try {
      for (const element of formRealisasi) {
        mutateUpdate({
          id: String(element.id),
          formData: {
            realisasi: element.realisasi,
          },
        });
      }

      SuccessToast({ text: "Data berhasil diperbarui" });
      setIsEditAll(false);
    } catch (error) {
      const err = error as AxiosError<BaseErrorRes>;
      ErrorToast({
        text:
          (err.response?.data.message as string) ||
          "Terjadi kesalahan saat mengubah data",
      });
    } finally {
      setIsLoadingConfirm(false);
      refetch();
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        isLoading={isLoadingConfirm}
        handleSubmit={handleConfirm}
      />
      <ConfirmModal
        isOpen={isOpenConfirm2}
        onClose={onCloseConfirm2}
        isLoading={isLoadingConfirm}
        handleSubmit={handleConfirmPerubahan}
      />
      <ConfirmModal
        isOpen={isOpenConfirm3}
        onClose={onCloseConfirm3}
        isLoading={isLoadingConfirm}
        handleSubmit={handleUpdate}
      />
      <DeleteModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        isLoading={isLoadingConfirm}
        handleSubmit={handleDelete}
      />
      {selectedId && selectedCount && (
        <TolakModal
          isOpen={isOpenConfirm4}
          onClose={onCloseConfirm4}
          id={selectedId}
          count={selectedCount}
          handleSubmit={handleConfirmClose}
        />
      )}
      <BreadcrumbAdmin location="/Dialog-Kinerja/Detail-Data" />
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="flex">
          <Link
            to={`/dialog-kinerja?tab=${type}`}
            className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
          >
            <LuArrowLeft /> Kembali
          </Link>
        </div>
        <TitleCase title="Detail Dialog Kinerja (IKP)" />

        {!isPengajuaun ? (
          <div className="bg-white shadow-md rounded-xl border p-4 min-h-[64vh]">
            <div className="flex items-center justify-between md:flex-row flex-col gap-2">
              <Link
                to={`/dialog-kinerja/export-pdf/${id}`}
                target="__blank"
                className="bg-[#FFF3F6] text-danger shadow-sm p-2 rounded-md flex items-center gap-3 text-xs font-semibold border border-danger"
              >
                <FaFilePdf size={14} /> Export PDF
              </Link>
              {type === "penerima" && status === "DISETUJUI" && (
                <>
                  {isEditAll ? (
                    <Button
                      size="sm"
                      isLoading={isLoadingConfirm}
                      className="bg-alert-success text-success border border-success"
                      onPress={() => handleUpdateAll()}
                    >
                      <LuFilePenLine size={12} /> Simpan
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      isLoading={isLoadingConfirm}
                      className="bg-alert-warning text-warning border border-warning"
                      onPress={() => setIsEditAll(true)}
                    >
                      <LuFilePenLine size={12} /> Edit Realisasi
                    </Button>
                  )}
                </>
              )}
              {type === "penerima" && status === "MENUNGGU" && (
                <div className="flex items-center justify-end gap-2">
                  <Button
                    className="bg-alert-info text-info border border-info font-semibold"
                    size="sm"
                    onPress={onOpenConfirm}
                  >
                    <LucideFileCheck2 size={14} /> Setujui
                  </Button>
                  <Button
                    className="bg-alert-warning text-warning border border-warning font-semibold"
                    size="sm"
                    onPress={() => setIsPengajuan(true)}
                  >
                    <LucideSend size={14} /> Ajukan Perubahan
                  </Button>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="grid lg:grid-cols-4 grid-cols-1 gap-2 border-2 my-4 p-2 rounded-lg shadow-sm">
                <div>
                  <label htmlFor="content" className="font-normal text-xs">
                    Nama Pegawai
                  </label>
                  <Input
                    isReadOnly
                    value={DATA_DETAIL?.name}
                    aria-label="Judul"
                    labelPlacement="outside"
                    placeholder="AUTO_FILLED"
                    variant="bordered"
                    radius="sm"
                    classNames={{
                      inputWrapper: "border-none",
                      input: "text-xs font-semibold",
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="content" className="font-normal text-xs">
                    NIP
                  </label>
                  <Input
                    isReadOnly
                    value={DATA_DETAIL?.nip}
                    aria-label="Judul"
                    labelPlacement="outside"
                    placeholder="AUTO_FILLED"
                    variant="bordered"
                    radius="sm"
                    classNames={{
                      inputWrapper: "border-none",
                      input: "text-xs font-semibold",
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="content" className="font-normal text-xs">
                    Jabatan
                  </label>
                  <Input
                    isReadOnly
                    value={DATA_DETAIL?.jabatan}
                    aria-label="Judul"
                    labelPlacement="outside"
                    placeholder="AUTO_FILLED"
                    variant="bordered"
                    radius="sm"
                    classNames={{
                      inputWrapper: "border-none",
                      input: "text-xs font-semibold",
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="content" className="font-normal text-xs">
                    Status
                  </label>
                  <Input
                    isReadOnly
                    value={
                      status === "DISETUJUI"
                        ? "Disetujui"
                        : status === "DITOLAK"
                          ? "Ditolak"
                          : "Menunggu"
                    }
                    aria-label="Judul"
                    labelPlacement="outside"
                    placeholder="AUTO_FILLED"
                    variant="bordered"
                    radius="sm"
                    classNames={{
                      inputWrapper: "border-none",
                      input: `text-xs font-semibold ${status === "DISETUJUI" ? "text-success" : status === "DITOLAK" ? "text-danger" : "text-warning"}`,
                    }}
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-gray-300">
                  <thead>
                    <tr>
                      <th
                        className={`border-b-2 border-accent-gray p-2 text-center text-sm bg-primary text-white rounded-ss-md`}
                      >
                        No
                      </th>
                      <th
                        className={`border-b-2 border-accent-gray p-2 text-left text-sm bg-primary text-white`}
                      >
                        Sasaran
                      </th>
                      <th
                        className={`border-b-2 border-accent-gray p-2 text-left text-sm bg-primary text-white`}
                      >
                        Indikator
                      </th>
                      <th
                        className={`border-b-2 border-accent-gray p-2 text-left text-sm bg-primary text-white`}
                      >
                        Target
                      </th>
                      <th
                        className={`border-b-2 border-accent-gray p-2 text-left text-sm bg-primary text-white`}
                      >
                        Realisasi
                      </th>
                      <th
                        className={`border-b-2 border-accent-gray p-2 text-left text-sm bg-primary text-white`}
                      >
                        Status
                      </th>
                      <th
                        className={`border-b-2 border-accent-gray p-2 text-left text-sm bg-primary text-white`}
                      >
                        Ubah Target
                      </th>
                      <th
                        className={`border-b-2 border-accent-gray p-2 text-left text-sm bg-primary text-white`}
                      >
                        Keterangan
                      </th>
                      <th
                        className={`border-b-2 border-accent-gray p-2 text-left text-sm bg-primary text-white`}
                      >
                        Dialog
                      </th>
                      <th
                        className={`border-b-2 border-accent-gray p-2 text-center text-sm bg-primary text-white rounded-se-md`}
                      >
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {DATA_DETAIL && DATA_DETAIL?.ikps.length > 0 ? (
                      DATA_DETAIL.ikps.map((item, index) => (
                        <tr key={index}>
                          <td
                            className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-center w-10`}
                          >
                            {index + 1}
                          </td>
                          <td
                            className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left`}
                          >
                            {item.sasaran}
                          </td>
                          <td
                            className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left`}
                          >
                            {item.indicator}
                          </td>
                          <td
                            className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left`}
                          >
                            {item.target}
                          </td>
                          {type === "penerima" ? (
                            <td
                              className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left`}
                            >
                              {formRealisasi[index] &&
                              formRealisasi[index].isOpenRealisasi ? (
                                <Input
                                  aria-label="realisasi"
                                  variant="bordered"
                                  value={formRealisasi[index]?.realisasi}
                                  onChange={(e) =>
                                    handleChangeRealisasi(index, e.target.value)
                                  }
                                  placeholder="Masukkan disini"
                                  radius="sm"
                                  classNames={{
                                    inputWrapper: "border-[0.8px]",
                                    input: "text-xs",
                                  }}
                                />
                              ) : (
                                item.realisasi || "-"
                              )}
                            </td>
                          ) : (
                            <td
                              className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left`}
                            >
                              {item.realisasi || "-"}
                            </td>
                          )}
                          <td
                            className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left ${item.status === "DISETUJUI" ? "text-success" : item.status === "DITOLAK" ? "text-danger" : "text-warning"}`}
                          >
                            {item.status === "MENUNGGU" ? (
                              "Menunggu"
                            ) : item.status === "DISETUJUI" ? (
                              "Disetujui"
                            ) : item.status === "DITOLAK" ? (
                              <div>
                                Ditolak
                                <br />
                                <span>
                                  <em className="text-[0.65rem]">
                                    Catatan admin: {item.reasoning || "-"}
                                  </em>
                                </span>
                              </div>
                            ) : (
                              "Menunggu Konfirmasi"
                            )}
                          </td>
                          <td
                            className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left`}
                          >
                            {item.ubahTarget || "-"}
                          </td>
                          <td
                            className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left`}
                          >
                            {item.description || "-"}
                          </td>
                          <td
                            className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left`}
                          >
                            {item.dialog || "-"}
                          </td>
                          <td
                            className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left`}
                          >
                            {item.status === "DISETUJUI" &&
                            type === "penerima" ? (
                              <div className="flex items-center justify-center gap-2">
                                {!isEditAll && (
                                  <>
                                    {formRealisasi[index] &&
                                    formRealisasi[index].isOpenRealisasi ? (
                                      <Button
                                        size="sm"
                                        isIconOnly
                                        className="bg-alert-success text-success"
                                        onPress={() => handleUpdateById(index)}
                                      >
                                        <LucideSave size={12} />
                                      </Button>
                                    ) : (
                                      <Button
                                        size="sm"
                                        isLoading={isLoadingConfirm}
                                        isIconOnly
                                        className="bg-alert-warning text-warning"
                                        onPress={() => openEditRealisasi(index)}
                                      >
                                        <LuFilePenLine size={12} />
                                      </Button>
                                    )}
                                  </>
                                )}
                              </div>
                            ) : item.status === "KONFIRMASI" &&
                              type === "pengirim" ? (
                              <div className="flex items-center justify-center gap-2">
                                <Button
                                  size="sm"
                                  isIconOnly
                                  onPress={() => {
                                    setSelectedid(item.id);
                                    setTimeout(() => {
                                      onOpenConfirm3();
                                    }, 100);
                                  }}
                                  className="bg-alert-success text-success"
                                >
                                  <LucideCheckCircle size={12} />
                                </Button>
                                <Button
                                  size="sm"
                                  isIconOnly
                                  className="bg-alert-danger text-danger"
                                  onPress={() => {
                                    setSelectedid(item.id);
                                    setSelectedCount(item.count);
                                    setTimeout(() => {
                                      onOpenConfirm4();
                                    }, 100);
                                  }}
                                >
                                  <LucideXCircle size={12} />
                                </Button>
                                <Button
                                  size="sm"
                                  isIconOnly
                                  className="bg-danger text-white"
                                  onPress={() => {
                                    setSelectedid(item.id);
                                    setSelectedCount(item.count);
                                    setTimeout(() => {
                                      onOpenDelete();
                                    }, 100);
                                  }}
                                >
                                  <LucideTrash2 size={12} />
                                </Button>
                              </div>
                            ) : null}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9} className="py-4">
                          <div className="w-full flex items-center justify-center flex-col text-primary opacity-20">
                            <TbFaceIdError size={120} />
                            <span className="italic text-xl font-semibold">
                              No Data Found
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-xl border p-4 min-h-[64vh]">
            <div className="flex flex-col gap-2">
              <div className="grid lg:grid-cols-4 grid-cols-1 gap-2 border-2 my-4 p-2 rounded-lg shadow-sm">
                <div>
                  <label htmlFor="content" className="font-normal text-xs">
                    Nama Pegawai
                  </label>
                  <Input
                    isReadOnly
                    value={DATA_DETAIL?.name}
                    aria-label="Judul"
                    labelPlacement="outside"
                    placeholder="AUTO_FILLED"
                    variant="bordered"
                    radius="sm"
                    classNames={{
                      inputWrapper: "border-none",
                      input: "text-xs font-semibold",
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="content" className="font-normal text-xs">
                    NIP
                  </label>
                  <Input
                    isReadOnly
                    value={DATA_DETAIL?.nip}
                    aria-label="Judul"
                    labelPlacement="outside"
                    placeholder="AUTO_FILLED"
                    variant="bordered"
                    radius="sm"
                    classNames={{
                      inputWrapper: "border-none",
                      input: "text-xs font-semibold",
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="content" className="font-normal text-xs">
                    Jabatan
                  </label>
                  <Input
                    isReadOnly
                    value={DATA_DETAIL?.jabatan}
                    aria-label="Judul"
                    labelPlacement="outside"
                    placeholder="AUTO_FILLED"
                    variant="bordered"
                    radius="sm"
                    classNames={{
                      inputWrapper: "border-none",
                      input: "text-xs font-semibold",
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="content" className="font-normal text-xs">
                    Status
                  </label>
                  <Input
                    isReadOnly
                    value={
                      status === "DISETUJUI"
                        ? "Disetujui"
                        : status === "DITOLAK"
                          ? "Ditolak"
                          : "Menunggu"
                    }
                    aria-label="Judul"
                    labelPlacement="outside"
                    placeholder="AUTO_FILLED"
                    variant="bordered"
                    radius="sm"
                    classNames={{
                      inputWrapper: "border-none",
                      input: `text-xs font-semibold ${status === "DISETUJUI" ? "text-success" : status === "DITOLAK" ? "text-danger" : "text-warning"}`,
                    }}
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-gray-300">
                  <thead>
                    <tr>
                      <th
                        className={`border-b-2 border-accent-gray p-2 text-center text-sm bg-primary text-white rounded-ss-md w-20`}
                      >
                        <Checkbox
                          isSelected={
                            (DATA_DETAIL?.ikps?.filter(
                              (item) => item.status !== "DISETUJUI",
                            ).length ?? 0) > 0 &&
                            selectedIds.length ===
                              DATA_DETAIL?.ikps?.filter(
                                (item) => item.status !== "DISETUJUI",
                              ).length
                          }
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                      </th>
                      <th
                        className={`border-b-2 border-accent-gray p-2 text-center text-sm bg-primary text-white`}
                      >
                        No
                      </th>
                      <th
                        className={`border-b-2 border-accent-gray p-2 text-left text-sm bg-primary text-white`}
                      >
                        Sasaran
                      </th>
                      <th
                        className={`border-b-2 border-accent-gray p-2 text-left text-sm bg-primary text-white`}
                      >
                        Indikator
                      </th>
                      <th
                        className={`border-b-2 border-accent-gray p-2 text-left text-sm bg-primary text-white`}
                      >
                        Target
                      </th>
                      <th
                        className={`border-b-2 border-accent-gray p-2 text-left text-sm bg-primary text-white rounded-se-md`}
                      >
                        Realisasi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {DATA_DETAIL && DATA_DETAIL?.ikps.length > 0 ? (
                      DATA_DETAIL.ikps.map((item, index) => (
                        <tr key={index}>
                          <td className="flex items-center justify-center px-2 py-4 text-xs border-b-2 border-accent-gray max-w-20">
                            <Checkbox
                              isSelected={selectedIds.includes(String(item.id))}
                              isDisabled={item.status === "DISETUJUI"}
                              isIndeterminate={item.status === "DISETUJUI"}
                              onChange={(e) =>
                                handleCheckboxChange(
                                  String(item.id),
                                  e.target.checked,
                                )
                              }
                            />
                          </td>
                          <td
                            className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-center w-10`}
                          >
                            {index + 1}
                          </td>
                          <td
                            className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left`}
                          >
                            {item.sasaran}
                          </td>
                          <td
                            className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left`}
                          >
                            {item.indicator}
                          </td>
                          <td
                            className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left`}
                          >
                            {item.target}
                          </td>
                          <td
                            className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left`}
                          >
                            {item.realisasi || "-"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9} className="py-4">
                          <div className="w-full flex items-center justify-center flex-col text-primary opacity-20">
                            <TbFaceIdError size={120} />
                            <span className="italic text-xl font-semibold">
                              No Data Found
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-2 flex flex-col gap-4">
                <div className="bg-[#F1FCFA] text-black font-semibold py-3 px-4 text-xs rounded-lg flex items-center gap-2">
                  Pengajuan Perubahan
                  <Tooltip
                    color="primary"
                    content={
                      <div className="max-w-60 text-xs">
                        Anda hanya bisa mengajukan perubahan target dua kali,
                        selanjutnya status IKP akan berubah menjadi disetujui.
                      </div>
                    }
                    placement="right"
                  >
                    <FaQuestionCircle />
                  </Tooltip>
                </div>
                <div>
                  {formDataPerubahan.length > 0 ? (
                    <div className="overflow-x-auto">
                      {formDataPerubahan.map((item, index) => (
                        <div
                          className="flex items-start gap-2 mb-4 w-full"
                          key={index}
                        >
                          <div className="w-10 flex items-center justify-center border bg-[#F2F2F7] rounded-md p-2.5 text-sm gap-1">
                            {index + 1}
                          </div>
                          <div className="grid md:grid-cols-6 grid-cols-1 gap-1 w-full">
                            <div className="md:col-span-2">
                              <Input
                                isReadOnly
                                value={item.sasaran}
                                aria-label="Judul"
                                labelPlacement="outside"
                                placeholder="AUTO_FILLED"
                                variant="bordered"
                                radius="sm"
                                className="w-full"
                                classNames={{
                                  inputWrapper: "border-[0.8px] bg-[#F2F2F7]",
                                  input: "text-xs",
                                }}
                              />
                            </div>
                            <div className="md:col-span-2">
                              <Input
                                isReadOnly
                                value={item.indicator}
                                aria-label="Judul"
                                labelPlacement="outside"
                                placeholder="AUTO_FILLED"
                                variant="bordered"
                                radius="sm"
                                className="w-full"
                                classNames={{
                                  inputWrapper: "border-[0.8px] bg-[#F2F2F7]",
                                  input: "text-xs",
                                }}
                              />
                            </div>
                            <div className="md:col-span-2">
                              <Input
                                isReadOnly
                                value={item.target}
                                aria-label="Judul"
                                labelPlacement="outside"
                                placeholder="AUTO_FILLED"
                                variant="bordered"
                                radius="sm"
                                className="w-full"
                                classNames={{
                                  inputWrapper: "border-[0.8px] bg-[#F2F2F7]",
                                  input: "text-xs",
                                }}
                              />
                            </div>
                            <div className="md:col-span-6">
                              <div className="mb-1">
                                <label
                                  className="text-xs font-medium"
                                  htmlFor="ubah-target"
                                >
                                  Ubah Target
                                </label>
                              </div>
                              <Input
                                value={item.ubahTarget}
                                onChange={(e) =>
                                  handleUbahTargetChange(
                                    index,
                                    e.target.value,
                                    "ubahTarget",
                                  )
                                }
                                aria-label="Judul"
                                labelPlacement="outside"
                                placeholder="Masukkan disini"
                                variant="bordered"
                                radius="sm"
                                className="w-full"
                                classNames={{
                                  inputWrapper: "border-[0.8px]",
                                  input: "text-xs",
                                }}
                              />
                            </div>
                            <div className="md:col-span-3">
                              <div className="mb-1">
                                <label
                                  className="text-xs font-medium"
                                  htmlFor="ubah-target"
                                >
                                  Keterangan
                                </label>
                              </div>
                              <Textarea
                                value={item.description}
                                onChange={(e) =>
                                  handleUbahTargetChange(
                                    index,
                                    e.target.value,
                                    "description",
                                  )
                                }
                                aria-label="Judul"
                                labelPlacement="outside"
                                placeholder="Masukkan disini"
                                variant="bordered"
                                radius="sm"
                                className="w-full"
                                classNames={{
                                  inputWrapper: "border-[0.8px]",
                                  input: "text-xs",
                                }}
                              />
                            </div>
                            <div className="md:col-span-3">
                              <div className="mb-1">
                                <label
                                  className="text-xs font-medium"
                                  htmlFor="ubah-target"
                                >
                                  Dialog Kinerja
                                </label>
                              </div>
                              <Textarea
                                value={item.dialog}
                                onChange={(e) =>
                                  handleUbahTargetChange(
                                    index,
                                    e.target.value,
                                    "dialog",
                                  )
                                }
                                aria-label="Judul"
                                labelPlacement="outside"
                                placeholder="Masukkan disini"
                                variant="bordered"
                                radius="sm"
                                className="w-full"
                                classNames={{
                                  inputWrapper: "border-[0.8px]",
                                  input: "text-xs",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <TbFaceIdError size={60} />
                      <span className="italic text-sm">
                        Belum ada data yang dipilih
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {type === "penerima" && status === "MENUNGGU" && (
              <div className="flex items-center justify-end gap-2 mt-4">
                <Button
                  className="bg-alert-danger text-danger border border-danger font-semibold"
                  size="sm"
                  onPress={() => setIsPengajuan(false)}
                >
                  <LucideX size={14} /> Batal
                </Button>
                <Button
                  className="bg-button-primary text-white border border-button-primary font-semibold"
                  size="sm"
                  onPress={onOpenConfirm2}
                >
                  <LucideSend size={14} /> Kirim Pengajuan
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
