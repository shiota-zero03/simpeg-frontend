import {
  DaysDMYIndoToFormat,
  DMYIndoToFormat,
  HIDateformat,
} from "@/utils/dateFormater";
import { Commet } from "react-loading-indicators";
import KOP from "@/assets/kop.png";
import { SuratPemanggilanRes } from "@/interface/responses/surat.interface";

interface props {
  DATA_DETAIL: SuratPemanggilanRes;
  isFetching: boolean;
  kopSurat: string;
}

export default function DetailExportSurat({
  DATA_DETAIL,
  isFetching,
  kopSurat,
}: props) {
  return (
    <>
      {isFetching ? (
        <div className="inset-0 fixed flex items-center justify-center z-20">
          <Commet color="#32cd32" size="medium" text="" textColor="" />
        </div>
      ) : (
        <div className="flex flex-col text-lg px-24 py-12">
          <img src={kopSurat || KOP} alt="kop-surat" className="w-full" />
          <br />
          <h1 className="text-center font-bold text-xl">RAHASIA</h1>
          <h1 className="text-center font-bold text-xl my-1">
            SURAT PEMANGGILAN {DATA_DETAIL.nomorPemanggilan}
          </h1>
          <div className="flex items-center justify-center font-normal gap-2 my-2.5">
            Nomor : {DATA_DETAIL?.nomorSurat}
          </div>
          <div className="mb-2">
            1. Bersama ini diminta dengan hormat kehadiran saudara:
          </div>
          <div className="flex flex-col ms-12">
            <div className="flex items-center font-normal gap-2">
              <div className="w-36">Nama </div>
              <span className="font-semibold">
                :&nbsp;{DATA_DETAIL?.diPanggil}
              </span>
            </div>
            <div className="flex items-center font-normal gap-2">
              <div className="w-36">NIP </div>
              :&nbsp;{DATA_DETAIL?.nipDiPanggil}
            </div>
            <div className="flex items-center font-normal gap-2">
              <div className="w-36">Unit Kerja </div>
              :&nbsp;{DATA_DETAIL?.unitDiPanggil}
            </div>
            <div className="flex items-center font-normal gap-2">
              <div className="w-36">Jabatan </div>
              :&nbsp;{DATA_DETAIL?.jabatanDiPanggil}
            </div>
          </div>
          <div className="mb-2">Untuk menghadap kepada</div>
          <div className="flex flex-col ms-12">
            <div className="flex items-center font-normal gap-2">
              <div className="w-36">Nama </div>
              <span className="font-semibold">
                :&nbsp;{DATA_DETAIL?.pemanggil}
              </span>
            </div>
            <div className="flex items-center font-normal gap-2">
              <div className="w-36">NIP </div>
              :&nbsp;{DATA_DETAIL?.nipPemanggil}
            </div>
            <div className="flex items-center font-normal gap-2">
              <div className="w-36">Unit Kerja </div>
              :&nbsp;{DATA_DETAIL?.unitPemanggil}
            </div>
            <div className="flex items-center font-normal gap-2">
              <div className="w-36">Jabatan </div>
              :&nbsp;{DATA_DETAIL?.jabatanPemanggil}
            </div>
          </div>
          <div className="mb-2">Pada</div>
          <div className="flex flex-col ms-12">
            <div className="flex items-center font-normal gap-2">
              <div className="w-36">Hari, Tanggal </div>
              :&nbsp;
              {DATA_DETAIL?.waktu ? DaysDMYIndoToFormat(DATA_DETAIL.waktu) : ""}
            </div>
            <div className="flex items-center font-normal gap-2">
              <div className="w-36">Jam </div>
              :&nbsp;{DATA_DETAIL?.waktu
                ? HIDateformat(DATA_DETAIL.waktu)
                : ""}{" "}
              WIB
            </div>
            <div className="flex items-center font-normal gap-2">
              <div className="w-36">Tempat </div>
              :&nbsp;{DATA_DETAIL?.tempat}
            </div>
          </div>
          <div className="flex gap-4">
            Untuk {DATA_DETAIL?.keterangan || ""}
          </div>
          <div>2. Demikian untuk dilaksanakan.</div>
          <br />
          <br />
          <div className="ms-auto text-start">
            <div className="flex items-center font-normal gap-2">
              Bekasi,
              {DATA_DETAIL?.tanggalSurat
                ? DMYIndoToFormat(DATA_DETAIL?.tanggalSurat)
                : ""}
            </div>
            <div className="ms-auto">
              <div className="flex items-center font-semibold gap-2">
                {DATA_DETAIL?.jabatanTtd || "Autofill jabatan"}
              </div>
              <br />
              <br />
              <br />
              <br />
              <div className="flex items-center font-semibold gap-2">
                {DATA_DETAIL?.namaTtd || "Autofill nama"}
              </div>
              <div className="flex items-center font-normal gap-2">
                NIP.{DATA_DETAIL?.nipTtd || "Autofill NIP"}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
