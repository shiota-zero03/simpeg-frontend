import { DMYIndoToFormat, textToFormat } from "@/utils/dateFormater";
import { Commet } from "react-loading-indicators";
import KOP from "@/assets/kop.png";
import { BeritaAcaraPemeriksaanRes } from "@/interface/responses/surat.interface";

interface props {
  DATA_DETAIL: BeritaAcaraPemeriksaanRes;
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
            BERITA ACARA PEMERIKSAAN
          </h1>
          <br />
          <div className="mb-2">
            Pada hari ini{" "}
            {DATA_DETAIL.tanggalSurat
              ? textToFormat(DATA_DETAIL.tanggalSurat)
              : "-"}{" "}, kami :
          </div>
          <div className="flex flex-col ms-12">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <div className="w-60">Nama</div>
                <div>: &nbsp; {DATA_DETAIL.pemeriksa}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-60">NIP</div>
                <div>: &nbsp; {DATA_DETAIL.nipPemeriksa}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-60">Jabatan</div>
                <div>: &nbsp; {DATA_DETAIL.jabatanPemeriksa}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-60">Pangkat</div>
                <div>
                  : &nbsp; {DATA_DETAIL.pangkatPemeriksa || "-"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-60">Golongan</div>
                <div>
                  : &nbsp; {DATA_DETAIL.golonganPemeriksa || "-"}
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="mb-2">
            Berdasarkan Surat Pemanggilan Nomor : {DATA_DETAIL.nomorSurat}, tidak dapat melakukan pemeriksaan dikarenakan saudara:
          </div>
          <div className="flex flex-col ms-12">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <div className="w-60">Nama</div>
                <div>: &nbsp; {DATA_DETAIL.diPeriksa}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-60">NIP</div>
                <div>: &nbsp; {DATA_DETAIL.nipDiPeriksa}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-60">Jabatan</div>
                <div>: &nbsp; {DATA_DETAIL.jabatanDiPeriksa}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-60">Pangkat</div>
                <div>
                  : &nbsp; {DATA_DETAIL.pangkatDiPeriksa || "-"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-60">Golongan</div>
                <div>
                  : &nbsp; {DATA_DETAIL.golonganDiPeriksa || "-"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-60">Unit Kerja</div>
                <div>
                  : &nbsp; {DATA_DETAIL.unitDiPeriksa || "-"}
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="mb-2">
            {DATA_DETAIL.keterangan}
          </div>
          <div className="mb-2">
            Demikian Berita Acara Pemeriksaan ini dibuat untuk digunakan sebagaimana mestinya.
          </div>
          <br />
          <div className="ms-auto w-full text-end">
            Bekasi, { DMYIndoToFormat(DATA_DETAIL.createdAt) }
          </div>
          <div className="mt-2 grid sm:grid-cols-2 grid-cols-1 gap-2">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left" colSpan={2}>Yang diperiksa</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Nama</td>
                    <td>: {DATA_DETAIL.diPeriksa}</td>
                  </tr>
                  <tr>
                    <td>NIP</td>
                    <td>: {DATA_DETAIL.nipDiPeriksa}</td>
                  </tr>
                  <tr>
                    <td>Tanda Tangan</td>
                    <td>: </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left" colSpan={2}>Yang memeriksa</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Nama</td>
                    <td>: {DATA_DETAIL.pemeriksa}</td>
                  </tr>
                  <tr>
                    <td>NIP</td>
                    <td>: {DATA_DETAIL.nipPemeriksa}</td>
                  </tr>
                  <tr>
                    <td>Tanda Tangan</td>
                    <td>: </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
