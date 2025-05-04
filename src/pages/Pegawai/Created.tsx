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
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  useDisclosure,
  Switch,
} from "@heroui/react";
import { LuArrowLeft, LuImage, LuSave } from "react-icons/lu";
import ConfirmModal from "@/components/modals/UtilsModal/ConfirmModal";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { useNavigate } from "react-router-dom";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link } from "react-router-dom";
import {
  statusKepegawaianData,
  RoleAccess,
  pendidikanTerakhir,
  GolonganData,
  PangkatData,
} from "@/constants/DummyData";
import { LucideEye, LucideEyeClosed, LucideXCircle } from "lucide-react";
import { convertFileToBase64 } from "@/utils/base64Formater";
import { FaCheckCircle } from "react-icons/fa";
import { useGetAllJabatanOption } from "@/services/jabatan";
import { useCreatePegawai } from "@/services/pegawai";
import { StorePegawai } from "@/interface/request/pegawai.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { capitalizeWords } from "@/utils/formatBreadcrumbsTitle";

interface formProps {
  role: string;
  nama: string;
  nip: string;
  gender?: string | null;
  jabatan: string;
  tingkatanJabatan?: string | null;
  asnStatus: boolean;
  pangkat?: string | null;
  golongan: string;
  statusPegawai: string;
  password: string;
  passwordConfirmation: string;
  noTelp?: string | null;
  email: string;
  isActive: boolean;
  tempatLahir?: string | null;
  tanggalLahir?: string | null;
  pendidikanTerakhir?: string | null;
  usiaPensiun?: number | null;
  tanggalPensiun?: string | null;
  foto?: string | null;
  isFungsional: boolean;
}

interface errorProps {
  role?: string;
  nama?: string;
  nip?: string;
  gender?: string;
  jabatan?: string;
  tingkatanJabatan?: string;
  asnStatus?: string;
  pangkat?: string;
  golongan?: string;
  statusPegawai?: string;
  password?: string;
  passwordConfirmation?: string;
  noTelp?: string;
  email?: string;
  isActive?: string;
  tempatLahir?: string;
  tanggalLahir?: string;
  pendidikanTerakhir?: string;
  usiaPensiun?: string;
  tanggalPensiun?: string;
  foto?: string;
}

export default function CreatePegawai() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<formProps>({
    role: "",
    nama: "",
    nip: "",
    gender: null,
    jabatan: "",
    tingkatanJabatan: "",
    asnStatus: false,
    pangkat: null,
    golongan: "",
    statusPegawai: "",
    password: "",
    passwordConfirmation: "",
    noTelp: null,
    email: "",
    isActive: true,
    tempatLahir: null,
    tanggalLahir: null,
    pendidikanTerakhir: null,
    usiaPensiun: null,
    tanggalPensiun: null,
    foto: null,
    isFungsional: false,
  });

  const [formError, setFormError] = useState<errorProps>({});

  const {
    data: allDataJabatan,
    isFetching: isFetchingJabatan,
    refetch: refetchJabatan,
  } = useGetAllJabatanOption();
  const JABATAN_SELECT = useMemo(() => {
    if (!allDataJabatan) return [];
    return allDataJabatan.data;
  }, [allDataJabatan]);

  const allStatusPegawai = statusKepegawaianData;
  const STATUS_PEGAWAI = useMemo(() => {
    return allStatusPegawai;
  }, [allStatusPegawai]);

  const allGolongan = GolonganData;
  const DATA_GOLONGAN = useMemo(() => {
    return allGolongan;
  }, [allGolongan]);

  const allPangkat = PangkatData;
  const DATA_PANGKAT = useMemo(() => {
    return allPangkat;
  }, [allPangkat]);

  const pendidikanData = pendidikanTerakhir;
  const PENDIDIKAN_SELECT = useMemo(() => {
    return pendidikanData;
  }, [pendidikanData]);

  const rules = () => {
    const error: errorProps = {};

    if (!formData.role) error.role = "Role / hak akses tidak boleh kosong";
    if (!formData.nama) error.nama = "Nama pegawai tidak boleh kosong";
    if (!formData.nip) error.nip = "NIP tidak boleh kosong";
    if (!formData.email) error.email = "Email tidak boleh kosong";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      error.email = "Format email tidak valid";
    }
    if (!formData.jabatan) error.jabatan = "Jabatan tidak boleh kosong";
    if (formData.asnStatus === null || formData.asnStatus === undefined)
      error.asnStatus = "Status ASN harus dipilih";
    if (!formData.gender) error.gender = "Jenis kelamin tidak boleh kosong";
    // if (!formData.foto) error.foto = "Foto pegawai tidak boleh kosong";
    if (!formData.noTelp) error.noTelp = "Nomor Telepon tidak boleh kosong";
    else if (!/^08\d{8,11}$/.test(formData.noTelp)) {
      error.noTelp = "Format nomor Telepon tidak valid";
    }
    if (formData.isActive === null || formData.isActive === undefined)
      error.isActive = "Status aktif harus dipilih";
    if (!formData.password) error.password = "Password tidak boleh kosong";
    else if (formData.password.length < 8)
      error.password = "Password minimal 8 karakter";
    if (!formData.passwordConfirmation)
      error.passwordConfirmation = "Konfirmasi password tidak boleh kosong";
    else if (formData.password !== formData.passwordConfirmation)
      error.passwordConfirmation = "Konfirmasi password tidak sama";

    return error;
  };

  useEffect(() => {
    setFormData({
      role: "",
      nama: "",
      nip: "",
      gender: null,
      jabatan: "",
      tingkatanJabatan: "",
      asnStatus: false,
      pangkat: null,
      golongan: "",
      statusPegawai: "",
      password: "",
      passwordConfirmation: "",
      noTelp: null,
      email: "",
      isActive: true,
      tempatLahir: null,
      tanggalLahir: null,
      pendidikanTerakhir: null,
      usiaPensiun: null,
      tanggalPensiun: null,
      foto: null,
      isFungsional: false,
    });
    setShowPassword(false);
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

  const { mutate: mutatePost } = useCreatePegawai();

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

    const formToSend: StorePegawai = {};

    if (formData.nama) formToSend.name = formData.nama;
    if (formData.email) formToSend.email = formData.email;
    if (formData.password) formToSend.password = formData.password;
    if (formData.nip) formToSend.nip = formData.nip;
    if (formData.role) formToSend.role = formData.role;
    if (formData.noTelp) formToSend.phoneNumber = formData.noTelp;
    if (formData.tanggalLahir) {
      formToSend.dateOfBirth = formData.tanggalLahir;
    } else {
      formToSend.dateOfBirth = null;
    }
    if (formData.tempatLahir) formToSend.tempatLahir = formData.tempatLahir;
    if (formData.pangkat) formToSend.rank = formData.pangkat;
    if (formData.golongan) formToSend.group = formData.golongan;
    if (formData.gender) formToSend.gender = formData.gender;

    if (formData.jabatan) formToSend.position = Number(formData.jabatan);
    if (formData.pendidikanTerakhir)
      formToSend.education = formData.pendidikanTerakhir;
    if (formData.usiaPensiun) formToSend.pensionAge = formData.usiaPensiun;
    if (formData.tanggalPensiun) {
      formToSend.pensionDate = formData.tanggalPensiun;
    } else {
      formToSend.pensionDate = null;
    }
    if (formData.foto) formToSend.photo = formData.foto;
    if (formData.statusPegawai)
      formToSend.employmentStatus = formData.statusPegawai;
    formToSend.status = formData.isActive;
    formToSend.statusAsn = formData.asnStatus;

    try {
      mutatePost(formToSend, {
        onSuccess: () => {
          SuccessToast({ text: "Data berhasil ditambahkan" });
          navigate("/pegawai");
        },
        onError: (error: AxiosError<BaseErrorRes>) => {
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

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileToShow = await convertFileToBase64(file);
      setFormData({ ...formData, foto: fileToShow });
    } else {
      setFormData({ ...formData, foto: "" });
    }
  };

  useEffect(() => {
    if (formData.jabatan) {
      if (
        JABATAN_SELECT.find((it) => it.id === Number(formData.jabatan))
          ?.fungsional
      ) {
        setFormData({ ...formData, isFungsional: true });
      } else {
        setFormData({ ...formData, isFungsional: false });
      }
    } else {
      setFormData({ ...formData, isFungsional: false });
    }
  }, [formData.jabatan]);
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

        <div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Card shadow="none" className="border p-4">
              <CardHeader className="text-sm font-semibold">
                Data Pegawai
              </CardHeader>
              <CardBody>
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
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
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
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
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        NIP Pegawai <span className="text-danger">*</span>
                      </label>
                    </div>
                    <Input
                      value={formData.nip}
                      onChange={(e) =>
                        setFormData({ ...formData, nip: e.target.value })
                      }
                      type="number"
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
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        Jenis Kelamin <span className="text-danger">*</span>
                      </label>
                    </div>
                    <Select
                      selectedKeys={[formData.gender || ""]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gender: e.target.value,
                        })
                      }
                      aria-label="Judul"
                      labelPlacement="outside"
                      placeholder="Pilih disini"
                      variant="bordered"
                      radius="sm"
                      classNames={{
                        trigger: "border-[0.8px]",
                        value: "text-xs",
                      }}
                    >
                      <SelectItem key={"LAKI_LAKI"}>Laki - Laki</SelectItem>
                      <SelectItem key={"PEREMPUAN"}>Perempuan</SelectItem>
                    </Select>
                    <div className="text-xs italic text-danger">
                      {formError.gender}
                    </div>
                  </div>
                  <div className="sm:col-span-2 flex sm:flex-row flex-col gap-2">
                    <div className="flex-1">
                      <div className="mb-1">
                        <label
                          htmlFor="content"
                          className="font-semibold text-xs"
                        >
                          Jabatan <span className="text-danger">*</span>
                        </label>
                      </div>
                      <Autocomplete
                        isLoading={isFetchingJabatan}
                        aria-label="pegawai"
                        id="pegawai"
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
                        menuTrigger="focus"
                        itemHeight={40}
                        listboxProps={{
                          itemClasses: {
                            base: "min-h-[56px] py-2 text-sm leading-snug", // Atur tinggi item
                            title: "text-xs font-medium",
                          },
                        }}
                      >
                        {(peg) => (
                          <AutocompleteItem
                            key={peg.id}
                            textValue={`${peg.nameJob}${peg.parent ? ` - (ATASAN: ${peg.parent.nameJob ?? ""})` : ""}`}
                          >
                            {capitalizeWords(peg.nameJob)}
                            {peg.parent &&
                              ` - (Atasan: ${capitalizeWords(peg.parent.nameJob ?? "")})`}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>

                      <div className="text-xs italic text-danger">
                        {formError.jabatan}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        Status ASN <span className="text-danger">*</span>
                      </label>
                    </div>
                    <RadioGroup
                      size="sm"
                      value={formData.asnStatus ? "ASN" : "NON-ASN"}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          asnStatus: e.target.value === "ASN" ? true : false,
                        }))
                      }
                      orientation="horizontal"
                      className="ms-4"
                    >
                      <Radio value={"ASN"} key={"ASN"}>
                        ASN
                      </Radio>
                      <Radio value={"NON-ASN"} key={"NON-ASN"}>
                        Non-ASN
                      </Radio>
                    </RadioGroup>
                  </div>
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        Pangkat
                      </label>
                    </div>
                    <Select
                      selectedKeys={[formData.pangkat || ""]}
                      onChange={(e) =>
                        setFormData({ ...formData, pangkat: e.target.value })
                      }
                      aria-label="Judul"
                      labelPlacement="outside"
                      placeholder="Pilih pangkat"
                      variant="bordered"
                      radius="sm"
                      classNames={{
                        trigger: "text-xs border-[0.8px]",
                        value: "text-xs",
                      }}
                    >
                      {DATA_PANGKAT.map((item) => (
                        <SelectItem key={item.nama}>{item.nama}</SelectItem>
                      ))}
                    </Select>
                    <div className="text-xs italic text-danger">
                      {formError.pangkat}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        Golongan
                      </label>
                    </div>
                    <Select
                      selectedKeys={[formData.golongan || ""]}
                      onChange={(e) =>
                        setFormData({ ...formData, golongan: e.target.value })
                      }
                      aria-label="Judul"
                      labelPlacement="outside"
                      placeholder="Pilih golongan"
                      variant="bordered"
                      radius="sm"
                      classNames={{
                        trigger: "text-xs border-[0.8px]",
                        value: "text-xs",
                      }}
                    >
                      {DATA_GOLONGAN.map((item) => (
                        <SelectItem key={item.key}>{item.nama}</SelectItem>
                      ))}
                    </Select>
                    <div className="text-xs italic text-danger">
                      {formError.golongan}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        Status Kepegawaian
                      </label>
                    </div>
                    <Select
                      selectedKeys={[formData.statusPegawai]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          statusPegawai: e.target.value,
                        })
                      }
                      aria-label="Judul"
                      labelPlacement="outside"
                      placeholder="Pilih disini"
                      variant="bordered"
                      radius="sm"
                      classNames={{
                        trigger: "border-[0.8px]",
                        value: "text-xs",
                      }}
                    >
                      {STATUS_PEGAWAI.map((item) => (
                        <SelectItem key={item.key}>{item.name}</SelectItem>
                      ))}
                    </Select>
                    <div className="text-xs italic text-danger">
                      {formError.statusPegawai}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        Password <span className="text-danger">*</span>
                      </label>
                    </div>
                    <Input
                      type={showPassword ? "text" : "password"}
                      endContent={
                        showPassword ? (
                          <LucideEyeClosed
                            className="cursor-pointer"
                            onClick={() => setShowPassword(false)}
                          />
                        ) : (
                          <LucideEye
                            className="cursor-pointer"
                            onClick={() => setShowPassword(true)}
                          />
                        )
                      }
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
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
                      {formError.password}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        Confirm Password <span className="text-danger">*</span>
                      </label>
                    </div>
                    <Input
                      type={showPassword ? "text" : "password"}
                      endContent={
                        showPassword ? (
                          <LucideEyeClosed
                            className="cursor-pointer"
                            onClick={() => setShowPassword(false)}
                          />
                        ) : (
                          <LucideEye
                            className="cursor-pointer"
                            onClick={() => setShowPassword(true)}
                          />
                        )
                      }
                      value={formData.passwordConfirmation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          passwordConfirmation: e.target.value,
                        })
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
                      {formError.passwordConfirmation}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        Kontak/No. Whatsapp{" "}
                        <span className="text-danger">*</span>
                      </label>
                    </div>
                    <Input
                      type="number"
                      value={formData.noTelp || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, noTelp: e.target.value })
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
                      {formError.noTelp}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
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
                </div>
              </CardBody>
            </Card>
            <Card shadow="none" className="border p-4">
              <CardHeader className="text-sm font-semibold">
                Data Lainnya
              </CardHeader>
              <CardBody>
                <div className="grid sm:grid-cols-6 grid-cols-1 gap-2">
                  <div className="sm:col-span-2 col-span-1">
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        Tempat Lahir
                      </label>
                    </div>
                    <Input
                      value={formData.tempatLahir || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tempatLahir: e.target.value,
                        })
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
                      {formError.tempatLahir}
                    </div>
                  </div>
                  <div className="sm:col-span-2 col-span-1">
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        Tanggal Lahir
                      </label>
                    </div>
                    <Input
                      type="date"
                      value={formData.tanggalLahir || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tanggalLahir: e.target.value,
                        })
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
                      {formError.tanggalLahir}
                    </div>
                  </div>
                  <div className="sm:col-span-2 col-span-1">
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        Pendidikan Terakhir
                      </label>
                    </div>
                    <Autocomplete
                      aria-label="pendidikan"
                      id="pendidikan"
                      placeholder="Pilih disini"
                      variant="bordered"
                      radius="sm"
                      defaultItems={PENDIDIKAN_SELECT}
                      selectedKey={String(formData.pendidikanTerakhir)}
                      onSelectionChange={(value) =>
                        setFormData({
                          ...formData,
                          pendidikanTerakhir: value as string,
                        })
                      }
                      inputProps={{
                        classNames: {
                          input: "text-xs",
                          inputWrapper: "border-[0.8px]",
                        },
                      }}
                    >
                      {(peg) => (
                        <AutocompleteItem key={peg.key} textValue={peg.name}>
                          {peg.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                    <div className="text-xs italic text-danger">
                      {formError.pendidikanTerakhir}
                    </div>
                  </div>
                  <div className="sm:col-span-3 col-span-1">
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        Usia Pensiun
                      </label>
                    </div>
                    <Input
                      type="number"
                      value={String(formData.usiaPensiun || "")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          usiaPensiun: Number(e.target.value),
                        })
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
                      {formError.usiaPensiun}
                    </div>
                  </div>
                  <div className="sm:col-span-3 col-span-1">
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        Tanggal Pensium
                      </label>
                    </div>
                    <Input
                      type="date"
                      value={formData.tanggalPensiun || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tanggalPensiun: e.target.value,
                        })
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
                      {formError.tanggalPensiun}
                    </div>
                  </div>
                  <div className="sm:col-span-6 col-span-1">
                    <div className="max-w-80">
                      <div className="mb-1">
                        <label
                          htmlFor="content"
                          className="font-semibold text-xs"
                        >
                          Foto
                        </label>
                      </div>
                      <div className="border p-8 mb-2 flex items-center justify-center">
                        {formData.foto ? (
                          <img src={formData.foto} className="rounded-lg" />
                        ) : (
                          <LuImage size={32} />
                        )}
                      </div>
                      <input
                        type="file"
                        onChange={handleChangeImage}
                        accept=".png,.jpg,.jpeg"
                      />
                      <div className="text-danger text-[0.7rem] mt-1">
                        {formError.foto}
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
            <div>
              <div className="mb-1">
                <label htmlFor="content" className="font-semibold text-xs">
                  Status <span className="text-danger">*</span>
                </label>
              </div>
              <Switch
                aria-label="status"
                isSelected={formData.isActive}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: e.target.checked,
                  }))
                }
                color="primary"
                size="lg"
                thumbIcon={({ isSelected }) =>
                  isSelected ? (
                    <FaCheckCircle className={"text-primary"} />
                  ) : (
                    <LucideXCircle className={"text-danger"} />
                  )
                }
              />
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
