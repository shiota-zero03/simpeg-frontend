import React, { useEffect, useMemo } from "react";
import { saveAs } from "file-saver";
import ExcelJS, { Alignment, Cell } from "exceljs";
import LoaderPage from "@/components/loader/LoaderPage";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDetailIKP } from "@/services/ikp";
import { ErrorToast } from "@/utils/ToastMessage";
import { IKPListRes } from "@/interface/responses/ikp.interface";

const ExportExcel: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, refetch, isFetching, error } = useGetDetailIKP(id || "");

  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/dialog-kinerja");
    }
  }, [isFetching, refetch]);

  useEffect(() => {
    refetch();
  }, []);

  const DATA_FETCHING: IKPListRes | null = useMemo(() => {
    if (data) {
      return data.data;
    } else {
      return null;
    }
  }, [id, data]);

  const headers1: {
    cell: string;
    value: string;
    alignment?: Partial<Alignment>;
  }[] = [
    {
      cell: "A3",
      value: "No",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "B3",
      value: "Nama Pegawai",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "C3",
      value: "NIP",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "D3",
      value: "Jabatan",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "E3",
      value: "Sasaran",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "F3",
      value: "Indikator",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "G3",
      value: "Target",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "H3",
      value: "Realisasi",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "I3",
      value: "Menunggu",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "J3",
      value: "Setuju",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "K3",
      value: "Ajukan Perubahan",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "K4",
      value: "Ubah Target",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "L4",
      value: "Keterangan",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "M4",
      value: "Dialog Kinerja",
      alignment: { horizontal: "center", vertical: "middle" },
    },
  ];

  const populateSheet = (
    sheet: ExcelJS.Worksheet,

    data: IKPListRes | null,
  ) => {
    sheet.mergeCells("A3:A4");
    sheet.mergeCells("B3:B4");
    sheet.mergeCells("C3:C4");
    sheet.mergeCells("D3:D4");
    sheet.mergeCells("E3:E4");
    sheet.mergeCells("F3:F4");
    sheet.mergeCells("G3:G4");
    sheet.mergeCells("H3:H4");
    sheet.mergeCells("I3:I4");
    sheet.mergeCells("J3:J4");
    sheet.mergeCells("K3:M3");
    sheet.getCell(`A1`).value = "Rekapitulasi IKP";
    sheet.getCell(`A1`).font = { bold: true };
    sheet.getCell(`A1`).alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    sheet.mergeCells("A1:M1");

    sheet.getCell(`A2`).value = String(
      `Instruksi Khusus Pimpinan`,
    ).toUpperCase();
    sheet.getCell(`A2`).font = { bold: true };
    sheet.getCell(`A2`).alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    sheet.mergeCells("A2:M2");

    headers1.forEach(({ cell, value, alignment }) => {
      const c = sheet.getCell(cell);
      c.value = value;
      c.font = { bold: true, color: { argb: "FFFFFF" } };
      c.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "12403C" },
      };
      c.border = {
        top: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
      if (alignment) {
        c.alignment = alignment;
      }
    });

    data?.ikps?.forEach((item, index) => {
      const row = sheet.addRow([
        index + 1,
        "",
        "",
        "",
        item.sasaran || "",
        item.indicator || "",
        item.target || "",
        item.realisasi || "",
        item.status !== "DISETUJUI" && item.status !== "SELESEI" ? "✓" : "",
        item.status === "DISETUJUI" || item.status === "SELESEI" ? "✓" : "",
        item.ubahTarget || "",
        item.description || "",
        item.dialog || "",
      ]);

      row.eachCell((cell: Cell) => {
        cell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
        cell.alignment = {
          wrapText: true,
          vertical: "top",
          horizontal: "center",
        };
      });

      // Kolom status sekarang berada di kolom ke-10 (karena mulai dari F)
      const statusCell = row.getCell(10);
      statusCell.font = {
        color: { argb: item.status === "Belum" ? "BF1E43" : "000000" },
        bold: item.status === "Belum",
      };
    });

    const startRow = 5;
    const ikpsLength = data?.ikps?.length || 1;
    const endRow = startRow + ikpsLength - 1;

    const nameCell = sheet.getCell(`B${startRow}`);
    nameCell.value = data?.name || "-";
    sheet.mergeCells(`B${startRow}:B${endRow}`);

    const nipCell = sheet.getCell(`C${startRow}`);
    nipCell.value = data?.nip || "-";
    sheet.mergeCells(`C${startRow}:C${endRow}`);

    const jabatanCell = sheet.getCell(`D${startRow}`);
    jabatanCell.value = data?.jabatan || "-";
    sheet.mergeCells(`D${startRow}:D${endRow}`);

    [nameCell, nipCell, jabatanCell].forEach((cell) => {
      cell.alignment = {
        wrapText: true,
        vertical: "top",
        horizontal: "left",
      };
      cell.border = {
        top: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
    });

    const lastRow = 7 + (data?.ikps.length || 0);

    const jabatanCreate = sheet.getCell(`B${lastRow}`);
    jabatanCreate.value = data?.ttdJabatan || "-";
    sheet.mergeCells(`B${lastRow}:C${lastRow}`);
    const namaCreate = sheet.getCell(`B${lastRow + 4}`);
    namaCreate.value = data?.ttdName || "-";
    sheet.mergeCells(`B${lastRow + 4}:C${lastRow + 4}`);
    const nipCreate = sheet.getCell(`B${lastRow + 5}`);
    nipCreate.value = `NIP.${data?.ttdNIP || "-"}`;
    sheet.mergeCells(`B${lastRow + 5}:C${lastRow + 5}`);

    const jabatanTo = sheet.getCell(`J${lastRow}`);
    jabatanTo.value = data?.jabatan || "-";
    sheet.mergeCells(`J${lastRow}:L${lastRow}`);
    const namaTo = sheet.getCell(`J${lastRow + 4}`);
    namaTo.value = data?.name || "-";
    sheet.mergeCells(`J${lastRow + 4}:L${lastRow + 4}`);
    const nipTo = sheet.getCell(`J${lastRow + 5}`);
    nipTo.value = `NIP.${data?.nip || "-"}`;
    sheet.mergeCells(`J${lastRow + 5}:L${lastRow + 5}`);

    [jabatanCreate, jabatanTo, nipCreate, nipTo].forEach((cell) => {
      cell.alignment = {
        wrapText: true,
        vertical: "top",
        horizontal: "center",
      };
    });
    [namaCreate, namaTo].forEach((cell) => {
      cell.alignment = {
        wrapText: true,
        vertical: "top",
        horizontal: "center",
      };
      cell.font = {
        bold: true,
      };
    });

    sheet.getColumn(1).width = 4;
    sheet.getColumn(2).width = 36;
    sheet.getColumn(3).width = 20;
    sheet.getColumn(4).width = 20;
    sheet.getColumn(5).width = 20;
    sheet.getColumn(6).width = 20;
    sheet.getColumn(7).width = 20;
    sheet.getColumn(8).width = 20;
    sheet.getColumn(9).width = 20;
    sheet.getColumn(10).width = 20;
    sheet.getColumn(11).width = 20;
    sheet.getColumn(12).width = 20;
    sheet.getColumn(13).width = 20;
  };

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();

    const dataDalam = DATA_FETCHING;

    const sheetDalam = workbook.addWorksheet("Dialog Kinerja Pimpinan");

    populateSheet(sheetDalam, dataDalam);

    // -------------------------------
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `Dialog Kinerja.xlsx`);
    setTimeout(() => window.close(), 2000);
  };

  useEffect(() => {
    if (!isFetching && DATA_FETCHING) {
      handleExport();
    }
  }, [isFetching, DATA_FETCHING]);

  return <LoaderPage />;
};

export default ExportExcel;
