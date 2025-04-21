import { useEffect, useMemo, useState } from "react";
import { TitleCase } from "@/components/card/TitleCase";
import {
  Button,
  Checkbox,
  Input,
  Textarea,
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
  LucidePencilLine,
  LucideSend,
  LucideX,
  LucideXCircle,
} from "lucide-react";
import {
  useGetDetailIKP,
  useUpdateIKP,
  useUpdateStatusIKP,
  useUpdateStatusPerubahanIKP,
} from "@/services/ikp";
import store from "@/redux/store";
import { TbFaceIdError } from "react-icons/tb";
import ConfirmModal from "@/components/modals/UtilsModal/ConfirmModal";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreIKPSetuju } from "@/interface/request/ikp.interface";

interface PropsPerubahan {
  id: number;
  sasaran: string;
  indicator: string;
  target: string;
  description: string;
  dialog: string;
  ubahTarget: string;
  status: string;
}

export default function DetailIKP() {
  const { id } = useParams();
  const { role } = store.getState().auth;
  const [status, setStatus] = useState<string>("MENUNGGU");
  const { data, isFetching, refetch, error } = useGetDetailIKP(id || "");
  const DATA_DETAIL = useMemo(() => {
    if (!data) return null;
    const ikps = data.data.ikps; // misalnya item.ikps adalah array of object dengan properti "status"

    const hasMenunggu = ikps.some((el) => el.status === "MENUNGGU");
    const allSetujui = ikps.every((el) => el.status === "DISETUJUI");
    const allDitolak = ikps.every((el) => el.status === "DITOLAK");

    if (hasMenunggu) {
      setStatus("MENUNGGU");
    } else if (allSetujui) {
      setStatus("SETUJUI");
    } else if (allDitolak) {
      setStatus("DITOLAK");
    } else {
      setStatus("MENUNGGU");
    }

    return data.data;
  }, [data, id]);

  useEffect(() => {
    refetch();
  }, [data]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/dialog-kinerja");
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
      navigate("/dialog-kinerja");
    } catch (error) {
      const err = error as AxiosError<BaseErrorRes>;
      ErrorToast({
        text:
          (err.response?.data.error as string) ||
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
          sasaran: item.sasaran || "",
          indicator: item.indicator || "",
          target: item.target || "",
          description: item.description || "",
          dialog: item.dialog || "",
          ubahTarget: item.ubahTarget || "",
          status: "DITOLAK",
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
        (item) => item.status !== "DISETUJUI",
      );
      const allIds = filteredIKPs.map((item) => String(item.id));

      setSelectedIds(allIds);

      const allFormData: PropsPerubahan[] = filteredIKPs.map((item) => ({
        id: item.id || 0,
        sasaran: item.sasaran || "",
        indicator: item.indicator || "",
        target: item.target || "",
        description: item.description || "",
        dialog: item.dialog || "",
        ubahTarget: item.ubahTarget || "",
        status: "DITOLAK",
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
            !existingIds.includes(item.id || 0) && item.status !== "DISETUJUI", // <--- tambahkan ini
        )
        .map((item) => ({
          id: item.id || 0,
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
      navigate("/dialog-kinerja");
    } catch (error) {
      const err = error as AxiosError<BaseErrorRes>;
      ErrorToast({
        text:
          (err.response?.data.error as string) ||
          "Terjadi kesalahan saat mengubah data",
      });
    } finally {
      setIsLoadingConfirm(false);
    }
  };

  const [selectedId, setSelectedid] = useState<number | null>(null);
  const { mutate: mutateUpdate } = useUpdateIKP();
  const handleUpdate = async () => {
    setIsLoadingConfirm(true);

    const item = DATA_DETAIL?.ikps.find((ikp) => ikp.id === selectedId);

    const dataToSend: StoreIKPSetuju = {
      sasaran: item?.sasaran || "",
      indicator: item?.indicator || "",
      target: item?.ubahTarget || "",
      status: "DISETUJUI",
      realisasi: "20",
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
            onCloseConfirm();
            setSelectedid(null);
            refetch();
          },
          onError: (error: AxiosError<BaseErrorRes>) => {
            setIsLoadingConfirm(false);
            onCloseConfirm();
            setSelectedid(null);
            ErrorToast({
              text:
                (error.response?.data.error as string) ||
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
        handleSubmit={handleUpdate}
      />
      <ConfirmModal
        isOpen={isOpenConfirm3}
        onClose={onCloseConfirm3}
        isLoading={isLoadingConfirm}
        handleSubmit={handleConfirmPerubahan}
      />
      <BreadcrumbAdmin location="/Dialog-Kinerja/Detail-Data" />
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="flex">
          <Link
            to={`/dialog-kinerja`}
            className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
          >
            <LuArrowLeft /> Kembali
          </Link>
        </div>
        <TitleCase title="Detail Dialog Kinerja (IKP)" />

        {!isPengajuaun ? (
          <div className="bg-white shadow-md rounded-xl border p-4 min-h-[64vh]">
            {role === "PEGAWAI" && status === "MENUNGGU" && (
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
                      {role === "PEGAWAI" && (
                        <th
                          className={`border-b-2 border-accent-gray p-2 text-left text-sm bg-primary text-white rounded-se-md`}
                        >
                          Dialog
                        </th>
                      )}
                      {role !== "PEGAWAI" && (
                        <th
                          className={`border-b-2 border-accent-gray p-2 text-left text-sm bg-primary text-white`}
                        >
                          Dialog
                        </th>
                      )}
                      {role !== "PEGAWAI" && (
                        <th
                          className={`border-b-2 border-accent-gray p-2 text-center text-sm bg-primary text-white rounded-se-md`}
                        >
                          Aksi
                        </th>
                      )}
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
                          <td
                            className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left`}
                          >
                            {item.realisasi || "-"}
                          </td>
                          <td
                            className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left ${item.status === "DISETUJUI" ? "text-success" : item.status === "DITOLAK" ? "text-danger" : "text-warning"}`}
                          >
                            {item.status === "DISETUJUI"
                              ? "Disetujui"
                              : item.status === "DITOLAK"
                                ? "Ditolak"
                                : "Menunggu"}
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
                          {role !== "PEGAWAI" && (
                            <td
                              className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left`}
                            >
                              {item.status === "DISETUJUI" ? (
                                <div className="flex items-center justify-center gap-2">
                                  <Button
                                    size="sm"
                                    isIconOnly
                                    className="bg-alert-warning text-warning"
                                  >
                                    <LuFilePenLine size={12} />
                                  </Button>
                                </div>
                              ) : item.status === "DITOLAK" ? (
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
                                  >
                                    <LucideXCircle size={12} />
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex items-center justify-center gap-2">
                                  <Button
                                    size="sm"
                                    isIconOnly
                                    className="bg-alert-info text-info"
                                  >
                                    <LucidePencilLine />
                                  </Button>
                                </div>
                              )}
                            </td>
                          )}
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
                <div className="bg-[#F1FCFA] text-black font-semibold py-3 px-4 text-xs rounded-lg">
                  Pengajuan Perubahan
                </div>
                <div>
                  {formDataPerubahan.length > 0 ? (
                    <div className="overflow-x-auto">
                      {formDataPerubahan.map((item, index) => (
                        <div
                          className="flex items-start gap-2 mb-4 w-full"
                          key={index}
                        >
                          <div className="w-10 flex items-center justify-center border bg-[#F2F2F7] rounded-md p-2.5 text-sm">
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
            {role === "PEGAWAI" && status === "MENUNGGU" && (
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
