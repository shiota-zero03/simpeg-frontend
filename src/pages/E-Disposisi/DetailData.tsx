import { TitleCase } from "@/components/card/TitleCase";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ErrorToast } from "@/utils/ToastMessage";
import { LuArrowLeft } from "react-icons/lu";
import { Commet } from "react-loading-indicators";
import { useGetDetailEDisposisi } from "@/services/e-disposisi";
import Kop from "@/assets/kop-2.png";
import { Divider } from "@heroui/react";
import { DMYIndoToFormat, HIDateformat } from "@/utils/dateFormater";
import { LucideCheckCircle } from "lucide-react";
import { FaCircle } from "react-icons/fa";

export default function Verifikasi() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [firstInstruction, setFirstInstruction] = useState<string[]>([]);

  const { data, isFetching, refetch, error } = useGetDetailEDisposisi(id || "");
  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/e-disposisi");
    }
  }, [isFetching, refetch]);

  const DATA_FETCHING = useMemo(() => {
    if (data) return data.data;
    else return null;
  }, [data]);

  useEffect(() => {
    if (DATA_FETCHING && DATA_FETCHING.instruksi) {
      if (DATA_FETCHING.instruksi.length > 0) {
        const firstArray = DATA_FETCHING.instruksi[0].diteruskan
          .split(";")
          .map((item) => item.trim());
        setFirstInstruction(firstArray);
      }
    }
  }, [DATA_FETCHING, data, id]);

  useEffect(() => {
    refetch();
  }, []);

  const diteruskan = [
    {
      name: "Sekretariat",
      sub: [
        { name: "Kasubbag Umum & Kepegawaian" },
        { name: "Kasubbag Perencanaan" },
      ],
    },
    { name: "Bidang Sarana & Pelaku Distribusi" },
    { name: "Bidang Pengendalian Barang Pokok & Penting" },
    { name: "Bidang Pengembangan Perdagangan Luar Negeri" },
    { name: "Bidang Kemetrologian" },
  ];

  const harap = [
    { name: "Tanggapan dan saran" },
    { name: "Proses Lebih lanjut" },
    { name: "Koordinasi / Konfirmasikan" },
  ];
  return (
    <>
      <BreadcrumbAdmin location="/E-Disposisi/Detail-Data" />
      {isFetching ? (
        <div className="inset-0 fixed flex items-center justify-center z-20">
          <Commet color="#32cd32" size="medium" text="" textColor="" />
        </div>
      ) : (
        <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
          <div className="flex">
            <Link
              to={`/e-disposisi`}
              className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
            >
              <LuArrowLeft /> Kembali
            </Link>
          </div>
          <TitleCase title="Detail E-Disposisi" />
          <div className="flex flex-col gap-8 md:p-24 p-2 bg-white">
            <img src={Kop} alt="kop-surat-2" />
            <h1 className="text-center font-bold text-2xl">E-DISPOSISI</h1>
            <div className="flex flex-col gap-4">
              <Divider className="h-0.5" />
              <div className="grid md:grid-cols-2 grid-cols-1 md:px-8 px-4 items-start">
                <table>
                  <tbody>
                    <tr>
                      <td className="w-40">Surat Dari</td>
                      <th className="text-left">
                        : {DATA_FETCHING?.suratDari}
                      </th>
                    </tr>
                    <tr>
                      <td className="w-40">Nomor Surat</td>
                      <th className="text-left">
                        : {DATA_FETCHING?.nomorSurat}
                      </th>
                    </tr>
                    <tr>
                      <td className="w-40">Tgl. Surat</td>
                      <th className="text-left">
                        :{" "}
                        {DATA_FETCHING?.tanggalSurat
                          ? DMYIndoToFormat(DATA_FETCHING?.tanggalSurat)
                          : ""}
                      </th>
                    </tr>
                  </tbody>
                </table>
                <table>
                  <tbody>
                    <tr>
                      <td className="w-40">Diterima Tanggal</td>
                      <th className="text-left">
                        :{" "}
                        {DATA_FETCHING?.tanggalDiterima
                          ? DMYIndoToFormat(DATA_FETCHING?.tanggalDiterima)
                          : ""}
                      </th>
                    </tr>
                    <tr>
                      <td className="w-40">Sifat</td>
                      <th className="text-left">
                        :{" "}
                        {DATA_FETCHING?.sifat &&
                          (DATA_FETCHING?.sifat === "SANGAT_SEGERA"
                            ? "Sangat Segera"
                            : DATA_FETCHING?.sifat === "SEGERA"
                              ? "Segera"
                              : DATA_FETCHING?.sifat === "PENTING"
                                ? "Penting"
                                : DATA_FETCHING?.sifat === "BIASA"
                                  ? "Biasa"
                                  : "Rahasia")}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Divider className="h-0.5" />
            </div>
            <div className="flex items-center justify-between md:px-8 px-4">
              <div>
                <label htmlFor="perihal">Perihal</label>
                <div className="font-medium text-sm">
                  {DATA_FETCHING?.description}
                </div>
              </div>
              {DATA_FETCHING?.paraf && (
                <div className="flex items-center gap-2 text-success font-semibold">
                  <LucideCheckCircle /> Paraf
                </div>
              )}
            </div>
            <Divider className="h-0.5" />
            <div className="grid md:grid-cols-2 grid-cols-1 md:px-8 px-4 items-start gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="diteruskan" className="text-sm font-semibold">
                  Diteruskan kepada :
                </label>
                <ul className="ms-4">
                  {diteruskan.map((item) => (
                    <li
                      className={`
                        list-disc
                      ${
                        DATA_FETCHING?.instruksi &&
                        DATA_FETCHING?.instruksi.length === 0
                          ? "text-gray-400"
                          : `
                        ${firstInstruction.includes(item.name) ? "text-success font-semibold" : "text-gray-400"}
                      `
                      }
                    `}
                      key={item.name}
                    >
                      {item.name}
                      {item.sub && (
                        <ul>
                          {item.sub.map((it) => (
                            <li
                              key={it.name}
                              className={`
                            ms-6 list-disc
                            ${
                              DATA_FETCHING?.instruksi &&
                              DATA_FETCHING?.instruksi.length > 1
                                ? `
                              ${DATA_FETCHING?.instruksi?.[1].diteruskan.includes(it.name) ? "text-success font-semibold" : "text-gray-400 font-normal"}
                            `
                                : "text-gray-400 font-normal"
                            }
                          `}
                            >
                              {it.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                  {firstInstruction.includes("UPTD") && (
                    <li className="text-success font-semibold list-disc">
                      {firstInstruction[firstInstruction.length - 1] ?? "-"}
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="diteruskan" className="text-sm font-semibold">
                  Dengan hormat harap :
                </label>
                <div>
                  {harap.map((item) => (
                    <li
                      className={`
                      ${
                        DATA_FETCHING?.instruksi &&
                        DATA_FETCHING?.instruksi.length === 0
                          ? "text-gray-400"
                          : `
                        ${DATA_FETCHING?.instruksi?.[0].denganHormat === item.name ? "text-success font-semibold" : "text-gray-400"}
                      `
                      }
                    `}
                      key={item.name}
                    >
                      {item.name}
                    </li>
                  ))}
                  {DATA_FETCHING?.instruksi?.[0]?.denganHormat &&
                    !harap.some(
                      (item) =>
                        item.name ===
                        DATA_FETCHING?.instruksi?.[0]?.denganHormat,
                    ) && (
                      <li className="text-success font-semibold">
                        {DATA_FETCHING?.instruksi?.[0]?.denganHormat}
                      </li>
                    )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 md:px-8 px-4">
              <label htmlFor="Catatan" className="text-sm font-semibold">
                Catatan
              </label>
              <div className="font-medium text-sm">
                {DATA_FETCHING?.instruksi?.[0]?.instruksi || "-"}
              </div>
            </div>
            <div className="md:px-8 px-4">
              <h1 className="font-semibold">Riwayat E-Disposisi</h1>
              <ol className="relative border-s border-gray-200 dark:border-gray-700 ms-4 mt-2">
                {DATA_FETCHING?.riwayat.map((item, idx) => {
                  if(DATA_FETCHING?.instruksi && DATA_FETCHING?.instruksi?.length === 2) {
                    if((DATA_FETCHING?.instruksi[0].diteruskan === DATA_FETCHING?.instruksi[1].diteruskan) && item.description !== "Meneruskan E-Disposisi kepada Kadis untuk konfirmasi") {
                      return (
                        <li className="mb-10 ms-6" key={idx}>
                          <span
                            className={`absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-white ${idx === 0 ? "bg-[#E0FFFB]" : "bg-white"}`}
                          >
                            <FaCircle
                              size={10}
                              className={`${idx === 0 ? "text-[#1AB29E]" : "text-[#939597]"}`}
                            />
                          </span>
                          <h3 className="text-sm font-semibold mb-2">
                            {item.description}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {DMYIndoToFormat(item.createdAt)} &nbsp;|&nbsp;{" "}
                            {HIDateformat(item.createdAt)}
                          </p>
                        </li>
                      )
                    } else {
                      if(idx === 0) {
                        return (
                          <li className="mb-10 ms-6" key={idx}>
                            <span
                              className={`absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-white ${idx === 0 ? "bg-[#E0FFFB]" : "bg-white"}`}
                            >
                              <FaCircle
                                size={10}
                                className={`text-[#1AB29E]`}
                              />
                            </span>
                            <h3 className="text-sm font-semibold mb-2">
                              Diselesaikan oleh Sekretaris Dinas
                            </h3>
                            <p className="text-xs text-gray-500">
                              {DMYIndoToFormat(item.createdAt)} &nbsp;|&nbsp;{" "}
                              {HIDateformat(item.createdAt)}
                            </p>
                          </li>
                        )
                      }
                    }
                  } else {
                    return (
                      <>
                        {item.description === "Meneruskan E-Disposisi kepada Kadis untuk konfirmasi" && (
                          <li className="mb-10 ms-6" key={idx}>
                            <span
                              className={`absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-white ${idx === 0 ? "bg-[#E0FFFB]" : "bg-white"}`}
                            >
                              <FaCircle
                                size={10}
                                className={`text-[#1AB29E]`}
                              />
                            </span>
                            <h3 className="text-sm font-semibold mb-2">
                              Selesai
                            </h3>
                            <p className="text-xs text-gray-500">
                              {DMYIndoToFormat(item.createdAt)} &nbsp;|&nbsp;{" "}
                              {HIDateformat(item.createdAt)}
                            </p>
                          </li>
                        )}
                        <li className="mb-10 ms-6" key={idx}>
                          <span
                            className={
                              `absolute flex items-center justify-center w-6 h-6 rounded-full -start-3 ring-8 ring-white 
                              ${DATA_FETCHING?.riwayat.filter(it => it.description.includes("Meneruskan E-Disposisi kepada Kadis untuk konfirmasi")) ? "bg-white" : (
                                idx === 0 ? "bg-[#E0FFFB]" : "bg-white"
                              )}
                              `
                            }
                          >
                            <FaCircle
                              size={10}
                              className={
                                DATA_FETCHING?.riwayat.filter(it => it.description.includes("Meneruskan E-Disposisi kepada Kadis untuk konfirmasi")) ? "text-[#939597]" : (
                                  `${idx === 0 ? "text-[#1AB29E]" : "text-[#939597]"}`
                                )
                              }
                            />
                          </span>
                          <h3 className="text-sm font-semibold mb-2">
                            {item.description}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {DMYIndoToFormat(item.createdAt)} &nbsp;|&nbsp;{" "}
                            {HIDateformat(item.createdAt)}
                          </p>
                        </li>
                      </>
                    )
                  }
                })}
              </ol>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
