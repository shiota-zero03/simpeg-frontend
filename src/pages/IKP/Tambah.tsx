import { useEffect, useMemo, useState } from "react";
import { TitleCase } from "@/components/card/TitleCase";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  useDisclosure,
} from "@heroui/react";
import { LuArrowLeft, LuSave } from "react-icons/lu";
import ConfirmModal from "@/components/modals/UtilsModal/ConfirmModal";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { useNavigate } from "react-router-dom";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { Link } from "react-router-dom";
import { useGetAllPegawaiPimpinanOption } from "@/services/pegawai";
import { LucidePlusCircle, LucideTrash2 } from "lucide-react";
import { useCreateIKP } from "@/services/ikp";
import { StoreIKP } from "@/interface/request/ikp.interface";

interface formProps {
  userId: string;
  ttdId?: string;
  ttdName?: string;
  ttdNIP?: string;
  ttdJabatan?: string;
}

interface errorProps {
  userId?: string;
  ttdId?: string;
  ttdName?: string;
  ttdNIP?: string;
  ttdJabatan?: string;
}

export default function CreateIKP() {
  const [formUser, setFormUser] = useState<{ nip: string; jabatan: string }>({
    nip: "",
    jabatan: "",
  });

  const [formData, setFormData] = useState<formProps>({
    userId: "",
    ttdId: "",
    ttdName: "",
    ttdNIP: "",
    ttdJabatan: "",
  });

  const [ikps, setIKPS] = useState<
    {
      sasaran?: string;
      indicator?: string;
      target?: string;
      status?: string;
    }[]
  >([{ sasaran: "", indicator: "", target: "", status: "MENUNGGU" }]);

  const addIKPS = () => {
    setIKPS([
      ...ikps,
      { sasaran: "", indicator: "", target: "", status: "MENUNGGU" },
    ]);
  };

  const removeIKPS = (index: number) => {
    if (ikps.length > 1) {
      setIKPS(ikps.filter((_, i) => i !== index));
    }
  };

  const handleChangeIKPS = (
    index: number,
    field: string,
    value: string | number,
  ) => {
    const newIKPData = [...ikps];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (newIKPData[index] as any)[field] = value;
    setIKPS(newIKPData);
  };

  const {
    data: allDataJabatan,
    isFetching: isFetchingJabatan,
    refetch: refetchJabatan,
  } = useGetAllPegawaiPimpinanOption();

  const PEGAWAI_SELECT = useMemo(() => {
    if (!allDataJabatan) return [];
    return allDataJabatan.data.bawahan;
  }, [allDataJabatan]);

  const [formError, setFormError] = useState<errorProps>({});

  const rules = () => {
    const error: errorProps = {};
    if (!formData.userId) error.userId = "Pilih pegawai terlebih dahulu";
    return error;
  };

  useEffect(() => {
    setFormData({
      userId: "",
      ttdId: "",
      ttdName: "",
      ttdNIP: "",
      ttdJabatan: "",
    });
    setFormUser({
      nip: "",
      jabatan: "",
    });
    setIKPS([{ sasaran: "", indicator: "", target: "", status: "MENUNGGU" }]);
    refetchJabatan();
  }, []);

  const onChangePegawai = (value: string) => {
    if (value) {
      const checkPegawai = PEGAWAI_SELECT.find((item) => item.id === value);
      setFormData({ ...formData, userId: value as string });
      setFormUser({
        nip: checkPegawai?.nip || "",
        jabatan: checkPegawai?.jabatan ? checkPegawai?.jabatan.nameJob : "",
      });
    } else {
      setFormData({ ...formData, userId: "" });
      setFormUser({
        nip: "",
        jabatan: "",
      });
    }
  };

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

  const { mutate: mutatePost } = useCreateIKP();
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

    const formToSendData: StoreIKP = {};

    const ikpsData: {
      sasaran?: string;
      indicator?: string;
      target?: string;
      status?: string;
      realisasi?: string;
    }[] = [];

    ikps.forEach((item) => {
      ikpsData.push({
        sasaran: item.sasaran,
        indicator: item.indicator,
        target: item.target,
        status: item.status,
        realisasi: "",
      });
    });

    if (formData.userId) formToSendData.userId = formData.userId;
    if (formData.ttdName) formToSendData.ttdName = formData.ttdName;
    if (formData.ttdNIP) formToSendData.ttdNIP = formData.ttdNIP;
    if (formData.ttdJabatan) formToSendData.ttdJabatan = formData.ttdJabatan;
    if (ikpsData.length > 0) formToSendData.ikps = ikpsData;

    try {
      mutatePost(formToSendData, {
        onSuccess: () => {
          SuccessToast({ text: "Data berhasil disimpan" });
          setLoadingConfirm(false);
          onCloseConfirm();
          navigate("/dialog-kinerja");
        },
        onError: (error: AxiosError<BaseErrorRes>) => {
          setLoadingConfirm(false);
          onCloseConfirm();
          ErrorToast({
            text:
              (error.response?.data.message as string) ||
              "Terjadi kesalahan saat menambah data",
          });
          throw error;
        },
      });
    } catch (error) {
      setLoadingConfirm(false);
      onCloseConfirm();
      throw error;
    }
  };

  return (
    <>
      <BreadcrumbAdmin location="/Dialog-Kinerja/Tambah-Data" />
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        isLoading={isLoadingConfirm}
        handleSubmit={handleConfirm}
      />
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="flex">
          <Link
            to={`/dialog-kinerja`}
            className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
          >
            <LuArrowLeft /> Kembali
          </Link>
        </div>
        <TitleCase title="Tambah Dialog Kinerja (IKP)" />

        <div className="bg-white shadow-md rounded-xl border p-4">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
              <div>
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Nama Pegawai <span className="text-danger">*</span>
                  </label>
                </div>
                <Autocomplete
                  nonce="Tidak ada"
                  defaultItems={PEGAWAI_SELECT}
                  isLoading={isFetchingJabatan}
                  aria-label="pegawai"
                  placeholder={
                    PEGAWAI_SELECT.length > 0
                      ? `Cari pegawai`
                      : `Tidak ditemukan data bawahan`
                  }
                  variant="bordered"
                  radius="sm"
                  selectedKey={String(formData.userId)}
                  onSelectionChange={(value) =>
                    onChangePegawai(value as string)
                  }
                  inputProps={{
                    classNames: {
                      input: "text-xs",
                      inputWrapper: "border-[0.8px]",
                    },
                  }}
                  isDisabled={PEGAWAI_SELECT.length === 0}
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
                  <label htmlFor="content" className="font-semibold text-xs">
                    NIP
                  </label>
                </div>
                <Input
                  isDisabled
                  value={formUser.nip}
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
                  <label htmlFor="content" className="font-semibold text-xs">
                    Jabatan
                  </label>
                </div>
                <Input
                  isDisabled
                  value={formUser.jabatan}
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
              <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
                <div className="mb-1">
                  <label htmlFor="sasaran" className="font-semibold text-xs">
                    Sasaran
                  </label>
                </div>
                <div className="mb-1">
                  <label htmlFor="indikator" className="font-semibold text-xs">
                    Indikator
                  </label>
                </div>
                <div className="mb-1">
                  <label htmlFor="target" className="font-semibold text-xs">
                    Target
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-1 mb-2">
                {ikps.map((item, index) => (
                  <div
                    key={index}
                    className="flex md:flex-row flex-col gap-2 w-full"
                  >
                    <div className="w-full">
                      <Input
                        value={item.sasaran}
                        onChange={(e) =>
                          handleChangeIKPS(index, "sasaran", e.target.value)
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
                    </div>
                    <div className="w-full">
                      <Input
                        value={item.indicator}
                        onChange={(e) =>
                          handleChangeIKPS(index, "indicator", e.target.value)
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
                    </div>
                    <div className="w-full">
                      <Input
                        value={item.target}
                        onChange={(e) =>
                          handleChangeIKPS(index, "target", e.target.value)
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
                    </div>
                    {ikps.length > 1 && (
                      <div>
                        <Button
                          onPress={() => removeIKPS(index)}
                          radius="sm"
                          isIconOnly
                          variant="bordered"
                          className="border border-danger text-danger"
                        >
                          <LucideTrash2 size={14} />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <Button
                  onPress={addIKPS}
                  radius="full"
                  size="sm"
                  className="bg-button-primary text-white max-w-48 flex justify-start text-xs"
                >
                  <LucidePlusCircle size={14} />
                  Tambah Data
                </Button>
              </div>
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
