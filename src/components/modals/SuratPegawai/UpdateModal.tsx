import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Radio,
  RadioGroup,
  Textarea,
} from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { LuSave, LuX } from "react-icons/lu";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { Commet } from "react-loading-indicators";
import {
  useGetAllPegawaiOption,
  useGetDetailSuratPegawai,
  useUpdateSuratPegawai,
} from "@/services/pegawai";
import { DateYMDFormat } from "@/utils/dateFormater";
import { StoreSuratPegawai } from "@/interface/request/pegawai.interface";

interface props {
  id: number | null;
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
}

interface formProps {
  userId?: string;
  nip?: string;
  jabatan?: string;
  startDate?: string;
  endDate?: string;
  typeForm?: string;
  description?: string;
}

interface errorProps {
  userId?: string;
  startDate?: string;
  endDate?: string;
  typeForm?: string;
  description?: string;
}

const UpdateModal = ({ id, isOpen, onClose, handleClose }: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<formProps>({
    userId: "",
    startDate: "",
    endDate: "",
    typeForm: "",
    description: "",
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

  const { data, isFetching, refetch } = useGetDetailSuratPegawai(String(id));

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

  useEffect(() => {
    if (data) {
      const pegawaiData = PEGAWAI_SELECT.find(
        (it) => it.id === data.data.userId,
      );
      setFormData({
        userId: data.data.userId,
        nip: pegawaiData?.nip,
        jabatan: pegawaiData?.jabatan.nameJob,
        startDate: DateYMDFormat(data.data.startDate),
        endDate: DateYMDFormat(data.data.endDate),
        typeForm: data.data.typeForm,
        description: data.data.description,
      });
    }
  }, [isOpen, data]);

  useEffect(() => {
    setIsLoading(false);
    setFormError({});
    refetch();
    refetchPegawai();
  }, [isOpen]);

  const validateData = () => {
    const errors: errorProps = {};
    if (!formData.userId) errors.userId = "Pegawai tidak boleh kosong";
    if (!formData.typeForm)
      errors.typeForm = "Tipe pengajuan tidak boleh kosong";
    if (!formData.startDate) errors.startDate = "Tanggal tidak boleh kosong";

    return errors;
  };

  const { mutate: mutatePost } = useUpdateSuratPegawai();

  const handleSubmit = () => {
    setFormError({});

    const validate = validateData();
    if (Object.keys(validate).length > 0) {
      setFormError(validate);
      return false;
    }

    setIsLoading(true);

    const formToSend: StoreSuratPegawai = {};
    if (formData.userId) formToSend.userId = formData.userId;
    if (formData.startDate) formToSend.startDate = formData.startDate;
    if (formData.endDate) {
      formToSend.endDate = formData.endDate;
    } else {
      formToSend.endDate = formData.startDate;
    }
    if (formData.typeForm) formToSend.typeForm = formData.typeForm;
    if (formData.description) formToSend.description = formData.description;

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
            <span className="text-base font-semibold">Update Data Unit</span>
            <LuX
              className="text-danger border border-danger rounded-full p-2 cursor-pointer"
              onClick={onClose}
              size={32}
            />
          </ModalHeader>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom flex flex-col gap-4 pb-8">
            <div className="grid md:grid-cols-6 grid-cols-1 gap-2">
              <div className="md:col-span-2 col-span-1">
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
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
                  onSelectionChange={(value) => changePegawai(value as string)}
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
              <div className="md:col-span-2 col-span-1">
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
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
              <div className="md:col-span-2 col-span-1">
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
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
              <div className="md:col-span-6 col-span-1">
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Tipe <span className="text-danger">*</span>
                  </label>
                </div>
                <RadioGroup
                  size="sm"
                  value={formData.typeForm}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      typeForm: e.target.value,
                    }))
                  }
                  orientation="horizontal"
                >
                  <Radio value={"CUTI"} key={"CUTI"}>
                    Cuti
                  </Radio>
                  <Radio value={"KENAIKAN_GAJI"} key={"KENAIKAN_GAJI"}>
                    Kenaikan Gaji
                  </Radio>
                  <Radio value={"KENAIKAN_PANGKAT"} key={"KENAIKAN_PANGKAT"}>
                    Kenaikan Pangkat
                  </Radio>
                </RadioGroup>
                <div className="text-xs italic text-danger">
                  {formError.typeForm}
                </div>
              </div>
              <div className="md:col-span-3 col-span-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  {formData.typeForm === "CUTI"
                    ? "Tanggal Mulai"
                    : "Terhitung Mulai Tanggal"}{" "}
                  <span className="text-danger">*</span>
                </label>
                <Input
                  aria-label="lokasi"
                  type="date"
                  variant="bordered"
                  radius="sm"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  placeholder="Masukkan disini"
                  classNames={{
                    input: "text-xs",
                  }}
                />
                <div className="text-xs italic text-danger">
                  {formError.startDate}
                </div>
              </div>
              {formData.typeForm === "CUTI" && (
                <div className="md:col-span-3 col-span-1">
                  <label htmlFor="lokasi" className="text-xs font-semibold">
                    Tanggal Selesai <span className="text-danger">*</span>
                  </label>
                  <Input
                    aria-label="lokasi"
                    type="date"
                    variant="bordered"
                    radius="sm"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    placeholder="Masukkan disini"
                    classNames={{
                      input: "text-xs",
                    }}
                  />
                  <div className="text-xs italic text-danger">
                    {formError.endDate}
                  </div>
                </div>
              )}
              <div className="md:col-span-6 col-span-1 flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Alasan
                </label>
                <Textarea
                  aria-label="lokasi"
                  variant="bordered"
                  radius="sm"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Masukkan disini"
                  classNames={{
                    input: "text-xs",
                  }}
                />
                <div className="text-xs italic text-danger">
                  {formError.description}
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
