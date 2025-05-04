import React, { useEffect, useMemo } from "react";
import { saveAs } from "file-saver";
import ExcelJS, { Alignment } from "exceljs";
import LoaderPage from "@/components/loader/LoaderPage";
import { YMToIndoFormat } from "@/utils/dateFormater";
import { useGetAllPegawaiOption } from "@/services/pegawai";

const ExportExcel: React.FC = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const m = queryParams.get("m");

  let date = YMToIndoFormat(new Date().toISOString()).toUpperCase();
  if (m) {
    date = YMToIndoFormat(`${m}-01`).toUpperCase();
  }

  const { data, refetch, isFetching } = useGetAllPegawaiOption();
  const DATA_FETCHING = useMemo(() => {
    if (data) return data.data;
    else return [];
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Data Pegawai");

    const topHeaderCell = sheet.getCell(`A1`);
    topHeaderCell.alignment = { horizontal: "left", vertical: "middle" };
    topHeaderCell.font = { bold: true };
    topHeaderCell.value = "HASIL EXPORT DATA PEGAWAI";
    topHeaderCell.border = {
      top: { style: "thin", color: { argb: "000000" } },
      left: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    };
    sheet.mergeCells("A1:I1");

    const topThirdHeaderCell = sheet.getCell(`A2`);
    topThirdHeaderCell.alignment = { horizontal: "left", vertical: "middle" };
    topThirdHeaderCell.font = { bold: true };
    topThirdHeaderCell.value = `BULAN ${date}`;
    topThirdHeaderCell.border = {
      left: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
    };
    sheet.mergeCells("A2:I2");

    // Header Pegawai
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
        value: "NIP",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "C3",
        value: "Nama",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "D3",
        value: "Pangkat",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "E3",
        value: "Golongan",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "F3",
        value: "Jabatan",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "G3",
        value: "Unit Kerja",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "H3",
        value: "Eselon",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "I3",
        value: "Sub Unor",
        alignment: { horizontal: "left", vertical: "middle" },
      },
    ];
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

    const dataPegawai = DATA_FETCHING.map((item, index) => ({
      A: index + 1, // Nomor
      B: item.nip || "-", // NIP
      C: item.name || "-", // Nama
      D: item.rank || "-", // Pangkat
      E: item.group || "-", // Golongan
      F: item.jabatan.nameJob || "-", // Jabatan
      G:
        item.jabatan.nameJob === "KEPALA DINAS"
          ? "PEMERINTAH KAB. BEKASI"
          : "DINAS PERDAGANGAN KAB. BEKASI", // Unit Kerja
      H: item.jabatan.eselon || "-", // Eselon
      I: item.jabatan.unit.nameUnit || "-", // Sub Unor
    }));

    dataPegawai.forEach((data, index) => {
      const row = sheet.getRow(index + 4); // Mulai dari baris 4
      row.getCell("A").value = data.A;
      row.getCell("B").value = data.B;
      row.getCell("C").value = data.C;
      row.getCell("D").value = data.D;
      row.getCell("E").value = data.E;
      row.getCell("F").value = data.F;
      row.getCell("G").value = data.G;
      row.getCell("H").value = data.H;
      row.getCell("I").value = data.I;

      // Menambahkan gaya jika perlu (misalnya, border)
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
        cell.alignment = { wrapText: true, vertical: "top" };
      });
    });

    sheet.getColumn(1).width = 4;
    sheet.getColumn(2).width = 40;
    sheet.getColumn(3).width = 40;
    sheet.getColumn(4).width = 40;
    sheet.getColumn(5).width = 40;
    sheet.getColumn(6).width = 40;
    sheet.getColumn(7).width = 40;
    sheet.getColumn(8).width = 40;
    sheet.getColumn(9).width = 40;
    sheet.getColumn(10).width = 40;

    // -------------------------------
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Data Pegawai.xlsx");
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
