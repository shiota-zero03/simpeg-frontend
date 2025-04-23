import { StoreIKPTolak } from "@/interface/request/ikp.interface";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { useUpdateIKP } from "@/services/ikp";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  Textarea,
} from "@heroui/react";
import { AxiosError } from "axios";
import { useState } from "react";

interface props {
  isOpen: boolean;
  id: number;
  onClose: () => void;
  handleSubmit: () => void;
}

const TolakModal = ({ isOpen, onClose, id, handleSubmit }: props) => {
  const [isLoadingConfirm, setIsLoadingConfirm] = useState<boolean>(false);
  const [reasoning, setReasoning] = useState<string>("");
  const { mutate: mutateUpdate } = useUpdateIKP();
  const handleUpdate = async () => {
    if (!reasoning) {
      ErrorToast({ text: "Masukkan alasan penolakan terlebih dahulu" });
      return false;
    }

    setIsLoadingConfirm(true);

    const dataToSend: StoreIKPTolak = {
      status: "DITOLAK",
      reasoning: reasoning,
    };

    try {
      mutateUpdate(
        {
          id: String(id),
          formData: dataToSend,
        },
        {
          onSuccess: () => {
            SuccessToast({ text: "Data berhasil disetujui" });
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
  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="md">
        <ModalContent>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom py-8">
            <div className="flex flex-col gap-2 items-center">
              <h1 className="font-bold text-xl mb-2">
                Anda yakin ingin menolak data ini ?
              </h1>
              <div className="w-full">
                <div className="mb-1">
                  <label
                    htmlFor="reasoning"
                    className="mb-1 font-semibold text-sm"
                  >
                    Alasan Penolakan
                  </label>
                </div>
                <Textarea
                  variant="bordered"
                  aria-label="alasan-penolakan"
                  placeholder="Masukkan disini"
                  value={reasoning}
                  onChange={(e) => setReasoning(e.target.value)}
                  classNames={{
                    input: "text-xs",
                  }}
                />
              </div>
              <br />
              <div className="flex items-center w-full gap-2">
                <Button
                  isLoading={isLoadingConfirm}
                  onPress={onClose}
                  className="flex-1 bg-danger text-white font-semibold"
                  size="sm"
                  radius="sm"
                >
                  Batal
                </Button>
                <Button
                  isLoading={isLoadingConfirm}
                  onPress={handleUpdate}
                  className="flex-1 border border-button-primary bg-transparent text-button-primary font-semibold"
                  size="sm"
                  radius="sm"
                >
                  Ya, Tolak Data
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TolakModal;
