// components/ExportToWord.tsx
import React, { useEffect, useMemo, useRef } from "react";
import { SuratPemanggilanRes } from "@/interface/responses/surat.interface";
import { useGetKopSuratBySlug } from "@/services/surat/kopsurat";
import { ErrorToast } from "@/utils/ToastMessage";
import { useNavigate, useParams } from "react-router-dom";
import {
  DaysDMYIndoToFormat,
  DMYIndoToFormat,
  HIDateformat,
} from "@/utils/dateFormater";
import { Commet } from "react-loading-indicators";
import { getBase64FromUrl } from "@/utils/base64Formater";
import { useGetDetailSuratPemanggilan } from "@/services/surat/pemanggilan";
import { toRoman } from "@/utils/terbilang";

const ExportToWord: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isFetching, refetch, error } = useGetDetailSuratPemanggilan(
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
  } = useGetKopSuratBySlug("SURAT_PEMANGGILAN");

  const kopSuratData = useMemo(() => {
    if (!allKop) return null;
    return allKop.data;
  }, [allKop]);

  useEffect(() => {
    refetchKop();
    refetch();
  }, []);

  const DATA_DETAIL: SuratPemanggilanRes | null = useMemo(() => {
    if (data) {
      const dipanggilData = data.data.DiPanggilSuratPemanggilan?.map((item) => {
        return {
          diPanggil: item.diPanggil,
          nipDiPanggil: item.nipDiPanggil,
          jabatanDiPanggil: item.jabatanDiPanggil,
          unitDiPanggil: item.unitDiPanggil,
        };
      });

      return {
        id: data.data.id,
        nomorSurat: data.data.nomorSurat || "",
        nomorPemanggilan: data.data.nomorPemanggilan || "",
        tanggalSurat: data.data.tanggalSurat || "",
        waktu: data.data.waktu || "",
        tempat: data.data.tempat || "",
        keterangan: data.data.keterangan || "",
        pemanggil: data.data.pemanggil || "",
        nipPemanggil: data.data.nipPemanggil || "",
        jabatanPemanggil: data.data.jabatanPemanggil || "",
        unitPemanggil: data.data.unitPemanggil || "",
        diPanggil: data.data.diPanggil || "",
        nipDiPanggil: data.data.nipDiPanggil || "",
        jabatanDiPanggil: data.data.jabatanDiPanggil || "",
        unitDiPanggil: data.data.unitDiPanggil || "",
        DiPanggilSuratPemanggilan: dipanggilData,
        namaTtd: data.data.namaTtd || "",
        nipTtd: data.data.nipTtd || "",
        jabatanTtd: data.data.jabatanTtd || "",

        nama: data.data.pemanggil.split(";;"),
        nip: data.data.nipPemanggil.split(";;"),
        jabatan: data.data.jabatanPemanggil.split(";;"),
        unit: data.data.unitPemanggil.split(";;"),
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
    link.download = "Surat Pemanggilan.doc";
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
              <h1 className="title">RAHASIA</h1>
              <h1 className="title">
                SURAT PEMANGGILAN {DATA_DETAIL.nomorPemanggilan || "-"}
              </h1>
              <div className="subtitle">
                Nomor : {DATA_DETAIL.nomorSurat || "-"}
              </div>
            </div>
            <br />
            <br />
            <div>
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <tbody>
                  <tr>
                    <td style={{ width: "0.5cm", verticalAlign: "top" }}>1.</td>
                    <td style={{ verticalAlign: "top" }}>
                      Bersama ini diminta dengan hormat kehadiran saudara:
                    </td>
                  </tr>
                </tbody>
              </table>
              <table style={{ marginLeft: "0.5cm" }}>
                <tbody>
                  {DATA_DETAIL.DiPanggilSuratPemanggilan?.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td style={{ textAlign: "center", width: "0.5cm" }}>
                          {toRoman(index + 1)}.{" "}
                        </td>
                        <td style={{ width: "2cm" }}>Nama</td>
                        <td>:&nbsp;&nbsp;</td>
                        <td>
                          <b>{item.diPanggil || "-"}</b>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>NIP</td>
                        <td>:&nbsp;&nbsp;</td>
                        <td>{item.nipDiPanggil || "-"}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Unit Kerja</td>
                        <td>:&nbsp;&nbsp;</td>
                        <td>{item.unitDiPanggil || "-"}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Jabatan</td>
                        <td>:&nbsp;&nbsp;</td>
                        <td>{item.jabatanDiPanggil.split(";;")[0] || "-"}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              <br />
              <div style={{ marginLeft: "0.5cm" }}>Untuk menghadap kepada:</div>
              <table style={{ marginLeft: "0.5cm" }}>
                <tbody>
                  {DATA_DETAIL.nama?.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td style={{ textAlign: "center", width: "0.5cm" }}>
                          {index + 1}.{" "}
                        </td>
                        <td style={{ width: "2cm" }}>Nama</td>
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
                        <td>Unit Kerja</td>
                        <td>:&nbsp;&nbsp;</td>
                        <td>{DATA_DETAIL.unit?.[index] || "-"}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>Jabatan</td>
                        <td>:&nbsp;&nbsp;</td>
                        <td>{DATA_DETAIL.jabatan?.[index] || "-"}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              <br />
              <div style={{ marginLeft: "0.5cm" }}>Pada:</div>
              <table style={{ marginLeft: "0.5cm" }}>
                <tbody>
                  <tr>
                    <td style={{ width: "3cm" }}>Hari, Tanggal</td>
                    <td>:&nbsp;&nbsp;</td>
                    <td>
                      {DATA_DETAIL?.waktu
                        ? DaysDMYIndoToFormat(DATA_DETAIL.waktu)
                        : ""}
                    </td>
                  </tr>
                  <tr>
                    <td>Jam</td>
                    <td>:&nbsp;&nbsp;</td>
                    <td>
                      {DATA_DETAIL?.waktu
                        ? HIDateformat(DATA_DETAIL.waktu)
                        : ""}{" "}
                      WIB
                    </td>
                  </tr>
                  <tr>
                    <td>Tempat</td>
                    <td>:&nbsp;&nbsp;</td>
                    <td>{DATA_DETAIL.tempat || "-"}</td>
                  </tr>
                </tbody>
              </table>
              <br />
              <div style={{ display: "flex", alignItems: "top" }}>
                <div style={{ width: "0.5cm" }}></div>
                <div>Untuk {DATA_DETAIL?.keterangan || ""}</div>
              </div>
              <br />
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <tbody>
                  <tr>
                    <td style={{ width: "0.5cm", verticalAlign: "top" }}>2.</td>
                    <td style={{ verticalAlign: "top" }}>
                      Demikian untuk dilaksanakan
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
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default ExportToWord;
