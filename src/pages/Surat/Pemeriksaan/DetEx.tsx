import { DMYIndoToFormat } from "@/utils/dateFormater";
import { Commet } from "react-loading-indicators";
import KOP from "@/assets/kop.png";
import { SuratPemeriksaanRes } from "@/interface/responses/surat.interface";

interface props {
  DATA_DETAIL: SuratPemeriksaanRes;
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
          <h1 className="text-center font-bold text-xl underline">
            SURAT PERINTAH
          </h1>
          <div className="flex items-center justify-center font-normal gap-2 my-2">
            Nomor : {DATA_DETAIL?.nomorSurat}
          </div>
          <div className="mb-2">Yang bertanda tangan di bawah ini:</div>
          <div className="flex flex-col ms-12">
            <div className="flex items-center font-normal gap-2">
              <div className="w-24">Nama </div>
              <span className="font-semibold">
                :&nbsp;&nbsp;&nbsp;{DATA_DETAIL?.namaTtd}
              </span>
            </div>
            <div className="flex items-center font-normal gap-2">
              <div className="w-24">NIP </div>
              :&nbsp;&nbsp;&nbsp;{DATA_DETAIL?.nipTtd}
            </div>
            <div className="flex items-center font-normal gap-2">
              <div className="w-24">Jabatan </div>
              :&nbsp;&nbsp;&nbsp;{DATA_DETAIL?.jabatanTtd}
            </div>
          </div>
          <br />
          <div className="mb-2">Memerintahkan kepada:</div>
          <div className="flex flex-col ms-12">
            <div className="flex items-center font-normal gap-2">
              <div className="w-24">Nama </div>
              <span className="font-semibold">
                :&nbsp;&nbsp;&nbsp;{DATA_DETAIL?.diPerintah}
              </span>
            </div>
            <div className="flex items-center font-normal gap-2">
              <div className="w-24">NIP </div>
              :&nbsp;&nbsp;&nbsp;{DATA_DETAIL?.nipDiPerintah}
            </div>
            <div className="flex items-center font-normal gap-2">
              <div className="w-24">Jabatan </div>
              :&nbsp;&nbsp;&nbsp;{DATA_DETAIL?.jabatanDiPerintah}
            </div>
          </div>
          <br />
          <div className="flex gap-2">
            <div className="me-24">Untuk</div>
            <span>:</span>
            <div
              className="ck-editor-keterangan ms-1"
              dangerouslySetInnerHTML={{
                __html: DATA_DETAIL?.keterangan || "",
              }}
            />
          </div>
          <br />
          <br />
          <div className="ms-auto text-start">
            <div className="flex items-center font-normal gap-2">
              <div className="w-36">Dikeluarkan di</div>:{" "}
              {DATA_DETAIL?.tempatDikeluarkan}
            </div>
            <div className="flex items-center font-normal gap-2">
              <div className="w-36">Pada Tanggal</div>:{" "}
              {DATA_DETAIL?.tanggalSurat
                ? DMYIndoToFormat(DATA_DETAIL?.tanggalSurat)
                : ""}
            </div>
            <br />
            <div className="ms-auto max-w-[400px]">
              <div className="flex items-center font-semibold gap-2">
                {DATA_DETAIL?.jabatanPemberiPerintah || "Autofill jabatan"}
              </div>
              <br />
              <br />
              <br />
              <br />
              <div className="flex items-center font-semibold gap-2 underline">
                {DATA_DETAIL?.pemberiPerintah || "Autofill nama"}
              </div>
              <div className="flex items-center font-normal gap-2">
                NIP.{DATA_DETAIL?.nipPemberiPerintah || "Autofill NIP"}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
