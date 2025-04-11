/* eslint-disable */

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

 
const exportToExcel = async (data: any[]) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Laporan Data");

  // Merge header dan styling
  worksheet.mergeCells("A1", "D1");
  worksheet.getCell("A1").value = "Laporan Penjualan";
  worksheet.getCell("A1").font = { size: 16, bold: true };
  worksheet.getCell("A1").alignment = { horizontal: "center" };

  // Header kolom
  worksheet.addRow(["No", "Nama Produk", "Jumlah", "Harga"]);
  const headerRow = worksheet.getRow(2);
  headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF3E4B5B" }, // warna latar belakang header
  };

  // Data dinamis
  data.forEach((item, index) => {
    worksheet.addRow([index + 1, item.namaProduk, item.jumlah, item.harga]);
  });

  // Atur lebar kolom
  worksheet.columns = [
    { width: 5 },
    { width: 30 },
    { width: 10 },
    { width: 15 },
  ];

  // Simpan file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, "Laporan-Penjualan.xlsx");
};

export default exportToExcel;
