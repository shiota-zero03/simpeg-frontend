import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Tooltip,
} from "@heroui/react";
import { LuSave, LuX } from "react-icons/lu";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { convertFileToBase64 } from "@/utils/base64Formater";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { LucideChevronDownCircle } from "lucide-react";
import {
  TooltipAttitudeNilai,
  TooltipBobotAttitude,
  TooltipBobotDisiplin,
  TooltipBobotKerjasama,
  TooltipBobotKinerja,
  TooltipBobotLoyalitas,
  TooltipDisiplinNilai,
  TooltipKerjasamaNilai,
  TooltipKinerjaNilai,
  TooltipLoyalitasNilai,
} from "@/pages/PenilaianKinerja/TooltipContent";
import { useCreatePenilaian } from "@/services/penilaian";
import { StorePenilaian } from "@/interface/request/penilaian.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { PernilaianListRes } from "@/interface/responses/penilaian.interface";

interface props {
  userData: PernilaianListRes | null;
  userId: string;
  nama: string;
  jabatan: string;
  nip: string;
  month: string;
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
}

interface formProps {
  kinerja: number;
  kinerjaAttach: string;
  disiplin: number;
  disiplinAttach: string;
  loyalitas: number;
  loyalitasAttach: string;
  kerjasama: number;
  kerjasamaAttach: string;
  attitude: number;
  attitudeAttach: string;
}

interface formErrorProps {
  kinerja?: string;
  kinerjaAttach?: string;
  disiplin?: string;
  disiplinAttach?: string;
  loyalitas?: string;
  loyalitasAttach?: string;
  kerjasama?: string;
  kerjasamaAttach?: string;
  attitude?: string;
  attitudeAttach?: string;
}

interface formBobotProps {
  kinerja: string;
  kinerjaAttach: string;
  disiplin: string;
  disiplinAttach: string;
  loyalitas: string;
  loyalitasAttach: string;
  kerjasama: string;
  kerjasamaAttach: string;
  attitude: string;
  attitudeAttach: string;
}

interface formErrorBobotProps {
  kinerja?: string;
  kinerjaAttach?: string;
  disiplin?: string;
  disiplinAttach?: string;
  loyalitas?: string;
  loyalitasAttach?: string;
  kerjasama?: string;
  kerjasamaAttach?: string;
  attitude?: string;
  attitudeAttach?: string;
}

const formatMonthYear = (value: string) => {
  if (!value) return "";
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1); // bulan dimulai dari 0
  return new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(date);
};

const SelectDataBobot: { name: string; key: string }[] = [
  { name: "Tingkat 1 (Nilai 1) - Sangat Kurang", key: "1" },
  { name: "Tingkat 2 (Nilai 2) - Kurang", key: "2" },
  { name: "Tingkat 3 (Nilai 3) - Cukup", key: "3" },
  { name: "Tingkat 4 (Nilai 4) - Baik", key: "4" },
  { name: "Tingkat 5 (Nilai 5) - Sangat Baik", key: "5" },
];

const EditPenilaian = ({
  userData,
  userId,
  nama,
  jabatan,
  nip,
  month,
  isOpen,
  onClose,
  handleClose,
}: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<formProps>({
    kinerja: 0,
    kinerjaAttach: "",
    disiplin: 0,
    disiplinAttach: "",
    loyalitas: 0,
    loyalitasAttach: "",
    kerjasama: 0,
    kerjasamaAttach: "",
    attitude: 0,
    attitudeAttach: "",
  });

  const [formDataBobot, setFormDataBobot] = useState<formBobotProps>({
    kinerja: "",
    kinerjaAttach: "",
    disiplin: "",
    disiplinAttach: "",
    loyalitas: "",
    loyalitasAttach: "",
    kerjasama: "",
    kerjasamaAttach: "",
    attitude: "",
    attitudeAttach: "",
  });

  const [formError, setFormError] = useState<formErrorProps>({});
  const [formBobotError, setFormBobotError] = useState<formErrorBobotProps>({});

  useEffect(() => {
    setFormError({});
    setFormBobotError({});
  }, [isOpen]);

  useEffect(() => {
    if (userData) {
      setFormData({
        kinerja: userData.performanceBobot || 0,
        kinerjaAttach: userData.performanceProofBobot || "",
        disiplin: userData.disciplineBobot || 0,
        disiplinAttach: userData.disciplineProofBobot || "",
        loyalitas: userData.loyaltyBobot || 0,
        loyalitasAttach: userData.loyaltyProofBobot || "",
        kerjasama: userData.cooperationBobot || 0,
        kerjasamaAttach: userData.cooperationProofBobot || "",
        attitude: userData.attitudeBobot || 0,
        attitudeAttach: userData.attitudeProofBobot || "",
      });

      setFormDataBobot({
        kinerja: String(userData.performanceNilai || ""),
        kinerjaAttach: userData.performanceProofNilai || "",
        disiplin: String(userData.disciplineNilai || ""),
        disiplinAttach: userData.disciplineProofNilai || "",
        loyalitas: String(userData.loyaltyNilai || ""),
        loyalitasAttach: userData.loyaltyProofNilai || "",
        kerjasama: String(userData.cooperationNilai || ""),
        kerjasamaAttach: userData.cooperationProofNilai || "",
        attitude: String(userData.attitudeNilai || ""),
        attitudeAttach: userData.attitudeProofNilai || "",
      });
    }
  }, [isOpen, userData]);

  const handleChangeFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type:
      | "kinerjaAttach"
      | "disiplinAttach"
      | "loyalitasAttach"
      | "kerjasamaAttach"
      | "attitudeAttach",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileToShow = await convertFileToBase64(file);
      setFormData({ ...formData, [type]: fileToShow });
    } else {
      setFormData({ ...formData, [type]: "" });
    }
  };

  const handleChangeFileBobot = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type:
      | "kinerjaAttach"
      | "disiplinAttach"
      | "loyalitasAttach"
      | "kerjasamaAttach"
      | "attitudeAttach",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileToShow = await convertFileToBase64(file);
      setFormDataBobot({ ...formDataBobot, [type]: fileToShow });
    } else {
      setFormDataBobot({ ...formDataBobot, [type]: "" });
    }
  };

  const { mutate: mutateUpdate } = useCreatePenilaian();
  const handleSubmit = async () => {
    setIsLoading(true);

    const dataToSend: StorePenilaian = {};
    dataToSend.userId = userId;
    dataToSend.performanceNilai = Number(formDataBobot.kinerja || 0);
    dataToSend.performanceProofNilai = formDataBobot.kinerjaAttach;
    dataToSend.disciplineNilai = Number(formDataBobot.disiplin || 0);
    dataToSend.disciplineProofNilai = formDataBobot.disiplinAttach;
    dataToSend.loyaltyNilai = Number(formDataBobot.loyalitas || 0);
    dataToSend.loyaltyProofNilai = formDataBobot.loyalitasAttach;
    dataToSend.cooperationNilai = Number(formDataBobot.kerjasama || 0);
    dataToSend.cooperationProofNilai = formDataBobot.kerjasamaAttach;
    dataToSend.attitudeNilai = Number(formDataBobot.attitude || 0);
    dataToSend.attitudeProofNilai = formDataBobot.attitudeAttach;

    dataToSend.performanceBobot = formData.kinerja || 0;
    dataToSend.performanceProofBobot = formData.kinerjaAttach;
    dataToSend.disciplineBobot = formData.disiplin || 0;
    dataToSend.disciplineProofBobot = formData.disiplinAttach;
    dataToSend.loyaltyBobot = formData.loyalitas || 0;
    dataToSend.loyaltyProofBobot = formData.loyalitasAttach;
    dataToSend.cooperationBobot = formData.kerjasama || 0;
    dataToSend.cooperationProofBobot = formData.kerjasamaAttach;
    dataToSend.attitudeBobot = formData.attitude || 0;
    dataToSend.attitudeProofBobot = formData.attitudeAttach;
    dataToSend.bulanTahun = `${month}-01`;

    console.log(dataToSend);

    try {
      mutateUpdate(dataToSend, {
        onSuccess: () => {
          SuccessToast({ text: "Data berhasil disetujui" });
          setIsLoading(false);
          handleClose();
        },
        onError: (error: AxiosError<BaseErrorRes>) => {
          setIsLoading(false);
          ErrorToast({
            text:
              (error.response?.data.message as string) ||
              "Terjadi kesalahan saat menambah data",
          });
          throw error;
        },
      });
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const [isBobotOpen, setIsBobotOpen] = useState(true);
  const [isNilaiOpen, setIsNilaiOpen] = useState(false);

  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="5xl">
        <ModalContent>
          <ModalHeader className="flex items-center justify-between">
            <span className="text-base font-semibold">
              Edit Penilaian (Periode {formatMonthYear(month)})
            </span>
            <LuX
              className="text-danger border border-danger rounded-full p-2 cursor-pointer"
              onClick={onClose}
              size={32}
            />
          </ModalHeader>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom flex flex-col gap-2 pb-8">
            <div className="overflow-x-auto flex flex-col gap-4">
              <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                <Input
                  radius="sm"
                  variant="bordered"
                  label={"Nama"}
                  labelPlacement="outside"
                  isDisabled
                  type="text"
                  value={nama}
                />
                <Input
                  radius="sm"
                  variant="bordered"
                  label={"Jabatan"}
                  labelPlacement="outside"
                  isDisabled
                  type="text"
                  value={jabatan}
                />
                <Input
                  radius="sm"
                  variant="bordered"
                  label={"NIP"}
                  labelPlacement="outside"
                  isDisabled
                  type="text"
                  value={nip}
                />
              </div>
              <div className="flex flex-col">
                <div className="bg-[#CEF9EF] p-2 rounded-lg text-sm font-semibold flex items-center justify-between">
                  <h1>Penilaian Berdasarkan Nilai</h1>
                  {
                    <LucideChevronDownCircle
                      onClick={() => setIsBobotOpen(!isBobotOpen)}
                      className={`${isBobotOpen ? "rotate-180" : "rotate-0"} cursor-pointer duration-200`}
                    />
                  }
                </div>
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isBobotOpen
                      ? "max-h-[720px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="lokasi"
                        className="text-xs font-semibold flex items-center gap-2"
                      >
                        Kinerja
                        <Tooltip
                          content={<TooltipKinerjaNilai />}
                          radius="sm"
                          color="primary"
                          placement="right"
                          size="sm"
                        >
                          <FaQuestionCircle
                            className="text-info border-info"
                            size={12}
                          />
                        </Tooltip>
                        <span className="text-danger">*</span>
                      </label>
                      <Select
                        aria-label="lokasi"
                        variant="bordered"
                        radius="sm"
                        selectedKeys={[formDataBobot.kinerja]}
                        onChange={(e) =>
                          setFormDataBobot({
                            ...formDataBobot,
                            kinerja: e.target.value,
                          })
                        }
                        placeholder="Pilih nilai"
                        classNames={{
                          base: "text-xs",
                        }}
                      >
                        {SelectDataBobot.map((item) => (
                          <SelectItem key={item.key}>{item.name}</SelectItem>
                        ))}
                      </Select>
                      <div className="text-xs italic text-danger">
                        {formBobotError.kinerja}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="lokasi"
                        className="text-xs font-semibold flex items-center gap-2"
                      >
                        Bukti Pendukung
                      </label>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleChangeFileBobot(e, "kinerjaAttach")
                        }
                      />
                      <div className="text-xs italic text-danger">
                        {formBobotError.kinerjaAttach}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="lokasi"
                        className="text-xs font-semibold flex items-center gap-2"
                      >
                        Disiplin
                        <Tooltip
                          content={<TooltipDisiplinNilai />}
                          radius="sm"
                          color="primary"
                          placement="right"
                          size="sm"
                        >
                          <FaQuestionCircle
                            className="text-info border-info"
                            size={12}
                          />
                        </Tooltip>
                        <span className="text-danger">*</span>
                      </label>
                      <Select
                        aria-label="lokasi"
                        variant="bordered"
                        radius="sm"
                        selectedKeys={[formDataBobot.disiplin]}
                        onChange={(e) =>
                          setFormDataBobot({
                            ...formDataBobot,
                            disiplin: e.target.value,
                          })
                        }
                        placeholder="Pilih nilai"
                        classNames={{
                          base: "text-xs",
                        }}
                      >
                        {SelectDataBobot.map((item) => (
                          <SelectItem key={item.key}>{item.name}</SelectItem>
                        ))}
                      </Select>
                      <div className="text-xs italic text-danger">
                        {formBobotError.disiplin}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="lokasi"
                        className="text-xs font-semibold flex items-center gap-2"
                      >
                        Bukti Pendukung
                      </label>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleChangeFileBobot(e, "disiplinAttach")
                        }
                      />
                      <div className="text-xs italic text-danger">
                        {formBobotError.disiplinAttach}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="lokasi"
                        className="text-xs font-semibold flex items-center gap-2"
                      >
                        Loyalitas
                        <Tooltip
                          content={<TooltipLoyalitasNilai />}
                          radius="sm"
                          color="primary"
                          placement="right"
                          size="sm"
                        >
                          <FaQuestionCircle
                            className="text-info border-info"
                            size={12}
                          />
                        </Tooltip>
                        <span className="text-danger">*</span>
                      </label>
                      <Select
                        aria-label="lokasi"
                        variant="bordered"
                        radius="sm"
                        selectedKeys={[formDataBobot.loyalitas]}
                        onChange={(e) =>
                          setFormDataBobot({
                            ...formDataBobot,
                            loyalitas: e.target.value,
                          })
                        }
                        placeholder="Pilih nilai"
                        classNames={{
                          base: "text-xs",
                        }}
                      >
                        {SelectDataBobot.map((item) => (
                          <SelectItem key={item.key}>{item.name}</SelectItem>
                        ))}
                      </Select>
                      <div className="text-xs italic text-danger">
                        {formBobotError.loyalitas}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="lokasi"
                        className="text-xs font-semibold flex items-center gap-2"
                      >
                        Bukti Pendukung
                      </label>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleChangeFileBobot(e, "loyalitasAttach")
                        }
                      />
                      <div className="text-xs italic text-danger">
                        {formBobotError.loyalitasAttach}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="lokasi"
                        className="text-xs font-semibold flex items-center gap-2"
                      >
                        Kerjasama
                        <Tooltip
                          content={<TooltipKerjasamaNilai />}
                          radius="sm"
                          color="primary"
                          placement="right"
                          size="sm"
                        >
                          <FaQuestionCircle
                            className="text-info border-info"
                            size={12}
                          />
                        </Tooltip>
                        <span className="text-danger">*</span>
                      </label>
                      <Select
                        aria-label="lokasi"
                        variant="bordered"
                        radius="sm"
                        selectedKeys={[formDataBobot.kerjasama]}
                        onChange={(e) =>
                          setFormDataBobot({
                            ...formDataBobot,
                            kerjasama: e.target.value,
                          })
                        }
                        placeholder="Pilih nilai"
                        classNames={{
                          base: "text-xs",
                        }}
                      >
                        {SelectDataBobot.map((item) => (
                          <SelectItem key={item.key}>{item.name}</SelectItem>
                        ))}
                      </Select>
                      <div className="text-xs italic text-danger">
                        {formBobotError.kerjasama}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="lokasi"
                        className="text-xs font-semibold flex items-center gap-2"
                      >
                        Bukti Pendukung
                      </label>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleChangeFileBobot(e, "kerjasamaAttach")
                        }
                      />
                      <div className="text-xs italic text-danger">
                        {formBobotError.kerjasamaAttach}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="lokasi"
                        className="text-xs font-semibold flex items-center gap-2"
                      >
                        Attitude
                        <Tooltip
                          content={<TooltipAttitudeNilai />}
                          radius="sm"
                          color="primary"
                          placement="right"
                          size="sm"
                        >
                          <FaQuestionCircle
                            className="text-info border-info"
                            size={12}
                          />
                        </Tooltip>
                        <span className="text-danger">*</span>
                      </label>
                      <Select
                        aria-label="lokasi"
                        variant="bordered"
                        radius="sm"
                        selectedKeys={[formDataBobot.attitude]}
                        onChange={(e) =>
                          setFormDataBobot({
                            ...formDataBobot,
                            attitude: e.target.value,
                          })
                        }
                        placeholder="Pilih nilai"
                        classNames={{
                          base: "text-xs",
                        }}
                      >
                        {SelectDataBobot.map((item) => (
                          <SelectItem key={item.key}>{item.name}</SelectItem>
                        ))}
                      </Select>
                      <div className="text-xs italic text-danger">
                        {formBobotError.attitude}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="lokasi"
                        className="text-xs font-semibold flex items-center gap-2"
                      >
                        Bukti Pendukung
                      </label>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleChangeFileBobot(e, "attitudeAttach")
                        }
                      />
                      <div className="text-xs italic text-danger">
                        {formBobotError.attitudeAttach}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="bg-[#CEF9EF] p-2 rounded-lg text-sm font-semibold flex items-center justify-between">
                  <h1>Penilaian Berdasarkan Bobot</h1>
                  {
                    <LucideChevronDownCircle
                      onClick={() => setIsNilaiOpen(!isNilaiOpen)}
                      className={`${isNilaiOpen ? "rotate-180" : "rotate-0"} cursor-pointer duration-200`}
                    />
                  }
                </div>
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isNilaiOpen
                      ? "max-h-[720px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="lokasi"
                        className="text-xs font-semibold flex items-center gap-2"
                      >
                        Kinerja
                        <Tooltip
                          content={<TooltipBobotKinerja />}
                          radius="sm"
                          color="primary"
                          placement="right"
                          size="sm"
                        >
                          <FaQuestionCircle
                            className="text-info border-info"
                            size={12}
                          />
                        </Tooltip>
                        <span className="text-danger">*</span>
                      </label>
                      <Input
                        aria-label="lokasi"
                        type="number"
                        variant="bordered"
                        radius="sm"
                        value={String(formData.kinerja)}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            kinerja: Number(e.target.value),
                          })
                        }
                        placeholder="Masukkan Disini"
                        classNames={{
                          input: "text-xs",
                        }}
                      />
                      <div className="text-xs italic text-danger">
                        {formError.kinerja}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="lokasi"
                        className="text-xs font-semibold flex items-center gap-2"
                      >
                        Bukti Pendukung
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleChangeFile(e, "kinerjaAttach")}
                      />
                      <div className="text-xs italic text-danger">
                        {formError.kinerjaAttach}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="lokasi"
                        className="text-xs font-semibold flex items-center gap-2"
                      >
                        Disiplin
                        <Tooltip
                          content={<TooltipBobotDisiplin />}
                          radius="sm"
                          color="primary"
                          placement="right"
                          size="sm"
                        >
                          <FaQuestionCircle
                            className="text-info border-info"
                            size={12}
                          />
                        </Tooltip>
                        <span className="text-danger">*</span>
                      </label>
                      <Input
                        aria-label="lokasi"
                        type="number"
                        variant="bordered"
                        radius="sm"
                        value={String(formData.disiplin)}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            disiplin: Number(e.target.value),
                          })
                        }
                        placeholder="Masukkan Disini"
                        classNames={{
                          input: "text-xs",
                        }}
                      />
                      <div className="text-xs italic text-danger">
                        {formError.disiplin}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="lokasi"
                        className="text-xs font-semibold flex items-center gap-2"
                      >
                        Bukti Pendukung
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleChangeFile(e, "disiplinAttach")}
                      />
                      <div className="text-xs italic text-danger">
                        {formError.disiplinAttach}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="lokasi"
                        className="text-xs font-semibold flex items-center gap-2"
                      >
                        Loyalitas
                        <Tooltip
                          content={<TooltipBobotLoyalitas />}
                          radius="sm"
                          color="primary"
                          placement="right"
                          size="sm"
                        >
                          <FaQuestionCircle
                            className="text-info border-info"
                            size={12}
                          />
                        </Tooltip>
                        <span className="text-danger">*</span>
                      </label>
                      <Input
                        aria-label="lokasi"
                        type="number"
                        variant="bordered"
                        radius="sm"
                        value={String(formData.loyalitas)}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            loyalitas: Number(e.target.value),
                          })
                        }
                        placeholder="Masukkan Disini"
                        classNames={{
                          input: "text-xs",
                        }}
                      />
                      <div className="text-xs italic text-danger">
                        {formError.loyalitas}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="lokasi"
                        className="text-xs font-semibold flex items-center gap-2"
                      >
                        Bukti Pendukung
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleChangeFile(e, "loyalitasAttach")}
                      />
                      <div className="text-xs italic text-danger">
                        {formError.loyalitasAttach}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="lokasi"
                        className="text-xs font-semibold flex items-center gap-2"
                      >
                        Kerjasama
                        <Tooltip
                          content={<TooltipBobotKerjasama />}
                          radius="sm"
                          color="primary"
                          placement="right"
                          size="sm"
                        >
                          <FaQuestionCircle
                            className="text-info border-info"
                            size={12}
                          />
                        </Tooltip>
                        <span className="text-danger">*</span>
                      </label>
                      <Input
                        aria-label="lokasi"
                        type="number"
                        variant="bordered"
                        radius="sm"
                        value={String(formData.kerjasama)}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            kerjasama: Number(e.target.value),
                          })
                        }
                        placeholder="Masukkan Disini"
                        classNames={{
                          input: "text-xs",
                        }}
                      />
                      <div className="text-xs italic text-danger">
                        {formError.kerjasama}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="lokasi"
                        className="text-xs font-semibold flex items-center gap-2"
                      >
                        Bukti Pendukung
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleChangeFile(e, "kerjasamaAttach")}
                      />
                      <div className="text-xs italic text-danger">
                        {formError.kerjasamaAttach}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="lokasi"
                        className="text-xs font-semibold flex items-center gap-2"
                      >
                        Attitude
                        <Tooltip
                          content={<TooltipBobotAttitude />}
                          radius="sm"
                          color="primary"
                          placement="right"
                          size="sm"
                        >
                          <FaQuestionCircle
                            className="text-info border-info"
                            size={12}
                          />
                        </Tooltip>
                        <span className="text-danger">*</span>
                      </label>
                      <Input
                        aria-label="lokasi"
                        type="number"
                        variant="bordered"
                        radius="sm"
                        value={String(formData.attitude)}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            attitude: Number(e.target.value),
                          })
                        }
                        placeholder="Masukkan Disini"
                        classNames={{
                          input: "text-xs",
                        }}
                      />
                      <div className="text-xs italic text-danger">
                        {formError.attitude}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="lokasi"
                        className="text-xs font-semibold flex items-center gap-2"
                      >
                        Bukti Pendukung
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleChangeFile(e, "attitudeAttach")}
                      />
                      <div className="text-xs italic text-danger">
                        {formError.attitudeAttach}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end w-full gap-2">
                <Button
                  isLoading={isLoading}
                  onPress={handleSubmit}
                  className="border border-button-primary bg-button-primary text-white font-semibold w-full"
                  size="sm"
                  radius="sm"
                >
                  <LuSave /> Simpan Data
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditPenilaian;
