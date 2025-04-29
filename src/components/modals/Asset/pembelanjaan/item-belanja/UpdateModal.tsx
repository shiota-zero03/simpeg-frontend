import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader
} from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { LuSave, LuX } from "react-icons/lu";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { Commet } from "react-loading-indicators";
import { StoreDataBelanja } from "@/interface/request/assetPembelanjaan";
import { useGetAllKegiatanBelanjaOption } from "@/services/asset/asset-pembelanjaan/data-item-belanja";
import { useGetDetailDataBelanja, useUpdateDataBelanja } from "@/services/asset/asset-pembelanjaan/data-pembelanjaan";
import { YMToIndoFormat } from "@/utils/dateFormater";

interface props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
}

interface formProps {
  name?: string;
  idDataBelanja?: number | null;
  namaBarang?: string;
  tanggal?: string;
  jumlah?: number;
  satuan?: string;
  hargaPerItem?: number;
  jumlahPagu?: number;
}

interface errorProps {
  name?: string;
  idDataBelanja?: string;
  namaBarang?: string;
  tanggal?: string;
  jumlah?: string;
  satuan?: string;
  hargaPerItem?: string;
  jumlahPagu?: string;
}

const UpdateModal = ({ id, isOpen, onClose, handleClose }: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<formProps>({
    name: "",
    idDataBelanja: null,
    namaBarang: "",
    tanggal: "",
    jumlah: 0,
    satuan: "",
    hargaPerItem: 0,
    jumlahPagu: 0,
  });

  const [formError, setFormError] = useState<errorProps>({});

  const { data, isFetching, refetch } = useGetDetailDataBelanja(String(id));

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.data.name,
        idDataBelanja: data.data.dataBelanja.id,
        namaBarang: data.data.namaBarang,
        tanggal: YMToIndoFormat(data.data.tanggal),
        jumlah: data.data.jumlah,
        satuan: data.data.satuan,
        hargaPerItem: data.data.hargaPerItem,
        jumlahPagu: data.data.jumlahPagu,
      });
    }
  }, [isOpen, data]);

  useEffect(() => {
    setIsLoading(false);
    setFormError({});
    refetch();
  }, [isOpen]);

  const validateData = () => {
    const errors: errorProps = {};
    if (!formData.namaBarang) {
      errors.name = "Nama tidak boleh kosong";
    }
    
    if (!formData.idDataBelanja) {
      errors.idDataBelanja = "Data belanja harus dipilih";
    }
    
    if (!formData.tanggal) {
      errors.tanggal = "Tanggal tidak boleh kosong";
    }
    
    if (!formData.jumlah || formData.jumlah <= 0) {
      errors.jumlah = "Jumlah harus lebih dari 0";
    }
    
    if (!formData.satuan) {
      errors.satuan = "Satuan tidak boleh kosong";
    }
    
    if (!formData.hargaPerItem || formData.hargaPerItem <= 0) {
      errors.hargaPerItem = "Harga per item harus lebih dari 0";
    }

    return errors;
  };


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
  }, [])

  const { mutate: mutatePost } = useUpdateDataBelanja();

  const handleSubmit = () => {
    setFormError({});

    const validate = validateData();
    if (Object.keys(validate).length > 0) {
      setFormError(validate);
      return false;
    }

    setIsLoading(true);

    const formToSend: StoreDataBelanja = {};
    if (formData.name) {
      formToSend.name = formData.name
    }
    
    if (formData.idDataBelanja) {
      formToSend.idDataBelanja = Number(formData.idDataBelanja)
    }
    
    if (formData.namaBarang) {
      formToSend.namaBarang = formData.namaBarang
    }
    
    if (formData.tanggal) {
      formToSend.tanggal = formData.tanggal
    }
    
    if (formData.jumlah) {
      formToSend.jumlah = formData.jumlah
    }
    
    if (formData.satuan) {
      formToSend.satuan = formData.satuan
    }
    
    if (formData.hargaPerItem) {
      formToSend.hargaPerItem = formData.hargaPerItem
    }

    try {
      mutatePost(
        { id: String(id), formData: formToSend },
        {
          onSuccess: () => {
            SuccessToast({ text: "Data berhasil diperbarui" });
            handleClose();
          },
          onError: (error: AxiosError<BaseErrorRes>) => {
            ErrorToast({
              text:
                (error.response?.data.message as string) ||
                "Terjadi kesalahan saat mengirim data",
            });
            setIsLoading(false);
            throw error;
          },
        },
      );
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const selectedItem = useMemo(() => {
    return BELANJA_SELECT.find(it => it.id === formData.idDataBelanja) || null;
  }, [BELANJA_SELECT, formData.idDataBelanja]);

  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="3xl">
        <ModalContent>
          {isFetching && (
            <div className="inset-0 flex items-center justify-center absolute">
              <Commet color="#32cd32" size="medium" text="" textColor="" />
            </div>
          )}
          <ModalHeader className="flex items-center justify-between">
            <span className="text-base font-semibold">Update Data Item Belanja</span>
            <LuX
              className="text-danger border border-danger rounded-full p-2 cursor-pointer"
              onClick={onClose}
              size={32}
            />
          </ModalHeader>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom flex flex-col gap-4 pb-8">
                      <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
                        <div className="flex flex-col gap-1">
                          <label htmlFor="lokasi" className="text-xs font-semibold">
                            Nama Belanja (Pekerjaan) <span className="text-danger">*</span>
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
                              <AutocompleteItem key={peg.id} textValue={peg.namaBelanja}>
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
                            value={selectedItem ? selectedItem?.kegiatan?.name : ""}
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
                            value={selectedItem ? selectedItem?.subKegiatan?.name : ""}
                            placeholder="AUTOFILLED"
                            classNames={{
                              input: "text-xs",
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label htmlFor="lokasi" className="text-xs font-semibold">
                            Nama Item belanja <span className="text-danger">*</span>
                          </label>
                          <Input
                            aria-label="lokasi"
                            variant="bordered"
                            radius="sm"
                            value={formData.namaBarang}
                            onChange={(e) =>
                              setFormData({ ...formData, namaBarang: e.target.value })
                            }
                            placeholder="Masukkan disini"
                            classNames={{
                              input: "text-xs",
                            }}
                          />
                          <div className="text-xs italic text-danger">
                            {formError.namaBarang}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label htmlFor="lokasi" className="text-xs font-semibold">
                            Jumlah Item <span className="text-danger">*</span>
                          </label>
                          <Input
                            type="numebr"
                            aria-label="lokasi"
                            variant="bordered"
                            radius="sm"
                            value={String(formData.jumlah)}
                            onChange={(e) =>
                              setFormData({ ...formData, jumlah: Number(e.target.value) })
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
                        <div className="flex flex-col gap-1">
                          <label htmlFor="lokasi" className="text-xs font-semibold">
                            Satuan Item <span className="text-danger">*</span>
                          </label>
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
                        <div className="flex flex-col gap-1">
                          <label htmlFor="lokasi" className="text-xs font-semibold">
                            Jumlah Item <span className="text-danger">*</span>
                          </label>
                          <Input
                            type="number"
                            aria-label="lokasi"
                            variant="bordered"
                            radius="sm"
                            startContent="Rp"
                            value={String(formData.hargaPerItem)}
                            onChange={(e) =>
                              setFormData({ ...formData, hargaPerItem: Number(e.target.value) })
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
                        <div className="flex flex-col gap-1 sm:col-span-2 col-span-1">
                          <label htmlFor="lokasi" className="text-xs font-semibold">
                            Jumlah Pagu (Harga * Jumlah Item) <span className="text-danger">*</span>
                          </label>
                          <Input
                            aria-label="lokasi"
                            variant="bordered"
                            radius="sm"
                            isDisabled
                            startContent="Rp"
                            value={String(((formData.hargaPerItem || 0) * (formData.jumlah || 0)).toLocaleString('id-ID'))}
                            placeholder="Masukkan disini"
                            classNames={{
                              input: "text-xs",
                            }}
                          />
                          <div className="text-xs italic text-danger">
                            {formError.hargaPerItem}
                          </div>
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
                      <div className="flex items-center justify-end w-full gap-2">
                        <Button
                          isLoading={isLoading}
                          onPress={handleSubmit}
                          className="border border-button-primary bg-button-primary text-white font-semibold"
                          size="sm"
                          radius="sm"
                        >
                          <LuSave /> Simpan Data
                        </Button>
                      </div>
                    </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateModal;
