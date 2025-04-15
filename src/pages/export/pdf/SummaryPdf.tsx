/* eslint-disable */

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
    continueY += 14;

    doc.setFontSize(12);
    doc.text("Data Pegawai", 14, continueY);
    continueY += 4;

    autoTable(doc, {
      head: [["No", "Pegawai", "Jumlah Orang"]],
      body: [
        ["1", "Dinas", "32 Orang"],
        ["2", "UPTD I (Tambun)", "8 Orang"],
        ["3", "UPTD II (Cibitung)", "7 Orang"],
        ["4", "UPTD III (Setu)", "5 Orang"],
        ["5", "UPTD IV (Cikarang)", "4 Orang"],
        ["6", "UPTD V (Kedunggede)", "6 Orang"],
        ["7", "UPTD VI (Babelan)", "5 Orang"],
        ["8", "UPTD VII (Tarumajaya)", "4 Orang"],
        ["9", "UPTD VIII (Serang)", "4 Orang"],
        ["10", "UPTD IX (Cibarusah)", "6 Orang"],
        ["11", "UPTD Metrologi Legal", "2 Orang"],
      ],
      foot: [["", "Total", "100 Orang"]],
      headStyles: {
        fillColor: [18, 64, 60],
        textColor: [255, 255, 255],
        halign: "center",
      },
      footStyles: {
        fillColor: [18, 64, 60],
        textColor: [255, 255, 255],
        halign: "center",
      },
      bodyStyles: {
        halign: "center",
        valign: "middle",
        lineWidth: 0.1,
      },
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
      startY: continueY,
    });

    continueY = (doc as any).lastAutoTable.finalY || continueY;
    continueY += 10;
    doc.text("Data Pegawai Non-ASN", 14, continueY);
    continueY += 4;

    autoTable(doc, {
      head: [["No", "Pegawai", "Jumlah Orang"]],
      body: [
        ["1", "Dinas", "32 Orang"],
        ["2", "UPTD I (Tambun)", "8 Orang"],
        ["3", "UPTD II (Cibitung)", "7 Orang"],
        ["4", "UPTD III (Setu)", "5 Orang"],
        ["5", "UPTD IV (Cikarang)", "4 Orang"],
        ["6", "UPTD V (Kedunggede)", "6 Orang"],
        ["7", "UPTD VI (Babelan)", "5 Orang"],
        ["8", "UPTD VII (Tarumajaya)", "4 Orang"],
        ["9", "UPTD VIII (Serang)", "4 Orang"],
        ["10", "UPTD IX (Cibarusah)", "6 Orang"],
        ["11", "UPTD Metrologi Legal", "2 Orang"],
      ],
      foot: [["", "Total", "100 Orang"]],
      headStyles: {
        fillColor: [18, 64, 60],
        textColor: [255, 255, 255],
        halign: "center",
      },
      footStyles: {
        fillColor: [18, 64, 60],
        textColor: [255, 255, 255],
        halign: "center",
      },
      bodyStyles: {
        halign: "center",
        valign: "middle",
        lineWidth: 0.1,
      },
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
      startY: continueY,
    });

    doc.addPage();

    continueY = 20;
    doc.text("Jabatan Fungsional", 14, continueY);
    continueY += 4;

    autoTable(doc, {
      head: [["1", "Analis Perdagangan", "6 Orang"]],
      body: [
        ["", "Analis Perdagangan Ahli Madya", "1 Orang"],
        ["", "Analis Perdagangan Ahli Muda", "4 Orang"],
        ["", "Analis Perdagangan Ahli Pertama", "1 Orang"],
      ],
      headStyles: {
        fillColor: [18, 64, 60],
        textColor: [255, 255, 255],
        halign: "center",
      },
      bodyStyles: {
        halign: "center",
        valign: "middle",
        lineWidth: 0.1,
      },
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
      startY: continueY,
    });
    continueY = ((doc as any).lastAutoTable.finalY || continueY) + 4;
    autoTable(doc, {
      head: [["2", "Pengawas Perdagangan", "6 Orang"]],
      body: [
        ["", "Pengawas Perdagangan Ahli Madya", "1 Orang"],
        ["", "Pengawas Perdagangan Ahli Muda", "4 Orang"],
        ["", "Pengawas Perdagangan Ahli Pertama", "1 Orang"],
      ],
      headStyles: {
        fillColor: [18, 64, 60],
        textColor: [255, 255, 255],
        halign: "center",
      },
      bodyStyles: {
        halign: "center",
        valign: "middle",
        lineWidth: 0.1,
      },
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
      startY: continueY,
    });
    continueY = ((doc as any).lastAutoTable.finalY || continueY) + 4;
    autoTable(doc, {
      head: [["3", "Penera", "6 Orang"]],
      body: [
        ["", "Penera Ahli Madya", "1 Orang"],
        ["", "Penera Ahli Muda", "4 Orang"],
        ["", "Penera Ahli Pertama", "1 Orang"],
      ],
      headStyles: {
        fillColor: [18, 64, 60],
        textColor: [255, 255, 255],
        halign: "center",
      },
      bodyStyles: {
        halign: "center",
        valign: "middle",
        lineWidth: 0.1,
      },
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
      startY: continueY,
    });
    continueY = ((doc as any).lastAutoTable.finalY || continueY) + 4;
    autoTable(doc, {
      foot: [["", "Total Jabatan Fungsional", "18 Orang"]],
      footStyles: {
        fillColor: [18, 64, 60],
        textColor: [255, 255, 255],
        halign: "center",
      },
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
      startY: continueY,
    });

    continueY = (doc as any).lastAutoTable.finalY || continueY;
    continueY += 10;
    doc.text(
      "Kenaikan Pangkat, Kegiatan Gaji Berkala, Pensiun dan Cuti",
      14,
      continueY,
    );
    continueY += 4;

    autoTable(doc, {
      head: [[`Daftar Pegawai Kenaikan Pangkat TMT 01 March 2025 (1 Orang)`]],
      headStyles: {
        fillColor: [18, 64, 60],
        textColor: [255, 255, 255],
        halign: "left",
      },
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
      startY: continueY,
    });

    continueY = (doc as any).lastAutoTable.finalY || continueY;
    autoTable(doc, {
      body: [["1", "1234567890", "Taufik Hidayat", "Perdagangan"]],
      footStyles: {
        fillColor: [18, 64, 60],
        textColor: [255, 255, 255],
        halign: "center",
      },
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
      startY: continueY,
    });

    continueY = ((doc as any).lastAutoTable.finalY || continueY) + 4;

    autoTable(doc, {
      head: [
        [`Daftar Pegawai Kenaikan Gaji Berkala TMT 01 March 2025 (1 Orang)`],
      ],
      headStyles: {
        fillColor: [18, 64, 60],
        textColor: [255, 255, 255],
        halign: "left",
      },
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
      startY: continueY,
    });

    continueY = (doc as any).lastAutoTable.finalY || continueY;
    autoTable(doc, {
      body: [["1", "1234567890", "Taufik Hidayat", "Perdagangan"]],
      footStyles: {
        fillColor: [18, 64, 60],
        textColor: [255, 255, 255],
        halign: "center",
      },
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
      startY: continueY,
    });

    continueY = ((doc as any).lastAutoTable.finalY || continueY) + 4;

    autoTable(doc, {
      head: [[`Daftar Pegawai Pensiun TMT 01 March 2025 (1 Orang)`]],
      headStyles: {
        fillColor: [18, 64, 60],
        textColor: [255, 255, 255],
        halign: "left",
      },
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
      startY: continueY,
    });

    continueY = (doc as any).lastAutoTable.finalY || continueY;
    autoTable(doc, {
      body: [["1", "1234567890", "Taufik Hidayat", "Perdagangan"]],
      footStyles: {
        fillColor: [18, 64, 60],
        textColor: [255, 255, 255],
        halign: "center",
      },
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
      startY: continueY,
    });

    continueY = ((doc as any).lastAutoTable.finalY || continueY) + 4;

    autoTable(doc, {
      head: [[`Daftar Pegawai Cuti TMT 01 March 2025 (1 Orang)`]],
      headStyles: {
        fillColor: [18, 64, 60],
        textColor: [255, 255, 255],
        halign: "left",
      },
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
      startY: continueY,
    });

    continueY = (doc as any).lastAutoTable.finalY || continueY;
    autoTable(doc, {
      body: [["1", "1234567890", "Taufik Hidayat", "Perdagangan"]],
      footStyles: {
        fillColor: [18, 64, 60],
        textColor: [255, 255, 255],
        halign: "center",
      },
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
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
