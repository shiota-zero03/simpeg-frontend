import React, { useEffect, useMemo, useState } from "react";
import { saveAs } from "file-saver";
import ExcelJS, { Alignment } from "exceljs";
import LoaderPage from "@/components/loader/LoaderPage";
import { YMToIndoFormat } from "@/utils/dateFormater";
import { useGetAllUnitOption } from "@/services/unit";
import {
  useGetAllPegawaiAdmin,
  useGetAllPegawaiOption,
} from "@/services/pegawai";
import {
  EselonData,
  GolonganData,
  pendidikanTerakhir,
} from "@/constants/DummyData";
import dayjs from "dayjs";

const ExportExcel: React.FC = () => {
  const dateDefault = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
  const queryParams = new URLSearchParams(window.location.search);
  const m = queryParams.get("m");

  const searchMonth = m as string;

  const search = searchMonth || dateDefault;

  let date = YMToIndoFormat(new Date().toISOString()).toUpperCase();
  if (m) {
    date = YMToIndoFormat(`${m}-01`).toUpperCase();
  }

  const getStartAndEndDate = (month: string) => {
    const [year, mon] = month.split("-").map(Number);
    const startDate = `${year}-${String(mon).padStart(2, "0")}-01`;
    const endDate = new Date(year, mon, 0); // tanggal terakhir bulan tsb
    const formattedEndDate = `${year}-${String(mon).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;

    return { startDate, endDate: formattedEndDate };
  };

  const {
    data: allDataSurat,
    isFetching: isFetchingDataSurat,
    refetch: refetchDataSurat,
  } = useGetAllPegawaiAdmin(
    1,
    500,
    "",
    getStartAndEndDate(search || dateDefault).startDate,
    getStartAndEndDate(search || dateDefault).endDate,
  );

  const dataSurat = useMemo(() => {
    if (allDataSurat) {
      const dataForSurat = allDataSurat.data.response;
      return {
        cuti: dataForSurat.filter((it) => it.typeForm === "CUTI"),
        pangkat: dataForSurat.filter(
          (it) => it.typeForm === "KENAIKAN_PANGKAT",
        ),
        gaji: dataForSurat.filter((it) => it.typeForm === "KENAIKAN_GAJI"),
      };
    } else {
      return {
        cuti: [],
        pangkat: [],
        gaji: [],
      };
    }
  }, [date, allDataSurat, dateDefault]);

  const [readyToExport, setReadyToExport] = useState(false);

  const [UnitKerjaPegawai, setUnitKerjaPegawai] = useState<
    { nameUnit: string; ketersediaan: number; terisi: number }[]
  >([]);
  const [UnitKerjaASN, setUnitKerjaASN] = useState<
    { nameUnit: string; terisi: number }[]
  >([]);
  const [AnalisPerdagangan, setAnalisPerdagangan] = useState<
    { nameUnit: string; terisi: number; name: string[] }[]
  >([]);
  const [PengawasPerdagangan, setPengawasPerdagangan] = useState<
    { nameUnit: string; terisi: number; name: string[] }[]
  >([]);
  const [Penera, setPenera] = useState<
    { nameUnit: string; terisi: number; name: string[] }[]
  >([]);
  const [PNS, setPNS] = useState<number>(0);
  const [PPPK, setPPPK] = useState<number>(0);
  const [Eselon, setEselon] = useState<{ name: string; terisi: number }[]>([]);
  const [Golongan, setGolongan] = useState<{ name: string; terisi: number }[]>(
    [],
  );
  const [Pendidikan, setPendidikan] = useState<
    { name: string; terisi: number }[]
  >([]);
  const [JenisKelamin, setJenisKelamin] = useState<
    { name: string; terisi: number }[]
  >([]);
  const [Pensiun, setPensiun] = useState<string[]>([]);

  const { data, refetch, isFetching } = useGetAllPegawaiOption();

  const {
    data: dataUnit,
    refetch: refetchUnit,
    isFetching: isFetchingUnit,
  } = useGetAllUnitOption();

  const DATA_FETCHING = useMemo(() => {
    if (data) return data.data;
    else return [];
  }, [data]);

  const DATA_FETCHING_UNIT = useMemo(() => {
    if (dataUnit && dataUnit.data) {
      const filteredUnits = dataUnit.data?.filter(
        (item) =>
          item.nameUnit.toLowerCase().includes("dinas") ||
          item.nameUnit.toLowerCase().includes("uptd"),
      );

      return [...filteredUnits].sort((a, b) => a.id - b.id); // ascending berdasarkan id
    } else {
      return null;
    }
  }, [dataUnit]);

  const { totalKetersediaan, totalASN, totalNonASN } = useMemo(() => {
    let totalKetersediaan = 0;
    let totalASN = 0;
    let totalNonASN = 0;

    DATA_FETCHING_UNIT?.forEach((item) => {
      totalKetersediaan += item.jabatan.reduce(
        (total, current) => total + (current.ketersediaan || 0),
        0,
      );

      totalASN =
        DATA_FETCHING?.filter(
          (it) => it.statusAsn === true,
        ).length || 0;

      totalNonASN =
        DATA_FETCHING?.filter(
          (it) => it.statusAsn === false,
        ).length || 0;
    });

    return { totalKetersediaan, totalASN, totalNonASN };
  }, [DATA_FETCHING_UNIT, DATA_FETCHING]);

  useEffect(() => {
    if (!isFetching && data && !isFetchingUnit && dataUnit) {
      if (DATA_FETCHING_UNIT && DATA_FETCHING) {
        // pensiun
        const filteredNames = DATA_FETCHING.filter(
          (it) =>
            dayjs(it.pensionDate).format("YYYY-MM") === (search || dateDefault),
        ).map((it) => it.name);

        setPensiun(filteredNames);
        // end pensiun
        // unit
        const newData = DATA_FETCHING_UNIT.map((unit) => {
          const ketersediaan = unit.jabatan.reduce(
            (total: number, jabatan: { ketersediaan: number }) =>
              total + (jabatan.ketersediaan || 0),
            0,
          );

          const terisi = DATA_FETCHING.filter(
            (pegawai) =>
              pegawai.jabatan?.unit?.id === unit.id &&
              pegawai.statusAsn === true,
          ).length;

          return {
            nameUnit: unit.nameUnit,
            ketersediaan,
            terisi,
          };
        });
        setUnitKerjaPegawai(newData);
        const newData2 = DATA_FETCHING_UNIT.map((unit) => {
          const terisi = DATA_FETCHING.filter(
            (pegawai) =>
              pegawai.jabatan?.unit?.id === unit.id &&
              pegawai.statusAsn === false,
          ).length;

          return {
            nameUnit: unit.nameUnit,
            terisi,
          };
        });
        setUnitKerjaASN(newData2);

        const pppkCount = DATA_FETCHING.filter(
          (pegawai) => pegawai.rank.toLowerCase() === "pppk",
        ).length;
        setPPPK(pppkCount);
        const pnsCount = DATA_FETCHING.filter(
          (pegawai) =>
            pegawai.rank.toLowerCase().includes("juru") ||
            pegawai.rank.toLowerCase().includes("pengatur") ||
            pegawai.rank.toLowerCase().includes("penata") ||
            pegawai.rank.toLowerCase().includes("pembina"),
        ).length;
        setPNS(pnsCount);
        // end unit

        // eselon
        const eselonsData = EselonData.map((dt) => {
          const terisi = DATA_FETCHING.filter(
            (pegawai) => pegawai.jabatan?.eselon === dt.nama,
          ).length;

          return {
            name: dt.nama,
            terisi,
          };
        });
        setEselon(eselonsData);
        // end eselon

        // golongan
        const golongansData = GolonganData.map((dt) => {
          const terisi = DATA_FETCHING.filter(
            (pegawai) => pegawai.group === dt.key,
          ).length;

          return {
            name: dt.nama,
            terisi,
          };
        });
        setGolongan(golongansData);
        // end golongan

        // pendidikan
        const pendidikansData = pendidikanTerakhir.map((dt) => {
          const terisi = DATA_FETCHING.filter(
            (pegawai) => pegawai.education === dt.key,
          ).length;

          return {
            name: dt.name,
            terisi,
          };
        });
        setPendidikan(pendidikansData);
        // end pendidikan

        // jeniskelamin
        const jklk = DATA_FETCHING.filter(
          (pegawai) => pegawai.gender === "LAKI_LAKI",
        ).length;
        const jkpr = DATA_FETCHING.filter(
          (pegawai) => pegawai.gender === "PEREMPUAN",
        ).length;
        setJenisKelamin([
          { name: "Laki - Laki", terisi: jklk },
          { name: "Perempuan", terisi: jkpr },
        ]);
        // end jenis kelamin

        // jabatan fungsional
        const nameAnalisMadya =
          DATA_FETCHING.filter(
            (it) =>
              it.jabatan?.nameJob.toLowerCase() ===
              "analis perdagangan ahli madya",
          ).length > 0
            ? DATA_FETCHING.filter(
                (it) =>
                  it.jabatan?.nameJob.toLowerCase() ===
                  "analis perdagangan ahli madya",
              ).map((item) => {
                return item.name;
              })
            : [];
        const nameAnalisMuda =
          DATA_FETCHING.filter(
            (it) =>
              it.jabatan?.nameJob.toLowerCase() ===
              "analis perdagangan ahli muda",
          ).length > 0
            ? DATA_FETCHING.filter(
                (it) =>
                  it.jabatan?.nameJob.toLowerCase() ===
                  "analis perdagangan ahli muda",
              ).map((item) => {
                return item.name;
              })
            : [];
        const nameAnalisPertama =
          DATA_FETCHING.filter(
            (it) =>
              it.jabatan?.nameJob.toLowerCase() ===
              "analis perdagangan ahli pertama",
          ).length > 0
            ? DATA_FETCHING.filter(
                (it) =>
                  it.jabatan?.nameJob.toLowerCase() ===
                  "analis perdagangan ahli pertama",
              ).map((item) => {
                return item.name;
              })
            : [];
        setAnalisPerdagangan([
          {
            nameUnit: "Analis Perdagangan Ahli Madya",
            terisi: nameAnalisMadya.length,
            name: nameAnalisMadya,
          },
          {
            nameUnit: "Analis Perdagangan Ahli Muda",
            terisi: nameAnalisMuda.length,
            name: nameAnalisMuda,
          },
          {
            nameUnit: "Analis Perdagangan Ahli Pertama",
            terisi: nameAnalisPertama.length,
            name: nameAnalisPertama,
          },
        ]);

        const namePengawasMadya =
          DATA_FETCHING.filter(
            (it) =>
              it.jabatan?.nameJob.toLowerCase() ===
              "pengawas perdagangan ahli madya" ||
              it.jabatan?.nameJob.toLowerCase() ===
              "pengawas kemetrologian ahli madya",
          ).length > 0
            ? DATA_FETCHING.filter(
                (it) =>
                  it.jabatan?.nameJob.toLowerCase() ===
                  "pengawas perdagangan ahli madya" ||
                  it.jabatan?.nameJob.toLowerCase() ===
                  "pengawas kemetrologian ahli madya",
              ).map((item) => {
                return item.name;
              })
            : [];
        const namePengawasMuda =
          DATA_FETCHING.filter(
            (it) =>
              it.jabatan?.nameJob.toLowerCase() ===
              "pengawas perdagangan ahli muda" ||
              it.jabatan?.nameJob.toLowerCase() ===
              "pengawas kemetrologian ahli muda",
          ).length > 0
            ? DATA_FETCHING.filter(
                (it) =>
                  it.jabatan?.nameJob.toLowerCase() ===
                  "pengawas perdagangan ahli muda" ||
                  it.jabatan?.nameJob.toLowerCase() ===
                  "pengawas kemetrologian ahli muda",
              ).map((item) => {
                return item.name;
              })
            : [];
        const namePengawasPertama =
          DATA_FETCHING.filter(
            (it) =>
              it.jabatan?.nameJob.toLowerCase() ===
              "pengawas perdagangan ahli pertama" ||
              it.jabatan?.nameJob.toLowerCase() ===
              "pengawas kemetrologian ahli pertama",
          ).length > 0
            ? DATA_FETCHING.filter(
                (it) =>
                  it.jabatan?.nameJob.toLowerCase() ===
                  "pengawas perdagangan ahli pertama" ||
                  it.jabatan?.nameJob.toLowerCase() ===
                  "pengawas kemetrologian ahli pertama",
              ).map((item) => {
                return item.name;
              })
            : [];
        setPengawasPerdagangan([
          {
            nameUnit: "Pengawas Perdagangan Ahli Madya",
            terisi: namePengawasMadya.length,
            name: namePengawasMadya,
          },
          {
            nameUnit: "Pengawas Perdagangan Ahli Muda",
            terisi: namePengawasMuda.length,
            name: namePengawasMuda,
          },
          {
            nameUnit: "Pengawas Perdagangan Ahli Pertama",
            terisi: namePengawasPertama.length,
            name: namePengawasPertama,
          },
        ]);

        const namePeneraMadya =
          DATA_FETCHING.filter(
            (it) => it.jabatan?.nameJob.toLowerCase() === "penera ahli madya",
          ).length > 0
            ? DATA_FETCHING.filter(
                (it) =>
                  it.jabatan?.nameJob.toLowerCase() === "penera ahli madya",
              ).map((item) => {
                return item.name;
              })
            : [];
        const namePeneraMuda =
          DATA_FETCHING.filter(
            (it) => it.jabatan?.nameJob.toLowerCase() === "penera ahli muda",
          ).length > 0
            ? DATA_FETCHING.filter(
                (it) =>
                  it.jabatan?.nameJob.toLowerCase() === "penera ahli muda",
              ).map((item) => {
                return item.name;
              })
            : [];
        const namePeneraPertama =
          DATA_FETCHING.filter(
            (it) => it.jabatan?.nameJob.toLowerCase() === "penera ahli pertama",
          ).length > 0
            ? DATA_FETCHING.filter(
                (it) =>
                  it.jabatan?.nameJob.toLowerCase() === "penera ahli pertama",
              ).map((item) => {
                return item.name;
              })
            : [];
        setPenera([
          {
            nameUnit: "Penera Ahli Madya",
            terisi: namePeneraMadya.length,
            name: namePeneraMadya,
          },
          {
            nameUnit: "Penera Ahli Muda",
            terisi: namePeneraMuda.length,
            name: namePeneraMuda,
          },
          {
            nameUnit: "Penera Ahli Pertama",
            terisi: namePeneraPertama.length,
            name: namePeneraPertama,
          },
        ]);
        // end jabatan fungsional
      }
    }
  }, [
    DATA_FETCHING_UNIT,
    DATA_FETCHING,
    isFetching,
    data,
    isFetchingUnit,
    dataUnit,
  ]);

  useEffect(() => {
    refetchUnit();
    refetch();
    refetchDataSurat();
  }, []);

  const totalAnalisPerdagangan = AnalisPerdagangan.reduce(
    (acc, curr) => {
      acc.terisi += curr.terisi;
      return acc;
    },
    { terisi: 0 },
  );
  const totalPengawasPerdagangan = PengawasPerdagangan.reduce(
    (acc, curr) => {
      acc.terisi += curr.terisi;
      return acc;
    },
    { terisi: 0 },
  );

  const totalPenera = Penera.reduce(
    (acc, curr) => {
      acc.terisi += curr.terisi;
      return acc;
    },
    { terisi: 0 },
  );

  const handleExport = async () => {
    if (readyToExport) {
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
      topSecondHeaderCell.value = "DATA KEPEGAWAIAN";
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
          value: `${totalKetersediaan}`,
          alignment: { horizontal: "center", vertical: "middle" },
        },
        {
          cell: "D5",
          value: `${totalASN}`,
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
        c.font = { bold: true, color: { argb: "FFFFFF" } };
        c.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "137269" },
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
        nameCell.alignment = {
          horizontal: "left",
          vertical: "top",
          wrapText: true,
        };
        nameCell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        const ketersediaanCell = sheet.getCell(`C${rowIndex}`);
        ketersediaanCell.value = unit.ketersediaan;
        ketersediaanCell.alignment = {
          horizontal: "center",
          vertical: "top",
          wrapText: true,
        };
        ketersediaanCell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        const terisiCell = sheet.getCell(`D${rowIndex}`);
        terisiCell.value = unit.terisi;
        terisiCell.alignment = {
          horizontal: "center",
          vertical: "top",
          wrapText: true,
        };
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
        pnsCell.alignment = {
          horizontal: "center",
          vertical: "top",
          wrapText: true,
        };
        pnsCell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        const pptkCell = sheet.getCell(`F${rowIndex}`);
        pptkCell.alignment = {
          horizontal: "center",
          vertical: "top",
          wrapText: true,
        };
        pptkCell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        if (index === 0) {
          pnsCell.value = `${PNS} PNS`;
          pptkCell.value = `${PPPK} PPPK`;
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
          value: `${totalNonASN}`,
          alignment: { horizontal: "center", vertical: "middle" },
        },
      ];
      subHeaders2.forEach(({ cell, value, alignment }) => {
        const c = sheet.getCell(cell);
        c.value = value;
        c.font = { bold: true, color: { argb: "FFFFFF" } };
        c.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "137269" },
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
        nameCell.alignment = {
          horizontal: "left",
          vertical: "top",
          wrapText: true,
        };
        nameCell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        const terisiCell = sheet.getCell(`I${rowIndex}`);
        terisiCell.value = unit.terisi;
        terisiCell.alignment = {
          horizontal: "center",
          vertical: "top",
          wrapText: true,
        };
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
      spaceCell.alignment = {
        horizontal: "left",
        vertical: "top",
        wrapText: true,
      };
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
        vertical: "top",
        wrapText: true,
      };
      JabatanFungsionalCell.font = { bold: true, color: { argb: "FFFFFF" } };
      JabatanFungsionalCell.value = `Jabatan Fungsional ( ${totalAnalisPerdagangan.terisi + totalPengawasPerdagangan.terisi + totalPenera.terisi} Orang)`;
      JabatanFungsionalCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "137269" },
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
        vertical: "top",
        wrapText: true,
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
        vertical: "top",
        wrapText: true,
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
        emptyCell.alignment = {
          horizontal: "left",
          vertical: "top",
          wrapText: true,
        };
        emptyCell.border = {
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        const nameCell = sheet.getCell(`B${rowIndex}`);
        nameCell.value = unit.nameUnit;
        nameCell.alignment = {
          horizontal: "left",
          vertical: "top",
          wrapText: true,
        };
        nameCell.border = {
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        sheet.mergeCells(`B${rowIndex}:C${rowIndex}`);

        const terisiCell = sheet.getCell(`D${rowIndex}`);
        terisiCell.value = unit.terisi;
        terisiCell.alignment = {
          horizontal: "center",
          vertical: "top",
          wrapText: true,
        };
        terisiCell.border = {
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        const anggotaCell = sheet.getCell(`E${rowIndex}`);
        anggotaCell.value = unit.name.join(", ");
        anggotaCell.alignment = {
          horizontal: "left",
          vertical: "top",
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
        vertical: "top",
        wrapText: true,
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
        vertical: "top",
        wrapText: true,
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
        emptyCell.alignment = {
          horizontal: "left",
          vertical: "top",
          wrapText: true,
        };
        emptyCell.border = {
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        const nameCell = sheet.getCell(`B${rowIndex}`);
        nameCell.value = unit.nameUnit;
        nameCell.alignment = {
          horizontal: "left",
          vertical: "top",
          wrapText: true,
        };
        nameCell.border = {
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        sheet.mergeCells(`B${rowIndex}:C${rowIndex}`);

        const terisiCell = sheet.getCell(`D${rowIndex}`);
        terisiCell.value = unit.terisi;
        terisiCell.alignment = {
          horizontal: "center",
          vertical: "top",
          wrapText: true,
        };
        terisiCell.border = {
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        const anggotaCell = sheet.getCell(`E${rowIndex}`);
        anggotaCell.value = unit.name.join(", ");
        anggotaCell.alignment = {
          horizontal: "left",
          vertical: "top",
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
      NoPeneraCell.alignment = {
        horizontal: "center",
        vertical: "top",
        wrapText: true,
      };
      NoPeneraCell.font = { bold: true };
      NoPeneraCell.value = `3`;
      NoPeneraCell.border = {
        bottom: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
      const PeneraCell = sheet.getCell(`B${lengthFungsional}`);
      PeneraCell.alignment = {
        horizontal: "left",
        vertical: "top",
        wrapText: true,
      };
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
        emptyCell.alignment = {
          horizontal: "left",
          vertical: "top",
          wrapText: true,
        };
        emptyCell.border = {
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        const nameCell = sheet.getCell(`B${rowIndex}`);
        nameCell.value = unit.nameUnit;
        nameCell.alignment = {
          horizontal: "left",
          vertical: "top",
          wrapText: true,
        };
        nameCell.border = {
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        sheet.mergeCells(`B${rowIndex}:C${rowIndex}`);

        const terisiCell = sheet.getCell(`D${rowIndex}`);
        terisiCell.value = unit.terisi;
        terisiCell.alignment = {
          horizontal: "center",
          vertical: "top",
          wrapText: true,
        };
        terisiCell.border = {
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        const anggotaCell = sheet.getCell(`E${rowIndex}`);
        anggotaCell.value = unit.name.join(", ");
        anggotaCell.alignment = {
          horizontal: "left",
          vertical: "top",
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

      // eselon
      let nextFromJaFung = lengthFungsional + 5;
      const headersEselon: {
        cell: string;
        value: string;
        alignment?: Partial<Alignment>;
      }[] = [
        {
          cell: `A${nextFromJaFung}`,
          value: "Jumlah Pegawai Berdasarkan Eselon",
          alignment: { horizontal: "center", vertical: "middle" },
        },
      ];
      sheet.mergeCells(`A${nextFromJaFung}:E${nextFromJaFung}`);
      headersEselon.forEach(({ cell, value, alignment }) => {
        const c = sheet.getCell(cell);
        c.value = value;
        c.font = { bold: true, color: { argb: "000000" } };
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
      nextFromJaFung += 1;
      const subHeadersEselon: {
        cell: string;
        value: string;
        alignment?: Partial<Alignment>;
      }[] = [
        {
          cell: `A${nextFromJaFung}`,
          value: "No",
          alignment: { horizontal: "left", vertical: "middle" },
        },
        {
          cell: `B${nextFromJaFung}`,
          value: "Nama Eselon",
          alignment: { horizontal: "left", vertical: "middle" },
        },
        {
          cell: `C${nextFromJaFung}`,
          value: `Jumlah Pegawai`,
          alignment: { horizontal: "center", vertical: "middle" },
        },
      ];
      sheet.mergeCells(`C${nextFromJaFung}:E${nextFromJaFung}`);
      subHeadersEselon.forEach(({ cell, value, alignment }) => {
        const c = sheet.getCell(cell);
        c.value = value;
        c.font = { bold: true, color: { argb: "FFFFFF" } };
        c.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "137269" },
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
      Eselon.forEach((dt, index) => {
        nextFromJaFung = nextFromJaFung += 1;

        const noCell = sheet.getCell(`A${nextFromJaFung}`);
        noCell.value = index + 1;
        noCell.alignment = {
          horizontal: "left",
          vertical: "top",
          wrapText: true,
        };
        noCell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
        const nameCell = sheet.getCell(`B${nextFromJaFung}`);
        nameCell.value = dt.name;
        nameCell.alignment = {
          horizontal: "left",
          vertical: "top",
          wrapText: true,
        };
        nameCell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        const terisiCell = sheet.getCell(`C${nextFromJaFung}`);
        terisiCell.value = dt.terisi;
        terisiCell.alignment = {
          horizontal: "center",
          vertical: "top",
          wrapText: true,
        };
        terisiCell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
        sheet.mergeCells(`C${nextFromJaFung}:E${nextFromJaFung}`);
      });
      // end eselon

      // golongan
      nextFromJaFung += 3;
      const headersGolongan: {
        cell: string;
        value: string;
        alignment?: Partial<Alignment>;
      }[] = [
        {
          cell: `A${nextFromJaFung}`,
          value: "Jumlah Pegawai Berdasarkan Golongan",
          alignment: { horizontal: "center", vertical: "middle" },
        },
      ];
      sheet.mergeCells(`A${nextFromJaFung}:E${nextFromJaFung}`);
      headersGolongan.forEach(({ cell, value, alignment }) => {
        const c = sheet.getCell(cell);
        c.value = value;
        c.font = { bold: true, color: { argb: "000000" } };
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
      nextFromJaFung += 1;
      const subHeadersGolongan: {
        cell: string;
        value: string;
        alignment?: Partial<Alignment>;
      }[] = [
        {
          cell: `A${nextFromJaFung}`,
          value: "No",
          alignment: { horizontal: "left", vertical: "middle" },
        },
        {
          cell: `B${nextFromJaFung}`,
          value: "Nama Golongan",
          alignment: { horizontal: "left", vertical: "middle" },
        },
        {
          cell: `C${nextFromJaFung}`,
          value: `Jumlah Pegawai`,
          alignment: { horizontal: "center", vertical: "middle" },
        },
      ];
      sheet.mergeCells(`C${nextFromJaFung}:E${nextFromJaFung}`);
      subHeadersGolongan.forEach(({ cell, value, alignment }) => {
        const c = sheet.getCell(cell);
        c.value = value;
        c.font = { bold: true, color: { argb: "FFFFFF" } };
        c.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "137269" },
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
      Golongan.forEach((dt, index) => {
        nextFromJaFung = nextFromJaFung += 1;

        const noCell = sheet.getCell(`A${nextFromJaFung}`);
        noCell.value = index + 1;
        noCell.alignment = {
          horizontal: "left",
          vertical: "top",
          wrapText: true,
        };
        noCell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
        const nameCell = sheet.getCell(`B${nextFromJaFung}`);
        nameCell.value = dt.name;
        nameCell.alignment = {
          horizontal: "left",
          vertical: "top",
          wrapText: true,
        };
        nameCell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        const terisiCell = sheet.getCell(`C${nextFromJaFung}`);
        terisiCell.value = dt.terisi;
        terisiCell.alignment = {
          horizontal: "center",
          vertical: "top",
          wrapText: true,
        };
        terisiCell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
        sheet.mergeCells(`C${nextFromJaFung}:E${nextFromJaFung}`);
      });
      // end golongan

      // pendidikan
      nextFromJaFung += 3;
      const headersPendidikan: {
        cell: string;
        value: string;
        alignment?: Partial<Alignment>;
      }[] = [
        {
          cell: `A${nextFromJaFung}`,
          value: "Jumlah Pegawai Berdasarkan Pendidikan",
          alignment: { horizontal: "center", vertical: "middle" },
        },
      ];
      sheet.mergeCells(`A${nextFromJaFung}:E${nextFromJaFung}`);
      headersPendidikan.forEach(({ cell, value, alignment }) => {
        const c = sheet.getCell(cell);
        c.value = value;
        c.font = { bold: true, color: { argb: "000000" } };
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
      nextFromJaFung += 1;
      const subHeadersPendidikan: {
        cell: string;
        value: string;
        alignment?: Partial<Alignment>;
      }[] = [
        {
          cell: `A${nextFromJaFung}`,
          value: "No",
          alignment: { horizontal: "left", vertical: "middle" },
        },
        {
          cell: `B${nextFromJaFung}`,
          value: "Nama Pendidikan",
          alignment: { horizontal: "left", vertical: "middle" },
        },
        {
          cell: `C${nextFromJaFung}`,
          value: `Jumlah Pegawai`,
          alignment: { horizontal: "center", vertical: "middle" },
        },
      ];
      sheet.mergeCells(`C${nextFromJaFung}:E${nextFromJaFung}`);
      subHeadersPendidikan.forEach(({ cell, value, alignment }) => {
        const c = sheet.getCell(cell);
        c.value = value;
        c.font = { bold: true, color: { argb: "FFFFFF" } };
        c.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "137269" },
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
      Pendidikan.forEach((dt, index) => {
        nextFromJaFung = nextFromJaFung += 1;

        const noCell = sheet.getCell(`A${nextFromJaFung}`);
        noCell.value = index + 1;
        noCell.alignment = {
          horizontal: "left",
          vertical: "top",
          wrapText: true,
        };
        noCell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
        const nameCell = sheet.getCell(`B${nextFromJaFung}`);
        nameCell.value = dt.name;
        nameCell.alignment = {
          horizontal: "left",
          vertical: "top",
          wrapText: true,
        };
        nameCell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        const terisiCell = sheet.getCell(`C${nextFromJaFung}`);
        terisiCell.value = dt.terisi;
        terisiCell.alignment = {
          horizontal: "center",
          vertical: "top",
          wrapText: true,
        };
        terisiCell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
        sheet.mergeCells(`C${nextFromJaFung}:E${nextFromJaFung}`);
      });
      // end pendidikan

      // jenis kelamin
      nextFromJaFung += 3;
      const headersJenisKelamin: {
        cell: string;
        value: string;
        alignment?: Partial<Alignment>;
      }[] = [
        {
          cell: `A${nextFromJaFung}`,
          value: "Jumlah Pegawai Berdasarkan JenisKelamin",
          alignment: { horizontal: "center", vertical: "middle" },
        },
      ];
      sheet.mergeCells(`A${nextFromJaFung}:E${nextFromJaFung}`);
      headersJenisKelamin.forEach(({ cell, value, alignment }) => {
        const c = sheet.getCell(cell);
        c.value = value;
        c.font = { bold: true, color: { argb: "000000" } };
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
      nextFromJaFung += 1;
      const subHeadersJenisKelamin: {
        cell: string;
        value: string;
        alignment?: Partial<Alignment>;
      }[] = [
        {
          cell: `A${nextFromJaFung}`,
          value: "No",
          alignment: { horizontal: "left", vertical: "middle" },
        },
        {
          cell: `B${nextFromJaFung}`,
          value: "Nama Jenis Kelamin",
          alignment: { horizontal: "left", vertical: "middle" },
        },
        {
          cell: `C${nextFromJaFung}`,
          value: `Jumlah Pegawai`,
          alignment: { horizontal: "center", vertical: "middle" },
        },
      ];
      sheet.mergeCells(`C${nextFromJaFung}:E${nextFromJaFung}`);
      subHeadersJenisKelamin.forEach(({ cell, value, alignment }) => {
        const c = sheet.getCell(cell);
        c.value = value;
        c.font = { bold: true, color: { argb: "FFFFFF" } };
        c.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "137269" },
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
      JenisKelamin.forEach((dt, index) => {
        nextFromJaFung = nextFromJaFung += 1;

        const noCell = sheet.getCell(`A${nextFromJaFung}`);
        noCell.value = index + 1;
        noCell.alignment = {
          horizontal: "left",
          vertical: "top",
          wrapText: true,
        };
        noCell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
        const nameCell = sheet.getCell(`B${nextFromJaFung}`);
        nameCell.value = dt.name;
        nameCell.alignment = {
          horizontal: "left",
          vertical: "top",
          wrapText: true,
        };
        nameCell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };

        const terisiCell = sheet.getCell(`C${nextFromJaFung}`);
        terisiCell.value = dt.terisi;
        terisiCell.alignment = {
          horizontal: "center",
          vertical: "top",
          wrapText: true,
        };
        terisiCell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
        sheet.mergeCells(`C${nextFromJaFung}:E${nextFromJaFung}`);
      });
      // end jenis kelamin

      // cuti, pangkat dan gaji
      nextFromJaFung += 2;
      const subHeadersCPG: {
        cell: string;
        value: string;
        alignment?: Partial<Alignment>;
      }[] = [
        {
          cell: `A${nextFromJaFung}`,
          value:
            "Daftar Kenaikan Pangkat, Kegiatan Gaji Berkala, Pensiun dan Cuti",
          alignment: { horizontal: "left", vertical: "middle" },
        },
      ];
      sheet.mergeCells(`A${nextFromJaFung}:I${nextFromJaFung}`);
      subHeadersCPG.forEach(({ cell, value, alignment }) => {
        const c = sheet.getCell(cell);
        c.value = value;
        c.font = { bold: true, color: { argb: "FFFFFF" } };
        c.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "137269" },
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

      nextFromJaFung += 1;
      const NoPangkat = sheet.getCell(`A${nextFromJaFung}`);
      NoPangkat.value = 1;
      NoPangkat.alignment = {
        horizontal: "center",
        vertical: "top",
        wrapText: true,
      };
      NoPangkat.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
      const namaPangkat = sheet.getCell(`B${nextFromJaFung}`);
      namaPangkat.value = `Daftar Kenaikan Pangkat Pegawai ${date}`;
      namaPangkat.alignment = {
        horizontal: "left",
        vertical: "top",
        wrapText: true,
      };
      namaPangkat.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
      sheet.mergeCells(`B${nextFromJaFung}:C${nextFromJaFung}`);
      const totalPangkat = sheet.getCell(`D${nextFromJaFung}`);
      totalPangkat.value = dataSurat.pangkat.length;
      totalPangkat.alignment = {
        horizontal: "center",
        vertical: "top",
        wrapText: true,
      };
      totalPangkat.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };

      const anggotaPangkat = sheet.getCell(`E${nextFromJaFung}`);
      anggotaPangkat.value = anggotaPangkat.value = dataSurat.pangkat
        .filter((it) => it.user?.name)
        .map((it) => it.user.name)
        .join(", ");
      anggotaPangkat.alignment = {
        horizontal: "left",
        vertical: "top",
        wrapText: true,
      };
      anggotaPangkat.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
      sheet.mergeCells(`E${nextFromJaFung}:I${nextFromJaFung}`);

      nextFromJaFung += 1;
      const NoCuti = sheet.getCell(`A${nextFromJaFung}`);
      NoCuti.value = 2;
      NoCuti.alignment = {
        horizontal: "center",
        vertical: "top",
        wrapText: true,
      };
      NoCuti.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
      const namaCuti = sheet.getCell(`B${nextFromJaFung}`);
      namaCuti.value = `Daftar Kenaikan Gaji Berkala Pegawai ${date}`;
      namaCuti.alignment = {
        horizontal: "left",
        vertical: "top",
        wrapText: true,
      };
      namaCuti.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
      sheet.mergeCells(`B${nextFromJaFung}:C${nextFromJaFung}`);
      const totalCuti = sheet.getCell(`D${nextFromJaFung}`);
      totalCuti.value = dataSurat.cuti.length;
      totalCuti.alignment = {
        horizontal: "center",
        vertical: "top",
        wrapText: true,
      };
      totalCuti.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };

      const anggotaCuti = sheet.getCell(`E${nextFromJaFung}`);
      anggotaCuti.value = anggotaCuti.value = dataSurat.cuti
        .filter((it) => it.user?.name)
        .map((it) => it.user.name)
        .join(", ");
      anggotaCuti.alignment = {
        horizontal: "left",
        vertical: "top",
        wrapText: true,
      };
      anggotaCuti.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
      sheet.mergeCells(`E${nextFromJaFung}:I${nextFromJaFung}`);

      nextFromJaFung += 1;
      const NoGaji = sheet.getCell(`A${nextFromJaFung}`);
      NoGaji.value = 3;
      NoGaji.alignment = {
        horizontal: "center",
        vertical: "top",
        wrapText: true,
      };
      NoGaji.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
      const namaGaji = sheet.getCell(`B${nextFromJaFung}`);
      namaGaji.value = `Daftar Kenaikan Gaji Berkala Pegawai ${date}`;
      namaGaji.alignment = {
        horizontal: "left",
        vertical: "top",
        wrapText: true,
      };
      namaGaji.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
      sheet.mergeCells(`B${nextFromJaFung}:C${nextFromJaFung}`);
      const totalGaji = sheet.getCell(`D${nextFromJaFung}`);
      totalGaji.value = dataSurat.gaji.length;
      totalGaji.alignment = {
        horizontal: "center",
        vertical: "top",
        wrapText: true,
      };
      totalGaji.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };

      const anggotaGaji = sheet.getCell(`E${nextFromJaFung}`);
      anggotaGaji.value = anggotaGaji.value = dataSurat.gaji
        .filter((it) => it.user?.name)
        .map((it) => it.user.name)
        .join(", ");
      anggotaGaji.alignment = {
        horizontal: "left",
        vertical: "top",
        wrapText: true,
      };
      anggotaGaji.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
      sheet.mergeCells(`E${nextFromJaFung}:I${nextFromJaFung}`);

      nextFromJaFung += 1;
      const NoPensiun = sheet.getCell(`A${nextFromJaFung}`);
      NoPensiun.value = 4;
      NoPensiun.alignment = {
        horizontal: "center",
        vertical: "top",
        wrapText: true,
      };
      NoPensiun.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
      const namaPensiun = sheet.getCell(`B${nextFromJaFung}`);
      namaPensiun.value = `Daftar Pegawai Pensiun ${date}`;
      namaPensiun.alignment = {
        horizontal: "left",
        vertical: "top",
        wrapText: true,
      };
      namaPensiun.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
      sheet.mergeCells(`B${nextFromJaFung}:C${nextFromJaFung}`);
      const totalPensiun = sheet.getCell(`D${nextFromJaFung}`);
      totalPensiun.value = Pensiun.length;
      totalPensiun.alignment = {
        horizontal: "center",
        vertical: "top",
        wrapText: true,
      };
      totalPensiun.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };

      const anggotaPensiun = sheet.getCell(`E${nextFromJaFung}`);
      anggotaPensiun.value = Pensiun.join(", ");
      anggotaPensiun.alignment = {
        horizontal: "left",
        vertical: "top",
        wrapText: true,
      };
      anggotaPensiun.border = {
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
      sheet.mergeCells(`E${nextFromJaFung}:I${nextFromJaFung}`);
      // end cuti, pangkat dan gaji

      sheet.getColumn(1).width = 4;
      sheet.getColumn(2).width = 32;
      sheet.getColumn(5).width = 12;
      sheet.getColumn(6).width = 12;
      sheet.getColumn(8).width = 40;

      // -------------------------------
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "Summary Report.xlsx");
      setTimeout(() => window.close(), 2000);
    }
  };

  useEffect(() => {
    // Memastikan data sudah terisi dengan baik sebelum export
    if (
      UnitKerjaPegawai.length > 0 &&
      UnitKerjaASN.length > 0 &&
      AnalisPerdagangan.length > 0 &&
      PengawasPerdagangan.length > 0 &&
      Penera.length > 0 &&
      Eselon.length > 0 &&
      Golongan.length > 0 &&
      Pendidikan.length > 0 &&
      JenisKelamin.length > 0
    ) {
      setReadyToExport(true);
    }
  }, [
    UnitKerjaPegawai,
    UnitKerjaASN,
    AnalisPerdagangan,
    PengawasPerdagangan,
    Penera,
  ]);

  // Menunggu semua data selesai sebelum menjalankan ekspor
  useEffect(() => {
    if (
      !isFetchingUnit &&
      DATA_FETCHING_UNIT &&
      !isFetching &&
      DATA_FETCHING &&
      readyToExport &&
      !isFetchingDataSurat &&
      dataSurat
    ) {
      // Cek apakah data sudah siap, kemudian lakukan export
      setTimeout(() => {
        handleExport();
      }, 500); // Menunda sedikit agar memastikan data siap
    }
  }, [
    isFetchingUnit,
    DATA_FETCHING_UNIT,
    isFetching,
    DATA_FETCHING,
    readyToExport,
    isFetchingDataSurat,
    dataSurat,
  ]);

  return <LoaderPage />;
};

export default ExportExcel;
