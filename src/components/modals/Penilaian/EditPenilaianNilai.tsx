import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tooltip,
} from "@heroui/react";
import { LuSave, LuX } from "react-icons/lu";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { convertFileToBase64 } from "@/utils/base64Formater";
import { SuccessToast } from "@/utils/ToastMessage";

interface props {
  nama: string;
  jabatan: string;
  nip: string;
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

const EditPenilaianNilai = ({
  nama,
  jabatan,
  nip,
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

  const [formError, setFormError] = useState<formErrorProps>({});

  useEffect(() => {
    setFormError({});
  }, [isOpen]);

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
  const handleSubmit = () => {
    setIsLoading(true);
    // const formatted = new Date(waktuKegiatan || "").toISOString().slice(0, 10);
    // (formatted)
    setTimeout(() => {
      handleClose();
      SuccessToast({ text: "Data berhasil disimpan" });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="5xl">
        <ModalContent>
          <ModalHeader className="flex items-center justify-between">
            <span className="text-base font-semibold">Edit Penilaian</span>
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
              <div className="bg-[#CEF9EF] p-2 rounded-lg text-sm font-semibold">
                <h1>Penilaian</h1>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="lokasi"
                    className="text-xs font-semibold flex items-center gap-2"
                  >
                    Kinerja
                    <Tooltip
                      content="Tidak ada file"
                      radius="full"
                      color="primary"
                      placement="top-start"
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
                      content="Tidak ada file"
                      radius="full"
                      color="primary"
                      placement="top-start"
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
                      content="Tidak ada file"
                      radius="full"
                      color="primary"
                      placement="top-start"
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
                      content="Tidak ada file"
                      radius="full"
                      color="primary"
                      placement="top-start"
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
                      content="Tidak ada file"
                      radius="full"
                      color="primary"
                      placement="top-start"
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

export default EditPenilaianNilai;
