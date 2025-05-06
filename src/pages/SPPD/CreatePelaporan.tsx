import { useEffect, useMemo, useState } from "react";
import { TitleCase } from "@/components/card/TitleCase";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  useDisclosure,
  Tooltip,
} from "@heroui/react";
import { LuArrowLeft, LuSave } from "react-icons/lu";
import ConfirmModal from "@/components/modals/UtilsModal/ConfirmModal";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { useNavigate } from "react-router-dom";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link } from "react-router-dom";
import { useCreatePelaporanSPPD, useGetAllSPPDUserAll } from "@/services/sppd";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor, SimpleUploadAdapter } from "ckeditor5";
import { ckPlugins, ckToolbar } from "@/constants/CkEditorPlugin";
import { StorePelaporanSPPD } from "@/interface/request/sppd.interface";
import { DMYIndoToFormat } from "@/utils/dateFormater";
import { FaInfoCircle } from "react-icons/fa";

interface formProps {
  latarBelakang?: string;
  sasaran?: string;
  maksud?: string;
  tujuan?: string;
  dasarHukum?: string;
  isiLaporan?: string;
  jabatanPengelola?: string;
  pengelola?: string;
  nipPengelola?: string;
  subgadin?: string;
  jabatanSubagin?: string;
  nipSubagin?: string;
  sekertaris?: string;
  jabatanSekertaris?: string;
  nipSekertaris?: string;
}

interface errorProps {
  latarBelakang?: string;
  sasaran?: string;
  maksud?: string;
  tujuan?: string;
  dasarHukum?: string;
  isiLaporan?: string;
  jabatanPengelola?: string;
  pengelola?: string;
  nipPengelola?: string;
  subgadin?: string;
  jabatanSubagin?: string;
  nipSubagin?: string;
  sekertaris?: string;
  jabatanSekertaris?: string;
  nipSekertaris?: string;
}

export default function CreatePelaporan() {
  const [formData, setFormData] = useState<formProps>({
    latarBelakang: "",
    sasaran: "",
    maksud: "",
    tujuan: "",
    dasarHukum: "",
    isiLaporan: "",
    jabatanPengelola: "",
    pengelola: "",
    nipPengelola: "",
    subgadin: "",
    jabatanSubagin: "",
    nipSubagin: "",
    sekertaris: "",
    jabatanSekertaris: "",
    nipSekertaris: "",
  });

  const [formError, setFormError] = useState<errorProps>({});

  const rules = () => {
    const error: errorProps = {};
    if (!formData.latarBelakang)
      error.latarBelakang = "Latar Belakang tidak boleh kosong";
    if (!formData.sasaran) error.sasaran = "Sasaran tidak boleh kosong";
    if (!formData.maksud) error.maksud = "Maksud tidak boleh kosong";
    if (!formData.tujuan) error.tujuan = "Tujuan tidak boleh kosong";
    if (!formData.dasarHukum)
      error.dasarHukum = "Dasar hukum tidak boleh kosong";

    if (
      !formData.jabatanPengelola ||
      !formData.pengelola ||
      !formData.nipPengelola ||
      !formData.subgadin ||
      !formData.jabatanSubagin ||
      !formData.nipSubagin ||
      !formData.sekertaris ||
      !formData.jabatanSekertaris ||
      !formData.nipSekertaris
    )
      error.jabatanPengelola = "Pendanda tangan harus terisi semua";

    return error;
  };

  useEffect(() => {
    setFormData({
      latarBelakang: "",
      sasaran: "",
      maksud: "",
      tujuan: "",
      dasarHukum: "",
      isiLaporan: "",
      jabatanPengelola: "",
      pengelola: "",
      nipPengelola: "",
      subgadin: "",
      jabatanSubagin: "",
      nipSubagin: "",
      sekertaris: "",
      jabatanSekertaris: "",
      nipSekertaris: "",
    });
    setFormError({});
  }, []);

  const navigate = useNavigate();

  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();
  const [isLoadingConfirm, setLoadingConfirm] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onOpenConfirm();
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]; // ambil yyyy-mm-dd saja
  };

  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const startDate = formatDate(start);
  const endDate = formatDate(end);

  const { data, isFetching, refetch } = useGetAllSPPDUserAll(
    startDate,
    endDate,
  );

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const DATA_FETCHING = useMemo(() => {
    if (data) {
      const parsedData = data.data.response.map((item, index) => {
        const startDate = new Date(item.sppd.startDate);
        const endDate = new Date(item.sppd.endDate);

        return {
          no: index + 1,
          nama: item.user.name || "-",
          norek: item.sppd.kodeRekening || "-",
          nosp: item.sppd.nomorSurat || "-",
          tgl: `${item.sppd.startDate ? DMYIndoToFormat(item.sppd.startDate) : ""} - ${item.sppd.endDate ? DMYIndoToFormat(item.sppd.endDate) : ""}`,
          tujuan: item.sppd.location || "-",
          uraian: item.sppd.reasoning || "-",
          transport: item.budgets[0] ? item.budgets[0].transport || 0 : 0,
          xtransport: item.budgets[0] ? item.budgets[0].volTransport || 0 : 0,
          jumlahtransport: item.budgets[0]
            ? (item.budgets[0].transport || 0) *
              (item.budgets[0].volTransport || 0)
            : 0,
          representatif: item.budgets[0]
            ? item.budgets[0].representatif || 0
            : 0,
          xrepresentatif: item.budgets[0]
            ? item.budgets[0].volRepresentatif || 0
            : 0,
          jumlahrepresentatif: item.budgets[0]
            ? (item.budgets[0].representatif || 0) *
              (item.budgets[0].volRepresentatif || 0)
            : 0,
          daily: item.budgets[0] ? item.budgets[0].dailyAllowance || 0 : 0,
          xdaily: item.budgets[0] ? item.budgets[0].volDailyAllowance || 0 : 0,
          jumlahdaily: item.budgets[0]
            ? (item.budgets[0].dailyAllowance || 0) *
              (item.budgets[0].volDailyAllowance || 0)
            : 0,
          total: item.budgets[0]
            ? (item.budgets[0].transport || 0) *
                (item.budgets[0].volTransport || 0) +
              (item.budgets[0].representatif || 0) *
                (item.budgets[0].volRepresentatif || 0) +
              (item.budgets[0].dailyAllowance || 0) *
                (item.budgets[0].volDailyAllowance || 0)
            : 0,
          type: item.sppd.type,
          startDate,
          endDate,
          issame: false,
        };
      });

      for (let i = 0; i < parsedData.length; i++) {
        for (let j = 0; j < parsedData.length; j++) {
          if (
            i !== j &&
            parsedData[i].nama === parsedData[j].nama &&
            parsedData[i].startDate <= parsedData[j].endDate &&
            parsedData[i].endDate >= parsedData[j].startDate
          ) {
            parsedData[i].issame = true;
            break;
          }
        }
      }

      return parsedData.map(({ startDate, endDate, ...rest }) => rest);
    } else return [];
  }, [data]);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const generateKesimpulan = (data: typeof DATA_FETCHING) => {
    const totalPerjalanan = data.length;

    // Menghitung jumlah perjalanan dinas berdasarkan jenis
    const typeMap: { [key: string]: number } = {};
    data.forEach((item) => {
      const type = item.type || "Tidak Diketahui";
      if (typeMap[type]) {
        typeMap[type]++;
      } else {
        typeMap[type] = 1;
      }
    });

    // Mengurutkan pegawai berdasarkan jumlah perjalanan terbanyak
    const pegawaiCount: { [key: string]: number } = {};
    data.forEach((item) => {
      const nama = item.nama || "-";
      if (pegawaiCount[nama]) {
        pegawaiCount[nama]++;
      } else {
        pegawaiCount[nama] = 1;
      }
    });

    const topNama = Object.entries(pegawaiCount)
      .sort((a, b) => b[1] - a[1]) // Mengurutkan berdasarkan jumlah perjalanan terbanyak
      .slice(0, 10); // Ambil 10 pegawai terbanyak (atau kurang dari itu)

    const typeDescriptions = Object.entries(typeMap)
      .map(
        ([type, count]) =>
          `${count} ${type === "PERJALANAN_BIASA" ? "Perjalanan Dinas Biasa" : "Perjalanan Dinas Dalam Kota"}`,
      )
      .join(", ");

    const namaList = topNama
      .map(
        ([name, count], index) =>
          `${index + 1}. ${name} sebanyak ${count} kali`,
      )
      .join("; ");

    const jumlahPegawai = topNama.length;
    const pengantarNama =
      jumlahPegawai === 1
        ? "pegawai yang paling sering melakukan perjalanan dinas adalah"
        : jumlahPegawai < 10
          ? `berikut ${jumlahPegawai} pegawai yang paling sering melakukan perjalanan dinas`
          : "sepuluh pegawai yang paling sering melakukan perjalanan dinas adalah";

    const bulanIndo = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const now = new Date();
    const namaBulanTahun = `${bulanIndo[now.getMonth()]} ${now.getFullYear()}`;

    return `
      <div>
        <div>Selama periode pelaporan bulan ${namaBulanTahun}, tercatat sebanyak ${totalPerjalanan} perjalanan dinas telah dilaksanakan. Perjalanan tersebut terdiri dari ${typeDescriptions}.</div>
        <div>Adapun ${pengantarNama}: ${namaList}</div>
        <div>Data ini dapat menjadi dasar evaluasi terhadap intensitas pelaksanaan tugas luar kantor oleh masing-masing pegawai, serta menjadi acuan dalam pemerataan penugasan di masa mendatang.</div>
      </div>
    `;
  };

  useEffect(() => {
    refetch();
  }, []);

  const { mutate: mutatePost } = useCreatePelaporanSPPD();

  const handleConfirm = () => {
    setLoadingConfirm(true);

    const errorRules = rules();
    setFormError(errorRules);

    if (Object.keys(errorRules).length > 0) {
      setLoadingConfirm(false);
      onCloseConfirm();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      ErrorToast({ text: "Validasi gagal, cek kembali form anda" });
      return true;
    }

    const formToSend: StorePelaporanSPPD = {};

    if (formData.latarBelakang)
      formToSend.latarBelakang = formData.latarBelakang;
    if (formData.sasaran) formToSend.sasaran = formData.sasaran;
    if (formData.maksud) formToSend.maksud = formData.maksud;
    if (formData.tujuan) formToSend.tujuan = formData.tujuan;
    if (formData.dasarHukum) formToSend.dasarHukum = formData.dasarHukum;
    if (formData.isiLaporan) {
      formToSend.isiLaporan = `${formData.isiLaporan}${generateKesimpulan(DATA_FETCHING)}`;
    } else {
      formToSend.isiLaporan = `${generateKesimpulan(DATA_FETCHING)}`;
    }
    if (formData.jabatanPengelola)
      formToSend.jabatanPengelola = formData.jabatanPengelola;
    if (formData.pengelola) formToSend.pengelola = formData.pengelola;
    if (formData.nipPengelola) formToSend.nipPengelola = formData.nipPengelola;
    if (formData.subgadin) formToSend.subgadin = formData.subgadin;
    if (formData.jabatanSubagin)
      formToSend.jabatanSubagin = formData.jabatanSubagin;
    if (formData.nipSubagin) formToSend.nipSubagin = formData.nipSubagin;
    if (formData.sekertaris) formToSend.sekertaris = formData.sekertaris;
    if (formData.jabatanSekertaris)
      formToSend.jabatanSekertaris = formData.jabatanSekertaris;
    if (formData.nipSekertaris)
      formToSend.nipSekertaris = formData.nipSekertaris;

    try {
      mutatePost(formToSend, {
        onSuccess: () => {
          SuccessToast({ text: "Data berhasil ditambahkan" });
          navigate("/sppd?tab=pelaporan");
        },
        onError: (error: AxiosError<BaseErrorRes>) => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          ErrorToast({
            text:
              (error.response?.data.message as string) ||
              "Terjadi kesalahan saat mengirim data",
          });
          onCloseConfirm();
          setLoadingConfirm(false);
          throw error;
        },
      });
    } catch (error) {
      setLoadingConfirm(false);
      onCloseConfirm();
      throw error;
    }
  };

  return (
    <>
      <BreadcrumbAdmin location="/SPPD/Tambah-Pelaporan" />
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        isLoading={isLoadingConfirm}
        handleSubmit={handleConfirm}
      />

      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="flex">
          <Link
            to={`/sppd?tab=pelaporan`}
            className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
          >
            <LuArrowLeft /> Kembali
          </Link>
        </div>
        <TitleCase
          title="Tambah Laporan SPPD"
          text="Digunakan Untuk Menambah Laporan SPPD"
        />

        <div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Card shadow="none" className="border p-4">
              <CardHeader className="text-sm font-semibold">
                <div className="ms-auto">
                  <Button
                    isLoading={isFetching || isLoadingConfirm}
                    className="bg-button-primary text-white"
                    size="sm"
                    radius="sm"
                    type="submit"
                  >
                    <LuSave /> Simpan Data
                  </Button>
                </div>
              </CardHeader>
              {Object.keys(formError).length > 0 && (
                <div className="bg-alert-danger p-2 text-xs text-danger italic rounded-md border border-danger space-y-1">
                  {Object.entries(formError).map(([field, error]) => (
                    <div key={field}>{error}</div>
                  ))}
                </div>
              )}
              <CardBody>
                <div className="flex flex-col gap-2 text-sm">
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="pelaporan"
                        className="font-semibold text-lg"
                      >
                        I. Latar Belakang
                      </label>
                    </div>
                    <CKEditor
                      editor={ClassicEditor}
                      data={formData.latarBelakang}
                      config={{
                        extraPlugins: [SimpleUploadAdapter],
                        toolbar: ckToolbar,
                        plugins: ckPlugins,
                        image: {
                          toolbar: [
                            "imageTextAlternative",
                            "imageStyle:full",
                            "imageStyle:side",
                          ],
                          upload: {
                            types: ["jpeg", "png", "gif", "bmp", "webp"],
                          },
                        },
                        // simpleUpload: {
                        //     uploadUrl: `${BASE_URL}/upload-image`,
                        // }
                      }}
                      onChange={(_event, editor) => {
                        setFormData((prev) => {
                          return { ...prev, latarBelakang: editor.getData() };
                        });
                      }}
                    />
                  </div>
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="pelaporan"
                        className="font-semibold text-lg"
                      >
                        II. Sasaran
                      </label>
                    </div>
                    <CKEditor
                      editor={ClassicEditor}
                      data={formData.sasaran}
                      config={{
                        extraPlugins: [SimpleUploadAdapter],
                        toolbar: ckToolbar,
                        plugins: ckPlugins,
                        image: {
                          toolbar: [
                            "imageTextAlternative",
                            "imageStyle:full",
                            "imageStyle:side",
                          ],
                          upload: {
                            types: ["jpeg", "png", "gif", "bmp", "webp"],
                          },
                        },
                        // simpleUpload: {
                        //     uploadUrl: `${BASE_URL}/upload-image`,
                        // }
                      }}
                      onChange={(_event, editor) => {
                        setFormData((prev) => {
                          return { ...prev, sasaran: editor.getData() };
                        });
                      }}
                    />
                  </div>
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="pelaporan"
                        className="font-semibold text-lg"
                      >
                        III. Maksud dan Tujuan
                      </label>
                    </div>
                    <div>
                      <div className="mb-1">
                        <label
                          htmlFor="pelaporan"
                          className="font-semibold text-lg"
                        >
                          Maksud
                        </label>
                      </div>
                      <CKEditor
                        editor={ClassicEditor}
                        data={formData.maksud}
                        config={{
                          extraPlugins: [SimpleUploadAdapter],
                          toolbar: ckToolbar,
                          plugins: ckPlugins,
                          image: {
                            toolbar: [
                              "imageTextAlternative",
                              "imageStyle:full",
                              "imageStyle:side",
                            ],
                            upload: {
                              types: ["jpeg", "png", "gif", "bmp", "webp"],
                            },
                          },
                          // simpleUpload: {
                          //     uploadUrl: `${BASE_URL}/upload-image`,
                          // }
                        }}
                        onChange={(_event, editor) => {
                          setFormData((prev) => {
                            return { ...prev, maksud: editor.getData() };
                          });
                        }}
                      />
                    </div>
                    <div>
                      <div className="mb-1">
                        <label
                          htmlFor="pelaporan"
                          className="font-semibold text-lg"
                        >
                          Tujuan
                        </label>
                      </div>
                      <CKEditor
                        editor={ClassicEditor}
                        data={formData.tujuan}
                        config={{
                          extraPlugins: [SimpleUploadAdapter],
                          toolbar: ckToolbar,
                          plugins: ckPlugins,
                          image: {
                            toolbar: [
                              "imageTextAlternative",
                              "imageStyle:full",
                              "imageStyle:side",
                            ],
                            upload: {
                              types: ["jpeg", "png", "gif", "bmp", "webp"],
                            },
                          },
                          // simpleUpload: {
                          //     uploadUrl: `${BASE_URL}/upload-image`,
                          // }
                        }}
                        onChange={(_event, editor) => {
                          setFormData((prev) => {
                            return { ...prev, tujuan: editor.getData() };
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="pelaporan"
                        className="font-semibold text-lg"
                      >
                        IV. Dasar Hukum
                      </label>
                    </div>
                    <CKEditor
                      editor={ClassicEditor}
                      data={formData.dasarHukum}
                      config={{
                        extraPlugins: [SimpleUploadAdapter],
                        toolbar: ckToolbar,
                        plugins: ckPlugins,
                        image: {
                          toolbar: [
                            "imageTextAlternative",
                            "imageStyle:full",
                            "imageStyle:side",
                          ],
                          upload: {
                            types: ["jpeg", "png", "gif", "bmp", "webp"],
                          },
                        },
                        // simpleUpload: {
                        //     uploadUrl: `${BASE_URL}/upload-image`,
                        // }
                      }}
                      onChange={(_event, editor) => {
                        setFormData((prev) => {
                          return { ...prev, dasarHukum: editor.getData() };
                        });
                      }}
                    />
                  </div>
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="pelaporan"
                        className="font-semibold text-lg flex items-center gap-2"
                      >
                        V. Isi Laporan
                        <Tooltip
                          content="Optional, akan ditambahkan keterangan secara otomatis"
                          color="primary"
                          radius="sm"
                          className="border border-white"
                        >
                          <FaInfoCircle size={12} className="text-warning" />
                        </Tooltip>
                      </label>
                    </div>
                    <CKEditor
                      editor={ClassicEditor}
                      data={formData.isiLaporan}
                      config={{
                        extraPlugins: [SimpleUploadAdapter],
                        toolbar: ckToolbar,
                        plugins: ckPlugins,
                        image: {
                          toolbar: [
                            "imageTextAlternative",
                            "imageStyle:full",
                            "imageStyle:side",
                          ],
                          upload: {
                            types: ["jpeg", "png", "gif", "bmp", "webp"],
                          },
                        },
                        // simpleUpload: {
                        //     uploadUrl: `${BASE_URL}/upload-image`,
                        // }
                      }}
                      onChange={(_event, editor) => {
                        setFormData((prev) => {
                          return { ...prev, isiLaporan: editor.getData() };
                        });
                      }}
                    />
                  </div>
                  <br />
                  <div className="flex sm:flex-row flex-col items-center justify-between w-full gap-4">
                    <div className="flex flex-col items-center justify-center w-full gap-2">
                      <Input
                        variant="bordered"
                        aria-label="nomorSurat"
                        size="sm"
                        radius="sm"
                        className="max-w-96"
                        classNames={{
                          inputWrapper:
                            "border-[0.8px] border-button-primary rounded-md",
                          input: "text-xs",
                        }}
                        placeholder="Masukkan jabatan"
                        value={formData.jabatanPengelola}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            jabatanPengelola: e.target.value,
                          })
                        }
                      />
                      <br />
                      <br />
                      <br />
                      <br />
                      <Input
                        variant="bordered"
                        aria-label="nomorSurat"
                        size="sm"
                        radius="sm"
                        className="max-w-96"
                        classNames={{
                          inputWrapper:
                            "border-[0.8px] border-button-primary rounded-md",
                          input: "text-xs",
                        }}
                        placeholder="Masukkan nama"
                        value={formData.pengelola}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pengelola: e.target.value,
                          })
                        }
                      />
                      <Input
                        variant="bordered"
                        aria-label="nomorSurat"
                        size="sm"
                        radius="sm"
                        className="max-w-96"
                        classNames={{
                          inputWrapper:
                            "border-[0.8px] border-button-primary rounded-md",
                          input: "text-xs",
                        }}
                        placeholder="Masukkan nip"
                        value={formData.nipPengelola}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nipPengelola: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center w-full gap-2">
                      <Input
                        variant="bordered"
                        aria-label="nomorSurat"
                        size="sm"
                        radius="sm"
                        className="max-w-96"
                        classNames={{
                          inputWrapper:
                            "border-[0.8px] border-button-primary rounded-md",
                          input: "text-xs",
                        }}
                        placeholder="Masukkan jabatan"
                        value={formData.jabatanSekertaris}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            jabatanSekertaris: e.target.value,
                          })
                        }
                      />
                      <br />
                      <br />
                      <br />
                      <br />
                      <Input
                        variant="bordered"
                        aria-label="nomorSurat"
                        size="sm"
                        radius="sm"
                        className="max-w-96"
                        classNames={{
                          inputWrapper:
                            "border-[0.8px] border-button-primary rounded-md",
                          input: "text-xs",
                        }}
                        placeholder="Masukkan nama"
                        value={formData.sekertaris}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            sekertaris: e.target.value,
                          })
                        }
                      />
                      <Input
                        variant="bordered"
                        aria-label="nomorSurat"
                        size="sm"
                        radius="sm"
                        className="max-w-96"
                        classNames={{
                          inputWrapper:
                            "border-[0.8px] border-button-primary rounded-md",
                          input: "text-xs",
                        }}
                        placeholder="Masukkan nip"
                        value={formData.nipSekertaris}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nipSekertaris: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <br />
                  <div className="flex flex-col items-center justify-center w-full gap-2">
                    <Input
                      variant="bordered"
                      aria-label="nomorSurat"
                      size="sm"
                      radius="sm"
                      className="max-w-96"
                      classNames={{
                        inputWrapper:
                          "border-[0.8px] border-button-primary rounded-md",
                        input: "text-xs",
                      }}
                      placeholder="Masukkan jabatan"
                      value={formData.jabatanSubagin}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          jabatanSubagin: e.target.value,
                        })
                      }
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Input
                      variant="bordered"
                      aria-label="nomorSurat"
                      size="sm"
                      radius="sm"
                      className="max-w-96"
                      classNames={{
                        inputWrapper:
                          "border-[0.8px] border-button-primary rounded-md",
                        input: "text-xs",
                      }}
                      placeholder="Masukkan nama"
                      value={formData.subgadin}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subgadin: e.target.value,
                        })
                      }
                    />
                    <Input
                      variant="bordered"
                      aria-label="nomorSurat"
                      size="sm"
                      radius="sm"
                      className="max-w-96"
                      classNames={{
                        inputWrapper:
                          "border-[0.8px] border-button-primary rounded-md",
                        input: "text-xs",
                      }}
                      placeholder="Masukkan nip"
                      value={formData.nipSubagin}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nipSubagin: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </form>
        </div>
      </div>
    </>
  );
}
