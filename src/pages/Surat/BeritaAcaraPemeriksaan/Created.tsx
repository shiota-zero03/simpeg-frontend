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
import { StoreBeritaAcaraPemeriksaan } from "@/interface/request/surat.interface";
import { useCreateBeritaAcaraPemeriksaan } from "@/services/surat/berita-acara-pemeriksaan";
import { DMYIndoToFormat } from "@/utils/dateFormater";

interface formProps {
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

export default function CreateSurat() {
  const [formData, setFormData] = useState<formProps>({
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
    if(!formData.nomorSurat)  error.nomorSurat = "Nomor surat tidak boleh kosong";
    if(!formData.tanggalSurat)  error.tanggalSurat = "Tanggal surat tidak boleh kosong";
    if(!formData.keterangan)  error.keterangan = "Keterangan tidak boleh kosong";
    if(!formData.iddiPeriksa)  error.pemeriksa = "Pemeriksa tidak boleh kosong";
    if(!formData.iddiPeriksa)  error.diPeriksa = "Pegawai yang diperiksa tidak boleh kosong";
    
    return error;
  };

  useEffect(() => {
    setFormData({
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

    if(formData.nomorSurat) formToSend.nomorSurat = formData.nomorSurat
    if (formData.tanggalSurat) {
      const tanggal = new Date(formData.tanggalSurat);
      const tahun = tanggal.getFullYear();
      const bulan = String(tanggal.getMonth() + 1).padStart(2, "0");
      const hari = String(tanggal.getDate()).padStart(2, "0");

      formToSend.tanggalSurat = `${tahun}-${bulan}-${hari}T00:00:00`;
    }
    if(formData.keterangan) formToSend.keterangan = formData.keterangan
    if(formData.pemeriksa) formToSend.pemeriksa = formData.pemeriksa
    if(formData.nipPemeriksa) formToSend.nipPemeriksa = formData.nipPemeriksa
    if(formData.jabatanPemeriksa) formToSend.jabatanPemeriksa = formData.jabatanPemeriksa
    if(formData.pangkatPemeriksa) formToSend.pangkatPemeriksa = formData.pangkatPemeriksa
    if(formData.golonganPemeriksa) formToSend.golonganPemeriksa = formData.golonganPemeriksa
    if(formData.unitPemeriksa) formToSend.unitPemeriksa = formData.unitPemeriksa
    if(formData.diPeriksa) formToSend.diPeriksa = formData.diPeriksa
    if(formData.nipDiPeriksa) formToSend.nipDiPeriksa = formData.nipDiPeriksa
    if(formData.jabatanDiPeriksa) formToSend.jabatanDiPeriksa = formData.jabatanDiPeriksa
    if(formData.pangkatDiPeriksa) formToSend.pangkatDiPeriksa = formData.pangkatDiPeriksa
    if(formData.golonganDiPeriksa) formToSend.golonganDiPeriksa = formData.golonganDiPeriksa
    if(formData.unitDiPeriksa) formToSend.unitDiPeriksa = formData.unitDiPeriksa

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

  const onChangePemeriksa = (value: string, type: "periksa" | "diperiksa") => {
    const checkPegawai = PEGAWAI_SELECT.find((item) => item.id === value);

    if(type === "periksa") {
      if(checkPegawai) {
        setFormData({ 
          ...formData, 
          idpemeriksa: checkPegawai?.id,
          pemeriksa: checkPegawai?.name,
          nipPemeriksa: checkPegawai?.nip,
          jabatanPemeriksa: checkPegawai?.jabatan ? checkPegawai?.jabatan.nameJob : "Jabatan tidak diketahui",
          pangkatPemeriksa: checkPegawai?.rank,
          golonganPemeriksa: checkPegawai?.group,
          unitPemeriksa: checkPegawai?.unit ? checkPegawai?.unit.nameUnit : "",
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
      if(checkPegawai) {
        setFormData({ 
          ...formData, 
          iddiPeriksa: checkPegawai?.id,
          diPeriksa: checkPegawai?.name,
          nipDiPeriksa: checkPegawai?.nip,
          jabatanDiPeriksa: checkPegawai?.jabatan ? checkPegawai?.jabatan.nameJob : "Jabatan tidak diketahui",
          pangkatDiPeriksa: checkPegawai?.rank,
          golonganDiPeriksa: checkPegawai?.group,
          unitDiPeriksa: checkPegawai?.unit ? checkPegawai?.unit.nameUnit : "",
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
                  <h1 className="text-center underline font-semibold text-base">
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
                        <table>
                          <tbody>
                            <tr>
                              <td className="w-8 text-center"></td>
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
                                  selectedKey={String(formData.idpemeriksa)}
                                  onSelectionChange={(value) =>
                                    onChangePemeriksa(value as string, "periksa")
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
                                  value={formData.nipPemeriksa}
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
                                  value={formData.jabatanPemeriksa}
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
                                  value={formData.pangkatPemeriksa}
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
                    <span>Pemanggilan</span>
                    <span>Nomor</span>
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
                      placeholder="Masukkan nomor surat"
                      value={formData.nomorSurat}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nomorSurat: e.target.value,
                        })
                      }
                    />
                    <span>tidak</span>
                    <span>dapat</span>
                    <span>melakukan</span>
                    <span>pemeriksaan</span>
                    <span>dikarenakan</span>
                    <span>saudara</span>
                  </div>
                  <div className="md:ms-4 flex flex-col gap-2">
                      <div className="overflow-x-auto">
                        <table>
                          <tbody>
                            <tr>
                              <td className="w-8 text-center"></td>
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
                                  selectedKey={String(formData.iddiPeriksa)}
                                  onSelectionChange={(value) =>
                                    onChangePemeriksa(value as string, "diperiksa")
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
                                  value={formData.nipDiPeriksa}
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
                                  value={formData.jabatanDiPeriksa}
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
                                  value={formData.pangkatDiPeriksa}
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
                                  value={formData.golonganDiPeriksa}
                                  isReadOnly
                                  isDisabled
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="w-8 text-center"></td>
                              <td className="min-w-40">Unit Kerja</td>
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
                                  placeholder="Autofill Unit Kerja"
                                  value={formData.unitDiPeriksa}
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
                    <span>Demikian Berita Acara Pemeriksaan ini dibuat untuk digunakan sebagaimana mestinya.</span>
                  </div>
                  <div className="mt-2 w-full">
                    <div className="ms-auto w-full text-end">
                      Bekasi, { DMYIndoToFormat(new Date().toISOString().split('T')[0]) }
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
                            <tr>
                              <td>Nama</td>
                              <td>: {formData.diPeriksa}</td>
                            </tr>
                            <tr>
                              <td>NIP</td>
                              <td>: {formData.nipDiPeriksa}</td>
                            </tr>
                            <tr>
                              <td>Tanda Tangan</td>
                              <td>: </td>
                            </tr>
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
