import React, { useEffect, useMemo } from "react";
import { ErrorToast } from "@/utils/ToastMessage";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDetailSPPD } from "@/services/sppd";
import { SPPDRes } from "@/interface/responses/sppd.interface";
import { DMYIndoToFormat } from "@/utils/dateFormater";

export default function ExportIKP() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isFetching, refetch, error } = useGetDetailSPPD(id || "");
  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/sppd");
    }
  }, [isFetching, refetch]);

  useEffect(() => {
    refetch();
  }, []);

  const DATA_DETAIL: SPPDRes | null = useMemo(() => {
    if (data) {
      return data.data;
    } else {
      return null;
    }
  }, [id, data]);

  useEffect(() => {
    if (!isFetching && DATA_DETAIL) {
      // Tunggu render selesai dulu baru trigger print
      setTimeout(() => {
        window.print();
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
  }, [isFetching, DATA_DETAIL]);

  return (
    <>
      <style>{`
            @media print {
            @page {
                size: landscape;
            }
            body {
                margin: 0;
            }
            }
        `}</style>

      {DATA_DETAIL && (
        <div className="w-full p-8">
          <div className="text-center">
            <h1 className="font-bold">{DATA_DETAIL.type === "PERJALANAN_BIASA" ? "DAFTAR TANDA TERIMA" : "DAFTAR TANDA TERIMA UANG TRANSPORT"}</h1>
          </div>
          <br />
          <table>
            <tbody>
                <tr>
                    <td className="text-[10pt] min-w-72">URAIAN</td>
                    <td className="text-[10pt] min-w-72">: {DATA_DETAIL.type === "PERJALANAN_BIASA" ? "PERJALANAN DINAS BIASA" : "PERJALANAN DINAS DALAM KOTA"}</td>
                </tr>
                <tr>
                    <td className="text-[10pt] min-w-72">KODE REKENING</td>
                    <td className="text-[10pt] min-w-72">: {DATA_DETAIL.kodeRekening}</td>
                </tr>
                <tr>
                    <td className="text-[10pt] min-w-72">SUB KEGIATAN</td>
                    <td className="text-[10pt] min-w-72">: {DATA_DETAIL.activity}</td>
                </tr>
                <tr>
                    <td className="text-[10pt] min-w-72">MAKSUD PERJALANAN</td>
                    <td className="text-[10pt] min-w-72">: {DATA_DETAIL.reasoning}</td>
                </tr>
                <tr>
                    <td className="text-[10pt] min-w-72">TANGGAL PELAKSANAAN</td>
                    <td className="text-[10pt] min-w-72">: {DATA_DETAIL.startDate ? DMYIndoToFormat(DATA_DETAIL.startDate) : ""} - {DATA_DETAIL.endDate ? DMYIndoToFormat(DATA_DETAIL.endDate) : ""}</td>
                </tr>
                <tr>
                    <td className="text-[10pt] min-w-72">TEMPAT / TUJUAN</td>
                    <td className="text-[10pt] min-w-72">: {DATA_DETAIL.location}</td>
                </tr>
            </tbody>
          </table>
          <br />
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-1 border border-black bg-blue-100">
                  No
                </th>
                <th className="p-1 border border-black bg-blue-100">
                  Nama / NIP
                </th>
                <th className="p-1 border border-black bg-blue-100">
                  JABATAN
                </th>
                <th className="p-1 border border-black bg-blue-100">
                  NO. REK BJB
                </th>
                <th className="p-1 border border-black bg-blue-100">
                  URAIAN
                </th>
                <th className="p-1 border border-black bg-blue-100" colSpan={4}>
                  BESARAN BIAYA JUMLAH (Rp)
                </th>
                <th className="p-1 border border-black bg-blue-100">
                  JUMLAH YANG DITERIMA (Rp)
                </th>
                <th className="p-1 border border-black bg-blue-100">
                  TANDA TANGAN
                </th>
              </tr>
            </thead>
            <tbody>
              {DATA_DETAIL.participants.map((item, index) => (
                <React.Fragment key={index}>
                    <tr>
                        <td className="text-center p-1 border border-black align-top text-[10pt]" rowSpan={3}>
                            {index + 1}
                        </td>
                        <td className="p-1 border border-black align-top text-[10pt]" rowSpan={3}>{item.user.name} / <br />{item.user.nip}</td>
                        <td className="p-1 border border-black align-top text-[10pt]" rowSpan={3}>{item.user.jabatan ? item.user.jabatan.nameJob : "-"}</td>
                        <td className="p-1 border border-black align-top text-[10pt]" rowSpan={3}>{item.bankAccount}</td>
                        <td className="p-1 border border-black align-top text-[10pt]">Uang Harian</td>
                        <td className="p-1 border border-black align-top text-[10pt] text-center">Vol</td>
                        <td className="p-1 border border-black align-top text-[10pt] text-right">{item.budgets[0] ? Number(item.budgets[0].volDailyAllowance || 0).toLocaleString('id-ID') : 0}</td>
                        <td className="p-1 border border-black align-top text-[10pt] text-right">{item.budgets[0] ? Number(item.budgets[0].dailyAllowance || 0).toLocaleString('id-ID') : 0}</td>
                        <td className="p-1 border border-black align-top text-[10pt] text-center">=</td>
                        <td className="p-1 border border-black align-top text-[10pt] text-right">{item.budgets[0] ? Number((item.budgets[0].volDailyAllowance || 0) * (item.budgets[0].dailyAllowance || 0)).toLocaleString('id-ID') : 0}</td>
                        <td className="p-1 border border-black align-top text-[10pt]" rowSpan={3}>{index + 1}</td>
                    </tr>
                    <tr>
                        <td className="p-1 border border-black align-top text-[10pt]">Transport</td>
                        <td className="p-1 border border-black align-top text-[10pt] text-center">Vol</td>
                        <td className="p-1 border border-black align-top text-[10pt] text-right">{item.budgets[0] ? Number(item.budgets[0].volTransport || 0).toLocaleString('id-ID') : 0}</td>
                        <td className="p-1 border border-black align-top text-[10pt] text-right">{item.budgets[0] ? Number(item.budgets[0].transport || 0).toLocaleString('id-ID') : 0}</td>
                        <td className="p-1 border border-black align-top text-[10pt] text-center">=</td>
                        <td className="p-1 border border-black align-top text-[10pt] text-right">{item.budgets[0] ? Number((item.budgets[0].volTransport || 0) * (item.budgets[0].transport || 0)).toLocaleString('id-ID') : 0}</td>
                    </tr>
                    <tr>
                        <td className="p-1 border border-black align-top text-[10pt]">Representatif</td>
                        <td className="p-1 border border-black align-top text-[10pt] text-center">Vol</td>
                        <td className="p-1 border border-black align-top text-[10pt] text-right">{item.budgets[0] ? Number(item.budgets[0].volRepresentatif || 0).toLocaleString('id-ID') : 0}</td>
                        <td className="p-1 border border-black align-top text-[10pt] text-right">{item.budgets[0] ? Number(item.budgets[0].representatif || 0).toLocaleString('id-ID') : 0}</td>
                        <td className="p-1 border border-black align-top text-[10pt] text-center">=</td>
                        <td className="p-1 border border-black align-top text-[10pt] text-right">{item.budgets[0] ? Number((item.budgets[0].volRepresentatif || 0) * (item.budgets[0].representatif || 0)).toLocaleString('id-ID') : 0}</td>
                    </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <br />
        </div>
      )}
    </>
  );
}
