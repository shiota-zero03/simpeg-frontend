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
import { StoreSuratPemanggilan } from "@/interface/request/surat.interface";
import { useCreateSuratPemanggilan } from "@/services/surat/pemanggilan";

interface formProps {
  nomorPanggilan?: string;
  nomorSurat?: string;

  idDipanggil?: string;
  diPanggil?: string;
  nipDiPanggil?: string;
  jabatanDiPanggil?: string;
  unitDiPanggil?: string;

  idPemanggil?: string;
  pemanggil?: string;
  nipPemanggil?: string;
  jabatanPemanggil?: string;
  unitPemanggil?: string;

  waktu?: string;
  tempat?: string;
  keterangan?: string;

  tanggalSurat?: string;

  idTtd?: string;
  namaTtd?: string;
  nipTtd?: string;
  jabatanTtd?: string;
}

interface errorProps {
  nomorSurat?: string;
  nomorPanggilan?: string;
  tanggalSurat?: string;
  waktu?: string;
  tempat?: string;
  keterangan?: string;
  pemanggil?: string;
  nipPemanggil?: string;
  jabatanPemanggil?: string;
  unitPemanggil?: string;
  diPanggil?: string;
  nipDiPanggil?: string;
  jabatanDiPanggil?: string;
  unitDiPanggil?: string;
  namaTtd?: string;
  nipTtd?: string;
  jabatanTtd?: string;
}

export default function CreateSurat() {
  const [formData, setFormData] = useState<formProps>({
    nomorPanggilan: "",
    nomorSurat: "",

    idDipanggil: "",
    diPanggil: "",
    nipDiPanggil: "",
    jabatanDiPanggil: "",
    unitDiPanggil: "",

    idPemanggil: "",
    pemanggil: "",
    nipPemanggil: "",
    jabatanPemanggil: "",
    unitPemanggil: "",

    waktu: "",
    tempat: "",
    keterangan: "",
    tanggalSurat: "",

    idTtd: "",
    namaTtd: "",
    nipTtd: "",
    jabatanTtd: "",
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

    if (!formData.nomorPanggilan)
      error.nomorPanggilan = "Nomor panggilan tidak boleh kosong";
    if (!formData.nomorSurat)
      error.nomorSurat = "Nomor surat tidak boleh kosong";
    if (!formData.idDipanggil)
      error.diPanggil = "Nama yang dipanggil perintah tidak boleh kosong";
    if (!formData.idPemanggil)
      error.pemanggil = "Nama yang memanggil perintah tidak boleh kosong";
    if (!formData.idTtd)
      error.namaTtd = "Nama penanda tangan tidak boleh kosong";
    if (!formData.waktu) error.waktu = "Waktu tidak boleh kosong";
    if (!formData.tempat) error.tempat = "Tempat tidak boleh kosong";
    if (!formData.keterangan)
      error.keterangan = "Keterangan (untuk) tidak boleh kosong";
    if (!formData.tanggalSurat)
      error.tanggalSurat = "Tanggal surat tidak boleh kosong";

    return error;
  };

  useEffect(() => {
    setFormData({
      nomorPanggilan: "",
      nomorSurat: "",

      idDipanggil: "",
      diPanggil: "",
      nipDiPanggil: "",
      jabatanDiPanggil: "",
      unitDiPanggil: "",

      idPemanggil: "",
      pemanggil: "",
      nipPemanggil: "",
      jabatanPemanggil: "",
      unitPemanggil: "",

      waktu: "",
      tempat: "",
      keterangan: "",
      tanggalSurat: "",

      idTtd: "",
      namaTtd: "",
      nipTtd: "",
      jabatanTtd: "",
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

  const { mutate: mutatePost } = useCreateSuratPemanggilan();

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

    const formToSend: StoreSuratPemanggilan = {};
    if (formData.nomorPanggilan)
      formToSend.nomorPanggilan = formData.nomorPanggilan;
    if (formData.nomorSurat) formToSend.nomorSurat = formData.nomorSurat;

    if (formData.diPanggil) formToSend.diPanggil = formData.diPanggil;
    if (formData.nipDiPanggil) formToSend.nipDiPanggil = formData.nipDiPanggil;
    if (formData.jabatanDiPanggil)
      formToSend.jabatanDiPanggil = formData.jabatanDiPanggil;
    if (formData.unitDiPanggil)
      formToSend.unitDiPanggil = formData.unitDiPanggil;

    if (formData.pemanggil) formToSend.pemanggil = formData.pemanggil;
    if (formData.nipPemanggil) formToSend.nipPemanggil = formData.nipPemanggil;
    if (formData.jabatanPemanggil)
      formToSend.jabatanPemanggil = formData.jabatanPemanggil;
    if (formData.unitPemanggil)
      formToSend.unitPemanggil = formData.unitPemanggil;

    if (formData.waktu) formToSend.waktu = formData.waktu;
    if (formData.tempat) formToSend.tempat = formData.tempat;
    if (formData.keterangan) formToSend.keterangan = formData.keterangan;
    if (formData.tanggalSurat) formToSend.tanggalSurat = formData.tanggalSurat;

    if (formData.namaTtd) formToSend.namaTtd = formData.namaTtd;
    if (formData.nipTtd) formToSend.nipTtd = formData.nipTtd;
    if (formData.jabatanTtd) formToSend.jabatanTtd = formData.jabatanTtd;

    try {
      mutatePost(formToSend, {
        onSuccess: () => {
          SuccessToast({ text: "Data berhasil ditambahkan" });
          navigate("/surat-pemanggilan");
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
    if (type === "ttd") {
      const checkPegawai = PEGAWAI_SELECT.find((item) => item.id === value);
      if (checkPegawai) {
        setFormData({
          ...formData,
          idTtd: checkPegawai.id,
          namaTtd: checkPegawai.name,
          nipTtd: checkPegawai.nip,
          jabatanTtd:
            checkPegawai.jabatan?.nameJob || "Jabatan tidak diketahui",
        });
      } else {
        setFormData({
          ...formData,
          idTtd: "",
          namaTtd: "",
          nipTtd: "",
          jabatanTtd: "",
        });
      }
    } else if (type === "pemanggil") {
      const checkPegawai = PEGAWAI_SELECT.find((item) => item.id === value);
      if (checkPegawai) {
        setFormData({
          ...formData,
          idPemanggil: checkPegawai.id,
          pemanggil: checkPegawai.name,
          nipPemanggil: checkPegawai.nip,
          unitPemanggil: checkPegawai.unit?.nameUnit || "Unit tidak diketahui",
          jabatanPemanggil:
            checkPegawai.jabatan?.nameJob || "Jabatan tidak diketahui",
        });
      } else {
        setFormData({
          ...formData,
          idPemanggil: "",
          pemanggil: "",
          nipPemanggil: "",
          unitPemanggil: "",
          jabatanPemanggil: "",
        });
      }
    } else if (type === "dipanggil") {
      const checkPegawai = PEGAWAI_SELECT.find((item) => item.id === value);
      if (checkPegawai) {
        setFormData({
          ...formData,
          idDipanggil: checkPegawai.id,
          diPanggil: checkPegawai.name,
          nipDiPanggil: checkPegawai.nip,
          unitDiPanggil: checkPegawai.unit?.nameUnit || "Unit tidak diketahui",
          jabatanDiPanggil:
            checkPegawai.jabatan?.nameJob || "Jabatan tidak diketahui",
        });
      } else {
        setFormData({
          ...formData,
          idDipanggil: "",
          diPanggil: "",
          nipDiPanggil: "",
          unitDiPanggil: "",
          jabatanDiPanggil: "",
        });
      }
    }
  };

  return (
    <>
      <BreadcrumbAdmin location="/Surat-Perintah-Pemeriksaan/Tambah-Data" />
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        isLoading={isLoadingConfirm}
        handleSubmit={handleConfirm}
      />

      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="flex">
          <Link
            to={`/surat-pemanggilan`}
            className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
          >
            <LuArrowLeft /> Kembali
          </Link>
        </div>
        <TitleCase
          title="Tambah Surat Pemanggilan"
          text="Digunakan Untuk Menambah Surat Pemanggilan Terbaru"
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
                    RAHASIA
                  </h1>
                  <div className="flex items-center justify-center font-semibold text-sm gap-2 mb-2">
                    SURAT PEMANGGILAN{" "}
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
                      placeholder="Masukkan nomor pemanggilan disini"
                      value={formData.nomorPanggilan}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nomorPanggilan: e.target.value,
                        })
                      }
                    />
                  </div>
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
                  <div>
                    1. Bersama ini diminta dengan hormat kehadiran saudara:
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
                        selectedKey={String(formData.idDipanggil)}
                        onSelectionChange={(value) =>
                          onChangeName(value as string, "dipanggil")
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
                        value={formData.nipDiPanggil}
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
                        value={formData.unitDiPanggil}
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
                        value={formData.jabatanDiPanggil}
                      />
                    </div>
                  </div>
                  <br />
                  <div>Untuk menghadap kepada</div>
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
                        selectedKey={String(formData.idPemanggil)}
                        onSelectionChange={(value) =>
                          onChangeName(value as string, "pemanggil")
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
                        value={formData.nipPemanggil}
                      />
                    </div>
                    <div className="flex items-center font-semibold text-sm gap-2 mb-2">
                      <div className="w-20">Unit </div>
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
                        value={formData.unitPemanggil}
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
                        value={formData.jabatanPemanggil}
                      />
                    </div>
                  </div>
                  <br />
                  <div>Pada</div>
                  <div className="flex flex-col gap-2 ms-4">
                    <div className="flex items-center font-semibold text-sm gap-2 mb-2">
                      <div className="w-20">Waktu </div>
                      :
                      <Input
                        type="datetime-local"
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
                        value={formData.waktu}
                        onChange={(e) =>
                          setFormData({ ...formData, waktu: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex items-center font-semibold text-sm gap-2 mb-2">
                      <div className="w-20">Tempat </div>
                      :
                      <Input
                        type="text"
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
                        value={formData.tempat}
                        onChange={(e) =>
                          setFormData({ ...formData, tempat: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <br />
                  <div className="flex items-center gap-2">
                    Untuk{" "}
                    <Input
                      variant="bordered"
                      aria-label="nomorSurat"
                      size="sm"
                      radius="sm"
                      classNames={{
                        inputWrapper:
                          "border-[0.8px] border-button-primary rounded-md",
                        input: "text-xs",
                      }}
                      placeholder="Masukkan keterangan disini"
                      value={formData.keterangan}
                      onChange={(e) =>
                        setFormData({ ...formData, keterangan: e.target.value })
                      }
                    />
                  </div>
                  <br />
                  <div>2. Demikian untuk dilaksanakan.</div>
                  <br />
                  <div className="flex items-center justify-end font-semibold text-sm gap-2 mb-2">
                    Bekasi,{" "}
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
                        value={formData.jabatanTtd}
                      />
                    </div>
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
                        selectedKey={String(formData.idTtd)}
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
                            {peg.jabatan?.nameJob || "jabatan tidak diketahui"}{" "}
                            - {peg.nip}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
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
                        placeholder="Autofill Jabatan"
                        value={formData.nipTtd}
                      />
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
