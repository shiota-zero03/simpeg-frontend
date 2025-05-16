import { TitleCase } from "@/components/card/TitleCase";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { LuArrowLeft } from "react-icons/lu";
import { Commet } from "react-loading-indicators";
import {
  useGetDetailEDisposisi,
  useVerifikasiEDisposisi,
} from "@/services/e-disposisi";
import Kop from "@/assets/kop-2.png";
import {
  Button,
  Checkbox,
  Divider,
  Input,
  Radio,
  RadioGroup,
  Textarea,
} from "@heroui/react";
import { DMYIndoToFormat, HIDateformat } from "@/utils/dateFormater";
import { LucideCheckCircle, LucideInbox } from "lucide-react";
import { StoreEDisposisi } from "@/interface/request/e-disposisi.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { FaCircle } from "react-icons/fa";

export default function Verifikasi() {

  const [penerusan, setPenerusan] = useState<string[]>([]);
  const [uptdName, setUptdName] = useState<string | null>();
  const [showInputFor, setShowInputFor] = useState<string | null>(null);

  const handleCheckboxChange = (name: string, checked: boolean) => {
    if (checked) {
      setPenerusan((prev) => [...prev, name]);
      if (name === "UPTD") {
        setShowInputFor(name);
      }
    } else {
      setPenerusan((prev) => prev.filter((item) => item !== name));
      if (name === showInputFor) {
        setShowInputFor(null);
      }
    }
  };

  const [formData, setFormData] = useState({
    diteruskan: "",
    harap: "",
    textHarap: "",
    catatan: "",
    uptdName: "",
  });

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

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
    refetch();
    setPenerusan([])
    setUptdName(null)
    setShowInputFor(null)
  }, []);

  const { mutate: mutatePost } = useVerifikasiEDisposisi();

  const handleSubmit = () => {
    if (penerusan.length === 0) {
      ErrorToast({ text: "Diteruskan belum dipilih" });
      return false;
    }
    if (!formData.harap) {
      ErrorToast({ text: "Dengan hormat belum dipilih" });
      return false;
    }

    let hasilGabungan = [...penerusan];
    if (penerusan.includes("UPTD")) {
      // Tambahkan uptdName jika belum ada
      if (!hasilGabungan.includes(uptdName ?? "")) {
        hasilGabungan.push(uptdName ?? "");
      }
    }

    const hasilString = hasilGabungan.join(";");

    setIsLoading(true);

    const formToSend: StoreEDisposisi = {};
    formToSend.disposisiId = Number(id);
    if (formData.catatan) formToSend.instruksi = formData.catatan;
    if (hasilString) {
      formToSend.diteruskan = hasilString;
    }
    if (formData.harap) {
      if (formData.harap === "Lainnya") {
        formToSend.denganHormat = formData.textHarap;
      } else {
        formToSend.denganHormat = formData.harap;
      }
    }

    try {
      mutatePost(formToSend, {
        onSuccess: () => {
          SuccessToast({ text: "Data berhasil diperbarui" });
          navigate("/e-disposisi");
        },
        onError: (error: AxiosError<BaseErrorRes>) => {
          ErrorToast({
            text:
              (error.response?.data.message as string) ||
              "Terjadi kesalahan saat mengirim data",
          });
          setIsLoading(false);
          throw error;
        },
      });
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };
  const handleSubmit2 = () => {
    if (penerusan.length === 0) {
      ErrorToast({ text: "Diteruskan belum dipilih" });
      return false;
    }

    let hasilGabungan = [...penerusan];
    if (penerusan.includes("UPTD")) {
      // Tambahkan uptdName jika belum ada
      if (!hasilGabungan.includes(uptdName ?? "")) {
        hasilGabungan.push(uptdName ?? "");
      }
    }

    const hasilString = hasilGabungan.join(";");

    setIsLoading(true);

    const formToSend: StoreEDisposisi = {};
    formToSend.disposisiId = Number(id);
    formToSend.instruksi = DATA_FETCHING?.instruksi?.[0].instruksi;
    if (hasilString) {
      formToSend.diteruskan = hasilString;
    }
    if (formData.harap)
      formToSend.denganHormat = DATA_FETCHING?.instruksi?.[0].denganHormat;

    try {
      mutatePost(formToSend, {
        onSuccess: () => {
          SuccessToast({ text: "Data berhasil diperbarui" });
          navigate("/e-disposisi");
        },
        onError: (error: AxiosError<BaseErrorRes>) => {
          ErrorToast({
            text:
              (error.response?.data.message as string) ||
              "Terjadi kesalahan saat mengirim data",
          });
          setIsLoading(false);
          throw error;
        },
      });
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

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
    { name: "UPTD" },
  ];

  const harap = [
    { name: "Tanggapan dan saran" },
    { name: "Proses Lebih lanjut" },
    { name: "Koordinasi / Konfirmasikan" },
    { name: "Lainnya" },
  ];

  useEffect(() => {
    setFormData({
      diteruskan: "",
      harap: "",
      textHarap: "",
      catatan: "",
      uptdName: "",
    });
  }, []);
  return (
    <>
      <BreadcrumbAdmin location="/E-Disposisi/Verifikasi" />
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
          <TitleCase title="Verifikasi E-Disposisi" />
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
              <div className="flex items-center gap-2 text-success font-semibold">
                <LucideCheckCircle /> Paraf
              </div>
            </div>
            <Divider className="h-0.5" />
            <div className="grid md:grid-cols-2 grid-cols-1 md:px-8 px-4 items-start gap-4">
              {DATA_FETCHING?.instruksi &&
              DATA_FETCHING?.instruksi.length === 0 ? (
                <div className="flex flex-col gap-2">
                  <label htmlFor="diteruskan" className="text-sm font-semibold">
                    Diteruskan kepada :
                  </label>
                  <div className="ms-4 space-y-2">
                    {diteruskan.map((item) => (
                      <div key={item.name}>
                        <Checkbox
                          size="sm"
                          checked={penerusan.includes(item.name)}
                          onChange={(e) => handleCheckboxChange(item.name, e.target.checked)}
                        >
                          {item.name}
                        </Checkbox>

                        {/* Jika yang dipilih adalah 'Unit Lainnya' (atau unit tertentu), tampilkan input */}
                        {showInputFor === item.name && (
                          <Input
                            aria-label="masukkan data"
                            onClick={(e) => e.stopPropagation()}
                            isDisabled={showInputFor !== item.name}
                            value={uptdName ?? ""}
                            onChange={(e) =>
                              setUptdName(e.target.value )
                            }
                            variant="bordered"
                            radius="sm"
                            placeholder="Masukkan Disini"
                            className="mx-4"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <label htmlFor="diteruskan" className="text-sm font-semibold">
                    Diteruskan kepada :
                  </label>
                  {diteruskan[0].sub?.map((item) => (
                    <Checkbox
                      size="sm"
                      checked={penerusan.includes(item.name)}
                      onChange={(e) => handleCheckboxChange(item.name, e.target.checked)}
                    >
                      {item.name}
                    </Checkbox>
                  ))}
                </div>
              )}
              {DATA_FETCHING?.instruksi &&
              DATA_FETCHING?.instruksi.length === 0 ? (
                <div className="flex flex-col gap-2">
                  <label htmlFor="diteruskan" className="text-sm font-semibold">
                    Dengan hormat harap :
                  </label>
                  <RadioGroup
                    size="sm"
                    value={formData.harap}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        harap: e.target.value,
                      }))
                    }
                    orientation="vertical"
                    className="ms-4"
                  >
                    {harap.map((item) => (
                      <Radio value={item.name} key={item.name}>
                        {item.name}
                      </Radio>
                    ))}
                  </RadioGroup>
                  <Input
                    aria-label="masukkan data"
                    onClick={(e) => e.stopPropagation()}
                    isDisabled={formData.harap !== "Lainnya"}
                    value={
                      formData.harap === "Lainnya" ? formData.textHarap : ""
                    }
                    onChange={(e) =>
                      setFormData({ ...formData, textHarap: e.target.value })
                    }
                    variant="bordered"
                    radius="sm"
                    placeholder="Masukkan Disini"
                    className="mx-4"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <label htmlFor="diteruskan" className="text-sm font-semibold">
                    Dengan hormat harap :
                  </label>
                  <div className="text-sm">
                    {DATA_FETCHING?.instruksi?.[0].denganHormat}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1 md:px-8 px-4">
              <label htmlFor="Catatan" className="text-sm font-semibold">
                Catatan
              </label>
              {DATA_FETCHING?.instruksi &&
              DATA_FETCHING?.instruksi.length === 0 ? (
                <Textarea
                  aria-label="catatan"
                  variant="bordered"
                  placeholder="Masukkan disini"
                  value={formData.catatan}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      catatan: e.target.value,
                    })
                  }
                />
              ) : (
                <Textarea
                  isDisabled
                  aria-label="catatan"
                  variant="bordered"
                  placeholder="Masukkan disini"
                  value={DATA_FETCHING?.instruksi?.[0].instruksi}
                />
              )}
            </div>
            <div className="flex items-center justify-end w-full gap-2 md:px-8 px-4">
              {DATA_FETCHING?.instruksi &&
              DATA_FETCHING?.instruksi.length === 0 ? (
                <Button
                  isLoading={isLoading}
                  onPress={handleSubmit}
                  className="border border-button-primary bg-button-primary text-white font-semibold"
                  size="sm"
                  radius="sm"
                >
                  <LucideInbox /> Verifikasi Data
                </Button>
              ) : (
                <Button
                  isLoading={isLoading}
                  onPress={handleSubmit2}
                  className="border border-button-primary bg-button-primary text-white font-semibold"
                  size="sm"
                  radius="sm"
                >
                  <LucideInbox /> Teruskan Data
                </Button>
              )}
            </div>
            <div className="md:px-8 px-4">
              <h1 className="font-semibold">Riwayat E-Disposisi</h1>
              <ol className="relative border-s border-gray-200 dark:border-gray-700 ms-4 mt-2">
                {DATA_FETCHING?.riwayat.map((item, idx) => (
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
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
