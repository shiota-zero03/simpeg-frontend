// components/ExportToWord.tsx
import React, { useEffect, useMemo, useRef } from "react";
import { HasilPemeriksaanRes } from "@/interface/responses/surat.interface";
import { useGetKopSuratBySlug } from "@/services/surat/kopsurat";
import { ErrorToast } from "@/utils/ToastMessage";
import { useNavigate, useParams } from "react-router-dom";
import { DMYIndoToFormat, textToFormat } from "@/utils/dateFormater";
import { Commet } from "react-loading-indicators";
import { getBase64FromUrl } from "@/utils/base64Formater";
import { useGetDetailHasilPemeriksaan } from "@/services/surat/hasil-pemeriksaan";

const ExportToWord: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isFetching, refetch, error } = useGetDetailHasilPemeriksaan(
    id || "",
  );
  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/laporan-hasil-pemeriksaan");
    }
  }, [isFetching, refetch]);

  const {
    data: allKop,
    isFetching: isFetchingKop,
    refetch: refetchKop,
  } = useGetKopSuratBySlug("HASIL_PEMERIKSAAN");

  const kopSuratData = useMemo(() => {
    if (!allKop) return null;
    return allKop.data;
  }, [allKop]);

  useEffect(() => {
    refetchKop();
    refetch();
  }, []);

  const DATA_DETAIL: HasilPemeriksaanRes | null = useMemo(() => {
    if (data) {
      return {
        id: data.data.id,
        lokasi: data.data.lokasi,
        yangMelaporkan: data.data.yangMelaporkan,
        nipMelaporkan: data.data.nipMelaporkan,
        jabatanMelaporkan: data.data.jabatanMelaporkan,
        pangkatMelaporakn: data.data.pangkatMelaporakn,
        nameKepada: data.data.nameKepada,
        namePermintaan: data.data.namePermintaan,
        tanggalSurat: data.data.tanggalSurat,
        nipPermintaan: data.data.nipPermintaan,
        jabatanPermintaan: data.data.jabatanPermintaan,
        golonganPermintaan: data.data.golonganPermintaan,
        unitPermintaan: data.data.unitPermintaan,
        keterangan: data.data.keterangan,
        createdAt: data.data.createdAt,
        updatedAt: data.data.updatedAt,
        hasil: data.data.hasil,
        tembusan: data.data.tembusan,

        nama: data.data.namePermintaan.split(";;"),
        nip: data.data.nipPermintaan.split(";;"),
        jabatan: data.data.jabatanPermintaan.split(";;"),
        golongan: data.data.golonganPermintaan.split(";;"),
        unit: data.data.unitPermintaan.split(";;"),
      };
    } else {
      return null;
    }
  }, [id, data]);

  const exportToWord = async () => {
    const content = contentRef.current?.innerHTML;
    if (!content || !kopSuratData?.kopSurat) return;

    const fullImageUrl = `${kopSuratData.kopSurat}`;
    const kopSuratBase64 = await getBase64FromUrl(fullImageUrl);

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
        <div class="kop-surat" style="width: 150px; overflow: hidden;">
          <img src="${kopSuratBase64}" alt="Kop Surat" style="width: 100%;" width="620" />
        </div>
    `;

    const footer = `</body></html>`;
    const sourceHTML = header + content + footer;

    const blob = new Blob(["\ufeff", sourceHTML], {
      type: "application/msword",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Laporan Hasil Pemeriksaan.doc";
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
      window.close();
    }, 100);
  };

  useEffect(() => {
    if (!isFetching && !isFetchingKop && DATA_DETAIL && kopSuratData) {
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
        {DATA_DETAIL && kopSuratData && (
          <>
            <div style={{ textAlign: "right" }}>
              {DATA_DETAIL.lokasi}, {DMYIndoToFormat(DATA_DETAIL.tanggalSurat)}
            </div>
            <div>
              <table>
                <tr>
                  <td></td>
                  <td>Kepada</td>
                </tr>
                <tr>
                  <td style={{ width: "1.2cm" }}>Yth.</td>
                  <td>{DATA_DETAIL.nameKepada}</td>
                </tr>
                <tr>
                  <td></td>
                  <td>di -</td>
                </tr>
                <tr>
                  <td></td>
                  <td>Tempat</td>
                </tr>
              </table>
            </div>
            <br />
            <div>
              <h1 className="title">RAHASIA</h1>
            </div>
            <br />
            <div>
              Dengan ini dilaporkan dengan hormat, pada Hari{" "}
              {DATA_DETAIL.tanggalSurat
                ? textToFormat(DATA_DETAIL.tanggalSurat)
                : "-"}
              ,&nbsp;saya telah melakukan permintaan keterangan terhadap:
            </div>

            <div>
              <table>
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
                        <td>Golongan</td>
                        <td>:&nbsp;&nbsp;</td>
                        <td>{DATA_DETAIL.golongan?.[index] || "-"}</td>
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
            <div>
              Berdasarkan hal tersebut, dapat kami laporkan sebagai berikut:
            </div>
            <br />
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "0.2cm",
                    fontSize: "10pt",
                  }}
                >
                  Bentuk Pelanggaran
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "0.2cm",
                    fontSize: "10pt",
                  }}
                >
                  Waktu
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "0.2cm",
                    fontSize: "10pt",
                  }}
                >
                  Tempat
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "0.2cm",
                    fontSize: "10pt",
                  }}
                >
                  Faktor Memberatkan
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "0.2cm",
                    fontSize: "10pt",
                  }}
                >
                  Faktor Meringankan
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "0.2cm",
                    fontSize: "10pt",
                  }}
                >
                  Dampak Perbuatan
                </th>
              </thead>
              {DATA_DETAIL.hasil.length > 0 ? (
                <tbody>
                  {DATA_DETAIL.hasil.map((item, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          border: "1px solid black",
                          padding: "0.2cm",
                          fontSize: "10pt",
                        }}
                      >
                        {item.bentukPelanggaran}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          padding: "0.2cm",
                          fontSize: "10pt",
                        }}
                      >
                        {item.waktu}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          padding: "0.2cm",
                          fontSize: "10pt",
                        }}
                      >
                        {item.tempat}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          padding: "0.2cm",
                          fontSize: "10pt",
                        }}
                      >
                        {item.faktorPemberat}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          padding: "0.2cm",
                          fontSize: "10pt",
                        }}
                      >
                        {item.faktorMeringankan}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          padding: "0.2cm",
                          fontSize: "10pt",
                        }}
                      >
                        {item.dampak}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "0.2cm",
                        fontSize: "10pt",
                        textAlign: "center",
                      }}
                      colSpan={6}
                    >
                      Tidak ada hasil
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
            <br />
            <div style={{ marginLeft: "1cm" }}>
              <div
                dangerouslySetInnerHTML={{ __html: DATA_DETAIL.keterangan }}
              />
            </div>
            <div>
              Sehubungan dengan hal tersebut, disampaikan Berita Acara
              Permintaan Keterangan terhadap PNS yang bersangkutan untuk
              digunakan dalam penetapan keputusan penjatuhan Hukuman Disiplin
            </div>
            <br />
            <br />
            <table style={{ width: "100%" }}>
              <tr>
                <td style={{ width: "60%" }}></td>
                <td style={{ textAlign: "left" }}>
                  <table>
                    <tr>
                      <td>Yang melaporkan</td>
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
                        <b>{DATA_DETAIL.yangMelaporkan || "-"}</b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>{DATA_DETAIL.pangkatMelaporakn || "-"}</b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>NIP. {DATA_DETAIL.nipMelaporkan || "-"}</b>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <br />
            <table>
              <tbody>
                <tr>
                  <td colSpan={2}>Tembusan Yth:</td>
                </tr>
                {DATA_DETAIL.tembusan?.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td style={{ textAlign: "center", width: "0.5cm" }}>
                        <b>{index + 1}. </b>
                      </td>
                      <td>
                        <b>{item.jabatan || "-"}</b>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default ExportToWord;
