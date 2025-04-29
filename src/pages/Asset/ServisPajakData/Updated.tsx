import { useEffect, useState } from "react";
import { TitleCase } from "@/components/card/TitleCase";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { LuArchiveRestore, LuArrowLeft, LuImage, LuSave } from "react-icons/lu";
import ConfirmModal from "@/components/modals/UtilsModal/ConfirmModal";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { useNavigate, useParams } from "react-router-dom";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link } from "react-router-dom";
import { convertFileToBase64 } from "@/utils/base64Formater";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { Commet } from "react-loading-indicators";
import { useGetDetailAsset, useUpdateAsset } from "@/services/asset/asset";
import { StoreAsset } from "@/interface/request/asset.interface";

interface formProps {
  idBarang?: string;
  kodeBarang?: string;
  namaBarang?: string;
  nomorRegistrasi?: string;
  harga?: number;
  merkTipe?: string;
  ukuranCC?: string;
  jenisBahan?: string;
  nomorPabrik?: string;
  nomorRangka?: string;
  nomorMesin?: string;
  nomorPolisi?: string;
  dokumenTipe?: string;
  dokumenNomor?: string;
  keterangan?: string;
  tahunPerolehan?: string;
  kategori?: string;
  dokumen?: string;
}

interface errorProps {
  idBarang?: string;
  kodeBarang?: string;
  namaBarang?: string;
  nomorRegistrasi?: string;
  harga?: string;
  merkTipe?: string;
  ukuranCC?: string;
  jenisBahan?: string;
  nomorPabrik?: string;
  nomorRangka?: string;
  nomorMesin?: string;
  nomorPolisi?: string;
  dokumenTipe?: string;
  dokumenNomor?: string;
  keterangan?: string;
  tahunPerolehan?: string;
  kategori?: string;
  dokumen?: string;
}

export default function CreatePegawai() {
  const { id } = useParams();

  const [foto, setFoto] = useState<string>("");

  const navigate = useNavigate();

  const { data, isFetching, refetch, error } = useGetDetailAsset(id || "");
  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/manajemen-aset");
    }
  }, [isFetching, refetch]);

  const [formData, setFormData] = useState<formProps>({
    idBarang: "",
    kodeBarang: "",
    namaBarang: "",
    nomorRegistrasi: "",
    harga: 0,
    merkTipe: "",
    ukuranCC: "",
    jenisBahan: "",
    nomorPabrik: "",
    nomorRangka: "",
    nomorMesin: "",
    nomorPolisi: "",
    dokumenTipe: "",
    dokumenNomor: "",
    keterangan: "",
    tahunPerolehan: "",
    kategori: "",
    dokumen: "",
  });

  const [formError, setFormError] = useState<errorProps>({});

  const rules = () => {
    const error: errorProps = {};
    if (!formData.idBarang) error.idBarang = "ID Barang tidak boleh kosong";
    if (!formData.kodeBarang)
      error.kodeBarang = "Kode Barang tidak boleh kosong";
    if (!formData.nomorRegistrasi)
      error.nomorRegistrasi = "Nomor registrasi tidak boleh kosong";
    if (!formData.kategori) error.kategori = "Kategori tidak boleh kosong";
    if (!formData.namaBarang)
      error.namaBarang = "Nama Barang tidak boleh kosong";
    if (!formData.merkTipe) error.merkTipe = "Merk/Tipe tidak boleh kosong";
    return error;
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data) {
      setFormData({
        idBarang: data.data.idBarang,
        kodeBarang: data.data.kodeBarang,
        namaBarang: data.data.namaBarang,
        nomorRegistrasi: data.data.nomorRegistrasi,
        harga: data.data.harga,
        merkTipe: data.data.merkTipe,
        ukuranCC: data.data.ukuranCC,
        jenisBahan: data.data.jenisBahan,
        nomorPabrik: data.data.nomorPabrik,
        nomorRangka: data.data.nomorRangka,
        nomorMesin: data.data.nomorMesin,
        nomorPolisi: data.data.nomorPolisi,
        dokumenTipe: data.data.dokumenTipe,
        dokumenNomor: data.data.dokumenNomor,
        keterangan: data.data.keterangan,
        tahunPerolehan: data.data.tahunPerolehan
          ? String(new Date(data.data.tahunPerolehan).getFullYear())
          : "",
        kategori: data.data.kategori,
        dokumen: "",
      });
      setFoto(data.data.dokumen ?? "");
    }
  }, [id, data]);

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

  const { mutate: mutatePost } = useUpdateAsset();

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

    const formToSend: StoreAsset = {};

    if (formData.idBarang) formToSend.idBarang = formData.idBarang;
    if (formData.kodeBarang) formToSend.kodeBarang = formData.kodeBarang;
    if (formData.namaBarang) formToSend.namaBarang = formData.namaBarang;
    if (formData.nomorRegistrasi)
      formToSend.nomorRegistrasi = formData.nomorRegistrasi;
    if (formData.harga) formToSend.harga = formData.harga;
    if (formData.merkTipe) formToSend.merkTipe = formData.merkTipe;
    if (formData.ukuranCC) formToSend.ukuranCC = formData.ukuranCC;
    if (formData.jenisBahan) formToSend.jenisBahan = formData.jenisBahan;
    if (formData.nomorPabrik) formToSend.nomorPabrik = formData.nomorPabrik;
    if (formData.nomorRangka) formToSend.nomorRangka = formData.nomorRangka;
    if (formData.nomorMesin) formToSend.nomorMesin = formData.nomorMesin;
    if (formData.nomorPolisi) formToSend.nomorPolisi = formData.nomorPolisi;
    if (formData.dokumenTipe) formToSend.dokumenTipe = formData.dokumenTipe;
    if (formData.dokumenNomor) formToSend.dokumenNomor = formData.dokumenNomor;
    if (formData.keterangan) formToSend.keterangan = formData.keterangan;
    if (formData.tahunPerolehan)
      formToSend.tahunPerolehan = formData.tahunPerolehan;
    if (formData.kategori) formToSend.kategori = formData.kategori;
    if (formData.dokumen) formToSend.dokumen = formData.dokumen;

    try {
      mutatePost(
        {
          id: id as string,
          formData: formToSend,
        },
        {
          onSuccess: () => {
            SuccessToast({ text: "Data berhasil diperbarui" });
            navigate("/manajemen-aset");
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
        },
      );
    } catch (error) {
      setLoadingConfirm(false);
      onCloseConfirm();
      throw error;
    }
  };

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileToShow = await convertFileToBase64(file);
      setFormData({ ...formData, dokumen: fileToShow });
    } else {
      setFormData({ ...formData, dokumen: "" });
    }
  };

  return (
    <>
      <BreadcrumbAdmin location="/Manajemen-Aset/Tambah-Data-Servis" />
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        isLoading={isLoadingConfirm}
        handleSubmit={handleConfirm}
      />

      {isFetching && (
        <div className="inset-0 fixed flex items-center justify-center z-20">
          <Commet color="#32cd32" size="medium" text="" textColor="" />
        </div>
      )}

      <div className="md:p-8 p-4 grid grid-cols-1 gap-8 relative z-10">
        <div className="flex">
          <Link
            to={`/manajemen-aset?tab=servis`}
            className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
          >
            <LuArrowLeft /> Kembali
          </Link>
        </div>
        <TitleCase
          title="Edit Aset"
          text="Digunakan Untuk Memperbarui Data Aset"
        />

        <div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Card shadow="none" className="border p-4">
              <CardBody className="flex flex-col gap-2">
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-2">
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        ID Barang / Kendaraan{" "}
                        <span className="text-danger">*</span>
                      </label>
                    </div>
                    <Input
                      value={formData.idBarang}
                      onChange={(e) =>
                        setFormData({ ...formData, idBarang: e.target.value })
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
                      {formError.idBarang}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        Kode Barang / Kendaraan{" "}
                        <span className="text-danger">*</span>
                      </label>
                    </div>
                    <Input
                      value={formData.kodeBarang}
                      onChange={(e) =>
                        setFormData({ ...formData, kodeBarang: e.target.value })
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
                      {formError.kodeBarang}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        Nomor Registrasi <span className="text-danger">*</span>
                      </label>
                    </div>
                    <Input
                      value={formData.nomorRegistrasi}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nomorRegistrasi: e.target.value,
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
                      {formError.nomorRegistrasi}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        Kategori / Jenis Aset{" "}
                        <span className="text-danger">*</span>
                      </label>
                    </div>
                    <Select
                      selectedKeys={[formData.kategori || ""]}
                      onChange={(e) =>
                        setFormData({ ...formData, kategori: e.target.value })
                      }
                      aria-label="Judul"
                      labelPlacement="outside"
                      placeholder="Masukkan disini"
                      variant="bordered"
                      radius="sm"
                      classNames={{
                        trigger: "border-[0.8px]",
                        value: "text-xs",
                      }}
                    >
                      <SelectItem key={"PERALATAN"}>
                        Peralatan Kantor/Mesin
                      </SelectItem>
                      <SelectItem key={"KENDARAAN"}>Kendaraan</SelectItem>
                    </Select>
                    <div className="text-danger text-[0.7rem] mt-1">
                      {formError.kategori}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        Nama Barang / Kendaraan{" "}
                        <span className="text-danger">*</span>
                      </label>
                    </div>
                    <Input
                      value={formData.namaBarang}
                      onChange={(e) =>
                        setFormData({ ...formData, namaBarang: e.target.value })
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
                      {formError.namaBarang}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        Merk/Tipe <span className="text-danger">*</span>
                      </label>
                    </div>
                    <Input
                      value={formData.merkTipe}
                      onChange={(e) =>
                        setFormData({ ...formData, merkTipe: e.target.value })
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
                      {formError.merkTipe}
                    </div>
                  </div>
                </div>
                <Divider className="my-2" />
                {formData.kategori && (
                  <div className="grid sm:grid-cols-6 grid-cols-1 gap-2">
                    <div className="sm:col-span-3 col-span-1">
                      <div className="mb-1">
                        <label
                          htmlFor="content"
                          className="font-semibold text-xs"
                        >
                          Harga
                        </label>
                      </div>
                      <Input
                        type="number"
                        value={String(formData.harga)}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            harga: Number(e.target.value),
                          })
                        }
                        startContent={"Rp"}
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
                        {formError.harga}
                      </div>
                    </div>
                    <div className="sm:col-span-3 col-span-1">
                      <div className="mb-1">
                        <label
                          htmlFor="content"
                          className="font-semibold text-xs"
                        >
                          Tahun Perolehan
                        </label>
                      </div>
                      <Input
                        type="number"
                        value={formData.tahunPerolehan}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            tahunPerolehan: e.target.value,
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
                        {formError.tahunPerolehan}
                      </div>
                    </div>
                    <div className="sm:col-span-2 col-span-1">
                      <div className="mb-1">
                        <label
                          htmlFor="content"
                          className="font-semibold text-xs"
                        >
                          Jenis Bahan
                        </label>
                      </div>
                      <Input
                        value={formData.jenisBahan}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            jenisBahan: e.target.value,
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
                        {formError.jenisBahan}
                      </div>
                    </div>
                    <div className="sm:col-span-2 col-span-1">
                      <div className="mb-1">
                        <label
                          htmlFor="content"
                          className="font-semibold text-xs"
                        >
                          Nomor Pabrik
                        </label>
                      </div>
                      <Input
                        value={formData.nomorPabrik}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nomorPabrik: e.target.value,
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
                        {formError.nomorPabrik}
                      </div>
                    </div>
                    <div className="sm:col-span-2 col-span-1">
                      <div className="mb-1">
                        <label
                          htmlFor="content"
                          className="font-semibold text-xs"
                        >
                          Nomor Mesin / Barang
                        </label>
                      </div>
                      <Input
                        value={formData.nomorMesin}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nomorMesin: e.target.value,
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
                        {formError.nomorMesin}
                      </div>
                    </div>
                    {formData.kategori === "KENDARAAN" && (
                      <div className="sm:col-span-2 col-span-1">
                        <div className="mb-1">
                          <label
                            htmlFor="content"
                            className="font-semibold text-xs"
                          >
                            Ukuran / CC
                          </label>
                        </div>
                        <Input
                          value={formData.ukuranCC}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              ukuranCC: e.target.value,
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
                          {formError.ukuranCC}
                        </div>
                      </div>
                    )}
                    {formData.kategori === "KENDARAAN" && (
                      <div className="sm:col-span-2 col-span-1">
                        <div className="mb-1">
                          <label
                            htmlFor="content"
                            className="font-semibold text-xs"
                          >
                            Nomor Rangka
                          </label>
                        </div>
                        <Input
                          value={formData.nomorRangka}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              nomorRangka: e.target.value,
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
                          {formError.nomorRangka}
                        </div>
                      </div>
                    )}
                    {formData.kategori === "KENDARAAN" && (
                      <div className="sm:col-span-2 col-span-1">
                        <div className="mb-1">
                          <label
                            htmlFor="content"
                            className="font-semibold text-xs"
                          >
                            Nomor Polisi
                          </label>
                        </div>
                        <Input
                          value={formData.nomorPolisi}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              nomorPolisi: e.target.value,
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
                          {formError.nomorPolisi}
                        </div>
                      </div>
                    )}
                    {formData.kategori === "KENDARAAN" && (
                      <div className="sm:col-span-6 col-span-1 flex sm:flex-row flex-col w-full gap-2">
                        <div className="min-w-40">
                          <div className="mb-2">
                            <label
                              htmlFor="content"
                              className="font-semibold text-xs"
                            >
                              Pilih BPKB/STNK
                            </label>
                          </div>
                          <RadioGroup
                            size="sm"
                            value={formData.dokumenTipe}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                dokumenTipe: e.target.value,
                              }))
                            }
                            orientation="horizontal"
                          >
                            <Radio value={"BPKB"} key={"BPKB"}>
                              BPKB
                            </Radio>
                            <Radio value={"STNK"} key={"STNK"}>
                              STNK
                            </Radio>
                          </RadioGroup>
                          <div className="text-xs italic text-danger">
                            {formError.dokumenTipe}
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="mb-1">
                            <label
                              htmlFor="content"
                              className="font-semibold text-xs"
                            >
                              Nomor BPKB/STNK
                            </label>
                          </div>
                          <Input
                            value={formData.dokumenNomor}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                dokumenNomor: e.target.value,
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
                            {formError.dokumenNomor}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="sm:col-span-6 col-span-1">
                      <div className="mb-1">
                        <label
                          htmlFor="content"
                          className="font-semibold text-xs"
                        >
                          Keterangan Aset
                        </label>
                      </div>
                      <Input
                        value={formData.keterangan}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            keterangan: e.target.value,
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
                        {formError.keterangan}
                      </div>
                    </div>
                    <div className="sm:col-span-6 col-span-1">
                      <div className="max-w-80">
                        <div className="mb-1">
                          <label
                            htmlFor="content"
                            className="font-semibold text-xs"
                          >
                            Dokumen Aset
                          </label>
                        </div>
                        <div className="border p-8 mb-2 flex items-center justify-center">
                          {formData.dokumen ? (
                            <LuArchiveRestore size={32} />
                          ) : foto ? (
                            <LuArchiveRestore size={32} />
                          ) : (
                            <LuImage size={32} />
                          )}
                        </div>
                        <input
                          type="file"
                          onChange={handleChangeFile}
                          accept=".png,.jpg,.jpeg,.pdf"
                        />
                        <div className="text-danger text-[0.7rem] mt-1">
                          {formError.dokumen}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
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
