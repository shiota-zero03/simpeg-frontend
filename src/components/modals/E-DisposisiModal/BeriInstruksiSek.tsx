import {
  Button,
  Checkbox,
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
import { LuX } from "react-icons/lu";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { Commet } from "react-loading-indicators";
import {
  useGetDetailEDisposisi,
  useTeruskanEDisposisi,
  useVerifikasiEDisposisi,
} from "@/services/e-disposisi";
import { DMYIndoToFormat } from "@/utils/dateFormater";
import { LucideSave } from "lucide-react";
import { StoreEDisposisi } from "@/interface/request/e-disposisi.interface";

interface props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
}

const BeriInstruksiSek = ({ id, isOpen, onClose, handleClose }: props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [uptdName, setUptdName] = useState<string | null>();
    const [penerusan, setPenerusan] = useState<string[]>([]);
    const [showInputFor, setShowInputFor] = useState<string | null>(null);
    
    const handleCheckboxChange = (name: string, checked: boolean) => {
        if (checked) {
            if(name === "Sekretariat") {
                let penerusanForm = [
                    ...penerusan, 
                    "Sekretariat",
                    "Kasubbag Umum & Kepegawaian",
                    "Kasubbag Perencanaan"
                ]
                setPenerusan(penerusanForm);
            } else if((name === "Kasubbag Umum & Kepegawaian") || (name === "Kasubbag Perencanaan")) {
                let penerusanForm = [
                    ...penerusan,
                    ...(penerusan.includes("Sekretariat") ? [] : ["Sekretariat"]),
                    name
                    ];
                    setPenerusan(penerusanForm);
            } else {
                setPenerusan((prev) => [...prev, name]);
            }
            if (name === "UPTD") {
                setShowInputFor(name);
            }
        } else {
            if(name === "Sekretariat") {
                setPenerusan((prev) => prev.filter((item) => item !== "Sekretariat"));
                setPenerusan((prev) => prev.filter((item) => item !== "Kasubbag Umum & Kepegawaian"));
                setPenerusan((prev) => prev.filter((item) => item !== "Kasubbag Perencanaan"));
            } else if((name === "Kasubbag Umum & Kepegawaian" && !penerusan.includes("Kasubbag Perencanaan")) || (name === "Kasubbag Perencanaan" && !penerusan.includes("Kasubbag Umum & Kepegawaian"))) {
                setPenerusan((prev) => prev.filter((item) => item !== "Sekretariat"));
                setPenerusan((prev) => prev.filter((item) => item !== name));
            } else {
                setPenerusan((prev) => prev.filter((item) => item !== name));
            }
            if (name === showInputFor) {
                setShowInputFor(null);
            }
        }
    };

    const [formData, setFormData] = useState({
        diteruskan: "",
        harap: "",
        textHarap: "",
        catatan: "",
        uptdName: "",
    });

  const { data, isFetching, refetch } = useGetDetailEDisposisi(String(id));

  const DATA_FETCHING = useMemo(() => {
    if (data) return data.data;
    else return null;
  }, [data, id, isOpen]);

  useEffect(() => {
    setIsLoading(false);
    setUptdName(null)
    setShowInputFor(null)
    setPenerusan([])
    setFormData({
        diteruskan: "",
        harap: "",
        textHarap: "",
        catatan: "",
        uptdName: "",
    })
    refetch();
  }, [id, isOpen]);

  const { mutate: mutatePost } = useTeruskanEDisposisi();
  const { mutate: mutatePost2 } = useVerifikasiEDisposisi();

  const handleSubmit = () => {

    if (penerusan.length === 0) {
        ErrorToast({ text: "Diteruskan belum dipilih" });
        return false;
    }
    if (!formData.harap) {
        ErrorToast({ text: "Dengan hormat belum dipilih" });
        return false;
    }

    const hasilGabungan = [...penerusan];
    if (penerusan.includes("UPTD")) {
        // Tambahkan uptdName jika belum ada
        if (!hasilGabungan.includes(uptdName ?? "")) {
            hasilGabungan.push(uptdName ?? "");
        }
    }
    
    const hasilString = hasilGabungan.join(";");
    
    setIsLoading(true);

    const formToSend: StoreEDisposisi = {};
    formToSend.disposisiId = Number(id);
    if (formData.catatan) formToSend.instruksi = formData.catatan;
    if (hasilString) {
        formToSend.diteruskan = hasilString;
    }
    if (formData.harap) {
        if (formData.harap === "Lainnya") {
            formToSend.denganHormat = formData.textHarap;
        } else {
            formToSend.denganHormat = formData.harap;
        }
    }

    const runMutatePost = () => new Promise<void>((resolve, reject) => {
        mutatePost(
            { id: id },
            {
                onSuccess: () => {
                    resolve();
                },
                onError: (error: AxiosError<BaseErrorRes>) => {
                    ErrorToast({
                        text: error.response?.data.message || "Terjadi kesalahan saat mem-paraf data",
                    });
                    reject(error);
                },
            }
        );
    });

    const runMutatePost2 = () => new Promise<void>((resolve, reject) => {
        mutatePost2(formToSend, {
            onSuccess: () => {
                resolve();
            },
            onError: (error: AxiosError<BaseErrorRes>) => {
                ErrorToast({
                    text: error.response?.data.message || "Terjadi kesalahan saat mengirim data",
                });
                reject(error);
            },
        });
    });


    runMutatePost()
    .then(() => runMutatePost2())
    .then(() => runMutatePost2())
    .then(() => {
        SuccessToast({ text: "Data berhasil diperbarui" });
        handleClose();
    })
    .catch((error) => {
        console.error(error);
    })
    .finally(() => {
        setIsLoading(false);
    });
  };
  

  const diteruskan = [
    { name: "Sekretariat", sub: false },
    { name: "Kasubbag Umum & Kepegawaian", sub: true },
    { name: "Kasubbag Perencanaan", sub: true },
    { name: "Bidang Sarana & Pelaku Distribusi", sub: false },
    { name: "Bidang Pengendalian Barang Pokok & Penting", sub: false },
    { name: "Bidang Pengembangan Perdagangan Luar Negeri", sub: false },
    { name: "Bidang Kemetrologian", sub: false },
    { name: "UPTD", sub: false },
  ];

  const harap = [
    { name: "Tanggapan dan saran" },
    { name: "Proses Lebih lanjut" },
    { name: "Koordinasi / Konfirmasikan" },
    { name: "Lainnya" },
  ];

  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="4xl">
        <ModalContent>
          {isFetching && (
            <div className="inset-0 flex items-center justify-center absolute">
              <Commet color="#32cd32" size="medium" text="" textColor="" />
            </div>
          )}
          <ModalHeader className="flex items-center justify-between">
            <span className="text-base font-semibold">
              Berikan Instruksi
            </span>
            <LuX
              className="text-danger border border-danger rounded-full p-2 cursor-pointer"
              onClick={onClose}
              size={32}
            />
          </ModalHeader>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom flex flex-col gap-4 pb-8">
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-2 border rounded-md md:p-4 p-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Surat dari
                </label>
                <Input
                  aria-label="lokasi"
                  isReadOnly
                  variant="bordered"
                  radius="sm"
                  value={DATA_FETCHING?.suratDari}
                  placeholder="Surat Dari"
                  classNames={{
                    input: "text-xs",
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  No. Surat
                </label>
                <Input
                  aria-label="lokasi"
                  isReadOnly
                  variant="bordered"
                  radius="sm"
                  value={DATA_FETCHING?.nomorSurat}
                  placeholder="No. Surat"
                  classNames={{
                    input: "text-xs",
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Tanggal Surat
                </label>
                <Input
                  aria-label="lokasi"
                  isReadOnly
                  variant="bordered"
                  radius="sm"
                  value={DMYIndoToFormat(DATA_FETCHING?.tanggalSurat || "")}
                  placeholder="Tanggal Surat"
                  classNames={{
                    input: "text-xs",
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Tanggal Diterima
                </label>
                <Input
                  aria-label="lokasi"
                  isReadOnly
                  variant="bordered"
                  radius="sm"
                  value={DMYIndoToFormat(DATA_FETCHING?.tanggalDiterima || "")}
                  placeholder="Tanggal Diterima"
                  classNames={{
                    input: "text-xs",
                  }}
                />
              </div>
              <div className="lg:col-span-2 col-span-1 flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Sifat
                </label>
                <Input
                  aria-label="lokasi"
                  isReadOnly
                  variant="bordered"
                  radius="sm"
                  value={
                    DATA_FETCHING?.sifat &&
                    (DATA_FETCHING?.sifat === "SANGAT_SEGERA"
                      ? "Sangat Segera"
                      : DATA_FETCHING?.sifat === "SEGERA"
                        ? "Segera"
                        : "Rahasia")
                  }
                  placeholder="Sifat"
                  classNames={{
                    input: "text-xs",
                  }}
                />
              </div>
            </div>
            <div className="border rounded-md md:p-4 p-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">
                  Perihal
                </label>
                <div className="text-xs">{DATA_FETCHING?.description}</div>
              </div>
            </div>
            <div className="border rounded-md md:p-4 p-2">
                <div className="grid md:grid-cols-2 grid-cols-1 items-start gap-4 mb-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="diteruskan" className="text-sm font-semibold">
                            Diteruskan kepada :
                        </label>
                        <div className="ms-4 space-y-2">
                            {diteruskan.map((item) => (
                                <div key={item.name} className={`${item.sub ? 'ms-6' : ''}`}>
                                    <Checkbox
                                        size="sm"
                                        isSelected={penerusan.includes(item.name)}
                                        onChange={(e) =>
                                            handleCheckboxChange(item.name, e.target.checked)
                                        }
                                    >
                                        {item.name}
                                    </Checkbox>
                                    {showInputFor === item.name && (
                                        <Input
                                            aria-label="masukkan data"
                                            onClick={(e) => e.stopPropagation()}
                                            isDisabled={showInputFor !== item.name}
                                            value={uptdName ?? ""}
                                            onChange={(e) => setUptdName(e.target.value)}
                                            variant="bordered"
                                            radius="sm"
                                            placeholder="Masukkan Disini"
                                            className="mx-4"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="diteruskan" className="text-sm font-semibold">
                            Dengan hormat harap :
                        </label>
                        <RadioGroup
                            size="sm"
                            value={formData.harap}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    harap: e.target.value,
                                }))
                            }
                            orientation="vertical"
                            className="ms-4"
                        >
                            {harap.map((item) => (
                                <Radio value={item.name} key={item.name}>
                                    {item.name}
                                </Radio>
                            ))}
                        </RadioGroup>
                        <Input
                            aria-label="masukkan data"
                            onClick={(e) => e.stopPropagation()}
                            isDisabled={formData.harap !== "Lainnya"}
                            value={
                                formData.harap === "Lainnya" ? formData.textHarap : ""
                            }
                            onChange={(e) =>
                                setFormData({ ...formData, textHarap: e.target.value })
                            }
                            variant="bordered"
                            radius="sm"
                            placeholder="Masukkan Disini"
                            className="mx-4"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1 mb-4">
                    <label htmlFor="Catatan" className="text-sm font-semibold">
                        Catatan
                    </label>
                    <Textarea
                        aria-label="catatan"
                        variant="bordered"
                        placeholder="Masukkan disini"
                        value={formData.catatan}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                catatan: e.target.value,
                            })
                        }
                    />
                </div>
                <Button
                    isLoading={isLoading}
                    onPress={handleSubmit}
                    className="border border-button-primary bg-button-primary text-white font-semibold"
                    size="sm"
                    radius="sm"
                >
                    <LucideSave size={16} /> Simpan Data
                </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BeriInstruksiSek;
