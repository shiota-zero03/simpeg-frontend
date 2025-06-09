import { useEffect, useMemo } from "react";
import { ErrorToast } from "@/utils/ToastMessage";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDetailIKP } from "@/services/ikp";
import { IKPListRes } from "@/interface/responses/ikp.interface";
import { FaCheck } from "react-icons/fa";

export default function ExportIKP() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isFetching, refetch, error } = useGetDetailIKP(id || "");
  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/dialog-kinerja");
    }
  }, [isFetching, refetch]);

  useEffect(() => {
    refetch();
  }, []);

  const DATA_DETAIL: IKPListRes | null = useMemo(() => {
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
            <h1 className="font-bold">Rekapitulasi IKP</h1>
            <h1 className="font-bold">Instruksi Khusus Pimpinan</h1>
          </div>
          <br />
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-1 border border-black bg-blue-100" rowSpan={2}>
                  No
                </th>
                <th className="p-1 border border-black bg-blue-100" rowSpan={2}>
                  Nama Pegawai
                </th>
                <th className="p-1 border border-black bg-blue-100" rowSpan={2}>
                  NIP
                </th>
                <th className="p-1 border border-black bg-blue-100" rowSpan={2}>
                  Jabatan
                </th>
                <th className="p-1 border border-black bg-blue-100" rowSpan={2}>
                  Sasaran
                </th>
                <th className="p-1 border border-black bg-blue-100" rowSpan={2}>
                  Indikator
                </th>
                <th className="p-1 border border-black bg-blue-100" rowSpan={2}>
                  Target
                </th>
                <th className="p-1 border border-black bg-blue-100" rowSpan={2}>
                  Realisasi
                </th>
                <th className="p-1 border border-black bg-blue-100" rowSpan={2}>
                  Menunggu
                </th>
                <th className="p-1 border border-black bg-blue-100" rowSpan={2}>
                  Setuju
                </th>
                <th className="p-1 border border-black bg-blue-100" colSpan={3}>
                  Ajukan Perubahan
                </th>
              </tr>
              <tr>
                <th className="p-1 border border-black bg-blue-100">
                  Ubah Target
                </th>
                <th className="p-1 border border-black bg-blue-100">
                  Keterangan
                </th>
                <th className="p-1 border border-black bg-blue-100">
                  Dialog Kinerja
                </th>
              </tr>
              <tr>
                <th className="p-1 border border-black bg-gray-200">1</th>
                <th className="p-1 border border-black bg-gray-200">2</th>
                <th className="p-1 border border-black bg-gray-200">3</th>
                <th className="p-1 border border-black bg-gray-200">4</th>
                <th className="p-1 border border-black bg-gray-200">5</th>
                <th className="p-1 border border-black bg-gray-200">6</th>
                <th className="p-1 border border-black bg-gray-200">7</th>
                <th className="p-1 border border-black bg-gray-200">8</th>
                <th className="p-1 border border-black bg-gray-200">9</th>
                <th className="p-1 border border-black bg-gray-200">10</th>
                <th className="p-1 border border-black bg-gray-200">11</th>
                <th className="p-1 border border-black bg-gray-200">12</th>
                <th className="p-1 border border-black bg-gray-200">13</th>
              </tr>
            </thead>
            <tbody>
              {DATA_DETAIL.ikps.map((item, index) => (
                <tr key={index}>
                  <td className="text-center p-1 border align-top border-black">
                    {index + 1}
                  </td>
                  {index === 0 && (
                    <>
                      <td
                        rowSpan={DATA_DETAIL.ikps.length}
                        className="p-1 border align-top border-black"
                      >
                        {DATA_DETAIL.name}
                      </td>
                      <td
                        rowSpan={DATA_DETAIL.ikps.length}
                        className="p-1 border align-top border-black"
                      >
                        {DATA_DETAIL.nip}
                      </td>
                      <td
                        rowSpan={DATA_DETAIL.ikps.length}
                        className="p-1 border align-top border-black"
                      >
                        {DATA_DETAIL.jabatan}
                      </td>
                    </>
                  )}
                  <td className="p-1 border align-top border-black">
                    {item.sasaran}
                  </td>
                  <td className="p-1 border align-top border-black">
                    {item.indicator}
                  </td>
                  <td className="p-1 border align-top border-black">
                    {item.target}
                  </td>
                  <td className="p-1 border align-top border-black">
                    {item.realisasi}
                  </td>
                  <td className="p-1 border align-top border-black ">
                    <div className="flex justify-center align-top">
                      {(item.status !== "DISETUJUI" && item.status !== "SELESEI") && <FaCheck size={10} />}
                    </div>
                  </td>
                  <td className="p-1 border border-black align-top">
                    <div className="flex justify-center">
                      {(item.status === "DISETUJUI" || item.status === "SELESEI") && <FaCheck size={10} />}
                    </div>
                  </td>
                  <td className="p-1 border border-black align-top">
                    {item.ubahTarget}
                  </td>
                  <td className="p-1 border border-black align-top">
                    {item.description}
                  </td>
                  <td className="p-1 border border-black">{item.dialog}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <br />
          <div className="flex items-end justify-between px-[80pt]">
            <div className="flex flex-col max-w-[240px]">
              <span>{DATA_DETAIL.ttdJabatan || ""}</span>
              <br />
              <br />
              <br />
              <br />
              <br />
              <span className="font-semibold">{DATA_DETAIL.ttdName || ""}</span>
              <span>NIP.{DATA_DETAIL.ttdNIP || ""}</span>
            </div>
            <div className="flex flex-col max-w-[240px]">
              <span>{DATA_DETAIL.jabatan || ""}</span>
              <br />
              <br />
              <br />
              <br />
              <br />
              <span className="font-semibold">{DATA_DETAIL.name || ""}</span>
              <span>NIP.{DATA_DETAIL.nip || ""}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
