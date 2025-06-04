import { useEffect, useMemo } from "react";
import { ErrorToast } from "@/utils/ToastMessage";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDetailPenilaian } from "@/services/penilaian";
import { PernilaianListRes } from "@/interface/responses/penilaian.interface";
import Logo from "@/assets/logo.png";
import {
  caseIndikator,
  caseIndikatorNilai,
  CaseNilai,
  caseRekomendasi,
} from "@/utils/nilaiCase";
import { VictoryPie, VictoryTheme } from "victory";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Commet } from "react-loading-indicators";
import { MYIndoToFormat } from "@/utils/dateFormater";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExportPenilaianKinerja() {
  const { id } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const m = queryParams.get("m");
  const searchMonth = m as string;

  const { data, isFetching, refetch, error } = useGetDetailPenilaian(
    id || "",
    searchMonth.split("-")[1],
    searchMonth.split("-")[0],
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!isFetching && error && !m) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/penilaian-kinerja");
    }
  }, [isFetching, refetch]);

  useEffect(() => {
    refetch();
  }, []);

  const DATA_DETAIL: PernilaianListRes | null = useMemo(() => {
    if (data) {
      return data.data;
    } else {
      return null;
    }
  }, [id, data]);

  useEffect(() => {
    if (!isFetching && DATA_DETAIL) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

      setTimeout(() => {
        window.print();
      }, 500);

      const handleAfterPrint = () => {
        window.close();
      };

      window.addEventListener("afterprint", handleAfterPrint);

      return () => {
        window.removeEventListener("afterprint", handleAfterPrint);
      };
    }
  }, [isFetching, DATA_DETAIL]);

  const getPercentage = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(1); // Membatasi dua angka decimal
  };

  // Total nilai dari data
  const totalNilai =
    (DATA_DETAIL?.performanceNilai || 0) +
    (DATA_DETAIL?.disciplineNilai || 0) +
    (DATA_DETAIL?.loyaltyNilai || 0) +
    (DATA_DETAIL?.cooperationNilai || 0) +
    (DATA_DETAIL?.attitudeNilai || 0);
  // Di dalam komponen utam

  return (
    <>
      <style>{`
            @media print {
            @page {
                size: landscape;
                margin: 0;
                padding: 1.5cm;
            }
            body {
                margin: 0;
            }
            }
        `}</style>

      {isFetching && (
        <div className="inset-0 fixed flex items-center justify-center z-20">
          <Commet color="#32cd32" size="medium" text="" textColor="" />
        </div>
      )}
      {DATA_DETAIL && (
        <>
          <div className="print:break-after-page">
            <div className="h-screen flex items-center justify-center flex-col w-full">
              <div className="text-center font-bold text-[16pt]">
                <h1>
                  EVALUASI PENILAIAN KINERJA PEGAWAI DI LINGKUNGAN DINAS
                  PERDAGANGAN
                </h1>
                <h1>PEMERINTAH DAERAH KABUPATEN BEKASI</h1>
                <h1 className="uppercase">PERIODE {MYIndoToFormat(searchMonth)}</h1>
              </div>
              <br />
              <br />
              <div className="flex items-center justify-center">
                <img src={Logo} alt="logo" className="w-[120pt]" />
              </div>
              <br />
              <br />
              <div>
                <table className="text-[14pt]">
                  <tbody>
                    <tr>
                      <td>Nama</td>
                      <td>:</td>
                      <td>{DATA_DETAIL.user.name}</td>
                    </tr>
                    <tr>
                      <td>Bidang</td>
                      <td>:</td>
                      <td>{DATA_DETAIL.user.jabatan?.nameJob || ""}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br />
              <br />
              <br />
              <div className="text-center font-bold text-[16pt]">
                <h1>DINAS PERDAGANGAN</h1>
                <h1>{new Date().getFullYear()}</h1>
              </div>
            </div>
          </div>
          <div className="print:break-after-page">
            <div>
              <div className="text-center font-bold text-[16pt]">
                <h1>KUESIONER PENILAIAN KINERJA PEGAWAI DI</h1>
                <h1>LINGKUNGAN PEMERINTAH KABUPATEN BEKASI</h1>
              </div>
              <br />
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-[10pt] border border-black bg-gray-200">
                      No
                    </th>
                    <th className="text-[10pt] border border-black bg-gray-200">
                      Variabel
                    </th>
                    <th className="text-[10pt] border border-black bg-gray-200">
                      Jawaban
                    </th>
                    <th className="text-[10pt] border border-black bg-gray-200 w-[40%]">
                      Indikator
                    </th>
                    <th className="text-[10pt] border border-black bg-gray-200">
                      Keterangan
                    </th>
                    <th className="text-[10pt] border border-black bg-gray-200">
                      Nilai
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2 text-center">
                      1
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Kinerja
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      {CaseNilai(DATA_DETAIL.performanceNilai || 0)}
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      {caseIndikator(
                        DATA_DETAIL.performanceNilai || 0,
                        "Kinerja",
                      )}
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2"></td>
                    <td className="text-[10pt] border border-black align-top p-2 text-center">
                      {DATA_DETAIL.performanceNilai}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2 text-center">
                      2
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Disiplin
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      {CaseNilai(DATA_DETAIL.disciplineNilai || 0)}
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      {caseIndikator(
                        DATA_DETAIL.disciplineNilai || 0,
                        "Disiplin",
                      )}
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2"></td>
                    <td className="text-[10pt] border border-black align-top p-2 text-center">
                      {DATA_DETAIL.disciplineNilai}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2 text-center">
                      3
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Loyalitas
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      {CaseNilai(DATA_DETAIL.loyaltyNilai || 0)}
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      {caseIndikator(
                        DATA_DETAIL.loyaltyNilai || 0,
                        "Loyalitas",
                      )}
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2"></td>
                    <td className="text-[10pt] border border-black align-top p-2 text-center">
                      {DATA_DETAIL.loyaltyNilai}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2 text-center">
                      4
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Kerjasama
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      {CaseNilai(DATA_DETAIL.cooperationNilai || 0)}
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      {caseIndikator(
                        DATA_DETAIL.cooperationNilai || 0,
                        "Kerjasama",
                      )}
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2"></td>
                    <td className="text-[10pt] border border-black align-top p-2 text-center">
                      {DATA_DETAIL.cooperationNilai}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2 text-center">
                      5
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Attitude
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      {CaseNilai(DATA_DETAIL.attitudeNilai || 0)}
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      {caseIndikator(
                        DATA_DETAIL.attitudeNilai || 0,
                        "Attitude",
                      )}
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2"></td>
                    <td className="text-[10pt] border border-black align-top p-2 text-center">
                      {DATA_DETAIL.attitudeNilai}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="print:break-after-page">
            <div>
              <div className="text-center font-bold text-[16pt]">
                <h1>
                  TINGKAT KINERJA PEGAWAI DI LINGKUNGAN PEMERINTAH KABUPATEN
                  BEKASI
                </h1>
              </div>
              <br />
              <table className="w-[80%] mx-auto">
                <thead>
                  <tr>
                    <th className="text-[10pt] border border-black bg-gray-200">
                      No
                    </th>
                    <th className="text-[10pt] border border-black bg-gray-200">
                      Variabel dan Kualifikasi
                    </th>
                    <th className="text-[10pt] border border-black bg-gray-200">
                      Nilai
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-[10pt] border border-black align-top px-2 text-center">
                      1
                    </td>
                    <td className="text-[10pt] border border-black align-top px-2">
                      Kinerja
                    </td>
                    <td className="text-[10pt] border border-black align-top px-2 text-center">
                      {DATA_DETAIL.performanceNilai}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top px-2 text-center">
                      2
                    </td>
                    <td className="text-[10pt] border border-black align-top px-2">
                      Disiplin
                    </td>
                    <td className="text-[10pt] border border-black align-top px-2 text-center">
                      {DATA_DETAIL.disciplineNilai}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top px-2 text-center">
                      3
                    </td>
                    <td className="text-[10pt] border border-black align-top px-2">
                      Loyalitas
                    </td>
                    <td className="text-[10pt] border border-black align-top px-2 text-center">
                      {DATA_DETAIL.loyaltyNilai}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top px-2 text-center">
                      4
                    </td>
                    <td className="text-[10pt] border border-black align-top px-2">
                      Kerjasama
                    </td>
                    <td className="text-[10pt] border border-black align-top px-2 text-center">
                      {DATA_DETAIL.cooperationNilai}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top px-2 text-center">
                      5
                    </td>
                    <td className="text-[10pt] border border-black align-top px-2">
                      Attitude
                    </td>
                    <td className="text-[10pt] border border-black align-top px-2 text-center">
                      {DATA_DETAIL.attitudeNilai}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      colSpan={3}
                      className="text-[10pt] border border-black bg-pink-400"
                    >
                      {caseIndikatorNilai(
                        (DATA_DETAIL.performanceNilai || 0) +
                          (DATA_DETAIL.disciplineNilai || 0) +
                          (DATA_DETAIL.loyaltyNilai || 0) +
                          (DATA_DETAIL.cooperationNilai || 0) +
                          (DATA_DETAIL.attitudeNilai || 0),
                      )}
                    </th>
                  </tr>
                  <tr>
                    <th
                      colSpan={3}
                      className="text-[10pt] border border-black bg-green-500"
                    >
                      {caseRekomendasi(
                        ((DATA_DETAIL.performanceBobot || 0) * 50) / 100 +
                          ((DATA_DETAIL.disciplineBobot || 0) * 20) / 100 +
                          ((DATA_DETAIL.loyaltyBobot || 0) * 5) / 100 +
                          ((DATA_DETAIL.cooperationBobot || 0) * 5) / 100 +
                          ((DATA_DETAIL.attitudeBobot || 0) * 20) / 100,
                      )}
                    </th>
                  </tr>
                </tfoot>
              </table>
              <br />
              <div className="text-center font-bold text-[16pt]">
                <h1>GRAFIK HASIL KINERJA</h1>
              </div>
              <div
                style={{
                  width: "80%",
                  margin: "0 auto",
                  height: "350px",
                  overflow: "hidden",
                }}
              >
                <VictoryPie
                  innerRadius={50}
                  padAngle={5}
                  data={[
                    {
                      x: `Kinerja (${getPercentage(DATA_DETAIL.performanceNilai || 0, totalNilai)})%`,
                      y: getPercentage(
                        DATA_DETAIL.performanceNilai || 0,
                        totalNilai,
                      ),
                    },
                    {
                      x: `Disiplin (${getPercentage(DATA_DETAIL.disciplineNilai || 0, totalNilai)})%`,
                      y: getPercentage(
                        DATA_DETAIL.disciplineNilai || 0,
                        totalNilai,
                      ),
                    },
                    {
                      x: `Loyalitas (${getPercentage(DATA_DETAIL.loyaltyNilai || 0, totalNilai)})%`,
                      y: getPercentage(
                        DATA_DETAIL.loyaltyNilai || 0,
                        totalNilai,
                      ),
                    },
                    {
                      x: `Kerjasama (${getPercentage(DATA_DETAIL.cooperationNilai || 0, totalNilai)})%`,
                      y: getPercentage(
                        DATA_DETAIL.cooperationNilai || 0,
                        totalNilai,
                      ),
                    },
                    {
                      x: `Attitude (${getPercentage(DATA_DETAIL.attitudeNilai || 0, totalNilai)})%`,
                      y: getPercentage(
                        DATA_DETAIL.attitudeNilai || 0,
                        totalNilai,
                      ),
                    },
                  ]}
                  theme={VictoryTheme.clean}
                />
              </div>
            </div>
          </div>
          <div className="print:break-after-page">
            <div>
              <div className="text-center font-bold text-[16pt]">
                <h1>LEMBAR REKOMENDASI KINERJA PEGAWAI DI</h1>
                <h1>LINGKUNGAN PEMERINTAH KABUPATEN BEKASI</h1>
              </div>
              <br />
              <table className="text-[14pt]">
                <tbody>
                  <tr>
                    <td className="font-semibold text-[10pt]">Nama</td>
                    <td className="font-semibold text-[10pt]">:</td>
                    <td className="font-semibold text-[10pt]">
                      {DATA_DETAIL.user.name}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-[10pt]">Bidang</td>
                    <td className="font-semibold text-[10pt]">:</td>
                    <td className="font-semibold text-[10pt]">
                      {DATA_DETAIL.user.jabatan?.nameJob || ""}
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <table className="w-full">
                <thead>
                  <tr>
                    <th
                      className="text-[10pt] border border-black bg-gray-200"
                      rowSpan={3}
                    >
                      No
                    </th>
                    <th
                      className="text-[10pt] border border-black bg-gray-200"
                      rowSpan={3}
                    >
                      Variabel dan Kualifikasi
                    </th>
                    <th
                      className="text-[10pt] border border-black bg-gray-200"
                      rowSpan={3}
                    >
                      Bobot
                    </th>
                    <th
                      className="text-[10pt] border border-black bg-gray-200"
                      colSpan={5}
                    >
                      Penilaian
                    </th>
                    <th className="text-[10pt] border border-black bg-gray-200">
                      Nilai Akhir
                    </th>
                  </tr>
                  <tr>
                    <th className="text-[10pt] border border-black bg-gray-200">
                      Sangat Rendah
                    </th>
                    <th className="text-[10pt] border border-black bg-gray-200">
                      Rendah
                    </th>
                    <th className="text-[10pt] border border-black bg-gray-200">
                      Sedang
                    </th>
                    <th className="text-[10pt] border border-black bg-gray-200">
                      Tinggi
                    </th>
                    <th className="text-[10pt] border border-black bg-gray-200">
                      Sangat Tinggi
                    </th>
                    <th
                      className="text-[10pt] border border-black bg-gray-200"
                      rowSpan={2}
                    >
                      ( nilai * bobot ) / 100{" "}
                    </th>
                  </tr>
                  <tr>
                    <th className="text-[10pt] border border-black bg-gray-200">
                      {"<= 50"}
                    </th>
                    <th className="text-[10pt] border border-black bg-gray-200">
                      51 - 60
                    </th>
                    <th className="text-[10pt] border border-black bg-gray-200">
                      61 - 70
                    </th>
                    <th className="text-[10pt] border border-black bg-gray-200">
                      71 - 80
                    </th>
                    <th className="text-[10pt] border border-black bg-gray-200">
                      81 - 100
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-[10pt] border border-black text-center px-2">
                      1
                    </td>
                    <td className="text-[10px] border border-black px-2">
                      Kinerja
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      50
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.performanceBobot || 0) <= 50
                        ? DATA_DETAIL.performanceBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.performanceBobot || 0) <= 60 &&
                      (DATA_DETAIL.performanceBobot || 0) >= 51
                        ? DATA_DETAIL.performanceBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.performanceBobot || 0) <= 70 &&
                      (DATA_DETAIL.performanceBobot || 0) >= 61
                        ? DATA_DETAIL.performanceBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.performanceBobot || 0) <= 80 &&
                      (DATA_DETAIL.performanceBobot || 0) >= 71
                        ? DATA_DETAIL.performanceBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.performanceBobot || 0) <= 100 &&
                      (DATA_DETAIL.performanceBobot || 0) >= 81
                        ? DATA_DETAIL.performanceBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {((DATA_DETAIL.performanceBobot || 0) * 50) / 100}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black text-center px-2">
                      2
                    </td>
                    <td className="text-[10px] border border-black px-2">
                      Disiplin
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      20
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.disciplineBobot || 0) <= 50
                        ? DATA_DETAIL.disciplineBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.disciplineBobot || 0) <= 60 &&
                      (DATA_DETAIL.disciplineBobot || 0) >= 51
                        ? DATA_DETAIL.disciplineBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.disciplineBobot || 0) <= 70 &&
                      (DATA_DETAIL.disciplineBobot || 0) >= 61
                        ? DATA_DETAIL.disciplineBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.disciplineBobot || 0) <= 80 &&
                      (DATA_DETAIL.disciplineBobot || 0) >= 71
                        ? DATA_DETAIL.disciplineBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.disciplineBobot || 0) <= 100 &&
                      (DATA_DETAIL.disciplineBobot || 0) >= 81
                        ? DATA_DETAIL.disciplineBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {((DATA_DETAIL.disciplineBobot || 0) * 20) / 100}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black text-center px-2">
                      3
                    </td>
                    <td className="text-[10px] border border-black px-2">
                      Loyalitas
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      5
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.loyaltyBobot || 0) <= 50
                        ? DATA_DETAIL.loyaltyBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.loyaltyBobot || 0) <= 60 &&
                      (DATA_DETAIL.loyaltyBobot || 0) >= 51
                        ? DATA_DETAIL.loyaltyBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.loyaltyBobot || 0) <= 70 &&
                      (DATA_DETAIL.loyaltyBobot || 0) >= 61
                        ? DATA_DETAIL.loyaltyBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.loyaltyBobot || 0) <= 80 &&
                      (DATA_DETAIL.loyaltyBobot || 0) >= 71
                        ? DATA_DETAIL.loyaltyBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.loyaltyBobot || 0) <= 100 &&
                      (DATA_DETAIL.loyaltyBobot || 0) >= 81
                        ? DATA_DETAIL.loyaltyBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {((DATA_DETAIL.loyaltyBobot || 0) * 5) / 100}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black text-center px-2">
                      4
                    </td>
                    <td className="text-[10px] border border-black px-2">
                      Kerjasama
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      5
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.cooperationBobot || 0) <= 50
                        ? DATA_DETAIL.cooperationBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.cooperationBobot || 0) <= 60 &&
                      (DATA_DETAIL.cooperationBobot || 0) >= 51
                        ? DATA_DETAIL.cooperationBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.cooperationBobot || 0) <= 70 &&
                      (DATA_DETAIL.cooperationBobot || 0) >= 61
                        ? DATA_DETAIL.cooperationBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.cooperationBobot || 0) <= 80 &&
                      (DATA_DETAIL.cooperationBobot || 0) >= 71
                        ? DATA_DETAIL.cooperationBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.cooperationBobot || 0) <= 100 &&
                      (DATA_DETAIL.cooperationBobot || 0) >= 81
                        ? DATA_DETAIL.cooperationBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {((DATA_DETAIL.cooperationBobot || 0) * 50) / 100}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black text-center px-2">
                      5
                    </td>
                    <td className="text-[10px] border border-black px-2">
                      Attitude
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      20
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.attitudeBobot || 0) <= 50
                        ? DATA_DETAIL.attitudeBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.attitudeBobot || 0) <= 60 &&
                      (DATA_DETAIL.attitudeBobot || 0) >= 51
                        ? DATA_DETAIL.attitudeBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.attitudeBobot || 0) <= 70 &&
                      (DATA_DETAIL.attitudeBobot || 0) >= 61
                        ? DATA_DETAIL.attitudeBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.attitudeBobot || 0) <= 80 &&
                      (DATA_DETAIL.attitudeBobot || 0) >= 71
                        ? DATA_DETAIL.attitudeBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {(DATA_DETAIL.attitudeBobot || 0) <= 100 &&
                      (DATA_DETAIL.attitudeBobot || 0) >= 81
                        ? DATA_DETAIL.attitudeBobot || 0
                        : "-"}
                    </td>
                    <td className="text-[10px] border border-black text-center px-2">
                      {((DATA_DETAIL.attitudeBobot || 0) * 20) / 100}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      className="text-[10pt] border border-black bg-gray-200"
                      colSpan={2}
                    >
                      Total Nilai
                    </th>
                    <th className="text-[10pt] border border-black bg-gray-200">
                      100
                    </th>
                    <th
                      className="text-[10pt] border border-black bg-gray-200"
                      colSpan={5}
                    ></th>
                    <th className="text-[10pt] border border-black bg-gray-200">
                      {(
                        ((DATA_DETAIL.performanceBobot || 0) * 50) / 100 +
                        ((DATA_DETAIL.disciplineBobot || 0) * 20) / 100 +
                        ((DATA_DETAIL.loyaltyBobot || 0) * 5) / 100 +
                        ((DATA_DETAIL.cooperationBobot || 0) * 5) / 100 +
                        ((DATA_DETAIL.attitudeBobot || 0) * 20) / 100
                      ).toFixed(2)}
                    </th>
                  </tr>
                </tfoot>
              </table>
              <br />
              <table className="w-auto">
                <tbody>
                  <tr>
                    <td className="p-2 sm:text-sm text-xs min-w-24 text-gray-600 font-normal border-b border-black">
                      {"Nilai <= 50"}
                    </td>
                    <td className="p-2 sm:text-sm text-xs text-gray-600 font-normal border-b border-black">
                      |
                    </td>
                    <td className="p-2 sm:text-sm text-xs min-w-96 text-gray-600 font-normal border-b border-black">
                      Tidak dapat direkomendasikan
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 sm:text-sm text-xs min-w-24 text-gray-600 font-normal border-b border-black">
                      {"Nilai 51 - 60"}
                    </td>
                    <td className="p-2 sm:text-sm text-xs text-gray-600 font-normal border-b border-black">
                      |
                    </td>
                    <td className="p-2 pe-8 sm:text-sm text-xs min-w-96 text-gray-600 font-normal border-b border-black">
                      Dapat dipertimbangkan untuk direkomendasikan dengan
                      catatan
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 sm:text-sm text-xs min-w-24 text-gray-600 font-normal border-b border-black">
                      {"Nilai 61 - 70"}
                    </td>
                    <td className="p-2 sm:text-sm text-xs text-gray-600 font-normal border-b border-black">
                      |
                    </td>
                    <td className="p-2 sm:text-sm text-xs min-w-96 text-gray-600 font-normal border-b border-black">
                      Dapat dipertimbangkan untuk direkomendasikan dengan
                      catatan
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 sm:text-sm text-xs min-w-24 text-gray-600 font-normal border-b border-black">
                      {"Nilai 71 - 80"}
                    </td>
                    <td className="p-2 sm:text-sm text-xs text-gray-600 font-normal border-b border-black">
                      |
                    </td>
                    <td className="p-2 sm:text-sm text-xs min-w-96 text-gray-600 font-normal border-b border-black">
                      Direkomendasikan dengan catatan
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 sm:text-sm text-xs min-w-24 text-gray-600 font-normal border-b border-black">
                      {"Nilai 81 - 100"}
                    </td>
                    <td className="p-2 sm:text-sm text-xs text-gray-600 font-normal border-b border-black">
                      |
                    </td>
                    <td className="p-2 sm:text-sm text-xs min-w-96 text-gray-600 font-normal border-b border-black">
                      Direkomendasikan
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="print:break-after-page">
            <div>
              <div className="text-center font-bold text-[16pt]">
                <h1>
                  KUESIONER PENILAIAN KINERJA TENAGA PEGAWAI DI LINGKUNGAN
                  PEMERINTAH KABUPATEN BEKASI
                </h1>
              </div>
              <br />
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-[10pt] border border-black bg-green-500 px-4">
                      Variabel
                    </th>
                    <th
                      className="text-[10pt] border border-black bg-green-500"
                      colSpan={2}
                    >
                      Indikator
                    </th>
                    <th className="text-[10pt] border border-black bg-green-500">
                      Verifikasi Bukti
                    </th>
                    <th className="text-[10pt] border border-black bg-green-500 px-2">
                      Nilai
                    </th>
                    <th className="text-[10pt] border border-black bg-green-500">
                      Jawaban
                    </th>
                    <th className="text-[10pt] border border-black bg-green-500 px-2">
                      Link
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className="text-[10pt] border border-black align-top p-2"
                      rowSpan={5}
                    >
                      Kinerja
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat I
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Pelaksanaan Kinerja belum mempunyai target yang jelas
                    </td>
                    <td
                      className="text-[10pt] border border-black align-top p-2 text-center"
                      rowSpan={5}
                    >
                      {DATA_DETAIL.performanceProofNilai ? 1 : 0}
                    </td>
                    <td
                      className="text-[10pt] border border-black align-top p-2 text-center"
                      rowSpan={5}
                    >
                      {DATA_DETAIL.performanceNilai || 0}
                    </td>
                    <td
                      className="text-[10pt] border border-black align-top p-2"
                      rowSpan={5}
                    >
                      {CaseNilai(DATA_DETAIL.performanceNilai || 0)}
                    </td>
                    <td
                      className="text-[10pt] border border-black align-top p-2"
                      rowSpan={5}
                    >
                      {DATA_DETAIL.performanceProofNilai ? (
                        <a href={DATA_DETAIL.performanceProofNilai}>
                          File Bukti
                        </a>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat II
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Pelaksanaan Kinerja sudah mempunyai target kinerja
                      tertuang dalam jobdesk masing masing tenaga PEGAWAI
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat III
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Pelaksanaan kinerja dapat diselesaikan namun ada beberapa
                      yang selesai dansebagian tidak tepat waktu
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat IV
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Pelaksanaan kinerja selesai tepat pada waktu yang
                      ditentukan
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat V
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Pelaksanaan kinerja selesai semua tepat pada waktunya
                      ditambah denganpenyelesaian tugas tambahan dan disposisi
                      dari pimpinan
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="print:break-after-page">
            <div>
              <div className="text-center font-bold text-[16pt]">
                <h1>
                  KUESIONER PENILAIAN DISIPLIN TENAGA PEGAWAI DI LINGKUNGAN
                  PEMERINTAH KABUPATEN BEKASI
                </h1>
              </div>
              <br />
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-[10pt] border border-black bg-blue-500 px-4">
                      Variabel
                    </th>
                    <th
                      className="text-[10pt] border border-black bg-blue-500"
                      colSpan={2}
                    >
                      Indikator
                    </th>
                    <th className="text-[10pt] border border-black bg-blue-500">
                      Verifikasi Bukti
                    </th>
                    <th className="text-[10pt] border border-black bg-blue-500 px-2">
                      Nilai
                    </th>
                    <th className="text-[10pt] border border-black bg-blue-500">
                      Jawaban
                    </th>
                    <th className="text-[10pt] border border-black bg-blue-500 px-2">
                      Link
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className="text-[10pt] border border-black align-top p-2"
                      rowSpan={5}
                    >
                      Disiplin
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat I
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tidak Hadir lebih dari 3 hari, berturut-turut, mauapun
                      berulang dalam jeda waktu tertentu
                    </td>
                    <td
                      className="text-[10pt] border border-black align-top p-2 text-center"
                      rowSpan={5}
                    >
                      {DATA_DETAIL.disciplineProofNilai ? 1 : 0}
                    </td>
                    <td
                      className="text-[10pt] border border-black align-top p-2 text-center"
                      rowSpan={5}
                    >
                      {DATA_DETAIL.disciplineNilai || 0}
                    </td>
                    <td
                      className="text-[10pt] border border-black align-top p-2"
                      rowSpan={5}
                    >
                      {CaseNilai(DATA_DETAIL.disciplineNilai || 0)}
                    </td>
                    <td
                      className="text-[10pt] border border-black align-top p-2"
                      rowSpan={5}
                    >
                      {DATA_DETAIL.performanceProofNilai ? (
                        <a href={DATA_DETAIL.performanceProofNilai}>
                          File Bukti
                        </a>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat II
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tidak tepat waktu datang dan pulang kerja, tidak tepat
                      penggunaan seragam dinas
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat III
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tepat waktu datang dan/atau tidak tepat waktu pulang kerja
                      atau sebaliknya, tidak tepat penggunaan seragam dinas
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat IV
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tepat waktu datang dan pulang kerja, tidak tepat
                      penggunaan seragam dinas dan/atau sebaliknya{" "}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat V
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tepat waktu datang, tepat waktu pulang, tepat penggunaan
                      seragam dinas, plus pulang lebih akhir untuk menyelesaikan
                      tugas dilebih waktu.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="print:break-after-page">
            <div>
              <div className="text-center font-bold text-[16pt]">
                <h1>
                  KUESIONER PENILAIAN LOYALITAS TENAGA PEGAWAI DI LINGKUNGAN
                  PEMERINTAH KABUPATEN BEKASI
                </h1>
              </div>
              <br />
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-[10pt] border border-black bg-orange-500 px-4">
                      Variabel
                    </th>
                    <th
                      className="text-[10pt] border border-black bg-orange-500"
                      colSpan={2}
                    >
                      Indikator
                    </th>
                    <th className="text-[10pt] border border-black bg-orange-500">
                      Verifikasi Bukti
                    </th>
                    <th className="text-[10pt] border border-black bg-orange-500 px-2">
                      Nilai
                    </th>
                    <th className="text-[10pt] border border-black bg-orange-500">
                      Jawaban
                    </th>
                    <th className="text-[10pt] border border-black bg-orange-500 px-2">
                      Link
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className="text-[10pt] border border-black align-top p-2"
                      rowSpan={5}
                    >
                      Loyalitas
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat I
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      1. Keinginan kuat untuk tetap menjadi anggota organisasi;{" "}
                      <br />
                      2. Keinginan dan penerimaan yang kuat terhadap nilai dan
                      tujuan organisasi; <br />
                      3. Memberikan ide kreatif tanpa paksaaan; <br />
                      4. Melaksanakan tugas tanpa paksaan; dan <br />
                      5. Melaporkan hasil kerja pada atasan
                    </td>
                    <td
                      className="text-[10pt] border border-black align-top p-2 text-center"
                      rowSpan={5}
                    >
                      {DATA_DETAIL.loyaltyProofNilai ? 1 : 0}
                    </td>
                    <td
                      className="text-[10pt] border border-black align-top p-2 text-center"
                      rowSpan={5}
                    >
                      {DATA_DETAIL.loyaltyNilai || 0}
                    </td>
                    <td
                      className="text-[10pt] border border-black align-top p-2"
                      rowSpan={5}
                    >
                      {CaseNilai(DATA_DETAIL.loyaltyNilai || 0)}
                    </td>
                    <td
                      className="text-[10pt] border border-black align-top p-2"
                      rowSpan={5}
                    >
                      {DATA_DETAIL.loyaltyProofNilai ? (
                        <a href={DATA_DETAIL.loyaltyProofNilai}>File Bukti</a>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat II
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      1. Keinginan kuat untuk tetap menjadi anggota organisasi;{" "}
                      <br />
                      2. Keinginan dan penerimaan yang kuat terhadap nilai dan
                      tujuan organisasi; <br />
                      3. Memberikan ide kreatif tanpa paksaaan; <br />
                      4. Melaksanakan tugas tanpa paksaan; dan <br />
                      5. Melaporkan hasil kerja pada atasan
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat III
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      1. Keinginan kuat untuk tetap menjadi anggota organisasi;{" "}
                      <br />
                      2. Keinginan dan penerimaan yang kuat terhadap nilai dan
                      tujuan organisasi; <br />
                      3. Memberikan ide kreatif tanpa paksaaan; <br />
                      4. Melaksanakan tugas tanpa paksaan; dan <br />
                      5. Melaporkan hasil kerja pada atasan
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat IV
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      1. Keinginan kuat untuk tetap menjadi anggota organisasi;{" "}
                      <br />
                      2. Keinginan dan penerimaan yang kuat terhadap nilai dan
                      tujuan organisasi; <br />
                      3. Memberikan ide kreatif tanpa paksaaan; <br />
                      4. Melaksanakan tugas tanpa paksaan; dan <br />
                      5. Melaporkan hasil kerja pada atasan
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat V
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      1. Keinginan kuat untuk tetap menjadi anggota organisasi;{" "}
                      <br />
                      2. Keinginan dan penerimaan yang kuat terhadap nilai dan
                      tujuan organisasi; <br />
                      3. Memberikan ide kreatif tanpa paksaaan; <br />
                      4. Melaksanakan tugas tanpa paksaan; dan <br />
                      5. Melaporkan hasil kerja pada atasan
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="print:break-after-page">
            <div>
              <div className="text-center font-bold text-[16pt]">
                <h1>
                  KUESIONER PENILAIAN KERJASAMA TENAGA PEGAWAI DI LINGKUNGAN
                  PEMERINTAH KABUPATEN BEKASI
                </h1>
              </div>
              <br />
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-[10pt] border border-black bg-gray-500 px-4">
                      Variabel
                    </th>
                    <th
                      className="text-[10pt] border border-black bg-gray-500"
                      colSpan={2}
                    >
                      Indikator
                    </th>
                    <th className="text-[10pt] border border-black bg-gray-500">
                      Verifikasi Bukti
                    </th>
                    <th className="text-[10pt] border border-black bg-gray-500 px-2">
                      Nilai
                    </th>
                    <th className="text-[10pt] border border-black bg-gray-500">
                      Jawaban
                    </th>
                    <th className="text-[10pt] border border-black bg-gray-500 px-2">
                      Link
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className="text-[10pt] border border-black align-top p-2"
                      rowSpan={5}
                    >
                      Kerjasama
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat I
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tidak dapat bekerjasama dengan tim
                    </td>
                    <td
                      className="text-[10pt] border border-black align-top p-2 text-center"
                      rowSpan={5}
                    >
                      {DATA_DETAIL.cooperationProofNilai ? 1 : 0}
                    </td>
                    <td
                      className="text-[10pt] border border-black align-top p-2 text-center"
                      rowSpan={5}
                    >
                      {DATA_DETAIL.cooperationNilai || 0}
                    </td>
                    <td
                      className="text-[10pt] border border-black align-top p-2"
                      rowSpan={5}
                    >
                      {CaseNilai(DATA_DETAIL.cooperationNilai || 0)}
                    </td>
                    <td
                      className="text-[10pt] border border-black align-top p-2"
                      rowSpan={5}
                    >
                      {DATA_DETAIL.cooperationProofNilai ? (
                        <a href={DATA_DETAIL.cooperationProofNilai}>
                          File Bukti
                        </a>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat II
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      melaksanakan tugas dan Tanggung jawab secara bersama-sama
                      dalam menyelesaikan pekerjaan
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat III
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tanggung jawab secara bersama-sama menyelesaikan
                      pekerjaan, dan saling berkontribusi terhadap penyelesaian
                      pekerjaan
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat IV
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tanggung jawab secara bersama-sama menyelesaikan
                      pekerjaan, saling berkontribusi terhadap penyelesaian
                      pekerjaan, dan Pengerahan kemampuan secara maksimal
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat V
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tanggung jawab secara bersama-sama menyelesaikan
                      pekerjaan, saling berkontribusi terhadap penyelesaian
                      pekerjaan, dan Pengerahan kemampuan secara maksimal serta
                      mampu melaksanakan tugas bersama lintas sektoral
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div>
              <div className="text-center font-bold text-[16pt]">
                <h1>
                  KUESIONER PENILAIAN ATTITUDE TENAGA PEGAWAI DI LINGKUNGAN
                  PEMERINTAH KABUPATEN BEKASI
                </h1>
              </div>
              <br />
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-[10pt] border border-black bg-red-500 px-4">
                      Variabel
                    </th>
                    <th
                      className="text-[10pt] border border-black bg-red-500"
                      colSpan={2}
                    >
                      Indikator
                    </th>
                    <th className="text-[10pt] border border-black bg-red-500">
                      Verifikasi Bukti
                    </th>
                    <th className="text-[10pt] border border-black bg-red-500 px-2">
                      Nilai
                    </th>
                    <th className="text-[10pt] border border-black bg-red-500">
                      Jawaban
                    </th>
                    <th className="text-[10pt] border border-black bg-red-500 px-2">
                      Link
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className="text-[10pt] border border-black align-top p-2"
                      rowSpan={5}
                    >
                      Attitude
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat I
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      1. Sopan dan Ramah;
                      <br />
                      2. Konsisten;
                      <br />
                      3. Jujur dan dapat dipercaya;
                      <br />
                      4. Menjaga Hubungan dengan Rekan Kerja dan pimpinan;
                      <br />
                      5. Rendah Hati
                    </td>
                    <td
                      className="text-[10pt] border border-black align-top p-2 text-center"
                      rowSpan={5}
                    >
                      {DATA_DETAIL.attitudeProofNilai ? 1 : 0}
                    </td>
                    <td
                      className="text-[10pt] border border-black align-top p-2 text-center"
                      rowSpan={5}
                    >
                      {DATA_DETAIL.attitudeNilai || 0}
                    </td>
                    <td
                      className="text-[10pt] border border-black align-top p-2"
                      rowSpan={5}
                    >
                      {CaseNilai(DATA_DETAIL.attitudeNilai || 0)}
                    </td>
                    <td
                      className="text-[10pt] border border-black align-top p-2"
                      rowSpan={5}
                    >
                      {DATA_DETAIL.attitudeProofNilai ? (
                        <a href={DATA_DETAIL.attitudeProofNilai}>File Bukti</a>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat II
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      1. Sopan dan Ramah;
                      <br />
                      2. Konsisten;
                      <br />
                      3. Jujur dan dapat dipercaya;
                      <br />
                      4. Menjaga Hubungan dengan Rekan Kerja dan pimpinan;
                      <br />
                      5. Rendah Hati
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat III
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      1. Sopan dan Ramah;
                      <br />
                      2. Konsisten;
                      <br />
                      3. Jujur dan dapat dipercaya;
                      <br />
                      4. Menjaga Hubungan dengan Rekan Kerja dan pimpinan;
                      <br />
                      5. Rendah Hati
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat IV
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      1. Sopan dan Ramah;
                      <br />
                      2. Konsisten;
                      <br />
                      3. Jujur dan dapat dipercaya;
                      <br />
                      4. Menjaga Hubungan dengan Rekan Kerja dan pimpinan;
                      <br />
                      5. Rendah Hati
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[10pt] border border-black align-top p-2">
                      Tingkat V
                    </td>
                    <td className="text-[10pt] border border-black align-top p-2">
                      1. Sopan dan Ramah;
                      <br />
                      2. Konsisten;
                      <br />
                      3. Jujur dan dapat dipercaya;
                      <br />
                      4. Menjaga Hubungan dengan Rekan Kerja dan pimpinan;
                      <br />
                      5. Rendah Hati
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
