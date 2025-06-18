// components/ExportToWord.tsx
import React, { useEffect, useMemo, useRef } from "react";
import { BeritaAcaraPermintaanRes } from "@/interface/responses/surat.interface";
import { useGetKopSuratBySlug } from "@/services/surat/kopsurat";
import { ErrorToast } from "@/utils/ToastMessage";
import { useNavigate, useParams } from "react-router-dom";
import { HIDateformat, textToFormat } from "@/utils/dateFormater";
import { Commet } from "react-loading-indicators";
import { getBase64FromUrl } from "@/utils/base64Formater";
import { useGetDetailBeritaAcaraPermintaan } from "@/services/surat/berita-acara-permintaan";

const ExportToWord: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isFetching, refetch, error } =
    useGetDetailBeritaAcaraPermintaan(id || "");
  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/berita-acara-permintaan-keterangan");
    }
  }, [isFetching, refetch]);

  const {
    data: allKop,
    isFetching: isFetchingKop,
    refetch: refetchKop,
  } = useGetKopSuratBySlug("BERITA_ACARA_PERMINTAAN_KETERANGAN");

  const kopSuratData = useMemo(() => {
    if (!allKop) return null;
    return allKop.data;
  }, [allKop]);

  useEffect(() => {
    refetchKop();
    refetch();
  }, []);

  const DATA_DETAIL: BeritaAcaraPermintaanRes | null = useMemo(() => {
    if (data) {
      return {
        id: data.data.id,
        nomorSurat: data.data.nomorSurat,
        nomorSuratKeterangan: data.data.nomorSuratKeterangan,
        tanggalSurat: data.data.tanggalSurat,
        waktu: data.data.waktu,
        tempat: data.data.tempat,
        keterangan: data.data.keterangan,
        createdAt: data.data.createdAt,
        updatedAt: data.data.updatedAt,
        TimPemeriksa: data.data.TimPemeriksa,
        PihakDimintai: data.data.PihakDimintai,
        Pertanyaan: data.data.Pertanyaan,
      };
    } else {
      return null;
    }
  }, [id, data]);

  const exportToWord = async () => {
    const content = contentRef.current?.innerHTML;
    if (!content) return;

    const fullImageUrl = `${kopSuratData?.kopSurat}`;
    const kopSuratBase64 = fullImageUrl
      ? await getBase64FromUrl(fullImageUrl)
      : "";

    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <style>
          body, h1, h2, h3, h4, h5, h6, p, div {
            margin: 0;
            padding: 0;
          }
          body {
            font-family: Arial, sans-serif;
            font-size: 12pt;
            text-align: justify;
          }
          .title {
            font-size: 14pt;
            text-align: center;
            margin: 0;
          }
          .underlined {
            text-decoration: underline;
          }
          .subtitle {
            font-size: 12pt;
            text-align: center;
            margin: 0;
          }
          td {
            vertical-align: top;
          }
          .kop-surat {
            text-align: center;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        ${
          kopSuratBase64 &&
          `<div class="kop-surat" style="width: 150px; overflow: hidden;">
            <img src="${kopSuratBase64}" alt="Kop Surat" style="width: 100%;" width="620" />
          </div>`
        }
    `;

    const footer = `</body></html>`;
    const sourceHTML = header + content + footer;

    const blob = new Blob(["\ufeff", sourceHTML], {
      type: "application/msword",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Berita Acara Permintaan Keterangan.doc";
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
      window.close();
    }, 100);
  };

  useEffect(() => {
    if (!isFetching && !isFetchingKop && DATA_DETAIL) {
      // Tunggu render selesai dulu baru trigger print
      setTimeout(() => {
        exportToWord();
      }, 500);

      // Setelah print ditutup, close tab
      const handleAfterPrint = () => {
        window.close();
      };

      window.addEventListener("afterprint", handleAfterPrint);

      return () => {
        window.removeEventListener("afterprint", handleAfterPrint);
      };
    }
  }, [isFetching, isFetchingKop, DATA_DETAIL, kopSuratData]);

  return (
    <div className="p-4 relative">
      <div className="inset-0 fixed flex items-center justify-center z-20">
        <Commet color="#32cd32" size="medium" text="" textColor="" />
      </div>
      <div ref={contentRef} className="border p-4 mb-4">
        {DATA_DETAIL && (
          <>
            <div>
              <h1 className="title">BERITA ACARA PERMINTAAN KETERANGAN</h1>
              <div className="subtitle">
                Nomor : {DATA_DETAIL.nomorSurat || "-"}
              </div>
            </div>
            <br />
            <br />
            <div
              dangerouslySetInnerHTML={{
                __html: `Pada hari ini${" "}
                                    ${
                                      DATA_DETAIL.tanggalSurat
                                        ? textToFormat(DATA_DETAIL.tanggalSurat)
                                        : "-"
                                    }, bertempat di Kantor Dinas Perdagangan Kabupaten Bekasi pukul${" "}
                                      ${DATA_DETAIL.waktu ? HIDateformat(DATA_DETAIL.waktu) : "-"} WIB,
                                      kami Tim Pemeriksa Internal pada Dinas Perdagangan Kabupaten Bekasi,
                                      sebagai berikut: :`,
              }}
            />
            <div>
              <table>
                <tbody>
                  {DATA_DETAIL.TimPemeriksa?.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td style={{ textAlign: "center", width: "0.5cm" }}>
                          {index + 1}.{" "}
                        </td>
                        <td>{item.name || "-"}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <br />
            <div>
              Sesuai dengan Undangan Permintaan Keterangan Nomor :{" "}
              {DATA_DETAIL.nomorSuratKeterangan} tersebut, kami telah melakukan
              permintaan keterangan-keterangan terhadap:
            </div>
            <div>
              <table style={{ marginLeft: "0.2cm" }}>
                <tbody>
                  {DATA_DETAIL.PihakDimintai?.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td style={{ textAlign: "center", width: "0.5cm" }}>
                          {index + 1}.{" "}
                        </td>
                        <td style={{ width: "3cm" }}>Nama</td>
                        <td>:&nbsp;&nbsp;</td>
                        <td>
                          <b>{item.name || "-"}</b>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>NIP</td>
                        <td>:&nbsp;&nbsp;</td>
                        <td>{item.nip || "-"}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Pangkat / Gol</td>
                        <td>:&nbsp;&nbsp;</td>
                        <td>
                          {item.pangkat || "-"}/{item.golongan || "-"}
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Jabatan</td>
                        <td>:&nbsp;&nbsp;</td>
                        <td>{item.jabatan || "-"}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <br />
            <div>Atas pertanyaan-pertanyaan tim pemeriksa sebagai berikut:</div>
            <div>
              <table style={{ marginLeft: "0.1cm" }}>
                <tbody>
                  {DATA_DETAIL.Pertanyaan?.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td style={{ textAlign: "center", width: "0.5cm" }}>
                          {index + 1}.{" "}
                        </td>
                        <td>{item.pertanyaan || "-"}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Jawab &nbsp; : &nbsp; {item.jawaban || "-"}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <br />
            <div>
              <b>Catatan Hasil Permintaan Keterangan</b>
            </div>
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: DATA_DETAIL.keterangan || "-",
                }}
              />
            </div>
            <br />
            <div>
              Demikian Berita Acara Permintaan Keterangan ini dibuat dan
              dibacakan ulang kepada Saudara, Kemudian ditutup dan
              ditandatangani.
            </div>
            <br />
            <br />
            <div>
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td colSpan={3}>
                              <b>Yang Meminta Keterangan</b>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: "1cm" }}>
                              <b>No</b>
                            </td>
                            <td style={{ width: "8cm" }}>
                              <b>Nama</b>
                            </td>
                            <td style={{ width: "6cm" }}>
                              <b>Tanda Tangan</b>
                            </td>
                          </tr>
                          {DATA_DETAIL.TimPemeriksa.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td style={{ textAlign: "left" }}>{item.name}</td>
                              <td>______________</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                    <td></td>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td colSpan={3}>
                              <b>Yang Dimintai Keterangan</b>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ width: "1cm" }}>
                              <b>No</b>
                            </td>
                            <td style={{ width: "8cm" }}>
                              <b>Nama</b>
                            </td>
                            <td style={{ width: "6cm" }}>
                              <b>Tanda Tangan</b>
                            </td>
                          </tr>
                          {DATA_DETAIL.PihakDimintai.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td style={{ textAlign: "left" }}>{item.name}</td>
                              <td>______________</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <br />
            <br />
            <table style={{ width: "100%" }}>
              <tr>
                <td style={{ width: "60%" }}></td>
                <td style={{ textAlign: "left" }}>
                  <table>
                    <tr>
                      <td>
                        Bekasi,{" "}
                        {DATA_DETAIL.tanggalSurat
                          ? DMYIndoToFormat(DATA_DETAIL.tanggalSurat)
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>{DATA_DETAIL.jabatanTtd || "-"}</b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b className="underlined">
                          {DATA_DETAIL.namaTtd || "-"}
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>NIP. {DATA_DETAIL.nipTtd || "-"}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table> */}
          </>
        )}
      </div>
    </div>
  );
};

export default ExportToWord;
