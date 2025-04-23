import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { LuSave, LuX } from "react-icons/lu";
import { IoFileTrayFullSharp } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LucideCalendarDays, LucideUploadCloud } from "lucide-react";
import { convertFileToBase64 } from "@/utils/base64Formater";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { useCreateEFilling } from "@/services/efilling";
import { StoreEFilling } from "@/interface/request/efilling.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";

interface props {
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
}

interface formProps {
  judulDokumen: string;
  tanggalDokumen: string;
  uraian: string;
  lampiran: string;
}

interface errorProps {
  judulDokumen?: string;
  tanggalDokumen?: string;
  uraian?: string;
  lampiran?: string;
}

const CreateModal = ({ isOpen, onClose, handleClose }: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [waktuKegiatan, setWaktuKegiatan] = useState<Date | null>(null);

  const [formData, setFormData] = useState<formProps>({
    judulDokumen: "",
    tanggalDokumen: "",
    uraian: "",
    lampiran: "",
  });

  const [formError, setFormError] = useState<errorProps>({});

  useEffect(() => {
    setFormData({
      judulDokumen: "",
      tanggalDokumen: "",
      uraian: "",
      lampiran: "",
    });
    setIsLoading(false);
    setWaktuKegiatan(null);
    setFormError({});
  }, [isOpen]);

  const validateData = () => {
    const errors: errorProps = {};
    if (!formData.judulDokumen)
      errors.judulDokumen = "Judul dokumen tidak boleh kosong";
    if (!waktuKegiatan)
      errors.tanggalDokumen = "Tanggal dokumen tidak boleh kosong";
    if (!formData.uraian) errors.uraian = "Uraian tidak boleh kosong";
    if (!formData.lampiran) errors.lampiran = "Lampiran tidak boleh kosong";

    return errors;
  };

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileToShow = await convertFileToBase64(file);
      setFormData({ ...formData, lampiran: fileToShow });
    } else {
      setFormData({ ...formData, lampiran: "" });
    }
  };

  const { mutate: mutatePost } = useCreateEFilling();

  const handleSubmit = () => {
    setFormError({});

    const validate = validateData();
    if (Object.keys(validate).length > 0) {
      setFormError(validate);
      return false;
    }

    setIsLoading(true);

    const formToSend: StoreEFilling = {};
    if (formData.judulDokumen) formToSend.title = formData.judulDokumen;
    if (waktuKegiatan)
      formToSend.tanggal = new Date(waktuKegiatan || "")
        .toISOString()
        .slice(0, 10);
    if (formData.uraian) formToSend.description = formData.uraian;
    if (formData.lampiran) formToSend.file = formData.lampiran;

    try {
      mutatePost(formToSend, {
        onSuccess: () => {
          SuccessToast({ text: "Data berhasil ditambahkan" });
          handleClose();
        },
        onError: (error: AxiosError<BaseErrorRes>) => {
          ErrorToast({
            text:
              (error.response?.data.message as string) ||
              "Terjadi kesalahan saat mengirim data",
          });
          setIsLoading(false);
          throw error;
        },
      });
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="4xl">
        <ModalContent>
          <ModalHeader className="flex items-center justify-between">
            <span className="text-base font-semibold">
              Tambah Data E-Filling
            </span>
            <LuX
              className="text-danger border border-danger rounded-full p-2 cursor-pointer"
              onClick={onClose}
              size={32}
            />
          </ModalHeader>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom flex flex-col gap-2 pb-8">
            <div className="flex flex-col gap-1">
              <label htmlFor="lokasi" className="text-xs font-semibold">
                Judul Dokumen <span className="text-danger">*</span>
              </label>
              <Input
                aria-label="lokasi"
                variant="bordered"
                radius="sm"
                value={formData.judulDokumen}
                onChange={(e) =>
                  setFormData({ ...formData, judulDokumen: e.target.value })
                }
                placeholder="Masukkan disini"
                classNames={{
                  input: "text-xs",
                }}
              />
              <div className="text-xs italic text-danger">
                {formError.judulDokumen}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-1 md:col-span-1 col-span-3">
                <label htmlFor="tanggal" className="text-xs font-semibold">
                  Tanggal <span className="text-danger">*</span>
                </label>
                <DatePicker
                  selected={waktuKegiatan}
                  onChange={(date) => setWaktuKegiatan(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Pilih Tanggal"
                  showIcon
                  icon={<LucideCalendarDays size={8} />}
                  calendarIconClassName="absolute left-1 top-[50%] -translate-y-[50%]"
                  // popperClassName="absolute"
                  popperPlacement="bottom"
                  closeOnScroll={true}
                  customInput={
                    <Input
                      aria-label="tanggal"
                      radius="sm"
                      variant="bordered"
                      classNames={{
                        input: "text-xs",
                      }}
                    />
                  }
                />
                <div className="text-xs italic text-danger">
                  {formError.tanggalDokumen}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lokasi" className="text-xs font-semibold">
                Uraian <span className="text-danger">*</span>
              </label>
              <Textarea
                aria-label="lokasi"
                variant="bordered"
                radius="sm"
                value={formData.uraian}
                onChange={(e) =>
                  setFormData({ ...formData, uraian: e.target.value })
                }
                placeholder="Masukkan disini"
                classNames={{
                  input: "text-xs",
                }}
              />
              <div className="text-xs italic text-danger">
                {formError.uraian}
              </div>
            </div>
            <div className="max-w-80">
              <div className="mb-1">
                <label htmlFor="content" className="font-semibold text-xs">
                  Lampiran <span className="text-danger">*</span>
                </label>
              </div>
              <div className="border p-8 mb-2 flex items-center justify-center">
                {formData.lampiran ? (
                  <IoFileTrayFullSharp size={32} />
                ) : (
                  <LucideUploadCloud size={32} />
                )}
              </div>
              <input
                type="file"
                onChange={handleChangeFile}
                accept=".png,.jpg,.jpeg,.pdf"
              />
              <div className="text-danger text-[0.7rem] mt-1">
                {formError.lampiran}
              </div>
            </div>
            <div className="flex items-center justify-end w-full gap-2">
              <Button
                isLoading={isLoading}
                onPress={handleSubmit}
                className="border border-button-primary bg-button-primary text-white font-semibold"
                size="sm"
                radius="sm"
              >
                <LuSave /> Simpan Data
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateModal;
