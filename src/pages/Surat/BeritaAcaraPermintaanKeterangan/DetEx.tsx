import { HIDateformat, textToFormat } from "@/utils/dateFormater";
import { Commet } from "react-loading-indicators";
import KOP from "@/assets/kop.png";
import { BeritaAcaraPermintaanRes } from "@/interface/responses/surat.interface";

interface props {
  DATA_DETAIL: BeritaAcaraPermintaanRes;
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
            BERITA ACARA PERMINTAAN KETERANGAN
          </h1>
          <div className="flex items-center justify-center font-normal gap-2 my-2">
            Nomor : {DATA_DETAIL?.nomorSurat}
          </div>
          <br />
          <div className="mb-2" dangerouslySetInnerHTML={{ __html: `Pada hari ini${" "}
                        ${DATA_DETAIL.tanggalSurat
                          ? textToFormat(DATA_DETAIL.tanggalSurat)
                          : "-"}, bertempat di Kantor Dinas Perdagangan Kabupaten Bekasi pukul${" "}
                          ${DATA_DETAIL.waktu ? HIDateformat(DATA_DETAIL.waktu) : "-"} WIB,
                          kami Tim Pemeriksa Internal pada Dinas Perdagangan Kabupaten Bekasi,
                          sebagai berikut: :` }} />
          <div className="flex flex-col">
            {DATA_DETAIL.TimPemeriksa.map((item, index) => (
              <div className="flex items-center gap-2" key={index}>
                <div className="w-6">{index + 1}. </div>
                <div>{item.name}</div>
              </div>
            ))}
          </div>
          <br />
          <div className="mb-2">
            Sesuai dengan Undangan Permintaan Keterangan Nomor :{" "}
            {DATA_DETAIL.nomorSuratKeterangan} tersebut, kami telah melakukan
            permintaan keterangan-keterangan terhadap:
          </div>
          <div className="flex flex-col ms-4">
            {DATA_DETAIL.PihakDimintai.map((item, index) => (
              <div className="flex flex-col" key={index}>
                <div className="flex items-center gap-2">
                  <div className="w-6">{index + 1}. </div>
                  <div className="w-32">Nama</div>
                  <div>: &nbsp;&nbsp;&nbsp; {item.name}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6"></div>
                  <div className="w-32">NIP</div>
                  <div>: &nbsp;&nbsp;&nbsp; {item.nip}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6"></div>
                  <div className="w-32">Pangkat / Gol</div>
                  <div>
                    : &nbsp;&nbsp;&nbsp; {item.pangkat} / {item.golongan}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6"></div>
                  <div className="w-32">Jabatan</div>
                  <div>: &nbsp;&nbsp;&nbsp; {item.jabatan}</div>
                </div>
              </div>
            ))}
          </div>
          <br />
          <div className="">
            Atas pertanyaan-pertanyaan tim pemeriksa sebagai berikut
          </div>
          <div className="flex flex-col">
            {DATA_DETAIL.Pertanyaan.map((item, index) => (
              <div className="flex flex-col" key={index}>
                <div className="flex items-center gap-2">
                  <div className="w-6">{index + 1}. </div>
                  <div>{item.pertanyaan}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6"></div>
                  <div>Jawaban&nbsp;:&nbsp;{item.jawaban}</div>
                </div>
              </div>
            ))}
          </div>
          <br />
          <div className="mb-2 font-semibold">
            Catatan Hasil Permintaan Keterangan
          </div>
          <div
            className="ck-editor-keterangan"
            dangerouslySetInnerHTML={{ __html: DATA_DETAIL.keterangan || "" }}
          ></div>
          <br />
          <div className="mb-2">
            Demikian Berita Acara Permintaan Keterangan ini dibuat dan dibacakan
            ulang kepada Saudara, Kemudian ditutup dan ditandatangani.
          </div>
          <div className="mt-2 grid sm:grid-cols-2 grid-cols-1 gap-12">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-start" colSpan={3}>
                      Yang Meminta Keterangan
                    </th>
                  </tr>
                  <tr>
                    <th className="text-center align-top w-10">No</th>
                    <th className="text-center align-top w-40">Nama</th>
                    <th className="text-center w-20">Tanda Tangan</th>
                  </tr>
                </thead>
                <tbody>
                  {DATA_DETAIL.TimPemeriksa &&
                    DATA_DETAIL.TimPemeriksa.map((item, index) => (
                      <tr key={index}>
                        <td className="h-20 text-center align-">{index + 1}</td>
                        <td className="align-">{item.name}</td>
                        <td className="text-center">__________</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-start w-10" colSpan={3}>
                      Yang Dimintai Keterangan
                    </th>
                  </tr>
                  <tr>
                    <th className="text-center align-top w-10">No</th>
                    <th className="text-center align-top w-40">Nama</th>
                    <th className="text-center w-20">Tanda Tangan</th>
                  </tr>
                </thead>
                <tbody>
                  {DATA_DETAIL.PihakDimintai &&
                    DATA_DETAIL.PihakDimintai.map((item, index) => (
                      <tr key={index}>
                        <td className="h-20 text-center align-">{index + 1}</td>
                        <td className="align-">{item.name}</td>
                        <td className="text-center">__________</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
