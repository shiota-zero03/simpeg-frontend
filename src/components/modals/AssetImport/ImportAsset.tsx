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
import { StoreDataBelanja } from "@/interface/request/assetPembelanjaan";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useGetAllKegiatanBelanjaOption } from "@/services/asset/asset-pembelanjaan/data-item-belanja";
import { KegiatanBelanjaRes } from "@/interface/responses/asset.Pembelanjaaninterface";
import { StoreAsset } from "@/interface/request/asset.interface";
import { useCreateDataBelanja } from "@/services/asset/asset-pembelanjaan/data-pembelanjaan";

interface props {
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
}

const ImportAsset = ({ isOpen, onClose, handleClose }: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileExcel, setFileExcel] = useState<File | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const {
    data: allData,
    isFetching: isFetchingKegiatan,
    refetch: refetchKegiatan,
  } = useGetAllKegiatanBelanjaOption();
  const KEGIATAN_SELECT = useMemo(() => {
    return allData ? allData.data : [];
  }, [allData]);

  const handleExportTemplate = async () => {
    setIsDownloading(true);

    const workbook = new ExcelJS.Workbook();

    // ========================
    // Sheet 1: Template Utama
    // ========================
    const sheetTemplate = workbook.addWorksheet("Template");

    sheetTemplate.columns = [
      { header: "No", key: "no", width: 5 },
      {
        header: "Kategori (Peralatan Kantor / Kendaraan)",
        key: "kategori",
        width: 40,
      },
      { header: "ID Belanja", key: "idBelanja", width: 30 },
      { header: "ID Barang", key: "idBarang", width: 30 },
      { header: "Kode Barang", key: "kodeBarang", width: 30 },
      { header: "No. Registrasi", key: "reg", width: 30 },
      { header: "Nama Barang", key: "namaBarang", width: 30 },
      { header: "Merk/Tipe", key: "merkTipe", width: 30 },
      { header: "Ukuran/CC", key: "ukuranCC", width: 30 },
      { header: "Bahan", key: "bahan", width: 30 },
      { header: "Tahun Perolehan", key: "tahun", width: 16 },
      { header: "No. Pabrik", key: "pabrik", width: 30 },
      { header: "No. Rangka", key: "rangka", width: 30 },
      { header: "No. Mesin", key: "mesin", width: 30 },
      { header: "No. Polisi", key: "polisi", width: 30 },
      { header: "BPKB/STNK", key: "bpkb_stnk", width: 30 },
      { header: "Nomor BPKB/STNK", key: "no_bpkb_stnk", width: 30 },
      { header: "Keterangan", key: "keterangan", width: 30 },
      { header: "Harga", key: "harga", width: 30 },

      { header: "ID Belanja Lihat Sheet Data Belanja", key: "2", width: 60 },
    ];

    const templateData = [
      {
        no: 1,
        kategori: "Peralatan Kantor",
        idBelanja: KEGIATAN_SELECT?.[0]?.id || "",
        idBarang: "BRG001",
        kodeBarang: "PK-001-2024",
        reg: "REG001",
        namaBarang: "Laptop ASUS VivoBook",
        merkTipe: "ASUS X412DA",
        ukuranCC: "-",
        bahan: "Plastik & Logam",
        tahun: 2024,
        pabrik: "ASUS Inc.",
        rangka: "-",
        mesin: "-",
        polisi: "-",
        bpkb_stnk: "BPKB",
        no_bpkb_stnk: "BPKB123456",
        keterangan: "Digunakan untuk keperluan administrasi",
        harga: 8500000,
      },
      {
        no: 2,
        kategori: "Kendaraan",
        idBelanja: KEGIATAN_SELECT?.[0]?.id || "",
        idBarang: "BRG002",
        kodeBarang: "KD-002-2024",
        reg: "REG002",
        namaBarang: "Sepeda Motor Dinas",
        merkTipe: "Honda Supra X",
        ukuranCC: "125 CC",
        bahan: "Besi",
        tahun: 2023,
        pabrik: "Honda",
        rangka: "RNG-001-HND",
        mesin: "MSN-002-HND",
        polisi: "B 1234 CD",
        bpkb_stnk: "STNK",
        no_bpkb_stnk: "STNK98765",
        keterangan: "Untuk operasional lapangan",
        harga: 17000000,
      },
      // Baris kosong
      {
        no: "",
        kategori: "",
        idBelanja: "",
        idBarang: "",
        kodeBarang: "",
        reg: "",
        namaBarang: "",
        merkTipe: "",
        ukuranCC: "",
        bahan: "",
        tahun: "",
        pabrik: "",
        rangka: "",
        mesin: "",
        polisi: "",
        bpkb_stnk: "",
        no_bpkb_stnk: "",
        keterangan: "",
        harga: "",
      },
      {
        no: "",
        kategori: "",
        idBelanja: "",
        idBarang: "",
        kodeBarang: "",
        reg: "",
        namaBarang: "",
        merkTipe: "",
        ukuranCC: "",
        bahan: "",
        tahun: "",
        pabrik: "",
        rangka: "",
        mesin: "",
        polisi: "",
        bpkb_stnk: "",
        no_bpkb_stnk: "",
        keterangan: "",
        harga: "",
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
          cell.alignment = {
            horizontal: "center",
            vertical: "middle",
            wrapText: true, // ✅ WRAP TEXT untuk header
          };
        } else {
          cell.alignment = {
            vertical: "top",
            horizontal: "left",
            wrapText: true, // ✅ WRAP TEXT untuk data
          };
        }
      });
    });

    // ========================
    // Sheet 2: Daftar Belanja
    // ========================
    const sheetKegiatan = workbook.addWorksheet("Belanja");
    sheetKegiatan.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Nama Belanja", key: "name", width: 40 },
      { header: "Nama Kegiatan", key: "keg", width: 40 },
      { header: "Nama Sub-Kegiatan", key: "subKeg", width: 40 },
    ];

    KEGIATAN_SELECT.forEach((item: KegiatanBelanjaRes) => {
      sheetKegiatan.addRow({
        id: item.id,
        name: item.namaBelanja,
        keg: item.kegiatan?.name || "",
        subKeg: item.subKegiatan?.name || "",
      });
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

    // ========================
    // Simpan File
    // ========================
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "template_data_aset.xlsx");

    setIsDownloading(false);
  };

  const { mutate: mutatePost } = useCreateDataBelanja();

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
        const kategori = item["Kategori (Peralatan Kantor / Kendaraan)"];
        const idBelanja = item["ID Belanja"];
        const idBarang = item["ID Barang"];
        const kodeBarang = item["Kode Barang"];
        const noRegistrasi = item["No. Registrasi"];
        const namaBarang = item["Nama Barang"];
        const merkTipe = item["Merk/Tipe"];
        const ukuranCC = item["Ukuran/CC"];
        const bahan = item["Bahan"];
        const tahun = item["Tahun Perolehan"];
        const pabrik = item["No. Pabrik"];
        const rangka = item["No. Rangka"];
        const mesin = item["No. Mesin"];
        const polisi = item["No. Polisi"];
        const bpkb_stnk = item["BPKB/STNK"];
        const no_bpkb_stnk = item["Nomor BPKB/STNK"];
        const keterangan = item["Keterangan"];
        const harga = item["Harga"] ? Number(item["Harga"]) : 0;
        const tanggal = new Date().toISOString().split("T")[0];
        const jumlah = 1;
        const satuan = "PCS";

        if (
          !idBelanja ||
          !harga ||
          !idBarang ||
          !kodeBarang ||
          !noRegistrasi ||
          !kategori ||
          !namaBarang
        ) {
          failedCount++;
          continue;
        }

        const formAsset: StoreAsset = {};

        if (idBarang) formAsset.idBarang = idBarang;
        if (kodeBarang) formAsset.kodeBarang = kodeBarang;
        if (namaBarang) formAsset.namaBarang = namaBarang;
        if (noRegistrasi) formAsset.nomorRegistrasi = noRegistrasi;
        if (merkTipe) formAsset.merkTipe = merkTipe;
        if (ukuranCC) formAsset.ukuranCC = ukuranCC;
        if (bahan) formAsset.jenisBahan = bahan;
        if (tahun) formAsset.tahunPerolehan = tahun;
        if (pabrik) formAsset.nomorPabrik = pabrik;
        if (rangka) formAsset.nomorRangka = rangka;
        if (mesin) formAsset.nomorMesin = mesin;
        if (polisi) formAsset.nomorPolisi = polisi;
        if (bpkb_stnk && ["BPKB", "STNK"].includes(bpkb_stnk.toUpperCase())) {
          formAsset.dokumenTipe =
            bpkb_stnk.toUpperCase() === "BPKB" ? "BPKB" : "STNK";
        }
        if (no_bpkb_stnk) formAsset.dokumenNomor = no_bpkb_stnk;
        if (keterangan) formAsset.keterangan = keterangan;
        if (kategori) {
          const upperKategori = kategori.toUpperCase();
          if (upperKategori.includes("KENDARAAN")) {
            formAsset.kategori = "KENDARAAN";
          } else if (upperKategori.includes("PERALATAN")) {
            formAsset.kategori = "PERALATAN";
          }
        }
        formAsset.harga = harga || 0;

        const formToSend: StoreDataBelanja = {};
        if (namaBarang) {
          formToSend.name = namaBarang;
        }
        if (idBelanja) {
          formToSend.idDataBelanja = Number(idBelanja);
        }
        if (namaBarang) {
          formToSend.namaBarang = namaBarang;
        }
        if (tanggal) {
          formToSend.tanggal = tanggal;
        }
        if (jumlah) {
          formToSend.jumlah = jumlah;
        }
        if (satuan) {
          formToSend.satuan = satuan;
        }
        formToSend.hargaPerItem = harga || 0;
        formToSend.asset = formAsset;

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
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="3xl">
      <ModalContent>
        <ModalHeader className="flex items-center justify-between">
          <span className="text-base font-semibold">
            Import Data Aset/Item Belanja
          </span>
          <LuX
            className="text-danger border border-danger rounded-full p-2 cursor-pointer"
            onClick={onClose}
            size={32}
          />
        </ModalHeader>
        <ModalBody className="max-h-[72vh] overflow-y-auto flex flex-col gap-4 pb-8">
          <Button
            isLoading={isDownloading || isFetchingKegiatan}
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
              isLoading={isLoading || isFetchingKegiatan}
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

export default ImportAsset;
