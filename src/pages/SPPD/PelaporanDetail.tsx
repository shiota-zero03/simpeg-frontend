import Logo from "@/assets/logo.png";
import { Commet } from "react-loading-indicators";
import { PelaporanSPPDRes } from "@/interface/responses/sppd.interface";
import { MYIndoToFormat } from "@/utils/dateFormater";
import GrafikSPPD from "@/components/Charts/GrafikLaporanSppd";

interface props {
  DATA_DETAIL: PelaporanSPPDRes;
  isFetching: boolean;
  data: {
    no: number;
    nama: string;
    norek: string;
    nosp: string;
    tgl: string;
    tujuan: string;
    uraian: string;
    transport: number;
    xtransport: number;
    jumlahtransport: number;
    representatif: number;
    xrepresentatif: number;
    jumlahrepresentatif: number;
    daily: number;
    xdaily: number;
    jumlahdaily: number;
    total: number;
    type: string;
    issame: boolean;
  }[];
}

export default function DetailExportSurat({
  DATA_DETAIL,
  isFetching,
  data,
}: props) {
  return (
    <>
      <style>{`
            @media print {
            @page {
                size: potrait;
                margin: 0;
                padding: 1.5cm;
            }
            body {
              margin: 0;
              font-family: "Arial", serif;
            }

            * {
              font-family: "Arial", serif !important;
            }
            }
        `}</style>

      {isFetching ? (
        <div className="inset-0 fixed flex items-center justify-center z-20">
          <Commet color="#32cd32" size="medium" text="" textColor="" />
        </div>
      ) : (
        <div className="flex flex-col text-lg">
          <div className="print:break-after-page flex flex-col gap-4 items-center justify-center">
            <br />
            <br />
            <h1 className="text-[14pt] font-semibold text-center">
              LAPORAN KEGIATAN ADMINISTRASI UMUM PERANGKAT DAERAH
            </h1>
            <h1 className="text-[12pt] text-center">
              SUB KEGIATAN PENYELENGGARAAN RAPAT KOORDINASI DAN KONSULTASI SKPD
            </h1>
            <br />
            <h1 className="text-[14pt] text-center">
              DAFTAR PERJALANAN DINAS APARATUR SIPIL NEGARA DINAS PERDAGANGAN{" "}
              {MYIndoToFormat(DATA_DETAIL.createdAt).toUpperCase()}{" "}
            </h1>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <img src={Logo} alt="logo" className="w-[30%]" />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1 className="text-[17pt] font-semibold text-center">
              PEMERINTAH KABUPATEN BEKASI
            </h1>
            <h1 className="text-[17pt] font-semibold text-center">
              DINAS PERDAGANGAN
            </h1>
            <h1 className="text-[17pt] font-semibold text-center">
              Komplek Perkantoran Pemerintah Kabupaten Bekasi
            </h1>
            <h1 className="text-[17pt] font-semibold text-center">
              Desa Sukamahi Kecamatan Cikarang Pusal Telp 021-8997
            </h1>
            <br />
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-[14pt] text-center font-semibold">
              LAPORAN
              <br />
              DAFTAR PERJALANAN DINAS APARATUR SIPIL NEGARA DINAS PERDAGANGAN{" "}
              {MYIndoToFormat(DATA_DETAIL.createdAt).toUpperCase()}{" "}
            </h1>
            <br />
            <div>
              <div className="font-semibold text-[12pt] mb-2">
                I. Latar Belakang
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: DATA_DETAIL.latarBelakang }}
              />
            </div>
            <div>
              <div className="font-semibold text-[12pt] mb-2">II. Sasaran</div>
              <div dangerouslySetInnerHTML={{ __html: DATA_DETAIL.sasaran }} />
            </div>
            <div>
              <div className="font-semibold text-[12pt] mb-2">
                III. Maksud dan Tujuan
              </div>
              <div className="font-semibold text-[12pt] mb-2">Maksud</div>
              <div dangerouslySetInnerHTML={{ __html: DATA_DETAIL.maksud }} />
              <br />
              <div className="font-semibold text-[12pt] mb-2">Tujuan</div>
              <div dangerouslySetInnerHTML={{ __html: DATA_DETAIL.tujuan }} />
            </div>
            <div>
              <div className="font-semibold text-[12pt] mb-2">
                IV. Dasar Hukum
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: DATA_DETAIL.dasarHukum }}
              />
            </div>
            <div>
              <div className="font-semibold text-[12pt] mb-2">
                V. Isi Laporan
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: DATA_DETAIL.isiLaporan }}
              />
            </div>
            <br />
            <div className="grid grid-cols-2 gap-2 print:break-after-page">
              <div className="flex flex-col gap-2 items-center justify-center font-semibold avoid-break">
                <div>{DATA_DETAIL.jabatanPengelola}</div>
                <br />
                <br />
                <br />
                <br />
                <div>{DATA_DETAIL.pengelola}</div>
                <div>NIP.{DATA_DETAIL.nipPengelola}</div>
              </div>
              <div className="flex flex-col gap-2 items-center justify-center font-semibold avoid-break">
                <div>{DATA_DETAIL.jabatanSekertaris}</div>
                <br />
                <br />
                <br />
                <br />
                <div>{DATA_DETAIL.sekertaris}</div>
                <div>NIP.{DATA_DETAIL.nipSekertaris}</div>
              </div>
              <br />
              <div className="col-span-2 flex flex-col gap-2 items-center justify-center font-semibold avoid-break">
                <div>{DATA_DETAIL.jabatanSubagin}</div>
                <br />
                <br />
                <br />
                <br />
                <div>{DATA_DETAIL.subgadin}</div>
                <div>NIP.{DATA_DETAIL.nipSubagin}</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-[12pt] mb-2">
                Berikut lampiran data perjalanan dinas yang disajikan dalam
                bentuk grafik
              </div>
              <GrafikSPPD data={data} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
