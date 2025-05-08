import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { useState } from "react";
import { LuSave, LuX } from "react-icons/lu";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import * as XLSX from "xlsx";
import { StorePegawai } from "@/interface/request/pegawai.interface";
import { useCreatePegawai } from "@/services/pegawai";

interface props {
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
}

const ImportModal = ({ isOpen, onClose, handleClose }: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileExcel, setFileExcel] = useState<File | null>(null);

  const { mutate: mutatePost } = useCreatePegawai();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileExcel(file);
    }
  };

  const handleSubmit = async () => {
    if (!fileExcel) {
      ErrorToast({ text: "Mohon upload file terlebih dahulu" });
      return;
    }

    setIsLoading(true);

    try {
      const data = await readExcel(fileExcel);
      console.log(data);

      for (const item of data) {
        const formToSend: StorePegawai = {
          name: item["Nama Pegawai"],
          email: item["Email"],
          password: item["PASSWORD"],
          nip: item["NIP"],
          role: "PEGAWAI",
          phoneNumber: item["No WhatsApp"],
          dateOfBirth: item["Tanggal Lahir"],
          placeOfBirth: item["Tempat Lahir"],
          tempatLahir: item["Tempat Lahir"],
          rank: item["Pangkat"],
          group: item["Golongan"],
          gender: item["Jenis Kelamin"],
          position: Number(item["ID Jabatan"]),
          education: item["Pendidikan Terakhir"],
          pensionAge: Number(item["Usia Pensiun"]),
          pensionDate: item["Tanggal Pensiun"],
          status: true,
          statusAsn: item["Status ASN"] ? true : false,
        };

        await new Promise((resolve, reject) => {
          mutatePost(formToSend, {
            onSuccess: () => {
              resolve(null);
            },
            onError: (error: AxiosError<BaseErrorRes>) => {
              ErrorToast({
                text:
                  (error.response?.data.message as string) ||
                  "Terjadi kesalahan saat mengirim data",
              });
              reject(error);
            },
          });
        });
      }

      SuccessToast({ text: "Semua data berhasil diimport" });
      handleClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const readExcel = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        resolve(jsonData);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="3xl">
        <ModalContent>
          <ModalHeader className="flex items-center justify-between">
            <span className="text-base font-semibold">Tambah Data Pegawai</span>
            <LuX
              className="text-danger border border-danger rounded-full p-2 cursor-pointer"
              onClick={onClose}
              size={32}
            />
          </ModalHeader>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom flex flex-col gap-4 pb-8">
            <div>
              <label htmlFor="file-import">Masukkan File Import (.xlsx)</label>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImportModal;
