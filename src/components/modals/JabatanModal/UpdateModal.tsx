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
  Select,
  SelectItem,
} from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { LuSave, LuX } from "react-icons/lu";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import {
  useGetAllJabatanOption,
  useGetDetailJabatan,
  useUpdateJabatan,
} from "@/services/jabatan";
import { StoreJabatan } from "@/interface/request/jabatan.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { Commet } from "react-loading-indicators";

interface props {
  id: number | null;
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
}

interface formProps {
  nama: string;
  singkatan: string;
  kelas: number | null;
  atasan: string | null;
  fungsional: boolean;
  jabatanFungsional: string | null;
  fungsionalJob: string | null;
}

interface errorProps {
  nama?: string;
  singkatan?: string;
  kelas?: string;
  atasan?: string;
  fungsional?: string;
  jabatanFungsional?: string;
  fungsionalJob?: string;
}

const UpdateModal = ({ id, isOpen, onClose, handleClose }: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<formProps>({
    nama: "",
    singkatan: "",
    kelas: null,
    atasan: null,
    fungsional: false,
    jabatanFungsional: null,
    fungsionalJob: null,
  });

  const [formError, setFormError] = useState<errorProps>({});

  const { data, isFetching, refetch } = useGetDetailJabatan(String(id));

  const {
    data: allData,
    isFetching: isFetchingJabatan,
    refetch: refetchJabatan,
  } = useGetAllJabatanOption();
  const JABATAN_SELECT = useMemo(() => {
    return allData ? allData.data : [];
  }, [allData]);

  useEffect(() => {
    if (data) {
      setFormData({
        nama: data.data.nameJob,
        singkatan: data.data.singkatan,
        kelas: Number(data.data.class),
        atasan: String(data.data.atasan || ""),
        fungsional: data.data.fungsional,
        jabatanFungsional: data.data.jabatanFungsional,
        fungsionalJob: data.data.fungsionalJob,
      });
    }
  }, [isOpen, data]);

  useEffect(() => {
    setIsLoading(false);
    setFormError({});
    refetchJabatan();
    refetch();
  }, [isOpen]);

  const validateData = () => {
    const errors: errorProps = {};
    if (!formData.nama) errors.nama = "Nama jabatan tidak boleh kosong";
    if (!formData.singkatan)
      errors.singkatan = "Singkatan jabatan tidak boleh kosong";
    if (!formData.kelas) errors.kelas = "Kelas jabatan tidak boleh kosong";

    if (formData.fungsional) {
      if (!formData.jabatanFungsional)
        errors.jabatanFungsional = "Jenis jabatan fungsional tidak boleh kosong";
      if (!formData.fungsionalJob)
        errors.fungsionalJob = "Jabatan fungsional tidak boleh kosong";
    }

    return errors;
  };

  const { mutate: mutatePost } = useUpdateJabatan();

  const handleSubmit = () => {
    setFormError({});

    const validate = validateData();
    if (Object.keys(validate).length > 0) {
      setFormError(validate);
      return false;
    }

    setIsLoading(true);

    const formToSend: StoreJabatan = {};
    if (formData.nama) formToSend.nameJob = formData.nama;
    if (formData.singkatan) formToSend.singkatan = formData.singkatan;
    if (formData.fungsional) {
      formToSend.fungsional = true;
      if (formData.fungsionalJob) {
        formToSend.fungsionalJob = formData.fungsionalJob;
      }
      if (formData.jabatanFungsional) {
        formToSend.jabatanFungsional = formData.jabatanFungsional;
      }
    } else {
      formToSend.fungsional = false;
      formToSend.fungsionalJob = null;
      formToSend.jabatanFungsional = null;
    }
    if (formData.kelas) formToSend.Class = String(formData.kelas);
    if (formData.atasan) formToSend.atasan = Number(formData.atasan);

    try {
      mutatePost(
        { id: String(id), formData: formToSend },
        {
          onSuccess: () => {
            SuccessToast({ text: "Data berhasil ditambahkan" });
            handleClose();
          },
          onError: (error: AxiosError<BaseErrorRes>) => {
            ErrorToast({
              text:
                (error.response?.data.error as string) ||
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
            <span className="text-base font-semibold">Update Data Jabatan</span>
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
                  Nama Jabatan <span className="text-danger">*</span>
                </label>
                <Input
                  aria-label="lokasi"
                  variant="bordered"
                  radius="sm"
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData({ ...formData, nama: e.target.value })
                  }
                  placeholder="Masukkan disini"
                  classNames={{
                    input: "text-xs",
                  }}
                />
                <div className="text-xs italic text-danger">
                  {formError.nama}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Singkatan <span className="text-danger">*</span>
                </label>
                <Input
                  aria-label="lokasi"
                  variant="bordered"
                  radius="sm"
                  value={formData.singkatan}
                  onChange={(e) =>
                    setFormData({ ...formData, singkatan: e.target.value })
                  }
                  placeholder="Masukkan disini"
                  classNames={{
                    input: "text-xs",
                  }}
                />
                <div className="text-xs italic text-danger">
                  {formError.singkatan}
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div className="flex flex-col gap-1 md:col-span-2 col-span-1">
                <div className="mb-0.5">
                  <label htmlFor="lokasi" className="text-xs font-semibold">
                    Jabatan Fungsional ? <span className="text-danger">*</span>
                  </label>
                </div>
                <RadioGroup
                  aria-label="Jabatan Fungsional"
                  orientation="horizontal"
                  size="sm"
                  value={formData.fungsional ? "true" : "false"}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      fungsional: value === "true" ? true : false,
                    })
                  }
                >
                  <Radio value="true">Ya</Radio>
                  <Radio value="false">Tidak</Radio>
                </RadioGroup>
              </div>
              {formData.fungsional && (
                <div className="flex flex-col gap-1">
                  <label htmlFor="lokasi" className="text-xs font-semibold">
                    Jenis Jabatan Fungsional{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <Select
                    aria-label="lokasi"
                    variant="bordered"
                    radius="sm"
                    selectedKeys={[String(formData.fungsionalJob)]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fungsionalJob: e.target.value,
                      })
                    }
                    placeholder="Pilih Jabatan Fungsional"
                    classNames={{
                      trigger: "text-xs",
                      value: "text-xs"
                    }}
                  >
                    <SelectItem
                      key={`ANALIS_PERDAGANGAN`}
                      textValue={`Analis Perdagangan`}
                    >
                      Analis Perdagangan
                    </SelectItem>
                    <SelectItem
                      key={`PENGAWAS_PERDAGANGAN`}
                      textValue={`Pengawas Perdagangan`}
                    >
                      Pengawas Perdagangan
                    </SelectItem>
                    <SelectItem key={`PENERA`} textValue={`Penera`}>
                      Penera
                    </SelectItem>
                  </Select>
                  <div className="text-xs italic text-danger">
                    {formError.fungsionalJob}
                  </div>
                </div>
              )}
              {formData.fungsional && (
                <div className="flex flex-col gap-1">
                  <label htmlFor="lokasi" className="text-xs font-semibold">
                    Jenis Jabatan Fungsional{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <Select
                    aria-label="lokasi"
                    variant="bordered"
                    radius="sm"
                    selectedKeys={[String(formData.jabatanFungsional)]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        jabatanFungsional: e.target.value,
                      })
                    }
                    placeholder="Pilih Jenis Jabatan Fungsional"
                    classNames={{
                      trigger: "text-xs",
                      value: "text-xs"
                    }}
                  >
                    <SelectItem
                      key={`MUDA`}
                      textValue={`Ahli Muda`}
                    >
                      Ahli Muda
                    </SelectItem>
                    <SelectItem
                      key={`MADYA`}
                      textValue={`Ahli Madya`}
                    >
                      Ahli Madya
                    </SelectItem>
                    <SelectItem key={`PERTAMA`} textValue={`Ahli Pertama`}>
                      Ahli Pertama
                    </SelectItem>
                  </Select>
                  <div className="text-xs italic text-danger">
                    {formError.jabatanFungsional}
                  </div>
                </div>
              )}
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Kelas <span className="text-danger">*</span>
                </label>
                <Select
                  aria-label="lokasi"
                  variant="bordered"
                  radius="sm"
                  selectedKeys={[String(formData.kelas)]}
                  onChange={(e) =>
                    setFormData({ ...formData, kelas: Number(e.target.value) })
                  }
                  placeholder="Pilih kelas"
                  classNames={{
                    trigger: "text-xs",
                    value: "text-xs",
                  }}
                >
                  {Array.from({ length: 14 }, (_, i) => i + 1).map((item) => (
                    <SelectItem key={`${item}`} textValue={`${item}`}>
                      {item}
                    </SelectItem>
                  ))}
                </Select>
                <div className="text-xs italic text-danger">
                  {formError.kelas}
                </div>
              </div>
              <div className="flex flex-col gap-1 md:col-span-2 col-span-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Atasan
                </label>
                <Autocomplete
                  isLoading={isFetchingJabatan}
                  aria-label="pegawai"
                  placeholder="Cari jabatan atasan"
                  variant="bordered"
                  radius="sm"
                  defaultItems={JABATAN_SELECT}
                  selectedKey={String(formData.atasan)}
                  onSelectionChange={(value) =>
                    setFormData({ ...formData, atasan: value as string })
                  }
                  inputProps={{
                    classNames: {
                      input: "text-xs",
                    },
                  }}
                >
                  {(peg) => (
                    <AutocompleteItem key={peg.id} textValue={peg.nameJob}>
                      {peg.nameJob}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <div className="text-xs italic text-danger">
                  {formError.atasan}
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
