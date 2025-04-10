import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor, SimpleUploadAdapter } from "ckeditor5";
import { ckPlugins, ckToolbar } from "@/constants/CkEditorPlugin";
import { useEffect, useMemo, useState } from "react";
import { TitleCase } from "@/components/card/TitleCase";
import { Button, Input, useDisclosure } from "@heroui/react";
import { convertFileToBase64 } from "@/utils/base64Formater";
import { LuImage, LuSave } from "react-icons/lu";
import ConfirmModal from "@/components/modals/UtilsModal/ConfirmModal";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { useNavigate, useParams } from "react-router-dom";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { useGetDetailBerita, useUpdateBerita } from "@/services/berita";
import { StoreBerita } from "@/interface/request/berita.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";

interface formProps {
  thumbnail: string;
  title: string;
  content: string;
}

interface errorProps {
  thumbnail?: string;
  title?: string;
  content?: string;
}

export default function UpdateNews() {
  const { id } = useParams();
  const [formData, setFormData] = useState<formProps>({
    thumbnail: "",
    title: "",
    content: "",
  });

  const [formError, setFormError] = useState<errorProps>({});

  const [imageLama, setImageLama] = useState<string>("");

  const rules = () => {
    const error: errorProps = {};
    if (!formData.title) {
      error.title = "Judul berita tidak boleh kosong";
    }
    if (!formData.content) {
      error.content = "Isi berita tidak boleh kosong";
    }
    return error;
  };

  const { data, isFetching, refetch, error } = useGetDetailBerita(id || "");
  const AllData = useMemo(() => {
    return data ? data.data : null;
  }, [data, id]);

  useEffect(() => {
    if (!isFetching && AllData) {
      setFormData({
        thumbnail: "",
        title: AllData.title,
        content: AllData.description,
      });

      setImageLama(AllData.images || "");
    }
  }, [AllData, isFetching]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isFetching && error) {
      navigate("/news");
    }
  }, [error, navigate, isFetching]);

  useEffect(() => {
    refetch();
  }, [id]);

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileToShow = await convertFileToBase64(file);
      setFormData({ ...formData, thumbnail: fileToShow });
    } else {
      setFormData({ ...formData, thumbnail: "" });
    }
  };

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

  const { mutate: mutatePost } = useUpdateBerita();
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

    const formToSendData: StoreBerita = {
      title: formData.title,
      description: formData.content,
      status: true,
    };

    if (formData.thumbnail) {
      formToSendData.images = formData.thumbnail;
    }
    try {
      mutatePost(
        { id: id || "", formData: formToSendData },
        {
          onSuccess: () => {
            SuccessToast({ text: "Data berhasil disimpan" });
            setLoadingConfirm(false);
            onCloseConfirm();
            navigate("/news");
          },
          onError: (error: AxiosError<BaseErrorRes>) => {
            setLoadingConfirm(false);
            onCloseConfirm();
            ErrorToast({
              text:
                (error.response?.data.error as string) ||
                "Terjadi kesalahan saat mengupdate data",
            });
            throw error;
          },
        },
      );
    } catch (error) {
      setLoadingConfirm(false);
      onCloseConfirm();
      throw error;
    }
  };

  return (
    <>
      <BreadcrumbAdmin location="/Berita/Tambah-Data" />
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        isLoading={isLoadingConfirm}
        handleSubmit={handleConfirm}
      />
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <TitleCase
          title="Tambah Berita"
          text="Digunakan Untuk Menambah Berita yang Terbaru"
        />

        <div className="bg-white shadow-md rounded-xl border p-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-1">
                <label htmlFor="content" className="font-semibold text-xs">
                  Judul <span className="text-danger">*</span>
                </label>
              </div>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                aria-label="Judul"
                labelPlacement="outside"
                placeholder="Masukkan disini ..."
                variant="bordered"
                size="sm"
                classNames={{
                  inputWrapper: "border-[0.8px]",
                  input: "text-xs",
                }}
              />
              <div className="text-danger text-[0.7rem] mt-1">
                {formError.title}
              </div>
            </div>
            <div>
              <div className="mb-1">
                <label htmlFor="content" className="font-semibold text-xs">
                  Isi Konten <span className="text-danger">*</span>
                </label>
              </div>
              <CKEditor
                editor={ClassicEditor}
                data={formData.content}
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
                    return { ...prev, content: editor.getData() };
                  });
                }}
              />
              <div className="text-danger text-[0.7rem] mt-1">
                {formError.content}
              </div>
            </div>
            <div className="max-w-80">
              <div className="mb-1">
                <label htmlFor="content" className="font-semibold text-xs">
                  Foto <span className="text-danger">*</span>
                </label>
              </div>
              <div className="border p-8 mb-2 flex items-center justify-center">
                {formData.thumbnail ? (
                  <img src={formData.thumbnail} className="rounded-lg" />
                ) : imageLama ? (
                  <img src={imageLama} className="rounded-lg" />
                ) : (
                  <LuImage size={32} />
                )}
              </div>
              <input
                type="file"
                onChange={handleChangeImage}
                accept=".png,.jpg,.jpeg"
              />
              <div className="text-danger text-[0.7rem] mt-1">
                {formError.thumbnail}
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
