import React, { useEffect, useMemo } from "react";
import { saveAs } from "file-saver";
import ExcelJS, { Alignment } from "exceljs";
import LoaderPage from "@/components/loader/LoaderPage";
import { YMToIndoFormat } from "@/utils/dateFormater";
import { useGetAllJabatanOption } from "@/services/jabatan";

const ExportExcel: React.FC = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const m = queryParams.get("m");

  let date = YMToIndoFormat(new Date().toISOString()).toUpperCase();
  if (m) {
    date = YMToIndoFormat(`${m}-01`).toUpperCase();
  }

  const { data, refetch, isFetching } = useGetAllJabatanOption();
  const DATA_FETCHING = useMemo(() => {
    if (data) return data.data;
    else return [];
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Data Jabatan");

    const topHeaderCell = sheet.getCell(`A1`);
    topHeaderCell.alignment = { horizontal: "left", vertical: "middle" };
    topHeaderCell.font = { bold: true };
    topHeaderCell.value = "HASIL EXPORT DATA JABATAN";
    topHeaderCell.border = {
      top: { style: "thin", color: { argb: "000000" } },
      left: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    };
    sheet.mergeCells("A1:F1");

    const topThirdHeaderCell = sheet.getCell(`A2`);
    topThirdHeaderCell.alignment = { horizontal: "left", vertical: "middle" };
    topThirdHeaderCell.font = { bold: true };
    topThirdHeaderCell.value = `BULAN ${date}`;
    topThirdHeaderCell.border = {
      left: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
    };
    sheet.mergeCells("A2:F2");

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
        value: "ID Jabatan",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "C3",
        value: "Nama Jabatan",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "D3",
        value: "Atasan",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "E3",
        value: "Ketersediaan",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "F3",
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
      B: item.id || "-", // NIP
      C: item.nameJob || "-", // Nama
      D: item.parent ? item.parent.nameJob : "-", // Pangkat
      E: item.ketersediaan || "-", // Golongan
      F: item.unit?.nameUnit || "-", // Golongan
    }));

    dataPegawai.forEach((data, index) => {
      const row = sheet.getRow(index + 4); // Mulai dari baris 4
      row.getCell("A").value = data.A;
      row.getCell("B").value = data.B;
      row.getCell("C").value = data.C;
      row.getCell("D").value = data.D;
      row.getCell("E").value = data.E;
      row.getCell("F").value = data.F;

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
    sheet.getColumn(2).width = 20;
    sheet.getColumn(3).width = 40;
    sheet.getColumn(4).width = 40;
    sheet.getColumn(5).width = 20;
    sheet.getColumn(6).width = 40;

    // -------------------------------
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Data Jabatan.xlsx");
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
