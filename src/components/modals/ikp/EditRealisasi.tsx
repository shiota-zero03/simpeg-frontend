import { StoreIKPSetuju } from "@/interface/request/ikp.interface";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { useUpdateIKP } from "@/services/ikp";
import { convertFileToBase64 } from "@/utils/base64Formater";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { LuFileImage, LuFileText, LuSave, LuX } from "react-icons/lu";

interface formPropsPerubahan {
  id: number;
  sasaran: string;
  indicator: string;
  count: number;
  target: string;
  description: string;
  dialog: string;
  ubahTarget: string;
  status: string;
  realisasi: string;
  attachement: {
    file: string;
  }[];
}

interface props {
  isOpen: boolean;
  id: formPropsPerubahan;
  onClose: () => void;
  handleSubmit: () => void;
}

interface formProps {
  realisasi?: string;
  dokument?: {
    name: string;
    file: string;
  }[];
}

interface errorProps {
  realisasi?: string;
  dokument?: string;
}

const EditRealisasi = ({ isOpen, onClose, id, handleSubmit }: props) => {
  const [formData, setFormData] = useState<formProps>({
    realisasi: "",
    dokument: [],
  });

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles: { name: string; file: string }[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const base64 = await convertFileToBase64(file);
        newFiles.push({ name: file.name, file: base64 });
      }

      setFormData((prev) => ({
        ...prev,
        dokument: [...(prev.dokument || []), ...newFiles],
      }));
    }
  };

  const handleRemoveFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      dokument: prev.dokument?.filter((_, i) => i !== index),
    }));
  };

  const [formError, setFormError] = useState<errorProps>({});

  const validateData = () => {
    const errors: errorProps = {};
    if (!formData.realisasi) errors.realisasi = "Realisasi tidak boleh kosong";
    if (id.attachement.length === 0) {
      if (!formData.dokument || formData.dokument.length === 0)
        errors.dokument = "Dokumen realisasi tidak boleh kosong";
    }

    return errors;
  };

  const [isLoadingConfirm, setIsLoadingConfirm] = useState<boolean>(false);
  const { mutate: mutateUpdate } = useUpdateIKP();
  const handleUpdate = async () => {
    setFormError({});

    const validate = validateData();
    if (Object.keys(validate).length > 0) {
      setFormError(validate);
      return false;
    }

    setIsLoadingConfirm(true);

    const dataToSend: StoreIKPSetuju = {};
    if (formData.realisasi) dataToSend.realisasi = formData.realisasi;
    dataToSend.dokument = formData.dokument;

    try {
      mutateUpdate(
        {
          id: String(id.id),
          formData: dataToSend,
        },
        {
          onSuccess: () => {
            SuccessToast({ text: "Data realisasi berhasil diubah" });
            setIsLoadingConfirm(false);
            handleSubmit();
          },
          onError: (error: AxiosError<BaseErrorRes>) => {
            setIsLoadingConfirm(false);
            ErrorToast({
              text:
                (error.response?.data.message as string) ||
                "Terjadi kesalahan saat menambah data",
            });
            throw error;
          },
        },
      );
    } catch (error) {
      setIsLoadingConfirm(false);
      throw error;
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      realisasi: id.realisasi,
      dokument: [],
    });
  }, [isOpen]);
  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="2xl">
        <ModalContent>
          <ModalHeader className="flex items-center justify-between">
            <span className="text-base font-semibold">Edit data realisasi</span>
            <LuX
              className="text-danger border border-danger rounded-full p-2 cursor-pointer"
              onClick={onClose}
              size={32}
            />
          </ModalHeader>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom flex flex-col gap-2 pb-8">
            <div className="flex flex-col gap-1">
              <label htmlFor="lokasi" className="text-xs font-semibold">
                Realisasi <span className="text-danger">*</span>
              </label>
              <Input
                aria-label="lokasi"
                variant="bordered"
                radius="sm"
                value={formData.realisasi}
                onChange={(e) =>
                  setFormData({ ...formData, realisasi: e.target.value })
                }
                placeholder="Masukkan disini"
                classNames={{
                  input: "text-xs",
                }}
              />
              <div className="text-xs italic text-danger">
                {formError.realisasi}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="file-upload" className="text-xs font-semibold">
                Upload Dokumen Realisasi <span className="text-danger">*</span>
              </label>

              <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
                {id.attachement &&
                  id.attachement.length > 0 &&
                  id.attachement.map((doc, index) => {
                    const isPDF = doc.file
                      .split("?")[0]
                      .toLowerCase()
                      .endsWith(".pdf");
                    const Icon = isPDF ? LuFileText : LuFileImage;

                    return (
                      <div
                        key={index}
                        className="border p-4 flex flex-col items-center justify-center gap-2 relative rounded-md overflow-hidden"
                      >
                        <a
                          href={doc.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          <Icon size={28} />
                        </a>
                        <span title={doc.file} className="text-xs text-center">
                          {doc.file.length > 40
                            ? `${doc.file.slice(0, 37)}...`
                            : doc.file}
                        </span>
                      </div>
                    );
                  })}
                {formData.dokument &&
                  formData.dokument.length > 0 &&
                  formData.dokument.map((doc, index) => {
                    const isPDF = doc.name.toLowerCase().endsWith(".pdf");
                    const Icon = isPDF ? LuFileText : LuFileImage;

                    return (
                      <div
                        key={index}
                        className="border p-4 flex flex-col items-center justify-center gap-2 relative rounded-md overflow-hidden"
                      >
                        <a
                          href={doc.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          <Icon size={28} />
                        </a>
                        <span title={doc.name} className="text-xs text-center">
                          {doc.name.length > 40
                            ? `${doc.name.slice(0, 37)}...`
                            : doc.name}
                        </span>
                        <Button
                          type="button"
                          radius="sm"
                          onPress={() => handleRemoveFile(index)}
                          className="text-danger hover:underline ml-auto border border-danger absolute top-1 right-1 min-w-6 max-w-6 min-h-6 max-h-6"
                          size="sm"
                          variant="bordered"
                          isIconOnly
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    );
                  })}
              </div>

              <input
                id="file-upload"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleChangeFile}
                className="text-xs cursor-pointer"
              />

              <div className="text-xs italic text-danger">
                {formError.dokument}
              </div>
            </div>

            <div className="flex items-center justify-end w-full gap-2">
              <Button
                isLoading={isLoadingConfirm}
                onPress={handleUpdate}
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

export default EditRealisasi;
