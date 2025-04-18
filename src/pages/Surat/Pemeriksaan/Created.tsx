import { useEffect, useMemo, useState } from "react";
import { TitleCase } from "@/components/card/TitleCase";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  useDisclosure,
} from "@heroui/react";
import { LuArrowLeft, LuSave } from "react-icons/lu";
import ConfirmModal from "@/components/modals/UtilsModal/ConfirmModal";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { useNavigate } from "react-router-dom";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link } from "react-router-dom";
import { useGetAllPegawaiOption } from "@/services/pegawai";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreSuratPemeriksaan } from "@/interface/request/surat.interface";
import { useCreateSuratPemeriksaan } from "@/services/surat/pemeriksaan";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor, SimpleUploadAdapter } from "ckeditor5";
import { ckPlugins, ckToolbar } from "@/constants/CkEditorPlugin";

interface formProps {
  nomorSurat?: string;
  tempatDikeluarkan?: string;
  tanggalSurat?: string;
  idDiperintah?: string;
  pemberiPerintah?: string;
  nipPemberiPerintah?: string;
  jabatanPemberiPerintah?: string;
  diPerintah?: string;
  nipDiPerintah?: string;
  jabatanDiPerintah?: string;
  keterangan?: string;
  idTtd?: string;
  namaTtd?: string;
  nipTtd?: string;
  jabatanTtd?: string;
}

interface errorProps {
  nomorSurat?: string;
  tempatDikeluarkan?: string;
  tanggalSurat?: string;
  pemberiPerintah?: string;
  nipPemberiPerintah?: string;
  jabatanPemberiPerintah?: string;
  diPerintah?: string;
  nipDiPerintah?: string;
  jabatanDiPerintah?: string;
  keterangan?: string;
  namaTtd?: string;
  nipTtd?: string;
  jabatanTtd?: string;
}

export default function CreateSurat() {
  const [formData, setFormData] = useState<formProps>({
    nomorSurat: "",
    tempatDikeluarkan: "",
    tanggalSurat: "",
    pemberiPerintah: "",
    nipPemberiPerintah: "",
    idDiperintah: "",
    jabatanPemberiPerintah: "",
    diPerintah: "",
    nipDiPerintah: "",
    jabatanDiPerintah: "",
    keterangan: "",
    idTtd: "",
    namaTtd: "",
    nipTtd: "",
    jabatanTtd: "",
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

  const rules = () => {
    const error: errorProps = {};

    if (!formData.nomorSurat) error.nomorSurat = "Nomor surat tidak boleh kosong";
    if (!formData.idDiperintah) error.diPerintah = "Nama yang diberi perintah tidak boleh kosong";
    if (!formData.idTtd) error.namaTtd = "Nama penanda tangan tidak boleh kosong";
    if (!formData.keterangan) error.keterangan = "Keterangan (untuk) tidak boleh kosong";
    if (!formData.tempatDikeluarkan) error.tempatDikeluarkan = "Tempat dikeluarkan surat tidak boleh kosong";
    if (!formData.tanggalSurat) error.tanggalSurat = "Tanggal surat tidak boleh kosong";

    return error;
  };

  useEffect(() => {
    setFormData({
      nomorSurat: "",
      tempatDikeluarkan: "",
      tanggalSurat: "",
      pemberiPerintah: "",
      nipPemberiPerintah: "",
      jabatanPemberiPerintah: "",
      diPerintah: "",
      nipDiPerintah: "",
      jabatanDiPerintah: "",
      keterangan: "",
      namaTtd: "",
      nipTtd: "",
      jabatanTtd: "",
      idDiperintah: "",
      idTtd: ""
    });
    setFormError({})
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

  const { mutate: mutatePost } = useCreateSuratPemeriksaan();

  const handleConfirm = () => {
    setLoadingConfirm(true);

    const errorRules = rules();
    setFormError(errorRules);

    if (Object.keys(errorRules).length > 0) {
      setLoadingConfirm(false);
      onCloseConfirm();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      ErrorToast({ text: "Validasi gagal, cek kembali form anda" });
      return true;
    }

    const formToSend: StoreSuratPemeriksaan = {};
    if(formData.nomorSurat) formToSend.nomorSurat = formData.nomorSurat;
    if(formData.tempatDikeluarkan) formToSend.tempatDikeluarkan = formData.tempatDikeluarkan;
    if(formData.tanggalSurat) formToSend.tanggalSurat = formData.tanggalSurat;
    if(formData.pemberiPerintah) formToSend.pemberiPerintah = formData.pemberiPerintah;
    if(formData.nipPemberiPerintah) formToSend.nipPemberiPerintah = formData.nipPemberiPerintah;
    if(formData.jabatanPemberiPerintah) formToSend.jabatanPemberiPerintah = formData.jabatanPemberiPerintah;
    if(formData.diPerintah) formToSend.diPerintah = formData.diPerintah;
    if(formData.nipDiPerintah) formToSend.nipDiPerintah = formData.nipDiPerintah;
    if(formData.jabatanDiPerintah) formToSend.jabatanDiPerintah = formData.jabatanDiPerintah;
    if(formData.keterangan) formToSend.keterangan = formData.keterangan;
    if(formData.namaTtd) formToSend.namaTtd = formData.namaTtd;
    if(formData.nipTtd) formToSend.nipTtd = formData.nipTtd;
    if(formData.jabatanTtd) formToSend.jabatanTtd = formData.jabatanTtd;

    try {
      mutatePost(formToSend, {
        onSuccess: () => {
          SuccessToast({ text: "Data berhasil ditambahkan" });
          navigate("/surat-perintah-pemeriksaan");
        },
        onError: (error: AxiosError<BaseErrorRes>) => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          ErrorToast({
            text:
              (error.response?.data.error as string) ||
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

  const onChangeName = (value: string, type: string) => {
    if(type === "ttd") {
      let checkPegawai = PEGAWAI_SELECT.find(item => item.id === value)
      if(checkPegawai) {
        setFormData({
          ...formData,
          idTtd: checkPegawai.id,
          namaTtd: checkPegawai.name,
          pemberiPerintah: checkPegawai.name,
          nipTtd: checkPegawai.nip,
          nipPemberiPerintah: checkPegawai.nip,
          jabatanTtd: checkPegawai.jabatan?.nameJob || "Jabatan tidak diketahui",
          jabatanPemberiPerintah: checkPegawai.jabatan?.nameJob || "Jabatan tidak diketahui",
        })
      } else {
        setFormData({
          ...formData,
          idTtd: "",
          namaTtd: "",
          pemberiPerintah: "",
          nipTtd: "",
          nipPemberiPerintah: "",
          jabatanTtd: "",
          jabatanPemberiPerintah: "",
        })
      }
    } else if(type === "perintah") {
      let checkPegawai = PEGAWAI_SELECT.find(item => item.id === value)
      if(checkPegawai) {
        setFormData({
          ...formData,
          idDiperintah: checkPegawai.id,
          diPerintah: checkPegawai.name,
          nipDiPerintah: checkPegawai.nip,
          jabatanDiPerintah: checkPegawai.jabatan?.nameJob || "Jabatan tidak diketahui"
        })
      } else {
        setFormData({
          ...formData,
          idDiperintah: "",
          diPerintah: "",
          nipDiPerintah: "",
          jabatanDiPerintah: "",
        })
      }
    }
  }

  return (
    <>
      <BreadcrumbAdmin location="/Surat-Perintah-Pemeriksaan/Tambah-Data" />
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        isLoading={isLoadingConfirm}
        handleSubmit={handleConfirm}
      />

      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="flex">
          <Link
            to={`/surat-perintah-pemeriksaan`}
            className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
          >
            <LuArrowLeft /> Kembali
          </Link>
        </div>
        <TitleCase title="Tambah Surat Perintah Pemeriksaan" text="Digunakan Untuk Menambah Surat Perintah Pemeriksaan Terbaru" />

        <div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Card shadow="none" className="border p-4">
              <CardHeader className="text-sm font-semibold">
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
              </CardHeader>
              {Object.keys(formError).length > 0 && (
                <div className="bg-alert-danger p-2 text-xs text-danger italic rounded-md border border-danger space-y-1">
                  {Object.entries(formError).map(([field, error]) => (
                    <div key={field}>
                      {error}
                    </div>
                  ))}
                </div>
              )}
              <CardBody>
                <div className="flex flex-col gap-2 text-sm">
                  <h1 className="text-center underline font-semibold text-base">SURAT PERINTAH</h1>
                  <div className="flex items-center justify-center font-semibold text-sm gap-2 mb-2">
                    Nomor: <Input variant="bordered" aria-label="nomorSurat" size="sm" radius="sm" className="max-w-72" classNames={{ inputWrapper: "border-[0.8px] border-button-primary rounded-md", input: "text-xs" }} placeholder="Masukkan nomor surat disini" value={formData.nomorSurat} onChange={(e) => setFormData({...formData, nomorSurat: e.target.value})} />
                  </div>
                  <div>
                    Yang bertanda tangan di bawah ini:
                  </div>
                  <div className="flex flex-col gap-2 ms-4">
                    <div className="flex items-center font-semibold text-sm gap-2 mb-2">
                      <div className="w-16">Nama </div>
                      : 
                      <Autocomplete
                        isLoading={isFetchingPegawai}
                        aria-label="pegawai"
                        placeholder="Cari pegawai"
                        variant="bordered"
                        radius="sm"
                        size="sm"
                        defaultItems={PEGAWAI_SELECT}
                        selectedKey={String(formData.idTtd)}
                        onSelectionChange={(value) =>
                          onChangeName(value as string, 'ttd')
                        }
                        className="max-w-72"
                        inputProps={{
                          classNames: {
                            input: "text-xs",
                            inputWrapper: "border-[0.8px] border-button-primary rounded-md",
                          },
                        }}
                      >
                        {(peg) => (
                          <AutocompleteItem key={peg.id} textValue={peg.name}>
                            {peg.name} - {peg.jabatan?.nameJob || "jabatan tidak diketahui"} - {peg.nip}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    </div>
                    <div className="flex items-center font-semibold text-sm gap-2 mb-2">
                      <div className="w-16">NIP </div>
                      : 
                      <Input isReadOnly variant="bordered" aria-label="nomorSurat" size="sm" radius="sm" className="max-w-72" classNames={{ inputWrapper: "border-[0.8px] border-button-primary rounded-md", input: "text-xs placeholder:italic" }} placeholder="Autofill NIP" value={formData.nipTtd} />
                    </div>
                    <div className="flex items-center font-semibold text-sm gap-2 mb-2">
                      <div className="w-16">Jabatan </div>
                      : 
                      <Input isReadOnly variant="bordered" aria-label="nomorSurat" size="sm" radius="sm" className="max-w-72" classNames={{ inputWrapper: "border-[0.8px] border-button-primary rounded-md", input: "text-xs placeholder:italic" }} placeholder="Autofill Jabatan" value={formData.jabatanTtd} />
                    </div>
                  </div>
                  <br />
                  <div>
                    Memerintahkan kepada:
                  </div>
                  <div className="flex flex-col gap-2 ms-4">
                    <div className="flex items-center font-semibold text-sm gap-2 mb-2">
                      <div className="w-16">Nama </div>
                      : 
                      <Autocomplete
                        isLoading={isFetchingPegawai}
                        aria-label="pegawai"
                        placeholder="Cari pegawai"
                        variant="bordered"
                        radius="sm"
                        size="sm"
                        defaultItems={PEGAWAI_SELECT}
                        selectedKey={String(formData.idDiperintah)}
                        onSelectionChange={(value) =>
                          onChangeName(value as string, 'perintah')
                        }
                        className="max-w-72"
                        inputProps={{
                          classNames: {
                            input: "text-xs",
                            inputWrapper: "border-[0.8px] border-button-primary rounded-md",
                          },
                        }}
                      >
                        {(peg) => (
                          <AutocompleteItem key={peg.id} textValue={peg.name}>
                            {peg.name} - {peg.jabatan?.nameJob || "jabatan tidak diketahui"} - {peg.nip}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    </div>
                    <div className="flex items-center font-semibold text-sm gap-2 mb-2">
                      <div className="w-16">NIP </div>
                      : 
                      <Input isReadOnly variant="bordered" aria-label="nomorSurat" size="sm" radius="sm" className="max-w-72" classNames={{ inputWrapper: "border-[0.8px] border-button-primary rounded-md", input: "text-xs placeholder:italic" }} placeholder="Autofill NIP" value={formData.nipDiPerintah} />
                    </div>
                    <div className="flex items-center font-semibold text-sm gap-2 mb-2">
                      <div className="w-16">Jabatan </div>
                      : 
                      <Input isReadOnly variant="bordered" aria-label="nomorSurat" size="sm" radius="sm" className="max-w-72" classNames={{ inputWrapper: "border-[0.8px] border-button-primary rounded-md", input: "text-xs placeholder:italic" }} placeholder="Autofill Jabatan" value={formData.jabatanDiPerintah} />
                    </div>
                  </div>
                  <br />
                  <div>
                    Untuk
                  </div>
                  <div>
                    <CKEditor
                      editor={ClassicEditor}
                      data={formData.keterangan}
                      config={{
                        extraPlugins: [SimpleUploadAdapter],
                        toolbar: ckToolbar,
                        plugins: ckPlugins,
                        image: {
                          toolbar: [
                            "imageTextAlternative",
                            "imageStyle:full",
                            "imageStyle:side",
                          ],
                          upload: {
                            types: ["jpeg", "png", "gif", "bmp", "webp"],
                          },
                        },
                        // simpleUpload: {
                        //     uploadUrl: `${BASE_URL}/upload-image`,
                        // }
                      }}
                      onChange={(_event, editor) => {
                        setFormData((prev) => {
                          return { ...prev, keterangan: editor.getData() };
                        });
                      }}
                    />
                  </div>
                  <br />
                  <div className="flex items-center justify-end font-semibold text-sm gap-2 mb-2">
                    Dikeluarkan di: <Input variant="bordered" aria-label="nomorSurat" size="sm" radius="sm" className="max-w-72" classNames={{ inputWrapper: "border-[0.8px] border-button-primary rounded-md", input: "text-xs" }} placeholder="Masukkan lokasi disini" value={formData.tempatDikeluarkan} onChange={(e) => setFormData({...formData, tempatDikeluarkan: e.target.value})} />
                  </div>
                  <div className="flex items-center justify-end font-semibold text-sm gap-2 mb-2">
                    Pada Tanggal: <Input type="date" variant="bordered" aria-label="nomorSurat" size="sm" radius="sm" className="max-w-72" classNames={{ inputWrapper: "border-[0.8px] border-button-primary rounded-md", input: "text-xs" }} placeholder="Masukkan lokasi disini" value={formData.tanggalSurat} onChange={(e) => setFormData({...formData, tanggalSurat: e.target.value})} />
                  </div>
                  <div className="ms-auto">
                    <div className="flex items-center justify-center font-semibold text-sm gap-2 mb-2">
                      {formData.jabatanPemberiPerintah || "Autofill jabatan"}
                    </div>
                    <br /><br />
                    <div className="flex items-center justify-center font-semibold text-sm gap-2 mb-2">
                      {formData.pemberiPerintah || "Autofill nama"}
                    </div>
                    <div className="flex items-center justify-center font-normal text-sm gap-2 mb-2">
                      NIP.{formData.nipPemberiPerintah || "Autofill NIP"}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </form>
        </div>
      </div>
    </>
  );
}
