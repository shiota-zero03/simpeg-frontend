import { useEffect, useMemo, useState } from "react";
import { TitleCase } from "@/components/card/TitleCase";
import {
  Button,
  Card,
  CardBody,
  Input,
  Radio,
  RadioGroup,
  useDisclosure,
  Autocomplete,
  AutocompleteItem,
  Divider,
} from "@heroui/react";
import { LuArrowLeft, LuSave } from "react-icons/lu";
import ConfirmModal from "@/components/modals/UtilsModal/ConfirmModal";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { useNavigate } from "react-router-dom";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { useGetAllAssetOptionWithHolder } from "@/services/asset/asset";
import { useCreateAssetService } from "@/services/asset/asset-service";
import { StoreAssetService } from "@/interface/request/assetService.interface";
import { useGetAllDataBelanjaOption } from "@/services/asset/asset-pembelanjaan/data-pembelanjaan";

interface formProps {
  itemBelanjaId?: number | null;
  assetId?: string;
  assetHolderId?: number | null;
  type?: string;
  pajak5Tahun?: string;
  pembayaranPajak?: string;
  nominalBayar?: number;
  startServis?: string;
  endServis?: string;
  nominalServis?: number;
  servicesKe?: number;
  nomorSurat?: string;
  tanggalSurat?: string;
}

interface errorProps {
  itemBelanjaId?: string;
  assetId?: string;
  assetHolderId?: string;
  type?: string;
  pajak5Tahun?: string;
  pembayaranPajak?: string;
  nominalBayar?: string;
  startServis?: string;
  endServis?: string;
  nominalServis?: string;
  servicesKe?: string;
  nomorSurat?: string;
  tanggalSurat?: string;
}

export default function CreatePegawai() {
  const [formData, setFormData] = useState<formProps>({
    itemBelanjaId: null,
    assetId: "",
    assetHolderId: null,
    type: "",
    pajak5Tahun: "",
    pembayaranPajak: "",
    nominalBayar: 0,
    startServis: "",
    endServis: "",
    nominalServis: 0,
    servicesKe: 0,
    nomorSurat: "",
    tanggalSurat: "",
  });

  const [formError, setFormError] = useState<errorProps>({});

  const rules = () => {
    const errors: errorProps = {};
    if (!formData.itemBelanjaId) {
      errors.itemBelanjaId = "Item belanja tidak boleh kosong";
    }
    if (!formData.assetId) {
      errors.assetId = "ID aset tidak boleh kosong";
    }
    if (!formData.type) {
      errors.type = "Jenis layanan tidak boleh kosong";
    }

    if (formData.type === "PAJAK") {
      if (!formData.pajak5Tahun) {
        errors.pajak5Tahun = "Status pajak 5 tahun tidak boleh kosong";
      }
      if (!formData.pembayaranPajak) {
        errors.pembayaranPajak = "Jenis pembayaran pajak harus diisi";
      }
      if (!formData.nominalBayar || formData.nominalBayar <= 0) {
        errors.nominalBayar = "Nominal bayar harus lebih dari 0";
      }
    } else if (formData.type === "SERVIS") {
      if (!formData.startServis) {
        errors.startServis = "Tanggal mulai servis tidak boleh kosong";
      }
      if (!formData.endServis) {
        errors.endServis = "Tanggal selesai servis tidak boleh kosong";
      }
      if (!formData.nominalServis || formData.nominalServis <= 0) {
        errors.nominalServis = "Nominal servis harus lebih dari 0";
      }
      if (!formData.servicesKe || formData.servicesKe <= 0) {
        errors.servicesKe = "Service ke-berapa harus diisi";
      }
      if (!formData.nomorSurat) {
        errors.nomorSurat = "Nomor surat tidak boleh kosong";
      }
      if (!formData.tanggalSurat) {
        errors.tanggalSurat = "Tanggal surat tidak boleh kosong";
      }
    }
    return errors;
  };

  useEffect(() => {
    setFormData({
      itemBelanjaId: null,
      assetId: "",
      assetHolderId: null,
      type: "",
      pajak5Tahun: "",
      pembayaranPajak: "",
      nominalBayar: 0,
      startServis: "",
      endServis: "",
      nominalServis: 0,
      servicesKe: 0,
      nomorSurat: "",
      tanggalSurat: "",
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

  const { mutate: mutatePost } = useCreateAssetService();

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

    const formToSend: StoreAssetService = {};
    if (formData.itemBelanjaId)
      formToSend.itemBelanjaId = Number(formData.itemBelanjaId);
    if (formData.assetId) {
      formToSend.assetId = formData.assetId;
      if (selectedItem?.holders[0]) {
        formToSend.assetHolderId = Number(selectedItem?.holders[0].id);
      }
    }
    if (formData.type) formToSend.type = formData.type;
    if (formData.pajak5Tahun) formToSend.pajak5Tahun = formData.pajak5Tahun;
    if (formData.pembayaranPajak)
      formToSend.pembayaranPajak = formData.pembayaranPajak;
    if (formData.nominalBayar) formToSend.nominalBayar = formData.nominalBayar;
    if (formData.startServis) formToSend.startServis = formData.startServis;
    if (formData.endServis) formToSend.endServis = formData.endServis;
    if (formData.nominalServis)
      formToSend.nominalServis = formData.nominalServis;
    if (formData.servicesKe) formToSend.servicesKe = formData.servicesKe;
    if (formData.nomorSurat) formToSend.nomorSurat = formData.nomorSurat;
    if (formData.tanggalSurat) formToSend.tanggalSurat = formData.tanggalSurat;

    try {
      mutatePost(formToSend, {
        onSuccess: () => {
          SuccessToast({ text: "Data berhasil ditambahkan" });
          navigate("/manajemen-aset?tab=servis");
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

  const {
    data: allDataBelanja,
    isFetching: isFetchingBelanja,
    refetch: refetchBelanja,
  } = useGetAllDataBelanjaOption();
  const BELANJA_SELECT = useMemo(() => {
    return allDataBelanja ? allDataBelanja.data : [];
  }, [allDataBelanja]);

  const {
    data: allDataAsset,
    isFetching: isFetchingAsset,
    refetch: refetchAsset,
  } = useGetAllAssetOptionWithHolder();
  const ASSET_SELECT = useMemo(() => {
    return allDataAsset ? allDataAsset.data : [];
  }, [allDataAsset]);

  useEffect(() => {
    refetchBelanja();
    refetchAsset();
  }, []);

  const selectedItem = useMemo(() => {
    return ASSET_SELECT.find((it) => it.id === formData.assetId) || null;
  }, [ASSET_SELECT, formData.assetId]);

  return (
    <>
      <BreadcrumbAdmin location="/Manajemen-Aset/Tambah-Data-Servis" />
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        isLoading={isLoadingConfirm}
        handleSubmit={handleConfirm}
      />

      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="flex">
          <Link
            to={`/manajemen-aset?tab=servis`}
            className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
          >
            <LuArrowLeft /> Kembali
          </Link>
        </div>
        <TitleCase
          title="Tambah Servise/Pajak Aset"
          text="Digunakan Untuk Menambah Data Servis/Pajak Aset yang Terbaru"
        />

        <div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Card shadow="none" className="border p-4">
              <CardBody className="flex flex-col gap-2">
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                  <div className="flex flex-col gap-1 sm:col-span-2 col-span-1">
                    <label htmlFor="lokasi" className="text-xs font-semibold">
                      Nama Item Belanja <span className="text-danger">*</span>
                    </label>
                    <Autocomplete
                      isLoading={isFetchingBelanja}
                      aria-label="pegawai"
                      placeholder="Cari item"
                      variant="bordered"
                      radius="sm"
                      defaultItems={BELANJA_SELECT}
                      selectedKey={String(formData.itemBelanjaId)}
                      onSelectionChange={(value) =>
                        setFormData({
                          ...formData,
                          itemBelanjaId: value as number,
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
                          textValue={peg.namaBarang}
                        >
                          {peg.namaBarang} - {peg.dataBelanja.namaBelanja}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                    <div className="text-xs italic text-danger">
                      {formError.itemBelanjaId}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="lokasi" className="text-xs font-semibold">
                      Nama Aset <span className="text-danger">*</span>
                    </label>
                    <Autocomplete
                      isLoading={isFetchingAsset}
                      aria-label="pegawai"
                      placeholder="Cari data aset"
                      variant="bordered"
                      radius="sm"
                      defaultItems={ASSET_SELECT}
                      selectedKey={String(formData.assetId)}
                      onSelectionChange={(value) =>
                        setFormData({
                          ...formData,
                          assetId: value as string,
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
                          textValue={peg.namaBarang}
                        >
                          {peg.namaBarang}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                    <div className="text-xs italic text-danger">
                      {formError.assetId}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="content" className="font-semibold text-xs">
                      Nama Pemegang Barang{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <Input
                      value={
                        selectedItem?.holders[0]
                          ? selectedItem?.holders[0].user.name
                          : ""
                      }
                      isDisabled
                      aria-label="Judul"
                      labelPlacement="outside"
                      placeholder="AUTOFILLED"
                      variant="bordered"
                      radius="sm"
                      classNames={{
                        inputWrapper: "border-[0.8px]",
                        input: "text-xs",
                      }}
                    />
                  </div>
                  <div className="sm:col-span-2 col-span-1">
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        Tipe <span className="text-danger">*</span>
                      </label>
                    </div>
                    <RadioGroup
                      aria-label="Jabatan Fungsional"
                      orientation="horizontal"
                      size="sm"
                      value={formData.type}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          type: value,
                        })
                      }
                    >
                      <Radio value="PAJAK">Bayar Pajak</Radio>
                      <Radio value="SERVIS">Servis</Radio>
                    </RadioGroup>
                    <div className="text-danger text-[0.7rem] mt-1">
                      {formError.type}
                    </div>
                  </div>
                </div>
                <Divider className="my-2" />
                {formData.type && (
                  <div>
                    {formData.type === "PAJAK" ? (
                      <div className="grid sm:grid-cols-3 grid-cols-1 gap-2">
                        <div>
                          <div className="mb-1">
                            <label
                              htmlFor="content"
                              className="font-semibold text-xs"
                            >
                              Tanggal Pajak 5 Tahunan
                            </label>
                          </div>
                          <Input
                            type="date"
                            value={String(formData.pajak5Tahun)}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                pajak5Tahun: e.target.value,
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
                            {formError.pajak5Tahun}
                          </div>
                        </div>
                        <div>
                          <div className="mb-1">
                            <label
                              htmlFor="content"
                              className="font-semibold text-xs"
                            >
                              Tanggal Pembayaran Pajak
                            </label>
                          </div>
                          <Input
                            type="date"
                            value={String(formData.pembayaranPajak)}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                pembayaranPajak: e.target.value,
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
                            {formError.pembayaranPajak}
                          </div>
                        </div>
                        <div>
                          <div className="mb-1">
                            <label
                              htmlFor="content"
                              className="font-semibold text-xs"
                            >
                              Nominal Pajak yang Dibayarkan
                            </label>
                          </div>
                          <Input
                            type="number"
                            startContent="Rp"
                            value={String(formData.nominalBayar)}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                nominalBayar: Number(e.target.value),
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
                            {formError.nominalBayar}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-3 grid-cols-1 gap-2">
                        <div>
                          <div className="mb-1">
                            <label
                              htmlFor="content"
                              className="font-semibold text-xs"
                            >
                              Tanggal Mulai Servis
                            </label>
                          </div>
                          <Input
                            type="date"
                            value={String(formData.startServis)}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                startServis: e.target.value,
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
                            {formError.startServis}
                          </div>
                        </div>
                        <div>
                          <div className="mb-1">
                            <label
                              htmlFor="content"
                              className="font-semibold text-xs"
                            >
                              Tanggal Selesai Servis
                            </label>
                          </div>
                          <Input
                            type="date"
                            value={String(formData.endServis)}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                endServis: e.target.value,
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
                            {formError.endServis}
                          </div>
                        </div>
                        <div>
                          <div className="mb-1">
                            <label
                              htmlFor="content"
                              className="font-semibold text-xs"
                            >
                              Nominal Servis
                            </label>
                          </div>
                          <Input
                            type="number"
                            startContent="Rp"
                            value={String(formData.nominalServis)}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                nominalServis: Number(e.target.value),
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
                            {formError.nominalServis}
                          </div>
                        </div>
                        <div>
                          <div className="mb-1">
                            <label
                              htmlFor="content"
                              className="font-semibold text-xs"
                            >
                              Servis Ke-
                            </label>
                          </div>
                          <Input
                            startContent="Rp"
                            value={String(formData.servicesKe)}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                servicesKe: Number(e.target.value),
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
                            {formError.servicesKe}
                          </div>
                        </div>
                        <div>
                          <div className="mb-1">
                            <label
                              htmlFor="content"
                              className="font-semibold text-xs"
                            >
                              No. Surat Pesanan
                            </label>
                          </div>
                          <Input
                            value={String(formData.nomorSurat)}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                nomorSurat: e.target.value,
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
                            {formError.nomorSurat}
                          </div>
                        </div>
                        <div>
                          <div className="mb-1">
                            <label
                              htmlFor="content"
                              className="font-semibold text-xs"
                            >
                              Tanggal Surat Pesanan
                            </label>
                          </div>
                          <Input
                            type="date"
                            startContent="Rp"
                            value={String(formData.tanggalSurat)}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                tanggalSurat: e.target.value,
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
                            {formError.tanggalSurat}
                          </div>
                        </div>
                      </div>
                    )}
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
