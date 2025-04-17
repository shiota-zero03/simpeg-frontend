import { useEffect, useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const PDFPreviewer = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const generatePDF = () => {
    const doc = new jsPDF();

    let continueY = 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);

    const pageWidth = doc.internal.pageSize.getWidth();

    const text1 = "SUMMARY REPORT";
    const text1Width = doc.getTextWidth(text1);
    doc.text(text1, (pageWidth - text1Width) / 2, continueY);
    continueY += 6;

    const text2 = "DATA SPPD DAN INFOGRAFIS DATA KEPEGAWAIAN";
    const text2Width = doc.getTextWidth(text2);
    doc.text(text2, (pageWidth - text2Width) / 2, continueY);
    continueY += 4;

    doc.line(20, continueY, 190, continueY);
    continueY += 1;
    doc.setLineWidth(0.5);
    doc.line(20, continueY, 190, continueY);
    continueY += 12;

    doc.setFontSize(12);
    doc.text("Bulan Maret", 14, continueY);

    autoTable(doc, {
      head: [
        [
          { content: "", styles: { cellWidth: 8, lineWidth: 0 } },
          { content: "", styles: { cellWidth: 42, lineWidth: 0 } },
          { content: "", styles: { lineWidth: 0 } },
          { content: "", styles: { lineWidth: 0 } },
          { content: "", styles: { lineWidth: 0 } },
          { content: "", styles: { lineWidth: 0 } },
          { content: "", styles: { cellWidth: 10, lineWidth: 0 } },
          { content: "", styles: { cellWidth: 48, lineWidth: 0 } },
          { content: "", styles: { lineWidth: 0 } },
        ],
        [
          {
            content: "Komposisi Pegawai",
            styles: {
              fillColor: [219, 219, 219],
              textColor: [0, 0, 0],
              valign: "middle",
            },
            colSpan: 2,
          },
          {
            content: "K",
            styles: {
              fillColor: [219, 219, 219],
              textColor: [0, 0, 0],
              halign: "center",
              valign: "middle",
            },
          },
          {
            content: "B",
            styles: {
              fillColor: [219, 219, 219],
              textColor: [0, 0, 0],
              halign: "center",
              valign: "middle",
            },
          },
          {
            content: "K = Ketersediaan\nB = Terisi",
            styles: {
              fillColor: [219, 219, 219],
              textColor: [0, 0, 0],
              fontStyle: "normal",
              fontSize: 8,
              halign: "left",
            },
            colSpan: 2,
          },
          {
            content: "",
            styles: {
              lineWidth: { left: 0.1, bottom: 0 },
              fillColor: [255, 255, 255],
            },
          },
          {
            content: "",
            styles: {
              fillColor: [219, 219, 219],
              textColor: [0, 0, 0],
              halign: "center",
              valign: "middle",
            },
            colSpan: 2,
          },
        ],
        [
          {
            content: "Jumlah Pegawai",
            styles: { fillColor: [255, 192, 0], textColor: [0, 0, 0] },
            colSpan: 2,
          },
          {
            content: "103",
            styles: {
              fillColor: [255, 192, 0],
              textColor: [0, 0, 0],
              halign: "center",
            },
          },
          {
            content: "103",
            styles: {
              fillColor: [255, 192, 0],
              textColor: [0, 0, 0],
              halign: "center",
            },
          },
          {
            content: "",
            styles: {
              fillColor: [255, 192, 0],
              textColor: [0, 0, 0],
              halign: "center",
            },
            colSpan: 2,
          },
          {
            content: "",
            styles: {
              lineWidth: { left: 0.1, bottom: 0 },
              fillColor: [255, 255, 255],
            },
          },
          {
            content: "Pegawai Non ASN",
            styles: { fillColor: [255, 192, 0], textColor: [0, 0, 0] },
          },
          {
            content: "213",
            styles: {
              fillColor: [255, 192, 0],
              textColor: [0, 0, 0],
              halign: "center",
            },
          },
        ],
      ],
      body: [
        [
          { content: "Dinas", colSpan: 2 },
          { content: "32", styles: { halign: "center" } },
          { content: "32", styles: { halign: "center" } },
          "21 PNS",
          "10 PPTK",
          {
            content: "",
            styles: {
              lineWidth: { left: 0.1, bottom: 0 },
              fillColor: [255, 255, 255],
            },
          },
          "Dinas",
          { content: "32", styles: { halign: "center" } },
          { content: "32", styles: { halign: "center" } },
        ],
        [
          { content: "UPTD I (Tambun)", colSpan: 2 },
          { content: "8", styles: { halign: "center" } },
          { content: "8", styles: { halign: "center" } },
          "",
          "",
          {
            content: "",
            styles: {
              lineWidth: { left: 0.1, bottom: 0 },
              fillColor: [255, 255, 255],
            },
          },
          "UPTD I (Tambun)",
          { content: "8", styles: { halign: "center" } },
          { content: "8", styles: { halign: "center" } },
        ],
        [
          { content: "UPTD II (Cibitung)", colSpan: 2 },
          { content: "7", styles: { halign: "center" } },
          { content: "7", styles: { halign: "center" } },
          "",
          "",
          {
            content: "",
            styles: {
              lineWidth: { left: 0.1, bottom: 0 },
              fillColor: [255, 255, 255],
            },
          },
          "UPTD II (Cibitung)",
          { content: "7", styles: { halign: "center" } },
          { content: "7", styles: { halign: "center" } },
        ],
        [
          { content: "UPTD III (Setu)", colSpan: 2 },
          { content: "5", styles: { halign: "center" } },
          { content: "5", styles: { halign: "center" } },
          "",
          "",
          {
            content: "",
            styles: {
              lineWidth: { left: 0.1, bottom: 0 },
              fillColor: [255, 255, 255],
            },
          },
          "UPTD III (Setu)",
          { content: "5", styles: { halign: "center" } },
          { content: "5", styles: { halign: "center" } },
        ],
        [
          { content: "UPTD IV (Cikarang)", colSpan: 2 },
          { content: "4", styles: { halign: "center" } },
          { content: "4", styles: { halign: "center" } },
          "",
          "",
          {
            content: "",
            styles: {
              lineWidth: { left: 0.1, bottom: 0 },
              fillColor: [255, 255, 255],
            },
          },
          "UPTD IV (Cikarang)",
          { content: "4", styles: { halign: "center" } },
          { content: "4", styles: { halign: "center" } },
        ],
        [
          { content: "UPTD V (Kedunggede)", colSpan: 2 },
          { content: "6", styles: { halign: "center" } },
          { content: "6", styles: { halign: "center" } },
          "",
          "",
          {
            content: "",
            styles: {
              lineWidth: { left: 0.1, bottom: 0 },
              fillColor: [255, 255, 255],
            },
          },
          "UPTD V (Kedunggede)",
          { content: "6", styles: { halign: "center" } },
          { content: "6", styles: { halign: "center" } },
        ],
        [
          { content: "UPTD VI (Babelan)", colSpan: 2 },
          { content: "5", styles: { halign: "center" } },
          { content: "5", styles: { halign: "center" } },
          "",
          "",
          {
            content: "",
            styles: {
              lineWidth: { left: 0.1, bottom: 0 },
              fillColor: [255, 255, 255],
            },
          },
          "UPTD VI (Babelan)",
          { content: "5", styles: { halign: "center" } },
          { content: "5", styles: { halign: "center" } },
        ],
        [
          { content: "UPTD VII (Tarumajaya)", colSpan: 2 },
          { content: "4", styles: { halign: "center" } },
          { content: "4", styles: { halign: "center" } },
          "",
          "",
          {
            content: "",
            styles: {
              lineWidth: { left: 0.1, bottom: 0 },
              fillColor: [255, 255, 255],
            },
          },
          "UPTD VII (Tarumajaya)",
          { content: "4", styles: { halign: "center" } },
          { content: "4", styles: { halign: "center" } },
        ],
        [
          { content: "UPTD VIII (Serang)", colSpan: 2 },
          { content: "4", styles: { halign: "center" } },
          { content: "4", styles: { halign: "center" } },
          "",
          "",
          {
            content: "",
            styles: {
              lineWidth: { left: 0.1, bottom: 0 },
              fillColor: [255, 255, 255],
            },
          },
          "UPTD VIII (Serang)",
          { content: "4", styles: { halign: "center" } },
          { content: "4", styles: { halign: "center" } },
        ],
        [
          { content: "UPTD IX (Cibarusah)", colSpan: 2 },
          { content: "6", styles: { halign: "center" } },
          { content: "6", styles: { halign: "center" } },
          "",
          "",
          {
            content: "",
            styles: {
              lineWidth: { left: 0.1, bottom: 0 },
              fillColor: [255, 255, 255],
            },
          },
          "UPTD IX (Cibarusah)",
          { content: "6", styles: { halign: "center" } },
          { content: "6", styles: { halign: "center" } },
        ],
        [
          { content: "UPTD Metrologi Legal", colSpan: 2 },
          { content: "2", styles: { halign: "center" } },
          { content: "2", styles: { halign: "center" } },
          "",
          "",
          {
            content: "",
            styles: {
              lineWidth: { left: 0.1, bottom: 0 },
              fillColor: [255, 255, 255],
            },
          },
          "UPTD Metrologi Legal",
          { content: "2", styles: { halign: "center" } },
          { content: "2", styles: { halign: "center" } },
        ],

        [{ content: "", colSpan: 9, styles: { lineWidth: 0 } }],

        [
          {
            content: "Jabatan Fungsional (20 Orang)",
            colSpan: 9,
            styles: {
              fillColor: [255, 192, 0],
              textColor: [0, 0, 0],
              valign: "middle",
              fontStyle: "bold",
            },
          },
        ],

        [
          { content: "1", styles: { fontStyle: "bold" } },
          {
            content: "Analis Perdagangan (6 Orang)",
            styles: { fontStyle: "bold" },
            colSpan: 8,
          },
        ],
        [
          "",
          { content: "Analis Perdagangan Ahli Madya", colSpan: 3 },
          { content: "1", styles: { halign: "center" } },
          { content: "Agus Burhan", colSpan: 4 },
        ],
        [
          "",
          { content: "Analis Perdagangan Ahli Muda", colSpan: 3 },
          { content: "4", styles: { halign: "center" } },
          { content: "Galuh, Ratna, Soleh, Rudi", colSpan: 4 },
        ],
        [
          "",
          { content: "Analis Perdagangan Ahli Pertama", colSpan: 3 },
          { content: "1", styles: { halign: "center" } },
          { content: "Suhuri", colSpan: 4 },
        ],

        [
          { content: "2", styles: { fontStyle: "bold" } },
          {
            content: "Pengawas Perdagangan (2 Orang)",
            styles: { fontStyle: "bold" },
            colSpan: 8,
          },
        ],
        [
          "",
          { content: "Pengawas Perdagangan Ahli Madya", colSpan: 3 },
          { content: "", styles: { halign: "center" } },
          { content: "", colSpan: 4 },
        ],
        [
          "",
          { content: "Pengawas Perdagangan Ahli Muda", colSpan: 3 },
          { content: "1", styles: { halign: "center" } },
          { content: "Iwan", colSpan: 4 },
        ],
        [
          "",
          { content: "Pengawas Perdagangan Ahli Pertama", colSpan: 3 },
          { content: "1", styles: { halign: "center" } },
          { content: "Arisma", colSpan: 4 },
        ],

        [
          { content: "3", styles: { fontStyle: "bold" } },
          {
            content: "Penera (12 Orang)",
            styles: { fontStyle: "bold" },
            colSpan: 8,
          },
        ],
        [
          "",
          { content: "Penera Ahli Madya", colSpan: 3 },
          { content: "", styles: { halign: "center" } },
          { content: "", colSpan: 4 },
        ],
        [
          "",
          { content: "Penera Ahli Muda", colSpan: 3 },
          { content: "3", styles: { halign: "center" } },
          { content: "Sunarto, Agus Ruhyat, Ahmad", colSpan: 4 },
        ],
        [
          "",
          { content: "Penera Ahli Pertama", colSpan: 3 },
          { content: "9", styles: { halign: "center" } },
          {
            content:
              "Teguh, Atika, Amaina, Ilmi, Yohanes, Sinta, Mardiyah, Iqbal, Chandra",
            colSpan: 5,
          },
        ],
      ],
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [255, 255, 255],
        halign: "left",
        lineWidth: 0.1,
      },
      bodyStyles: {
        halign: "left",
        valign: "middle",
        lineWidth: 0.1,
      },
      startY: continueY,
    });

    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    if (iframeRef.current) {
      iframeRef.current.src = url;
    }
  };

  useEffect(() => {
    generatePDF();
  }, []);

  return (
    <div>
      <iframe
        ref={iframeRef}
        title="PDF Preview"
        width="100%"
        style={{ border: "1px solid #ccc", height: "100vh" }}
      />
    </div>
  );
};

export default PDFPreviewer;
