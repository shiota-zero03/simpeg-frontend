import { useEffect, useState } from "react";
import { TitleCase } from "@/components/card/TitleCase";
import {
  Button,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { convertFileToBase64 } from "@/utils/base64Formater";
import { LuImage, LuSave } from "react-icons/lu";
import ConfirmModal from "@/components/modals/UtilsModal/ConfirmModal";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { useNavigate } from "react-router-dom";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { useCreateGaleri } from "@/services/galeri-dokumentasi";
import { StoreGaleri } from "@/interface/request/galeri.interface";

interface formProps {
  thumbnail: string;
  title: string;
  video: string;
  type: string;
}

interface errorProps {
  thumbnail?: string;
  title?: string;
  video?: string;
  type?: string;
}

export default function CreateNews() {
  const [formData, setFormData] = useState<formProps>({
    thumbnail: "",
    title: "",
    video: "",
    type: "",
  });

  const [formError, setFormError] = useState<errorProps>({});

  const rules = () => {
    const error: errorProps = {};
    if (!formData.thumbnail) error.thumbnail = "Foto tidak boleh kosong";
    if (!formData.title) {
      error.title = "Judul galeri tidak boleh kosong";
    }
    if (!formData.type) {
      error.type = "Tipe galeri tidak boleh kosong";
    } else {
      if (formData.type === "VIDEO") {
        if (!formData.video) {
          error.video = "Video galeri tidak boleh kosong";
        }
      }
    }
    return error;
  };

  useEffect(() => {
    setFormData({
      thumbnail: "",
      title: "",
      video: "",
      type: "",
    });
  }, []);

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileToShow = await convertFileToBase64(file);
      setFormData({ ...formData, thumbnail: fileToShow });
    } else {
      setFormData({ ...formData, thumbnail: "" });
    }
  };

  const navigate = useNavigate();

  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();
  const [isLoadingConfirm, setLoadingConfirm] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onOpenConfirm();
  };

  const { mutate: mutatePost } = useCreateGaleri();
  const handleConfirm = () => {
    setLoadingConfirm(true);

    const errorRules = rules();
    setFormError(errorRules);

    if (Object.keys(errorRules).length > 0) {
      setLoadingConfirm(false);
      onCloseConfirm();
      ErrorToast({ text: "Validasi gagal, cek kembali form anda" });
      return true;
    }

    const formToSendData: StoreGaleri = {
      title: formData.title,
      type: formData.type,
      images: formData.thumbnail,
      status: true,
    };

    if (formData.video) {
      formToSendData.video = formData.video;
    }
    try {
      mutatePost(formToSendData, {
        onSuccess: () => {
          SuccessToast({ text: "Data berhasil disimpan" });
          setLoadingConfirm(false);
          onCloseConfirm();
          navigate("/galeri-dokumentasi");
        },
        onError: (error: AxiosError<BaseErrorRes>) => {
          setLoadingConfirm(false);
          onCloseConfirm();
          ErrorToast({
            text:
              (error.response?.data.error as string) ||
              "Terjadi kesalahan saat mengupdate data",
          });
          throw error;
        },
      });
    } catch (error) {
      setLoadingConfirm(false);
      onCloseConfirm();
      throw error;
    }
  };

  return (
    <>
      <BreadcrumbAdmin location="/Galeri-Dokumentasi/Tambah-Data" />
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        isLoading={isLoadingConfirm}
        handleSubmit={handleConfirm}
      />
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <TitleCase
          title="Tambah Galeri"
          text="Digunakan Untuk Menambah Galeri yang Terbaru"
        />

        <div className="bg-white shadow-md rounded-xl border p-4">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div>
              <div className="mb-1">
                <label htmlFor="content" className="font-semibold text-xs">
                  Judul <span className="text-danger">*</span>
                </label>
              </div>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                aria-label="Judul"
                labelPlacement="outside"
                placeholder="Masukkan disini ..."
                variant="bordered"
                size="sm"
                classNames={{
                  inputWrapper: "border-[0.8px]",
                  input: "text-xs",
                }}
              />
              <div className="text-danger text-[0.7rem] mt-1">
                {formError.title}
              </div>
            </div>
            <div>
              <div className="mb-1">
                <label htmlFor="content" className="font-semibold text-xs">
                  Tipe <span className="text-danger">*</span>
                </label>
              </div>
              <Select
                selectedKeys={[formData.type]}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                aria-label="Judul"
                labelPlacement="outside"
                placeholder="Pilih type galeri"
                variant="bordered"
                size="sm"
                classNames={{
                  trigger: "border-[0.8px]",
                  value: "text-xs",
                }}
              >
                <SelectItem key={"IMAGE"}>Gambar</SelectItem>
                <SelectItem key={"VIDEO"}>Video</SelectItem>
              </Select>
              <div className="text-danger text-[0.7rem] mt-1">
                {formError.type}
              </div>
            </div>
            {formData.type === "VIDEO" && (
              <div>
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Link Video <span className="text-danger">*</span>
                  </label>
                </div>
                <Input
                  value={formData.video}
                  onChange={(e) =>
                    setFormData({ ...formData, video: e.target.value })
                  }
                  aria-label="Judul"
                  labelPlacement="outside"
                  placeholder="Masukkan disini ..."
                  variant="bordered"
                  size="sm"
                  classNames={{
                    inputWrapper: "border-[0.8px]",
                    input: "text-xs",
                  }}
                />
                <div className="text-danger text-[0.7rem] mt-1">
                  {formError.video}
                </div>
              </div>
            )}
            <div className="max-w-80">
              <div className="mb-1">
                <label htmlFor="content" className="font-semibold text-xs">
                  Foto / Thumbnail <span className="text-danger">*</span>
                </label>
              </div>
              <div className="border p-8 mb-2 flex items-center justify-center">
                {formData.thumbnail ? (
                  <img src={formData.thumbnail} className="rounded-lg" />
                ) : (
                  <LuImage size={32} />
                )}
              </div>
              <input
                type="file"
                onChange={handleChangeImage}
                accept=".png,.jpg,.jpeg"
              />
              <div className="text-danger text-[0.7rem] mt-1">
                {formError.thumbnail}
              </div>
            </div>
            <div className="ms-auto">
              <Button
                isLoading={isLoadingConfirm}
                className="bg-button-primary text-white"
                size="sm"
                radius="sm"
                type="submit"
              >
                <LuSave /> Simpan Data
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
