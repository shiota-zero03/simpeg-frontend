import { StoreKopSurat } from "@/interface/request/surat.interface";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { usePostKopSurat, useUpdateKopSurat } from "@/services/surat/kopsurat";
import { convertFileToBase64 } from "@/utils/base64Formater";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { LuSave, LuX } from "react-icons/lu";

interface props {
  id: number;
  slug: string;
  fileShow: string;
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
}

const KopSuratModal = ({
  id,
  slug,
  fileShow,
  isOpen,
  onClose,
  handleClose,
}: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    file: "",
    fileToShow: "",
  });

  useEffect(() => {
    setFormData({
      file: "",
      fileToShow: fileShow,
    });
  }, [isOpen]);

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileToShow = await convertFileToBase64(file);
      setFormData({ ...formData, file: fileToShow });
    } else {
      setFormData({ ...formData, file: "" });
    }
  };

  const { mutate: mutateCreate } = usePostKopSurat();
  const { mutate: mutatePost } = useUpdateKopSurat();

  const handleSubmit = () => {
    if (isLoading) return;

    if (!formData.file) {
      ErrorToast({ text: "Pilih file kop surat terlebih dahulu" });
      return false;
    }

    setIsLoading(true);

    const formToSend: StoreKopSurat = {};
    if (formData.file) formToSend.file = formData.file;
    formToSend.slug = slug;

    if (id) {
      try {
        mutatePost(
          { formData: formToSend, id: String(id) },
          {
            onSuccess: () => {
              SuccessToast({ text: "Kop surat berhasil diperbarui" });
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
    } else {
      try {
        mutateCreate(formToSend, {
          onSuccess: () => {
            SuccessToast({ text: "Kop surat berhasil diperbarui" });
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
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="md">
        <ModalContent>
          <ModalHeader className="flex items-center justify-between">
            <span className="text-base font-semibold">Update Kop Surat</span>
            <LuX
              className="text-danger border border-danger rounded-full p-2 cursor-pointer"
              onClick={onClose}
              size={32}
            />
          </ModalHeader>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom pb-8">
            <div>
              <img
                src={formData.file || formData.fileToShow}
                alt=""
                className="w-full border rounded-md p-2"
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Upload File <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={handleChangeFile}
                />
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
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default KopSuratModal;
