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
            <div className="w-24">Yth.</div>
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
            Dengan ini dilaporkan dengan hormat, pada hari{" "}
            {DATA_DETAIL.tanggalSurat
              ? textToFormat(DATA_DETAIL.tanggalSurat)
              : "-"}{" "}
            Saya telah melakukan permintaan keterangan terhadap:
          </div>
          <div className="flex flex-col ms-12">
            <div className="flex items-center font-normal gap-2">
              <div className="w-36">Nama </div>
              <span className="font-semibold">
                :&nbsp;{DATA_DETAIL?.namePermintaan}
              </span>
            </div>
            <div className="flex items-center font-normal gap-2">
              <div className="w-36">NIP </div>
              :&nbsp;{DATA_DETAIL?.nipPermintaan}
            </div>
            <div className="flex items-center font-normal gap-2">
              <div className="w-36">Jabatan </div>
              :&nbsp;{DATA_DETAIL?.jabatanPermintaan}
            </div>
            <div className="flex items-center font-normal gap-2">
              <div className="w-36">Golongan </div>
              :&nbsp;{DATA_DETAIL?.golonganPermintaan}
            </div>
            <div className="flex items-center font-normal gap-2">
              <div className="w-36">Unit Kerja </div>
              :&nbsp;{DATA_DETAIL?.unitPermintaan}
            </div>
          </div>
          <br />
          <div className="mb-2">
            Berdasarkan hal tersebut, dapat kami laporkan sebagai berikut:
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <td className="p-2 leading-6 border border-gray-300 font-medium">
                    Bentuk Pelanggaran
                  </td>
                  <td className="p-2 leading-6 border border-gray-300 font-medium">
                    Waktu
                  </td>
                  <td className="p-2 leading-6 border border-gray-300 font-medium">
                    Tempat
                  </td>
                  <td className="p-2 leading-6 border border-gray-300 font-medium">
                    Faktor Memberatkan
                  </td>
                  <td className="p-2 leading-6 border border-gray-300 font-medium">
                    Faktor Meringankan
                  </td>
                  <td className="p-2 leading-6 border border-gray-300 font-medium">
                    Dampak Perbuatan
                  </td>
                </tr>
              </thead>
              {DATA_DETAIL.hasil.length > 0 ? (
                <tbody>
                  {DATA_DETAIL.hasil.map((item, index) => (
                    <tr key={index}>
                      <td className="leading-6 p-2 border-b border-gray-300 font-medium">
                        {item.bentukPelanggaran}
                      </td>
                      <td className="leading-6 p-2 border-b border-gray-300 font-medium">
                        {item.waktu}
                      </td>
                      <td className="leading-6 p-2 border-b border-gray-300 font-medium">
                        {item.tempat}
                      </td>
                      <td className="leading-6 p-2 border-b border-gray-300 font-medium">
                        {item.faktorPemberat}
                      </td>
                      <td className="leading-6 p-2 border-b border-gray-300 font-medium">
                        {item.faktorMeringankan}
                      </td>
                      <td className="leading-6 p-2 border-b border-gray-300 font-medium">
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
          <div dangerouslySetInnerHTML={{ __html: DATA_DETAIL.keterangan }} />
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
