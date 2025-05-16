// components/ExportToWord.tsx
import React, { useEffect, useMemo, useRef } from 'react';
import DetailExportSurat from './DetEx';
import { SuratPemeriksaanRes } from '@/interface/responses/surat.interface';
import { useGetKopSuratBySlug } from '@/services/surat/kopsurat';
import { ErrorToast } from '@/utils/ToastMessage';
import { useGetDetailSuratPemeriksaan } from '@/services/surat/pemeriksaan';
import { useNavigate, useParams } from 'react-router-dom';

const ExportToWord: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const exportToWord = () => {
    const content = contentRef.current?.innerHTML;

    if (!content) return;

    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'></head><body>`;
    const footer = `</body></html>`;
    const sourceHTML = header + content + footer;

    const blob = new Blob(['\ufeff', sourceHTML], {
      type: 'application/msword',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dokumen-word.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
    // isFetching: isFetchingKop,
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
      };
    } else {
      return null;
    }
  }, [id, data]);

//   useEffect(() => {
//     if (!isFetching && !isFetchingKop && DATA_DETAIL && kopSuratData) {
//       // Tunggu render selesai dulu baru trigger print
//       setTimeout(() => {
//         window.print();
//       }, 500);

//       // Setelah print ditutup, close tab
//       const handleAfterPrint = () => {
//         window.close();
//       };

//       window.addEventListener("afterprint", handleAfterPrint);

//       return () => {
//         window.removeEventListener("afterprint", handleAfterPrint);
//       };
//     }
//   }, [isFetching, isFetchingKop, DATA_DETAIL, kopSuratData]);

  return (
    <div className="p-4">
      <div ref={contentRef} className="border p-4 mb-4">
        {DATA_DETAIL && kopSuratData && (
            <DetailExportSurat
                DATA_DETAIL={DATA_DETAIL}
                isFetching={isFetching}
                kopSurat={kopSuratData.kopSurat}
            />
            )}
      </div>

      <button
        onClick={exportToWord}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Export ke Word
      </button>
    </div>
  );
};

export default ExportToWord;
