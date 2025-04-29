import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
} from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { LuSave, LuX } from "react-icons/lu";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { Commet } from "react-loading-indicators";
import { useGetAllDataKegiatanOption } from "@/services/asset/asset-pembelanjaan/data-kegiatan";
import { StoreKegiatanBelanja } from "@/interface/request/assetPembelanjaan";
import { useGetDetailKegiatanBelanja, useUpdateKegiatanBelanja } from "@/services/asset/asset-pembelanjaan/data-item-belanja";
import { useGetAllSubDataKegiatanOption } from "@/services/asset/asset-pembelanjaan/sub-data-kegiatan";

interface props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
}

interface formProps {
  namaBelanja?: string;
  kegiatanId?: number | null;
  subKegiatanId?: number | null;
  uraian?: string;
  paguBelanja?: number;
  accountBank?: string;
}

interface errorProps {
  namaBelanja?: string;
  kegiatanId?: string;
  subKegiatanId?: string;
  uraian?: string;
  paguBelanja?: string;
  accountBank?: string;
}

const UpdateModal = ({ id, isOpen, onClose, handleClose }: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<formProps>({
    namaBelanja: "",
    kegiatanId: null,
    subKegiatanId: null,
    uraian: "",
    paguBelanja: 0,
    accountBank: "",
  });

  const [formError, setFormError] = useState<errorProps>({});

  const { data, isFetching, refetch } = useGetDetailKegiatanBelanja(String(id));

  useEffect(() => {
    if (data) {
      setFormData({
        namaBelanja: data.data.namaBelanja,
        kegiatanId: data.data.kegiatanId,
        subKegiatanId: data.data.subKegiatanId,
        uraian: data.data.uraian,
        paguBelanja: data.data.paguBelanja,
        accountBank: data.data.accountBank
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
    if (!formData.namaBelanja) {
      errors.namaBelanja = "Nama belanja tidak boleh kosong";
    }
    
    if (!formData.kegiatanId) {
      errors.kegiatanId = "Kegiatan harus dipilih";
    }
    
    if (!formData.subKegiatanId) {
      errors.subKegiatanId = "Sub kegiatan harus dipilih";
    }
    
    if (!formData.uraian) {
      errors.uraian = "Uraian tidak boleh kosong";
    }
    
    if (!formData.paguBelanja || formData.paguBelanja <= 0) {
      errors.paguBelanja = "Pagu belanja harus lebih dari 0";
    }
    
    if (!formData.accountBank) {
      errors.accountBank = "Account bank tidak boleh kosong";
    }

    return errors;
  };


  const {
    data: allData,
    isFetching: isFetchingKegiatan,
    refetch: refetchKegiatan,
  } = useGetAllDataKegiatanOption();
  const KEGIATAN_SELECT = useMemo(() => {
    return allData ? allData.data : [];
  }, [allData]);

  const {
    data: allDataSub,
    isFetching: isFetchingSubKegiatan,
    refetch: refetchSubKegiatan,
  } = useGetAllSubDataKegiatanOption();
  const SUBKEGIATAN_SELECT = useMemo(() => {
    return allDataSub ? allDataSub.data : [];
  }, [allDataSub]);

  useEffect(() => {
    refetchKegiatan();
    refetchSubKegiatan();
  }, [])

  const { mutate: mutatePost } = useUpdateKegiatanBelanja();

  const handleSubmit = () => {
    setFormError({});

    const validate = validateData();
    if (Object.keys(validate).length > 0) {
      setFormError(validate);
      return false;
    }

    setIsLoading(true);

    const formToSend: StoreKegiatanBelanja = {};
    if (formData.namaBelanja) {
      formToSend.namaBelanja = formData.namaBelanja;
    }
    
    if (formData.kegiatanId) {
      formToSend.kegiatanId = Number(formData.kegiatanId);
    }
    
    if (formData.subKegiatanId) {
      formToSend.subKegiatanId = Number(formData.subKegiatanId);
    }
    
    if (formData.uraian) {
      formToSend.uraian = formData.uraian;
    }
    
    if (formData.paguBelanja) {
      formToSend.paguBelanja = Number(formData.paguBelanja);
    }
    
    if (formData.accountBank) {
      formToSend.accountBank = formData.accountBank;
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
            <span className="text-base font-semibold">Update Data Belanja / Pekerjaan</span>
            <LuX
              className="text-danger border border-danger rounded-full p-2 cursor-pointer"
              onClick={onClose}
              size={32}
            />
          </ModalHeader>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom flex flex-col gap-4 pb-8">
                      <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                        <div className="flex flex-col gap-1">
                          <label htmlFor="lokasi" className="text-xs font-semibold">
                            Nama Kegiatan <span className="text-danger">*</span>
                          </label>
                          <Autocomplete
                            isLoading={isFetchingKegiatan}
                            aria-label="pegawai"
                            placeholder="Cari kegiatan"
                            variant="bordered"
                            radius="sm"
                            defaultItems={KEGIATAN_SELECT}
                            selectedKey={String(formData.kegiatanId)}
                            onSelectionChange={(value) =>
                              setFormData({
                                ...formData,
                                kegiatanId: value as number,
                              })
                            }
                            inputProps={{
                              classNames: {
                                input: "text-xs",
                              },
                            }}
                          >
                            {(peg) => (
                              <AutocompleteItem key={peg.id} textValue={peg.name}>
                                {peg.name}
                              </AutocompleteItem>
                            )}
                          </Autocomplete>
                          <div className="text-xs italic text-danger">
                            {formError.kegiatanId}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label htmlFor="lokasi" className="text-xs font-semibold">
                            Nama Sub-Kegiatan <span className="text-danger">*</span>
                          </label>
                          <Autocomplete
                            isLoading={isFetchingSubKegiatan}
                            aria-label="pegawai"
                            placeholder="Cari kegiatan"
                            variant="bordered"
                            radius="sm"
                            defaultItems={SUBKEGIATAN_SELECT}
                            selectedKey={String(formData.subKegiatanId)}
                            onSelectionChange={(value) =>
                              setFormData({
                                ...formData,
                                subKegiatanId: value as number,
                              })
                            }
                            inputProps={{
                              classNames: {
                                input: "text-xs",
                              },
                            }}
                          >
                            {(peg) => (
                              <AutocompleteItem key={peg.id} textValue={peg.name}>
                                {peg.name}
                              </AutocompleteItem>
                            )}
                          </Autocomplete>
                          <div className="text-xs italic text-danger">
                            {formError.subKegiatanId}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label htmlFor="lokasi" className="text-xs font-semibold">
                            Nama Belanja/Pekerjaan <span className="text-danger">*</span>
                          </label>
                          <Input
                            aria-label="lokasi"
                            variant="bordered"
                            radius="sm"
                            value={formData.namaBelanja}
                            onChange={(e) =>
                              setFormData({ ...formData, namaBelanja: e.target.value })
                            }
                            placeholder="Masukkan disini"
                            classNames={{
                              input: "text-xs",
                            }}
                          />
                          <div className="text-xs italic text-danger">
                            {formError.namaBelanja}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label htmlFor="lokasi" className="text-xs font-semibold">
                            Kode Rekening <span className="text-danger">*</span>
                          </label>
                          <Input
                            aria-label="lokasi"
                            variant="bordered"
                            radius="sm"
                            value={formData.accountBank}
                            onChange={(e) =>
                              setFormData({ ...formData, accountBank: e.target.value })
                            }
                            placeholder="Masukkan disini"
                            classNames={{
                              input: "text-xs",
                            }}
                          />
                          <div className="text-xs italic text-danger">
                            {formError.accountBank}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 md:col-span-2 col-span-1">
                          <label htmlFor="lokasi" className="text-xs font-semibold">
                            Uraian <span className="text-danger">*</span>
                          </label>
                          <Textarea
                            aria-label="lokasi"
                            variant="bordered"
                            radius="sm"
                            value={formData.uraian}
                            onChange={(e) =>
                              setFormData({ ...formData, uraian: e.target.value })
                            }
                            placeholder="Masukkan disini"
                            classNames={{
                              input: "text-xs",
                            }}
                          />
                          <div className="text-xs italic text-danger">
                            {formError.uraian}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 md:col-span-2 col-span-1">
                          <label htmlFor="lokasi" className="text-xs font-semibold">
                            Pagu Belanja <span className="text-danger">*</span>
                          </label>
                          <Input
                            startContent={"Rp"}
                            aria-label="lokasi"
                            variant="bordered"
                            radius="sm"
                            type="number"
                            value={String(formData.paguBelanja)}
                            onChange={(e) =>
                              setFormData({ ...formData, paguBelanja: Number(e.target.value) })
                            }
                            placeholder="Masukkan disini"
                            classNames={{
                              input: "text-xs",
                            }}
                          />
                          <div className="text-xs italic text-danger">
                            {formError.paguBelanja}
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
