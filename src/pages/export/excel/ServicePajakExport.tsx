import React, { useEffect, useMemo } from "react";
import { saveAs } from "file-saver";
import ExcelJS, { Alignment } from "exceljs";
import LoaderPage from "@/components/loader/LoaderPage";
import { useGetAllAssetServiceExport } from "@/services/asset/asset-service";
import { DMYIndoToFormat } from "@/utils/dateFormater";

const ExportExcel: React.FC = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const s = queryParams.get("s");
  const e = queryParams.get("e");

  const { data, refetch, isFetching } = useGetAllAssetServiceExport(s, e);

  const DATA_FETCHING = useMemo(() => {
    if (data) {
      return data;
    } else return [];
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Data Servis dan Pajak");

    const topHeaderCell = sheet.getCell(`A1`);
    topHeaderCell.alignment = { horizontal: "left", vertical: "middle" };
    topHeaderCell.font = { bold: true };
    topHeaderCell.value = `HASIL EXPORT LIST DATA SERVIS DAN PAJAK ${s && e ? `Periode ${DMYIndoToFormat(s)} - ${DMYIndoToFormat(e)}` : ""}`;
    topHeaderCell.border = {
      top: { style: "thin", color: { argb: "000000" } },
      left: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    };
    sheet.mergeCells("A1:O1");

    // Header Pegawai
    const headers1: {
      cell: string;
      value: string;
      alignment?: Partial<Alignment>;
    }[] = [
      {
        cell: "A2",
        value: "No",
        alignment: { horizontal: "center", vertical: "middle" },
      },
      {
        cell: "B2",
        value: "Nama Belanja",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "C2",
        value: "Nama Aset / Item Belanja",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "D2",
        value: "Penanggung Jawab",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "E2",
        value: "Tanggal Dibuat",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "F2",
        value: "Tipe (Servis / Pajak)",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "G2",
        value: "Tanggal Mulai Servis",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "H2",
        value: "Tanggal Selesai Servis",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "I2",
        value: "Nominal Servis",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "J2",
        value: "Servis Ke-",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "K2",
        value: "No. Surat Pesanan",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "L2",
        value: "Tanggal Surat Pesanan",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "M2",
        value: "Tanggal Pajak 5 Tahunan",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "N2",
        value: "Tanggal Pembayaran Pajak",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "O2",
        value: "Nominal Pajak",
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
      B: item.itemBelanjaRel?.dataBelanja?.kegiatan?.name || "-", // NIP
      C: item.asset?.namaBarang || item.itemBelanjaRel?.namaBarang || "-", // Nama
      D: item.assetHolder?.user?.name || "-", // Pangkat
      E: item.createdAt ? DMYIndoToFormat(item.createdAt) : "-", // Pangkat
      F: item.type || "-", // Golongan
      G: item.type === "SERVIS" ? DMYIndoToFormat(item.startServis) || "-" : "-",
      H: item.type === "SERVIS" ? DMYIndoToFormat(item.endServis) || "-" : "-",
      I: item.type === "SERVIS" ? item.nominalServis || "-" : "-",
      J: item.type === "SERVIS" ? item.servicesKe || "-" : "-",
      K: item.type === "SERVIS" ? item.nomorSurat || "-" : "-",
      L:
        item.type === "SERVIS"
          ? item.tanggalSurat
            ? DMYIndoToFormat(item.tanggalSurat)
            : "-"
          : "-",
      M:
        item.type === "PAJAK"
          ? item.pajak5Tahun
            ? DMYIndoToFormat(item.pajak5Tahun)
            : "-"
          : "-",
      N:
        item.type === "PAJAK"
          ? item.pembayaranPajak
            ? DMYIndoToFormat(item.pembayaranPajak)
            : "-"
          : "-",
      O: item.type === "PAJAK" ? item.nominalBayar || "-" : "-",
    }));

    dataPegawai.forEach((data, index) => {
      const row = sheet.getRow(index + 3); // Mulai dari baris 4
      row.getCell("A").value = data.A;
      row.getCell("B").value = data.B;
      row.getCell("C").value = data.C;
      row.getCell("D").value = data.D;
      row.getCell("E").value = data.E;
      row.getCell("F").value = data.F;
      row.getCell("G").value = data.G;
      row.getCell("H").value = data.H;
      row.getCell("I").value = data.I;
      row.getCell("J").value = data.J;
      row.getCell("K").value = data.K;
      row.getCell("L").value = data.L;
      row.getCell("M").value = data.M;
      row.getCell("N").value = data.N;
      row.getCell("O").value = data.O;

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
    sheet.getColumn(14).width = 20;
    sheet.getColumn(15).width = 20;

    // -------------------------------
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Data Servis dan Pajak.xlsx");
    setTimeout(() => window.close(), 500);
  };

  useEffect(() => {
    if (!isFetching && DATA_FETCHING) {
      handleExport();
    }
  }, [isFetching, DATA_FETCHING]);

  return <LoaderPage />;
};

export default ExportExcel;
