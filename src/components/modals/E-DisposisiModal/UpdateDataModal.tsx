import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Radio,
  RadioGroup,
  Textarea,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { LuSave, LuX } from "react-icons/lu";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import {
  useGetDetailEDisposisi,
  useUpdateEDisposisi,
} from "@/services/e-disposisi";
import { StoreEDisposisi } from "@/interface/request/e-disposisi.interface";
import { convertFileToBase64 } from "@/utils/base64Formater";
import { IoFileTrayFullSharp } from "react-icons/io5";
import { LucideUploadCloud } from "lucide-react";
import { DateYMDFormat } from "@/utils/dateFormater";

interface props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
}

interface formProps {
  file?: string;
  suratDari?: string;
  nomorSurat?: string;
  tanggalSurat?: string;
  tanggalDiterima?: string;
  sifat?: string;
  description?: string;
}

interface errorProps {
  file?: string;
  suratDari?: string;
  nomorSurat?: string;
  tanggalSurat?: string;
  tanggalDiterima?: string;
  sifat?: string;
  description?: string;
}

const UpdateDataModal = ({ isOpen, onClose, handleClose, id }: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<formProps>({
    file: "",
    suratDari: "",
    nomorSurat: "",
    tanggalSurat: "",
    tanggalDiterima: "",
    sifat: "",
    description: "",
  });

  const [formError, setFormError] = useState<errorProps>({});

  useEffect(() => {
    setIsLoading(false);
    setFormError({});
  }, [isOpen]);

  const { data, isFetching, refetch } = useGetDetailEDisposisi(id || "");

  useEffect(() => {
    refetch();
  }, [id]);

  useEffect(() => {
    if (data) {
      const dataFetching = data.data;
      setFormData({
        file: "",
        suratDari: dataFetching.suratDari,
        nomorSurat: dataFetching.nomorSurat,
        tanggalSurat: DateYMDFormat(dataFetching.tanggalSurat),
        tanggalDiterima: DateYMDFormat(dataFetching.tanggalDiterima),
        sifat: dataFetching.sifat,
        description: dataFetching.description,
      });
    }
  }, [data, isFetching]);

  const validateData = () => {
    const errors: errorProps = {};
    if (!formData.suratDari) errors.suratDari = "suratDari tidak boleh kosong;";
    if (!formData.nomorSurat)
      errors.nomorSurat = "nomorSurat tidak boleh kosong;";
    if (!formData.tanggalSurat)
      errors.tanggalSurat = "tanggalSurat tidak boleh kosong;";
    if (!formData.tanggalDiterima)
      errors.tanggalDiterima = "tanggalDiterima tidak boleh kosong;";
    if (!formData.sifat) errors.sifat = "sifat tidak boleh kosong;";
    if (!formData.description)
      errors.description = "description tidak boleh kosong;";

    return errors;
  };

  const { mutate: mutatePost } = useUpdateEDisposisi();

  const handleSubmit = () => {
    setFormError({});

    const validate = validateData();
    if (Object.keys(validate).length > 0) {
      setFormError(validate);
      return false;
    }

    setIsLoading(true);

    const formToSend: StoreEDisposisi = {};

    if (formData.file) formToSend.file = formData.file;
    if (formData.suratDari) formToSend.suratDari = formData.suratDari;
    if (formData.nomorSurat) formToSend.nomorSurat = formData.nomorSurat;
    if (formData.tanggalSurat) formToSend.tanggalSurat = formData.tanggalSurat;
    if (formData.tanggalDiterima)
      formToSend.tanggalDiterima = formData.tanggalDiterima;
    if (formData.sifat) formToSend.sifat = formData.sifat;
    if (formData.description) formToSend.description = formData.description;

    try {
      mutatePost(
        { id: id, formData: formToSend },
        {
          onSuccess: () => {
            SuccessToast({ text: "Data berhasil diupdate" });
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
        },
      );
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileToShow = await convertFileToBase64(file);
      setFormData({ ...formData, file: fileToShow });
    } else {
      setFormData({ ...formData, file: "" });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="4xl">
        <ModalContent>
          <ModalHeader className="flex items-center justify-between">
            <span className="text-base font-semibold">
              Tambah Data E-Disposisi
            </span>
            <LuX
              className="text-danger border border-danger rounded-full p-2 cursor-pointer"
              onClick={onClose}
              size={32}
            />
          </ModalHeader>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom flex flex-col gap-2 pb-8">
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Surat dari <span className="text-danger">*</span>
                </label>
                <Input
                  aria-label="lokasi"
                  variant="bordered"
                  radius="sm"
                  value={formData.suratDari}
                  onChange={(e) =>
                    setFormData({ ...formData, suratDari: e.target.value })
                  }
                  placeholder="Masukkan disini"
                  classNames={{
                    input: "text-xs",
                  }}
                />
                <div className="text-xs italic text-danger">
                  {formError.suratDari}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  No. Surat <span className="text-danger">*</span>
                </label>
                <Input
                  aria-label="lokasi"
                  variant="bordered"
                  radius="sm"
                  value={formData.nomorSurat}
                  onChange={(e) =>
                    setFormData({ ...formData, nomorSurat: e.target.value })
                  }
                  placeholder="Masukkan disini"
                  classNames={{
                    input: "text-xs",
                  }}
                />
                <div className="text-xs italic text-danger">
                  {formError.nomorSurat}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Tanggal Surat <span className="text-danger">*</span>
                </label>
                <Input
                  type="date"
                  aria-label="lokasi"
                  variant="bordered"
                  radius="sm"
                  value={formData.tanggalSurat}
                  onChange={(e) =>
                    setFormData({ ...formData, tanggalSurat: e.target.value })
                  }
                  placeholder="Masukkan disini"
                  classNames={{
                    input: "text-xs",
                  }}
                />
                <div className="text-xs italic text-danger">
                  {formError.tanggalSurat}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Tanggal Diterima <span className="text-danger">*</span>
                </label>
                <Input
                  type="date"
                  aria-label="lokasi"
                  variant="bordered"
                  radius="sm"
                  value={formData.tanggalDiterima}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tanggalDiterima: e.target.value,
                    })
                  }
                  placeholder="Masukkan disini"
                  classNames={{
                    input: "text-xs",
                  }}
                />
                <div className="text-xs italic text-danger">
                  {formError.tanggalDiterima}
                </div>
              </div>
              <div className="lg:col-span-2 col-span-1 flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Sifat <span className="text-danger">*</span>
                </label>
                <RadioGroup
                  size="sm"
                  value={formData.sifat}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      sifat: e.target.value,
                    }))
                  }
                  orientation="horizontal"
                  className="ms-4"
                >
                  <Radio value={"SANGAT_SEGERA"} key={"SANGAT_SEGERA"}>
                    Sangat Segera
                  </Radio>
                  <Radio value={"SEGERA"} key={"SEGERA"}>
                    Segera
                  </Radio>
                  <Radio value={"RAHASIA"} key={" RAHASIA"}>
                    Rahasia
                  </Radio>
                  <Radio value={"PENTING"} key={"PENTING"}>
                    Penting
                  </Radio>
                  <Radio value={"BIASA"} key={"BIASA"}>
                    Biasa
                  </Radio>
                </RadioGroup>
                <div className="text-xs italic text-danger">
                  {formError.sifat}
                </div>
              </div>
              <div className="lg:col-span-3 col-span-1 flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Perihal <span className="text-danger">*</span>
                </label>
                <Textarea
                  aria-label="lokasi"
                  variant="bordered"
                  radius="sm"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Masukkan disini"
                  classNames={{
                    input: "text-xs",
                  }}
                />
                <div className="text-xs italic text-danger">
                  {formError.description}
                </div>
              </div>
              <div className="lg:col-span-3 col-span-1">
                <div className="max-w-80">
                  <div className="mb-1">
                    <label htmlFor="content" className="font-semibold text-xs">
                      Dokumen Disposisi <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="border p-8 mb-2 flex items-center justify-center">
                    {formData.file ? (
                      <IoFileTrayFullSharp size={32} />
                    ) : (
                      <LucideUploadCloud size={32} />
                    )}
                  </div>
                  <input
                    type="file"
                    onChange={handleChangeFile}
                    accept=".pdf"
                  />
                  <div className="text-danger text-[0.7rem] mt-1">
                    {formError.file}
                  </div>
                </div>
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

export default UpdateDataModal;
