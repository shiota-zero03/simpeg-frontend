import React, { useEffect } from "react";
import { saveAs } from "file-saver";
import ExcelJS, { Alignment } from "exceljs";
import LoaderPage from "@/components/loader/LoaderPage";
import { YMToIndoFormat } from "@/utils/dateFormater";

const ExportExcel: React.FC = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const m = queryParams.get("m");

  let date = YMToIndoFormat(new Date().toISOString()).toUpperCase();
  if (m) {
    date = YMToIndoFormat(`${m}-01`).toUpperCase();
  }

  const UnitKerjaPegawai = [
    { nameUnit: "Dinas", ketersediaan: 20, terisi: 20 },
    { nameUnit: "UPTD I (Tambun)", ketersediaan: 20, terisi: 20 },
    { nameUnit: "UPTD II (Cibitung)", ketersediaan: 20, terisi: 20 },
    { nameUnit: "UPTD III (Setu)", ketersediaan: 20, terisi: 20 },
    { nameUnit: "UPTD IV (Cikarang)", ketersediaan: 20, terisi: 20 },
    { nameUnit: "UPTD V (Kedunggede)", ketersediaan: 20, terisi: 20 },
    { nameUnit: "UPTD VI (Babelan)", ketersediaan: 20, terisi: 20 },
    { nameUnit: "UPTD VII (Tarumajaya)", ketersediaan: 20, terisi: 20 },
    { nameUnit: "UPTD VIII (Serang)", ketersediaan: 20, terisi: 20 },
    { nameUnit: "UPTD IX (Cibarusah)", ketersediaan: 20, terisi: 20 },
    { nameUnit: "UPTD Metrologi Legal", ketersediaan: 20, terisi: 20 },
  ];

  const PNS = 21;
  const PPTK = 10;

  const UnitKerjaASN = [
    { nameUnit: "Dinas", terisi: 20 },
    { nameUnit: "UPTD I (Tambun)", terisi: 20 },
    { nameUnit: "UPTD II (Cibitung)", terisi: 20 },
    { nameUnit: "UPTD III (Setu)", terisi: 20 },
    { nameUnit: "UPTD IV (Cikarang)", terisi: 20 },
    { nameUnit: "UPTD V (Kedunggede)", terisi: 20 },
    { nameUnit: "UPTD VI (Babelan)", terisi: 20 },
    { nameUnit: "UPTD VII (Tarumajaya)", terisi: 20 },
    { nameUnit: "UPTD VIII (Serang)", terisi: 20 },
    { nameUnit: "UPTD IX (Cibarusah)", terisi: 20 },
    { nameUnit: "UPTD Metrologi Legal", terisi: 20 },
  ];

  const totalPegawai = UnitKerjaPegawai.reduce(
    (acc, curr) => {
      acc.ketersediaan += curr.ketersediaan;
      acc.terisi += curr.terisi;
      return acc;
    },
    { ketersediaan: 0, terisi: 0 },
  );

  const totalAsn = UnitKerjaASN.reduce(
    (acc, curr) => {
      acc.terisi += curr.terisi;
      return acc;
    },
    { terisi: 0 },
  );

  const AnalisPerdagangan = [
    {
      nameUnit: "Analis Perdagangan Ahli Madya",
      terisi: 1,
      name: ["Agus Burhan"],
    },
    {
      nameUnit: "Analis Perdagangan Ahli Muda",
      terisi: 4,
      name: ["Galuh", "Ratna", "Soleh", "Rudi"],
    },
    {
      nameUnit: "Analis Perdagangan Ahli Pertama",
      terisi: 1,
      name: ["Suhuri"],
    },
  ];
  const totalAnalisPerdagangan = AnalisPerdagangan.reduce(
    (acc, curr) => {
      acc.terisi += curr.terisi;
      return acc;
    },
    { terisi: 0 },
  );
  const PengawasPerdagangan = [
    { nameUnit: "Pengawas Perdagangan Ahli Madya", terisi: 0, name: [] },
    { nameUnit: "Pengawas Perdagangan Ahli Muda", terisi: 1, name: ["Iwan"] },
    {
      nameUnit: "Pengawas Perdagangan Ahli Pertama",
      terisi: 1,
      name: ["Arisma"],
    },
  ];
  const totalPengawasPerdagangan = PengawasPerdagangan.reduce(
    (acc, curr) => {
      acc.terisi += curr.terisi;
      return acc;
    },
    { terisi: 0 },
  );
  const Penera = [
    { nameUnit: "Penera Ahli Madya", terisi: 0, name: [] },
    {
      nameUnit: "Penera Ahli Muda",
      terisi: 3,
      name: ["Sunarto", "Agus Ruhyat", "Ahmad"],
    },
    {
      nameUnit: "Penera Ahli Pertama",
      terisi: 9,
      name: [
        "Teguh",
        "Atika",
        "Amaina",
        "Ilmi",
        "Yohanes",
        "Sinta",
        "Mardiyah",
        "Iqbal",
        "Chandra",
      ],
    },
  ];
  const totalPenera = Penera.reduce(
    (acc, curr) => {
      acc.terisi += curr.terisi;
      return acc;
    },
    { terisi: 0 },
  );

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Summary Report");

    const topHeaderCell = sheet.getCell(`A1`);
    topHeaderCell.alignment = { horizontal: "center", vertical: "middle" };
    topHeaderCell.font = { bold: true };
    topHeaderCell.value = "SUMMARY REPORT";
    topHeaderCell.border = {
      top: { style: "thin", color: { argb: "000000" } },
      left: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    };
    sheet.mergeCells("A1:I1");

    const topSecondHeaderCell = sheet.getCell(`A2`);
    topSecondHeaderCell.alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    topSecondHeaderCell.font = { bold: true };
    topSecondHeaderCell.value = "DATA SPPD DAN INFOGRAFIS DATA KEPEGAWAIAN";
    topSecondHeaderCell.border = {
      left: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    };
    sheet.mergeCells("A2:I2");

    const topThirdHeaderCell = sheet.getCell(`A3`);
    topThirdHeaderCell.alignment = { horizontal: "left", vertical: "middle" };
    topThirdHeaderCell.font = { bold: true };
    topThirdHeaderCell.value = `BULAN ${date}`;
    topThirdHeaderCell.border = {
      left: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
    };
    sheet.mergeCells("A3:I3");

    // Summary Report Pegawai
    const headers1: {
      cell: string;
      value: string;
      alignment?: Partial<Alignment>;
    }[] = [
      {
        cell: "A4",
        value: "Komposisi Pegawai",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "C4",
        value: "K",
        alignment: { horizontal: "center", vertical: "middle" },
      },
      {
        cell: "D4",
        value: "B",
        alignment: { horizontal: "center", vertical: "middle" },
      },
      {
        cell: "E4",
        value: "K = Ketersediaan, B = Terisi",
        alignment: { horizontal: "left", vertical: "middle" },
      },
    ];
    headers1.forEach(({ cell, value, alignment }) => {
      const c = sheet.getCell(cell);
      c.value = value;
      c.font = { bold: true };
      c.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "DBDBDB" },
      };
      c.border = {
        top: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
      if (cell === "E4") {
        c.font = { bold: false, size: 8 }; // Ukuran font di E1 lebih kecil
      }
      if (alignment) {
        c.alignment = alignment;
      }
    });
    sheet.mergeCells("A4:B4");
    sheet.mergeCells("E4:F4");

    const subHeaders1: {
      cell: string;
      value: string;
      alignment?: Partial<Alignment>;
    }[] = [
      {
        cell: "A5",
        value: "Jumlah Pegawai",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "C5",
        value: `${totalPegawai.ketersediaan}`,
        alignment: { horizontal: "center", vertical: "middle" },
      },
      {
        cell: "D5",
        value: `${totalPegawai.terisi}`,
        alignment: { horizontal: "center", vertical: "middle" },
      },
      {
        cell: "E5",
        value: ``,
        alignment: { horizontal: "center", vertical: "middle" },
      },
    ];
    subHeaders1.forEach(({ cell, value, alignment }) => {
      const c = sheet.getCell(cell);
      c.value = value;
      c.font = { bold: true };
      c.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFC000" },
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
    sheet.mergeCells("A5:B5");
    sheet.mergeCells("E5:F5");

    UnitKerjaPegawai.forEach((unit, index) => {
      const rowIndex = index + 6;

      sheet.mergeCells(`A${rowIndex}:B${rowIndex}`);

      const nameCell = sheet.getCell(`A${rowIndex}`);
      nameCell.value = unit.nameUnit;
      nameCell.alignment = { horizontal: "left", vertical: "middle" };
      nameCell.border = {
        top: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };

      const ketersediaanCell = sheet.getCell(`C${rowIndex}`);
      ketersediaanCell.value = unit.ketersediaan;
      ketersediaanCell.alignment = { horizontal: "center", vertical: "middle" };
      ketersediaanCell.border = {
        top: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };

      const terisiCell = sheet.getCell(`D${rowIndex}`);
      terisiCell.value = unit.terisi;
      terisiCell.alignment = { horizontal: "center", vertical: "middle" };
      terisiCell.border = {
        top: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
    });

    Array.from({ length: UnitKerjaPegawai.length }, (_, index) => {
      const rowIndex = index + 6;

      const pnsCell = sheet.getCell(`E${rowIndex}`);
      pnsCell.alignment = { horizontal: "center", vertical: "middle" };
      pnsCell.border = {
        top: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };

      const pptkCell = sheet.getCell(`F${rowIndex}`);
      pptkCell.alignment = { horizontal: "center", vertical: "middle" };
      pptkCell.border = {
        top: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };

      if (index === 0) {
        pnsCell.value = `${PNS} PNS`;
        pptkCell.value = `${PPTK} PPTK`;
      }
    });
    // end summary report pegawai

    // summary report asn
    const headers2: {
      cell: string;
      value: string;
      alignment?: Partial<Alignment>;
    }[] = [
      {
        cell: "H4",
        value: "",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "I4",
        value: "",
        alignment: { horizontal: "center", vertical: "middle" },
      },
    ];
    headers2.forEach(({ cell, value, alignment }) => {
      const c = sheet.getCell(cell);
      c.value = value;
      c.font = { bold: true };
      c.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "DBDBDB" },
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

    const subHeaders2: {
      cell: string;
      value: string;
      alignment?: Partial<Alignment>;
    }[] = [
      {
        cell: "H5",
        value: "Jumlah Pegawai",
        alignment: { horizontal: "left", vertical: "middle" },
      },
      {
        cell: "I5",
        value: `${totalAsn.terisi}`,
        alignment: { horizontal: "center", vertical: "middle" },
      },
    ];
    subHeaders2.forEach(({ cell, value, alignment }) => {
      const c = sheet.getCell(cell);
      c.value = value;
      c.font = { bold: true };
      c.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFC000" },
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

    UnitKerjaASN.forEach((unit, index) => {
      const rowIndex = index + 6;

      const nameCell = sheet.getCell(`H${rowIndex}`);
      nameCell.value = unit.nameUnit;
      nameCell.alignment = { horizontal: "left", vertical: "middle" };
      nameCell.border = {
        top: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };

      const terisiCell = sheet.getCell(`I${rowIndex}`);
      terisiCell.value = unit.terisi;
      terisiCell.alignment = { horizontal: "center", vertical: "middle" };
      terisiCell.border = {
        top: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
    });
    // end summary report asn

    // jabatan fungsional
    const lengthUnit = Math.max(UnitKerjaASN.length, UnitKerjaPegawai.length);

    const spaceCell = sheet.getCell(`A${lengthUnit + 6}`);
    spaceCell.alignment = { horizontal: "left", vertical: "middle" };
    spaceCell.font = { bold: true };
    spaceCell.value = ``;
    spaceCell.border = {
      left: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
      top: { style: "thin", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
    };
    sheet.mergeCells(`A${lengthUnit + 6}:I${lengthUnit + 7}`);

    let lengthFungsional = lengthUnit + 8;

    const JabatanFungsionalCell = sheet.getCell(`A${lengthFungsional}`);
    JabatanFungsionalCell.alignment = {
      horizontal: "left",
      vertical: "middle",
    };
    JabatanFungsionalCell.font = { bold: true };
    JabatanFungsionalCell.value = `Jabatan Fungsional ( ${totalAnalisPerdagangan.terisi + totalPengawasPerdagangan.terisi + totalPenera.terisi} Orang)`;
    JabatanFungsionalCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFC000" },
    };
    JabatanFungsionalCell.border = {
      bottom: { style: "thin", color: { argb: "000000" } },
      left: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    };
    sheet.mergeCells(`A${lengthFungsional}:I${lengthFungsional}`);

    lengthFungsional += 1;
    const NoAnalisPerdaganganCell = sheet.getCell(`A${lengthFungsional}`);
    NoAnalisPerdaganganCell.alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    NoAnalisPerdaganganCell.font = { bold: true };
    NoAnalisPerdaganganCell.value = `1`;
    NoAnalisPerdaganganCell.border = {
      bottom: { style: "thin", color: { argb: "000000" } },
      left: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    };
    const AnalisPerdaganganCell = sheet.getCell(`B${lengthFungsional}`);
    AnalisPerdaganganCell.alignment = {
      horizontal: "left",
      vertical: "middle",
    };
    AnalisPerdaganganCell.font = { bold: true };
    AnalisPerdaganganCell.value = `Analis Perdagangan ( ${totalAnalisPerdagangan.terisi} Orang )`;
    AnalisPerdaganganCell.border = {
      bottom: { style: "thin", color: { argb: "000000" } },
      left: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    };
    sheet.mergeCells(`B${lengthFungsional}:I${lengthFungsional}`);
    lengthFungsional += 1;
    AnalisPerdagangan.forEach((unit, index) => {
      const rowIndex = index + lengthFungsional;

      const emptyCell = sheet.getCell(`A${rowIndex}`);
      emptyCell.alignment = { horizontal: "left", vertical: "middle" };
      emptyCell.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };

      const nameCell = sheet.getCell(`B${rowIndex}`);
      nameCell.value = unit.nameUnit;
      nameCell.alignment = { horizontal: "left", vertical: "middle" };
      nameCell.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };

      sheet.mergeCells(`B${rowIndex}:C${rowIndex}`);

      const terisiCell = sheet.getCell(`D${rowIndex}`);
      terisiCell.value = unit.terisi;
      terisiCell.alignment = { horizontal: "center", vertical: "middle" };
      terisiCell.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };

      const anggotaCell = sheet.getCell(`E${rowIndex}`);
      anggotaCell.value = unit.name.join(", ");
      anggotaCell.alignment = {
        horizontal: "left",
        vertical: "middle",
        wrapText: true,
      };
      anggotaCell.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
      sheet.mergeCells(`E${rowIndex}:I${rowIndex}`);
    });

    lengthFungsional += AnalisPerdagangan.length;
    const NoPengawasPerdaganganCell = sheet.getCell(`A${lengthFungsional}`);
    NoPengawasPerdaganganCell.alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    NoPengawasPerdaganganCell.font = { bold: true };
    NoPengawasPerdaganganCell.value = `2`;
    NoPengawasPerdaganganCell.border = {
      bottom: { style: "thin", color: { argb: "000000" } },
      left: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    };
    const PengawasPerdaganganCell = sheet.getCell(`B${lengthFungsional}`);
    PengawasPerdaganganCell.alignment = {
      horizontal: "left",
      vertical: "middle",
    };
    PengawasPerdaganganCell.font = { bold: true };
    PengawasPerdaganganCell.value = `Pengawas Perdagangan ( ${totalPengawasPerdagangan.terisi} Orang )`;
    PengawasPerdaganganCell.border = {
      bottom: { style: "thin", color: { argb: "000000" } },
      left: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    };
    sheet.mergeCells(`B${lengthFungsional}:I${lengthFungsional}`);
    lengthFungsional += 1;
    PengawasPerdagangan.forEach((unit, index) => {
      const rowIndex = index + lengthFungsional;

      const emptyCell = sheet.getCell(`A${rowIndex}`);
      emptyCell.alignment = { horizontal: "left", vertical: "middle" };
      emptyCell.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };

      const nameCell = sheet.getCell(`B${rowIndex}`);
      nameCell.value = unit.nameUnit;
      nameCell.alignment = { horizontal: "left", vertical: "middle" };
      nameCell.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };

      sheet.mergeCells(`B${rowIndex}:C${rowIndex}`);

      const terisiCell = sheet.getCell(`D${rowIndex}`);
      terisiCell.value = unit.terisi;
      terisiCell.alignment = { horizontal: "center", vertical: "middle" };
      terisiCell.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };

      const anggotaCell = sheet.getCell(`E${rowIndex}`);
      anggotaCell.value = unit.name.join(", ");
      anggotaCell.alignment = {
        horizontal: "left",
        vertical: "middle",
        wrapText: true,
      };
      anggotaCell.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
      sheet.mergeCells(`E${rowIndex}:I${rowIndex}`);
    });

    lengthFungsional += PengawasPerdagangan.length;
    const NoPeneraCell = sheet.getCell(`A${lengthFungsional}`);
    NoPeneraCell.alignment = { horizontal: "center", vertical: "middle" };
    NoPeneraCell.font = { bold: true };
    NoPeneraCell.value = `3`;
    NoPeneraCell.border = {
      bottom: { style: "thin", color: { argb: "000000" } },
      left: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    };
    const PeneraCell = sheet.getCell(`B${lengthFungsional}`);
    PeneraCell.alignment = { horizontal: "left", vertical: "middle" };
    PeneraCell.font = { bold: true };
    PeneraCell.value = `Penera ${totalPenera.terisi} Orang )`;
    PeneraCell.border = {
      bottom: { style: "thin", color: { argb: "000000" } },
      left: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    };
    sheet.mergeCells(`B${lengthFungsional}:I${lengthFungsional}`);
    lengthFungsional += 1;
    Penera.forEach((unit, index) => {
      const rowIndex = index + lengthFungsional;

      const emptyCell = sheet.getCell(`A${rowIndex}`);
      emptyCell.alignment = { horizontal: "left", vertical: "middle" };
      emptyCell.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };

      const nameCell = sheet.getCell(`B${rowIndex}`);
      nameCell.value = unit.nameUnit;
      nameCell.alignment = { horizontal: "left", vertical: "middle" };
      nameCell.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };

      sheet.mergeCells(`B${rowIndex}:C${rowIndex}`);

      const terisiCell = sheet.getCell(`D${rowIndex}`);
      terisiCell.value = unit.terisi;
      terisiCell.alignment = { horizontal: "center", vertical: "middle" };
      terisiCell.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };

      const anggotaCell = sheet.getCell(`E${rowIndex}`);
      anggotaCell.value = unit.name.join(", ");
      anggotaCell.alignment = {
        horizontal: "left",
        vertical: "middle",
        wrapText: true,
      };
      anggotaCell.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
      sheet.mergeCells(`E${rowIndex}:I${rowIndex}`);
    });

    // end jabatan fungsional

    sheet.getColumn(1).width = 4;
    sheet.getColumn(2).width = 20;
    sheet.getColumn(5).width = 12;
    sheet.getColumn(6).width = 12;
    sheet.getColumn(8).width = 24;

    // -------------------------------
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Summary Report.xlsx");
    setTimeout(() => window.close(), 2000);
  };

  useEffect(() => {
    handleExport();
  }, []);

  return <LoaderPage />;
};

export default ExportExcel;
