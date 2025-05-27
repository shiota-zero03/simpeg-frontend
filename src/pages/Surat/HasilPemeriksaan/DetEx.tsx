import { DMYIndoToFormat, textToFormat } from "@/utils/dateFormater";
import { Commet } from "react-loading-indicators";
import KOP from "@/assets/kop.png";
import { HasilPemeriksaanRes } from "@/interface/responses/surat.interface";

interface props {
  DATA_DETAIL: HasilPemeriksaanRes;
  isFetching: boolean;
  kopSurat: string;
}

export default function DetailExportSurat({
  DATA_DETAIL,
  isFetching,
  kopSurat,
}: props) {
  const nama = DATA_DETAIL.namePermintaan.split(";;");
  const nip = DATA_DETAIL.nipPermintaan.split(";;");
  const jabatan = DATA_DETAIL.jabatanPermintaan.split(";;");
  const golongan = DATA_DETAIL.golonganPermintaan.split(";;");
  const unit = DATA_DETAIL.unitPermintaan.split(";;");

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
          <div className="ms-auto flex items-center justify-end gap-2">
            {DATA_DETAIL.lokasi}, {DMYIndoToFormat(DATA_DETAIL.tanggalSurat)}
          </div>
          <div className="flex">
            <div className="w-16 mt-7">Yth.</div>
            <div className="flex flex-col gap-0.5">
              <div>Kepada :</div>
              <div>{DATA_DETAIL.nameKepada}</div>
              <div>di -</div>
              <div>Tempat</div>
            </div>
          </div>
          <br />
          <h1 className="text-center font-bold text-xl">RAHASIA</h1>
          <div className="mb-2">
            Dengan ini dilaporkan dengan hormat, pada Hari{" "}
            {DATA_DETAIL.tanggalSurat
              ? textToFormat(DATA_DETAIL.tanggalSurat)
              : "-"}
            ,&nbsp;saya telah melakukan permintaan keterangan terhadap:
          </div>
          {nama.map((item, index) => (
            <div key={index} className="flex">
              <div className="w-8">{index + 1}</div>
              <div className="flex flex-col">
                <div className="flex items-top font-normal gap-2">
                  <div className="w-24">Nama </div>
                  <span>:</span>
                  <span className="font-semibold">
                    &nbsp;&nbsp;&nbsp;{item}
                  </span>
                </div>
                <div className="flex items-top font-normal gap-2">
                  <div className="w-24">NIP </div>
                  <span>:</span>
                  <span>&nbsp;&nbsp;&nbsp;{nip[index] || "-"}</span>
                </div>
                <div className="flex items-top font-normal gap-2">
                  <div className="w-24">Jabatan </div>
                  <span>:</span>
                  <span>&nbsp;&nbsp;&nbsp;{jabatan[index] || "-"}</span>
                </div>
                <div className="flex items-top font-normal gap-2">
                  <div className="w-24">Golongan </div>
                  <span>:</span>
                  <span>&nbsp;&nbsp;&nbsp;{golongan[index] || "-"}</span>
                </div>
                <div className="flex items-top font-normal gap-2">
                  <div className="w-24">Unit Kerja </div>
                  <span>:</span>
                  <span>&nbsp;&nbsp;&nbsp;{unit[index] || "-"}</span>
                </div>
              </div>
            </div>
          ))}
          <br />
          <div className="mb-2">
            Berdasarkan hal tersebut, dapat kami laporkan sebagai berikut:
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <td className="p-2 leading-6 border border-black font-semibold  uppercase text-center align-middle">
                    Bentuk Pelanggaran
                  </td>
                  <td className="p-2 leading-6 border border-black font-semibold  uppercase text-center align-middle">
                    Waktu
                  </td>
                  <td className="p-2 leading-6 border border-black font-semibold  uppercase text-center align-middle">
                    Tempat
                  </td>
                  <td className="p-2 leading-6 border border-black font-semibold  uppercase text-center align-middle">
                    Faktor Memberatkan
                  </td>
                  <td className="p-2 leading-6 border border-black font-semibold  uppercase text-center align-middle">
                    Faktor Meringankan
                  </td>
                  <td className="p-2 leading-6 border border-black font-semibold  uppercase text-center align-middle">
                    Dampak Perbuatan
                  </td>
                </tr>
              </thead>
              {DATA_DETAIL.hasil.length > 0 ? (
                <tbody>
                  {DATA_DETAIL.hasil.map((item, index) => (
                    <tr key={index}>
                      <td className="leading-6 p-2 border border-black font-medium">
                        {item.bentukPelanggaran}
                      </td>
                      <td className="leading-6 p-2 border border-black font-medium">
                        {item.waktu}
                      </td>
                      <td className="leading-6 p-2 border border-black font-medium">
                        {item.tempat}
                      </td>
                      <td className="leading-6 p-2 border border-black font-medium">
                        {item.faktorPemberat}
                      </td>
                      <td className="leading-6 p-2 border border-black font-medium">
                        {item.faktorMeringankan}
                      </td>
                      <td className="leading-6 p-2 border border-black font-medium">
                        {item.dampak}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={6}>
                      <div className="p-4 flex items-center justify-center flex-col text-gray-500">
                        <span className="italic text-xl">Belum ada hasil</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
          <br />
          <div
            dangerouslySetInnerHTML={{ __html: DATA_DETAIL.keterangan }}
            className="ms-12"
          />
          <br />
          <div>
            Sehubungan dengan hal tersebut, disampaikan Berita Acara Permintaan
            Keterangan terhadap PNS yang bersangkutan untuk digunakan dalam
            penetapan keputusan penjatuhan Hukuman Disiplin
          </div>
          <br />
          <div className="ms-auto text-start">
            <div className="flex items-center gap-2 font-semibold">
              Yang melaporkan,
            </div>
            <div className="ms-auto">
              <br />
              <br />
              <br />
              <br />
              <div className="flex items-center font-semibold gap-2">
                {DATA_DETAIL?.yangMelaporkan || "Autofill nama"}
              </div>
              <div className="flex items-center font-semibold gap-2">
                {DATA_DETAIL?.pangkatMelaporakn || "-"}/
                {DATA_DETAIL?.jabatanMelaporkan || "-"}
              </div>
              <div className="flex items-center font-semibold gap-2">
                NIP.{DATA_DETAIL?.nipMelaporkan || "Autofill NIP"}
              </div>
            </div>
          </div>
          <div className="me-auto w-full">
            <div className="flex items-center justify-start font-semibold text-sm gap-2 mb-2">
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
