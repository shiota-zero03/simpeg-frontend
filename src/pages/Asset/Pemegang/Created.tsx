import { useEffect, useMemo, useState } from "react";
import { TitleCase } from "@/components/card/TitleCase";
import {
  Button,
  Card,
  CardBody,
  Input,
  useDisclosure,
  Autocomplete,
  AutocompleteItem,
  Checkbox,
  Pagination,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  LuArchiveRestore,
  LuArrowLeft,
  LuSave,
  LuSearch,
} from "react-icons/lu";
import ConfirmModal from "@/components/modals/UtilsModal/ConfirmModal";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { useNavigate } from "react-router-dom";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { useGetAllPegawaiOption } from "@/services/pegawai";
import { StoreAssetHolder } from "@/interface/request/assetHolder.interface";
import { useCreateAssetHolder } from "@/services/asset/asset-holder";
import { useGetAllAsset } from "@/services/asset/asset";
import { ColumnDef } from "@tanstack/react-table";
import { AssetRes } from "@/interface/responses/asset.interface";
import { DMYIndoToFormat } from "@/utils/dateFormater";
import DataTables from "@/components/DataTables";
import { BiReset, BiSearch } from "react-icons/bi";
import { convertFileToBase64 } from "@/utils/base64Formater";
import { LucideUploadCloud } from "lucide-react";
import store from "@/redux/store";

interface formProps {
  userId?: string;
  nip?: string;
  jabatan?: string;
}

interface errorProps {
  userId?: string;
  nip?: string;
  jabatan?: string;
  formAsset?: string;
}

interface assetProps {
  assetName?: string;
  assetId?: string;
  noBast?: string;
  dokumenPendukung?: string;
  file?: string;
}

interface DataProps {
  id: string;
  tanggal: string;
  namaBarang: string;
  idBarang: string;
  kodeBarang: string;
  noRegistrasi: string;
  kategori: string;
  harga: string;
  merk: string;
  status: boolean | null;
}

export default function CreatePegawai() {
  const { role } = store.getState().auth;
  const [formAsset, setFormAsset] = useState<assetProps[]>([]);
  const [formData, setFormData] = useState<formProps>({
    userId: "",
    nip: "",
    jabatan: "",
  });

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

  const changePegawai = (value: string) => {
    if (value) {
      const pegawaiData = PEGAWAI_SELECT.find((it) => it.id === value);
      if (pegawaiData) {
        setFormData({
          ...formData,
          userId: pegawaiData.id,
          nip: pegawaiData.nip,
          jabatan: pegawaiData.jabatan.nameJob,
        });
      } else {
        setFormData({
          ...formData,
          userId: "",
          nip: "",
          jabatan: "",
        });
      }
    } else {
      setFormData({
        ...formData,
        userId: "",
        nip: "",
        jabatan: "",
      });
    }
  };

  const rules = () => {
    const error: errorProps = {};
    if (!formData.userId)
      error.userId = "Pilih pemegang barang terlebih dahulu";
    if (formAsset.length === 0) error.formAsset = "Pilih minimal satu aset";
    return error;
  };

  useEffect(() => {
    setFormData({
      userId: "",
      nip: "",
      jabatan: "",
    });
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

  const { mutate: mutatePost } = useCreateAssetHolder();

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

    const formToSend: StoreAssetHolder[] = [];

    formAsset.forEach((item) => {
      const formSendData: StoreAssetHolder = {
        userId: formData.userId,
      };

      if (item.assetId) formSendData.assetId = item.assetId;
      if (item.noBast) formSendData.noBast = item.noBast;
      if (item.dokumenPendukung)
        formSendData.dokumenPendukung = item.dokumenPendukung;
      if (item.file) formSendData.file = item.file;

      formToSend.push(formSendData);
    });

    try {
      mutatePost(formToSend, {
        onSuccess: () => {
          SuccessToast({ text: "Data berhasil ditambahkan" });
          navigate("/manajemen-aset?tab=pemegang");
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

  const limit = 10;
  const [pageIndex, setPageIndex] = useState(0);
  const [search, setSearch] = useState("");

  const [startData, setStartData] = useState<number>(0);
  const [endData, setEndData] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalData, setTotalData] = useState<number>(0);

  const {
    data: allData,
    isFetching: isFetchingData,
    refetch: refetchData,
  } = useGetAllAsset(pageIndex + 1, limit, search);

  const paginatedData: DataProps[] = useMemo(() => {
    if (allData) {
      const data = allData.data;
      setTotalData(data.pagination.totalData || 0);
      setTotalPages(data.pagination.totalPages || 0);

      const start = pageIndex * limit + 1;
      const end = Math.min(
        (pageIndex + 1) * limit,
        data.pagination.totalData || 0,
      );

      setStartData(start);
      setEndData(end);

      return data.response.map((item: AssetRes) => ({
        id: item.id,
        tanggal: DMYIndoToFormat(item.createdAt),
        namaBarang: item.namaBarang,
        idBarang: item.idBarang,
        kodeBarang: item.kodeBarang,
        noRegistrasi: item.nomorRegistrasi,
        kategori: item.kategori,
        harga: item.harga ? `Rp ${item.harga.toLocaleString("id-ID")}` : "-",
        merk: item.merkTipe,
        status: item.status,
      }));
    } else {
      return [];
    }
  }, [search, limit, pageIndex, allData]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    const checkData = paginatedData.find((it) => it.id === id);
    if (!checkData) return null;

    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((itemId) => itemId !== id),
    );

    setFormAsset((prev) => {
      if (checked) {
        const newItem: assetProps = {
          assetName: `${checkData?.namaBarang} - ${checkData.idBarang} - ${checkData.kodeBarang} - ${checkData.noRegistrasi}`,
          assetId: id,
          noBast: "",
          dokumenPendukung: "",
          file: "",
        };
        return [...prev, newItem];
      } else {
        return prev.filter((data) => String(data.assetId) !== id);
      }
    });
  };

  const columns: ColumnDef<DataProps>[] = [
    {
      header: "✓",
      cell: ({ row }) => {
        const { id, status } = row.original;

        let stat = false;
        if (status && status === true) {
          stat = true;
        }

        return (
          <Checkbox
            isSelected={selectedIds.includes(String(id))}
            isDisabled={stat}
            isIndeterminate={stat}
            onChange={(e) => handleCheckboxChange(String(id), e.target.checked)}
          />
        );
      },
      meta: { align: "center", cellWidth: "10" },
    },
    {
      header: "No",
      cell: ({ row }) => {
        const number = pageIndex * limit + row.index + 1;
        return <div>{number}</div>;
      },
      meta: { align: "center", cellWidth: "10" },
    },
    {
      accessorKey: "tanggal",
      header: "Tanggal",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      accessorKey: "namaBarang",
      header: "Nama Barang",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      accessorKey: "idBarang",
      header: "ID Barang",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      accessorKey: "kodeBarang",
      header: "Kode Barang",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      accessorKey: "noRegistrasi",
      header: "No. Registrasi",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      accessorKey: "kategori",
      header: "Kategori",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      accessorKey: "harga",
      header: "Harga",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
    {
      accessorKey: "merk",
      header: "Merk/Tipe",
      cell: (info) => info.getValue() as string,
      // meta: { align: "center" },
    },
  ];

  const handleSearch = () => {
    setPageIndex(0);
    refetchData();
  };

  const handleReset = () => {
    setSearch("");
    setPageIndex(0);
    setTimeout(() => {
      refetchData();
    }, 100);
  };

  useEffect(() => {
    refetchData();
  }, []);

  useEffect(() => {
    refetchData();
  }, [pageIndex, refetchData]);

  const handleUbahTargetChange = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: "dokumenPendukung" | "noBast" | "file",
  ) => {
    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const fileToShow = await convertFileToBase64(file);
        setFormAsset((prev) => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            file: fileToShow,
          };
          return updated;
        });
      } else {
        setFormAsset((prev) => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            file: "",
          };
          return updated;
        });
      }
    } else {
      const value = e.target.value;
      setFormAsset((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          [type]: value,
        };
        return updated;
      });
    }
  };

  return (
    <>
      <BreadcrumbAdmin location="/Manajemen-Aset/Tambah-Data-Pemegang-Aset" />
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        isLoading={isLoadingConfirm}
        handleSubmit={handleConfirm}
      />

      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="flex">
          <Link
            to={`/manajemen-aset?tab=pemegang`}
            className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
          >
            <LuArrowLeft /> Kembali
          </Link>
        </div>
        <TitleCase
          title="Tambah Penanggung Jawab / Pemegang Aset"
          text="Digunakan Untuk Menambah penanggung jawab aset"
        />

        <div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Card shadow="none" className="border p-4">
              <CardBody className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-2">
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        Nama Pegawai <span className="text-danger">*</span>
                      </label>
                    </div>
                    <Autocomplete
                      defaultItems={PEGAWAI_SELECT}
                      isLoading={isFetchingPegawai}
                      aria-label="pegawai"
                      placeholder="Cari pegawai"
                      variant="bordered"
                      radius="sm"
                      selectedKey={String(formData.userId)}
                      onSelectionChange={(value) =>
                        changePegawai(value as string)
                      }
                      inputProps={{
                        classNames: {
                          input: "text-xs",
                          inputWrapper: "border-[0.8px]",
                        },
                      }}
                    >
                      {(peg) => (
                        <AutocompleteItem key={peg.id} textValue={peg.name}>
                          {peg.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                    <div className="text-danger text-[0.7rem] mt-1">
                      {formError.userId}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        NIP
                      </label>
                    </div>
                    <Input
                      isDisabled
                      value={formData.nip}
                      aria-label="Judul"
                      labelPlacement="outside"
                      placeholder="AUTO_FILLED"
                      variant="bordered"
                      radius="sm"
                      classNames={{
                        inputWrapper: "border-[0.8px]",
                        input: "text-xs",
                      }}
                    />
                  </div>
                  <div>
                    <div className="mb-1">
                      <label
                        htmlFor="content"
                        className="font-semibold text-xs"
                      >
                        Jabatan
                      </label>
                    </div>
                    <Input
                      isDisabled
                      value={formData.jabatan}
                      aria-label="Judul"
                      labelPlacement="outside"
                      placeholder="AUTO_FILLED"
                      variant="bordered"
                      radius="sm"
                      classNames={{
                        inputWrapper: "border-[0.8px]",
                        input: "text-xs",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex sm:flex-row flex-col justify-between gap-2 sm:items-center">
                    <div className="text-button-primary font-semibold text-lg">
                      Data Barang
                    </div>
                    <div className="flex sm:flex-row flex-col justify-between gap-2 sm:items-end">
                      <div className="flex sm:flex-row flex-col gap-2 items-end w-full">
                        <Input
                          aria-label="search"
                          value={search}
                          onChange={(e) => {
                            setSearch(e.target.value);
                          }}
                          radius="sm"
                          size="sm"
                          variant="bordered"
                          placeholder="Cari nama barang/merk"
                          startContent={
                            <LuSearch className="text-accent-gray text-xs" />
                          }
                          classNames={{
                            inputWrapper: "border-[0.8px]",
                            input: "text-xs",
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          onPress={handleSearch}
                          variant="solid"
                          radius="sm"
                          size="sm"
                          className="bg-accent-success text-white text-xs"
                          isIconOnly
                        >
                          <BiSearch size={12} />
                        </Button>
                        <Button
                          onPress={handleReset}
                          variant="bordered"
                          color="danger"
                          radius="sm"
                          size="sm"
                          isIconOnly
                          className="border-[0.8px] text-xs"
                        >
                          <BiReset size={12} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className="py-4">
                        <DataTables
                          isLoading={isFetchingData}
                          columns={columns}
                          data={paginatedData}
                        />
                      </div>
                    </div>
                    <div className="pb-4 px-4 flex md:flex-row flex-col items-center justify-between gap-4">
                      <span className="sm:text-sm text-xs text-[#8C8C8C]">
                        {startData} - {endData} dari {totalData} data
                      </span>
                      <Pagination
                        showControls
                        variant="bordered"
                        color="primary"
                        size="sm"
                        radius="sm"
                        total={totalPages}
                        page={pageIndex + 1}
                        initialPage={pageIndex + 1}
                        onChange={(page) => setPageIndex(page - 1)}
                        classNames={{
                          item: "border-[0.8px] text-primary border-accent-gray",
                          prev: "sm:flex hidden border-[0.8px] border-accent-gray text-primary",
                          next: "sm:flex hidden border-[0.8px] border-accent-gray text-primary",
                        }}
                      />
                    </div>
                  </div>
                </div>
                {formAsset.length > 0 && (
                  <div>
                    <div className="flex sm:flex-row flex-col justify-between gap-2 sm:items-center mb-3">
                      <div className="text-button-primary font-semibold text-lg">
                        Dokumen Pendukung
                      </div>
                    </div>
                    {formAsset.map((item, index) => (
                      <div
                        className="flex flex-col gap-2 mb-4 w-full"
                        key={index}
                      >
                        <div className="font-semibold">
                          {index + 1}.&nbsp;&nbsp;{item.assetName}
                        </div>
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-1 w-full">
                          <div className="md:col-span-1 col-span-1">
                            <div className="mb-1">
                              <label
                                className="text-xs font-medium"
                                htmlFor="ubah-target"
                              >
                                Dokumen Pendukung
                              </label>
                            </div>
                            <Select
                              value={item.dokumenPendukung}
                              onChange={(e) =>
                                handleUbahTargetChange(
                                  index,
                                  e,
                                  "dokumenPendukung",
                                )
                              }
                              aria-label="Judul"
                              labelPlacement="outside"
                              placeholder="Pilih jenis dokumen pendukung"
                              variant="bordered"
                              radius="sm"
                              className="w-full"
                              classNames={{
                                trigger: "border-[0.8px]",
                                value: "text-xs",
                              }}
                            >
                              <SelectItem key={"BAST"}>Dokumen BAST</SelectItem>
                              <SelectItem key={"PAKTA_INTEGRITAS"}>
                                Fakta Integritas
                              </SelectItem>
                              <SelectItem key={"SURAT_PINJAM"}>
                                Surat Izin Pinjam Pakai
                              </SelectItem>
                              <SelectItem key={"SURAT_PEMEGANG_ASET"}>
                                Surat Izin Pemegang Aset Kendaraan
                              </SelectItem>
                              <SelectItem key={"DOKUMEN_LAIN"}>
                                Lainnya
                              </SelectItem>
                            </Select>
                          </div>
                          <div className="md:col-span-2 col-span-1">
                            {item.dokumenPendukung === "BAST" && (
                              <div>
                                <div className="mb-1">
                                  <label
                                    className="text-xs font-medium"
                                    htmlFor="ubah-target"
                                  >
                                    No. BAST (Berita Acara Serah Terima)
                                  </label>
                                </div>
                                <Input
                                  value={item.noBast}
                                  onChange={(e) =>
                                    handleUbahTargetChange(index, e, "noBast")
                                  }
                                  aria-label="Judul"
                                  labelPlacement="outside"
                                  placeholder="Masukkan disini"
                                  variant="bordered"
                                  radius="sm"
                                  className="w-full"
                                  classNames={{
                                    inputWrapper: "border-[0.8px]",
                                    input: "text-xs",
                                  }}
                                />
                              </div>
                            )}
                          </div>
                          <div className="md:col-span-3 col-span-1">
                            <div className="max-w-80">
                              <div className="mb-1">
                                <label
                                  htmlFor="content"
                                  className="font-semibold text-xs"
                                >
                                  File Pendukung
                                </label>
                              </div>
                              <div className="border p-8 mb-2 flex items-center justify-center">
                                {item.file ? (
                                  <LuArchiveRestore size={32} />
                                ) : (
                                  <LucideUploadCloud size={32} />
                                )}
                              </div>
                              <input
                                type="file"
                                onChange={(e) => {
                                  handleUbahTargetChange(index, e, "file");
                                }}
                                accept=".png,.jpg,.jpeg,.pdf"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
