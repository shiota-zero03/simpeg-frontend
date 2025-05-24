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
          <h1 className="text-center fonttext-xl">RAHASIA</h1>
          <h1 className="text-center text-xl">
            KEPUTUSAN KEPALA DINAS PERDAGANGAN
          </h1>
          <h1 className="text-center font-bold text-xl">
            NOMOR: {DATA_DETAIL.nomorSurat}
          </h1>
          <h1 className="text-center text-xl">TENTANG</h1>
          <h1 className="text-center text-xl">
            HUKUMAN DISIPLIN TINGKAT {DATA_DETAIL.tingkat ==="TINGGI" ? "BERAT" : (DATA_DETAIL.tingkat ==="RENDAH" ? "RINGAN" : DATA_DETAIL.tingkat)}
          </h1>
          <h1 className="text-center text-xl mb-1">
            DENGAN RAHMAT TUHAN YANG MAHA ESA
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
          <h1 className="text-center text-xl mb-1">MEMUTUSKAN</h1>
          <h1 className="text-left">Menetapkan</h1>
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-start gap-2">
              <div className="w-28">Kesatu </div>:
              <div className="w-full">
                {DATA_DETAIL.kesatu}
                <div className="flex flex-col my-2">
                  <div className="flex items-center gap-2">
                    <div className="w-28">Nama </div>: &nbsp;&nbsp;&nbsp;
                    {DATA_DETAIL.nameYangDitetapkan}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-28">NIP </div>: &nbsp;&nbsp;&nbsp;
                    {DATA_DETAIL.nipYangDitetapkan}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-28">Pangkat </div>: &nbsp;&nbsp;&nbsp;
                    {DATA_DETAIL.golonganYangDitetapkan}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-28">Jabatan </div>: &nbsp;&nbsp;&nbsp;
                    {DATA_DETAIL.jabatanYangDitetapkan}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-28">Unit Kerja </div>: &nbsp;&nbsp;&nbsp;
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
            <div className="ms-auto max-w-[400px]">
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
              Tembusan &nbsp;&nbsp;:
            </div>
            {DATA_DETAIL.tembusan.map((item, index) => (
              <div
                key={index}
                className="flex items-center font-semibold gap-2"
              >
                {index + 1}.&nbsp;&nbsp;{item.jabatan}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
