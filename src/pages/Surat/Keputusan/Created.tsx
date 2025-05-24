import { useEffect, useMemo, useState } from "react";
import { TitleCase } from "@/components/card/TitleCase";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { LuArrowLeft, LuSave } from "react-icons/lu";
import ConfirmModal from "@/components/modals/UtilsModal/ConfirmModal";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { useNavigate } from "react-router-dom";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link } from "react-router-dom";
import { useGetAllPegawaiOption } from "@/services/pegawai";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreKeputusan } from "@/interface/request/surat.interface";
import { useGetAllJabatanOption } from "@/services/jabatan";
import { LucidePlusCircle, LucideTrash2 } from "lucide-react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor, SimpleUploadAdapter } from "ckeditor5";
import { ckPlugins, ckToolbar } from "@/constants/CkEditorPlugin";
import { useCreateKeputusan } from "@/services/surat/surat-keputusan";

interface formProps {
  membaca?: string;
  menimbang?: string;
  tempatDikeluarkan?: string;
  mengingat?: string;
  kesatu?: string;
  idYangDitetapkan?: string;
  nameYangDitetapkan?: string;
  nipYangDitetapkan?: string;
  jabatanYangDitetapkan?: string;
  golonganYangDitetapkan?: string;
  unitYangDitetapkan?: string;
  alasan?: string;
  kedua?: string;
  ketiga?: string;
  idJabatan?: string;
  nameJabatan?: string;
  nipJabatan?: string;
  ttdJabatan?: string;
  tingkat?: string;
  tanggalSurat?: string;
  nomorSurat?: string;
  tembusan: {
    id?: string;
    jabatan?: string;
  }[];
}

interface errorProps {
  lokasi?: string;
  membaca?: string;
  menimbang?: string;
  tempatDikeluarkan?: string;
  mengingat?: string;
  kesatu?: string;
  idYangDitetapkan?: string;
  nameYangDitetapkan?: string;
  nipYangDitetapkan?: string;
  jabatanYangDitetapkan?: string;
  golonganYangDitetapkan?: string;
  unitYangDitetapkan?: string;
  alasan?: string;
  kedua?: string;
  ketiga?: string;
  nameJabatan?: string;
  nipJabatan?: string;
  ttdJabatan?: string;
  tingkat?: string;
  tanggalSurat?: string;
  nomorSurat?: string;
  tembusan?: string;
}

export default function CreateSurat() {
  const [formData, setFormData] = useState<formProps>({
    membaca: "",
    menimbang: "",
    mengingat: "",
    kesatu: "",
    idYangDitetapkan: "",
    nameYangDitetapkan: "",
    nipYangDitetapkan: "",
    jabatanYangDitetapkan: "",
    golonganYangDitetapkan: "",
    unitYangDitetapkan: "",
    alasan: "",
    kedua: "",
    ketiga: "",
    idJabatan: "",
    nameJabatan: "",
    nipJabatan: "",
    ttdJabatan: "",
    tingkat: "",
    tanggalSurat: "",
    nomorSurat: "",
    tembusan: [
      {
        id: "",
        jabatan: "",
      },
    ],
  });

  const [formError, setFormError] = useState<errorProps>({});

  const addTembusan = () => {
    const updatedTim = [...(formData.tembusan || []), { id: "", jabatan: "" }];
    setFormData({ ...formData, tembusan: updatedTim });
  };
  const removeTembusan = (index: number) => {
    const updatedTim = [...(formData.tembusan || [])];
    updatedTim.splice(index, 1); // hapus item berdasarkan index
    setFormData({ ...formData, tembusan: updatedTim });
  };

  const {
    data: allDataPegawai,
    isFetching: isFetchingPegawai,
    refetch: refetchPegawai,
  } = useGetAllPegawaiOption();
  const PEGAWAI_SELECT = useMemo(() => {
    if (!allDataPegawai) return [];
    return allDataPegawai.data;
  }, [allDataPegawai]);

  const {
    data: allDataJabatan,
    isFetching: isFetchingJabatan,
    refetch: refetchJabatan,
  } = useGetAllJabatanOption();
  const JABATAN_SELECT = useMemo(() => {
    if (!allDataJabatan) return [];
    return allDataJabatan.data;
  }, [allDataJabatan]);

  const rules = () => {
    const error: errorProps = {};

    if (!formData.membaca) error.membaca = "Membaca tidak boleh kosong";
    if (!formData.menimbang) error.menimbang = "Menimbang tidak boleh kosong";
    if (!formData.mengingat) error.mengingat = "Mengingat tidak boleh kosong";
    if (!formData.kesatu) error.kesatu = "Kesatu tidak boleh kosong";
    if (!formData.idYangDitetapkan)
      error.idYangDitetapkan = "Yang ditetapkan tidak boleh kosong";
    if (!formData.alasan) error.alasan = "Alasan tidak boleh kosong";
    if (!formData.kedua) error.kedua = "Kedua tidak boleh kosong";
    if (!formData.ketiga) error.ketiga = "Ketiga tidak boleh kosong";
    if (!formData.idJabatan)
      error.nameJabatan = "Nama penandatangan tidak boleh kosong";
    if (!formData.tingkat) error.tingkat = "Tingkat tidak boleh kosong";
    if (!formData.tanggalSurat)
      error.tanggalSurat = "Tanggal surat tidak boleh kosong";
    if (!formData.nomorSurat)
      error.nomorSurat = "Nomor surat tidak boleh kosong";
    if (!formData.tembusan) error.tembusan = "Tembusan tidak boleh kosong";
    if (!formData.tempatDikeluarkan)
      error.tempatDikeluarkan = "Tempat dikeluarkan tidak boleh kosong";

    return error;
  };

  useEffect(() => {
    setFormData({
      membaca: "",
      menimbang: "",
      mengingat: "",
      kesatu: "",
      tempatDikeluarkan: "",
      idYangDitetapkan: "",
      nameYangDitetapkan: "",
      nipYangDitetapkan: "",
      jabatanYangDitetapkan: "",
      golonganYangDitetapkan: "",
      unitYangDitetapkan: "",
      alasan: "",
      kedua: "",
      ketiga: "",
      idJabatan: "",
      nameJabatan: "",
      nipJabatan: "",
      ttdJabatan: "",
      tingkat: "",
      tanggalSurat: "",
      nomorSurat: "",
      tembusan: [
        {
          id: "",
          jabatan: "",
        },
      ],
    });
    setFormError({});
    refetchPegawai();
    refetchJabatan();
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

  const { mutate: mutatePost } = useCreateKeputusan();

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

    const formToSend: StoreKeputusan = {};
    if (formData.membaca) formToSend.membaca = formData.membaca;
    if (formData.menimbang) formToSend.menimbang = formData.menimbang;
    if (formData.mengingat) formToSend.mengingat = formData.mengingat;
    if (formData.kesatu) formToSend.kesatu = formData.kesatu;
    if (formData.nameYangDitetapkan)
      formToSend.nameYangDitetapkan = formData.nameYangDitetapkan;
    if (formData.nipYangDitetapkan)
      formToSend.nipYangDitetapkan = formData.nipYangDitetapkan;
    if (formData.jabatanYangDitetapkan)
      formToSend.jabatanYangDitetapkan = formData.jabatanYangDitetapkan;
    if (formData.golonganYangDitetapkan)
      formToSend.golonganYangDitetapkan = formData.golonganYangDitetapkan;
    if (formData.unitYangDitetapkan)
      formToSend.unitYangDitetapkan = formData.unitYangDitetapkan;
    if (formData.alasan) formToSend.alasan = formData.alasan;
    if (formData.kedua) formToSend.kedua = formData.kedua;
    if (formData.ketiga) formToSend.ketiga = formData.ketiga;
    if (formData.nameJabatan) formToSend.nameJabatan = formData.nameJabatan;
    if (formData.nipJabatan) formToSend.nipJabatan = formData.nipJabatan;
    if (formData.ttdJabatan) formToSend.ttdJabatan = formData.ttdJabatan;
    if (formData.tingkat) formToSend.tingkat = formData.tingkat;
    if (formData.tanggalSurat) formToSend.tanggalSurat = formData.tanggalSurat;
    if (formData.nomorSurat) formToSend.nomorSurat = formData.nomorSurat;
    if (formData.tembusan) formToSend.tembusan = formData.tembusan;
    if (formData.tempatDikeluarkan)
      formToSend.tempatDikeluarkan = formData.tempatDikeluarkan;

    try {
      mutatePost(formToSend, {
        onSuccess: () => {
          SuccessToast({ text: "Data berhasil ditambahkan" });
          navigate("/keputusan-hukuman-disiplin");
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

  const onChangeName = (value: string, type: string) => {
    if (type === "ditetapkan") {
      const checkPegawai = PEGAWAI_SELECT.find((item) => item.id === value);
      if (checkPegawai) {
        setFormData({
          ...formData,
          idYangDitetapkan: checkPegawai.id,
          nameYangDitetapkan: checkPegawai.name,
          nipYangDitetapkan: checkPegawai.nip || "-",
          golonganYangDitetapkan: checkPegawai.rank || "-",
          unitYangDitetapkan: checkPegawai.jabatan.unit
            ? checkPegawai.jabatan.unit.nameUnit
            : "-",
          jabatanYangDitetapkan:
            checkPegawai.jabatan?.nameJob || "Jabatan tidak diketahui",
        });
      } else {
        setFormData({
          ...formData,
          idYangDitetapkan: "",
          nameYangDitetapkan: "",
          nipYangDitetapkan: "",
          golonganYangDitetapkan: "",
          unitYangDitetapkan: "",
          jabatanYangDitetapkan: "",
        });
      }
    } else if (type === "jabatan") {
      const checkPegawai = PEGAWAI_SELECT.find((item) => item.id === value);
      if (checkPegawai) {
        setFormData({
          ...formData,
          idJabatan: checkPegawai.id,
          nameJabatan:
            checkPegawai.jabatan?.nameJob || "Jabatan tidak diketahui",
          ttdJabatan: checkPegawai.name,
          nipJabatan: checkPegawai.nip || "-",
        });
      } else {
        setFormData({
          ...formData,
          idJabatan: "",
          nameJabatan: "",
          ttdJabatan: "",
          nipJabatan: "",
        });
      }
    }
  };

  return (
    <>
      <BreadcrumbAdmin location="/Keputusan-Hukuman-Disiplin/Tambah-Data" />
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        isLoading={isLoadingConfirm}
        handleSubmit={handleConfirm}
      />

      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="flex">
          <Link
            to={`/keputusan-hukuman-disiplin`}
            className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
          >
            <LuArrowLeft /> Kembali
          </Link>
        </div>
        <TitleCase
          title="Tambah Keputusan Hukuman Disiplin"
          text="Digunakan Untuk Menambah Keputusan Hukuman Disiplin Terbaru"
        />

        <div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Card shadow="none" className="border p-4">
              <CardHeader className="text-sm font-semibold">
                <div className="ms-auto">
                  <Button
                    isLoading={isLoadingConfirm}
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
                  <div className="flex flex-col gap-1.5">
                    <h1 className="text-center font-semibold text-base">
                      RAHASIA
                    </h1>
                    <h1 className="text-center font-semibold text-base">
                      KEPUTUSAN KEPALA DINAS PERDAGANGAN
                    </h1>
                    <div className="flex items-center justify-center font-semibold text-sm gap-2">
                      NOMOR:{" "}
                      <Input
                        variant="bordered"
                        aria-label="nomorSurat"
                        size="sm"
                        radius="sm"
                        className="max-w-72"
                        classNames={{
                          inputWrapper:
                            "border-[0.8px] border-button-primary rounded-md",
                          input: "text-xs",
                        }}
                        placeholder="Masukkan nomor surat disini"
                        value={formData.nomorSurat}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nomorSurat: e.target.value,
                          })
                        }
                      />
                    </div>
                    <h1 className="text-center font-semibold text-base">
                      TENTANG
                    </h1>
                    <div className="flex items-center justify-center font-semibold text-sm gap-2">
                      HUKUMAN DISIPLIN TINGKAT{" "}
                      <Select
                        variant="bordered"
                        aria-label="nomorSurat"
                        size="sm"
                        radius="sm"
                        className="max-w-60"
                        classNames={{
                          trigger:
                            "border-[0.8px] border-button-primary rounded-md",
                          value: "text-xs",
                        }}
                        placeholder="Pilih tingkatan hukuman"
                        value={formData.tingkat}
                        onChange={(e) =>
                          setFormData({ ...formData, tingkat: e.target.value })
                        }
                      >
                        <SelectItem key={"RENDAH"}>Ringan</SelectItem>
                        <SelectItem key={"SEDANG"}>Sedang</SelectItem>
                        <SelectItem key={"TINGGI"}>Berat</SelectItem>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    <div className="flex items-start font-semibold text-sm gap-2 mb-2">
                      <div className="w-28">Membaca </div>:
                      <div className="w-full">
                        <CKEditor
                          editor={ClassicEditor}
                          data={formData.membaca}
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
                              return { ...prev, membaca: editor.getData() };
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-start font-semibold text-sm gap-2 mb-2">
                      <div className="w-28">Menimbang </div>:
                      <div className="w-full">
                        <CKEditor
                          editor={ClassicEditor}
                          data={formData.menimbang}
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
                              return { ...prev, menimbang: editor.getData() };
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-start font-semibold text-sm gap-2 mb-2">
                      <div className="w-28">Mengingat </div>:
                      <div className="w-full">
                        <CKEditor
                          editor={ClassicEditor}
                          data={formData.mengingat}
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
                              return { ...prev, mengingat: editor.getData() };
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                  <h1 className="text-center font-semibold text-base mb-4">
                    MEMUTUSKAN
                  </h1>
                  <h1 className="text-left font-semibold text-base">
                    Menetapkan
                  </h1>
                  <div className="flex flex-col gap-2 mt-4">
                    <div className="flex items-start font-semibold text-sm gap-2 mb-2">
                      <div className="w-28">Kesatu </div>:
                      <div className="w-full">
                        <Textarea
                          variant="bordered"
                          aria-label="nomorSurat"
                          size="sm"
                          radius="sm"
                          classNames={{
                            inputWrapper:
                              "border-[0.8px] border-button-primary rounded-md",
                            input: "text-xs placeholder:italic",
                          }}
                          placeholder="Masukkan disini"
                          value={formData.kesatu}
                          onChange={(e) =>
                            setFormData({ ...formData, kesatu: e.target.value })
                          }
                        />
                        <div className="flex flex-col gap-2 my-2">
                          <div className="flex items-center font-semibold text-sm gap-2 mb-2">
                            <div className="w-20">Nama </div>:
                            <Autocomplete
                              isLoading={isFetchingPegawai}
                              aria-label="pegawai"
                              placeholder="Cari pegawai"
                              variant="bordered"
                              radius="sm"
                              size="sm"
                              defaultItems={PEGAWAI_SELECT}
                              selectedKey={String(formData.idYangDitetapkan)}
                              onSelectionChange={(value) =>
                                onChangeName(value as string, "ditetapkan")
                              }
                              className="max-w-72"
                              inputProps={{
                                classNames: {
                                  input: "text-xs",
                                  inputWrapper:
                                    "border-[0.8px] border-button-primary rounded-md",
                                },
                              }}
                            >
                              {(peg) => (
                                <AutocompleteItem
                                  key={peg.id}
                                  textValue={peg.name}
                                >
                                  {peg.name} -{" "}
                                  {peg.jabatan?.nameJob ||
                                    "jabatan tidak diketahui"}{" "}
                                  - {peg.nip}
                                </AutocompleteItem>
                              )}
                            </Autocomplete>
                          </div>
                          <div className="flex items-center font-semibold text-sm gap-2 mb-2">
                            <div className="w-20">NIP </div>
                            :
                            <Input
                              isReadOnly
                              variant="bordered"
                              aria-label="nomorSurat"
                              size="sm"
                              radius="sm"
                              className="max-w-72"
                              classNames={{
                                inputWrapper:
                                  "border-[0.8px] border-button-primary rounded-md",
                                input: "text-xs placeholder:italic",
                              }}
                              placeholder="Autofill NIP"
                              value={formData.nipYangDitetapkan}
                            />
                          </div>
                          <div className="flex items-center font-semibold text-sm gap-2 mb-2">
                            <div className="w-20">Jabatan </div>
                            :
                            <Input
                              isReadOnly
                              variant="bordered"
                              aria-label="nomorSurat"
                              size="sm"
                              radius="sm"
                              className="max-w-72"
                              classNames={{
                                inputWrapper:
                                  "border-[0.8px] border-button-primary rounded-md",
                                input: "text-xs placeholder:italic",
                              }}
                              placeholder="Autofill Jabatan"
                              value={formData.jabatanYangDitetapkan}
                            />
                          </div>
                          <div className="flex items-center font-semibold text-sm gap-2 mb-2">
                            <div className="w-20">Golongan </div>
                            :
                            <Input
                              isReadOnly
                              variant="bordered"
                              aria-label="nomorSurat"
                              size="sm"
                              radius="sm"
                              className="max-w-72"
                              classNames={{
                                inputWrapper:
                                  "border-[0.8px] border-button-primary rounded-md",
                                input: "text-xs placeholder:italic",
                              }}
                              placeholder="Autofill Golongan"
                              value={formData.golonganYangDitetapkan}
                            />
                          </div>
                          <div className="flex items-center font-semibold text-sm gap-2 mb-2">
                            <div className="w-20">Unit Kerja </div>
                            :
                            <Input
                              isReadOnly
                              variant="bordered"
                              aria-label="nomorSurat"
                              size="sm"
                              radius="sm"
                              className="max-w-72"
                              classNames={{
                                inputWrapper:
                                  "border-[0.8px] border-button-primary rounded-md",
                                input: "text-xs placeholder:italic",
                              }}
                              placeholder="Autofill Jabatan"
                              value={formData.unitYangDitetapkan}
                            />
                          </div>
                        </div>
                        <Textarea
                          variant="bordered"
                          aria-label="nomorSurat"
                          size="sm"
                          radius="sm"
                          classNames={{
                            inputWrapper:
                              "border-[0.8px] border-button-primary rounded-md",
                            input: "text-xs placeholder:italic",
                          }}
                          placeholder="Masukkan alasan disini"
                          value={formData.alasan}
                          onChange={(e) =>
                            setFormData({ ...formData, alasan: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-start font-semibold text-sm gap-2 mb-2">
                      <div className="w-28">Kedua </div>:
                      <div className="w-full">
                        <Textarea
                          variant="bordered"
                          aria-label="nomorSurat"
                          size="sm"
                          radius="sm"
                          classNames={{
                            inputWrapper:
                              "border-[0.8px] border-button-primary rounded-md",
                            input: "text-xs placeholder:italic",
                          }}
                          placeholder="Masukkan disini"
                          value={formData.kedua}
                          onChange={(e) =>
                            setFormData({ ...formData, kedua: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-start font-semibold text-sm gap-2 mb-2">
                      <div className="w-28">Ketiga </div>:
                      <div className="w-full">
                        <Textarea
                          variant="bordered"
                          aria-label="nomorSurat"
                          size="sm"
                          radius="sm"
                          classNames={{
                            inputWrapper:
                              "border-[0.8px] border-button-primary rounded-md",
                            input: "text-xs placeholder:italic",
                          }}
                          placeholder="Masukkan disini"
                          value={formData.ketiga}
                          onChange={(e) =>
                            setFormData({ ...formData, ketiga: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="flex items-center justify-end font-semibold text-sm gap-2 mb-2">
                    Dikeluarkan di:{" "}
                    <Input
                      variant="bordered"
                      aria-label="nomorSurat"
                      size="sm"
                      radius="sm"
                      className="max-w-72"
                      classNames={{
                        inputWrapper:
                          "border-[0.8px] border-button-primary rounded-md",
                        input: "text-xs",
                      }}
                      placeholder="Masukkan lokasi disini"
                      value={formData.tempatDikeluarkan}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tempatDikeluarkan: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-end font-semibold text-sm gap-2 mb-2">
                    Pada Tanggal:{" "}
                    <Input
                      type="date"
                      variant="bordered"
                      aria-label="nomorSurat"
                      size="sm"
                      radius="sm"
                      className="max-w-72"
                      classNames={{
                        inputWrapper:
                          "border-[0.8px] border-button-primary rounded-md",
                        input: "text-xs",
                      }}
                      placeholder="Masukkan lokasi disini"
                      value={formData.tanggalSurat}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tanggalSurat: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="ms-auto">
                    <div className="flex items-center justify-center font-semibold text-sm gap-2 mb-2">
                      {formData.nameJabatan || "Autofill jabatan"}
                    </div>
                    <br />
                    <br />
                    <div className="flex items-center justify-center font-semibold text-sm gap-2 mb-2">
                      <Autocomplete
                        isLoading={isFetchingPegawai}
                        aria-label="pegawai"
                        placeholder="Cari pegawai"
                        variant="bordered"
                        radius="sm"
                        size="sm"
                        defaultItems={PEGAWAI_SELECT}
                        selectedKey={String(formData.idJabatan)}
                        onSelectionChange={(value) =>
                          onChangeName(value as string, "jabatan")
                        }
                        className="max-w-72"
                        inputProps={{
                          classNames: {
                            input: "text-xs",
                            inputWrapper:
                              "border-[0.8px] border-button-primary rounded-md",
                          },
                        }}
                      >
                        {(peg) => (
                          <AutocompleteItem key={peg.id} textValue={peg.name}>
                            {peg.name} -{" "}
                            {peg.jabatan?.nameJob || "jabatan tidak diketahui"}{" "}
                            - {peg.nip}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    </div>
                    <div className="flex items-center justify-center font-normal text-sm gap-2 mb-2">
                      NIP.{formData.nipJabatan || "Autofill NIP"}
                    </div>
                  </div>
                  <div className="me-auto w-full">
                    <div className="flex items-center justify-start font-semibold text-sm gap-2 mb-2">
                      Tembusan Yth:
                    </div>
                    <div className="w-full">
                      <div className="flex flex-col gap-2 w-full">
                        {formData.tembusan.map((item, index) => (
                          <div
                            key={index}
                            className="w-full flex items-center gap-2"
                          >
                            <Autocomplete
                              isLoading={isFetchingJabatan}
                              aria-label="pegawai"
                              placeholder="Cari jabatan"
                              variant="bordered"
                              radius="sm"
                              size="sm"
                              defaultItems={JABATAN_SELECT}
                              selectedKey={String(item.id)}
                              onSelectionChange={(value) => {
                                const checkJabatan = JABATAN_SELECT.find(
                                  (item) => item.id === Number(value),
                                );

                                setFormData((prev) => {
                                  const updated = [...prev.tembusan];
                                  updated[index] = {
                                    ...updated[index],
                                    id: String(checkJabatan?.id || ""),
                                    jabatan: checkJabatan?.nameJob,
                                  };
                                  return { ...prev, tembusan: updated };
                                });
                              }}
                              className="w-full"
                              inputProps={{
                                classNames: {
                                  input: "text-xs",
                                  inputWrapper:
                                    "border-[0.8px] border-button-primary rounded-md",
                                },
                              }}
                            >
                              {(peg) => (
                                <AutocompleteItem
                                  key={String(peg.id)}
                                  textValue={peg.nameJob}
                                >
                                  {peg.nameJob}
                                </AutocompleteItem>
                              )}
                            </Autocomplete>
                            <Button
                              onPress={() => removeTembusan(index)}
                              isIconOnly
                              variant="bordered"
                              color="danger"
                              radius="sm"
                              size="sm"
                            >
                              <LucideTrash2 size={16} />
                            </Button>
                          </div>
                        ))}
                        <div>
                          <Button
                            onPress={addTembusan}
                            size="sm"
                            radius="full"
                            className="bg-button-primary text-white font-semibold flex items-center justify-start"
                          >
                            <LucidePlusCircle size={16} /> Tambah
                          </Button>
                        </div>
                      </div>
                    </div>
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
