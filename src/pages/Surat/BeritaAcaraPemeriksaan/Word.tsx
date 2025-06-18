// components/ExportToWord.tsx
import React, { useEffect, useMemo, useRef } from "react";
import { BeritaAcaraPemeriksaanRes } from "@/interface/responses/surat.interface";
import { useGetKopSuratBySlug } from "@/services/surat/kopsurat";
import { ErrorToast } from "@/utils/ToastMessage";
import { useNavigate, useParams } from "react-router-dom";
import { DMYIndoToFormat, textToFormat } from "@/utils/dateFormater";
import { Commet } from "react-loading-indicators";
import { getBase64FromUrl } from "@/utils/base64Formater";
import { useGetDetailBeritaAcaraPemeriksaan } from "@/services/surat/berita-acara-pemeriksaan";

const ExportToWord: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isFetching, refetch, error } =
    useGetDetailBeritaAcaraPemeriksaan(id || "");
  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/berita-acara-pemeriksaan");
    }
  }, [isFetching, refetch]);

  const {
    data: allKop,
    isFetching: isFetchingKop,
    refetch: refetchKop,
  } = useGetKopSuratBySlug("BERITA_ACARA_PEMERIKSAAN");

  const kopSuratData = useMemo(() => {
    if (!allKop) return null;
    return allKop.data;
  }, [allKop]);

  useEffect(() => {
    refetchKop();
    refetch();
  }, []);

  const DATA_DETAIL: BeritaAcaraPemeriksaanRes | null = useMemo(() => {
    if (data) {
      return {
        id: data.data.id,
        tanggalSurat: data.data.tanggalSurat,
        nomorSurat: data.data.nomorSurat,
        keterangan: data.data.keterangan,
        pemeriksa: data.data.pemeriksa,
        nipPemeriksa: data.data.nipPemeriksa,
        jabatanPemeriksa: data.data.jabatanPemeriksa,
        pangkatPemeriksa: data.data.pangkatPemeriksa,
        golonganPemeriksa: data.data.golonganPemeriksa,
        unitPemeriksa: data.data.unitPemeriksa,
        diPeriksa: data.data.diPeriksa,
        nipDiPeriksa: data.data.nipDiPeriksa,
        jabatanDiPeriksa: data.data.jabatanDiPeriksa,
        pangkatDiPeriksa: data.data.pangkatDiPeriksa,
        golonganDiPeriksa: data.data.golonganDiPeriksa,
        unitDiPeriksa: data.data.unitDiPeriksa,
        createdAt: data.data.createdAt,
        updatedAt: data.data.updatedAt,

        nama: data.data.diPeriksa.split(";;"),
        nip: data.data.nipDiPeriksa.split(";;"),
        jabatan: data.data.jabatanDiPeriksa.split(";;"),
        golongan: data.data.golonganDiPeriksa.split(";;"),
        pangkat: data.data.pangkatDiPeriksa.split(";;"),
        unit: data.data.unitDiPeriksa.split(";;"),
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
    link.download = "Berita Acara Pemeriksaan.doc";
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
              <h1 className="title">BERITA ACARA PEMERIKSAAN</h1>
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
                        }, kami :`,
              }}
            />
            <div>
              <table style={{ marginLeft: "0.5cm" }}>
                <tbody>
                  <tr>
                    <td style={{ width: "3cm" }}>Nama</td>
                    <td>:&nbsp;&nbsp;</td>
                    <td>{DATA_DETAIL.pemeriksa || "-"}</td>
                  </tr>
                  <tr>
                    <td>NIP</td>
                    <td>:&nbsp;&nbsp;</td>
                    <td>{DATA_DETAIL.nipPemeriksa || "-"}</td>
                  </tr>
                  <tr>
                    <td>Pangkat / Gol.</td>
                    <td>:&nbsp;&nbsp;</td>
                    <td>
                      {DATA_DETAIL.pangkatPemeriksa || "-"} /{" "}
                      {DATA_DETAIL.golonganPemeriksa || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td>Jabatan</td>
                    <td>:&nbsp;&nbsp;</td>
                    <td>{DATA_DETAIL.jabatanPemeriksa || "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <div>
              Berdasarkan Surat Perintah Nomor : {DATA_DETAIL.nomorSurat}, tidak
              dapat melakukan pemeriksaan dikarenakan saudara:
            </div>
            <div>
              <table style={{ marginLeft: "0.5cm" }}>
                <tbody>
                  {DATA_DETAIL.nama?.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td style={{ textAlign: "center", width: "0.5cm" }}>
                          {index + 1}.{" "}
                        </td>
                        <td style={{ width: "3cm" }}>Nama</td>
                        <td>:&nbsp;&nbsp;</td>
                        <td>
                          <b>{item || "-"}</b>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>NIP</td>
                        <td>:&nbsp;&nbsp;</td>
                        <td>{DATA_DETAIL.nip?.[index] || "-"}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Pangkat / Gol</td>
                        <td>:&nbsp;&nbsp;</td>
                        <td>
                          {DATA_DETAIL.pangkat?.[index] || "-"}/
                          {DATA_DETAIL.golongan?.[index] || "-"}
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Jabatan</td>
                        <td>:&nbsp;&nbsp;</td>
                        <td>{DATA_DETAIL.jabatan?.[index] || "-"}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Unit Kerja</td>
                        <td>:&nbsp;&nbsp;</td>
                        <td>{DATA_DETAIL.unit?.[index] || "-"}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <br />
            <div>{DATA_DETAIL.keterangan}</div>
            <br />
            <br />
            <div>
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Bekasi, {DMYIndoToFormat(DATA_DETAIL.createdAt)}</td>
                  </tr>
                  <tr>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td colSpan={4}>Yang diperiksa</td>
                          </tr>
                          {DATA_DETAIL.nama?.map((item, index) => (
                            <React.Fragment key={index}>
                              <tr>
                                <td>{index + 1}</td>
                                <td style={{ textAlign: "left" }}>Nama</td>
                                <td>:</td>
                                <td>{item}</td>
                              </tr>
                              <tr>
                                <td></td>
                                <td style={{ textAlign: "left" }}>NIP</td>
                                <td>:</td>
                                <td>{DATA_DETAIL.nip?.[index] || "-"}</td>
                              </tr>
                              <tr>
                                <td></td>
                                <td style={{ textAlign: "left" }}>
                                  Tanda Tangan
                                </td>
                                <td>:</td>
                                <td></td>
                              </tr>
                            </React.Fragment>
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
                              <b>Yang Memeriksa</b>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ textAlign: "left" }}>Nama</td>
                            <td>:</td>
                            <td>{DATA_DETAIL.pemeriksa}</td>
                          </tr>
                          <tr>
                            <td style={{ textAlign: "left" }}>NIP</td>
                            <td>:</td>
                            <td>{DATA_DETAIL.nipPemeriksa}</td>
                          </tr>
                          <tr>
                            <td style={{ textAlign: "left" }}>Tanda Tangan</td>
                            <td>:</td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExportToWord;
