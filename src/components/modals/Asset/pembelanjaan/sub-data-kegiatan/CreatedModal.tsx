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
import { StoreSubDataKegiatan } from "@/interface/request/assetPembelanjaan";
import { useCreateSubDataKegiatan } from "@/services/asset/asset-pembelanjaan/sub-data-kegiatan";

interface props {
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
}

interface formProps {
  name?: string;
  accountBank?: string;
}

interface errorProps {
  name?: string;
  accountBank?: string;
}

const CreateModal = ({ isOpen, onClose, handleClose }: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<formProps>({
    name: "",
    accountBank: "",
  });

  const [formError, setFormError] = useState<errorProps>({});

  useEffect(() => {
    setFormData({
      name: "",
      accountBank: "",
    });
    setIsLoading(false);
    setFormError({});
  }, [isOpen]);

  const validateData = () => {
    const errors: errorProps = {};
    if (!formData.name) errors.name = "Nama kegiatan tidak boleh kosong";
    if (!formData.accountBank)
      errors.accountBank = "Nomor rekening tidak boleh kosong";

    return errors;
  };

  const { mutate: mutatePost } = useCreateSubDataKegiatan();

  const handleSubmit = () => {
    setFormError({});

    const validate = validateData();
    if (Object.keys(validate).length > 0) {
      setFormError(validate);
      return false;
    }

    setIsLoading(true);

    const formToSend: StoreSubDataKegiatan = {};
    if (formData.name) formToSend.name = formData.name;
    if (formData.accountBank) formToSend.accountBank = formData.accountBank;

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
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="3xl">
        <ModalContent>
          <ModalHeader className="flex items-center justify-between">
            <span className="text-base font-semibold">
              Tambah Data Sub-Kegiatan
            </span>
            <LuX
              className="text-danger border border-danger rounded-full p-2 cursor-pointer"
              onClick={onClose}
              size={32}
            />
          </ModalHeader>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom flex flex-col gap-4 pb-8">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Nama Sub Kegiatan <span className="text-danger">*</span>
                </label>
                <Input
                  aria-label="lokasi"
                  variant="bordered"
                  radius="sm"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Masukkan disini"
                  classNames={{
                    input: "text-xs",
                  }}
                />
                <div className="text-xs italic text-danger">
                  {formError.name}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Nomor Rekening <span className="text-danger">*</span>
                </label>
                <Input
                  aria-label="lokasi"
                  variant="bordered"
                  radius="sm"
                  value={formData.accountBank}
                  onChange={(e) =>
                    setFormData({ ...formData, accountBank: e.target.value })
                  }
                  placeholder="Masukkan disini"
                  classNames={{
                    input: "text-xs",
                  }}
                />
                <div className="text-xs italic text-danger">
                  {formError.accountBank}
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
