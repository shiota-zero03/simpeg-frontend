import {
  DaysDMYIndoToFormat,
  DMYIndoToFormat,
  HIDateformat,
} from "@/utils/dateFormater";
import { Commet } from "react-loading-indicators";
import KOP from "@/assets/kop.png";
import { SuratPemanggilanRes } from "@/interface/responses/surat.interface";
import { toRoman } from "@/utils/terbilang";

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
          <div className="flex items-center justify-center font-normal gap-2 my-4">
            Nomor : {DATA_DETAIL?.nomorSurat}
          </div>
          <div className="flex items-center mb-2">
            <div className="w-8">1. </div>
            <div>Bersama ini diminta dengan hormat kehadiran saudara:</div>
          </div>
          {DATA_DETAIL.DiPanggilSuratPemanggilan?.map((item, index) => (
            <div key={index} className="ms-8 flex gap-2 items-start">
              <div>{toRoman(index + 1)}.</div>
              <div className="flex flex-col ms-2">
                <div className="flex items-start font-normal gap-2">
                  <div className="w-28">Nama </div>
                  <span className="font-semibold">
                    :&nbsp;&nbsp;&nbsp;{item.diPanggil || "-"}
                  </span>
                </div>
                <div className="flex items-start font-normal gap-2">
                  <div className="w-28">NIP </div>:
                  <div>{item.nipDiPanggil || "-"}</div>
                </div>
                <div className="flex items-start font-normal gap-2">
                  <div className="w-28">Unit Kerja </div>:
                  <div>{item.unitDiPanggil || "-"}</div>
                </div>
                <div className="flex items-start font-normal gap-2">
                  <div className="w-28">Jabatan </div>:
                  <div>{item.jabatanDiPanggil.split(";;")[0] || "-"}</div>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-4 ms-8">Untuk menghadap kepada</div>
          <div className="flex flex-col ms-8">
            <div className="flex items-start font-normal gap-2">
              <div className="w-28">Nama </div>:
              <div className="font-semibold">{DATA_DETAIL?.pemanggil}</div>
            </div>
            <div className="flex items-start font-normal gap-2">
              <div className="w-28">NIP </div>:
              <div>{DATA_DETAIL?.nipPemanggil}</div>
            </div>
            <div className="flex items-start font-normal gap-2">
              <div className="w-28">Unit Kerja </div>:
              <div>{DATA_DETAIL?.unitPemanggil}</div>
            </div>
            <div className="flex items-start font-normal gap-2">
              <div className="w-28">Jabatan </div>:
              <div>{DATA_DETAIL?.jabatanPemanggil}</div>
            </div>
          </div>
          <div className="mt-4 ms-8">Pada</div>
          <div className="flex flex-col ms-8">
            <div className="flex items-center font-normal gap-2">
              <div className="w-28">Hari, Tanggal </div>
              :&nbsp;&nbsp;&nbsp;
              {DATA_DETAIL?.waktu ? DaysDMYIndoToFormat(DATA_DETAIL.waktu) : ""}
            </div>
            <div className="flex items-center font-normal gap-2">
              <div className="w-28">Jam </div>
              :&nbsp;&nbsp;&nbsp;
              {DATA_DETAIL?.waktu ? HIDateformat(DATA_DETAIL.waktu) : ""} WIB
            </div>
            <div className="flex items-center font-normal gap-2">
              <div className="w-28">Tempat </div>
              :&nbsp;&nbsp;&nbsp;{DATA_DETAIL?.tempat}
            </div>
          </div>
          <div className="flex gap-4 ms-8 my-4">
            Untuk {DATA_DETAIL?.keterangan || ""}
          </div>
          <div className="flex items-center">
            <div className="w-8">2. </div>
            <div>Demikian untuk dilaksanakan.</div>
          </div>
          <br />
          <br />
          <div className="ms-auto text-start">
            <div className="flex items-center font-normal gap-2">
              Bekasi,
              {DATA_DETAIL?.tanggalSurat
                ? DMYIndoToFormat(DATA_DETAIL?.tanggalSurat)
                : ""}
            </div>
            <div className="ms-auto max-w-[280px]">
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
