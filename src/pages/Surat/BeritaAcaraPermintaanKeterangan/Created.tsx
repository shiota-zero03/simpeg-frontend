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
import { StoreBeritaAcaraPermintaan } from "@/interface/request/surat.interface";
import { useCreateBeritaAcaraPermintaan } from "@/services/surat/berita-acara-permintaan";
import { LucidePlusCircle, LucideTrash2 } from "lucide-react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor, SimpleUploadAdapter } from "ckeditor5";
import { ckPlugins, ckToolbar } from "@/constants/CkEditorPlugin";

interface formProps {
  nomorSurat?: string;
  tanggalSurat?: string;
  nomorSuratKeterangan?: string;
  waktu?: string;
  tempat?: string;
  keterangan?: string;
  timPemeriksa?: {
    id?: string;
    name?: string;
  }[];
  pihakDiminta?: {
    id?: string;
    name?: string;
    nip?: string;
    jabatan?: string;
    pangkat?: string;
    golongan?: string;
  }[];
  pertanyaan?: {
    tanya?: string;
    jawaban?: string;
  }[];
}

interface errorProps {
  nomorSurat?: string;
  tanggalSurat?: string;
  nomorSuratKeterangan?: string;
  waktu?: string;
  tempat?: string;
  keterangan?: string;
  timPemeriksa?: string;
  pihakDiminta?: string;
  pertanyaan?: string;
}

export default function CreateSurat() {
  const [formData, setFormData] = useState<formProps>({
    nomorSurat: "",
    tanggalSurat: "",
    nomorSuratKeterangan: "",
    waktu: "",
    tempat: "",
    keterangan: "",
    timPemeriksa: [{ id: "", name: "" }],
    pihakDiminta: [
      { id: "", name: "", nip: "", jabatan: "", pangkat: "", golongan: "" },
    ],
    pertanyaan: [{ tanya: "", jawaban: "" }],
  });

  const addtimPemeriksa = () => {
    const updatedTim = [...(formData.timPemeriksa || []), { name: "" }];
    setFormData({ ...formData, timPemeriksa: updatedTim });
  };
  const removetimPemeriksa = (index: number) => {
    const updatedTim = [...(formData.timPemeriksa || [])];
    updatedTim.splice(index, 1); // hapus item berdasarkan index
    setFormData({ ...formData, timPemeriksa: updatedTim });
  };

  const addpihakDiminta = () => {
    const updatedTim = [
      ...(formData.pihakDiminta || []),
      { id: "", name: "", nip: "", jabatan: "", pangkat: "", golongan: "" },
    ];
    setFormData({ ...formData, pihakDiminta: updatedTim });
  };
  const removepihakDiminta = (index: number) => {
    const updatedTim = [...(formData.pihakDiminta || [])];
    updatedTim.splice(index, 1); // hapus item berdasarkan index
    setFormData({ ...formData, pihakDiminta: updatedTim });
  };

  const addpertanyaan = () => {
    const updatedTim = [
      ...(formData.pertanyaan || []),
      { tanya: "", jawaban: "" },
    ];
    setFormData({ ...formData, pertanyaan: updatedTim });
  };
  const removepertanyaan = (index: number) => {
    const updatedTim = [...(formData.pertanyaan || [])];
    updatedTim.splice(index, 1); // hapus item berdasarkan index
    setFormData({ ...formData, pertanyaan: updatedTim });
  };

  const [formError, setFormError] = useState<errorProps>({});

  const {
    data: allDataPegawai,
    isFetching: isFetchingPegawai,
    refetch: refetchPegawai,
  } = useGetAllPegawaiOption();
  const PEGAWAI_SELECT = useMemo(() => {
    if (!allDataPegawai) return [];
    return allDataPegawai.data;
  }, [allDataPegawai]);

  const rules = () => {
    const error: errorProps = {};
    if (!formData.nomorSurat)
      error.nomorSurat = "Nomor surat tidak boleh kosong";
    if (!formData.nomorSuratKeterangan)
      error.nomorSurat = "Nomor surat keterangan tidak boleh kosong";
    if (!formData.tanggalSurat)
      error.tanggalSurat = "Tanggal tidak boleh kosong";
    if (!formData.waktu) error.waktu = "Waktu tidak boleh kosong";
    if (!formData.keterangan)
      error.keterangan = "Keterangan tidak boleh kosong";
    if (!formData.timPemeriksa || formData.timPemeriksa.length === 0)
      error.timPemeriksa = "Tim pemeriksa harus lebih dari satu orang";
    if (!formData.pihakDiminta || formData.pihakDiminta.length === 0)
      error.pihakDiminta =
        "Pihak yang dimintai keterangan harus lebih dari satu orang";
    if (!formData.pertanyaan || formData.pertanyaan.length === 0)
      error.pertanyaan = "pertanyaan harus lebih dari satu orang";

    return error;
  };

  useEffect(() => {
    setFormData({
      nomorSurat: "",
      nomorSuratKeterangan: "",
      tanggalSurat: "",
      waktu: "",
      tempat: "",
      keterangan: "",
      timPemeriksa: [{ id: "", name: "" }],
      pihakDiminta: [
        { id: "", name: "", nip: "", jabatan: "", pangkat: "", golongan: "" },
      ],
      pertanyaan: [{ tanya: "", jawaban: "" }],
    });
    setFormError({});
    refetchPegawai();
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

  const { mutate: mutatePost } = useCreateBeritaAcaraPermintaan();

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

    const formToSend: StoreBeritaAcaraPermintaan = {};

    if (formData.nomorSurat) formToSend.nomorSurat = formData.nomorSurat;
    if (formData.nomorSuratKeterangan)
      formToSend.nomorSuratKeterangan = formData.nomorSuratKeterangan;

    if (formData.tanggalSurat) {
      const tanggal = new Date(formData.tanggalSurat);
      const tahun = tanggal.getFullYear();
      const bulan = String(tanggal.getMonth() + 1).padStart(2, "0");
      const hari = String(tanggal.getDate()).padStart(2, "0");

      formToSend.tanggalSurat = `${tahun}-${bulan}-${hari}T00:00:00`;
    }

    if (formData.waktu) {
      const today = new Date();
      const tahun = today.getFullYear();
      const bulan = String(today.getMonth() + 1).padStart(2, "0");
      const tanggal = String(today.getDate()).padStart(2, "0");

      const [jam, menit] = formData.waktu.split(":");

      formToSend.waktu = `${tahun}-${bulan}-${tanggal}T${jam}:${menit}:00`;
    }

    formToSend.tempat = "Bekasi";
    if (formData.keterangan) formToSend.keterangan = formData.keterangan;
    if (formData.timPemeriksa) formToSend.timPemeriksa = formData.timPemeriksa;
    if (formData.pihakDiminta) formToSend.pihakDiminta = formData.pihakDiminta;
    if (formData.pertanyaan) formToSend.pertanyaan = formData.pertanyaan;

    try {
      mutatePost(formToSend, {
        onSuccess: () => {
          SuccessToast({ text: "Data berhasil ditambahkan" });
          navigate("/berita-acara-permintaan-keterangan");
        },
        onError: (error: AxiosError<BaseErrorRes>) => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          ErrorToast({
            text:
              (error.response?.data.error as string) ||
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

  const onChangePemeriksa = (value: string, index: number) => {
    const checkPegawai = PEGAWAI_SELECT.find((item) => item.id === value);
    const updatedTim = [...(formData.timPemeriksa || [])];
    updatedTim[index].id = value;
    updatedTim[index].name = checkPegawai?.name;
    setFormData({ ...formData, timPemeriksa: updatedTim });
  };

  const onChangeDiminta = (value: string, index: number) => {
    const checkPegawai = PEGAWAI_SELECT.find((item) => item.id === value);
    const updatedTim = [...(formData.pihakDiminta || [])];
    updatedTim[index].id = value;
    updatedTim[index].name = checkPegawai?.name;
    updatedTim[index].jabatan = checkPegawai?.jabatan
      ? checkPegawai?.jabatan.nameJob
      : "Jabatan tidak diketahui";
    updatedTim[index].golongan = checkPegawai?.group || "-";
    updatedTim[index].pangkat = checkPegawai?.rank || "-";
    updatedTim[index].nip = checkPegawai?.nip || "-";
    setFormData({ ...formData, pihakDiminta: updatedTim });
  };

  const updateArrayItem = <T,>(
    arr: T[],
    index: number,
    newItem: Partial<T>,
  ): T[] => {
    return arr.map((item, i) => (i === index ? { ...item, ...newItem } : item));
  };
  const onChangepertanyaan = (
    type: "tanya" | "jawaban",
    value: string,
    index: number,
  ) => {
    const updated = updateArrayItem(formData.pertanyaan || [], index, {
      [type]: value,
    });
    setFormData({ ...formData, pertanyaan: updated });
  };

  return (
    <>
      <BreadcrumbAdmin location="/Berita-Acara-Permintaan-Keterangan/Tambah-Data" />
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        isLoading={isLoadingConfirm}
        handleSubmit={handleConfirm}
      />

      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="flex">
          <Link
            to={`/berita-acara-permintaan-keterangan`}
            className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
          >
            <LuArrowLeft /> Kembali
          </Link>
        </div>
        <TitleCase
          title="Tambah Berita Acara Permintaan Keterangan"
          text="Digunakan Untuk Menambah Berita Acara Permintaan Keterangan Terbaru"
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
                  <h1 className="text-center underline font-semibold text-base">
                    BERITA ACARA PERMINTAAN KETERANGAN
                  </h1>
                  <div className="flex items-center justify-center font-semibold text-sm gap-2 mb-2">
                    Nomor:{" "}
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
                        setFormData({ ...formData, nomorSurat: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex items-center gap-1 flex-wrap mt-2 whitespace-nowrap">
                    <span>Pada</span>
                    <span>hari</span>
                    <span>ini,</span>
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
                      placeholder="Masukkan tanggal"
                      value={formData.tanggalSurat}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tanggalSurat: e.target.value,
                        })
                      }
                    />
                    <span>bertempat</span>
                    <span>di</span>
                    <span>Kantor</span>
                    <span>Dinas</span>
                    <span>Perdagangan</span>
                    <span>Kabupaten</span>
                    <span>Bekasi</span>
                    <span>Pukul</span>
                    <Input
                      type="time"
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
                      placeholder="Masukkan waktu"
                      value={formData.waktu}
                      onChange={(e) =>
                        setFormData({ ...formData, waktu: e.target.value })
                      }
                    />
                    <span>kami</span>
                    <span>Tim</span>
                    <span>Pemeriksa</span>
                    <span>Internal</span>
                    <span>Pengawasan</span>
                    <span>pada</span>
                    <span>Dinas</span>
                    <span>Perdagangan</span>
                    <span>Kabupaten</span>
                    <span>Bekasi,</span>
                    <span>sebagai</span>
                    <span>berikut</span>
                  </div>
                  <div className="md:ms-8 ms-2 flex flex-col gap-2">
                    {formData.timPemeriksa &&
                      formData.timPemeriksa.map((item, index) => (
                        <div className="flex items-center gap-2" key={index}>
                          <div className="w-6">{index + 1}. </div>
                          <Autocomplete
                            isLoading={isFetchingPegawai}
                            aria-label="pegawai"
                            placeholder="Cari pegawai"
                            variant="bordered"
                            radius="sm"
                            size="sm"
                            defaultItems={PEGAWAI_SELECT}
                            selectedKey={String(item.id)}
                            onSelectionChange={(value) =>
                              onChangePemeriksa(value as string, index)
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
                          {formData.timPemeriksa &&
                            formData.timPemeriksa.length > 1 && (
                              <Button
                                isIconOnly
                                variant="bordered"
                                color="danger"
                                radius="sm"
                                size="sm"
                                onPress={() => removetimPemeriksa(index)}
                              >
                                <LucideTrash2 size={16} />
                              </Button>
                            )}
                        </div>
                      ))}
                    <div>
                      <Button
                        onPress={addtimPemeriksa}
                        size="sm"
                        radius="full"
                        className="bg-button-primary text-white font-semibold flex items-center justify-start"
                      >
                        <LucidePlusCircle size={16} /> Tambah
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap mt-2 whitespace-nowrap">
                    <span>Sesuai</span>
                    <span>dengan</span>
                    <span>undangan</span>
                    <span>Permintaan</span>
                    <span>Keterangan</span>
                    <span>Nomor : </span>
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
                      placeholder="Masukkan nomor surat keterangan"
                      value={formData.nomorSuratKeterangan}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nomorSuratKeterangan: e.target.value,
                        })
                      }
                    />
                    <span>tersebut,</span>
                    <span>kami</span>
                    <span>telah</span>
                    <span>melakukan</span>
                    <span>permintaan</span>
                    <span>keterangan-keterangan</span>
                    <span>terhadap:</span>
                  </div>
                  <div className="md:ms-4 flex flex-col gap-2">
                    {formData.pihakDiminta &&
                      formData.pihakDiminta.map((item, index) => (
                        <div className="overflow-x-auto" key={index}>
                          <table>
                            <tbody>
                              <tr>
                                <td className="w-8 text-center">{index + 1}</td>
                                <td className="min-w-40">Nama</td>
                                <td className="flex items-center gap-2">
                                  :
                                  <Autocomplete
                                    isLoading={isFetchingPegawai}
                                    aria-label="pegawai"
                                    placeholder="Cari pegawai"
                                    variant="bordered"
                                    radius="sm"
                                    size="sm"
                                    defaultItems={PEGAWAI_SELECT}
                                    selectedKey={String(item.id)}
                                    onSelectionChange={(value) =>
                                      onChangeDiminta(value as string, index)
                                    }
                                    className="w-72"
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
                                </td>
                                <td>
                                  {formData.pihakDiminta &&
                                    formData.pihakDiminta.length > 1 && (
                                      <Button
                                        isIconOnly
                                        variant="bordered"
                                        color="danger"
                                        radius="sm"
                                        size="sm"
                                        onPress={() =>
                                          removepihakDiminta(index)
                                        }
                                      >
                                        <LucideTrash2 size={16} />
                                      </Button>
                                    )}
                                </td>
                              </tr>
                              <tr>
                                <td className="w-8 text-center"></td>
                                <td className="min-w-40">NIP</td>
                                <td className="flex items-center gap-2">
                                  :
                                  <Input
                                    variant="bordered"
                                    aria-label="nomorSurat"
                                    size="sm"
                                    radius="sm"
                                    className="w-72"
                                    classNames={{
                                      inputWrapper:
                                        "border-[0.8px] border-button-primary rounded-md",
                                      input: "text-xs",
                                    }}
                                    placeholder="Autofill NIP"
                                    value={item.nip}
                                    isReadOnly
                                    isDisabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="w-8 text-center"></td>
                                <td className="min-w-40">Jabatan</td>
                                <td className="flex items-center gap-2">
                                  :
                                  <Input
                                    variant="bordered"
                                    aria-label="nomorSurat"
                                    size="sm"
                                    radius="sm"
                                    className="w-72"
                                    classNames={{
                                      inputWrapper:
                                        "border-[0.8px] border-button-primary rounded-md",
                                      input: "text-xs",
                                    }}
                                    placeholder="Autofill Jabatan"
                                    value={item.jabatan}
                                    isReadOnly
                                    isDisabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="w-8 text-center"></td>
                                <td className="min-w-40">Pangkat</td>
                                <td className="flex items-center gap-2">
                                  :
                                  <Input
                                    variant="bordered"
                                    aria-label="nomorSurat"
                                    size="sm"
                                    radius="sm"
                                    className="w-72"
                                    classNames={{
                                      inputWrapper:
                                        "border-[0.8px] border-button-primary rounded-md",
                                      input: "text-xs",
                                    }}
                                    placeholder="Autofill Pangkat"
                                    value={item.pangkat}
                                    isReadOnly
                                    isDisabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="w-8 text-center"></td>
                                <td className="min-w-40">Golongan</td>
                                <td className="flex items-center gap-2">
                                  :
                                  <Input
                                    variant="bordered"
                                    aria-label="nomorSurat"
                                    size="sm"
                                    radius="sm"
                                    className="w-72"
                                    classNames={{
                                      inputWrapper:
                                        "border-[0.8px] border-button-primary rounded-md",
                                      input: "text-xs",
                                    }}
                                    placeholder="Autofill Golongan"
                                    value={item.golongan}
                                    isReadOnly
                                    isDisabled
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      ))}
                    <div>
                      <Button
                        onPress={addpihakDiminta}
                        size="sm"
                        radius="full"
                        className="bg-button-primary text-white font-semibold flex items-center justify-start"
                      >
                        <LucidePlusCircle size={16} /> Tambah
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span>
                      Atas pertanyaan-pertanyaan tim pemeriksa sebagai berikut
                    </span>
                    <div className="md:ms-8 ms-2 flex flex-col gap-2 mt-2">
                      {formData.pertanyaan &&
                        formData.pertanyaan.map((item, index) => (
                          <div className="flex flex-col gap-2" key={index}>
                            <div className="flex items-center gap-2">
                              <div className="w-6">{index + 1}. </div>
                              <Input
                                variant="bordered"
                                aria-label="nomorSurat"
                                size="sm"
                                radius="sm"
                                className="w-full"
                                classNames={{
                                  inputWrapper:
                                    "border-[0.8px] border-button-primary rounded-md",
                                  input: "text-xs",
                                }}
                                placeholder="Masukkan pertanyaan disini"
                                value={item.tanya}
                                onChange={(e) =>
                                  onChangepertanyaan(
                                    "tanya",
                                    e.target.value,
                                    index,
                                  )
                                }
                              />
                              {formData.pertanyaan &&
                                formData.pertanyaan.length > 1 && (
                                  <Button
                                    isIconOnly
                                    variant="bordered"
                                    color="danger"
                                    radius="sm"
                                    size="sm"
                                    onPress={() => removepertanyaan(index)}
                                  >
                                    <LucideTrash2 size={16} />
                                  </Button>
                                )}
                            </div>
                            <div
                              className="flex items-center gap-2"
                              key={index}
                            >
                              <div className="me-4">Jawaban </div>
                              <Input
                                variant="bordered"
                                aria-label="nomorSurat"
                                size="sm"
                                radius="sm"
                                className="w-full"
                                classNames={{
                                  inputWrapper:
                                    "border-[0.8px] border-button-primary rounded-md",
                                  input: "text-xs",
                                }}
                                placeholder="Masukkan jawaban pertanyaan"
                                value={item.jawaban}
                                onChange={(e) =>
                                  onChangepertanyaan(
                                    "jawaban",
                                    e.target.value,
                                    index,
                                  )
                                }
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                    <div>
                      <Button
                        onPress={addpertanyaan}
                        size="sm"
                        radius="full"
                        className="bg-button-primary text-white font-semibold flex items-center justify-start"
                      >
                        <LucidePlusCircle size={16} /> Tambah
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span>Catatan Hasil Permintaan Keterangan</span>
                    <div className="mt-2">
                      <CKEditor
                        editor={ClassicEditor}
                        data={formData.keterangan}
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
                            return { ...prev, keterangan: editor.getData() };
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <span>
                      Demikian Berita Acara Permintaan Keterangan ini dibuat dan
                      dibacakan ulang kepada Saudara, Kemudian ditutup dan
                      ditandatangani.
                    </span>
                    <div className="mt-2 grid sm:grid-cols-2 grid-cols-1 gap-2">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th colSpan={3}>Yang Meminta Keterangan</th>
                            </tr>
                            <tr>
                              <th>No</th>
                              <th>Nama</th>
                              <th>Tanda Tangan</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.timPemeriksa &&
                              formData.timPemeriksa.map((item, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{item.name}</td>
                                  <td>________________</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th colSpan={3}>Yang Dimintai Keterangan</th>
                            </tr>
                            <tr>
                              <th>No</th>
                              <th>Nama</th>
                              <th>Tanda Tangan</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.pihakDiminta &&
                              formData.pihakDiminta.map((item, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{item.name}</td>
                                  <td>________________</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
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
