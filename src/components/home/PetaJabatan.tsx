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

  const dataToRenderPKUmpeg =
    perencanaanKeuangan.length >= umpeg.length ? perencanaanKeuangan : umpeg;

  const dataToRenderKabid = [
    { name: "ln", data: ln },
    { name: "spl", data: spl },
    { name: "kemetrologian", data: kemetrologian },
    { name: "pbpp", data: pbpp },
  ].sort((a, b) => b.data.length - a.data.length)[0].data;

  const dataToRenderUPTD = [
    { name: "uptd1", data: uptd1 },
    { name: "uptd2", data: uptd2 },
    { name: "uptd3", data: uptd3 },
    { name: "uptd4", data: uptd4 },
    { name: "uptd5", data: uptd5 },
    { name: "uptd6", data: uptd6 },
    { name: "uptd7", data: uptd7 },
    { name: "uptd8", data: uptd8 },
    { name: "uptd9", data: uptd9 },
    { name: "uptdMetrologiLegal", data: uptdMetrologiLegal },
  ].sort((a, b) => b.data.length - a.data.length)[0].data;

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
                  colSpan={16}
                ></td>
                <th
                  className="px-2 py-2 text-center border border-button-primary text-xs"
                  colSpan={14}
                >
                  Sekretaris
                </th>
                <td
                  className="px-2 py-2 border-s border-button-primary text-center text-xs"
                  colSpan={50}
                ></td>
              </tr>
              <tr>
                <td
                  className="px-2 py-2 border-e border-button-primary text-center text-xs"
                  colSpan={80}
                ></td>
                <td
                  className="px-2 py-2 border-s border-button-primary text-center text-xs"
                  colSpan={16}
                ></td>
                <td
                  className="px-2 py-2 text-center text-xs badge-map"
                  colSpan={14}
                >
                  Kelas 12
                </td>
                <td
                  className="px-2 py-2 border-s border-button-primary text-center text-xs"
                  colSpan={50}
                ></td>
              </tr>
              <tr>
                <td
                  className="px-2 py-2 border-e border-button-primary text-center text-xs"
                  colSpan={80}
                ></td>
                <td className="px-2 py-2 text-center text-xs" colSpan={15}></td>
                <td
                  className="px-2 py-2 border-e border-b border-button-primary text-center text-xs"
                  colSpan={8}
                ></td>
                <td
                  className="px-2 py-2 border-s border-b border-button-primary text-center text-xs"
                  colSpan={8}
                ></td>
                <td className="px-2 py-2 text-center text-xs" colSpan={49}></td>
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
                  className="px-2 py-2 border-e border-button-primary text-center text-xs"
                  colSpan={8}
                ></td>
                <td className="px-2 py-2 text-center text-xs" colSpan={49}></td>
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
                <th className="px-2 py-2 text-center text-xs" colSpan={42}></th>
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
                <th className="px-2 py-2 text-center text-xs" colSpan={42}></th>
              </tr>
              <tr>
                <th
                  className="px-2 py-2 text-center text-xs border-e border-button-primary"
                  colSpan={80}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-e border-button-primary"
                  colSpan={9}
                ></th>
                <th
                  className="px-2 py-2 text-center text-xs border-e border-button-primary"
                  colSpan={16}
                ></th>
                <th className="px-2 py-2 text-center text-xs" colSpan={55}></th>
              </tr>
              <tr>
                <th
                  className="px-2 py-2 text-center text-xs border-e border-button-primary"
                  colSpan={80}
                ></th>
                <th className="px-2 py-2 text-center text-xs" colSpan={7}></th>
                {Array.from({ length: 2 }).map((_, index) => (
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
                      Jabatan
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
                <th className="px-2 py-2 text-center text-xs" colSpan={48}></th>
              </tr>
              {dataToRenderPKUmpeg.map((_, index) => {
                const itemPK = perencanaanKeuangan[index] || {};
                const itemUmpeg = umpeg[index] || {};
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
                        <th colSpan={2} rowSpan={2}></th>
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
                        <td colSpan={6} rowSpan={2}></td>
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
                          className="px-2 py-2 text-center text-xs"
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th rowSpan={2}></th>
                      )}

                      {itemUmpeg.name ? (
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <td colSpan={2} rowSpan={2}></td>
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
                        <th rowSpan={2}></th>
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
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                        >
                          {itemUmpeg.minus}
                        </td>
                      ) : (
                        <th rowSpan={2}></th>
                      )}
                      <th
                        className="px-2 py-2 text-center text-xs"
                        rowSpan={2}
                      ></th>

                      <th
                        className="px-2 py-2 text-center text-xs"
                        colSpan={48}
                        rowSpan={2}
                      ></th>
                    </tr>
                    <tr>
                      {itemPK.name ? (
                        <th className="px-2 py-2 text-center text-xs border-t border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      <th className="px-2 py-2 text-center text-xs border-t border-button-primary"></th>
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
                    <th className="px-2 py-2 text-center text-xs"></th>
                    <th
                      className="px-2 py-2 badge-map text-center text-xs"
                      colSpan={6}
                    >
                      Jabatan
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
                const itemLN = ln[index] || {};
                const itemSPL = spl[index] || {};
                const itemKemetrologian = kemetrologian[index] || {};
                const itemPBPP = pbpp[index] || {};
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
                        <th colSpan={2} rowSpan={2}></th>
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
                        <th colSpan={2} rowSpan={2}></th>
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
                        <th colSpan={2} rowSpan={2}></th>
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
                        <th colSpan={2} rowSpan={2}></th>
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
                        <th className="px-2 py-2 text-center text-xs border-t border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemSPL.name ? (
                        <th className="px-2 py-2 text-center text-xs border-t border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemKemetrologian.name ? (
                        <th className="px-2 py-2 text-center text-xs border-t border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemPBPP.name ? (
                        <th className="px-2 py-2 text-center text-xs border-t border-button-primary"></th>
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
                    <td className="px-2 py-2 text-center text-xs"></td>
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
                {Array.from({ length: 10 }).map((_, index) => (
                  <React.Fragment key={index}>
                    <th className="px-2 py-2 text-center text-xs"></th>
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
                      colSpan={2}
                    ></td>
                    <td className="px-2 py-2 text-xs" colSpan={14}></td>
                  </React.Fragment>
                ))}
              </tr>
              <tr>
                {Array.from({ length: 10 }).map((_, index) => (
                  <React.Fragment key={index}>
                    <th
                      className="px-2 py-2 border-e border-button-primary text-center text-xs"
                      colSpan={2}
                    ></th>
                    <th className="px-2 py-2 text-center text-xs"></th>
                    <th
                      className="px-2 py-2 badge-map text-center text-xs"
                      colSpan={6}
                    >
                      Jabatan
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
                const itemUptd1 = uptd1[index] || {};
                const itemUptd2 = uptd2[index] || {};
                const itemUptd3 = uptd3[index] || {};
                const itemUptd4 = uptd4[index] || {};
                const itemUptd5 = uptd5[index] || {};
                const itemUptd6 = uptd6[index] || {};
                const itemUptd7 = uptd7[index] || {};
                const itemUptd8 = uptd8[index] || {};
                const itemUptd9 = uptd9[index] || {};
                const itemMetrologi = uptdMetrologiLegal[index] || {};
                return (
                  <React.Fragment key={index}>
                    <tr>
                      {itemUptd1.name ? (
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          className="px-2 py-2 text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      )}
                      {itemUptd1.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      )}
                      {itemUptd1.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          rowSpan={2}
                          colSpan={6}
                        >
                          {itemUptd1.name || "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={6}
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
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          colSpan={2}
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
                          colSpan={6}
                        >
                          {itemUptd2.name || "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={6}
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
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          colSpan={2}
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
                          colSpan={6}
                        >
                          {itemUptd3.name || "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={6}
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
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          colSpan={2}
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
                          colSpan={6}
                        >
                          {itemUptd4.name || "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={6}
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
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          colSpan={2}
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
                          colSpan={6}
                        >
                          {itemUptd5.name || "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={6}
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
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          colSpan={2}
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
                          colSpan={6}
                        >
                          {itemUptd6.name || "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={6}
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
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          colSpan={2}
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
                          colSpan={6}
                        >
                          {itemUptd7.name || "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={6}
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
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          colSpan={2}
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
                          colSpan={6}
                        >
                          {itemUptd8.name || "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={6}
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
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th
                          colSpan={2}
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
                          colSpan={6}
                        >
                          {itemUptd9.name || "-"}
                        </td>
                      ) : (
                        <td
                          rowSpan={2}
                          colSpan={6}
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
                        <th
                          className="px-2 py-2 border-e border-button-primary text-center text-xs"
                          colSpan={2}
                          rowSpan={2}
                        ></th>
                      ) : (
                        <th colSpan={2} rowSpan={2}></th>
                      )}
                      {itemMetrologi.name ? (
                        <th className="px-2 py-2 text-center text-xs"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemMetrologi.name ? (
                        <td
                          className="px-2 py-2 border border-button-primary text-center text-xs"
                          colSpan={6}
                          rowSpan={2}
                        >
                          {itemMetrologi.name}
                        </td>
                      ) : (
                        <th colSpan={6} rowSpan={2}></th>
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
                        <th className="px-2 py-2 text-center text-xs border-t border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd2.name ? (
                        <th className="px-2 py-2 text-center text-xs border-t border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd3.name ? (
                        <th className="px-2 py-2 text-center text-xs border-t border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd4.name ? (
                        <th className="px-2 py-2 text-center text-xs border-t border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd5.name ? (
                        <th className="px-2 py-2 text-center text-xs border-t border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd6.name ? (
                        <th className="px-2 py-2 text-center text-xs border-t border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd7.name ? (
                        <th className="px-2 py-2 text-center text-xs border-t border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd8.name ? (
                        <th className="px-2 py-2 text-center text-xs border-t border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemUptd9.name ? (
                        <th className="px-2 py-2 text-center text-xs border-t border-button-primary"></th>
                      ) : (
                        <th></th>
                      )}
                      {itemMetrologi.name ? (
                        <th className="px-2 py-2 text-center text-xs border-t border-button-primary"></th>
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
