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
import { useGetAllUnitOption } from "@/services/unit";
import { JabatanPermenpan } from "@/constants/Jabatan";
import { EselonData } from "@/constants/DummyData";

interface props {
  id: number | null;
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
}

interface formProps {
  nama: string;
  fungsional: boolean;
  kelas: number | null;
  jabatanPermenpan: string | null;
  subJabatanPermenpan: string | null;
  atasan: string | null;
  unitId: string | null;
  subUnor: string | null;
  eselon: string | null;
  ketersediaan: string | null;
}

interface errorProps {
  nama?: string;
  kelas?: string;
  jabatanPermenpan?: string;
  subJabatanPermenpan?: string;
  atasan?: string;
  unitId?: string;
  subUnor?: string;
  eselon?: string;
  ketersediaan?: string;
}

const UpdateModal = ({ id, isOpen, onClose, handleClose }: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<formProps>({
    nama: "",
    fungsional: false,
    kelas: null,
    jabatanPermenpan: null,
    subJabatanPermenpan: null,
    atasan: null,
    unitId: null,
    subUnor: null,
    eselon: null,
    ketersediaan: null,
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

  const {
    data: allDataUnit,
    isFetching: isFetchingUnitUnit,
    refetch: refetchUnitUnit,
  } = useGetAllUnitOption();
  const UNIT_SELECT = useMemo(() => {
    return allDataUnit ? allDataUnit.data : [];
  }, [allDataUnit]);

  const SubPermenpan = useMemo(() => {
    if(formData.jabatanPermenpan) {
      const subJabatan = JabatanPermenpan.find(it => it.key === formData.jabatanPermenpan);
      return subJabatan?.subPermenpan || [];
    } else {
      return [];
    }
  }, [formData.jabatanPermenpan])

  useEffect(() => {
    if (data) {
      setFormData({
        nama: data.data.nameJob,
        fungsional: data.data.fungsional,
        kelas: Number(data.data.class),
        jabatanPermenpan: data.data.jabatanPermenpan,
        subJabatanPermenpan: data.data.subJabatanPermenpan,
        atasan: String(data.data.atasan || ""),
        unitId: String(data.data.unitId || ""),
        subUnor: data.data.subUnor,
        eselon: data.data.eselon,
        ketersediaan: String(data.data.ketersediaan),
      });
    }
  }, [isOpen, data]);

  useEffect(() => {
    setIsLoading(false);
    setFormError({});
    refetchJabatan();
    refetchUnitUnit();
    refetch();
  }, [isOpen]);

  const validateData = () => {
    const errors: errorProps = {};
    if (!formData.nama) errors.nama = "Nama jabatan tidak boleh kosong";
    if (!formData.kelas) errors.kelas = "Kelas jabatan tidak boleh kosong";
    if (!formData.jabatanPermenpan) errors.kelas = "Jabatan permenpan tidak boleh kosong";
    if (!formData.subUnor) errors.kelas = "unit kerja tidak boleh kosong";
    if (!formData.unitId) errors.unitId = "Sub unor tidak boleh kosong";
    if (!formData.ketersediaan) errors.ketersediaan = "Ketersediaan tidak boleh kosong";
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
    if(formData.nama) formToSend.nameJob = formData.nama;
    formToSend.fungsional = formData.fungsional;
    if(formData.kelas) formToSend.Class = String(formData.kelas);
    if(formData.jabatanPermenpan) formToSend.jabatanPermenpan = formData.jabatanPermenpan
    if(formData.subJabatanPermenpan) formToSend.subJabatanPermenpan = formData.subJabatanPermenpan
    if(formData.atasan) formToSend.atasan = Number(formData.atasan)
    if(formData.unitId) formToSend.unitId = Number(formData.unitId)
    if(formData.subUnor) formToSend.subUnor = formData.subUnor
    if(formData.eselon) formToSend.eselon = formData.eselon
    if(formData.ketersediaan) formToSend.ketersediaan = Number(formData.ketersediaan)

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
                  Permenpan <span className="text-danger">*</span>
                </label>
                <Autocomplete
                  aria-label="pegawai"
                  placeholder="Cari jabatan permenpan"
                  variant="bordered"
                  radius="sm"
                  defaultItems={JabatanPermenpan}
                  selectedKey={String(formData.jabatanPermenpan)}
                  onSelectionChange={(value) =>
                    setFormData({ ...formData, jabatanPermenpan: value as string })
                  }
                  inputProps={{
                    classNames: {
                      input: "text-xs",
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
                  {formError.atasan}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Sub Permenpan <span className="text-danger">*</span>
                </label>
                <Autocomplete
                  aria-label="pegawai"
                  placeholder="Cari sub jabatan permenpan"
                  variant="bordered"
                  radius="sm"
                  defaultItems={SubPermenpan}
                  selectedKey={String(formData.subJabatanPermenpan)}
                  onSelectionChange={(value) =>
                    setFormData({ ...formData, subJabatanPermenpan: value as string })
                  }
                  inputProps={{
                    classNames: {
                      input: "text-xs",
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
                  {formError.subJabatanPermenpan}
                </div>
              </div>
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
                  Eselon
                </label>
                <Select
                    selectedKeys={[formData.eselon || ""]}
                    onChange={(e) =>
                      setFormData({ ...formData, eselon: e.target.value })
                    }
                    aria-label="Judul"
                    labelPlacement="outside"
                    placeholder="Pilih eselon"
                    variant="bordered"
                    radius="sm"
                    classNames={{
                      trigger: "text-xs border-[0.8px]",
                      value: "text-xs",
                    }}
                  >
                    {EselonData.map((item) => (
                      <SelectItem key={item.nama}>{item.nama}</SelectItem>
                    ))}
                  </Select>
                <div className="text-xs italic text-danger">
                  {formError.eselon}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Ketersediaan <span className="text-danger">*</span>
                </label>
                <Input
                  type="number"
                  aria-label="lokasi"
                  variant="bordered"
                  radius="sm"
                  value={String(formData.ketersediaan || "")}
                  onChange={(e) =>
                    setFormData({ ...formData, ketersediaan: e.target.value })
                  }
                  placeholder="Masukkan disini"
                  classNames={{
                    input: "text-xs",
                  }}
                />
                <div className="text-xs italic text-danger">
                  {formError.ketersediaan}
                </div>
              </div>
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
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Unit Kerja <span className="text-danger">*</span>
                </label>
                <Select
                  aria-label="lokasi"
                  variant="bordered"
                  radius="sm"
                  selectedKeys={[String(formData.subUnor)]}
                  onChange={(e) =>
                    setFormData({ ...formData, subUnor: e.target.value })
                  }
                  placeholder="Pilih unit kerja"
                  classNames={{
                    trigger: "text-xs",
                    value: "text-xs",
                  }}
                >
                  <SelectItem key={"PEMERINTAH"} textValue={"Pemerintah Kab. Bekasi"}>
                    Pemerintah Kab. Bekasi
                  </SelectItem>
                  <SelectItem key={"DINAS"} textValue={"Dinas Perdangan Kab. Bekasi"}>
                    Dinas Perdangan Kab. Bekasi
                  </SelectItem>
                </Select>
                <div className="text-xs italic text-danger">
                  {formError.subUnor}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Sub Unor <span className="text-danger">*</span>
                </label>
                <Autocomplete
                  isLoading={isFetchingUnitUnit}
                  aria-label="pegawai"
                  placeholder="Cari sub unor"
                  variant="bordered"
                  radius="sm"
                  defaultItems={UNIT_SELECT}
                  selectedKey={String(formData.unitId)}
                  onSelectionChange={(value) =>
                    setFormData({ ...formData, unitId: value as string })
                  }
                  inputProps={{
                    classNames: {
                      input: "text-xs",
                    },
                  }}
                >
                  {(peg) => (
                    <AutocompleteItem key={peg.id} textValue={peg.nameUnit}>
                      {peg.nameUnit}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <div className="text-xs italic text-danger">
                  {formError.unitId}
                </div>
              </div>
              <div className="flex flex-col gap-1 md:col-span-2 col-span-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Atasan
                </label>
                <Autocomplete
                  isLoading={isFetchingJabatan}
                  aria-label="pegawai"
                  placeholder="Cari atasan"
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
