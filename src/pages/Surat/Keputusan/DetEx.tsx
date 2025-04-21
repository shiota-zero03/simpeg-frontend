import { DMYIndoToFormat } from "@/utils/dateFormater";
import { Commet } from "react-loading-indicators";
import KOP from "@/assets/kop.png";
import { KeputusanRes } from "@/interface/responses/surat.interface";

interface props {
  DATA_DETAIL: KeputusanRes;
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
          <h1 className="text-center font-bold text-xl mb-1">RAHASIA</h1>
          <h1 className="text-center font-bold text-xl mb-1">
            KEPUTUSAN KEPALA DINAS PERDAGANGAN
          </h1>
          <h1 className="text-center font-bold text-xl mb-1">
            NOMOR: {DATA_DETAIL.nomorSurat}
          </h1>
          <h1 className="text-center font-bold text-xl mb-1">TENTANG</h1>
          <h1 className="text-center font-bold text-xl mb-1">
            HUKUMAN DISIPLIN TINGKAT {DATA_DETAIL.tingkat}
          </h1>
          <br />
          <div>
            <div className="flex items-start gap-2 mb-4">
              <div className="w-28">Membaca </div>:
              <div
                className="w-full"
                dangerouslySetInnerHTML={{ __html: DATA_DETAIL.membaca || "" }}
              />
            </div>
            <div className="flex items-start gap-2 mb-4">
              <div className="w-28">Menimbang </div>:
              <div
                className="w-full"
                dangerouslySetInnerHTML={{
                  __html: DATA_DETAIL.menimbang || "",
                }}
              />
            </div>
            <div className="flex items-start gap-2 mb-4">
              <div className="w-28">Mengingat </div>:
              <div
                className="w-full"
                dangerouslySetInnerHTML={{
                  __html: DATA_DETAIL.mengingat || "",
                }}
              />
            </div>
          </div>
          <br />
          <h1 className="text-center font-bold text-xl mb-1">MEMUTUSKAN</h1>
          <h1 className="text-left font-semibold">Menetapkan</h1>
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-start gap-2">
              <div className="w-28">Kesatu </div>:
              <div className="w-full">
                {DATA_DETAIL.kesatu}
                <div className="flex flex-col gap-2 my-2">
                  <div className="flex items-center gap-2">
                    <div className="w-[120pt]">Nama </div>:
                    {DATA_DETAIL.nameYangDitetapkan}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-[120pt]">NIP </div>:
                    {DATA_DETAIL.nipYangDitetapkan}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-[120pt]">Jabatan </div>:
                    {DATA_DETAIL.jabatanYangDitetapkan}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-[120pt]">Golongan </div>:
                    {DATA_DETAIL.golonganYangDitetapkan}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-[120pt]">Unit Kerja </div>:
                    {DATA_DETAIL.unitYangDitetapkan}
                  </div>
                </div>
                {DATA_DETAIL.alasan}
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-28">Kedua </div>:
              <div className="w-full">{DATA_DETAIL.kedua}</div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-28">Ketiga </div>:
              <div className="w-full">{DATA_DETAIL.ketiga}</div>
            </div>
          </div>
          <br />
          <div className="ms-auto text-start">
            <div className="flex items-center font-normal gap-2">
              <div className="w-36">Dikeluarkan di</div>:{" "}
              {DATA_DETAIL?.tempatDikeluarkan || "Bekasi"}
            </div>
            <div className="flex items-center font-normal gap-2">
              <div className="w-36">Pada Tanggal</div>:{" "}
              {DATA_DETAIL?.tanggalSurat
                ? DMYIndoToFormat(DATA_DETAIL?.tanggalSurat)
                : ""}
            </div>
            <br />
            <div className="ms-auto">
              <div className="flex items-center font-semibold gap-2">
                {DATA_DETAIL?.nameJabatan || "Autofill jabatan"}
              </div>
              <br />
              <br />
              <br />
              <br />
              <div className="flex items-center font-semibold gap-2 underline">
                {DATA_DETAIL?.ttdJabatan || "Autofill nama"}
              </div>
              <div className="flex items-center font-normal gap-2">
                NIP.{DATA_DETAIL?.nipJabatan || "Autofill NIP"}
              </div>
            </div>
          </div>
          <br />
          <div className="me-auto w-full">
            <div className="flex items-center justify-start font-semibold gap-2 mb-2">
              Tembusan Yth:
            </div>
            {DATA_DETAIL.tembusan.map((item, index) => (
              <div
                key={index}
                className="flex items-center font-semibold gap-2"
              >
                {index + 1}. {item.jabatan}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
