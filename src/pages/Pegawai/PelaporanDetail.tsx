import Logo from "@/assets/logo.png";
import { Commet } from "react-loading-indicators";
import {
  PegawaiRes,
  PelaporanPegawaiRes,
} from "@/interface/responses/pegawai.interface";
import { MYIndoToFormat } from "@/utils/dateFormater";
import GrafikPegawai from "@/components/Charts/GrafikLaporanPegawai";

interface props {
  DATA_DETAIL: PelaporanPegawaiRes;
  isFetching: boolean;
  user: PegawaiRes[];
}

export default function DetailExportSurat({
  DATA_DETAIL,
  isFetching,
  user,
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
              LAPORAN KEGIATAN ADMINISTRASI KEPEGAWAIAN PERANGKAT DAERAH
            </h1>
            <h1 className="text-[12pt] text-center">
              SUB KEGIATAN PENDATAAN DAN PENGOLAHAN ADMINISTRASI KEPEGAWAIAN
            </h1>
            <br />
            <h1 className="text-[14pt] text-center font-medium">
              DAFTAR NOMINATIF PEGAWAI APARATUR SIPIL NEGARA DINAS PERDAGANGAN{" "}
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
              DAFTAR NOMINATIF PEGAWAI APARATUR SIPIL NEGARA DINAS PERDAGANGAN{" "}
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
            <div className="grid grid-cols-2 gap-2 print:break-after-page avoid-break">
              <div className="flex flex-col gap-2 items-center justify-center font-semibold">
                <div>{DATA_DETAIL.jabatanPengelola}</div>
                <br />
                <br />
                <br />
                <div>{DATA_DETAIL.pengelola}</div>
                <div>NIP.{DATA_DETAIL.nipPengelola}</div>
              </div>
              <div className="flex flex-col gap-2 items-center justify-center font-semibold">
                <div>{DATA_DETAIL.jabatanSekertaris}</div>
                <br />
                <br />
                <br />
                <div>{DATA_DETAIL.sekertaris}</div>
                <div>NIP.{DATA_DETAIL.nipSekertaris}</div>
              </div>
              <br />
              <div className="col-span-2 flex flex-col gap-2 items-center justify-center font-semibold">
                <div>{DATA_DETAIL.jabatanSubagin}</div>
                <br />
                <br />
                <br />
                <div>{DATA_DETAIL.subgadin}</div>
                <div>NIP.{DATA_DETAIL.nipSubagin}</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-[12pt] mb-2">
                Berikut lampiran perhitungan data pegawai yang disajikan dalam
                bentuk grafik
              </div>
              <GrafikPegawai data={user} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
