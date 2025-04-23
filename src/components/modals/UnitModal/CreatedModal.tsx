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
import "react-datepicker/dist/react-datepicker.css";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreUnit } from "@/interface/request/unit.interface";
import { useCreateUnit } from "@/services/unit";

interface props {
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
}

interface formProps {
  idUnit: string;
  nameUnit: string;
  description: string;
  ketersediaan: number;
}

interface errorProps {
  idUnit?: string;
  nameUnit?: string;
  description?: string;
  ketersediaan?: string;
}

const CreateModal = ({ isOpen, onClose, handleClose }: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<formProps>({
    idUnit: "",
    nameUnit: "",
    description: "",
    ketersediaan: 0,
  });

  const [formError, setFormError] = useState<errorProps>({});

  useEffect(() => {
    setFormData({
      idUnit: "",
      nameUnit: "",
      description: "",
      ketersediaan: 0,
    });
    setIsLoading(false);
    setFormError({});
  }, [isOpen]);

  const validateData = () => {
    const errors: errorProps = {};
    if (!formData.idUnit) errors.idUnit = "ID Unit tidak boleh kosong";
    if (!formData.nameUnit) errors.nameUnit = "Nama unit tidak boleh kosong";
    if (!formData.ketersediaan)
      errors.ketersediaan = "Ketersediaan tidak boleh kosong";

    return errors;
  };

  const { mutate: mutatePost } = useCreateUnit();

  const handleSubmit = () => {
    setFormError({});

    const validate = validateData();
    if (Object.keys(validate).length > 0) {
      setFormError(validate);
      return false;
    }

    setIsLoading(true);

    const formToSend: StoreUnit = {};
    if (formData.idUnit) formToSend.idUnit = formData.idUnit;
    if (formData.nameUnit) formToSend.nameUnit = formData.nameUnit;
    if (formData.description) formToSend.description = formData.description;
    if (formData.ketersediaan) formToSend.ketersediaan = formData.ketersediaan;

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
            <span className="text-base font-semibold">Tambah Data Unit</span>
            <LuX
              className="text-danger border border-danger rounded-full p-2 cursor-pointer"
              onClick={onClose}
              size={32}
            />
          </ModalHeader>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom flex flex-col gap-4 pb-8">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  ID Unit <span className="text-danger">*</span>
                </label>
                <Input
                  aria-label="lokasi"
                  variant="bordered"
                  radius="sm"
                  value={formData.idUnit}
                  onChange={(e) =>
                    setFormData({ ...formData, idUnit: e.target.value })
                  }
                  placeholder="Masukkan disini"
                  classNames={{
                    input: "text-xs",
                  }}
                />
                <div className="text-xs italic text-danger">
                  {formError.idUnit}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Nama Unit <span className="text-danger">*</span>
                </label>
                <Input
                  aria-label="lokasi"
                  variant="bordered"
                  radius="sm"
                  value={formData.nameUnit}
                  onChange={(e) =>
                    setFormData({ ...formData, nameUnit: e.target.value })
                  }
                  placeholder="Masukkan disini"
                  classNames={{
                    input: "text-xs",
                  }}
                />
                <div className="text-xs italic text-danger">
                  {formError.nameUnit}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Ketersediaan <span className="text-danger">*</span>
                </label>
                <Input
                  aria-label="lokasi"
                  variant="bordered"
                  radius="sm"
                  value={String(formData.ketersediaan)}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ketersediaan: Number(e.target.value),
                    })
                  }
                  placeholder="Masukkan disini"
                  classNames={{
                    input: "text-xs",
                  }}
                />
                <div className="text-xs italic text-danger">
                  {formError.ketersediaan}
                </div>
              </div>
              <div className="md:col-span-3 col-span-1 flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Keterangan
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
