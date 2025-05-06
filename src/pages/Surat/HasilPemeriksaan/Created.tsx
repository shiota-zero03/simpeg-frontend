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
import { StoreHasilPemeriksaan } from "@/interface/request/surat.interface";
import { useCreateHasilPemeriksaan } from "@/services/surat/hasil-pemeriksaan";
import { useGetAllJabatanOption } from "@/services/jabatan";
import { TbFaceIdError } from "react-icons/tb";
import { LucidePlusCircle, LucideTrash2 } from "lucide-react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor, SimpleUploadAdapter } from "ckeditor5";
import { ckPlugins, ckToolbar } from "@/constants/CkEditorPlugin";
import { textToFormat } from "@/utils/dateFormater";

interface formProps {
  lokasi?: string;
  yangMelaporkan?: string;
  nipMelaporkan?: string;
  jabatanMelaporkan?: string;
  pangkatMelaporakn?: string;
  nameKepada?: string;
  namePermintaan?: string;
  nipPermintaan?: string;
  jabatanPermintaan?: string;
  golonganPermintaan?: string;
  unitPermintaan?: string;
  tanggalSurat?: string;
  keterangan?: string;
  hasil: {
    bentukPelanggaran?: string;
    waktu?: string;
    tempat?: string;
    faktorPemberat?: string;
    faktorMeringankan?: string;
    dampak?: string;
  }[];
  tembusan: {
    id?: string;
    jabatan?: string;
  }[];
  idYangMelaporkan?: string;
  idPermintaan?: string;
  idKepada?: string;
}

interface errorProps {
  lokasi?: string;

  yangMelaporkan?: string;
  nipMelaporkan?: string;
  jabatanMelaporkan?: string;
  pangkatMelaporakn?: string;

  nameKepada?: string;

  namePermintaan?: string;
  nipPermintaan?: string;
  jabatanPermintaan?: string;
  golonganPermintaan?: string;
  unitPermintaan?: string;

  tanggalSurat?: string;
  keterangan?: string;
  hasil?: string;
  tembusan?: string;
}

export default function CreateSurat() {
  const [formData, setFormData] = useState<formProps>({
    lokasi: "",
    yangMelaporkan: "",
    nipMelaporkan: "",
    jabatanMelaporkan: "",
    pangkatMelaporakn: "",
    nameKepada: "",
    namePermintaan: "",
    nipPermintaan: "",
    jabatanPermintaan: "",
    golonganPermintaan: "",
    unitPermintaan: "",
    tanggalSurat: "",
    keterangan: "",
    hasil: [
      {
        bentukPelanggaran: "",
        waktu: "",
        tempat: "",
        faktorPemberat: "",
        faktorMeringankan: "",
        dampak: "",
      },
    ],
    tembusan: [
      {
        id: "",
        jabatan: "",
      },
    ],
    idYangMelaporkan: "",
    idPermintaan: "",
    idKepada: "",
  });

  const [formError, setFormError] = useState<errorProps>({});

  const addHasil = () => {
    const updatedTim = [
      ...(formData.hasil || []),
      {
        bentukPelanggaran: "",
        waktu: "",
        tempat: "",
        faktorPemberat: "",
        faktorMeringankan: "",
        dampak: "",
      },
    ];
    setFormData({ ...formData, hasil: updatedTim });
  };
  const removeHasil = (index: number) => {
    const updatedTim = [...(formData.hasil || [])];
    updatedTim.splice(index, 1); // hapus item berdasarkan index
    setFormData({ ...formData, hasil: updatedTim });
  };
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

    if (!formData.lokasi) error.lokasi = "Lokasi tidak boleh kosong";
    if (!formData.idYangMelaporkan)
      error.yangMelaporkan = "Yang melaporkan tidak boleh kosong";
    if (!formData.idKepada) error.nameKepada = "Kepada tidak boleh kosong";
    if (!formData.idPermintaan)
      error.nameKepada = "Permintaan tidak boleh kosong";
    if (!formData.tanggalSurat)
      error.tanggalSurat = "Tanggal surat tidak boleh kosong";
    if (!formData.keterangan)
      error.keterangan = "Keterangan tidak boleh kosong";

    return error;
  };

  useEffect(() => {
    setFormData({
      lokasi: "",
      yangMelaporkan: "",
      nipMelaporkan: "",
      jabatanMelaporkan: "",
      pangkatMelaporakn: "",
      nameKepada: "",
      namePermintaan: "",
      nipPermintaan: "",
      jabatanPermintaan: "",
      golonganPermintaan: "",
      unitPermintaan: "",
      tanggalSurat: "",
      keterangan: "",
      idYangMelaporkan: "",
      idPermintaan: "",
      idKepada: "",
      hasil: [
        {
          bentukPelanggaran: "",
          waktu: "",
          tempat: "",
          faktorPemberat: "",
          faktorMeringankan: "",
          dampak: "",
        },
      ],
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

  const { mutate: mutatePost } = useCreateHasilPemeriksaan();

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

    const formToSend: StoreHasilPemeriksaan = {};

    if (formData.lokasi) formToSend.lokasi = formData.lokasi;
    if (formData.yangMelaporkan)
      formToSend.yangMelaporkan = formData.yangMelaporkan;
    if (formData.nipMelaporkan)
      formToSend.nipMelaporkan = formData.nipMelaporkan;
    if (formData.jabatanMelaporkan)
      formToSend.jabatanMelaporkan = formData.jabatanMelaporkan;
    if (formData.pangkatMelaporakn)
      formToSend.pangkatMelaporakn = formData.pangkatMelaporakn;
    if (formData.nameKepada) formToSend.nameKepada = formData.nameKepada;
    if (formData.namePermintaan)
      formToSend.namePermintaan = formData.namePermintaan;
    if (formData.nipPermintaan)
      formToSend.nipPermintaan = formData.nipPermintaan;
    if (formData.jabatanPermintaan)
      formToSend.jabatanPermintaan = formData.jabatanPermintaan;
    if (formData.golonganPermintaan)
      formToSend.golonganPermintaan = formData.golonganPermintaan;
    if (formData.unitPermintaan)
      formToSend.unitPermintaan = formData.unitPermintaan;
    if (formData.tanggalSurat) formToSend.tanggalSurat = formData.tanggalSurat;
    if (formData.keterangan) formToSend.keterangan = formData.keterangan;
    if (formData.hasil) formToSend.hasil = formData.hasil;
    if (formData.tembusan) formToSend.tembusan = formData.tembusan;

    try {
      mutatePost(formToSend, {
        onSuccess: () => {
          SuccessToast({ text: "Data berhasil ditambahkan" });
          navigate("/laporan-hasil-pemeriksaan");
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
    if (type === "permintaan") {
      const checkPegawai = PEGAWAI_SELECT.find((item) => item.id === value);
      if (checkPegawai) {
        setFormData({
          ...formData,
          idPermintaan: checkPegawai.id,
          namePermintaan: checkPegawai.name,
          nipPermintaan: checkPegawai.nip || "-",
          golonganPermintaan: checkPegawai.group || "-",
          unitPermintaan: checkPegawai.jabatan.unit
            ? checkPegawai.jabatan.unit.nameUnit
            : "-",
          jabatanPermintaan:
            checkPegawai.jabatan?.nameJob || "Jabatan tidak diketahui",
        });
      } else {
        setFormData({
          ...formData,
          idPermintaan: "",
          namePermintaan: "",
          nipPermintaan: "",
          golonganPermintaan: "",
          unitPermintaan: "",
          jabatanPermintaan: "",
        });
      }
    } else if (type === "ttd") {
      const checkPegawai = PEGAWAI_SELECT.find((item) => item.id === value);
      if (checkPegawai) {
        setFormData({
          ...formData,
          idYangMelaporkan: checkPegawai.id,
          yangMelaporkan: checkPegawai.name,
          nipMelaporkan: checkPegawai.nip || "-",
          jabatanMelaporkan: checkPegawai.group || "-",
          pangkatMelaporakn: checkPegawai.rank || "-",
          unitPermintaan: checkPegawai.jabatan.unit
            ? checkPegawai.jabatan.unit.nameUnit
            : "-",
        });
      } else {
        setFormData({
          ...formData,
          idYangMelaporkan: "",
          yangMelaporkan: "",
          nipMelaporkan: "",
          jabatanMelaporkan: "",
          pangkatMelaporakn: "",
          unitPermintaan: "",
        });
      }
    }
  };

  const handleChangeHasil = (
    index: number,
    field: keyof (typeof formData.hasil)[0],
    value: string,
  ) => {
    setFormData((prev) => {
      const updated = [...prev.hasil];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return { ...prev, hasil: updated };
    });
  };

  return (
    <>
      <BreadcrumbAdmin location="/Laporan-Hasil-Pemeriksaan/Tambah-Data" />
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        isLoading={isLoadingConfirm}
        handleSubmit={handleConfirm}
      />

      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="flex">
          <Link
            to={`/laporan-hasil-pemeriksaan`}
            className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
          >
            <LuArrowLeft /> Kembali
          </Link>
        </div>
        <TitleCase
          title="Tambah Laporan Hasil Pemeriksaan"
          text="Digunakan Untuk Menambah Laporan Hasil Pemeriksaan Terbaru"
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
                  <div className="ms-auto flex items-center justify-end gap-2">
                    <div>
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
                        value={formData.lokasi}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            lokasi: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
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
                        placeholder="Masukkan nomor pemanggilan disini"
                        value={formData.tanggalSurat}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            tanggalSurat: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-12 grid-cols-4">
                    <div>Yth.</div>
                    <div className="flex flex-col gap-2 md:col-span-7 col-span-3">
                      <div>Kepada :</div>
                      <div>
                        <Autocomplete
                          isLoading={isFetchingJabatan}
                          aria-label="pegawai"
                          placeholder="Cari jabatan"
                          variant="bordered"
                          radius="sm"
                          size="sm"
                          defaultItems={JABATAN_SELECT}
                          selectedKey={String(formData.idKepada)}
                          onSelectionChange={(value) => {
                            const checkJabatan = JABATAN_SELECT.find(
                              (item) => item.id === Number(value),
                            );
                            setFormData({
                              ...formData,
                              idKepada: String(checkJabatan?.id),
                              nameKepada: checkJabatan?.nameJob,
                            });
                          }}
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
                              key={String(peg.id)}
                              textValue={peg.nameJob}
                            >
                              {peg.nameJob}
                            </AutocompleteItem>
                          )}
                        </Autocomplete>
                      </div>
                      <div>di -</div>
                      <div>Tempat</div>
                    </div>
                  </div>
                  <h1 className="text-center font-semibold text-base">
                    RAHASIA
                  </h1>
                  <div className="flex items-center gap-1 flex-wrap mt-2 whitespace-nowrap">
                    Dengan ini dilaporkan dengan hormat, pada hari{" "}
                    {formData.tanggalSurat
                      ? textToFormat(formData.tanggalSurat)
                      : "-"}{" "}
                    Saya telah melakukan permintaan keterangan terhadap:
                  </div>
                  <div className="flex flex-col gap-2 ms-4">
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
                        selectedKey={String(formData.idPermintaan)}
                        onSelectionChange={(value) =>
                          onChangeName(value as string, "permintaan")
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
                        value={formData.nipPermintaan}
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
                        value={formData.jabatanPermintaan}
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
                        value={formData.golonganPermintaan}
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
                        value={formData.unitPermintaan}
                      />
                    </div>
                  </div>
                  <br />
                  <div>
                    Berdasarkan hal tersebut, dapat kami laporkan sebagai
                    berikut:
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="p-2 border-b border-gray-300 font-medium">
                            Bentuk Pelanggaran
                          </th>
                          <th className="p-2 border-b border-gray-300 font-medium">
                            Waktu
                          </th>
                          <th className="p-2 border-b border-gray-300 font-medium">
                            Tempat
                          </th>
                          <th className="p-2 border-b border-gray-300 font-medium">
                            Faktor Memberatkan
                          </th>
                          <th className="p-2 border-b border-gray-300 font-medium">
                            Faktor Meringankan
                          </th>
                          <th className="p-2 border-b border-gray-300 font-medium">
                            Dampak Perbuatan
                          </th>
                          <th className="p-2 border-b border-gray-300 font-medium"></th>
                        </tr>
                      </thead>
                      {formData.hasil.length > 0 ? (
                        <tbody>
                          {formData.hasil.map((item, index) => (
                            <tr key={index}>
                              <td className="p-2 border-b border-gray-300 font-medium">
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
                                  value={item.bentukPelanggaran}
                                  onChange={(e) =>
                                    handleChangeHasil(
                                      index,
                                      "bentukPelanggaran",
                                      e.target.value,
                                    )
                                  }
                                />
                              </td>
                              <td className="p-2 border-b border-gray-300 font-medium">
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
                                  value={item.waktu}
                                  onChange={(e) =>
                                    handleChangeHasil(
                                      index,
                                      "waktu",
                                      e.target.value,
                                    )
                                  }
                                />
                              </td>
                              <td className="p-2 border-b border-gray-300 font-medium">
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
                                  value={item.tempat}
                                  onChange={(e) =>
                                    handleChangeHasil(
                                      index,
                                      "tempat",
                                      e.target.value,
                                    )
                                  }
                                />
                              </td>
                              <td className="p-2 border-b border-gray-300 font-medium">
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
                                  value={item.faktorPemberat}
                                  onChange={(e) =>
                                    handleChangeHasil(
                                      index,
                                      "faktorPemberat",
                                      e.target.value,
                                    )
                                  }
                                />
                              </td>
                              <td className="p-2 border-b border-gray-300 font-medium">
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
                                  value={item.faktorMeringankan}
                                  onChange={(e) =>
                                    handleChangeHasil(
                                      index,
                                      "faktorMeringankan",
                                      e.target.value,
                                    )
                                  }
                                />
                              </td>
                              <td className="p-2 border-b border-gray-300 font-medium">
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
                                  value={item.dampak}
                                  onChange={(e) =>
                                    handleChangeHasil(
                                      index,
                                      "dampak",
                                      e.target.value,
                                    )
                                  }
                                />
                              </td>
                              <td className="p-2 border-b border-gray-300 font-medium">
                                <Button
                                  isIconOnly
                                  onPress={() => removeHasil(index)}
                                  color="danger"
                                  variant-bordered
                                >
                                  <LucideTrash2 size={14} />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      ) : (
                        <tbody>
                          <tr>
                            <td colSpan={7}>
                              <div className="p-4 flex items-center justify-center flex-col text-gray-500">
                                <TbFaceIdError size={120} />
                                <span className="italic text-xl">
                                  Belum ada hasil
                                </span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      )}
                      <tfoot>
                        <tr>
                          <td
                            colSpan={7}
                            className="p-2 border-b border-gray-300 font-medium"
                          >
                            <Button
                              onPress={addHasil}
                              size="sm"
                              radius="full"
                              className="bg-button-primary text-white font-semibold flex items-center justify-start"
                            >
                              <LucidePlusCircle size={16} /> Tambah
                            </Button>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div>
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
                  <div>
                    Sehubungan dengan hal tersebut, disampaikan Berita Acara
                    Permintaan Keterangan terhadap PNS yang bersangkutan untuk
                    digunakan dalam penetapan keputusan penjatuhan Hukuman
                    Disiplin
                  </div>
                  <br />
                  <div className="max-w-96 ms-auto">
                    <div className="flex items-center justify-start font-semibold text-sm gap-2 mb-2">
                      Yang melaporkan,
                    </div>
                    <div className="ms-auto">
                      <br />
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
                          selectedKey={String(formData.idYangMelaporkan)}
                          onSelectionChange={(value) =>
                            onChangeName(value as string, "ttd")
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
                              {peg.jabatan?.nameJob ||
                                "jabatan tidak diketahui"}{" "}
                              - {peg.nip}
                            </AutocompleteItem>
                          )}
                        </Autocomplete>
                      </div>
                      <div className="flex items-center justify-center font-normal text-sm gap-2 mb-2">
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
                          placeholder="Autofill pangkat/golongan"
                          value={`${formData.pangkatMelaporakn || "-"} / ${formData.jabatanMelaporkan || "-"}`}
                        />
                      </div>
                      <div className="flex items-center justify-center font-normal text-sm gap-2 mb-2">
                        NIP.{" "}
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
                          placeholder="Autofill nip"
                          value={formData.nipMelaporkan}
                        />
                      </div>
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
