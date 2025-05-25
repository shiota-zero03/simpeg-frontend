import React, { useEffect, useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Button } from "@heroui/react";
import { LucideDownloadCloud } from "lucide-react";
import { LuFullscreen } from "react-icons/lu";
import { useGetAllJabatanHirarki } from "@/services/jabatan";
import { Commet } from "react-loading-indicators";

interface PetaJabatanData {
  name: string;
  class: number | string;
  b: number;
  k: number;
  plus: number;
  minus: number;
}

export default function BigTable() {
  const [perencanaanKeuangan, setPerencanaanKeuangan] = useState<
    PetaJabatanData[]
  >([]);
  const [umpeg, setUmpeg] = useState<PetaJabatanData[]>([]);
  const [ln, setLN] = useState<PetaJabatanData[]>([]);
  const [spl, setSpl] = useState<PetaJabatanData[]>([]);
  const [kemetrologian, setKemetrologian] = useState<PetaJabatanData[]>([]);
  const [pbpp, setPbpp] = useState<PetaJabatanData[]>([]);
  const [jabfung, setJabfung] = useState<PetaJabatanData[]>([]);

  const [uptd1, setUptd1] = useState<PetaJabatanData[]>([]);
  const [uptd2, setUptd2] = useState<PetaJabatanData[]>([]);
  const [uptd3, setUptd3] = useState<PetaJabatanData[]>([]);
  const [uptd4, setUptd4] = useState<PetaJabatanData[]>([]);
  const [uptd5, setUptd5] = useState<PetaJabatanData[]>([]);
  const [uptd6, setUptd6] = useState<PetaJabatanData[]>([]);
  const [uptd7, setUptd7] = useState<PetaJabatanData[]>([]);
  const [uptd8, setUptd8] = useState<PetaJabatanData[]>([]);
  const [uptd9, setUptd9] = useState<PetaJabatanData[]>([]);
  const [uptdMetrologiLegal, setUptdMetrologiLegal] = useState<
    PetaJabatanData[]
  >([]);

  const { data, refetch, isFetching } = useGetAllJabatanHirarki();
  const DATA_FETCHING = useMemo(() => {
    if (data) return data.data;
    return [];
  }, [data]);

  useEffect(() => {
    setPerencanaanKeuangan([]);
    setUmpeg([]);
    refetch();
  }, []);

  useEffect(() => {
    if (!isFetching && DATA_FETCHING) {
      const newItemsKeuangan = DATA_FETCHING.filter((it) =>
        it.parent?.nameJob.toUpperCase().includes("KEUANGAN"),
      ).map((item) => ({
        name: item.nameJob,
        class: item.class === "undefined" ? "" : item.class || "",
        b: item.user.length,
        k: item.ketersediaan,
        plus:
          item.user.length > item.ketersediaan
            ? item.user.length - item.ketersediaan
            : 0,
        minus:
          item.user.length <= item.ketersediaan
            ? item.ketersediaan - item.user.length
            : 0,
      }));
      setPerencanaanKeuangan(newItemsKeuangan);

      const newItemsUmpeg = DATA_FETCHING.filter((it) =>
        it.parent?.nameJob.toUpperCase().includes("UMUM"),
      ).map((item) => ({
        name: item.nameJob,
        class: item.class === "undefined" ? "" : item.class || "",
        b: item.user.length,
        k: item.ketersediaan,
        plus:
          item.user.length > item.ketersediaan
            ? item.user.length - item.ketersediaan
            : 0,
        minus:
          item.user.length <= item.ketersediaan
            ? item.ketersediaan - item.user.length
            : 0,
      }));
      setUmpeg(newItemsUmpeg);

      const newLN = DATA_FETCHING.filter((it) =>
        it.parent?.nameJob.toUpperCase().includes("LUAR NEGERI"),
      ).map((item) => ({
        name: item.nameJob,
        class: item.class === "undefined" ? "" : item.class || "",
        b: item.user.length,
        k: item.ketersediaan,
        plus:
          item.user.length > item.ketersediaan
            ? item.user.length - item.ketersediaan
            : 0,
        minus:
          item.user.length <= item.ketersediaan
            ? item.ketersediaan - item.user.length
            : 0,
      }));
      setLN(newLN);

      const newItemsSPL = DATA_FETCHING.filter((it) =>
        it.parent?.nameJob.toUpperCase().includes("DISTRIBUSI"),
      ).map((item) => ({
        name: item.nameJob,
        class: item.class === "undefined" ? "" : item.class || "",
        b: item.user.length,
        k: item.ketersediaan,
        plus:
          item.user.length > item.ketersediaan
            ? item.user.length - item.ketersediaan
            : 0,
        minus:
          item.user.length <= item.ketersediaan
            ? item.ketersediaan - item.user.length
            : 0,
      }));
      setSpl(newItemsSPL);

      const newItemsKemetrologian = DATA_FETCHING.filter((it) =>
        it.parent?.nameJob.toUpperCase().includes("BIDANG KEMETROLOGIAN"),
      ).map((item) => ({
        name: item.nameJob,
        class: item.class === "undefined" ? "" : item.class || "",
        b: item.user.length,
        k: item.ketersediaan,
        plus:
          item.user.length > item.ketersediaan
            ? item.user.length - item.ketersediaan
            : 0,
        minus:
          item.user.length <= item.ketersediaan
            ? item.ketersediaan - item.user.length
            : 0,
      }));
      setKemetrologian(newItemsKemetrologian);

      const newItemsPbpp = DATA_FETCHING.filter((it) =>
        it.parent?.nameJob.toUpperCase().includes("PENGENDALIAN BARANG"),
      ).map((item) => ({
        name: item.nameJob,
        class: item.class === "undefined" ? "" : item.class || "",
        b: item.user.length,
        k: item.ketersediaan,
        plus:
          item.user.length > item.ketersediaan
            ? item.user.length - item.ketersediaan
            : 0,
        minus:
          item.user.length <= item.ketersediaan
            ? item.ketersediaan - item.user.length
            : 0,
      }));
      setPbpp(newItemsPbpp);


      // const filtered = DATA_FETCHING.filter(it =>
      //   it.nameJob?.toUpperCase().includes("ANALIS PERDAGANGAN") ||
      //   it.nameJob?.toUpperCase().includes("PENGAWAS PERDAGANGAN") ||
      //   it.nameJob?.toUpperCase().includes("PENGAWAS KEMETROLOGIAN") ||
      //   it.nameJob?.toUpperCase().includes("PENERA")
      // );
      
      // const grouped: Record<string, PetaJabatanData> = {};
      
      // filtered.forEach(item => {
      //   const key = item.nameJob;
      //   if (!key) return;
      
      //   if (!grouped[key]) {
      //     grouped[key] = {
      //       name: key,
      //       class: key.includes("MADYA") ? "12" : (key.includes("MUDA") ? "10" : "8"),
      //       b: 0,
      //       k: 0,
      //       plus: 0,
      //       minus: 0
      //     };
      //   }
      
      //   grouped[key].b += item.ketersediaan || 0;
      //   grouped[key].k += item.user?.length || 0;
      // });
      
      // // Hitung plus & minus
      // Object.values(grouped).forEach(item => {
      //   item.plus = Math.max(item.b - item.k, 0);
      //   item.minus = Math.max(item.k - item.b, 0);
      // });
      
      // const result: PetaJabatanData[] = Object.values(grouped);
      // result.sort((a, b) => a.name.localeCompare(b.name));
      // setJabfung(result);

      setJabfung([]);

      const setters = [
        setUptd1,
        setUptd2,
        setUptd3,
        setUptd4,
        setUptd5,
        setUptd6,
        setUptd7,
        setUptd8,
        setUptd9,
      ];

      const romanNumerals = [
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
      ];

      for (let i = 1; i <= 9; i++) {
        const filtered = DATA_FETCHING.filter(
          (it) =>
            it.parent?.nameJob
              .toUpperCase()
              .includes(
                `KEPALA UPTD PENGELOLAAN DAN PEMBINAAN PASAR WILAYAH ${romanNumerals[i - 1]} (`,
              ) && !it.nameJob.toUpperCase().includes("SUBBAGIAN"),
        ).map((item) => ({
          name: item.nameJob,
          class: item.class === "undefined" ? "" : item.class || "",
          b: item.user.length,
          k: item.ketersediaan,
          plus:
            item.user.length > item.ketersediaan
              ? item.user.length - item.ketersediaan
              : 0,
          minus:
            item.user.length <= item.ketersediaan
              ? item.ketersediaan - item.user.length
              : 0,
        }));
        setters[i - 1](filtered); // panggil setUptdX sesuai urutan
      }

      const newItemsDinasMetrologi = DATA_FETCHING.filter(
        (it) =>
          it.parent?.nameJob
            .toUpperCase()
            .includes("KEPALA UPTD METROLOGI LEGAL") &&
          !it.nameJob.toUpperCase().includes("SUBBAGIAN"),
      ).map((item) => ({
        name: item.nameJob,
        class: item.class === "undefined" ? "" : item.class || "",
        b: item.user.length,
        k: item.ketersediaan,
        plus:
          item.user.length > item.ketersediaan
            ? item.user.length - item.ketersediaan
            : 0,
        minus:
          item.user.length <= item.ketersediaan
            ? item.ketersediaan - item.user.length
            : 0,
      }));
      setUptdMetrologiLegal(newItemsDinasMetrologi);
    }
  }, [isFetching, DATA_FETCHING]);

  const tableRef = useRef<HTMLTableElement>(null);

  const generateColumns = () => {
    const columns = [];
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < 160; i++) {
      let col = "";
      let n = i;
      do {
        col = letters[n % 26] + col;
        n = Math.floor(n / 26) - 1;
      } while (n >= 0);
      columns.push(col);
    }
    return columns;
  };

  const columns = generateColumns();

  // Fullscreen
  const toggleFullscreen = () => {
    if (tableRef.current) {
      if (!document.fullscreenElement) {
        tableRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTo({
        left: (tableRef.current.scrollWidth - tableRef.current.clientWidth) / 2,
        behavior: "smooth",
      });
    }
  }, []);

  const handleDownload = async () => {
    if (tableRef.current) {
      const rect = tableRef.current.getBoundingClientRect();
      const canvas = await html2canvas(tableRef.current, {
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        x: rect.left - 0.12 * tableRef.current.scrollWidth,
        width: tableRef.current.scrollWidth * 1.2,
        height: tableRef.current.scrollHeight,
        windowWidth: tableRef.current.scrollWidth * 1.4,
        windowHeight: tableRef.current.scrollHeight,
        scale: window.devicePixelRatio,
      });
      const link = document.createElement("a");
      link.download = "PetaJabatan.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };


  const dataToRenderPKUmpeg = [
    { name: "perencanaanKeuangan", data: perencanaanKeuangan.filter(it => it.name.toUpperCase().includes('AHLI')) },
    { name: "umpeg", data: umpeg.filter(it => it.name.toUpperCase().includes('AHLI')) },
    { name: "jabfung", data: [] }
  ].sort((a, b) => b.data.length - a.data.length)[0].data;
  const dataToRenderPKUmpegPelaksana = [
    { name: "perencanaanKeuangan", data: perencanaanKeuangan.filter(it => !it.name.toUpperCase().includes('AHLI')) },
    { name: "umpeg", data: umpeg.filter(it => !it.name.toUpperCase().includes('AHLI')) },
    { name: "jabfung", data: [] }
  ].sort((a, b) => b.data.length - a.data.length)[0].data;

  const dataToRenderKabid = [
    { name: "ln", data: ln.filter(it => it.name.toUpperCase().includes('AHLI')) },
    { name: "spl", data: spl.filter(it => it.name.toUpperCase().includes('AHLI')) },
    { name: "kemetrologian", data: kemetrologian.filter(it => it.name.toUpperCase().includes('AHLI')) },
    { name: "pbpp", data: pbpp.filter(it => it.name.toUpperCase().includes('AHLI')) }
  ].sort((a, b) => b.data.length - a.data.length)[0].data;

  const dataToRenderKabidPelaksana = [
    { name: "ln", data: ln.filter(it => !it.name.toUpperCase().includes('AHLI')) },
    { name: "spl", data: spl.filter(it => !it.name.toUpperCase().includes('AHLI')) },
    { name: "kemetrologian", data: kemetrologian.filter(it => !it.name.toUpperCase().includes('AHLI')) },
    { name: "pbpp", data: pbpp.filter(it => !it.name.toUpperCase().includes('AHLI')) }
  ].sort((a, b) => b.data.length - a.data.length)[0].data;

  const dataToRenderUPTDFungsional = [
    { name: "uptd1", data: uptd1.filter(it => it.name.toUpperCase().includes('AHLI')) },
    { name: "uptd2", data: uptd2.filter(it => it.name.toUpperCase().includes('AHLI')) },
    { name: "uptd3", data: uptd3.filter(it => it.name.toUpperCase().includes('AHLI')) },
    { name: "uptd4", data: uptd4.filter(it => it.name.toUpperCase().includes('AHLI')) },
    { name: "uptd5", data: uptd5.filter(it => it.name.toUpperCase().includes('AHLI')) },
    { name: "uptd6", data: uptd6.filter(it => it.name.toUpperCase().includes('AHLI')) },
    { name: "uptd7", data: uptd7.filter(it => it.name.toUpperCase().includes('AHLI')) },
    { name: "uptd8", data: uptd8.filter(it => it.name.toUpperCase().includes('AHLI')) },
    { name: "uptd9", data: uptd9.filter(it => it.name.toUpperCase().includes('AHLI')) },
    { name: "uptdMetrologiLegal", data: uptdMetrologiLegal.filter(it => it.name.toUpperCase().includes('AHLI')) },
  ].sort((a, b) => b.data.length - a.data.length)[0].data;
  
  const dataToRenderUPTD = [
    { name: "uptd1", data: uptd1.filter(it => !it.name.toUpperCase().includes('AHLI')) },
    { name: "uptd2", data: uptd2.filter(it => !it.name.toUpperCase().includes('AHLI')) },
    { name: "uptd3", data: uptd3.filter(it => !it.name.toUpperCase().includes('AHLI')) },
    { name: "uptd4", data: uptd4.filter(it => !it.name.toUpperCase().includes('AHLI')) },
    { name: "uptd5", data: uptd5.filter(it => !it.name.toUpperCase().includes('AHLI')) },
    { name: "uptd6", data: uptd6.filter(it => !it.name.toUpperCase().includes('AHLI')) },
    { name: "uptd7", data: uptd7.filter(it => !it.name.toUpperCase().includes('AHLI')) },
    { name: "uptd8", data: uptd8.filter(it => !it.name.toUpperCase().includes('AHLI')) },
    { name: "uptd9", data: uptd9.filter(it => !it.name.toUpperCase().includes('AHLI')) },
    { name: "uptdMetrologiLegal", data: uptdMetrologiLegal.filter(it => !it.name.toUpperCase().includes('AHLI')) },
  ].sort((a, b) => b.data.length - a.data.length)[0].data;

  let ArrayUptdFungsionalLength = [
    uptd1.filter(it => it.name.toUpperCase().includes('AHLI')).length,
    uptd2.filter(it => it.name.toUpperCase().includes('AHLI')).length,
    uptd3.filter(it => it.name.toUpperCase().includes('AHLI')).length,
    uptd4.filter(it => it.name.toUpperCase().includes('AHLI')).length,
    uptd5.filter(it => it.name.toUpperCase().includes('AHLI')).length,
    uptd6.filter(it => it.name.toUpperCase().includes('AHLI')).length,
    uptd7.filter(it => it.name.toUpperCase().includes('AHLI')).length,
    uptd8.filter(it => it.name.toUpperCase().includes('AHLI')).length,
    uptd9.filter(it => it.name.toUpperCase().includes('AHLI')).length,
    uptdMetrologiLegal.filter(it => it.name.toUpperCase().includes('AHLI')).length
  ];
  return (
    <div className="bg-white">
      {isFetching && (
        <div className="inset-0 fixed flex items-center justify-center z-20">
          <Commet color="#32cd32" size="medium" text="" textColor="" />
        </div>
      )}
      <div className="flex gap-4 mb-4 p-4">
        <Button
          onPress={handleDownload}
          className="px-4 py-2 bg-button-primary text-white rounded"
        >
          <LucideDownloadCloud size={18} />
          Download PNG
        </Button>
        <Button
          onPress={toggleFullscreen}
          className="px-4 py-2 bg-info text-white rounded"
        >
          <LuFullscreen size={18} />
          Fullscreen
        </Button>
      </div>

      <div>
        <div
          ref={tableRef}
          className="w-full min-h-screen overflow-auto border border-button-primary scrollbar-hide"
        >
          <table className="table-auto bg-white">
            <thead className=" bg-white">
              <tr>
                {columns.map((col) => (
                  <th key={col} className="w-6"></th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th colSpan={160} className="h-12"></th>
              </tr>
              <tr>
                <th className="px-2 py-2 text-center text-xs" colSpan={73}></th>
                <th
                  className="px-2 py-2 text-center border border-button-primary text-xs"
                  colSpan={14}
                >
                  Kepala Dinas
                </th>
                <th className="px-2 py-2 text-center text-xs" colSpan={73}></th>
              </tr>
              <tr>
                <th className="px-2 py-2 text-center text-xs" colSpan={73}></th>
                <td
                  className="px-2 py-2 text-center text-xs badge-map"
                  colSpan={14}
                >
                  Kelas 14
                </td>
                <th className="px-2 py-2 text-center text-xs" colSpan={73}></th>
              </tr>
              <tr>
                <td
                  className="px-2 py-2 border-e border-button-primary text-center text-xs"
                  colSpan={80}
                ></td>
                <td
                  className="px-2 py-2 border-s border-button-primary text-center text-xs"
                  colSpan={80}
                ></td>
              </tr>
              <tr>
                <td
                  className="px-2 py-2 border-e border-button-primary text-center text-xs"
                  colSpan={80}
                ></td>
                <td
                  className="px-2 py-2 border-s border-button-primary text-center text-xs border-b"
                  colSpan={24}
                ></td>
                <th
                  className="px-2 py-2 text-center border border-button-primary text-xs"
                  colSpan={14}
                >
                  Sekretaris
                </th>
                <td
                  className="px-2 py-2 text-center text-xs"
                  colSpan={32}
                ></td>
              </tr>
              <tr>
                <td
                  className="px-2 py-2 border-e border-button-primary text-center text-xs"
                  colSpan={80}
                ></td>
                <td
                  className="px-2 py-2 border-s border-button-primary text-center text-xs"
                  colSpan={24}
                ></td>
                <td
                  className="px-2 py-2 text-center text-xs badge-map"
                  colSpan={14}
                >
                  Kelas 12
                </td>
                <td
                  className="px-2 py-2 border-s border-button-primary text-center text-xs"
                  colSpan={32}
                ></td>
              </tr>
              <tr>
                <td
                  className="px-2 py-2 border-e border-button-primary text-center text-xs"
                  colSpan={80}
                ></td>
                <td className="px-2 py-2 text-center text-xs" colSpan={15}></td>
                <td
                  className="px-2 py-2 border-b border-button-primary text-center text-xs"
                  colSpan={8}
                ></td>
                <td
                  className="px-2 py-2 border-e border-b border-button-primary text-center text-xs"
                  colSpan={8}
                ></td>
                <td
                  className="px-2 py-2 border-s border-b border-button-primary text-center text-xs"
                  colSpan={8}
                ></td>
                <td
                  className="px-2 py-2 border-b border-button-primary text-center text-xs"
                  colSpan={8}
                ></td>
                <td
                  className="px-2 py-2 border-button-primary text-center text-xs"
                  colSpan={33}
                ></td>
              </tr>
              <tr>
                <td
                  className="px-2 py-2 border-e border-button-primary text-center text-xs"
                  colSpan={80}
                ></td>
                <td className="px-2 py-2 text-center text-xs" colSpan={15}></td>
                <td
                  className="px-2 py-2 border-s border-button-primary text-center text-xs"
                  colSpan={8}
                ></td>
                <td
                  className="px-2 py-2 border-button-primary text-center text-xs"
                  colSpan={8}
                ></td>
                <td
                  className="px-2 py-2 border-s border-button-primary text-center text-xs"
                  colSpan={8}
                ></td>
                <td
                  className="px-2 py-2 border-button-primary text-center text-xs"
                  colSpan={8}
                ></td>
                <td
                  className="px-2 py-2 border-s border-button-primary text-center text-xs"
                  colSpan={8}
                ></td>
                <td
                  className="px-2 py-2 border-button-primary text-center text-xs"
                  colSpan={41}
                ></td>
              </tr>

              <tr>
                <th
                  className="px-2 py-2 text-center text-xs border-e border-button-primary"
                  colSpan={80}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-s border-button-primary"
                  colSpan={8}
                ></th>
                <th
                  className="px-2 py-2 text-center border border-button-primary text-xs"
                  colSpan={14}
                >
                  Kepala Subbagian Keuangan{" "}
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th
                  className="px-2 py-2 text-center border border-button-primary text-xs"
                  colSpan={14}
                >
                  Kepala Subbagian Umum dan Kepegawaian
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th
                  className="px-2 py-2 text-center border border-button-primary text-xs"
                  colSpan={14}
                >
                  Kelompok Jabatan Fungsional dan Pelaksana
                </th>
                <th className="px-2 py-2 text-center text-xs" colSpan={26}></th>
              </tr>
              <tr>
                <th
                  className="px-2 py-2 text-center text-xs border-e border-button-primary"
                  colSpan={80}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-s border-button-primary"
                  colSpan={8}
                ></th>
                <td
                  className="px-2 py-2 text-center text-xs badge-map"
                  colSpan={14}
                >
                  Kelas 9
                </td>
                <td className="px-2 py-2 text-center text-xs"></td>
                <td className="px-2 py-2 text-center text-xs"></td>
                <td
                  className="px-2 py-2 text-center text-xs badge-map"
                  colSpan={14}
                >
                  Kelas 9
                </td>
                <td className="px-2 py-2 text-center text-xs"></td>
                <td className="px-2 py-2 text-center text-xs"></td>
                <th
                  className="px-2 py-2 text-center text-xs badge-map"
                  colSpan={14}
                ></th>
                <th className="px-2 py-2 text-center text-xs" colSpan={26}></th>
              </tr>
              <tr>
                <th
                  className="px-2 py-2 text-center text-xs border-button-primary"
                  colSpan={80}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-s border-button-primary"
                  colSpan={9}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-s border-button-primary"
                  colSpan={6}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-s border-dashed border-button-primary"
                  colSpan={10}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-s border-button-primary"
                  colSpan={6}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-s border-dashed border-button-primary"
                  colSpan={10}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-s border-button-primary"
                  colSpan={6}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-s border-dashed border-button-primary"
                  colSpan={10}
                ></th>
                <th className="px-2 py-2 text-center text-xs" colSpan={23}></th>
              </tr>
              <tr>
                <th
                  className="px-2 py-2 text-center text-xs border-button-primary"
                  colSpan={80}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-s border-button-primary"
                  colSpan={9}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-s border-button-primary"
                  colSpan={6}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-s border-dashed border-button-primary"
                  colSpan={10}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-s border-button-primary"
                  colSpan={6}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-s border-dashed border-button-primary"
                  colSpan={10}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-s border-button-primary"
                  colSpan={6}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-s border-dashed border-button-primary"
                  colSpan={10}
                ></th>
                <th className="px-2 py-2 text-center text-xs" colSpan={23}></th>
              </tr>
              {/* 1 */}
              <tr>
                <th
                  className="px-2 py-2 text-center text-xs border-e border-button-primary"
                  colSpan={80}
                ></th>
                <th className="px-2 py-2 text-center text-xs" colSpan={7}></th>
                {Array.from({ length: 3 }).map((_, index) => (
                  <React.Fragment key={index}>
                    <th
                      className={`px-2 py-2 border-button-primary text-center text-xs`}
                    ></th>
                    <th className="px-2 py-2 border-e border-button-primary text-center text-xs"></th>
                    <th className="px-2 py-2 text-center text-xs"></th>
                    <th
                      className="px-2 py-2 badge-map text-center text-xs"
                      colSpan={6}
                    >
                      Jabatan Fungsional
                    </th>
                    <th
                      className="px-2 py-2 badge-map text-center text-xs"
                      colSpan={2}
                    >
                      Kelas
                    </th>
                    <th className="px-2 py-2 badge-map text-center text-xs">
                      B
                    </th>
                    <th className="px-2 py-2 badge-map text-center text-xs">
                      K
                    </th>
                    <th className="px-2 py-2 badge-map text-center text-xs">
                      (+)
                    </th>
                    <th className="px-2 py-2 badge-map text-center text-xs">
                      (-)
                    </th>
                    <th className={`px-2 py-2 text-center text-xs`}></th>
                  </React.Fragment>
                ))}
                <th className="px-2 py-2 text-center text-xs" colSpan={25}></th>
              </tr>
              {dataToRenderPKUmpeg.map((_, index) => {
                const itemPK = perencanaanKeuangan.filter(it => it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemUmpeg = umpeg.filter(it => it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemJabfung = jabfung.filter(it => it.name.toUpperCase().includes('AHLI'))[index] || {};
                return (
                  <React.Fragment key={index}>
                    <tr>
                      <th
                        className="px-2 py-2 text-center text-xs border-e border-button-primary"
                        colSpan={80}
                        rowSpan={2}
                      ></th>
                      <th
                        className="px-2 py-2 text-center text-xs"
                        colSpan={7}
                        rowSpan={2}
                      ></th>

                      {itemPK.name ? (
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      )}
                      {itemPK.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemPK.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          colSpan={6}
                          rowSpan={2}
                        >
                          {itemPK.name}
                        </td>
                      ) : (
                        <th colSpan={6} rowSpan={2}></th>
                      )}
                      {itemPK.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        >
                          {itemPK.class}
                        </td>
                      ) : (
                        <td colSpan={2} rowSpan={2}></td>
                      )}
                      {itemPK.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemPK.b}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemPK.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemPK.k}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemPK.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemPK.plus}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemPK.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemPK.minus}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemPK.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs "
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th rowSpan={2} className=""></th>
                      )}

                      {itemUmpeg.name ? (
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      )}
                      {itemUmpeg.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUmpeg.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          colSpan={6}
                          rowSpan={2}
                        >
                          {itemUmpeg.name}
                        </td>
                      ) : (
                        <th colSpan={6} rowSpan={2}></th>
                      )}
                      {itemUmpeg.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        >
                          {itemUmpeg.class}
                        </td>
                      ) : (
                        <th rowSpan={2} colSpan={2}></th>
                      )}
                      {itemUmpeg.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUmpeg.b}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      {itemUmpeg.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUmpeg.k}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      {itemUmpeg.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUmpeg.plus}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      {itemUmpeg.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs "
                          rowSpan={2}
                        >
                          {itemUmpeg.minus}
                        </td>
                      ) : (
                        <th rowSpan={2} className=""></th>
                      )}
                      {itemUmpeg.name ? (
                        <td
                          className="px-2 py-2 text-center text-xs "
                          rowSpan={2}
                        >
                        </td>
                      ) : (
                        <th rowSpan={2} className=""></th>
                      )}

                      {itemJabfung.name ? (
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      )}
                      {itemJabfung.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemJabfung.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          colSpan={6}
                          rowSpan={2}
                        >
                          {itemJabfung.name}
                        </td>
                      ) : (
                        <th colSpan={6} rowSpan={2}></th>
                      )}
                      {itemJabfung.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        >
                          {itemJabfung.class}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      {itemJabfung.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemJabfung.b}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      {itemJabfung.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemJabfung.k}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      {itemJabfung.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemJabfung.plus}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      {itemJabfung.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemJabfung.minus}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}

                      <th
                        className="px-2 py-2 text-center text-xs"
                        colSpan={27}
                        rowSpan={2}
                      ></th>
                    </tr>
                    <tr>
                      {itemPK.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUmpeg.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemJabfung.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th></th>
                      )}
                    </tr>
                  </React.Fragment>
                );
              })}
              <tr>
                <th
                  className="px-2 py-2 text-center text-xs border-button-primary"
                  colSpan={80}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-s border-button-primary"
                  colSpan={9}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-s border-button-primary"
                  colSpan={16}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-s border-button-primary"
                  colSpan={16}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-s border-button-primary"
                  colSpan={16}
                ></th>
                <th className="px-2 py-2 text-center text-xs" colSpan={23}></th>
              </tr>
              <tr>
                <th
                  className="px-2 py-2 text-center text-xs border-e border-button-primary"
                  colSpan={80}
                ></th>
                <th className="px-2 py-2 text-center text-xs" colSpan={7}></th>
                {Array.from({ length: 3 }).map((_, index) => (
                  <React.Fragment key={index}>
                    <th
                      className={`px-2 py-2 border-button-primary text-center text-xs`}
                    ></th>
                    <th className="px-2 py-2 border-e border-button-primary text-center text-xs"></th>
                    <th className="px-2 py-2 text-center text-xs border-b border-button-primary"></th>
                    <th
                      className="px-2 py-2 badge-map text-center text-xs"
                      colSpan={6}
                    >
                      Jabatan Pelaksana
                    </th>
                    <th
                      className="px-2 py-2 badge-map text-center text-xs"
                      colSpan={2}
                    >
                      Kelas
                    </th>
                    <th className="px-2 py-2 badge-map text-center text-xs">
                      B
                    </th>
                    <th className="px-2 py-2 badge-map text-center text-xs">
                      K
                    </th>
                    <th className="px-2 py-2 badge-map text-center text-xs">
                      (+)
                    </th>
                    <th className="px-2 py-2 badge-map text-center text-xs">
                      (-)
                    </th>
                    <th className={`px-2 py-2 text-center text-xs`}></th>
                  </React.Fragment>
                ))}
                <th className="px-2 py-2 text-center text-xs" colSpan={25}></th>
              </tr>
              {dataToRenderPKUmpegPelaksana.map((_, index) => {
                const itemPK = perencanaanKeuangan.filter(it => !it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemUmpeg = umpeg.filter(it => !it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemJabfung = jabfung.filter(it => !it.name.toUpperCase().includes('AHLI'))[index] || {};
                return (
                  <React.Fragment key={index}>
                    <tr>
                      <th
                        className="px-2 py-2 text-center text-xs border-e border-button-primary"
                        colSpan={80}
                        rowSpan={2}
                      ></th>
                      <th
                        className="px-2 py-2 text-center text-xs"
                        colSpan={7}
                        rowSpan={2}
                      ></th>

                      {itemPK.name ? (
                        <th
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      )}
                      {itemPK.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemPK.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          colSpan={6}
                          rowSpan={2}
                        >
                          {itemPK.name}
                        </td>
                      ) : (
                        <th colSpan={6} rowSpan={2}></th>
                      )}
                      {itemPK.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        >
                          {itemPK.class}
                        </td>
                      ) : (
                        <td colSpan={2} rowSpan={2}></td>
                      )}
                      {itemPK.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemPK.b}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemPK.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemPK.k}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemPK.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemPK.plus}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemPK.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemPK.minus}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemPK.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs "
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th rowSpan={2} className=""></th>
                      )}

                      {itemUmpeg.name ? (
                        <th
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      )}
                      {itemUmpeg.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUmpeg.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          colSpan={6}
                          rowSpan={2}
                        >
                          {itemUmpeg.name}
                        </td>
                      ) : (
                        <th colSpan={6} rowSpan={2}></th>
                      )}
                      {itemUmpeg.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        >
                          {itemUmpeg.class}
                        </td>
                      ) : (
                        <th rowSpan={2} colSpan={2}></th>
                      )}
                      {itemUmpeg.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUmpeg.b}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      {itemUmpeg.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUmpeg.k}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      {itemUmpeg.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUmpeg.plus}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      {itemUmpeg.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs "
                          rowSpan={2}
                        >
                          {itemUmpeg.minus}
                        </td>
                      ) : (
                        <th rowSpan={2} className=""></th>
                      )}
                      {itemUmpeg.name ? (
                        <td
                          className="px-2 py-2 text-center text-xs "
                          rowSpan={2}
                        >
                        </td>
                      ) : (
                        <th rowSpan={2} className=""></th>
                      )}

                      {itemJabfung.name ? (
                        <th
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      )}
                      {itemJabfung.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemJabfung.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          colSpan={6}
                          rowSpan={2}
                        >
                          {itemJabfung.name}
                        </td>
                      ) : (
                        <th colSpan={6} rowSpan={2}></th>
                      )}
                      {itemJabfung.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        >
                          {itemJabfung.class}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      {itemJabfung.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemJabfung.b}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      {itemJabfung.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemJabfung.k}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      {itemJabfung.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemJabfung.plus}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      {itemJabfung.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemJabfung.minus}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}

                      <th
                        className="px-2 py-2 text-center text-xs"
                        colSpan={27}
                        rowSpan={2}
                      ></th>
                    </tr>
                    <tr>
                      {itemPK.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUmpeg.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemJabfung.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th></th>
                      )}
                    </tr>
                  </React.Fragment>
                );
              })}

              <tr>
                <td
                  className="px-2 py-2 border-e border-button-primary text-center text-xs"
                  colSpan={80}
                ></td>
                <td
                  className="px-2 py-2 border-s border-button-primary text-center text-xs"
                  colSpan={80}
                ></td>
              </tr>
              <tr>
                <th className="px-2 py-2 text-center text-xs" colSpan={56}></th>
                <th
                  className="px-2 py-2 text-center text-xs border-b border-e border-button-primary"
                  colSpan={24}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-b border-s border-button-primary"
                  colSpan={24}
                ></th>
                <th className="px-2 py-2 text-center text-xs" colSpan={56}></th>
              </tr>
              <tr>
                <th className="px-2 py-2 text-center text-xs" colSpan={48}></th>
                <td
                  className="px-2 py-2 text-center border-e text-xs border-button-primary"
                  colSpan={8}
                ></td>
                <td
                  className="px-2 py-2 text-center border-s text-xs border-button-primary"
                  colSpan={8}
                ></td>
                <td
                  className="px-2 py-2 text-center border-e text-xs border-button-primary"
                  colSpan={8}
                ></td>
                <td
                  className="px-2 py-2 text-center border-x text-xs border-button-primary"
                  colSpan={8}
                ></td>
                <td
                  className="px-2 py-2 text-center border-x text-xs border-button-primary"
                  colSpan={8}
                ></td>
                <td
                  className="px-2 py-2 text-center border-s text-xs border-button-primary"
                  colSpan={8}
                ></td>
                <td
                  className="px-2 py-2 text-center border-e text-xs border-button-primary"
                  colSpan={8}
                ></td>
                <td
                  className="px-2 py-2 text-center border-s text-xs border-button-primary"
                  colSpan={8}
                ></td>
                <th className="px-2 py-2 text-center text-xs" colSpan={48}></th>
              </tr>
              <tr>
                <th className="px-2 py-2 text-center text-xs" colSpan={49}></th>
                <th
                  className="px-2 py-2 text-center border border-button-primary text-xs"
                  colSpan={14}
                >
                  Kepala Bidang Pengembangan Perdagangan Luar Negeri
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th
                  className="px-2 py-2 text-center border border-button-primary text-xs"
                  colSpan={14}
                >
                  Kepala Bidang Sarana dan Pelaku Distribusi
                </th>
                <th className="px-2 py-2 text-center text-xs border-e border-button-primary"></th>
                <th className="px-2 py-2 text-center text-xs border-s border-button-primary"></th>
                <th
                  className="px-2 py-2 text-center border border-button-primary text-xs"
                  colSpan={14}
                >
                  Kepala Bidang Kemetrologian
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th
                  className="px-2 py-2 text-center border border-button-primary text-xs"
                  colSpan={14}
                >
                  Kepala Bidang Pengendalian Barang Pokok dan Penting
                </th>
                <th className="px-2 py-2 text-center text-xs" colSpan={49}></th>
              </tr>
              <tr>
                <th className="px-2 py-2 text-center text-xs" colSpan={49}></th>
                <td
                  className="px-2 py-2 text-center text-xs badge-map"
                  colSpan={14}
                >
                  Kelas 11
                </td>
                <td className="px-2 py-2 text-center text-xs"></td>
                <td className="px-2 py-2 text-center text-xs"></td>
                <td
                  className="px-2 py-2 text-center text-xs badge-map"
                  colSpan={14}
                >
                  Kelas 11
                </td>
                <td className="px-2 py-2 text-center text-xs border-e border-button-primary"></td>
                <td className="px-2 py-2 text-center text-xs border-e border-button-primary"></td>
                <td
                  className="px-2 py-2 text-center text-xs badge-map"
                  colSpan={14}
                >
                  Kelas 11
                </td>
                <td className="px-2 py-2 text-center text-xs"></td>
                <td className="px-2 py-2 text-center text-xs"></td>
                <td
                  className="px-2 py-2 text-center text-xs badge-map"
                  colSpan={14}
                >
                  Kelas 11
                </td>
                <th className="px-2 py-2 text-center text-xs" colSpan={49}></th>
              </tr>
              <tr>
                <th className="px-2 py-2 text-center text-xs" colSpan={48}></th>
                {Array.from({ length: 4 }).map((_, index) => (
                  <React.Fragment key={index}>
                    <td
                      className={`px-2 py-2 border-button-primary text-center text-xs ${index === 2 && "border-s"}`}
                    ></td>
                    <td className="px-2 py-2 border-e border-button-primary text-center text-xs"></td>
                    <td className="px-2 py-2 text-xs border-e border-button-primary border-dashed" colSpan={6}></td>
                    <td className="px-2 py-2 text-xs" colSpan={7}></td>
                    <td
                      className={`px-2 py-2 text-xs  ${index === 1 && "border-e border-button-primary"}`}
                    ></td>
                  </React.Fragment>
                ))}
                <th className="px-2 py-2 text-center text-xs" colSpan={48}></th>
              </tr>
              <tr>
                <th className="px-2 py-2 text-center text-xs" colSpan={48}></th>
                {Array.from({ length: 4 }).map((_, index) => (
                  <React.Fragment key={index}>
                    <td
                      className={`px-2 py-2 border-button-primary text-center text-xs ${index === 2 && "border-s"}`}
                    ></td>
                    <td className="px-2 py-2 border-e border-button-primary text-center text-xs"></td>
                    <td className="px-2 py-2 text-xs border-e border-button-primary border-dashed" colSpan={6}></td>
                    <td className="px-2 py-2 text-xs" colSpan={7}></td>
                    <td
                      className={`px-2 py-2 text-xs  ${index === 1 && "border-e border-button-primary"}`}
                    ></td>
                  </React.Fragment>
                ))}
                <th className="px-2 py-2 text-center text-xs" colSpan={48}></th>
              </tr>
              <tr>
                <th className="px-2 py-2 text-center text-xs" colSpan={48}></th>
                {Array.from({ length: 4 }).map((_, index) => (
                  <React.Fragment key={index}>
                    <th
                      className={`px-2 py-2 border-button-primary text-center text-xs ${index === 2 && "border-s border-button-primary"}`}
                    ></th>
                    <th className="px-2 py-2 border-e border-button-primary text-center text-xs"></th>
                    <th className="px-2 py-2 text-center text-xs"></th>
                    <th
                      className="px-2 py-2 badge-map text-center text-xs"
                      colSpan={6}
                    >
                      Jabatan Fungsional
                    </th>
                    <th
                      className="px-2 py-2 badge-map text-center text-xs"
                      colSpan={2}
                    >
                      Kelas
                    </th>
                    <th className="px-2 py-2 badge-map text-center text-xs">
                      B
                    </th>
                    <th className="px-2 py-2 badge-map text-center text-xs">
                      K
                    </th>
                    <th className="px-2 py-2 badge-map text-center text-xs">
                      (+)
                    </th>
                    <th className="px-2 py-2 badge-map text-center text-xs">
                      (-)
                    </th>
                    <th
                      className={`px-2 py-2 text-center text-xs ${index === 1 && "border-e border-button-primary"}`}
                    ></th>
                  </React.Fragment>
                ))}
                <th className="px-2 py-2 text-center text-xs" colSpan={48}></th>
              </tr>
              {dataToRenderKabid.map((_, index) => {
                const itemLN = ln.filter(it => it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemSPL = spl.filter(it => it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemKemetrologian = kemetrologian.filter(it => it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemPBPP = pbpp.filter(it => it.name.toUpperCase().includes('AHLI'))[index] || {};
                return (
                  <React.Fragment key={index}>
                    <tr>
                      <th
                        className="px-2 py-2 text-center text-xs"
                        colSpan={48}
                        rowSpan={2}
                      ></th>

                      {itemLN.name ? (
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      )}
                      {itemLN.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemLN.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          colSpan={6}
                          rowSpan={2}
                        >
                          {itemLN.name}
                        </td>
                      ) : (
                        <td colSpan={6} rowSpan={2}></td>
                      )}
                      {itemLN.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        >
                          {itemLN.class}
                        </td>
                      ) : (
                        <td colSpan={2} rowSpan={2}></td>
                      )}
                      {itemLN.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemLN.b}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemLN.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemLN.k}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemLN.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemLN.plus}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemLN.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemLN.minus}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      <th
                        className="px-2 py-2 text-center text-xs"
                        rowSpan={2}
                      ></th>

                      {itemSPL.name ? (
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      )}
                      {itemSPL.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemSPL.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={6}
                        >
                          {itemSPL.name || "-"}
                        </td>
                      ) : (
                        <td rowSpan={2} colSpan={6}></td>
                      )}
                      {itemSPL.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemSPL.class ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2} colSpan={2}></td>
                      )}
                      {itemSPL.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemSPL.b ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemSPL.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemSPL.k ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemSPL.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemSPL.plus ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemSPL.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemSPL.minus ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemSPL.name ? (
                        <th
                          className="px-2 py-2 text-center border-e border-button-primary text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th rowSpan={2}></th>
                      )}

                      {itemKemetrologian.name ? (
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      )}
                      {itemKemetrologian.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemKemetrologian.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={6}
                        >
                          {itemKemetrologian.name || "-"}
                        </td>
                      ) : (
                        <td rowSpan={2} colSpan={6}></td>
                      )}
                      {itemKemetrologian.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemKemetrologian.class ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2} colSpan={2}></td>
                      )}
                      {itemKemetrologian.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemKemetrologian.b ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemKemetrologian.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemKemetrologian.k ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemKemetrologian.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemKemetrologian.plus ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemKemetrologian.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemKemetrologian.minus ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemKemetrologian.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th rowSpan={2}></th>
                      )}

                      {itemPBPP.name ? (
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      )}
                      {itemPBPP.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemPBPP.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={6}
                        >
                          {itemPBPP.name || "-"}
                        </td>
                      ) : (
                        <td rowSpan={2} colSpan={6}></td>
                      )}
                      {itemPBPP.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemPBPP.class ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2} colSpan={2}></td>
                      )}
                      {itemPBPP.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemPBPP.b ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemPBPP.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemPBPP.k ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemPBPP.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemPBPP.plus ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemPBPP.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemPBPP.minus ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemPBPP.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th rowSpan={2}></th>
                      )}

                      <th
                        className="px-2 py-2 text-center text-xs"
                        colSpan={48}
                        rowSpan={2}
                      ></th>
                    </tr>
                    <tr>
                      {itemLN.name ? (
                        <th></th>
                      ) : (
                        <th></th>
                      )}
                      {itemSPL.name ? (
                        <th></th>
                      ) : (
                        <th></th>
                      )}
                      {itemKemetrologian.name ? (
                        <th></th>
                      ) : (
                        <th></th>
                      )}
                      {itemPBPP.name ? (
                        <th></th>
                      ) : (
                        <th></th>
                      )}
                    </tr>
                  </React.Fragment>
                );
              })}
              <tr>
                <th className="px-2 py-2 text-center text-xs" colSpan={48}></th>
                {Array.from({ length: 4 }).map((_, index) => (
                  <React.Fragment key={index}>
                    <td
                      className={`px-2 py-2 border-button-primary text-center text-xs ${index === 2 && "border-s"}`}
                    ></td>
                    <td className="px-2 py-2 border-e border-button-primary text-center text-xs"></td>
                    <td className="px-2 py-2 text-xs" colSpan={13}></td>
                    <td
                      className={`px-2 py-2 text-xs  ${index === 1 && "border-e border-button-primary"}`}
                    ></td>
                  </React.Fragment>
                ))}
                <th className="px-2 py-2 text-center text-xs" colSpan={48}></th>
              </tr>
              <tr>
                <th className="px-2 py-2 text-center text-xs" colSpan={48}></th>
                {Array.from({ length: 4 }).map((_, index) => (
                  <React.Fragment key={index}>
                    <th
                      className={`px-2 py-2 border-button-primary text-center text-xs ${index === 2 && "border-s border-button-primary"}`}
                    ></th>
                    <th className="px-2 py-2 border-e border-button-primary text-center text-xs"></th>
                    <th className="px-2 py-2 text-center text-xs border-b border-button-primary"></th>
                    <th
                      className="px-2 py-2 badge-map text-center text-xs"
                      colSpan={6}
                    >
                      Jabatan Pelaksana
                    </th>
                    <th
                      className="px-2 py-2 badge-map text-center text-xs"
                      colSpan={2}
                    >
                      Kelas
                    </th>
                    <th className="px-2 py-2 badge-map text-center text-xs">
                      B
                    </th>
                    <th className="px-2 py-2 badge-map text-center text-xs">
                      K
                    </th>
                    <th className="px-2 py-2 badge-map text-center text-xs">
                      (+)
                    </th>
                    <th className="px-2 py-2 badge-map text-center text-xs">
                      (-)
                    </th>
                    <th
                      className={`px-2 py-2 text-center text-xs ${index === 1 && "border-e border-button-primary"}`}
                    ></th>
                  </React.Fragment>
                ))}
                <th className="px-2 py-2 text-center text-xs" colSpan={48}></th>
              </tr>
              {dataToRenderKabidPelaksana.map((_, index) => {
                const itemLN = ln.filter(it => !it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemSPL = spl.filter(it => !it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemKemetrologian = kemetrologian.filter(it => !it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemPBPP = pbpp.filter(it => !it.name.toUpperCase().includes('AHLI'))[index] || {};
                return (
                  <React.Fragment key={index}>
                    <tr>
                      <th
                        className="px-2 py-2 text-center text-xs"
                        colSpan={48}
                        rowSpan={2}
                      ></th>

                      {itemLN.name ? (
                        <th
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      )}
                      {itemLN.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemLN.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          colSpan={6}
                          rowSpan={2}
                        >
                          {itemLN.name}
                        </td>
                      ) : (
                        <td colSpan={6} rowSpan={2}></td>
                      )}
                      {itemLN.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        >
                          {itemLN.class}
                        </td>
                      ) : (
                        <td colSpan={2} rowSpan={2}></td>
                      )}
                      {itemLN.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemLN.b}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemLN.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemLN.k}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemLN.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemLN.plus}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemLN.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemLN.minus}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      <th
                        className="px-2 py-2 text-center text-xs"
                        rowSpan={2}
                      ></th>

                      {itemSPL.name ? (
                        <th
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      )}
                      {itemSPL.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemSPL.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={6}
                        >
                          {itemSPL.name || "-"}
                        </td>
                      ) : (
                        <td rowSpan={2} colSpan={6}></td>
                      )}
                      {itemSPL.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemSPL.class ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2} colSpan={2}></td>
                      )}
                      {itemSPL.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemSPL.b ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemSPL.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemSPL.k ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemSPL.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemSPL.plus ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemSPL.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemSPL.minus ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemSPL.name ? (
                        <th
                          className="px-2 py-2 text-center border-e border-button-primary text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th rowSpan={2}></th>
                      )}

                      {itemKemetrologian.name ? (
                        <th
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      )}
                      {itemKemetrologian.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemKemetrologian.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={6}
                        >
                          {itemKemetrologian.name || "-"}
                        </td>
                      ) : (
                        <td rowSpan={2} colSpan={6}></td>
                      )}
                      {itemKemetrologian.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemKemetrologian.class ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2} colSpan={2}></td>
                      )}
                      {itemKemetrologian.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemKemetrologian.b ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemKemetrologian.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemKemetrologian.k ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemKemetrologian.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemKemetrologian.plus ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemKemetrologian.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemKemetrologian.minus ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemKemetrologian.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th rowSpan={2}></th>
                      )}

                      {itemPBPP.name ? (
                        <th
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      )}
                      {itemPBPP.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemPBPP.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={6}
                        >
                          {itemPBPP.name || "-"}
                        </td>
                      ) : (
                        <td rowSpan={2} colSpan={6}></td>
                      )}
                      {itemPBPP.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemPBPP.class ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2} colSpan={2}></td>
                      )}
                      {itemPBPP.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemPBPP.b ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemPBPP.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemPBPP.k ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemPBPP.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemPBPP.plus ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemPBPP.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemPBPP.minus ?? "-"}
                        </td>
                      ) : (
                        <td rowSpan={2}></td>
                      )}
                      {itemPBPP.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th rowSpan={2}></th>
                      )}

                      <th
                        className="px-2 py-2 text-center text-xs"
                        colSpan={48}
                        rowSpan={2}
                      ></th>
                    </tr>
                    <tr>
                      {itemLN.name ? (
                        <th></th>
                      ) : (
                        <th></th>
                      )}
                      {itemSPL.name ? (
                        <th></th>
                      ) : (
                        <th></th>
                      )}
                      {itemKemetrologian.name ? (
                        <th></th>
                      ) : (
                        <th></th>
                      )}
                      {itemPBPP.name ? (
                        <th></th>
                      ) : (
                        <th></th>
                      )}
                    </tr>
                  </React.Fragment>
                );
              })}
              <tr>
                <td
                  className="px-2 py-2 text-center border-e text-xs border-button-primary"
                  colSpan={80}
                ></td>
                <td
                  className="px-2 py-2 text-center border-s text-xs border-button-primary"
                  colSpan={80}
                ></td>
              </tr>
              <tr>
                <th className="px-2 py-2 text-center text-xs" colSpan={8}></th>
                <th
                  className="px-2 py-2 text-center text-xs border-b border-e border-button-primary"
                  colSpan={72}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-b border-s border-button-primary"
                  colSpan={72}
                ></th>
                <th className="px-2 py-2 text-center text-xs" colSpan={8}></th>
              </tr>
              <tr>
                {Array.from({ length: 10 }).map((_, index) => (
                  <React.Fragment key={index}>
                    <td
                      className="px-2 py-2 text-center border-e text-xs border-button-primary"
                      colSpan={8}
                    ></td>
                    <td
                      className="px-2 py-2 text-center border-s text-xs border-button-primary"
                      colSpan={8}
                    ></td>
                  </React.Fragment>
                ))}
              </tr>
              <tr>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th
                  className="px-2 py-2 text-center border border-button-primary text-xs"
                  colSpan={14}
                >
                  UPTD Pengelolaan Pasar Tambun
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th
                  className="px-2 py-2 text-center border border-button-primary text-xs"
                  colSpan={14}
                >
                  UPTD Pengelolaan Pasar Cibitung dan Sukatani
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th
                  className="px-2 py-2 text-center border border-button-primary text-xs"
                  colSpan={14}
                >
                  UPTD Pengelolaan Pasar Setu
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th
                  className="px-2 py-2 text-center border border-button-primary text-xs"
                  colSpan={14}
                >
                  UPTD Pengelolaan Pasar Baru Cikarang dan Pertokoan
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th
                  className="px-2 py-2 text-center border border-button-primary text-xs"
                  colSpan={14}
                >
                  UPTD Pengelolaan Pasar Lemah Abang Kedung Gede
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th
                  className="px-2 py-2 text-center border border-button-primary text-xs"
                  colSpan={14}
                >
                  UPTD Pengelolaan Pasar Babelan
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th
                  className="px-2 py-2 text-center border border-button-primary text-xs"
                  colSpan={14}
                >
                  UPTD Pengelolaan Pasar Tarumajaya
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th
                  className="px-2 py-2 text-center border border-button-primary text-xs"
                  colSpan={14}
                >
                  UPTD Pengelolaan Pasar Serang
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th
                  className="px-2 py-2 text-center border border-button-primary text-xs"
                  colSpan={14}
                >
                  UPTD Pengelolaan Pasar Cibarusah
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th
                  className="px-2 py-2 text-center border border-button-primary text-xs"
                  colSpan={14}
                >
                  UPTD Metrologi Legal
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
              </tr>
              <tr>
                {Array.from({ length: 10 }).map((_, index) => (
                  <React.Fragment key={index}>
                    {ArrayUptdFungsionalLength[index] > 0 ? (
                      <td className="px-2 py-2 text-center text-xs border-s border-t border-button-primary"></td>
                    ) : (
                      <td className="px-2 py-2 text-center text-xs"></td>
                    )}
                    <td
                      className="px-2 py-2 text-center text-xs badge-map"
                      colSpan={14}
                    >
                      Kelas 9
                    </td>
                    <td className="px-2 py-2 text-center text-xs"></td>
                  </React.Fragment>
                ))}
              </tr>
              <tr>
                {Array.from({ length: 10 }).map((_, index) => (
                  <React.Fragment key={index}>
                    {ArrayUptdFungsionalLength[index] > 0 ? (
                      <td
                        className="px-2 py-2 text-center border-s text-xs border-button-primary"
                        colSpan={1}
                      ></td>
                    ) : (
                      <td
                        className="px-2 py-2 text-center text-xs"
                        colSpan={1}
                      ></td>
                    )}
                    <td
                      className={
                        `px-2 py-2 text-center border-e text-xs border-button-primary ${ArrayUptdFungsionalLength[index] > 0 ? "border-dashed" : ""}`
                      }
                      colSpan={7}
                    ></td>
                    <td
                      className={
                        `px-2 py-2 text-center border-s text-xs border-button-primary ${ArrayUptdFungsionalLength[index] > 0 ? "border-dashed" : ""}`
                      }
                      colSpan={8}
                    ></td>
                  </React.Fragment>
                ))}
              </tr>
              <tr>
                {Array.from({ length: 10 }).map((_, index) => (
                  <React.Fragment key={index}>
                    {ArrayUptdFungsionalLength[index] > 0 ? (
                      <td
                        className="px-2 py-2 text-center border-s text-xs border-button-primary"
                        colSpan={1}
                      ></td>
                    ) : (
                      <td
                        className="px-2 py-2 text-center text-xs"
                        colSpan={1}
                      ></td>
                    )}
                    <td
                      className={
                        `px-2 py-2 text-center border-e text-xs border-button-primary ${ArrayUptdFungsionalLength[index] > 0 ? "border-dashed" : ""}`
                      }
                      colSpan={7}
                    ></td>
                    <td
                      className={
                        `px-2 py-2 text-center border-s text-xs border-button-primary ${ArrayUptdFungsionalLength[index] > 0 ? "border-dashed" : ""}`
                      }
                      colSpan={8}
                    ></td>
                  </React.Fragment>
                ))}
              </tr>

              <tr>
                {Array.from({ length: 10 }).map((_, index) => {
                  return ArrayUptdFungsionalLength[index] > 0 ? (
                    <React.Fragment key={index}>
                      <th className="px-2 py-2 text-center text-xs border-s border-button-primary"></th>
                      <th
                        className="px-2 py-2 badge-map text-center text-xs"
                        colSpan={8}
                      >
                        Jabatan Fungsional
                      </th>
                      <th
                        className="px-2 py-2 badge-map text-center text-xs"
                        colSpan={2}
                      >
                        Kelas
                      </th>
                      <th className="px-2 py-2 badge-map text-center text-xs">
                        B
                      </th>
                      <th className="px-2 py-2 badge-map text-center text-xs">
                        K
                      </th>
                      <th className="px-2 py-2 badge-map text-center text-xs">
                        (+)
                      </th>
                      <th className="px-2 py-2 badge-map text-center text-xs">
                        (-)
                      </th>
                      <th className="px-2 py-2 text-center text-xs"></th>
                    </React.Fragment>
                  ): (
                    <React.Fragment key={index}>
                      <th
                        className="px-2 py-2 text-center text-xs border-e border-button-primary"
                        colSpan={8}
                      >
                      </th>
                      <th
                        className="px-2 py-2 text-center text-xs"
                        colSpan={8}
                      >
                      </th>
                    </React.Fragment>
                  )
                })}
              </tr>
              {dataToRenderUPTDFungsional.map((_, index) => {
                const itemUptd1 = uptd1.filter(it => it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemUptd2 = uptd2.filter(it => it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemUptd3 = uptd3.filter(it => it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemUptd4 = uptd4.filter(it => it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemUptd5 = uptd5.filter(it => it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemUptd6 = uptd6.filter(it => it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemUptd7 = uptd7.filter(it => it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemUptd8 = uptd8.filter(it => it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemUptd9 = uptd9.filter(it => it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemMetrologi = uptdMetrologiLegal.filter(it => it.name.toUpperCase().includes('AHLI'))[index] || {};
                return (
                  <React.Fragment key={index}>
                    <tr>
                      {itemUptd1.name ? (
                        <th className="px-2 py-2 text-center text-xs border-s border-button-primary"></th>
                      ) : (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      )}
                      {itemUptd1.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={8}
                        >
                          {itemUptd1.name || "-"}
                        </td>
                      ) : uptd1.filter(it => it.name.toUpperCase().includes('AHLI')).length > 0 ? (
                        <React.Fragment>
                          <td
                            rowSpan={2}
                            colSpan={8}
                            className="px-2 py-2 text-center text-xs"
                          ></td>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <td
                            rowSpan={2}
                            colSpan={7}
                            className="px-2 py-2 text-center text-xs border-e border-button-primary"
                          ></td>
                          <td
                            rowSpan={2}
                            colSpan={1}
                            className="px-2 py-2 text-center text-xs"
                          ></td>
                        </React.Fragment>
                      )}
                      {itemUptd1.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemUptd1.class ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd1.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd1.b ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd1.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd1.k ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd1.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd1.plus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd1.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd1.minus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd1.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></th>
                      )}

                      {itemUptd2.name ? (
                        <th className="px-2 py-2 text-center text-xs border-s border-button-primary"></th>
                      ) : (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      )}
                      {itemUptd2.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={8}
                        >
                          {itemUptd2.name || "-"}
                        </td>
                      ) : uptd2.filter(it => it.name.toUpperCase().includes('AHLI')).length > 0 ? (
                        <React.Fragment>
                          <td
                            rowSpan={2}
                            colSpan={8}
                            className="px-2 py-2 text-center text-xs"
                          ></td>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <td
                            rowSpan={2}
                            colSpan={7}
                            className="px-2 py-2 text-center text-xs border-e border-button-primary"
                          ></td>
                          <td
                            rowSpan={2}
                            colSpan={1}
                            className="px-2 py-2 text-center text-xs"
                          ></td>
                        </React.Fragment>
                      )}
                      {itemUptd2.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemUptd2.class ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd2.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd2.b ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd2.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd2.k ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd2.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd2.plus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd2.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd2.minus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd2.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></th>
                      )}

                      {itemUptd3.name ? (
                        <th className="px-2 py-2 text-center text-xs border-s border-button-primary"></th>
                      ) : (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      )}
                      {itemUptd3.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={8}
                        >
                          {itemUptd3.name || "-"}
                        </td>
                      ) : uptd3.filter(it => it.name.toUpperCase().includes('AHLI')).length > 0 ? (
                        <React.Fragment>
                          <td
                            rowSpan={2}
                            colSpan={8}
                            className="px-2 py-2 text-center text-xs"
                          ></td>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <td
                            rowSpan={2}
                            colSpan={7}
                            className="px-2 py-2 text-center text-xs border-e border-button-primary"
                          ></td>
                          <td
                            rowSpan={2}
                            colSpan={1}
                            className="px-2 py-2 text-center text-xs"
                          ></td>
                        </React.Fragment>
                      )}
                      {itemUptd3.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemUptd3.class ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd3.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd3.b ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd3.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd3.k ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd3.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd3.plus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd3.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd3.minus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd3.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></th>
                      )}

                      {itemUptd4.name ? (
                        <th className="px-2 py-2 text-center text-xs border-s border-button-primary"></th>
                      ) : (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      )}
                      {itemUptd4.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={8}
                        >
                          {itemUptd4.name || "-"}
                        </td>
                      ) : uptd4.filter(it => it.name.toUpperCase().includes('AHLI')).length > 0 ? (
                        <React.Fragment>
                          <td
                            rowSpan={2}
                            colSpan={8}
                            className="px-2 py-2 text-center text-xs"
                          ></td>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <td
                            rowSpan={2}
                            colSpan={7}
                            className="px-2 py-2 text-center text-xs border-e border-button-primary"
                          ></td>
                          <td
                            rowSpan={2}
                            colSpan={1}
                            className="px-2 py-2 text-center text-xs"
                          ></td>
                        </React.Fragment>
                      )}
                      {itemUptd4.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemUptd4.class ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd4.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd4.b ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd4.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd4.k ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd4.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd4.plus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd4.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd4.minus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd4.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></th>
                      )}

                      {itemUptd5.name ? (
                        <th className="px-2 py-2 text-center text-xs border-s border-button-primary"></th>
                      ) : (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      )}
                      {itemUptd5.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={8}
                        >
                          {itemUptd5.name || "-"}
                        </td>
                      ) : uptd5.filter(it => it.name.toUpperCase().includes('AHLI')).length > 0 ? (
                        <React.Fragment>
                          <td
                            rowSpan={2}
                            colSpan={8}
                            className="px-2 py-2 text-center text-xs"
                          ></td>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <td
                            rowSpan={2}
                            colSpan={7}
                            className="px-2 py-2 text-center text-xs border-e border-button-primary"
                          ></td>
                          <td
                            rowSpan={2}
                            colSpan={1}
                            className="px-2 py-2 text-center text-xs"
                          ></td>
                        </React.Fragment>
                      )}
                      {itemUptd5.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemUptd5.class ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd5.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd5.b ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd5.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd5.k ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd5.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd5.plus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd5.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd5.minus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd5.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></th>
                      )}

                      {itemUptd6.name ? (
                        <th className="px-2 py-2 text-center text-xs border-s border-button-primary"></th>
                      ) : (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      )}
                      {itemUptd6.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={8}
                        >
                          {itemUptd6.name || "-"}
                        </td>
                      ) : uptd6.filter(it => it.name.toUpperCase().includes('AHLI')).length > 0 ? (
                        <React.Fragment>
                          <td
                            rowSpan={2}
                            colSpan={8}
                            className="px-2 py-2 text-center text-xs"
                          ></td>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <td
                            rowSpan={2}
                            colSpan={7}
                            className="px-2 py-2 text-center text-xs border-e border-button-primary"
                          ></td>
                          <td
                            rowSpan={2}
                            colSpan={1}
                            className="px-2 py-2 text-center text-xs"
                          ></td>
                        </React.Fragment>
                      )}
                      {itemUptd6.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemUptd6.class ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd6.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd6.b ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd6.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd6.k ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd6.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd6.plus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd6.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd6.minus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd6.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></th>
                      )}

                      {itemUptd7.name ? (
                        <th className="px-2 py-2 text-center text-xs border-s border-button-primary"></th>
                      ) : (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      )}
                      {itemUptd7.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={8}
                        >
                          {itemUptd7.name || "-"}
                        </td>
                      ) : uptd7.filter(it => it.name.toUpperCase().includes('AHLI')).length > 0 ? (
                        <React.Fragment>
                          <td
                            rowSpan={2}
                            colSpan={8}
                            className="px-2 py-2 text-center text-xs"
                          ></td>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <td
                            rowSpan={2}
                            colSpan={7}
                            className="px-2 py-2 text-center text-xs border-e border-button-primary"
                          ></td>
                          <td
                            rowSpan={2}
                            colSpan={1}
                            className="px-2 py-2 text-center text-xs"
                          ></td>
                        </React.Fragment>
                      )}
                      {itemUptd7.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemUptd7.class ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd7.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd7.b ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd7.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd7.k ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd7.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd7.plus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd7.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd7.minus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd7.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></th>
                      )}

                      {itemUptd8.name ? (
                        <th className="px-2 py-2 text-center text-xs border-s border-button-primary"></th>
                      ) : (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      )}
                      {itemUptd8.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={8}
                        >
                          {itemUptd8.name || "-"}
                        </td>
                      ) : uptd8.filter(it => it.name.toUpperCase().includes('AHLI')).length > 0 ? (
                        <React.Fragment>
                          <td
                            rowSpan={2}
                            colSpan={8}
                            className="px-2 py-2 text-center text-xs"
                          ></td>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <td
                            rowSpan={2}
                            colSpan={7}
                            className="px-2 py-2 text-center text-xs border-e border-button-primary"
                          ></td>
                          <td
                            rowSpan={2}
                            colSpan={1}
                            className="px-2 py-2 text-center text-xs"
                          ></td>
                        </React.Fragment>
                      )}
                      {itemUptd8.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemUptd8.class ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd8.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd8.b ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd8.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd8.k ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd8.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd8.plus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd8.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd8.minus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd8.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></th>
                      )}

                      {itemUptd9.name ? (
                        <th className="px-2 py-2 text-center text-xs border-s border-button-primary"></th>
                      ) : (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      )}
                      {itemUptd9.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={8}
                        >
                          {itemUptd9.name || "-"}
                        </td>
                      ) : uptd9.filter(it => it.name.toUpperCase().includes('AHLI')).length > 0 ? (
                        <React.Fragment>
                          <td
                            rowSpan={2}
                            colSpan={8}
                            className="px-2 py-2 text-center text-xs"
                          ></td>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <td
                            rowSpan={2}
                            colSpan={7}
                            className="px-2 py-2 text-center text-xs border-e border-button-primary"
                          ></td>
                          <td
                            rowSpan={2}
                            colSpan={1}
                            className="px-2 py-2 text-center text-xs"
                          ></td>
                        </React.Fragment>
                      )}
                      {itemUptd9.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemUptd9.class ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd9.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd9.b ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd9.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd9.k ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd9.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd9.plus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd9.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd9.minus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd9.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></th>
                      )}

                      {itemMetrologi.name ? (
                        <th className="px-2 py-2 text-center text-xs border-s border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemMetrologi.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          colSpan={8}
                          rowSpan={2}
                        >
                          {itemMetrologi.name}
                        </td>
                      ) : uptdMetrologiLegal.filter(it => it.name.toUpperCase().includes('AHLI')).length > 0 ? (
                        <React.Fragment>
                          <td
                            rowSpan={2}
                            colSpan={8}
                            className="px-2 py-2 text-center text-xs"
                          ></td>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <td
                            rowSpan={2}
                            colSpan={7}
                            className="px-2 py-2 text-center text-xs border-e border-button-primary"
                          ></td>
                          <td
                            rowSpan={2}
                            colSpan={1}
                            className="px-2 py-2 text-center text-xs"
                          ></td>
                        </React.Fragment>
                      )}
                      {itemMetrologi.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        >
                          {itemMetrologi.class}
                        </td>
                      ) : (
                        <th colSpan={2} rowSpan={2}></th>
                      )}
                      {itemMetrologi.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemMetrologi.b}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      {itemMetrologi.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemMetrologi.k}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      {itemMetrologi.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemMetrologi.plus}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      {itemMetrologi.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemMetrologi.minus}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      {itemMetrologi.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                    </tr>
                    <tr>
                      {itemUptd1.name ? (
                        <th className="border-s border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd2.name ? (
                        <th className="border-s border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd3.name ? (
                        <th className="border-s border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd4.name ? (
                        <th className="border-s border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd5.name ? (
                        <th className="border-s border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd6.name ? (
                        <th className="border-s border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd7.name ? (
                        <th className="border-s border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd8.name ? (
                        <th className="border-s border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd9.name ? (
                        <th className="border-s border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemMetrologi.name ? (
                        <th className="border-s border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                    </tr>
                  </React.Fragment>
                );
              })}
              <tr>
                {Array.from({ length: 10 }).map((_, index) => {
                  return ArrayUptdFungsionalLength[index] > 0 ? (
                    <React.Fragment>
                      <td
                        className="px-2 py-2 text-center border-s text-xs border-button-primary"
                        colSpan={8}
                      ></td>
                      <td
                        className="px-2 py-2 text-center text-xs"
                        colSpan={8}
                      ></td>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <td
                        className="px-2 py-2 text-center border-e text-xs border-button-primary"
                        colSpan={8}
                      ></td>
                      <td
                        className="px-2 py-2 text-center border-s text-xs border-button-primary"
                        colSpan={8}
                      ></td>
                    </React.Fragment>
                  )
                })}
              </tr>

              <tr>
                {Array.from({ length: 10 }).map((_, index) => (
                  <React.Fragment key={index}>
                    {ArrayUptdFungsionalLength[index] > 0 ? (
                      <th className="px-2 py-2 text-center text-xs border-s border-b border-button-primary"></th>
                    ) : (
                      <th className="px-2 py-2 text-center text-xs"></th>
                    )}
                    <th
                      className="px-2 py-2 text-center border border-button-primary text-xs"
                      colSpan={14}
                    >
                      Kepala Subbagian Tata Usaha
                    </th>
                    <th className="px-2 py-2 text-center text-xs"></th>
                  </React.Fragment>
                ))}
              </tr>
              <tr>
                {Array.from({ length: 10 }).map((_, index) => (
                  <React.Fragment key={index}>
                    <td className="px-2 py-2 text-center text-xs"></td>
                    <td
                      className="px-2 py-2 text-center text-xs badge-map"
                      colSpan={14}
                    >
                      Kelas 8
                    </td>
                    <td className="px-2 py-2 text-center text-xs"></td>
                  </React.Fragment>
                ))}
              </tr>
              <tr>
                {Array.from({ length: 10 }).map((_, index) => (
                  <React.Fragment key={index}>
                    <td
                      className="px-2 py-2 border-e border-button-primary text-center text-xs"
                      colSpan={8}
                    ></td>
                    <td className="px-2 py-2 text-xs" colSpan={8}></td>
                  </React.Fragment>
                ))}
              </tr>
              <tr>
                {Array.from({ length: 10 }).map((_, index) => (
                  <React.Fragment key={index}>
                    <td
                      className="px-2 py-2 border-e border-button-primary text-center text-xs"
                      colSpan={8}
                    ></td>
                    <td className="px-2 py-2 text-xs" colSpan={8}></td>
                  </React.Fragment>
                ))}
              </tr>
              <tr>
                {Array.from({ length: 10 }).map((_, index) => (
                  <React.Fragment key={index}>
                    <th className="px-2 py-2 text-center text-xs"></th>
                    <th
                      className="px-2 py-2 badge-map text-center text-xs"
                      colSpan={8}
                    >
                      Jabatan Pelaksana
                    </th>
                    <th
                      className="px-2 py-2 badge-map text-center text-xs"
                      colSpan={2}
                    >
                      Kelas
                    </th>
                    <th className="px-2 py-2 badge-map text-center text-xs">
                      B
                    </th>
                    <th className="px-2 py-2 badge-map text-center text-xs">
                      K
                    </th>
                    <th className="px-2 py-2 badge-map text-center text-xs">
                      (+)
                    </th>
                    <th className="px-2 py-2 badge-map text-center text-xs">
                      (-)
                    </th>
                    <th className="px-2 py-2 text-center text-xs"></th>
                  </React.Fragment>
                ))}
              </tr>
              {dataToRenderUPTD.map((_, index) => {
                const itemUptd1 = uptd1.filter(it => !it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemUptd2 = uptd2.filter(it => !it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemUptd3 = uptd3.filter(it => !it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemUptd4 = uptd4.filter(it => !it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemUptd5 = uptd5.filter(it => !it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemUptd6 = uptd6.filter(it => !it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemUptd7 = uptd7.filter(it => !it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemUptd8 = uptd8.filter(it => !it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemUptd9 = uptd9.filter(it => !it.name.toUpperCase().includes('AHLI'))[index] || {};
                const itemMetrologi = uptdMetrologiLegal.filter(it => !it.name.toUpperCase().includes('AHLI'))[index] || {};
                return (
                  <React.Fragment key={index}>
                    <tr>
                      {itemUptd1.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      )}
                      {itemUptd1.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={8}
                        >
                          {itemUptd1.name || "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={8}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd1.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemUptd1.class ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd1.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd1.b ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd1.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd1.k ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd1.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd1.plus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd1.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd1.minus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd1.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></th>
                      )}

                      {itemUptd2.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      )}
                      {itemUptd2.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={8}
                        >
                          {itemUptd2.name || "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={8}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd2.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemUptd2.class ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd2.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd2.b ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd2.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd2.k ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd2.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd2.plus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd2.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd2.minus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd2.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></th>
                      )}

                      {itemUptd3.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      )}
                      {itemUptd3.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={8}
                        >
                          {itemUptd3.name || "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={8}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd3.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemUptd3.class ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd3.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd3.b ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd3.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd3.k ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd3.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd3.plus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd3.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd3.minus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd3.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></th>
                      )}

                      {itemUptd4.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      )}
                      {itemUptd4.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={8}
                        >
                          {itemUptd4.name || "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={8}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd4.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemUptd4.class ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd4.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd4.b ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd4.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd4.k ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd4.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd4.plus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd4.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd4.minus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd4.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></th>
                      )}

                      {itemUptd5.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      )}
                      {itemUptd5.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={8}
                        >
                          {itemUptd5.name || "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={8}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd5.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemUptd5.class ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd5.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd5.b ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd5.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd5.k ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd5.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd5.plus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd5.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd5.minus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd5.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></th>
                      )}

                      {itemUptd6.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      )}
                      {itemUptd6.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={8}
                        >
                          {itemUptd6.name || "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={8}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd6.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemUptd6.class ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd6.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd6.b ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd6.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd6.k ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd6.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd6.plus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd6.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd6.minus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd6.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></th>
                      )}
                      {itemUptd7.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      )}
                      {itemUptd7.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={8}
                        >
                          {itemUptd7.name || "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={8}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd7.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemUptd7.class ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd7.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd7.b ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd7.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd7.k ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd7.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd7.plus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd7.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd7.minus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd7.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></th>
                      )}

                      {itemUptd8.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      )}
                      {itemUptd8.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={8}
                        >
                          {itemUptd8.name || "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={8}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd8.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemUptd8.class ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd8.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd8.b ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd8.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd8.k ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd8.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd8.plus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd8.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd8.minus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd8.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></th>
                      )}

                      {itemUptd9.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      )}
                      {itemUptd9.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={8}
                        >
                          {itemUptd9.name || "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={8}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd9.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={2}
                        >
                          {itemUptd9.class ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd9.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd9.b ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd9.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd9.k ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd9.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd9.plus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd9.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUptd9.minus ?? "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></td>
                      )}
                      {itemUptd9.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          rowSpan={2}
                          className="px-2 py-2 text-center text-xs"
                        ></th>
                      )}

                      {itemMetrologi.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemMetrologi.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          colSpan={8}
                          rowSpan={2}
                        >
                          {itemMetrologi.name}
                        </td>
                      ) : (
                        <th colSpan={8} rowSpan={2}></th>
                      )}
                      {itemMetrologi.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        >
                          {itemMetrologi.class}
                        </td>
                      ) : (
                        <th colSpan={2} rowSpan={2}></th>
                      )}
                      {itemMetrologi.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemMetrologi.b}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      {itemMetrologi.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemMetrologi.k}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      {itemMetrologi.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemMetrologi.plus}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      {itemMetrologi.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemMetrologi.minus}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      {itemMetrologi.name ? (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                    </tr>
                    <tr>
                      {itemUptd1.name ? (
                        <th></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd2.name ? (
                        <th></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd3.name ? (
                        <th></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd4.name ? (
                        <th></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd5.name ? (
                        <th></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd6.name ? (
                        <th></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd7.name ? (
                        <th></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd8.name ? (
                        <th></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd9.name ? (
                        <th></th>
                      ) : (
                        <th></th>
                      )}
                      {itemMetrologi.name ? (
                        <th></th>
                      ) : (
                        <th></th>
                      )}
                    </tr>
                  </React.Fragment>
                );
              })}
              <tr>
                <th
                  className="px-2 py-2 text-center text-xs"
                  colSpan={160}
                ></th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
