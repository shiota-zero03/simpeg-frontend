import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { LuSave, LuX } from "react-icons/lu";
import "react-datepicker/dist/react-datepicker.css";
import { LucideUploadCloud } from "lucide-react";
import { convertFileToBase64 } from "@/utils/base64Formater";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { StoreManualBook } from "@/interface/request/manualBook.interface";
import { useUpdateManualBook } from "@/services/manual-book";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { FaFilePdf } from "react-icons/fa";

interface props {
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
  id: string;
  title: string;
  description: string;
}

interface errorProps {
  files?: string;
}

const CreateModal = ({
  isOpen,
  onClose,
  handleClose,
  id,
  title,
  description,
}: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<StoreManualBook>({
    files: "",
  });

  const [formError, setFormError] = useState<errorProps>({});

  useEffect(() => {
    setFormData({
      files: "",
    });
    setIsLoading(false);
    setFormError({});
  }, [isOpen]);

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileToShow = await convertFileToBase64(file);
      setFormData({ ...formData, files: fileToShow });
    } else {
      setFormData({ ...formData, files: "" });
    }
  };

  const { mutate: mutatePost } = useUpdateManualBook();

  const handleSubmit = () => {
    if (!formData.files) {
      ErrorToast({ text: "Silahkan cek kembali form anda" });
      setFormError({
        ...formError,
        files: "File tidak boleh kosong",
      });
      return false;
    }

    setIsLoading(true);
    try {
      mutatePost(
        {
          id: id,
          formData: {
            title: title,
            description: description,
            files: formData.files,
          },
        },
        {
          onSuccess: () => {
            SuccessToast({ text: "File manual book berhasil diganti" });
            handleClose();
          },
          onError: (error: AxiosError<BaseErrorRes>) => {
            ErrorToast({
              text:
                (error.response?.data.message as string) ||
                "Terjadi kesalahan saat mengirim file",
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

  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="md">
        <ModalContent>
          <ModalHeader className="flex items-center justify-between">
            <span className="text-base font-semibold">Update Manual Book</span>
            <LuX
              className="text-danger border border-danger rounded-full p-2 cursor-pointer"
              onClick={onClose}
              size={32}
            />
          </ModalHeader>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom flex flex-col gap-2 pb-8">
            <div className="w-full">
              <div className="mb-1">
                <label htmlFor="content" className="font-semibold text-xs">
                  File <span className="text-danger">*</span>
                </label>
              </div>
              <div className="border p-8 mb-2 flex items-center justify-center">
                {formData.files ? (
                  <FaFilePdf size={32} />
                ) : (
                  <LucideUploadCloud size={32} />
                )}
              </div>
              <input type="file" onChange={handleChangeFile} accept=".pdf" />
              <div className="text-danger text-[0.7rem] mt-1">
                {formError.files}
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
