import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { LuSave, LuX } from "react-icons/lu";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreHubungiKami } from "@/interface/request/hubungi.interface";
import { useUpdateHubungiKami } from "@/services/customer-service";

interface props {
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
  id: string;
  phoneNumber: string;
  title: string;
  description: string;
}

interface errorProps {
  phoneNumber?: string;
}

const CreateModal = ({
  isOpen,
  onClose,
  handleClose,
  id,
  phoneNumber,
  title,
  description,
}: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<StoreHubungiKami>({
    phoneNumber: "",
  });

  const [formError, setFormError] = useState<errorProps>({});

  useEffect(() => {
    setFormData({
      phoneNumber: phoneNumber,
    });
    setIsLoading(false);
    setFormError({});
  }, [isOpen]);

  const { mutate: mutatePost } = useUpdateHubungiKami();

  const handleSubmit = () => {
    if (!formData.phoneNumber) {
      ErrorToast({ text: "Silahkan cek kembali form anda" });
      setFormError({
        ...formError,
        phoneNumber: "Nomor whatsapp tidak boleh kosong",
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
            phoneNumber: formData.phoneNumber,
          },
        },
        {
          onSuccess: () => {
            SuccessToast({ text: "Nomor whatsapp berhasil diganti" });
            handleClose();
          },
          onError: (error: AxiosError<BaseErrorRes>) => {
            ErrorToast({
              text:
                (error.response?.data.error as string) ||
                "Terjadi kesalahan saat mengupdate dta",
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
            <span className="text-base font-semibold">
              Update Nomor Whatsapp
            </span>
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
                  Nomor Whatsapp <span className="text-danger">*</span>
                </label>
                <Input
                  aria-label="lokasi"
                  variant="bordered"
                  radius="sm"
                  type="number"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  placeholder="Masukkan disini"
                  classNames={{
                    input: "text-xs",
                  }}
                />
                <div className="text-danger text-[0.7rem] mt-1">
                  {formError.phoneNumber}
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

export default CreateModal;
