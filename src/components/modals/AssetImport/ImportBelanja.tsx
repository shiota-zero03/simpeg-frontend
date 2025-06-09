import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { LuSave, LuX } from "react-icons/lu";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreKegiatanBelanja } from "@/interface/request/assetPembelanjaan";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useGetAllSubDataKegiatanOption } from "@/services/asset/asset-pembelanjaan/sub-data-kegiatan";
import { useGetAllDataKegiatanOption } from "@/services/asset/asset-pembelanjaan/data-kegiatan";
import { useCreateKegiatanBelanja } from "@/services/asset/asset-pembelanjaan/data-item-belanja";
import {
  DataKegiatanRes,
  SubDataKegiatanRes,
} from "@/interface/responses/asset.Pembelanjaaninterface";

interface props {
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
}

const ImportBelanja = ({ isOpen, onClose, handleClose }: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileExcel, setFileExcel] = useState<File | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const {
    data: allData,
    isFetching: isFetchingKegiatan,
    refetch: refetchKegiatan,
  } = useGetAllDataKegiatanOption();
  const KEGIATAN_SELECT = useMemo(() => {
    return allData ? allData.data : [];
  }, [allData]);

  const {
    data: allDataSub,
    isFetching: isFetchingSubKegiatan,
    refetch: refetchSubKegiatan,
  } = useGetAllSubDataKegiatanOption();
  const SUBKEGIATAN_SELECT = useMemo(() => {
    return allDataSub ? allDataSub.data : [];
  }, [allDataSub]);

  const handleExportTemplate = async () => {
    setIsDownloading(true);

    const workbook = new ExcelJS.Workbook();

    // ========================
    // Sheet 1: Template Utama
    // ========================
    const sheetTemplate = workbook.addWorksheet("Template");

    sheetTemplate.columns = [
      { header: "No", key: "no", width: 5 },
      { header: "Nama Belanja", key: "name", width: 30 },
      { header: "ID Kegiatan", key: "kegiatanId", width: 25 },
      { header: "ID Sub Kegiatan", key: "subKegiatanId", width: 25 },
      { header: "Kode Rekening", key: "kode", width: 25 },
      { header: "Pagu Belanja", key: "pagu", width: 25 },
      { header: "Uraian", key: "uraian", width: 40 },
      {
        header: "ID Sub Kegiatan Lihat Sheet Sub Kegiatan",
        key: "2",
        width: 60,
      },
      {
        header: "ID Sub Kegiatan Lihat Sheet Sub Kegiatan",
        key: "3",
        width: 60,
      },
    ];

    const templateData = [
      {
        no: 1,
        name: "Pengadaan Laptop",
        kegiatanId: KEGIATAN_SELECT?.[0]?.id || 1,
        subKegiatanId: SUBKEGIATAN_SELECT?.[0]?.id || 1,
        kode: "123-456-789",
        pagu: "500000",
        uraian: "Belanja Keperluan",
      },
      {
        no: 2,
        name: "Pelatihan SDM",
        kegiatanId: KEGIATAN_SELECT?.[0]?.id || 1,
        subKegiatanId: SUBKEGIATAN_SELECT?.[0]?.id || 1,
        kode: "987-654-321",
        pagu: "5000000",
        uraian: "Belanja Keperluan",
      },
      {
        no: "",
        name: "",
        kegiatanId: "",
        subKegiatanId: "",
        kode: "",
        pagu: "",
        uraian: "",
      },
      {
        no: "",
        name: "",
        kegiatanId: "",
        subKegiatanId: "",
        kode: "",
        pagu: "",
        uraian: "",
      },
    ];

    templateData.forEach((row) => {
      sheetTemplate.addRow(row);
    });

    sheetTemplate.views = [{ state: "frozen", ySplit: 1 }];

    sheetTemplate.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        // Border
        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };

        // Header style
        if (rowNumber === 1) {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "0070C0" }, // Biru
          };
          cell.font = { color: { argb: "FFFFFF" }, bold: true };
          cell.alignment = { horizontal: "center", vertical: "middle" };
        } else {
          cell.alignment = { vertical: "top", horizontal: "left" };
        }
      });
    });

    // ========================
    // Sheet 2: Daftar Kegiatan
    // ========================
    const sheetKegiatan = workbook.addWorksheet("Kegiatan");
    sheetKegiatan.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Nama Kegiatan", key: "name", width: 40 },
    ];

    KEGIATAN_SELECT.forEach((item: DataKegiatanRes) => {
      sheetKegiatan.addRow({ id: item.id, name: item.name });
    });

    // Style Header Kegiatan
    sheetKegiatan.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "70AD47" }, // Hijau
      };
      cell.font = { color: { argb: "FFFFFF" }, bold: true };
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
      cell.alignment = { horizontal: "center", vertical: "middle" };
    });

    // ============================
    // Sheet 3: Daftar Sub Kegiatan
    // ============================
    const sheetSubKegiatan = workbook.addWorksheet("Sub Kegiatan");
    sheetSubKegiatan.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Nama Sub Kegiatan", key: "name", width: 40 },
    ];

    SUBKEGIATAN_SELECT.forEach((item: SubDataKegiatanRes) => {
      sheetSubKegiatan.addRow({ id: item.id, name: item.name });
    });

    // Style Header Sub Kegiatan
    sheetSubKegiatan.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "70AD47" }, // Hijau
      };
      cell.font = { color: { argb: "FFFFFF" }, bold: true };
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
      cell.alignment = { horizontal: "center", vertical: "middle" };
    });

    // ========================
    // Simpan File
    // ========================
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "template_data_belanja.xlsx");

    setIsDownloading(false);
  };

  const { mutate: mutatePost } = useCreateKegiatanBelanja();

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
        const name = item["Nama Belanja"];
        const kodeRekening = item["Kode Rekening"];
        const kegiatanId = item["ID Kegiatan"];
        const subKegiatanId = item["ID Sub Kegiatan"];
        const paguBelanja = item["Pagu Belanja"]
          ? Number(item["Pagu Belanja"])
          : "";
        const uraian = item["Uraian"];

        if (
          !name ||
          !kodeRekening ||
          !kegiatanId ||
          !subKegiatanId ||
          !paguBelanja
        ) {
          failedCount++;
          continue;
        }

        const formToSend: StoreKegiatanBelanja = {
          namaBelanja: name,
          accountBank: kodeRekening,
          kegiatanId: kegiatanId,
          subKegiatanId: subKegiatanId,
          uraian: uraian,
          paguBelanja: paguBelanja,
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
    refetchKegiatan();
    refetchSubKegiatan();
    setFileExcel(null);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="3xl">
      <ModalContent>
        <ModalHeader className="flex items-center justify-between">
          <span className="text-base font-semibold">Import Data Belanja</span>
          <LuX
            className="text-danger border border-danger rounded-full p-2 cursor-pointer"
            onClick={onClose}
            size={32}
          />
        </ModalHeader>
        <ModalBody className="max-h-[72vh] overflow-y-auto flex flex-col gap-4 pb-8">
          <Button
            isLoading={
              isDownloading || isFetchingKegiatan || isFetchingSubKegiatan
            }
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
              isLoading={
                isLoading || isFetchingKegiatan || isFetchingSubKegiatan
              }
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

export default ImportBelanja;
