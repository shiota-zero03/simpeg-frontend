import { useEffect, useMemo, useState } from "react";
import { TitleCase } from "@/components/card/TitleCase";
import {
  Button,
  Input,
} from "@heroui/react";
import { LuArrowLeft } from "react-icons/lu";
import { ErrorToast } from "@/utils/ToastMessage";
import { useNavigate, useParams } from "react-router-dom";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link } from "react-router-dom";
import { LucideFileCheck2, LucideSend } from "lucide-react";
import { useGetDetailIKP } from "@/services/ikp";
import store from "@/redux/store";
import { TbFaceIdError } from "react-icons/tb";

export default function DetailIKP() {

    const { id } = useParams();
    const { role } = store.getState().auth;
    const [ status, setStatus ] = useState<string>("MENUNGGU")
    const { data, isFetching, refetch, error } = useGetDetailIKP(id || "")
    const DATA_DETAIL = useMemo(() => {
        if(!data) return null;
        const ikps = data.data.ikps; // misalnya item.ikps adalah array of object dengan properti "status"

        const hasMenunggu = ikps.some((el) => el.status === "MENUNGGU");
        const allSetujui = ikps.every((el) => el.status === "DISETUJUI");
        const allDitolak = ikps.every((el) => el.status === "DITOLAK");

        if (hasMenunggu) {
            setStatus("MENUNGGU");
        } else if (allSetujui) {
            setStatus("SETUJUI");
        } else if (allDitolak) {
            setStatus("DITOLAK");
        } else {
            setStatus("MENUNGGU");
        }


        return data.data;
    }, [data, id])

    useEffect(() => {
        refetch();
    }, [data])

  const navigate = useNavigate();
  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/dialog-kinerja");
    }
  }, [isFetching, refetch]);

  return (
    <>
      <BreadcrumbAdmin location="/Dialog-Kinerja/Detail-Data" />
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="flex">
          <Link
            to={`/dialog-kinerja`}
            className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
          >
            <LuArrowLeft /> Kembali
          </Link>
        </div>
        <TitleCase title="Detail Dialog Kinerja (IKP)" />

        <div className="bg-white shadow-md rounded-xl border p-4">
            {role === "PEGAWAI" && status === "MENUNGGU" && (
                <div className="flex items-center justify-end gap-2">
                    <Button className="bg-alert-info text-info border border-info font-semibold" size="sm"><LucideFileCheck2 size={14} /> Setujui</Button>
                    <Button className="bg-alert-warning text-warning border border-warning font-semibold" size="sm"><LucideSend size={14} /> Ajukan Perubahan</Button>
                </div>
            )}
          <div className="flex flex-col gap-2">
            <div className="grid lg:grid-cols-4 grid-cols-1 gap-2 border-2 my-4 p-2 rounded-lg shadow-sm">
              <div>
                <label htmlFor="content" className="font-normal text-xs">
                Nama Pegawai
                </label>
                <Input
                  isReadOnly
                  value={DATA_DETAIL?.name}
                  aria-label="Judul"
                  labelPlacement="outside"
                  placeholder="AUTO_FILLED"
                  variant="bordered"
                  radius="sm"
                  classNames={{
                    inputWrapper: "border-none",
                    input: "text-xs font-semibold",
                  }}
                />
              </div>
              <div>
                <label htmlFor="content" className="font-normal text-xs">
                NIP
                </label>
                <Input
                  isReadOnly
                  value={DATA_DETAIL?.nip}
                  aria-label="Judul"
                  labelPlacement="outside"
                  placeholder="AUTO_FILLED"
                  variant="bordered"
                  radius="sm"
                  classNames={{
                    inputWrapper: "border-none",
                    input: "text-xs font-semibold",
                  }}
                />
              </div>
              <div>
                <label htmlFor="content" className="font-normal text-xs">
                Jabatan
                </label>
                <Input
                  isReadOnly
                  value={DATA_DETAIL?.jabatan}
                  aria-label="Judul"
                  labelPlacement="outside"
                  placeholder="AUTO_FILLED"
                  variant="bordered"
                  radius="sm"
                  classNames={{
                    inputWrapper: "border-none",
                    input: "text-xs font-semibold",
                  }}
                />
              </div>
              <div>
                <label htmlFor="content" className="font-normal text-xs">
                Status
                </label>
                <Input
                  isReadOnly
                  value={status === "DISETUJUI" ? "Disetujui" : (status === "DITOLAK" ? "Ditolak" : "Menunggu")}
                  aria-label="Judul"
                  labelPlacement="outside"
                  placeholder="AUTO_FILLED"
                  variant="bordered"
                  radius="sm"
                  classNames={{
                    inputWrapper: "border-none",
                    input: `text-xs font-semibold ${status === "DISETUJUI" ? "text-success" : (status === "DITOLAK" ? "text-danger" : "text-warning")}`,
                  }}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-gray-300">
                        <thead>
                            <tr>
                                <th
                                    className={`border-b-2 border-accent-gray p-2 text-center text-sm bg-primary text-white rounded-ss-md`}
                                >
                                    No
                                </th>
                                <th
                                    className={`border-b-2 border-accent-gray p-2 text-left text-sm bg-primary text-white`}
                                >
                                    Sasaran
                                </th>
                                <th
                                    className={`border-b-2 border-accent-gray p-2 text-left text-sm bg-primary text-white`}
                                >
                                    Indikator
                                </th>
                                <th
                                    className={`border-b-2 border-accent-gray p-2 text-left text-sm bg-primary text-white`}
                                >
                                    Target
                                </th>
                                <th
                                    className={`border-b-2 border-accent-gray p-2 text-left text-sm bg-primary text-white`}
                                >
                                    Status
                                </th>
                                <th
                                    className={`border-b-2 border-accent-gray p-2 text-left text-sm bg-primary text-white`}
                                >
                                    Realisasi
                                </th>
                                <th
                                    className={`border-b-2 border-accent-gray p-2 text-left text-sm bg-primary text-white`}
                                >
                                    Ubah Target
                                </th>
                                <th
                                    className={`border-b-2 border-accent-gray p-2 text-left text-sm bg-primary text-white`}
                                >
                                    Keterangan
                                </th>
                                <th
                                    className={`border-b-2 border-accent-gray p-2 text-left text-sm bg-primary text-white rounded-se-md`}
                                >
                                    Dialog
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {DATA_DETAIL && DATA_DETAIL?.ikps.length > 0 ? DATA_DETAIL.ikps.map((item, index) => (
                              <tr key={index}>
                                <td
                                    className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-center w-10`}
                                >
                                    {index + 1}
                                </td>
                                <td
                                    className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left`}
                                >
                                    {item.sasaran}
                                </td>
                                <td
                                    className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left`}
                                >
                                    {item.indicator}
                                </td>
                                <td
                                    className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left`}
                                >
                                    {item.target}
                                </td>
                                <td
                                    className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left ${item.status === "DISETUJUI" ? "text-success" : (item.status === "DITOLAK" ? "text-danger" : "text-warning")}`}
                                >
                                    {item.status === "DISETUJUI" ? "Disetujui" : (item.status === "DITOLAK" ? "Ditolak" : "Menunggu")}
                                </td>
                                <td
                                    className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left`}
                                >
                                    {item.realisasi || "-"}
                                </td>
                                <td
                                    className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left`}
                                >
                                    {item.ubahTarget || "-"}
                                </td>
                                <td
                                    className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left`}
                                >
                                    {item.description || "-"}
                                </td>
                                <td
                                    className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-left`}
                                >
                                    {item.dialog || "-"}
                                </td>
                              </tr>
                            )) : (
                              
                                <tr>
                                <td colSpan={9} className="py-4">
                                    <div className="w-full flex items-center justify-center flex-col text-primary opacity-20">
                                    <TbFaceIdError size={120} />
                                    <span className="italic text-xl font-semibold">
                                        No Data Found
                                    </span>
                                    </div>
                                </td>
                                </tr>
                            )}
                        </tbody>
                      </table>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
