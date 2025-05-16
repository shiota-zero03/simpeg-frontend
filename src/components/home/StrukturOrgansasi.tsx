import React, { useEffect, useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Button } from "@heroui/react";
import { LucideDownloadCloud } from "lucide-react";
import { LuFullscreen } from "react-icons/lu";
import { useGetAllJabatanHirarki } from "@/services/jabatan";
import { Commet } from "react-loading-indicators";
import UserPNG from "@/assets/user.png";

interface StrukturDataProps {
  name: string;
  jabatan: string;
  picture: string;
}

export default function BigTable() {
  const [kadin, setKadin] = useState<StrukturDataProps>();
  const [sekdin, setSekdin] = useState<StrukturDataProps>();
  const [kasuang, setKasuang] = useState<StrukturDataProps>();
  const [kasumum, setKasumum] = useState<StrukturDataProps>();
  // const [jabfungdin, setJabfungdin] = useState<{name: string; jabatan: string}[]>([]);

  const [kabidpln, setKabidpln] = useState<StrukturDataProps>();
  // const [jabfungpln, setJabfungpln] = useState<{name: string; jabatan: string}[]>([]);
  const [kabidDistribsu, setKabiddistribusi] = useState<StrukturDataProps>();
  // const [jabfungdistribusi, setJabfungdistribusi] = useState<{name: string; jabatan: string}[]>([]);
  const [kabidmetrologi, setKabidmetrologi] = useState<StrukturDataProps>();
  // const [jabfungmetrologi, setJabfungmetrologi] = useState<{name: string; jabatan: string}[]>([]);
  const [kabidpengendalian, setKabidpengendalian] =
  useState<StrukturDataProps>();
  // const [jabfungpengendalian, setJabfungpengendalian] = useState<{name: string; jabatan: string}[]>([]);
  
  const [kepalaUptd1, setKepalaUptd1] = useState<StrukturDataProps>();
  const [kepalaUptd2, setKepalaUptd2] = useState<StrukturDataProps>();
  const [kepalaUptd3, setKepalaUptd3] = useState<StrukturDataProps>();
  const [kepalaUptd4, setKepalaUptd4] = useState<StrukturDataProps>();
  const [kepalaUptd5, setKepalaUptd5] = useState<StrukturDataProps>();
  const [kepalaUptd6, setKepalaUptd6] = useState<StrukturDataProps>();
  const [kepalaUptd7, setKepalaUptd7] = useState<StrukturDataProps>();
  const [kepalaUptd8, setKepalaUptd8] = useState<StrukturDataProps>();
  const [kepalaUptd9, setKepalaUptd9] = useState<StrukturDataProps>();
  const [kepalaUptdMetrologi, setKepalaUptdMetrologi] =
    useState<StrukturDataProps>();

  const [kepalaTUUptd1, setKepalaTUUptd1] = useState<StrukturDataProps>();
  const [kepalaTUUptd2, setKepalaTUUptd2] = useState<StrukturDataProps>();
  const [kepalaTUUptd3, setKepalaTUUptd3] = useState<StrukturDataProps>();
  const [kepalaTUUptd4, setKepalaTUUptd4] = useState<StrukturDataProps>();
  const [kepalaTUUptd5, setKepalaTUUptd5] = useState<StrukturDataProps>();
  const [kepalaTUUptd6, setKepalaTUUptd6] = useState<StrukturDataProps>();
  const [kepalaTUUptd7, setKepalaTUUptd7] = useState<StrukturDataProps>();
  const [kepalaTUUptd8, setKepalaTUUptd8] = useState<StrukturDataProps>();
  const [kepalaTUUptd9, setKepalaTUUptd9] = useState<StrukturDataProps>();
  const [kepalaTUUptdMetrologi, setKepalaTUUptdMetrologi] =
    useState<StrukturDataProps>();

  const { data, refetch, isFetching } = useGetAllJabatanHirarki();
  const DATA_FETCHING = useMemo(() => {
    if (data) return data.data;
    return [];
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (!isFetching && DATA_FETCHING) {
      // const newItemsJabfungDIN = DATA_FETCHING.filter((it) =>
      //   (
      //     it.nameJob.toUpperCase().includes("ANALIS PERDAGANGAN") || 
      //     it.nameJob.toUpperCase().includes("PENGAWAS PERDAGANGAN") || 
      //     it.nameJob.toUpperCase().includes("PENGAWAS KEMETROLOGIAN") || 
      //     it.nameJob.toUpperCase().includes("PENERA")
      //   ),
      // );
      // let userjabfungDIN = newItemsJabfungDIN?.map(item => {
      //   return item.user;
      // }).flat();
      // let getJabfungNameJabatanDIN = userjabfungDIN.map((item) => {
      //   return {
      //     jabatan: item.jabatan.nameJob,
      //     name: item.name
      //   }
      // });
      // setJabfungdin(getJabfungNameJabatanDIN)

      const newItemsKadin = DATA_FETCHING.find((it) =>
        it.nameJob.toUpperCase().includes("KEPALA DINAS"),
      );
      const userKadin = newItemsKadin?.user?.[0];
      setKadin(
        userKadin
          ? {
              name: userKadin.name,
              jabatan: userKadin.jabatan.nameJob,
              picture: userKadin.photo ?? UserPNG,
            }
          : {
              name: "Kepala Dinas",
              jabatan: "Kepala Dinas",
              picture: UserPNG,
            },
      );

      const newItemsSekdin = DATA_FETCHING.find((it) =>
        it.nameJob.toUpperCase().includes("SEKRETARIS"),
      );
      const userSekdin = newItemsSekdin?.user?.[0];
      setSekdin(
        userSekdin
          ? {
              name: userSekdin.name,
              jabatan: userSekdin.jabatan.nameJob,
              picture: userSekdin.photo ?? UserPNG,
            }
          : {
              name: "Sekretaris",
              jabatan: "Sekretaris",
              picture: UserPNG,
            },
      );

      const newItemsKasuang = DATA_FETCHING.find((it) =>
        it.nameJob.toUpperCase().includes("KEUANGAN"),
      );
      const userKasuang = newItemsKasuang?.user?.[0];
      setKasuang(
        userKasuang
          ? {
              name: userKasuang.name,
              jabatan: userKasuang.jabatan.nameJob,
              picture: userKasuang.photo ?? UserPNG,
            }
          : {
              name: "Kepala Subbagian Keuangan",
              jabatan: "Kepala Subbagian Keuangan",
              picture: UserPNG,
            },
      );

      const newItemsKasumum = DATA_FETCHING.find((it) =>
        it.nameJob.toUpperCase().includes("UMUM DAN KEPEGAWAIAN"),
      );
      const userKasumum = newItemsKasumum?.user?.[0];
      setKasumum(
        userKasumum
          ? {
              name: userKasumum.name,
              jabatan: userKasumum.jabatan.nameJob,
              picture: userKasumum.photo ?? UserPNG,
            }
          : {
              name: "Kepala Subbagian Umum dan Kepegawaian",
              jabatan: "Kepala Subbagian Umum dan Kepegawaian",
              picture: UserPNG,
            },
      );

      const newItemsKabidPLN = DATA_FETCHING.find((it) =>
        it.nameJob.toUpperCase().includes("LUAR NEGERI"),
      );
      const userKabidPLN = newItemsKabidPLN?.user?.[0];
      setKabidpln(
        userKabidPLN
          ? {
              name: userKabidPLN.name,
              jabatan: userKabidPLN.jabatan.nameJob,
              picture: userKabidPLN.photo ?? UserPNG,
            }
          : {
              name: "	Kepala Bidang Pengembangan Perdagangan Luar Negeri",
              jabatan: "	Kepala Bidang Pengembangan Perdagangan Luar Negeri",
              picture: UserPNG,
            },
      );

      // const newItemsJabfungPLN = DATA_FETCHING.filter((it) =>
      //   it.parent?.nameJob.toUpperCase().includes("PERDAGANGAN LUAR NEGERI") && (
      //     it.nameJob.toUpperCase().includes("ANALIS PERDAGANGAN") || 
      //     it.nameJob.toUpperCase().includes("PENGAWAS PERDAGANGAN") || 
      //     it.nameJob.toUpperCase().includes("PENGAWAS KEMETROLOGIAN") || 
      //     it.nameJob.toUpperCase().includes("PENERA")
      //   ),
      // );
      // let userjabfungPLN = newItemsJabfungPLN?.map(item => {
      //   return item.user;
      // }).flat();
      // let getJabfungNameJabatan = userjabfungPLN.map((item) => {
      //   return {
      //     jabatan: item.jabatan.nameJob,
      //     name: item.name
      //   }
      // });
      // setJabfungpln(getJabfungNameJabatan)

      const newItemsKabidDistribisi = DATA_FETCHING.find((it) =>
        it.nameJob.toUpperCase().includes("PELAKU DISTRIBUSI"),
      );
      const userKabidDistribisi = newItemsKabidDistribisi?.user?.[0];
      setKabiddistribusi(
        userKabidDistribisi
          ? {
              name: userKabidDistribisi.name,
              jabatan: userKabidDistribisi.jabatan.nameJob,
              picture: userKabidDistribisi.photo ?? UserPNG,
            }
          : {
              name: "Kepala Bidang Sarana dan Pelaku Distribusi",
              jabatan: "Kepala Bidang Sarana dan Pelaku Distribusi",
              picture: UserPNG,
            },
      );

      // const newItemsJabfungDistribusi = DATA_FETCHING.filter((it) =>
      //   it.parent?.nameJob.toUpperCase().includes("PELAKU DISTRIBUSI") && (
      //     it.nameJob.toUpperCase().includes("ANALIS PERDAGANGAN") || 
      //     it.nameJob.toUpperCase().includes("PENGAWAS PERDAGANGAN") || 
      //     it.nameJob.toUpperCase().includes("PENGAWAS KEMETROLOGIAN") || 
      //     it.nameJob.toUpperCase().includes("PENERA")
      //   ),
      // );
      // let userjabfungDistribusi = newItemsJabfungDistribusi?.map(item => {
      //   return item.user;
      // }).flat();
      // let getJabfungNameJabatanDistribusi = userjabfungDistribusi.map((item) => {
      //   return {
      //     jabatan: item.jabatan.nameJob,
      //     name: item.name
      //   }
      // });
      // setJabfungdistribusi(getJabfungNameJabatanDistribusi)


      const newItemsKemetrologian = DATA_FETCHING.find((it) =>
        it.nameJob.toUpperCase().includes("BIDANG KEMETROLOGIAN"),
      );
      const userKemetrologian = newItemsKemetrologian?.user?.[0];
      setKabidmetrologi(
        userKemetrologian
          ? {
              name: userKemetrologian.name,
              jabatan: userKemetrologian.jabatan.nameJob,
              picture: userKemetrologian.photo ?? UserPNG,
            }
          : {
              name: "Kepala Bidang Kemetrologian",
              jabatan: "Kepala Bidang Kemetrologian",
              picture: UserPNG,
            },
      );

      // const newItemsJabfungKemetrologian = DATA_FETCHING.filter((it) =>
      //   it.parent?.nameJob.toUpperCase().includes("BIDANG KEMETROLOGIAN") && (
      //     it.nameJob.toUpperCase().includes("ANALIS PERDAGANGAN") || 
      //     it.nameJob.toUpperCase().includes("PENGAWAS PERDAGANGAN") || 
      //     it.nameJob.toUpperCase().includes("PENGAWAS KEMETROLOGIAN") || 
      //     it.nameJob.toUpperCase().includes("PENERA")
      //   ),
      // );
      // let userjabfungKemetrologian = newItemsJabfungKemetrologian?.map(item => {
      //   return item.user;
      // }).flat();
      // let getJabfungNameJabatanKemetrologian = userjabfungKemetrologian.map((item) => {
      //   return {
      //     jabatan: item.jabatan.nameJob,
      //     name: item.name
      //   }
      // });
      // setJabfungmetrologi(getJabfungNameJabatanKemetrologian)


      const newItemsKabidpengendalian = DATA_FETCHING.find((it) =>
        it.nameJob.toUpperCase().includes("BARANG POKOK"),
      );
      const userKabidpengendalian = newItemsKabidpengendalian?.user?.[0];
      setKabidpengendalian(
        userKabidpengendalian
          ? {
              name: userKabidpengendalian.name,
              jabatan: userKabidpengendalian.jabatan.nameJob,
              picture: userKabidpengendalian.photo ?? UserPNG,
            }
          : {
              name: "Kepala Bidang Pengendalian Barang Pokok dan Penting",
              jabatan: "Kepala Bidang Pengendalian Barang Pokok dan Penting",
              picture: UserPNG,
            },
      );

      // const newItemsJabfungBarangPokok = DATA_FETCHING.filter((it) =>
      //   it.parent?.nameJob.toUpperCase().includes("BARANG POKOK") && (
      //     it.nameJob.toUpperCase().includes("ANALIS PERDAGANGAN") || 
      //     it.nameJob.toUpperCase().includes("PENGAWAS PERDAGANGAN") || 
      //     it.nameJob.toUpperCase().includes("PENGAWAS KEMETROLOGIAN") || 
      //     it.nameJob.toUpperCase().includes("PENERA")
      //   ),
      // );
      // let userjabfungBarangPokok = newItemsJabfungBarangPokok?.map(item => {
      //   return item.user;
      // }).flat();
      // let getJabfungNameJabatanBarangPokok = userjabfungBarangPokok.map((item) => {
      //   return {
      //     jabatan: item.jabatan.nameJob,
      //     name: item.name
      //   }
      // });
      // setJabfungpengendalian(getJabfungNameJabatanBarangPokok)



      const newItemsUptdMetrologi = DATA_FETCHING.find((it) =>
        it.nameJob.toUpperCase().includes("KEPALA UPTD METROLOGI LEGAL"),
      );
      const userUptdMetrologi = newItemsUptdMetrologi?.user?.[0];
      setKepalaUptdMetrologi(
        userUptdMetrologi
          ? {
              name: userUptdMetrologi.name,
              jabatan: userUptdMetrologi.jabatan.nameJob,
              picture: userUptdMetrologi.photo ?? UserPNG,
            }
          : {
              name: "Kepala UPTD Metrologi Legal",
              jabatan: "KEPALA UPTD METROLOGI LEGAL",
              picture: UserPNG,
            },
      );
      const setters = [
        setKepalaUptd1,
        setKepalaUptd2,
        setKepalaUptd3,
        setKepalaUptd4,
        setKepalaUptd5,
        setKepalaUptd6,
        setKepalaUptd7,
        setKepalaUptd8,
        setKepalaUptd9,
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
        const newItemsUptd = DATA_FETCHING.find((it) =>
          it.nameJob
            .toUpperCase()
            .includes(
              `KEPALA UPTD PENGELOLAAN DAN PEMBINAAN PASAR WILAYAH ${romanNumerals[i - 1]} (`,
            ),
        );
        const userKabiduptd = newItemsUptd?.user?.[0];

        const uptdData = userKabiduptd
          ? {
              name: userKabiduptd.name,
              jabatan: `KEPALA UPTD WILAYAH ${romanNumerals[i - 1]}`,
              picture: userKabiduptd.photo ?? UserPNG,
            }
          : {
              name: `KEPALA UPTD WILAYAH ${romanNumerals[i - 1]}`,
              jabatan: `KEPALA UPTD WILAYAH ${romanNumerals[i - 1]}`,
              picture: UserPNG,
            };

        setters[i - 1](uptdData);
      }


      const newItemsUptdMetrologi2 = DATA_FETCHING.find((it) =>
        it.nameJob.toUpperCase().includes("KEPALA SUBBAGIAN TATA USAHA UPTD METROLOGI LEGAL"),
      );
      const userUptdTUMetrologi = newItemsUptdMetrologi2?.user?.[0];
      setKepalaTUUptdMetrologi(
        userUptdTUMetrologi
          ? {
              name: userUptdTUMetrologi.name,
              jabatan: "KEPALA SUBBAGIAN TATA USAHA",
              picture: userUptdTUMetrologi.photo ?? UserPNG,
            }
          : {
              name: "Kepala Subbagian Tata Usaha",
              jabatan: "Kepala Subbagian Tata Usaha",
              picture: UserPNG,
            },
      );
      const settersTU = [
        setKepalaTUUptd1,
        setKepalaTUUptd2,
        setKepalaTUUptd3,
        setKepalaTUUptd4,
        setKepalaTUUptd5,
        setKepalaTUUptd6,
        setKepalaTUUptd7,
        setKepalaTUUptd8,
        setKepalaTUUptd9,
      ];
      for (let i = 1; i <= 9; i++) {
        const newItemsUptd = DATA_FETCHING.find((it) =>
          it.nameJob
            .toUpperCase()
            .includes(
              `KEPALA SUBBAGIAN TATA USAHA UPTD PENGELOLAAN DAN PEMBINAAN PASAR WILAYAH ${romanNumerals[i - 1]} (`,
            ),
        );
        const userKabiduptd = newItemsUptd?.user?.[0];

        const uptdData = userKabiduptd
          ? {
              name: userKabiduptd.name,
              jabatan: `KEPALA SUBBAGIAN TATA USAHA`,
              picture: userKabiduptd.photo ?? UserPNG,
            }
          : {
              name: `KEPALA SUBBAGIAN TATA USAHA`,
              jabatan: `KEPALA SUBBAGIAN TATA USAHA`,
              picture: UserPNG,
            };

          settersTU[i - 1](uptdData);
      }
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
      const images = tableRef.current.querySelectorAll("img");
      images.forEach((img) => {
        img.crossOrigin = "anonymous";
      });
      const rect = tableRef.current.getBoundingClientRect();
      const canvas = await html2canvas(tableRef.current, {
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        x: rect.left - 0.15 * tableRef.current.scrollWidth,
        width: tableRef.current.scrollWidth * 2,
        height: tableRef.current.scrollHeight,
        windowWidth: tableRef.current.scrollWidth * 2,
        windowHeight: tableRef.current.scrollHeight,
        scale: window.devicePixelRatio,
      });
      const link = document.createElement("a");
      link.download = "StrukturOrganisasi.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border">
      {isFetching && (
        <div className="inset-0 fixed flex items-center justify-center z-20">
          <Commet color="#32cd32" size="medium" text="" textColor="" />
        </div>
      )}
      <div className="flex items-center justify-between md:flex-row flex-col gap-2 mb-4 p-4">
        <h1 className="font-semibold text-lg">Struktur Organsasi</h1>
        <div className="flex gap-2">
          <Button
            onPress={handleDownload}
            className="px-4 py-2 bg-button-primary text-white rounded text-xs"
          >
            <LucideDownloadCloud size={14} />
            Download PNG
          </Button>
          <Button
            onPress={toggleFullscreen}
            className="px-4 py-2 bg-info text-white rounded text-xs"
          >
            <LuFullscreen size={14} />
            Fullscreen
          </Button>
        </div>
      </div>

      <div>
        <div
          ref={tableRef}
          className="w-full min-h-screen overflow-auto border border-button-primary scrollbar-hide"
        >
          <table className=" bg-white min-w-full w-auto">
            <thead className=" bg-white">
              <tr>
                {Array.from({ length: 160 }).map((_, idx) => (
                  <td key={idx} className="px-2" /> // atau atur proporsional sesuai kebutuhan
                ))}
              </tr>
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
              {/* kadin */}
              <tr>
                <th className="py-2" colSpan={71}></th>
                <th colSpan={18}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl">
                    <img
                      src={kadin?.picture}
                      alt="Kepala Dinas"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kadin?.jabatan}</h1>
                      <p className="font-normal text-xs">{kadin?.name}</p>
                    </div>
                  </div>
                </th>
                <th className="py-2" colSpan={71}></th>
              </tr>
              {/* end kadin */}

              <tr>
                <td
                  className="py-2 border-e border-button-primary"
                  colSpan={80}
                ></td>
                <td
                  className="py-2 border-s border-button-primary"
                  colSpan={80}
                ></td>
              </tr>

              {/* sekre */}
              <tr>
                <td
                  className="py-2 border-e border-button-primary"
                  colSpan={80}
                ></td>
                <td
                  className="py-2 border-s border-button-primary border-b"
                  colSpan={28}
                ></td>
                <th colSpan={18} rowSpan={2}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl">
                    <img
                      src={sekdin?.picture}
                      alt="Sekretaris"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{sekdin?.jabatan}</h1>
                      <p className="font-normal text-xs">{sekdin?.name}</p>
                    </div>
                  </div>
                </th>
                <td className="py-2" colSpan={32}></td>
              </tr>
              <tr>
                <td
                  className="py-2 border-e border-button-primary"
                  colSpan={80}
                ></td>
                <td className="py-2" colSpan={28}></td>
                <td className="py-2" colSpan={32}></td>
              </tr>
              {/* end sekre */}

              <tr>
                <td
                  className="py-2 border-e border-button-primary"
                  colSpan={80}
                ></td>
                <td colSpan={17}></td>
                <td
                  className="py-2 border-b border-button-primary"
                  colSpan={10}
                ></td>
                <td
                  className="py-2 border-e border-b border-button-primary"
                  colSpan={10}
                ></td>
                <td
                  className="py-2 border-s border-b border-dashed border-button-primary"
                  colSpan={10}
                ></td>
                <td
                  className="py-2 border-b border-dashed border-button-primary"
                  colSpan={10}
                ></td>
                <td className="py-2" colSpan={23}></td>
              </tr>
              <tr>
                <td
                  className="py-2 border-e border-button-primary"
                  colSpan={80}
                ></td>
                <td className="py-2" colSpan={17}></td>
                <td
                  className="py-2 border-s border-button-primary"
                  colSpan={10}
                ></td>
                <td className="py-2" colSpan={10}></td>
                <td
                  className="py-2 border-s border-button-primary"
                  colSpan={10}
                ></td>
                <td className="py-2" colSpan={10}></td>
                <td
                  className="py-2 border-s border-dashed border-button-primary"
                  colSpan={10}
                ></td>
                <td className="py-2" colSpan={12}></td>
              </tr>

              {/* kaubbag */}
              <tr>
                <th
                  className="py-2 border-e border-button-primary"
                  colSpan={80}
                ></th>
                <th
                  className="py-2 text-center text-xs border-s border-button-primary"
                  colSpan={8}
                ></th>
                <th colSpan={18} className="align-top">
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <img
                      src={kasuang?.picture}
                      alt="Kepala Subbagian Keuangan"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kasuang?.jabatan}</h1>
                      <p className="font-normal text-xs">{kasuang?.name}</p>
                    </div>
                  </div>
                </th>
                <th className="py-2 text-center text-xs"></th>
                <th className="py-2 text-center text-xs"></th>
                <th colSpan={18} className="align-top">
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <img
                      src={kasumum?.picture}
                      alt="Kepala Subbagian Umum dan Kepegawaian"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kasumum?.jabatan}</h1>
                      <p className="font-normal text-xs">{kasumum?.name}</p>
                    </div>
                  </div>
                </th>
                <th className="py-2 text-center text-xs"></th>
                <th className="py-2 text-center text-xs"></th>
                <th colSpan={18} className="align-top">
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <div className="text-start flex flex-col gap-1">
                      <div className="flex items-center gap-4">
                        <img
                          src={UserPNG}
                          alt="Kelompok jabatan fungsional"
                          className="w-12 h-12 rounded-full border border-accent-primary"
                        />
                        <h1 className="text-sm">KELOMPOK JABATAN FUNGSIONAL DAN PELAKSANA</h1>
                      </div>
                    </div>
                  </div>
                </th>
                <th className="py-2 text-center text-xs" colSpan={22}></th>
              </tr>
              {/* end kaubbag */}

              <tr>
                <td
                  className="py-2 border-e border-button-primary"
                  colSpan={80}
                ></td>
                <td
                  className="py-2 border-s border-button-primary"
                  colSpan={80}
                ></td>
              </tr>
              <tr>
                <th className="py-2" colSpan={50}></th>
                <th
                  className="py-2 border-b border-e border-button-primary"
                  colSpan={30}
                ></th>
                <th
                  className="py-2 border-b border-s border-button-primary"
                  colSpan={30}
                ></th>
                <th className="py-2" colSpan={50}></th>
              </tr>
              <tr>
                <th className="py-2" colSpan={40}></th>
                <td
                  className="py-2 border-e border-button-primary"
                  colSpan={10}
                ></td>
                <td
                  className="py-2 border-s border-button-primary"
                  colSpan={10}
                ></td>
                <td
                  className="py-2 border-e border-button-primary"
                  colSpan={10}
                ></td>
                <td
                  className="py-2 border-x border-button-primary"
                  colSpan={10}
                ></td>
                <td
                  className="py-2 border-x border-button-primary"
                  colSpan={10}
                ></td>
                <td
                  className="py-2 border-s border-button-primary"
                  colSpan={10}
                ></td>
                <td
                  className="py-2 border-e border-button-primary"
                  colSpan={10}
                ></td>
                <th className="py-2" colSpan={50}></th>
              </tr>

              {/* kabid */}
              <tr>
                <th className="py-2" colSpan={41}></th>
                <th colSpan={18}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-36">
                    <img
                      src={kabidpln?.picture}
                      alt="Kepala Bidang Pengembangan Perdagangan Luar Negeri"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kabidpln?.jabatan}</h1>
                      <p className="font-normal text-xs">{kabidpln?.name}</p>
                    </div>
                  </div>
                </th>
                <th className="py-2"></th>
                <th className="py-2"></th>
                <th colSpan={18}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-36">
                    <img
                      src={kabidDistribsu?.picture}
                      alt="Kepala Bidang Sarana dan Pelaku Distribusi"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kabidDistribsu?.jabatan}</h1>
                      <p className="font-normal text-xs">
                        {kabidDistribsu?.name}
                      </p>
                    </div>
                  </div>
                </th>
                <th className="py-2 border-e border-button-primary"></th>
                <th className="py-2 border-s border-button-primary"></th>
                <th colSpan={18}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-36">
                    <img
                      src={kabidmetrologi?.picture}
                      alt="Kepala Bidang Kemetrologian"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kabidmetrologi?.jabatan}</h1>
                      <p className="font-normal text-xs">
                        {kabidmetrologi?.name}
                      </p>
                    </div>
                  </div>
                </th>
                <th className="py-2"></th>
                <th className="py-2"></th>
                <th colSpan={18}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-36">
                    <img
                      src={kabidpengendalian?.picture}
                      alt="Kepala Bidang Pengendalian Barang Pokok dan Penting"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kabidpengendalian?.jabatan}</h1>
                      <p className="font-normal text-xs">
                        {kabidpengendalian?.name}
                      </p>
                    </div>
                  </div>
                </th>
                <th className="py-2" colSpan={41}></th>
              </tr>
              {/* kabid */}

              <tr>
                <th className="py-2" colSpan={40}></th>
                <td
                  className="py-2 border-e border-dashed border-button-primary"
                  colSpan={10}
                ></td>
                <td
                  className="py-2 border-s border-dashed border-button-primary"
                  colSpan={10}
                ></td>
                <td
                  className="py-2 border-e border-dashed border-button-primary"
                  colSpan={10}
                ></td>
                <td
                  className="py-2 border-x border-dashed border-button-primary"
                  colSpan={10}
                ></td>
                <td
                  className="py-2 border-s border-button-primary"
                  colSpan={10}
                ></td>
                <td
                  className="py-2 border-s border-dashed border-button-primary"
                  colSpan={10}
                ></td>
                <td
                  className="py-2 border-e border-dashed border-button-primary"
                  colSpan={10}
                ></td>
                <th className="py-2" colSpan={50}></th>
              </tr>
              <tr>
                <th className="py-2" colSpan={40}></th>
                <td
                  className="py-2 border-e border-dashed border-button-primary"
                  colSpan={10}
                ></td>
                <td
                  className="py-2 border-s border-dashed border-button-primary"
                  colSpan={10}
                ></td>
                <td
                  className="py-2 border-e border-dashed border-button-primary"
                  colSpan={10}
                ></td>
                <td
                  className="py-2 border-x border-dashed border-button-primary"
                  colSpan={10}
                ></td>
                <td
                  className="py-2 border-s border-button-primary"
                  colSpan={10}
                ></td>
                <td
                  className="py-2 border-s border-dashed border-button-primary"
                  colSpan={10}
                ></td>
                <td
                  className="py-2 border-e border-dashed border-button-primary"
                  colSpan={10}
                ></td>
                <th className="py-2" colSpan={50}></th>
              </tr>

              {/* jabfung kabid */}
              <tr>
                <th className="py-2" colSpan={41}></th>
                <th colSpan={18} className="align-top">
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <div className="text-start flex flex-col gap-1">
                      <div className="flex items-center gap-4">
                        <img
                          src={UserPNG}
                          alt="Kelompok jabatan fungsional"
                          className="w-12 h-12 rounded-full border border-accent-primary"
                        />
                        <h1 className="text-sm">KELOMPOK JABATAN FUNGSIONAL DAN PELAKSANA</h1>
                      </div>
                    </div>
                  </div>
                </th>
                <th className="py-2"></th>
                <th className="py-2"></th>
                <th colSpan={18} className="align-top">
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <div className="text-start flex flex-col gap-1">
                      <div className="flex items-center gap-4">
                        <img
                          src={UserPNG}
                          alt="Kelompok jabatan fungsional"
                          className="w-12 h-12 rounded-full border border-accent-primary"
                        />
                        <h1 className="text-sm">KELOMPOK JABATAN FUNGSIONAL DAN PELAKSANA</h1>
                      </div>
                    </div>
                  </div>
                </th>
                <th className="py-2 border-e border-button-primary"></th>
                <th className="py-2 border-s border-button-primary"></th>
                <th colSpan={18} className="align-top">
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <div className="text-start flex flex-col gap-1">
                      <div className="flex items-center gap-4">
                        <img
                          src={UserPNG}
                          alt="Kelompok jabatan fungsional"
                          className="w-12 h-12 rounded-full border border-accent-primary"
                        />
                        <h1 className="text-sm">KELOMPOK JABATAN FUNGSIONAL DAN PELAKSANA</h1>
                      </div>
                    </div>
                  </div>
                </th>
                <th className="py-2"></th>
                <th className="py-2"></th>
                <th colSpan={18} className="align-top">
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <div className="text-start flex flex-col gap-1">
                      <div className="flex items-center gap-4">
                        <img
                          src={UserPNG}
                          alt="Kelompok jabatan fungsional"
                          className="w-12 h-12 rounded-full border border-accent-primary"
                        />
                        <h1 className="text-sm">KELOMPOK JABATAN FUNGSIONAL DAN PELAKSANA</h1>
                      </div>
                    </div>
                  </div>
                </th>
                <th className="py-2" colSpan={41}></th>
              </tr>
              {/* jabfung kabid */}

              <tr>
                <td
                  className="py-2 border-e border-button-primary"
                  colSpan={80}
                ></td>
                <td
                  className="py-2 border-s border-button-primary"
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
              {/* kepala uptd */}
              <tr>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th colSpan={14}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <img
                      src={kepalaUptd1?.picture}
                      alt="Kepala Subbagian Keuangan"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kepalaUptd1?.jabatan}</h1>
                      <p className="font-normal text-xs">{kepalaUptd1?.name}</p>
                    </div>
                  </div>
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th colSpan={14}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <img
                      src={kepalaUptd2?.picture}
                      alt="Kepala Subbagian Keuangan"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kepalaUptd2?.jabatan}</h1>
                      <p className="font-normal text-xs">{kepalaUptd2?.name}</p>
                    </div>
                  </div>
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th colSpan={14}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <img
                      src={kepalaUptd3?.picture}
                      alt="Kepala Subbagian Keuangan"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kepalaUptd3?.jabatan}</h1>
                      <p className="font-normal text-xs">{kepalaUptd3?.name}</p>
                    </div>
                  </div>
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th colSpan={14}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <img
                      src={kepalaUptd4?.picture}
                      alt="Kepala Subbagian Keuangan"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kepalaUptd4?.jabatan}</h1>
                      <p className="font-normal text-xs">{kepalaUptd4?.name}</p>
                    </div>
                  </div>
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th colSpan={14}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <img
                      src={kepalaUptd5?.picture}
                      alt="Kepala Subbagian Keuangan"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kepalaUptd5?.jabatan}</h1>
                      <p className="font-normal text-xs">{kepalaUptd5?.name}</p>
                    </div>
                  </div>
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th colSpan={14}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <img
                      src={kepalaUptd6?.picture}
                      alt="Kepala Subbagian Keuangan"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kepalaUptd6?.jabatan}</h1>
                      <p className="font-normal text-xs">{kepalaUptd6?.name}</p>
                    </div>
                  </div>
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th colSpan={14}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <img
                      src={kepalaUptd7?.picture}
                      alt="Kepala Subbagian Keuangan"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kepalaUptd7?.jabatan}</h1>
                      <p className="font-normal text-xs">{kepalaUptd7?.name}</p>
                    </div>
                  </div>
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th colSpan={14}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <img
                      src={kepalaUptd8?.picture}
                      alt="Kepala Subbagian Keuangan"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kepalaUptd8?.jabatan}</h1>
                      <p className="font-normal text-xs">{kepalaUptd8?.name}</p>
                    </div>
                  </div>
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th colSpan={14}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <img
                      src={kepalaUptd9?.picture}
                      alt="Kepala Subbagian Keuangan"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kepalaUptd9?.jabatan}</h1>
                      <p className="font-normal text-xs">{kepalaUptd9?.name}</p>
                    </div>
                  </div>
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th colSpan={14}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <img
                      src={kepalaUptdMetrologi?.picture}
                      alt="Kepala Subbagian Keuangan"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">
                        {kepalaUptdMetrologi?.jabatan}
                      </h1>
                      <p className="font-normal text-xs">
                        {kepalaUptdMetrologi?.name}
                      </p>
                    </div>
                  </div>
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
              </tr>
              {/* end kepala uptd */}

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
              
              {/* kepala subbagian tata usaha uptd */}
              <tr>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th colSpan={14}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <img
                      src={kepalaTUUptd1?.picture}
                      alt="Kepala Subbagian Keuangan"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kepalaTUUptd1?.jabatan}</h1>
                      <p className="font-normal text-xs">{kepalaTUUptd1?.name}</p>
                    </div>
                  </div>
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th colSpan={14}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <img
                      src={kepalaTUUptd2?.picture}
                      alt="Kepala Subbagian Keuangan"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kepalaTUUptd2?.jabatan}</h1>
                      <p className="font-normal text-xs">{kepalaTUUptd2?.name}</p>
                    </div>
                  </div>
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th colSpan={14}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <img
                      src={kepalaTUUptd3?.picture}
                      alt="Kepala Subbagian Keuangan"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kepalaTUUptd3?.jabatan}</h1>
                      <p className="font-normal text-xs">{kepalaTUUptd3?.name}</p>
                    </div>
                  </div>
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th colSpan={14}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <img
                      src={kepalaTUUptd4?.picture}
                      alt="Kepala Subbagian Keuangan"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kepalaTUUptd4?.jabatan}</h1>
                      <p className="font-normal text-xs">{kepalaTUUptd4?.name}</p>
                    </div>
                  </div>
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th colSpan={14}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <img
                      src={kepalaTUUptd5?.picture}
                      alt="Kepala Subbagian Keuangan"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kepalaTUUptd5?.jabatan}</h1>
                      <p className="font-normal text-xs">{kepalaTUUptd5?.name}</p>
                    </div>
                  </div>
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th colSpan={14}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <img
                      src={kepalaTUUptd6?.picture}
                      alt="Kepala Subbagian Keuangan"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kepalaTUUptd6?.jabatan}</h1>
                      <p className="font-normal text-xs">{kepalaTUUptd6?.name}</p>
                    </div>
                  </div>
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th colSpan={14}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <img
                      src={kepalaTUUptd7?.picture}
                      alt="Kepala Subbagian Keuangan"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kepalaTUUptd7?.jabatan}</h1>
                      <p className="font-normal text-xs">{kepalaTUUptd7?.name}</p>
                    </div>
                  </div>
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th colSpan={14}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <img
                      src={kepalaTUUptd8?.picture}
                      alt="Kepala Subbagian Keuangan"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kepalaTUUptd8?.jabatan}</h1>
                      <p className="font-normal text-xs">{kepalaTUUptd8?.name}</p>
                    </div>
                  </div>
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th colSpan={14}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <img
                      src={kepalaTUUptd9?.picture}
                      alt="Kepala Subbagian Keuangan"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">{kepalaTUUptd9?.jabatan}</h1>
                      <p className="font-normal text-xs">{kepalaTUUptd9?.name}</p>
                    </div>
                  </div>
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th className="px-2 py-2 text-center text-xs"></th>
                <th colSpan={14}>
                  <div className="flex items-center gap-4 border px-4 py-4 border-button-primary text-xs rounded-tl-[40px] rounded-bl-xl rounded-br-[40px] rounded-tr-xl h-28">
                    <img
                      src={kepalaTUUptdMetrologi?.picture}
                      alt="Kepala Subbagian Keuangan"
                      className="w-12 h-12 rounded-full border border-accent-primary"
                    />
                    <div className="text-start flex flex-col gap-1">
                      <h1 className="text-sm">
                        {kepalaTUUptdMetrologi?.jabatan}
                      </h1>
                      <p className="font-normal text-xs">
                        {kepalaTUUptdMetrologi?.name}
                      </p>
                    </div>
                  </div>
                </th>
                <th className="px-2 py-2 text-center text-xs"></th>
              </tr>
              {/* end kepala subbagian tata usaha uptd */}

              <tr>
                {columns.map((col) => (
                  <th key={col} className="w-6 h-60"></th>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
