import { Autocomplete, AutocompleteItem, Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { LuFile, LuSave, LuX } from "react-icons/lu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LucideCalendarDays, LucidePlusCircle, LucideTrash2, LucideUploadCloud } from "lucide-react";
import { PegawaiDummy } from "@/constants/DummyData";
import { convertFileToBase64 } from "@/utils/base64Formater";
import { SuccessToast } from "@/utils/ToastMessage";

interface props {
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
}

interface formProps {
  atasan?: string;
  pegawai: number | null;
  kegiatan: string;
  waktu: string;
  lokasi: string;
  anggaran: number;
  pengikut: string[];
  tahun: number;
  file: string;
}

interface errorProps {
  pegawai?: string;
  kegiatan?: string;
  waktu?: string;
  lokasi?: string;
  anggaran?: string;
  pengikut?: string;
  tahun?: string;
  file?: string;
}

const CreateModal = ({ isOpen, onClose, handleClose }: props) => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false)

  const [ waktuKegiatan, setWaktuKegiatan ] = useState<Date | null>(null)

  const [ Pengikut, setPengikut ] = useState<string[]>([])
  const addPengikut = () => {
    setPengikut([...Pengikut, ""]);
  };

  const removePengikut = (index: number) => {
    if (Pengikut.length > 1) {
      setPengikut(Pengikut.filter((_, i) => i !== index));
    }
  };

  const [formData, setFormData] = useState<formProps>({
    pegawai: null,
    kegiatan: "",
    waktu: "",
    lokasi: "",
    anggaran: 0,
    pengikut: [],
    tahun: new Date().getFullYear(),
    file: "",
  });

  const [ formError, setFormError ] = useState<errorProps>({})

  const formatCurrency = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const [formattedValue, setFormattedValue] = useState("");
  
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputVal = e.target.value.replace(/\D/g, ""); // Hanya angka
    setFormattedValue(formatCurrency(inputVal));
    setFormData({ ...formData, anggaran: Number(inputVal) })
  };

  useEffect(() => {
    setFormData({
      pegawai: null,
      kegiatan: "",
      waktu: "",
      lokasi: "",
      anggaran: 0,
      pengikut: [],
      tahun: new Date().getFullYear(),
      file: "",
    })
    setIsLoading(false)
    setWaktuKegiatan(null)
    setPengikut([]);
    setFormError({})
  },[isOpen])

  const pegawai = useMemo(() => {
    return PegawaiDummy;
  }, [])

  useEffect(() => {
    if(formData.pegawai) {
      setFormData({...formData, atasan: pegawai.find(item => item.id === formData.pegawai)?.atasan})
    } else {
      setFormData({...formData, atasan: ""})
    }
  }, [formData.pegawai])

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const fileToShow = await convertFileToBase64(file)
      setFormData({ ...formData, file: fileToShow });
    } else {
      setFormData({ ...formData, file: "" });
    }
  }

  const handleSubmit = () => {
    setIsLoading(true)
    // const formatted = new Date(waktuKegiatan || "").toISOString().slice(0, 10);
    // console.log(formatted)
    setTimeout(() => {
      handleClose();
      SuccessToast({ text: 'Data berhasil ditambahkan' })
      setIsLoading(false)
    }, 1000);
  }

  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="2xl">
        <ModalContent>
          <ModalHeader className="flex items-center justify-between">
            <span className="text-base font-semibold">Tambah Data SPPD</span>
            <LuX className="text-danger border border-danger rounded-full p-2 cursor-pointer" onClick={onClose} size={32} />
          </ModalHeader>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom flex flex-col gap-2 pb-8">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">Atasan <span className="text-danger">*</span></label>
                <Input
                  aria-label="lokasi"
                  isReadOnly
                  variant="bordered"
                  radius="sm"
                  value={formData.atasan}
                  placeholder="AUTO_FILLED"
                  classNames={{
                    inputWrapper: "bg-slate-50",
                    input: "text-xs"
                  }}
                />
                <div className="text-xs italic text-danger">{formError.lokasi}</div>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="tanggal" className="text-xs font-semibold">Pilih Pegawai <span className="text-danger">*</span></label>
                <Autocomplete
                  aria-label="pegawai"
                  placeholder="Cari pegawai"
                  variant="bordered"
                  radius="sm"
                  defaultItems={pegawai}
                  selectedKey={String(formData.pegawai)}
                  onSelectionChange={(value) => setFormData({...formData, pegawai: Number(value)})}
                  inputProps={{
                    classNames: {
                      input: 'text-xs'
                    }
                  }}
                >
                  {(peg) => <AutocompleteItem key={peg.id} textValue={peg.nama}>{peg.nama}</AutocompleteItem>}
                </Autocomplete>
                <div className="text-xs italic text-danger">{formError.pegawai}</div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lokasi" className="text-xs font-semibold">Nama Kegiatan <span className="text-danger">*</span></label>
              <Input
                aria-label="lokasi"
                variant="bordered"
                radius="sm"
                value={formData.kegiatan}
                onChange={(e) => setFormData({...formData, kegiatan: e.target.value})}
                placeholder="Masukkan disini"
                classNames={{
                  input: "text-xs"
                }}
              />
              <div className="text-xs italic text-danger">{formError.kegiatan}</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-1 md:col-span-1 col-span-3">
                <label htmlFor="tanggal" className="text-xs font-semibold">Waktu Pelaksanaan <span className="text-danger">*</span></label>
                <DatePicker
                  selected={waktuKegiatan}
                  onChange={(date) => setWaktuKegiatan(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Pilih Tanggal"
                  showIcon
                  icon={<LucideCalendarDays size={8} />}
                  calendarIconClassName="absolute left-1 top-[50%] -translate-y-[50%]"
                  // popperClassName="absolute"
                  popperPlacement="bottom"
                  closeOnScroll={true}
                  customInput={
                    <Input
                      aria-label="tanggal"
                      radius="sm"
                      variant="bordered"
                      classNames={{
                        input: 'text-xs'
                      }}
                    />
                  }
                />
                <div className="text-xs italic text-danger">{formError.waktu}</div>
              </div>
              <div className="md:col-span-2 col-span-3 flex flex-col gap-1">
                <label htmlFor="lokasi" className="text-xs font-semibold">Lokasi Pelaksanaan <span className="text-danger">*</span></label>
                <Input
                  aria-label="lokasi"
                  variant="bordered"
                  radius="sm"
                  value={formData.lokasi}
                  onChange={(e) => setFormData({...formData, lokasi: e.target.value})}
                  placeholder="Masukkan disini"
                  classNames={{
                    input: "text-xs"
                  }}
                />
                <div className="text-xs italic text-danger">{formError.lokasi}</div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lokasi" className="text-xs font-semibold">Anggaran <span className="text-danger">*</span></label>
              <Input
                startContent={
                  <div className="text-xs">Rp</div>
                }
                aria-label="lokasi"
                variant="bordered"
                radius="sm"
                value={formattedValue}
                onChange={handleChangeValue}
                placeholder="Masukkan disini"
                classNames={{
                  input: "text-xs"
                }}
              />
              <div className="text-xs italic text-danger">{formError.anggaran}</div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <label htmlFor="lokasi" className="text-xs font-semibold">Pengikut <span className="text-danger">*</span></label>
                  {Pengikut.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        aria-label="lokasi"
                        variant="bordered"
                        radius="sm"
                        value={item}
                        onChange={(e) => {
                          const newPengikut = [...Pengikut];
                          (newPengikut[index] as any) = e.target.value;
                          setPengikut(newPengikut)
                        }}
                        placeholder="Masukkan disini"
                        classNames={{
                          input: "text-xs"
                        }}
                      />
                      <Button onPress={() => removePengikut(index)} isIconOnly variant="bordered" color="danger" radius="sm"><LucideTrash2 size={16} /></Button>
                    </div>
                  ))}
                </div>
                <div>
                  <button onClick={addPengikut} className="flex items-center gap-2 bg-accent-primary w-auto text-white text-xs px-2 py-1 rounded-full">
                    <LucidePlusCircle size={12} /> Tambah Pengikut
                  </button>
                </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lokasi" className="text-xs font-semibold">Tahun <span className="text-danger">*</span></label>
              <Input
                type="number"
                aria-label="lokasi"
                variant="bordered"
                radius="sm"
                value={String(formData.tahun)}
                onChange={(e) => setFormData({...formData, tahun: Number(e.target.value)})}
                placeholder="Masukkan disini"
                classNames={{
                  input: "text-xs"
                }}
              />
              <div className="text-xs italic text-danger">{formError.tahun}</div>
            </div>
            <div className='max-w-80'>
              <div className='mb-1'>
                <label htmlFor="content" className='font-semibold text-xs'>File <span className="text-danger">*</span></label>
              </div>
              <div className='border p-8 mb-2 flex items-center justify-center'>
                  {formData.file ? (
                    <LuFile size={32} />
                  ) : (
                    <LucideUploadCloud size={32} />
                  )}
              </div>
              <input type="file" onChange={handleChangeFile} accept='.png,.jpg,.jpeg' />
              <div className="text-danger text-[0.7rem] mt-1">
                  {formError.file}
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

export default CreateModal;
