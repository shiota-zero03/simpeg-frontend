import { useEffect, useMemo, useState } from "react";
import { TitleCase } from "@/components/card/TitleCase";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { LuArrowLeft, LuSave } from "react-icons/lu";
import ConfirmModal from "@/components/modals/UtilsModal/ConfirmModal";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { useNavigate } from "react-router-dom";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link } from "react-router-dom";
import { EselonData, JabatanDummy, RoleAccess } from "@/constants/DummyData";

interface formProps {
  role: string;
  nama: string;
  nip: string;
  email: string;
  jabatan: string;
  asnStatus: string;
  dinas: string;
  eselon: string;
  golongan: string;
  whatsapp: string;
  statusPegawai: string;
  isActive: boolean;
  password: string;
  passwordConfirmation: string;

  noTelp?: string | null;
  tempatLahir?: string | null;
  tanggalLahir?: string | null;
  pangkat?: string | null;
  pendidikanTerakhir?: string | null;
  usiaPensiun?: number | null;
  tanggalPensium?: string | null;
  tanggalTMT?: string | null;
  tanggalKGP?: string | null;
  foto?: string | null;
}

interface errorProps {
  role?: string;
  nama?: string;
  nip?: string;
  email?: string;
  jabatan?: string;
  asnStatus?: string;
  dinas?: string;
  eselon?: string;
  golongan?: string;
  whatsapp?: string;
  statusPegawai?: string;
  isActive?: string;
  password?: string;
  passwordConfirmation?: string;

  noTelp?: string;
  tempatLahir?: string;
  tanggalLahir?: string;
  pangkat?: string;
  pendidikanTerakhir?: string;
  usiaPensiun?: string;
  tanggalPensium?: string;
  tanggalTMT?: string;
  tanggalKGP?: string;
  foto?: string;
}

export default function CreatePegawai() {
  const [formData, setFormData] = useState<formProps>({
    role: "",
    nama: "",
    nip: "",
    email: "",
    jabatan: "",
    asnStatus: "",
    dinas: "",
    eselon: "",
    golongan: "",
    whatsapp: "",
    statusPegawai: "",
    isActive: false,
    password: "",
    passwordConfirmation: "",

    noTelp: null,
    tempatLahir: null,
    tanggalLahir: null,
    pangkat: null,
    pendidikanTerakhir: null,
    usiaPensiun: null,
    tanggalPensium: null,
    tanggalTMT: null,
    tanggalKGP: null,
    foto: null,
  });

  const [formError, setFormError] = useState<errorProps>({});

  const allDataJabatan = JabatanDummy;
  const JABATAN_SELECT = useMemo(() => {
    return allDataJabatan;
  }, [allDataJabatan]);

  const allDataEselon = EselonData;
  const ESELON_SELECT = useMemo(() => {
    return allDataEselon;
  }, [allDataEselon]);

  const rules = () => {
    const error: errorProps = {};
    if (!formData.role) error.role = "Role / hak akses tidak boleh kosong";
    if (!formData.nama) {
      error.nama = "Nama pegawai tidak boleh kosong";
    }
    if (!formData.nip) {
      error.nip = "NIP tidak boleh kosong";
    }
    if (!formData.jabatan) {
      error.jabatan = "Jabatan tidak boleh kosong";
    }
    return error;
  };

  useEffect(() => {
    setFormData({
      role: "",
      nama: "",
      nip: "",
      email: "",
      jabatan: "",
      asnStatus: "",
      dinas: "",
      eselon: "",
      golongan: "",
      whatsapp: "",
      statusPegawai: "",
      isActive: false,
      password: "",
      passwordConfirmation: "",

      noTelp: null,
      tempatLahir: null,
      tanggalLahir: null,
      pangkat: null,
      pendidikanTerakhir: null,
      usiaPensiun: null,
      tanggalPensium: null,
      tanggalTMT: null,
      tanggalKGP: null,
      foto: null,
    });
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

  const handleConfirm = () => {
    setLoadingConfirm(true);

    const errorRules = rules();
    setFormError(errorRules);

    if (Object.keys(errorRules).length > 0) {
      setLoadingConfirm(false);
      onCloseConfirm();
      ErrorToast({ text: "Validasi gagal, cek kembali form anda" });
      return true;
    }
    setTimeout(() => {
      SuccessToast({ text: "Data berhasil disimpan" });
      setLoadingConfirm(false);
      onCloseConfirm();
      navigate("/pegawai");
    }, 1000);
  };

  return (
    <>
      <BreadcrumbAdmin location="/Pegawai/Tambah-Data" />
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        isLoading={isLoadingConfirm}
        handleSubmit={handleConfirm}
      />

      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="flex">
          <Link
            to={`/pegawai`}
            className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
          >
            <LuArrowLeft /> Kembali
          </Link>
        </div>
        <TitleCase title="Tambah Pegawai" />

        <div className="bg-white shadow-md rounded-xl border p-4">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
              <div>
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Role / Hak Akses <span className="text-danger">*</span>
                  </label>
                </div>
                <Select
                  selectedKeys={[formData.role]}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  aria-label="Judul"
                  labelPlacement="outside"
                  placeholder="Pilih role"
                  variant="bordered"
                  radius="sm"
                  classNames={{
                    trigger: "text-xs border-[0.8px]",
                    value: "text-xs",
                  }}
                >
                  {RoleAccess.map((item) => (
                    <SelectItem key={item.key}>{item.name}</SelectItem>
                  ))}
                </Select>
                <div className="text-danger text-[0.7rem] mt-1">
                  {formError.role}
                </div>
              </div>
              <div>
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Nama Pegawai <span className="text-danger">*</span>
                  </label>
                </div>
                <Input
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData({ ...formData, nama: e.target.value })
                  }
                  aria-label="Judul"
                  labelPlacement="outside"
                  placeholder="Masukkan disini"
                  variant="bordered"
                  radius="sm"
                  classNames={{
                    inputWrapper: "border-[0.8px]",
                    input: "text-xs",
                  }}
                />
                <div className="text-danger text-[0.7rem] mt-1">
                  {formError.nama}
                </div>
              </div>
              <div>
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    NIP Pegawai <span className="text-danger">*</span>
                  </label>
                </div>
                <Input
                  value={formData.nip}
                  onChange={(e) =>
                    setFormData({ ...formData, nip: e.target.value })
                  }
                  aria-label="Judul"
                  labelPlacement="outside"
                  placeholder="Masukkan disini"
                  variant="bordered"
                  radius="sm"
                  classNames={{
                    inputWrapper: "border-[0.8px]",
                    input: "text-xs",
                  }}
                />
                <div className="text-danger text-[0.7rem] mt-1">
                  {formError.nip}
                </div>
              </div>
              <div>
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Email <span className="text-danger">*</span>
                  </label>
                </div>
                <Input
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  aria-label="Judul"
                  labelPlacement="outside"
                  placeholder="Masukkan disini"
                  variant="bordered"
                  radius="sm"
                  classNames={{
                    inputWrapper: "border-[0.8px]",
                    input: "text-xs",
                  }}
                />
                <div className="text-danger text-[0.7rem] mt-1">
                  {formError.email}
                </div>
              </div>

              <div>
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Jabatan <span className="text-danger">*</span>
                  </label>
                </div>
                <Autocomplete
                  aria-label="pegawai"
                  placeholder="Cari jabatan"
                  variant="bordered"
                  radius="sm"
                  defaultItems={JABATAN_SELECT}
                  selectedKey={String(formData.jabatan)}
                  onSelectionChange={(value) =>
                    setFormData({ ...formData, jabatan: value as string })
                  }
                  inputProps={{
                    classNames: {
                      input: "text-xs",
                      inputWrapper: "border-[0.8px]",
                    },
                  }}
                >
                  {(peg) => (
                    <AutocompleteItem key={peg.id} textValue={peg.nama}>
                      {peg.nama}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <div className="text-xs italic text-danger">
                  {formError.jabatan}
                </div>
              </div>
              <div>
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Eselon <span className="text-danger">*</span>
                  </label>
                </div>
                <Autocomplete
                  aria-label="pegawai"
                  placeholder="Cari eselon"
                  variant="bordered"
                  radius="sm"
                  defaultItems={ESELON_SELECT}
                  selectedKey={String(formData.eselon)}
                  onSelectionChange={(value) =>
                    setFormData({ ...formData, eselon: value as string })
                  }
                  inputProps={{
                    classNames: {
                      input: "text-xs",
                      inputWrapper: "border-[0.8px]",
                    },
                  }}
                >
                  {(peg) => (
                    <AutocompleteItem key={peg.id} textValue={peg.nama}>
                      {peg.nama}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <div className="text-xs italic text-danger">
                  {formError.eselon}
                </div>
              </div>
              
              <div>
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Kontak/No. Whatsapp <span className="text-danger">*</span>
                  </label>
                </div>
                <Input
                  value={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                  aria-label="Judul"
                  labelPlacement="outside"
                  placeholder="Masukkan disini"
                  variant="bordered"
                  radius="sm"
                  classNames={{
                    inputWrapper: "border-[0.8px]",
                    input: "text-xs",
                  }}
                />
                <div className="text-danger text-[0.7rem] mt-1">
                  {formError.whatsapp}
                </div>
              </div>
              <div>
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Status Kepegawaian <span className="text-danger">*</span>
                  </label>
                </div>
                <Select
                  selectedKeys={[formData.isActive ? "true" : "false"]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isActive:
                        (e.target.value as string) === "true" ? true : false,
                    })
                  }
                  aria-label="Judul"
                  labelPlacement="outside"
                  placeholder="Pilih role"
                  variant="bordered"
                  radius="sm"
                  classNames={{
                    trigger: "text-xs border-[0.8px]",
                    value: "text-xs",
                  }}
                >
                  <SelectItem key={"true"}>Aktif</SelectItem>
                  <SelectItem key={"false"}>Tidak Aktif</SelectItem>
                </Select>
                <div className="text-danger text-[0.7rem] mt-1">
                  {formError.isActive}
                </div>
              </div>
            </div>
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
          </form>
        </div>
      </div>
    </>
  );
}
