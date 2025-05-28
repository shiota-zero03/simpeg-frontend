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
  const nama = DATA_DETAIL.nameYangDitetapkan.split(";;");
  const nip = DATA_DETAIL.nipYangDitetapkan.split(";;");
  const jabatan = DATA_DETAIL.jabatanYangDitetapkan.split(";;");
  const golongan = DATA_DETAIL.golonganYangDitetapkan.split(";;");
  const unit = DATA_DETAIL.unitYangDitetapkan.split(";;");

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
          <h1 className="text-center fonttext-xl font-semibold mb-2">RAHASIA</h1>
          <h1 className="text-center text-xl">
            KEPUTUSAN KEPALA DINAS PERDAGANGAN
          </h1>
          <h1 className="text-center font-bold text-xl">
            NOMOR: {DATA_DETAIL.nomorSurat}
          </h1>
          <h1 className="text-center text-xl">TENTANG</h1>
          <h1 className="text-center text-xl">
            HUKUMAN DISIPLIN TINGKAT{" "}
            {DATA_DETAIL.tingkat === "TINGGI"
              ? "BERAT"
              : DATA_DETAIL.tingkat === "RENDAH"
                ? "RINGAN"
                : DATA_DETAIL.tingkat}
          </h1>
          <h1 className="text-center text-xl mb-1">
            DENGAN RAHMAT TUHAN YANG MAHA ESA
          </h1>
          <br />
          <div>
            <div className="flex items-start gap-2 mb-4">
              <div className="w-28">Membaca </div>:
              <div
                className="w-[calc(100%-7rem)]"
                dangerouslySetInnerHTML={{ __html: DATA_DETAIL.membaca || "" }}
              />
            </div>
            <div className="flex items-start gap-2 mb-4">
              <div className="w-28">Menimbang </div>:
              <div
                className="w-[calc(100%-7rem)]"
                dangerouslySetInnerHTML={{
                  __html: DATA_DETAIL.menimbang || "",
                }}
              />
            </div>
            <div className="flex items-start gap-2 mb-4">
              <div className="w-28">Mengingat </div>:
              <div
                className="w-[calc(100%-7rem)]"
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
              <div className="w-[calc(100%-7rem)]">
                {DATA_DETAIL.kesatu}
                {nama.map((item, index) => (
                  <div key={index} className="flex">
                    <div className="min-w-8 max-w-8">{index + 1}</div>
                    <div className="flex flex-col mb-2">
                      <div className="flex items-start gap-2">
                        <div className="min-w-[5.2rem] max-w-[5.2rem]">Nama </div>:
                        <div>{item}</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="min-w-[5.2rem] max-w-[5.2rem]">NIP </div>:
                        <div>{nip[index] || "-"}</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="min-w-[5.2rem] max-w-[5.2rem]">Pangkat </div>:
                        <div>{golongan[index] || "-"}</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="min-w-[5.2rem] max-w-[5.2rem]">Jabatan </div>:
                        <div>{jabatan[index] || "-"}</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="min-w-[5.2rem] max-w-[5.2rem]">Unit Kerja </div>:
                        <div>{unit[index] || "-"}</div>
                      </div>
                    </div>
                  </div>
                ))}
                Karena yang bersangkutan telah melakukan perbuatan yang
                melanggar ketentuan {DATA_DETAIL.alasan}
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-28">Kedua </div>:
              <div className="w-[calc(100%-7rem)]">{DATA_DETAIL.kedua}</div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-28">Ketiga </div>:
              <div className="w-[calc(100%-7rem)]">{DATA_DETAIL.ketiga}</div>
            </div>
          </div>
          <br />
          <div className="ms-auto text-start avoid-break">
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
          <div className="me-auto w-full avoid-break">
            <div className="flex items-center justify-start font-semibold gap-2 mb-2">
              Tembusan &nbsp;&nbsp;:
            </div>
            {DATA_DETAIL.tembusan.map((item, index) => (
              <div
                key={index}
                className="flex items-start font-semibold gap-2"
              >
                <span className="min-w-6 max-w-6">{index + 1}.</span>&nbsp;&nbsp;{item.jabatan}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
