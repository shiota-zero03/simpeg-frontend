import React, { useEffect, useMemo, useState } from "react";
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
import { StoreBeritaAcaraPemeriksaan } from "@/interface/request/surat.interface";
import { useCreateBeritaAcaraPemeriksaan } from "@/services/surat/berita-acara-pemeriksaan";
import { DMYIndoToFormat } from "@/utils/dateFormater";
import store from "@/redux/store";
import { useGetAllListSuratPemanggilan } from "@/services/surat/pemanggilan";

interface formProps {
  nomorPeriksa?: string;
  nomorSurat?: string;
  tanggalSurat?: string;
  keterangan?: string;
  idpemeriksa?: string;
  pemeriksa?: string;
  nipPemeriksa?: string;
  jabatanPemeriksa?: string;
  pangkatPemeriksa?: string;
  golonganPemeriksa?: string;
  unitPemeriksa?: string;
  iddiPeriksa?: string;
  diPeriksa?: string;
  nipDiPeriksa?: string;
  jabatanDiPeriksa?: string;
  pangkatDiPeriksa?: string;
  golonganDiPeriksa?: string;
  unitDiPeriksa?: string;
}

interface errorProps {
  nomorSurat?: string;
  tanggalSurat?: string;
  keterangan?: string;
  pemeriksa?: string;
  nipPemeriksa?: string;
  jabatanPemeriksa?: string;
  pangkatPemeriksa?: string;
  golonganPemeriksa?: string;
  unitPemeriksa?: string;
  diPeriksa?: string;
  nipDiPeriksa?: string;
  jabatanDiPeriksa?: string;
  pangkatDiPeriksa?: string;
  golonganDiPeriksa?: string;
  unitDiPeriksa?: string;
}

interface pegawaiProps {
  name?: string;
  nip?: string;
  jabatan?: string;
  unit?: string;
  golongan?: string;
  pangkat?: string;
}

export default function CreateSurat() {
  const { role } = store.getState().auth;
  const [formData, setFormData] = useState<formProps>({
    nomorPeriksa: "",
    nomorSurat: "",
    tanggalSurat: "",
    keterangan: "",
    idpemeriksa: "",
    pemeriksa: "",
    nipPemeriksa: "",
    jabatanPemeriksa: "",
    pangkatPemeriksa: "",
    golonganPemeriksa: "",
    unitPemeriksa: "",
    iddiPeriksa: "",
    diPeriksa: "",
    nipDiPeriksa: "",
    jabatanDiPeriksa: "",
    pangkatDiPeriksa: "",
    golonganDiPeriksa: "",
    unitDiPeriksa: "",
  });

  const [formPegawai, setFormPegawai] = useState<pegawaiProps[]>([]);

  const [formError, setFormError] = useState<errorProps>({});

  const {
    data: allDataPegawai,
    isFetching: isFetchingPegawai,
    refetch: refetchPegawai,
  } = useGetAllPegawaiOption();
  const PEGAWAI_SELECT = useMemo(() => {
    if (!allDataPegawai) return [];
    if (role?.includes("UPTD")) {
      if (role === "UPTD_LEGAL") {
        return allDataPegawai.data.filter(
          (it) =>
            it.jabatan.unit.nameUnit.includes("METROLOGI LEGAL") ||
            it.jabatan.nameJob.includes("METROLOGI LEGAL"),
        );
      } else if (role === "UPTD_9") {
        return allDataPegawai.data.filter(
          (it) =>
            it.jabatan.unit.nameUnit.includes("WILAYAH IX ") ||
            it.jabatan.nameJob.includes("WILAYAH IX "),
        );
      } else if (role === "UPTD_8") {
        return allDataPegawai.data.filter(
          (it) =>
            it.jabatan.unit.nameUnit.includes("WILAYAH VIII ") ||
            it.jabatan.nameJob.includes("WILAYAH VIII "),
        );
      } else if (role === "UPTD_7") {
        return allDataPegawai.data.filter(
          (it) =>
            it.jabatan.unit.nameUnit.includes("WILAYAH VII ") ||
            it.jabatan.nameJob.includes("WILAYAH VII "),
        );
      } else if (role === "UPTD_6") {
        return allDataPegawai.data.filter(
          (it) =>
            it.jabatan.unit.nameUnit.includes("WILAYAH VI ") ||
            it.jabatan.nameJob.includes("WILAYAH VI "),
        );
      } else if (role === "UPTD_5") {
        return allDataPegawai.data.filter(
          (it) =>
            it.jabatan.unit.nameUnit.includes("WILAYAH V ") ||
            it.jabatan.nameJob.includes("WILAYAH V "),
        );
      } else if (role === "UPTD_4") {
        return allDataPegawai.data.filter(
          (it) =>
            it.jabatan.unit.nameUnit.includes("WILAYAH IV ") ||
            it.jabatan.nameJob.includes("WILAYAH IV "),
        );
      } else if (role === "UPTD_3") {
        return allDataPegawai.data.filter(
          (it) =>
            it.jabatan.unit.nameUnit.includes("WILAYAH III ") ||
            it.jabatan.nameJob.includes("WILAYAH III "),
        );
      } else if (role === "UPTD_2") {
        return allDataPegawai.data.filter(
          (it) =>
            it.jabatan.unit.nameUnit.includes("WILAYAH II ") ||
            it.jabatan.nameJob.includes("WILAYAH II "),
        );
      } else if (role === "UPTD_1") {
        return allDataPegawai.data.filter(
          (it) =>
            it.jabatan.unit.nameUnit.includes("WILAYAH I ") ||
            it.jabatan.nameJob.includes("WILAYAH I "),
        );
      } else {
        return allDataPegawai.data;
      }
    } else {
      return allDataPegawai.data;
    }
  }, [allDataPegawai]);

  const {
    data: allDataNomorSurat,
    isFetching: isFetchingNomorSurat,
    refetch: refetchNomorSurat,
  } = useGetAllListSuratPemanggilan();
  const SURAT_SELECT = useMemo(() => {
    if (!allDataNomorSurat) return [];
    return allDataNomorSurat.data;
  }, [allDataNomorSurat]);

  const rules = () => {
    const error: errorProps = {};
    if (!formData.nomorSurat)
      error.nomorSurat = "Nomor surat tidak boleh kosong";
    if (!formData.tanggalSurat)
      error.tanggalSurat = "Tanggal surat tidak boleh kosong";
    if (!formData.keterangan)
      error.keterangan = "Keterangan tidak boleh kosong";
    if (!formData.pemeriksa) error.pemeriksa = "Pemeriksa tidak boleh kosong";

    return error;
  };

  useEffect(() => {
    setFormData({
      nomorPeriksa: "",
      nomorSurat: "",
      tanggalSurat: "",
      keterangan: "",
      idpemeriksa: "",
      pemeriksa: "",
      nipPemeriksa: "",
      jabatanPemeriksa: "",
      pangkatPemeriksa: "",
      golonganPemeriksa: "",
      unitPemeriksa: "",
      iddiPeriksa: "",
      diPeriksa: "",
      nipDiPeriksa: "",
      jabatanDiPeriksa: "",
      pangkatDiPeriksa: "",
      golonganDiPeriksa: "",
      unitDiPeriksa: "",
    });
    setFormError({});
    refetchPegawai();
    refetchNomorSurat();
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

  const { mutate: mutatePost } = useCreateBeritaAcaraPemeriksaan();

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

    const formToSend: StoreBeritaAcaraPemeriksaan = {};

    if (formData.nomorSurat) formToSend.nomorSurat = formData.nomorSurat;
    if (formData.tanggalSurat) {
      const tanggal = new Date(formData.tanggalSurat);
      const tahun = tanggal.getFullYear();
      const bulan = String(tanggal.getMonth() + 1).padStart(2, "0");
      const hari = String(tanggal.getDate()).padStart(2, "0");

      formToSend.tanggalSurat = `${tahun}-${bulan}-${hari}T00:00:00.000Z`;
    }
    if (formData.keterangan) formToSend.keterangan = formData.keterangan;
    if (formData.pemeriksa) formToSend.pemeriksa = formData.pemeriksa;
    if (formData.nipPemeriksa) formToSend.nipPemeriksa = formData.nipPemeriksa;
    if (formData.jabatanPemeriksa)
      formToSend.jabatanPemeriksa = formData.jabatanPemeriksa;
    if (formData.pangkatPemeriksa)
      formToSend.pangkatPemeriksa = formData.pangkatPemeriksa;
    if (formData.golonganPemeriksa)
      formToSend.golonganPemeriksa = formData.golonganPemeriksa;
    if (formData.unitPemeriksa)
      formToSend.unitPemeriksa = formData.unitPemeriksa;

    const diperintahData = formPegawai.map((item) => ({
      name: item.name,
      nip: item.nip,
      jabatan: item.jabatan,
      pangkat: item.pangkat,
      golongan: item.golongan,
      unit: item.unit,
    }));

    const namaDiPeriksa = diperintahData.map((item) => item.name).join(";;");
    const nipDiPeriksa = diperintahData.map((item) => item.nip).join(";;");
    const jabatanDiPeriksa = diperintahData
      .map((item) => item.jabatan)
      .join(";;");
    const pangkatDiPeriksa = diperintahData
      .map((item) => item.pangkat)
      .join(";;");
    const golonganDiPeriksa = diperintahData
      .map((item) => item.golongan)
      .join(";;");
    const unitDiPeriksa = diperintahData.map((item) => item.unit).join(";;");

    if (namaDiPeriksa) formToSend.diPeriksa = namaDiPeriksa;
    if (nipDiPeriksa) formToSend.nipDiPeriksa = nipDiPeriksa;
    if (jabatanDiPeriksa) formToSend.jabatanDiPeriksa = jabatanDiPeriksa;
    if (pangkatDiPeriksa) formToSend.pangkatDiPeriksa = pangkatDiPeriksa;
    if (golonganDiPeriksa) formToSend.golonganDiPeriksa = golonganDiPeriksa;
    if (unitDiPeriksa) formToSend.unitDiPeriksa = unitDiPeriksa;

    try {
      mutatePost(formToSend, {
        onSuccess: () => {
          SuccessToast({ text: "Data berhasil ditambahkan" });
          navigate("/berita-acara-pemeriksaan");
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

  const onChangePemeriksa = (value: string, type: "periksa" | "diperiksa") => {
    const checkPegawai = PEGAWAI_SELECT.find((item) => item.id === value);

    if (type === "periksa") {
      if (checkPegawai) {
        setFormData({
          ...formData,
          idpemeriksa: checkPegawai?.id,
          pemeriksa: checkPegawai?.name,
          nipPemeriksa: checkPegawai?.nip || "-",
          jabatanPemeriksa: checkPegawai?.jabatan
            ? checkPegawai?.jabatan.nameJob
            : "Jabatan tidak diketahui",
          pangkatPemeriksa: checkPegawai?.rank || "-",
          golonganPemeriksa: checkPegawai?.group || "-",
          unitPemeriksa: checkPegawai.jabatan.unit
            ? checkPegawai.jabatan.unit.nameUnit
            : "-",
        });
      } else {
        setFormData({
          ...formData,
          idpemeriksa: "",
          pemeriksa: "",
          nipPemeriksa: "",
          jabatanPemeriksa: "",
          pangkatPemeriksa: "",
          golonganPemeriksa: "",
          unitPemeriksa: "",
        });
      }
    } else {
      if (checkPegawai) {
        setFormData({
          ...formData,
          iddiPeriksa: checkPegawai?.id,
          diPeriksa: checkPegawai?.name,
          nipDiPeriksa: checkPegawai?.nip || "-",
          jabatanDiPeriksa: checkPegawai?.jabatan
            ? checkPegawai?.jabatan.nameJob
            : "Jabatan tidak diketahui",
          pangkatDiPeriksa: checkPegawai?.rank || "-",
          golonganDiPeriksa: checkPegawai?.group || "-",
          unitDiPeriksa: checkPegawai.jabatan.unit
            ? checkPegawai.jabatan.unit.nameUnit
            : "-",
        });
      } else {
        setFormData({
          ...formData,
          iddiPeriksa: "",
          diPeriksa: "",
          nipDiPeriksa: "",
          jabatanDiPeriksa: "",
          pangkatDiPeriksa: "",
          golonganDiPeriksa: "",
          unitDiPeriksa: "",
        });
      }
    }
  };

  const onChangeNameSurat = (value: string) => {
    const checkPegawai = SURAT_SELECT.find((item) => item.id === Number(value));
    if (checkPegawai) {
      setFormData({
        ...formData,
        nomorPeriksa: String(checkPegawai.id),
        nomorSurat: String(checkPegawai.nomorSurat),
      });

      const pegawaiBaru = checkPegawai.DiPanggilSuratPemanggilan
        ? checkPegawai.DiPanggilSuratPemanggilan.map((item) => {
            const [jabatan, golongan, pangkat] = item.jabatanDiPanggil
              ? item.jabatanDiPanggil.split(";;")
              : "";
            return {
              name: item.diPanggil,
              nip: item.nipDiPanggil,
              jabatan: jabatan,
              unit: item.nipDiPanggil,
              golongan: golongan,
              pangkat: pangkat,
            };
          })
        : [];
      setFormPegawai(pegawaiBaru);
    } else {
      setFormData({
        ...formData,
        nomorPeriksa: "",
        nomorSurat: "",
      });
      setFormPegawai([]);
    }
  };

  return (
    <>
      <BreadcrumbAdmin location="/Berita-Acara-Pemeriksaan/Tambah-Data" />
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        isLoading={isLoadingConfirm}
        handleSubmit={handleConfirm}
      />

      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="flex">
          <Link
            to={`/berita-acara-pemeriksaan`}
            className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
          >
            <LuArrowLeft /> Kembali
          </Link>
        </div>
        <TitleCase
          title="Tambah Berita Acara Pemeriksaan"
          text="Digunakan Untuk Menambah Berita Acara Pemeriksaan Terbaru"
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
                  <h1 className="text-center font-semibold text-base">
                    BERITA ACARA PEMERIKSAAN
                  </h1>
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
                    <span>kami :</span>
                  </div>
                  <div className="md:ms-4 flex flex-col gap-2">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <tbody>
                          <tr>
                            <td className="w-8 text-center"></td>
                            <td className="w-40">Nama</td>
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
                                selectedKey={String(formData.idpemeriksa)}
                                onSelectionChange={(value) =>
                                  onChangePemeriksa(value as string, "periksa")
                                }
                                itemHeight={48}
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
                                    key={peg.id}
                                    textValue={peg.name}
                                  >
                                    <div className="lg:text-xs sm:text-[10px] text-[8px] leading-[10px]">
                                      {peg.name} -{" "}
                                      {peg.jabatan?.nameJob ||
                                        "jabatan tidak diketahui"}{" "}
                                      - {peg.nip}
                                    </div>
                                  </AutocompleteItem>
                                )}
                              </Autocomplete>
                            </td>
                          </tr>
                          <tr>
                            <td className="w-8 text-center"></td>
                            <td className="w-40">NIP</td>
                            <td className="flex items-center gap-2">
                              :
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
                                placeholder="Autofill NIP"
                                value={formData.nipPemeriksa}
                                isReadOnly
                                isDisabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="w-8 text-center"></td>
                            <td className="w-40">Jabatan</td>
                            <td className="flex items-center gap-2">
                              :
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
                                placeholder="Autofill Jabatan"
                                value={formData.jabatanPemeriksa}
                                isReadOnly
                                isDisabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="w-8 text-center"></td>
                            <td className="w-40">Pangkat</td>
                            <td className="flex items-center gap-2">
                              :
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
                                placeholder="Autofill Pangkat"
                                value={formData.pangkatPemeriksa}
                                isReadOnly
                                isDisabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <td className="w-8 text-center"></td>
                            <td className="w-40">Golongan</td>
                            <td className="flex items-center gap-2">
                              :
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
                                placeholder="Autofill Golongan"
                                value={formData.golonganPemeriksa}
                                isReadOnly
                                isDisabled
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap mt-2 whitespace-nowrap">
                    <span>Berdasarkan</span>
                    <span>Surat</span>
                    <span>Perintah</span>
                    <span>Nomor</span>
                    <Autocomplete
                      isLoading={isFetchingNomorSurat}
                      aria-label="pegawai"
                      placeholder="Cari nomor surat pemanggilan"
                      variant="bordered"
                      radius="sm"
                      size="sm"
                      defaultItems={SURAT_SELECT}
                      selectedKey={String(formData.nomorPeriksa)}
                      onSelectionChange={(value) =>
                        onChangeNameSurat(value as string)
                      }
                      itemHeight={48}
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
                          textValue={peg.nomorSurat}
                        >
                          <div className="lg:text-xs sm:text-[10px] text-[8px] leading-[10px]">
                            {peg.nomorSurat}
                          </div>
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                    <span>tidak</span>
                    <span>dapat</span>
                    <span>melakukan</span>
                    <span>pemeriksaan</span>
                    <span>dikarenakan</span>
                    <span>saudara</span>
                  </div>
                  <div className="md:ms-4 flex flex-col gap-2">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <tbody>
                          {formPegawai.map((item, index) => (
                            <React.Fragment key={index}>
                              <tr>
                                <td className="w-8 text-center">{index + 1}</td>
                                <td className="w-40">Nama</td>
                                <td className="flex items-center gap-2">
                                  :
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
                                    placeholder="Autofill Nama"
                                    value={item.name}
                                    isReadOnly
                                    isDisabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="w-8 text-center"></td>
                                <td className="w-40">NIP</td>
                                <td className="flex items-center gap-2">
                                  :
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
                                    placeholder="Autofill NIP"
                                    value={item.nip}
                                    isReadOnly
                                    isDisabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="w-8 text-center"></td>
                                <td className="w-40">Jabatan</td>
                                <td className="flex items-center gap-2">
                                  :
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
                                    placeholder="Autofill Jabatan"
                                    value={item.jabatan}
                                    isReadOnly
                                    isDisabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="w-8 text-center"></td>
                                <td className="w-40">Pangkat</td>
                                <td className="flex items-center gap-2">
                                  :
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
                                    placeholder="Autofill Pangkat"
                                    value={item.pangkat}
                                    isReadOnly
                                    isDisabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="w-8 text-center"></td>
                                <td className="w-40">Golongan</td>
                                <td className="flex items-center gap-2">
                                  :
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
                                    placeholder="Autofill Golongan"
                                    value={item.golongan}
                                    isReadOnly
                                    isDisabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="w-8 text-center"></td>
                                <td className="w-40">Unit Kerja</td>
                                <td className="flex items-center gap-2">
                                  :
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
                                    placeholder="Autofill Unit Kerja"
                                    value={item.unit}
                                    isReadOnly
                                    isDisabled
                                  />
                                </td>
                              </tr>
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap mt-2 whitespace-nowrap">
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
                      placeholder="Masukkan keterangan"
                      value={formData.keterangan}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          keterangan: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center gap-1 flex-wrap mt-2 whitespace-nowrap">
                    <span>
                      Demikian Berita Acara Pemeriksaan ini dibuat untuk
                      digunakan sebagaimana mestinya.
                    </span>
                  </div>
                  <div className="mt-2 w-full">
                    <div className="ms-auto w-full text-end">
                      Bekasi,{" "}
                      {DMYIndoToFormat(new Date().toISOString().split("T")[0])}
                    </div>
                    <div className="mt-2 grid sm:grid-cols-2 grid-cols-1 gap-2">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th colSpan={2}>Yang diperiksa</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formPegawai.map((item, index) => (
                              <React.Fragment key={index}>
                                <tr>
                                  <td>{index + 1}. </td>
                                  <td>Nama</td>
                                  <td>: {item.name}</td>
                                </tr>
                                <tr>
                                  <td></td>
                                  <td>NIP</td>
                                  <td>: {item.nip}</td>
                                </tr>
                                <tr>
                                  <td></td>
                                  <td>Tanda Tangan</td>
                                  <td>: </td>
                                </tr>
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th colSpan={2}>Yang memeriksa</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Nama</td>
                              <td>: {formData.pemeriksa}</td>
                            </tr>
                            <tr>
                              <td>NIP</td>
                              <td>: {formData.nipPemeriksa}</td>
                            </tr>
                            <tr>
                              <td>Tanda Tangan</td>
                              <td>: </td>
                            </tr>
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
