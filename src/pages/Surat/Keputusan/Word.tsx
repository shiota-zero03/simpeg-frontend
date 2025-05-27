// components/ExportToWord.tsx
import React, { useEffect, useMemo, useRef } from "react";
import { KeputusanRes } from "@/interface/responses/surat.interface";
import { useGetKopSuratBySlug } from "@/services/surat/kopsurat";
import { ErrorToast } from "@/utils/ToastMessage";
import { useNavigate, useParams } from "react-router-dom";
import { DMYIndoToFormat } from "@/utils/dateFormater";
import { Commet } from "react-loading-indicators";
import { getBase64FromUrl } from "@/utils/base64Formater";
import { useGetDetailKeputusan } from "@/services/surat/surat-keputusan";

const ExportToWord: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isFetching, refetch, error } = useGetDetailKeputusan(id || "");
  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/keputusan-hukuman-disiplin");
    }
  }, [isFetching, refetch]);

  const {
    data: allKop,
    isFetching: isFetchingKop,
    refetch: refetchKop,
  } = useGetKopSuratBySlug("HUKUMAN_DISIPLIN");

  const kopSuratData = useMemo(() => {
    if (!allKop) return null;
    return allKop.data;
  }, [allKop]);

  useEffect(() => {
    refetchKop();
    refetch();
  }, []);

  const DATA_DETAIL: KeputusanRes | null = useMemo(() => {
    if (data) {
      return {
        id: data.data.id,
        membaca: data.data.membaca,
        menimbang: data.data.menimbang,
        mengingat: data.data.mengingat,
        kesatu: data.data.kesatu,
        nameYangDitetapkan: data.data.nameYangDitetapkan,
        nipYangDitetapkan: data.data.nipYangDitetapkan,
        jabatanYangDitetapkan: data.data.jabatanYangDitetapkan,
        golonganYangDitetapkan: data.data.golonganYangDitetapkan,
        unitYangDitetapkan: data.data.unitYangDitetapkan,
        alasan: data.data.alasan,
        kedua: data.data.kedua,
        ketiga: data.data.ketiga,
        nameJabatan: data.data.nameJabatan,
        nipJabatan: data.data.nipJabatan,
        ttdJabatan: data.data.ttdJabatan,
        tanggalSurat: data.data.tanggalSurat,
        nomorSurat: data.data.nomorSurat,
        tingkat: data.data.tingkat,
        tempatDikeluarkan: data.data.tempatDikeluarkan,
        createdAt: data.data.createdAt,
        updatedAt: data.data.updatedAt,
        tembusan: data.data.tembusan,

        nama: data.data.nameYangDitetapkan.split(";;"),
        nip: data.data.nipYangDitetapkan.split(";;"),
        jabatan: data.data.jabatanYangDitetapkan.split(";;"),
        golongan: data.data.golonganYangDitetapkan.split(";;"),
        unit: data.data.unitYangDitetapkan.split(";;"),
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
    link.download = "Keputusan Hasil Disiplin.doc";
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
            <div>
              <div>
                <div className="subtitle">
                  <b>RAHASIA</b>
                </div>
              </div>
              <br />
              <div>
                <div className="subtitle">
                  KEPUTUSAN KEPALA DINAS PERDAGANGAN
                </div>
              </div>
              <div>
                <div className="subtitle">
                  <b>NOMOR: {DATA_DETAIL.nomorSurat}</b>
                </div>
              </div>
              <div>
                <div className="subtitle">TENTANG</div>
              </div>
              <div>
                <div className="subtitle">
                  HUKUMAN DISIPLIN TINGKAT{" "}
                  {DATA_DETAIL.tingkat === "TINGGI"
                    ? "BERAT"
                    : DATA_DETAIL.tingkat === "RENDAH"
                      ? "RINGAN"
                      : DATA_DETAIL.tingkat}
                </div>
              </div>
            </div>
            <br />
            <div style={{ width: "100%" }}>
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td style={{ width: "3cm" }}>Membaca</td>
                    <td style={{ width: "0.5cm", textAlign: "center" }}>:</td>
                    <td>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DATA_DETAIL.membaca || "",
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Menimbang</td>
                    <td style={{ width: "0.5cm", textAlign: "center" }}>:</td>
                    <td>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DATA_DETAIL.menimbang || "",
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Mengingat</td>
                    <td style={{ width: "0.5cm", textAlign: "center" }}>:</td>
                    <td>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DATA_DETAIL.mengingat || "",
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}></td>
                  </tr>
                  <tr>
                    <td colSpan={3} style={{ textAlign: "center" }}>
                      MEMUTUSKAN
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}></td>
                  </tr>
                  <tr>
                    <td colSpan={3}>Menetapkan</td>
                  </tr>
                  <tr>
                    <td>Kesatu</td>
                    <td style={{ width: "0.5cm", textAlign: "center" }}>:</td>
                    <td>
                      <div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DATA_DETAIL.kesatu || "",
                          }}
                        />
                        <table>
                          <tbody>
                            {DATA_DETAIL.nama?.map((item, index) => (
                              <React.Fragment key={index}>
                                <tr>
                                  <td
                                    style={{
                                      textAlign: "center",
                                      width: "0.5cm",
                                    }}
                                  >
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
                                  <td>
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
                        <div>
                          Karena yang bersangkutan telah melakukan perbuatan
                          yang melanggar ketentuan {DATA_DETAIL.alasan}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Kedua</td>
                    <td style={{ width: "0.5cm", textAlign: "center" }}>:</td>
                    <td>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DATA_DETAIL.kedua || "",
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Ketiga</td>
                    <td style={{ width: "0.5cm", textAlign: "center" }}>:</td>
                    <td>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DATA_DETAIL.ketiga || "",
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <br />
            <table style={{ width: "100%" }}>
              <tr>
                <td style={{ width: "60%" }}></td>
                <td style={{ textAlign: "left" }}>
                  <table>
                    <tr>
                      <td>
                        <table>
                          <tr>
                            <td>Dikeluarkan Di</td>
                            <td>:</td>
                            <td>
                              {DATA_DETAIL?.tempatDikeluarkan || "Bekasi"}
                            </td>
                          </tr>
                          <tr>
                            <td>Pada Tanggal</td>
                            <td>:</td>
                            <td>
                              {DATA_DETAIL?.tanggalSurat
                                ? DMYIndoToFormat(DATA_DETAIL?.tanggalSurat)
                                : ""}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>{DATA_DETAIL.nameJabatan || "-"}</b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>{DATA_DETAIL.ttdJabatan || "-"}</b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>NIP. {DATA_DETAIL.nipJabatan || "-"}</b>
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
