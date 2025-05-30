import React, { useEffect, useMemo } from "react";
import { saveAs } from "file-saver";
import ExcelJS, { Alignment } from "exceljs";
import LoaderPage from "@/components/loader/LoaderPage";
import { useGetAllAssetOption, useGetAllAssetOptionWithHolder } from "@/services/asset/asset";

const ExportExcel: React.FC = () => {
  const { data, refetch, isFetching } = useGetAllAssetOption();
  const { data: dataHolder, refetch: refetchHolder, isFetching: isFetchingHolder } = useGetAllAssetOptionWithHolder();

  const DATA_FETCHING = useMemo(() => {
    if (data && dataHolder) {
        let holder = dataHolder.data;
        return data.data.map(item => {
            let pemegangAsset = holder.find(it =>  it.id === item.id);
            return  {
                kodeBarang: item.kodeBarang,
                idBarang: item.idBarang,
                nomorRegistrasi: item.nomorRegistrasi,
                kategori: item.kategori,
                namaBarang: item.namaBarang,
                merkTipe: item.merkTipe,
                harga: item.harga ? item.harga.toLocaleString('id-ID') : "",
                tahunPerolehan: item.tahunPerolehan,
                jenisBahan: item.jenisBahan,
                nomorPabrik: item.nomorPabrik,
                nomorMesin: item.nomorMesin,
                ukuranCC: item.ukuranCC,
                nomorRangka: item.nomorRangka,
                nomorPolisi: item.nomorPolisi,
                dokumenNomor: item.dokumenNomor,
                pemegang: pemegangAsset?.holders?.[0]?.user?.name || ""
            }
        });
    }
    else return [];
  }, [data, dataHolder]);

  useEffect(() => {
    refetch();
    refetchHolder();
  }, []);

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Data Aset");

    const topHeaderCell = sheet.getCell(`A1`);
    topHeaderCell.alignment = { horizontal: "left", vertical: "middle" };
    topHeaderCell.font = { bold: true };
    topHeaderCell.value = "HASIL EXPORT LIST DATA ASET";
    topHeaderCell.border = {
      top: { style: "thin", color: { argb: "000000" } },
      left: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    };
    sheet.mergeCells("A1:Q1");

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
        value: "Kode Barang",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "C2",
        value: "ID Barang",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "D2",
        value: "No. Registrasi",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "E2",
        value: "Kategori",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "F2",
        value: "Nama Barang",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "G2",
        value: "Merk/Tipe",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "H2",
        value: "Harga",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "I2",
        value: "Tahun Perolehan",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "J2",
        value: "Jenis Bahan",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "K2",
        value: "Nomor Pabrik",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "L2",
        value: "Nomor Mesin",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "M2",
        value: "Ukuran/CC",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "N2",
        value: "Nomor Rangka",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "O2",
        value: "Nomor Polisi",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "P2",
        value: "Nomor BPKB/STNK",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "Q2",
        value: "Nama Pemegang",
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
      B: item.kodeBarang || "-", // NIP
      C: item.idBarang || "-", // Nama
      D: item.nomorRegistrasi || "-", // Pangkat
      E: item.kategori === "PERALATAN" ? "Peralatan Kantor / Mesin" : "Kendaraan", // Pangkat
      F: item.namaBarang || "-", // Golongan
      G: item.merkTipe || "-", // Golongan
      H: item.harga || "-", // Golongan
      I: item.tahunPerolehan ? item.tahunPerolehan.split('-')[0] : "-", // Golongan
      J: item.jenisBahan || "-", // Golongan
      K: item.nomorPabrik || "-", // Golongan
      L: item.nomorMesin || "-", // Golongan
      M: item.ukuranCC || "-", // Golongan
      N: item.nomorRangka || "-", // Golongan
      O: item.nomorPolisi || "-", // Golongan
      P: item.dokumenNomor || "-", // Golongan
      Q: item.pemegang || "-", // Golongan
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
      row.getCell("P").value = data.P;
      row.getCell("Q").value = data.Q;

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
    sheet.getColumn(16).width = 20;
    sheet.getColumn(17).width = 20;

    // -------------------------------
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Data Aset.xlsx");
    setTimeout(() => window.close(), 500);
  };

  useEffect(() => {
    if (!isFetching && !isFetchingHolder && DATA_FETCHING) {
      handleExport();
    }
  }, [isFetching, isFetchingHolder, DATA_FETCHING]);

  return <LoaderPage />;
};

export default ExportExcel;
