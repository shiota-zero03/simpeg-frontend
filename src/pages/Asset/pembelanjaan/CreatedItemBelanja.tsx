import { useEffect, useMemo, useState } from "react";
import { TitleCase } from "@/components/card/TitleCase";
import {
  Button,
  Card,
  CardBody,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  useDisclosure,
  Divider,
  Autocomplete,
  AutocompleteItem,
  CardHeader,
} from "@heroui/react";
import { LuArchiveRestore, LuArrowLeft, LuImage, LuSave } from "react-icons/lu";
import ConfirmModal from "@/components/modals/UtilsModal/ConfirmModal";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { useNavigate } from "react-router-dom";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link } from "react-router-dom";
import { convertFileToBase64 } from "@/utils/base64Formater";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreAsset } from "@/interface/request/asset.interface";
import { useGetAllKegiatanBelanjaOption } from "@/services/asset/asset-pembelanjaan/data-item-belanja";
import { useCreateDataBelanja } from "@/services/asset/asset-pembelanjaan/data-pembelanjaan";
import { StoreDataBelanja } from "@/interface/request/assetPembelanjaan";

interface formProps {
  name?: string;
  idDataBelanja?: number | null;
  tanggal?: string;
  jumlah?: number;
  satuan?: string;
  hargaPerItem?: number;
  jumlahPagu?: number;

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
  name?: string;
  idDataBelanja?: string;
  tanggal?: string;
  jumlah?: string;
  satuan?: string;
  hargaPerItem?: string;
  jumlahPagu?: string;

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
  const [formData, setFormData] = useState<formProps>({
    name: "",
    idDataBelanja: null,
    tanggal: "",
    jumlah: 1,
    satuan: "",
    hargaPerItem: 0,
    jumlahPagu: 0,

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
    if (!formData.idDataBelanja) {
      error.idDataBelanja = "Data belanja harus dipilih";
    }

    if (!formData.tanggal) {
      error.tanggal = "Tanggal tidak boleh kosong";
    }

    if (!formData.jumlah || formData.jumlah <= 0) {
      error.jumlah = "Jumlah harus lebih dari 0";
    }

    if (!formData.satuan) {
      error.satuan = "Satuan tidak boleh kosong";
    }

    if (!formData.hargaPerItem || formData.hargaPerItem <= 0) {
      error.hargaPerItem = "Harga per item harus lebih dari 0";
    }

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
    setFormData({
      name: "",
      idDataBelanja: null,
      tanggal: "",
      jumlah: 1,
      satuan: "",
      hargaPerItem: 0,
      jumlahPagu: 0,
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
  }, []);

  const {
    data: allDataBelanja,
    isFetching: isFetchingBelanja,
    refetch: refetchBelanja,
  } = useGetAllKegiatanBelanjaOption();
  const BELANJA_SELECT = useMemo(() => {
    return allDataBelanja ? allDataBelanja.data : [];
  }, [allDataBelanja]);

  useEffect(() => {
    refetchBelanja();
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

  const { mutate: mutatePost } = useCreateDataBelanja();

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

    const formToSend: StoreDataBelanja = {};

    const formAsset: StoreAsset = {};

    if (formData.idBarang) formAsset.idBarang = formData.idBarang;
    if (formData.kodeBarang) formAsset.kodeBarang = formData.kodeBarang;
    if (formData.namaBarang) formAsset.namaBarang = formData.namaBarang;
    if (formData.nomorRegistrasi)
      formAsset.nomorRegistrasi = formData.nomorRegistrasi;
    if (formData.merkTipe) formAsset.merkTipe = formData.merkTipe;
    if (formData.ukuranCC) formAsset.ukuranCC = formData.ukuranCC;
    if (formData.jenisBahan) formAsset.jenisBahan = formData.jenisBahan;
    if (formData.tahunPerolehan)
      formAsset.tahunPerolehan = formData.tahunPerolehan;
    if (formData.nomorPabrik) formAsset.nomorPabrik = formData.nomorPabrik;
    if (formData.nomorRangka) formAsset.nomorRangka = formData.nomorRangka;
    if (formData.nomorMesin) formAsset.nomorMesin = formData.nomorMesin;
    if (formData.nomorPolisi) formAsset.nomorPolisi = formData.nomorPolisi;
    if (formData.dokumenTipe) formAsset.dokumenTipe = formData.dokumenTipe;
    if (formData.dokumenNomor) formAsset.dokumenNomor = formData.dokumenNomor;

    if (formData.keterangan) formAsset.keterangan = formData.keterangan;
    if (formData.kategori) formAsset.kategori = formData.kategori;
    if (formData.dokumen) formAsset.dokumen = formData.dokumen;
    if (formData.hargaPerItem && formData.jumlah) {
      formAsset.harga = (formData.hargaPerItem || 0) * (formData.jumlah || 0);
    }

    if (formData.name) {
      formToSend.name = formData.name;
    }
    if (formData.idDataBelanja) {
      formToSend.idDataBelanja = Number(formData.idDataBelanja);
    }
    if (formData.namaBarang) {
      formToSend.namaBarang = formData.namaBarang;
    }
    if (formData.tanggal) {
      formToSend.tanggal = formData.tanggal;
    }
    if (formData.jumlah) {
      formToSend.jumlah = formData.jumlah;
    }
    if (formData.satuan) {
      formToSend.satuan = formData.satuan;
    }
    if (formData.hargaPerItem) {
      formToSend.hargaPerItem = formData.hargaPerItem;
    }
    formToSend.asset = formAsset;

    try {
      mutatePost(formToSend, {
        onSuccess: () => {
          SuccessToast({ text: "Data berhasil ditambahkan" });
          navigate(`/manajemen-aset?tab=pembelanjaan&stab=item-belanja`);
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

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileToShow = await convertFileToBase64(file);
      setFormData({ ...formData, dokumen: fileToShow });
    } else {
      setFormData({ ...formData, dokumen: "" });
    }
  };

  const selectedItem = useMemo(() => {
    return (
      BELANJA_SELECT.find((it) => it.id === Number(formData.idDataBelanja)) ||
      null
    );
  }, [BELANJA_SELECT, formData.idDataBelanja]);

  return (
    <>
      <BreadcrumbAdmin location="/Manajemen-Aset/Tambah-Data-Item-Belanja" />
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        isLoading={isLoadingConfirm}
        handleSubmit={handleConfirm}
      />

      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="flex">
          <Link
            to={`/manajemen-aset?tab=pembelanjaan&stab=item-belanja`}
            className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
          >
            <LuArrowLeft /> Kembali
          </Link>
        </div>
        <TitleCase
          title="Tambah Item Belanja"
          text="Digunakan Untuk Menambah Item Belanja yang Terbaru"
        />

        <div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Card shadow="none" className="border p-4">
              <CardBody className="flex flex-col gap-2">
                <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="lokasi" className="text-xs font-semibold">
                      Nama Belanja (Pekerjaan){" "}
                      <span className="text-danger">*</span>
                    </label>
                    <Autocomplete
                      isLoading={isFetchingBelanja}
                      aria-label="pegawai"
                      placeholder="Cari kegiatan"
                      variant="bordered"
                      radius="sm"
                      defaultItems={BELANJA_SELECT}
                      selectedKey={String(formData.idDataBelanja)}
                      onSelectionChange={(value) =>
                        setFormData({
                          ...formData,
                          idDataBelanja: value as number,
                        })
                      }
                      inputProps={{
                        classNames: {
                          input: "text-xs",
                        },
                      }}
                    >
                      {(peg) => (
                        <AutocompleteItem
                          key={peg.id}
                          textValue={peg.namaBelanja}
                        >
                          {peg.namaBelanja}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                    <div className="text-xs italic text-danger">
                      {formError.idDataBelanja}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="lokasi" className="text-xs font-semibold">
                      Nama Kegiatan <span className="text-danger">*</span>
                    </label>
                    <Input
                      isDisabled
                      aria-label="lokasi"
                      variant="bordered"
                      radius="sm"
                      value={selectedItem ? selectedItem.kegiatan.name : ""}
                      placeholder="AUTOFILLED"
                      classNames={{
                        input: "text-xs",
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="lokasi" className="text-xs font-semibold">
                      Nama Sub-Kegiatan <span className="text-danger">*</span>
                    </label>
                    <Input
                      isDisabled
                      aria-label="lokasi"
                      variant="bordered"
                      radius="sm"
                      value={selectedItem ? selectedItem.subKegiatan.name : ""}
                      placeholder="AUTOFILLED"
                      classNames={{
                        input: "text-xs",
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1 md:col-span-3 col-span-1">
                    <label htmlFor="lokasi" className="text-xs font-semibold">
                      Tanggal <span className="text-danger">*</span>
                    </label>
                    <Input
                      aria-label="lokasi"
                      variant="bordered"
                      radius="sm"
                      type="date"
                      value={formData.tanggal}
                      onChange={(e) =>
                        setFormData({ ...formData, tanggal: e.target.value })
                      }
                      placeholder="Masukkan disini"
                      classNames={{
                        input: "text-xs",
                      }}
                    />
                    <div className="text-xs italic text-danger">
                      {formError.tanggal}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card shadow="none" className="border p-4">
              <CardHeader></CardHeader>
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
                    <div className="sm:col-span-2 col-span-1">
                      <div className="mb-1">
                        <label
                          htmlFor="lokasi"
                          className="text-xs font-semibold"
                        >
                          Jumlah Item <span className="text-danger">*</span>
                        </label>
                      </div>
                      <Input
                        isDisabled
                        type="number"
                        aria-label="lokasi"
                        variant="bordered"
                        radius="sm"
                        value={String(formData.jumlah)}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            jumlah: Number(e.target.value),
                          })
                        }
                        placeholder="Masukkan disini"
                        classNames={{
                          input: "text-xs",
                        }}
                      />
                      <div className="text-xs italic text-danger">
                        {formError.jumlah}
                      </div>
                    </div>
                    <div className="sm:col-span-2 col-span-1">
                      <div className="mb-1">
                        <label
                          htmlFor="lokasi"
                          className="text-xs font-semibold"
                        >
                          Satuan Item <span className="text-danger">*</span>
                        </label>
                      </div>
                      <Input
                        aria-label="lokasi"
                        variant="bordered"
                        radius="sm"
                        value={formData.satuan}
                        onChange={(e) =>
                          setFormData({ ...formData, satuan: e.target.value })
                        }
                        placeholder="Masukkan disini"
                        classNames={{
                          input: "text-xs",
                        }}
                      />
                      <div className="text-xs italic text-danger">
                        {formError.satuan}
                      </div>
                    </div>
                    <div className="sm:col-span-2 col-span-1">
                      <div className="mb-1">
                        <label
                          htmlFor="lokasi"
                          className="text-xs font-semibold"
                        >
                          Harga per Item <span className="text-danger">*</span>
                        </label>
                      </div>
                      <Input
                        type="number"
                        aria-label="lokasi"
                        variant="bordered"
                        radius="sm"
                        startContent="Rp"
                        value={String(formData.hargaPerItem)}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hargaPerItem: Number(e.target.value),
                          })
                        }
                        placeholder="Masukkan disini"
                        classNames={{
                          input: "text-xs",
                        }}
                      />
                      <div className="text-xs italic text-danger">
                        {formError.hargaPerItem}
                      </div>
                    </div>
                    <div className="sm:col-span-3 col-span-1">
                      <div className="mb-1">
                        <label
                          htmlFor="lokasi"
                          className="text-xs font-semibold"
                        >
                          Jumlah Pagu (Harga * Jumlah Item){" "}
                          <span className="text-danger">*</span>
                        </label>
                      </div>
                      <Input
                        aria-label="lokasi"
                        variant="bordered"
                        radius="sm"
                        isDisabled
                        startContent="Rp"
                        value={String(
                          (
                            (formData.hargaPerItem || 0) *
                            (formData.jumlah || 0)
                          ).toLocaleString("id-ID"),
                        )}
                        placeholder="Masukkan disini"
                        classNames={{
                          input: "text-xs",
                        }}
                      />
                      <div className="text-xs italic text-danger">
                        {formError.hargaPerItem}
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
