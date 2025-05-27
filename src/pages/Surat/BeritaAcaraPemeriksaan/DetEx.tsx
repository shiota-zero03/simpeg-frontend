import { DMYIndoToFormat, textToFormat } from "@/utils/dateFormater";
import { Commet } from "react-loading-indicators";
import KOP from "@/assets/kop.png";
import { BeritaAcaraPemeriksaanRes } from "@/interface/responses/surat.interface";
import React from "react";

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
  const nama = DATA_DETAIL.diPeriksa.split(";;");
  const nip = DATA_DETAIL.nipDiPeriksa.split(";;");
  const jabatan = DATA_DETAIL.jabatanDiPeriksa.split(";;");
  const golongan = DATA_DETAIL.golonganDiPeriksa.split(";;");
  const pangkat = DATA_DETAIL.pangkatDiPeriksa.split(";;");
  const unit = DATA_DETAIL.unitDiPeriksa.split(";;");

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
          <h1 className="text-center font-bold text-xl">
            BERITA ACARA PEMERIKSAAN
          </h1>
          <br />
          <div className="mb-2" dangerouslySetInnerHTML={{ __html: `Pada hari ini${" "}
            ${DATA_DETAIL.tanggalSurat
              ? textToFormat(DATA_DETAIL.tanggalSurat)
              : "-"}, kami :` }} />
          <div className="flex flex-col ms-12">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <div className="w-32">Nama</div>
                <div>: &nbsp;&nbsp;&nbsp; {DATA_DETAIL.pemeriksa}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32">NIP</div>
                <div>: &nbsp;&nbsp;&nbsp; {DATA_DETAIL.nipPemeriksa}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32">Pangkat/Gol</div>
                <div>
                  : &nbsp;&nbsp;&nbsp; {DATA_DETAIL.pangkatPemeriksa || "-"} /{" "}
                  {DATA_DETAIL.golonganPemeriksa || "-"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32">Jabatan</div>
                <div>: &nbsp;&nbsp;&nbsp; {DATA_DETAIL.jabatanPemeriksa}</div>
              </div>
            </div>
          </div>
          <br />
          <div className="mb-2">
            Berdasarkan Surat Perintah Nomor : {DATA_DETAIL.nomorSurat}, tidak
            dapat melakukan pemeriksaan dikarenakan saudara:
          </div>
          {nama.map((item, index) => (
            <div key={index} className="flex ms-5">
              <div className="w-8">{index + 1}.</div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="w-32">Nama</div>
                  <div>: &nbsp;&nbsp;&nbsp; {item || "-"}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32">NIP</div>
                  <div>: &nbsp;&nbsp;&nbsp; {nip[index] || "-"}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32">Pangkat/Gol</div>
                  <div>
                    : &nbsp;&nbsp;&nbsp; {pangkat[0] || "-"} /{" "}
                    {golongan[0] || "-"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32">Jabatan</div>
                  <div>: &nbsp;&nbsp;&nbsp; {jabatan[0] || "-"}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32">Unit Kerja</div>
                  <div>: &nbsp;&nbsp;&nbsp; {unit[0] || "-"}</div>
                </div>
              </div>
            </div>
          ))}
          <br />
          <div className="mb-2">{DATA_DETAIL.keterangan}</div>
          <div className="mb-2">
            Demikian Berita Acara Pemeriksaan ini dibuat untuk digunakan
            sebagaimana mestinya.
          </div>
          <br />
          <div className="ms-auto w-1/2 text-start">
            <div className="ms-2">
              Bekasi, {DMYIndoToFormat(DATA_DETAIL.createdAt)}
            </div>
          </div>
          <div className="mt-2 grid sm:grid-cols-2 grid-cols-1 gap-2">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <td className="text-left" colSpan={2}>
                      Yang diperiksa
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {nama.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td className="w-8 align-top">{index + 1}</td>
                        <td className="w-36 align-top">Nama</td>
                        <td className="align-top">: </td>
                        <td className="align-top">{item}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="w-36 align-top">NIP</td>
                        <td className="align-top">: </td>
                        <td className="align-top">{nip[0] || "-"}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="w-36 align-top">Tanda Tangan</td>
                        <td className="align-top">: </td>
                        <td className="align-top"></td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <td className="text-left" colSpan={2}>
                      Yang memeriksa
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="w-36 align-top">Nama</td>
                    <td className="align-top">:</td>
                    <td>{DATA_DETAIL.pemeriksa}</td>
                  </tr>
                  <tr>
                    <td className="w-36 align-top">NIP</td>
                    <td className="align-top">:</td>
                    <td>{DATA_DETAIL.nipPemeriksa}</td>
                  </tr>
                  <tr>
                    <td className="w-36 align-top">Tanda Tangan</td>
                    <td className="align-top">:</td>
                    <td></td>
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
