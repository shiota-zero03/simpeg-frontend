import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { LuImage, LuSave, LuX } from "react-icons/lu";
import "react-datepicker/dist/react-datepicker.css";
import { convertFileToBase64 } from "@/utils/base64Formater";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { PegawaiRes } from "@/interface/responses/pegawai.interface";
import { DateYMDFormat } from "@/utils/dateFormater";
import { useUpdateProfil } from "@/services/auth";
import { StorePegawai } from "@/interface/request/pegawai.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";

interface props {
  isOpen: boolean;
  onClose: () => void;
  data: PegawaiRes;
  handleClose: () => void;
}

interface formProps {
  nama?: string;
  email?: string;
  whatsapp?: string;
  tempatLahir?: string;
  tanggalLahir?: string;
  foto?: string;
  fotoUrl?: string;
}

interface errorProps {
  nama?: string;
  email?: string;
  whatsapp?: string;
  tempatLahir?: string;
  tanggalLahir?: string;
  foto?: string;
  fotoUrl?: string;
}

const UpdateProfil = ({ isOpen, onClose, data, handleClose }: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<formProps>({
    nama: "",
    email: "",
    whatsapp: "",
    tempatLahir: "",
    tanggalLahir: "",
    foto: "",
    fotoUrl: "",
  });

  const [formError, setFormError] = useState<errorProps>({});

  useEffect(() => {
    setFormData({
      nama: data.name,
      email: data.email,
      whatsapp: data.phoneNumber,
      tempatLahir: data.placeOfBirth,
      tanggalLahir: data.dateOfBirth ? DateYMDFormat(data.dateOfBirth) : "",
      foto: "",
      fotoUrl: data.photo,
    });
    setIsLoading(false);
    setFormError({});
  }, [isOpen]);

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileToShow = await convertFileToBase64(file);
      setFormData({ ...formData, foto: fileToShow });
    } else {
      setFormData({ ...formData, foto: "" });
    }
  };

  const rules = () => {
    const error: errorProps = {};

    if (!formData.nama) error.nama = "Nama pegawai tidak boleh kosong";
    if (!formData.email) error.email = "Email tidak boleh kosong";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      error.email = "Format email tidak valid";
    }
    if (!formData.whatsapp) error.whatsapp = "Nomor Telepon tidak boleh kosong";
    else if (!/^08\d{8,11}$/.test(formData.whatsapp)) {
      error.whatsapp = "Format nomor Telepon tidak valid";
    }

    return error;
  };

  const { mutate: mutatePost } = useUpdateProfil();

  const handleSubmit = () => {
    setIsLoading(true);

    const errorRules = rules();
    setFormError(errorRules);

    if (Object.keys(errorRules).length > 0) {
      setIsLoading(false);
      ErrorToast({ text: "Validasi gagal, cek kembali form anda" });
      return true;
    }

    const formToSend: StorePegawai = {};
    if (formData.nama) formToSend.name = formData.nama;
    if (formData.email) formToSend.email = formData.email;
    if (formData.whatsapp) formToSend.phoneNumber = formData.whatsapp;
    if (formData.tanggalLahir) {
      formToSend.dateOfBirth = formData.tanggalLahir;
    } else {
      formToSend.dateOfBirth = null;
    }
    if (formData.tempatLahir) formToSend.placeOfBirth = formData.tempatLahir;
    if (formData.foto) formToSend.photo = formData.foto;

    try {
      mutatePost(formToSend, {
        onSuccess: () => {
          SuccessToast({ text: "Data berhasil diperbarui" });
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
            <span className="text-base font-semibold">Edit Profil</span>
            <LuX
              className="text-danger border border-danger rounded-full p-2 cursor-pointer"
              onClick={onClose}
              size={32}
            />
          </ModalHeader>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom flex flex-col gap-2 pb-8">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
              <div className="md:col-span-2 col-span-1">
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Nama Pegawai <span className="text-danger">*</span>
                  </label>
                </div>
                <Input
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData({ ...formData, nama: e.target.value })
                  }
                  aria-label="Judul"
                  labelPlacement="outside"
                  placeholder="Masukkan disini"
                  variant="bordered"
                  radius="sm"
                  classNames={{
                    inputWrapper: "border-[0.8px]",
                    input: "text-xs",
                  }}
                />
                <div className="text-danger text-[0.7rem] mt-1">
                  {formError.nama}
                </div>
              </div>
              <div>
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Email <span className="text-danger">*</span>
                  </label>
                </div>
                <Input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  aria-label="Judul"
                  labelPlacement="outside"
                  placeholder="Masukkan disini"
                  variant="bordered"
                  radius="sm"
                  classNames={{
                    inputWrapper: "border-[0.8px]",
                    input: "text-xs",
                  }}
                />
                <div className="text-danger text-[0.7rem] mt-1">
                  {formError.email}
                </div>
              </div>
              <div>
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Kontak/No. Whatsapp <span className="text-danger">*</span>
                  </label>
                </div>
                <Input
                  type="number"
                  value={formData.whatsapp || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                  aria-label="Judul"
                  labelPlacement="outside"
                  placeholder="Masukkan disini"
                  variant="bordered"
                  radius="sm"
                  classNames={{
                    inputWrapper: "border-[0.8px]",
                    input: "text-xs",
                  }}
                />
                <div className="text-danger text-[0.7rem] mt-1">
                  {formError.whatsapp}
                </div>
              </div>
              <div>
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Tempat Lahir
                  </label>
                </div>
                <Input
                  value={formData.tempatLahir || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tempatLahir: e.target.value,
                    })
                  }
                  aria-label="Judul"
                  labelPlacement="outside"
                  placeholder="Masukkan disini"
                  variant="bordered"
                  radius="sm"
                  classNames={{
                    inputWrapper: "border-[0.8px]",
                    input: "text-xs",
                  }}
                />
                <div className="text-danger text-[0.7rem] mt-1">
                  {formError.tempatLahir}
                </div>
              </div>
              <div>
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Tanggal Lahir
                  </label>
                </div>
                <Input
                  type="date"
                  value={formData.tanggalLahir || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tanggalLahir: e.target.value,
                    })
                  }
                  aria-label="Judul"
                  labelPlacement="outside"
                  placeholder="Masukkan disini"
                  variant="bordered"
                  radius="sm"
                  classNames={{
                    inputWrapper: "border-[0.8px]",
                    input: "text-xs",
                  }}
                />
                <div className="text-danger text-[0.7rem] mt-1">
                  {formError.tanggalLahir}
                </div>
              </div>
              <div className="md:col-span-2 col-span-1">
                <div className="max-w-80">
                  <div className="mb-1">
                    <label htmlFor="content" className="font-semibold text-xs">
                      Foto
                    </label>
                  </div>
                  <div className="border p-8 mb-2 flex items-center justify-center">
                    {formData.foto ? (
                      <img src={formData.foto} className="rounded-lg" />
                    ) : formData.fotoUrl ? (
                      <img src={formData.fotoUrl} className="rounded-lg" />
                    ) : (
                      <LuImage size={32} />
                    )}
                  </div>
                  <input
                    type="file"
                    onChange={handleChangeFile}
                    accept=".png,.jpg,.jpeg"
                  />
                  <div className="text-danger text-[0.7rem] mt-1">
                    {formError.foto}
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

export default UpdateProfil;
