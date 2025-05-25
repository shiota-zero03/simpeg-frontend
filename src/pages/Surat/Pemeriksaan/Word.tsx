// components/ExportToWord.tsx
import React, { useEffect, useMemo, useRef } from "react";
import { SuratPemeriksaanRes } from "@/interface/responses/surat.interface";
import { useGetKopSuratBySlug } from "@/services/surat/kopsurat";
import { ErrorToast } from "@/utils/ToastMessage";
import { useGetDetailSuratPemeriksaan } from "@/services/surat/pemeriksaan";
import { useNavigate, useParams } from "react-router-dom";
import { DMYIndoToFormat } from "@/utils/dateFormater";
import { Commet } from "react-loading-indicators";
import { getBase64FromUrl } from "@/utils/base64Formater";

const ExportToWord: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isFetching, refetch, error } = useGetDetailSuratPemeriksaan(
    id || "",
  );
  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/surat-perintah-pemeriksaan");
    }
  }, [isFetching, refetch]);

  const {
    data: allKop,
    isFetching: isFetchingKop,
    refetch: refetchKop,
  } = useGetKopSuratBySlug("SURAT_PEMERIKSAAN");

  const kopSuratData = useMemo(() => {
    if (!allKop) return null;
    return allKop.data;
  }, [allKop]);

  useEffect(() => {
    refetchKop();
    refetch();
  }, []);

  const DATA_DETAIL: SuratPemeriksaanRes | null = useMemo(() => {
    if (data) {
      const diperintahkan = data.data.DiPerintahSuratPemeriksaan?.map(
        (item) => {
          return {
            diPerintah: item.diPerintah || "-",
            nipDiPerintah: item.nipDiPerintah || "-",
            jabatanDiPerintah: item.jabatanDiPerintah || "-",
          };
        },
      );

      return {
        id: data.data.id,
        nomorSurat: data.data.nomorSurat,
        tempatDikeluarkan: data.data.tempatDikeluarkan,
        tanggalSurat: data.data.tanggalSurat,
        pemberiPerintah: data.data.pemberiPerintah,
        nipPemberiPerintah: data.data.nipPemberiPerintah,
        jabatanPemberiPerintah: data.data.jabatanPemberiPerintah,
        diPerintah: data.data.diPerintah,
        nipDiPerintah: data.data.nipDiPerintah,
        jabatanDiPerintah: data.data.jabatanDiPerintah,
        keterangan: data.data.keterangan,
        namaTtd: data.data.namaTtd,
        nipTtd: data.data.nipTtd,
        jabatanTtd: data.data.jabatanTtd,
        DiPerintahSuratPemeriksaan: diperintahkan,
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
            text-decoration: underline;
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
    link.download = "Surat Perintah.doc";
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
              <h1 className="title">SURAT PERINTAH</h1>
              <div className="subtitle">
                Nomor : {DATA_DETAIL.nomorSurat || "-"}
              </div>
            </div>
            <br />
            <br />
            <div>
              <div>Yang bertanda tangan di bawah ini:</div>
              <table style={{ marginLeft: "0.5cm" }}>
                <tbody>
                  <tr>
                    <td style={{ width: "2cm" }}>Nama</td>
                    <td>:&nbsp;&nbsp;</td>
                    <td>
                      <b>{DATA_DETAIL.namaTtd || "-"}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>NIP</td>
                    <td>:&nbsp;&nbsp;</td>
                    <td>{DATA_DETAIL.nipTtd || "-"}</td>
                  </tr>
                  <tr>
                    <td>Jabatan</td>
                    <td>:&nbsp;&nbsp;</td>
                    <td>{DATA_DETAIL.jabatanTtd || "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <div>
              <div>Memerintahkan kepada:</div>
              <table style={{ marginLeft: "0.5cm" }}>
                <tbody>
                  {DATA_DETAIL.DiPerintahSuratPemeriksaan?.map(
                    (item, index) => (
                      <React.Fragment key={index}>
                        <tr>
                          <td style={{ textAlign: "center", width: "0.5cm" }}>
                            {index + 1}.{" "}
                          </td>
                          <td style={{ width: "2cm" }}>Nama</td>
                          <td>:&nbsp;&nbsp;</td>
                          <td>
                            <b>{item.diPerintah || "-"}</b>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>NIP</td>
                          <td>:&nbsp;&nbsp;</td>
                          <td>{item.nipDiPerintah || "-"}</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>Jabatan</td>
                          <td>:&nbsp;&nbsp;</td>
                          <td>{item.jabatanDiPerintah || "-"}</td>
                        </tr>
                      </React.Fragment>
                    ),
                  )}
                </tbody>
              </table>
            </div>
            <br />
            <div>
              <table>
                <tbody>
                  <tr>
                    <td style={{ width: "2.5cm" }}>Untuk</td>
                    <td>:&nbsp;&nbsp;</td>
                    <td>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DATA_DETAIL.keterangan || "-",
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
                      <td style={{ width: "3.5cm" }}>Dikeluarkan di</td>
                      <td>:&nbsp;</td>
                      <td style={{ width: "6cm" }}>
                        {DATA_DETAIL.tempatDikeluarkan || "-"}
                      </td>
                    </tr>
                    <tr>
                      <td>Pada Tanggal</td>
                      <td>:&nbsp;</td>
                      <td>
                        {DATA_DETAIL.tanggalSurat
                          ? DMYIndoToFormat(DATA_DETAIL.tanggalSurat)
                          : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <br />
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <b>{DATA_DETAIL.jabatanTtd || "-"}</b>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
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
                      <td colSpan={3}>
                        <b className="underlined">
                          {DATA_DETAIL.namaTtd || "-"}
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>NIP. {DATA_DETAIL.nipTtd || "-"}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default ExportToWord;
