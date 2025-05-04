import React, { useEffect, useMemo } from "react";
import { saveAs } from "file-saver";
import ExcelJS, { Alignment, Cell } from "exceljs";
import LoaderPage from "@/components/loader/LoaderPage";
import { DMYIndoToFormat } from "@/utils/dateFormater";
import { useGetAllSPPDUserAll } from "@/services/sppd";

const ExportExcel: React.FC = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const sdParam = queryParams.get("sd");
  const edParam = queryParams.get("ed");

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]; // ambil yyyy-mm-dd saja
  };

  let startDate: string;
  let endDate: string;

  if (sdParam && edParam) {
    startDate = sdParam;
    endDate = edParam;
  } else {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    startDate = formatDate(start);
    endDate = formatDate(end);
  }

  const { data, refetch, isFetching } = useGetAllSPPDUserAll(
    startDate,
    endDate,
  );
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const DATA_FETCHING = useMemo(() => {
    if (data) {
      const parsedData = data.data.response.map((item, index) => {
        const startDate = new Date(item.sppd.startDate);
        const endDate = new Date(item.sppd.endDate);

        return {
          no: index + 1,
          nama: item.user.name || "-",
          norek: item.sppd.kodeRekening || "-",
          nosp: item.sppd.nomorSurat || "-",
          tgl: `${item.sppd.startDate ? DMYIndoToFormat(item.sppd.startDate) : ""} - ${item.sppd.endDate ? DMYIndoToFormat(item.sppd.endDate) : ""}`,
          tujuan: item.sppd.location || "-",
          uraian: item.sppd.reasoning || "-",
          transport: item.budgets[0] ? item.budgets[0].transport || 0 : 0,
          xtransport: item.budgets[0] ? item.budgets[0].volTransport || 0 : 0,
          jumlahtransport: item.budgets[0]
            ? (item.budgets[0].transport || 0) *
              (item.budgets[0].volTransport || 0)
            : 0,
          representatif: item.budgets[0]
            ? item.budgets[0].representatif || 0
            : 0,
          xrepresentatif: item.budgets[0]
            ? item.budgets[0].volRepresentatif || 0
            : 0,
          jumlahrepresentatif: item.budgets[0]
            ? (item.budgets[0].representatif || 0) *
              (item.budgets[0].volRepresentatif || 0)
            : 0,
          daily: item.budgets[0] ? item.budgets[0].dailyAllowance || 0 : 0,
          xdaily: item.budgets[0] ? item.budgets[0].volDailyAllowance || 0 : 0,
          jumlahdaily: item.budgets[0]
            ? (item.budgets[0].dailyAllowance || 0) *
              (item.budgets[0].volDailyAllowance || 0)
            : 0,
          total: item.budgets[0]
            ? (item.budgets[0].transport || 0) *
                (item.budgets[0].volTransport || 0) +
              (item.budgets[0].representatif || 0) *
                (item.budgets[0].volRepresentatif || 0) +
              (item.budgets[0].dailyAllowance || 0) *
                (item.budgets[0].volDailyAllowance || 0)
            : 0,
          type: item.sppd.type,
          startDate,
          endDate,
          issame: false,
        };
      });

      for (let i = 0; i < parsedData.length; i++) {
        for (let j = 0; j < parsedData.length; j++) {
          if (
            i !== j &&
            parsedData[i].nama === parsedData[j].nama &&
            parsedData[i].startDate <= parsedData[j].endDate &&
            parsedData[i].endDate >= parsedData[j].startDate
          ) {
            parsedData[i].issame = true;
            break;
          }
        }
      }

      return parsedData.map(({ startDate, endDate, ...rest }) => rest);
    } else return [];
  }, [data]);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  useEffect(() => {
    refetch();
  }, []);

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
      value: "Nama",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "C3",
      value: "Norek",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "D3",
      value: "No. SP",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "E3",
      value: "Tgl. Perjalanan",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "F3",
      value: "Tujuan",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "G3",
      value: "Uraian",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "H3",
      value: "Transport",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "I3",
      value: "Vol Transport",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "J3",
      value: "Total Transport",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "K3",
      value: "Uang Harian",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "L3",
      value: "Vol Uang Harian",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "M3",
      value: "Total Uang Harian",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "N3",
      value: "Representatif",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "O3",
      value: "Vol Representatif",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "P3",
      value: "Total Representatif",
      alignment: { horizontal: "center", vertical: "middle" },
    },
    {
      cell: "Q3",
      value: "Jumalah Diterima",
      alignment: { horizontal: "center", vertical: "middle" },
    },
  ];

  const populateSheet = (
    sheet: ExcelJS.Worksheet,
    title: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[],
  ) => {
    sheet.getCell(`A1`).value = title;
    sheet.getCell(`A1`).font = { bold: true };
    sheet.getCell(`A1`).alignment = { horizontal: "left", vertical: "middle" };
    sheet.mergeCells("A1:Q1");

    sheet.getCell(`A2`).value =
      `Periode ${DMYIndoToFormat(startDate)} - ${DMYIndoToFormat(endDate)}`;
    sheet.getCell(`A2`).font = { bold: true };
    sheet.getCell(`A2`).alignment = { horizontal: "left", vertical: "middle" };
    sheet.mergeCells("A2:Q2");

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

    data.forEach(
      (
        item: {
          nama: string;
          norek: string;
          nosp: string;
          tgl: string;
          tujuan: string;
          uraian: string;
          transport: number;
          xtransport: number;
          jumlahtransport: number;
          daily: number;
          xdaily: number;
          jumlahdaily: number;
          representatif: number;
          xrepresentatif: number;
          jumlahrepresentatif: number;
          total: number;
          issame: boolean;
        },
        index: number,
      ) => {
        const row = sheet.addRow([
          index + 1,
          item.nama,
          item.norek,
          item.nosp,
          item.tgl,
          item.tujuan,
          item.uraian,
          `Rp ${item.transport.toLocaleString("id-ID")}`,
          `Rp ${item.xtransport.toLocaleString("id-ID")}`,
          `Rp ${item.jumlahtransport.toLocaleString("id-ID")}`,
          `Rp ${item.daily.toLocaleString("id-ID")}`,
          `Rp ${item.xdaily.toLocaleString("id-ID")}`,
          `Rp ${item.jumlahdaily.toLocaleString("id-ID")}`,
          `Rp ${item.representatif.toLocaleString("id-ID")}`,
          `Rp ${item.xrepresentatif.toLocaleString("id-ID")}`,
          `Rp ${item.jumlahrepresentatif.toLocaleString("id-ID")}`,
          `Rp ${item.total.toLocaleString("id-ID")}`,
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

        const namaCell = row.getCell(2); // kolom B = kolom ke-2
        namaCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: "90EE90", // merah atau hijau
          },
        };
        namaCell.font = { color: { argb: item.issame ? "BF1E43" : "000000" } };
        namaCell.alignment = {
          wrapText: true,
          vertical: "top",
          horizontal: "left",
        };

        const tglCell = row.getCell(5);
        tglCell.font = { color: { argb: item.issame ? "BF1E43" : "000000" } };
      },
    );

    sheet.getColumn(1).width = 4;
    sheet.getColumn(2).width = 32;
    sheet.getColumn(3).width = 20;
    sheet.getColumn(4).width = 20;
    sheet.getColumn(5).width = 20;
    sheet.getColumn(6).width = 20;
    sheet.getColumn(7).width = 60;
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
  };

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();

    const dataDalam = DATA_FETCHING.filter(
      (item) => item.type === "PERJALANAN_BIASA",
    );
    const dataLuar = DATA_FETCHING.filter(
      (item) => item.type === "PERJALANAN_DALAM_KOTA",
    );

    const sheetDalam = workbook.addWorksheet("Perjalanan Dinas Biasa");
    const sheetLuar = workbook.addWorksheet("Perjalanan Dinas Dalam Kota");

    populateSheet(sheetDalam, "Rekap Perjalanan Dinas Biasa", dataDalam);
    populateSheet(sheetLuar, "Rekap Perjalanan Dinas Dalam Kota", dataLuar);

    // -------------------------------
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(
      new Blob([buffer]),
      `rekap_perjalanan_dinas_${startDate}_${endDate}.xlsx`,
    );
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
