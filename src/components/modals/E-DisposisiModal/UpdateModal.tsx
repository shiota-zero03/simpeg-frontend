import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { LuX } from "react-icons/lu";
import "react-datepicker/dist/react-datepicker.css";
import { LucideInbox } from "lucide-react";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { Commet } from "react-loading-indicators";
import {
  useGetDetailEDisposisi,
  useTeruskanEDisposisi,
} from "@/services/e-disposisi";
import { DMYIndoToFormat, HIDateformat } from "@/utils/dateFormater";
import { FaCircle } from "react-icons/fa";

interface props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
}

const UpdateModal = ({ id, isOpen, onClose, handleClose }: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data, isFetching, refetch } = useGetDetailEDisposisi(String(id));

  const DATA_FETCHING = useMemo(() => {
    if (data) return data.data;
    else return null;
  }, [data, id, isOpen]);

  useEffect(() => {
    setIsLoading(false);
    refetch();
  }, [id, isOpen]);

  const { mutate: mutatePost } = useTeruskanEDisposisi();

  const handleSubmit = () => {
    setIsLoading(true);

    try {
      mutatePost(
        {
          id: id,
        },
        {
          onSuccess: () => {
            SuccessToast({ text: "Data berhasil diparaf" });
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

  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="4xl">
        <ModalContent>
          {isFetching && (
            <div className="inset-0 flex items-center justify-center absolute">
              <Commet color="#32cd32" size="medium" text="" textColor="" />
            </div>
          )}
          <ModalHeader className="flex items-center justify-between">
            <span className="text-base font-semibold">
              Edit Data E-Disposisi
            </span>
            <LuX
              className="text-danger border border-danger rounded-full p-2 cursor-pointer"
              onClick={onClose}
              size={32}
            />
          </ModalHeader>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom flex flex-col gap-4 pb-8">
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-2 border rounded-md md:p-4 p-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Surat dari
                </label>
                <Input
                  aria-label="lokasi"
                  isReadOnly
                  variant="bordered"
                  radius="sm"
                  value={DATA_FETCHING?.suratDari}
                  placeholder="Surat Dari"
                  classNames={{
                    input: "text-xs",
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  No. Surat
                </label>
                <Input
                  aria-label="lokasi"
                  isReadOnly
                  variant="bordered"
                  radius="sm"
                  value={DATA_FETCHING?.nomorSurat}
                  placeholder="No. Surat"
                  classNames={{
                    input: "text-xs",
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Tanggal Surat
                </label>
                <Input
                  aria-label="lokasi"
                  isReadOnly
                  variant="bordered"
                  radius="sm"
                  value={DMYIndoToFormat(DATA_FETCHING?.tanggalSurat || "")}
                  placeholder="Tanggal Surat"
                  classNames={{
                    input: "text-xs",
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Tanggal Diterima
                </label>
                <Input
                  aria-label="lokasi"
                  isReadOnly
                  variant="bordered"
                  radius="sm"
                  value={DMYIndoToFormat(DATA_FETCHING?.tanggalDiterima || "")}
                  placeholder="Tanggal Diterima"
                  classNames={{
                    input: "text-xs",
                  }}
                />
              </div>
              <div className="lg:col-span-2 col-span-1 flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Sifat
                </label>
                <Input
                  aria-label="lokasi"
                  isReadOnly
                  variant="bordered"
                  radius="sm"
                  value={
                    DATA_FETCHING?.sifat &&
                    (DATA_FETCHING?.sifat === "SANGAT_SEGERA"
                      ? "Sangat Segera"
                      : DATA_FETCHING?.sifat === "SEGERA"
                        ? "Segera"
                        : "Rahasia")
                  }
                  placeholder="Sifat"
                  classNames={{
                    input: "text-xs",
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Perihal
                </label>
                <div className="text-xs">{DATA_FETCHING?.description}</div>
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
                <LucideInbox /> Teruskan E-Disposisi
              </Button>
            </div>
            <div>
              <h1 className="font-semibold">Riwayat E-Disposisi</h1>
              <ol className="relative border-s border-gray-200 dark:border-gray-700 ms-4 mt-2">
                {DATA_FETCHING?.riwayat.map((item, idx) => (
                  <li className="mb-10 ms-6" key={idx}>
                    <span
                      className={`absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-white ${idx === 0 ? "bg-[#E0FFFB]" : "bg-white"}`}
                    >
                      <FaCircle
                        size={10}
                        className={`${idx === 0 ? "text-[#1AB29E]" : "text-[#939597]"}`}
                      />
                    </span>
                    <h3 className="text-sm font-semibold mb-2">
                      {item.description}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {DMYIndoToFormat(item.createdAt)} &nbsp;|&nbsp;{" "}
                      {HIDateformat(item.createdAt)}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateModal;
