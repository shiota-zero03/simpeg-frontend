import { useEffect, useMemo, useState } from "react";
import { TitleCase } from "@/components/card/TitleCase";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { LuArrowLeft, LuSave } from "react-icons/lu";
import ConfirmModal from "@/components/modals/UtilsModal/ConfirmModal";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { useNavigate } from "react-router-dom";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor, SimpleUploadAdapter } from "ckeditor5";
import { ckPlugins, ckToolbar } from "@/constants/CkEditorPlugin";
import { StorePelaporanPegawai } from "@/interface/request/pegawai.interface";
import {
  useCreatePelaporanPegawai,
  useGetAllPegawaiAdmin,
  useGetAllPegawaiOption,
} from "@/services/pegawai";
import { YMToIndoFormat } from "@/utils/dateFormater";
import dayjs from "dayjs";
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

  const { mutate: mutatePost } = useCreatePelaporanPegawai();

  const dateDefault = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
  const getStartAndEndDate = (month: string) => {
    const [year, mon] = month.split("-").map(Number);
    const startDate = `${year}-${String(mon).padStart(2, "0")}-01`;
    const endDate = new Date(year, mon, 0); // tanggal terakhir bulan tsb
    const formattedEndDate = `${year}-${String(mon).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;

    return { startDate, endDate: formattedEndDate };
  };

  const { data, isFetching, refetch } = useGetAllPegawaiOption();
  const {
    data: allDataSurat,
    isFetching: isFetchingDataSurat,
    refetch: refetchDataSurat,
  } = useGetAllPegawaiAdmin(
    1,
    500,
    "",
    getStartAndEndDate(dateDefault).startDate,
    getStartAndEndDate(dateDefault).endDate,
  );

  const DATA_FETCHING = useMemo(() => {
    if (data) return data.data;
    else return [];
  }, [data]);

  const dataSurat = useMemo(() => {
    if (allDataSurat) {
      const dataForSurat = allDataSurat.data.response;
      return {
        cuti: dataForSurat.filter((it) => it.typeForm === "CUTI"),
        pangkat: dataForSurat.filter(
          (it) => it.typeForm === "KENAIKAN_PANGKAT",
        ),
        gaji: dataForSurat.filter((it) => it.typeForm === "KENAIKAN_GAJI"),
      };
    } else {
      return {
        cuti: [],
        pangkat: [],
        gaji: [],
      };
    }
  }, [dateDefault, allDataSurat]);

  useEffect(() => {
    refetch();
    refetchDataSurat();
  }, []);

  const formatNames = (arr: string[]) => {
    if (arr.length === 0) return "";
    if (arr.length === 1) return arr[0];
    if (arr.length === 2) return `${arr[0]} dan ${arr[1]}`;
    return `${arr.slice(0, -1).join(", ")}, dan ${arr[arr.length - 1]}`;
  };

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

    const formToSend: StorePelaporanPegawai = {};

    const namesGaji = dataSurat.gaji.map((d) => d.user.name);
    const namesPangkat = dataSurat.pangkat.map((d) => d.user.name);
    const namesCuti = dataSurat.cuti.map((d) => d.user.name);
    const namePensiun = DATA_FETCHING.filter((it) => {
      if (!it.pensionDate) return false;
      return dayjs(it.pensionDate).format("YYYY-MM") === dateDefault;
    }).map((d) => d.name);

    const textLaporan = `
      <p>
        Berdasarkan data kepegawaian yang dihimpun hingga bulan ${YMToIndoFormat(dateDefault)}, 
        tercatat sebanyak ${DATA_FETCHING.length} Pegawai yang terdaftar secara aktif dalam sistem informasi kepegawaian. 
        ${
          namesGaji.length > 0
            ? `Dari jumlah tersebut, sebanyak ${namesGaji.length} pegawai, atas nama ${formatNames(namesGaji)}, telah memperoleh kenaikan gaji berkala sesuai dengan ketentuan yang berlaku.`
            : "Tidak ada pegawai yang memperoleh kenaikan gaji berkala pada bulan ini."
        }
        ${
          namesPangkat.length > 0
            ? ` Selanjutnya, ${namesPangkat.length} pegawai, yakni ${formatNames(namesPangkat)}, telah memenuhi syarat dan ditetapkan mendapatkan kenaikan pangkat.`
            : " Selanjutnya, pada bulan ini tidak ada pegawai yang ditetapkan mendapatkan kenaikan pangkat."
        }
        ${
          namesCuti.length > 0
            ? ` Selain itu, terdapat ${namesCuti.length} pegawai yang telah mengajukan usulan terkait hak cuti kepegawaiannya, yaitu ${formatNames(namesCuti)}.`
            : " Selain itu, tidak ada pengajuan cuti pegawai yang dilakukan pada bulan ini."
        }
        ${
          namePensiun.length > 0
            ? ` Terakhir, terdapat ${namePensiun.length} pegawai yang tercatat memasuki masa pensiun pada bulan ini, yaitu ${formatNames(namePensiun)}.`
            : " Terakhir, tidak ada pegawai yang pensiun pada bulan ini."
        }
      </p>
    `;
    if (formData.latarBelakang)
      formToSend.latarBelakang = formData.latarBelakang;
    if (formData.sasaran) formToSend.sasaran = formData.sasaran;
    if (formData.maksud) formToSend.maksud = formData.maksud;
    if (formData.tujuan) formToSend.tujuan = formData.tujuan;
    if (formData.dasarHukum) formToSend.dasarHukum = formData.dasarHukum;
    if (formData.isiLaporan) {
      formToSend.isiLaporan = `${formData.isiLaporan}${textLaporan}`;
    } else {
      formToSend.isiLaporan = `${textLaporan}`;
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
          navigate("/pegawai?tab=pelaporan");
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
      <BreadcrumbAdmin location="/Pegawai/Tambah-Pelaporan" />
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        isLoading={isLoadingConfirm}
        handleSubmit={handleConfirm}
      />

      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="flex">
          <Link
            to={`/pegawai?tab=pelaporan`}
            className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
          >
            <LuArrowLeft /> Kembali
          </Link>
        </div>
        <TitleCase
          title="Tambah Laporan Pegawai"
          text="Digunakan Untuk Menambah Laporan Pegawai"
        />

        <div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Card shadow="none" className="border p-4">
              <CardHeader className="text-sm font-semibold">
                <div className="ms-auto">
                  <Button
                    isLoading={
                      isFetching || isFetchingDataSurat || isLoadingConfirm
                    }
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
