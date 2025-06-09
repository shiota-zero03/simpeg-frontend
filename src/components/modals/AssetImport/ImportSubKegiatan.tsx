import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { LuSave, LuX } from "react-icons/lu";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreSubDataKegiatan } from "@/interface/request/assetPembelanjaan";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useCreateSubDataKegiatan } from "@/services/asset/asset-pembelanjaan/sub-data-kegiatan";

interface props {
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
}

const ImportSubKegiatan = ({ isOpen, onClose, handleClose }: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileExcel, setFileExcel] = useState<File | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const { mutate: mutatePost } = useCreateSubDataKegiatan();

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

      let successCount = 0;
      let failedCount = 0;

      for (const item of data) {
        const name = item["Nama Sub Kegiatan"];
        const kodeRekening = item["Kode Rekening"];

        if (!name || !kodeRekening) {
          failedCount++;
          continue;
        }

        const formToSend: StoreSubDataKegiatan = {
          name,
          accountBank: kodeRekening,
        };

        await new Promise((resolve) => {
          mutatePost(formToSend, {
            onSuccess: () => {
              successCount++;
              resolve(null);
            },
            onError: (error: AxiosError<BaseErrorRes>) => {
              ErrorToast({
                text:
                  (error.response?.data.message as string) ||
                  "Terjadi kesalahan saat mengirim data",
              });
              failedCount++;
              resolve(null);
            },
          });
        });
      }

      SuccessToast({
        text: `Import selesai. Berhasil: ${successCount}, Gagal: ${failedCount}`,
      });

      handleClose();
    } catch (error) {
      console.error(error);
      ErrorToast({ text: "Terjadi kesalahan saat membaca file Excel" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportTemplate = async () => {
    setIsDownloading(true);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Template");

    worksheet.columns = [
      { header: "No", key: "no", width: 5 },
      { header: "Nama Sub Kegiatan", key: "name", width: 30 },
      { header: "Kode Rekening", key: "kode", width: 25 },
    ];

    const data = [
      { no: 1, name: "Pengadaan Laptop", kode: "123-456-789" },
      { no: 2, name: "Pelatihan SDM", kode: "987-654-321" },
      { no: "", name: "", kode: "" },
      { no: "", name: "", kode: "" },
    ];

    data.forEach((row) => {
      worksheet.addRow(row);
    });

    worksheet.views = [{ state: "frozen", ySplit: 1 }];

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };

        if (rowNumber === 1) {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "0070C0" },
          };
          cell.font = {
            color: { argb: "FFFFFF" },
            bold: true,
          };
          cell.alignment = { horizontal: "center", vertical: "middle" };
        } else {
          cell.alignment = { vertical: "top", horizontal: "left" };
        }
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "template_data_sub_kegiatan.xlsx");

    setIsDownloading(false);
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

  useEffect(() => {
    setFileExcel(null);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="3xl">
      <ModalContent>
        <ModalHeader className="flex items-center justify-between">
          <span className="text-base font-semibold">
            Import Data Sub-Kegiatan
          </span>
          <LuX
            className="text-danger border border-danger rounded-full p-2 cursor-pointer"
            onClick={onClose}
            size={32}
          />
        </ModalHeader>
        <ModalBody className="max-h-[72vh] overflow-y-auto flex flex-col gap-4 pb-8">
          <Button
            isLoading={isDownloading}
            onPress={handleExportTemplate}
            className="border border-info bg-info text-white font-semibold"
            size="sm"
            radius="sm"
          >
            Download Template
          </Button>

          <div>
            <label htmlFor="file-import">Masukkan File Import (.xlsx)</label>
            <input
              id="file-import"
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
  );
};

export default ImportSubKegiatan;
