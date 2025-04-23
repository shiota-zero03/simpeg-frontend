import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { LuSave, LuX } from "react-icons/lu";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { useUpdatePassword } from "@/services/auth";
import { StorePegawai } from "@/interface/request/pegawai.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { LucideEye, LucideEyeClosed } from "lucide-react";

interface props {
  isOpen: boolean;
  onClose: () => void;
  handleClose: () => void;
}

interface formProps {
  oldPassword?: string;
  password?: string;
  passwordConfirmation?: string;
}

interface errorProps {
  oldPassword?: string;
  password?: string;
  passwordConfirmation?: string;
}

const UpdatePassword = ({ isOpen, onClose, handleClose }: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<formProps>({
    oldPassword: "",
    password: "",
    passwordConfirmation: "",
  });

  const [formError, setFormError] = useState<errorProps>({});

  useEffect(() => {
    setFormData({
      oldPassword: "",
      password: "",
      passwordConfirmation: "",
    });
    setIsLoading(false);
    setFormError({});
  }, [isOpen]);

  const rules = () => {
    const error: errorProps = {};

    if (!formData.oldPassword)
      error.oldPassword = "Password lama tidak boleh kosong";
    if (!formData.password) error.password = "Password tidak boleh kosong";
    else if (formData.password.length < 8)
      error.password = "Password minimal 8 karakter";
    if (!formData.passwordConfirmation)
      error.passwordConfirmation = "Konfirmasi password tidak boleh kosong";
    else if (formData.password !== formData.passwordConfirmation)
      error.passwordConfirmation = "Konfirmasi password tidak sama";

    return error;
  };

  const { mutate: mutatePost } = useUpdatePassword();

  const handleSubmit = () => {
    setIsLoading(true);

    const errorRules = rules();
    setFormError(errorRules);

    if (Object.keys(errorRules).length > 0) {
      setIsLoading(false);
      ErrorToast({ text: "Validasi gagal, cek kembali form anda" });
      return true;
    }

    const formToSend: StorePegawai = {};
    if (formData.password) formToSend.password = formData.password;
    if (formData.oldPassword) formToSend.oldPassword = formData.oldPassword;

    try {
      mutatePost(formToSend, {
        onSuccess: () => {
          SuccessToast({ text: "Password berhasil diperbarui" });
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
      });
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="4xl">
        <ModalContent>
          <ModalHeader className="flex items-center justify-between">
            <span className="text-base font-semibold">Edit Password</span>
            <LuX
              className="text-danger border border-danger rounded-full p-2 cursor-pointer"
              onClick={onClose}
              size={32}
            />
          </ModalHeader>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom flex flex-col gap-2 pb-8">
            <div className="grid grid-cols-1 gap-2">
              <div>
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Password Lama<span className="text-danger">*</span>
                  </label>
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  endContent={
                    showPassword ? (
                      <LucideEyeClosed
                        className="cursor-pointer"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <LucideEye
                        className="cursor-pointer"
                        onClick={() => setShowPassword(true)}
                      />
                    )
                  }
                  value={formData.oldPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, oldPassword: e.target.value })
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
                <div className="text-danger text-[0.7rem] mt-1">
                  {formError.password}
                </div>
              </div>
              <div>
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Password <span className="text-danger">*</span>
                  </label>
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  endContent={
                    showPassword ? (
                      <LucideEyeClosed
                        className="cursor-pointer"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <LucideEye
                        className="cursor-pointer"
                        onClick={() => setShowPassword(true)}
                      />
                    )
                  }
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
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
                <div className="text-danger text-[0.7rem] mt-1">
                  {formError.password}
                </div>
              </div>
              <div>
                <div className="mb-1">
                  <label htmlFor="content" className="font-semibold text-xs">
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  endContent={
                    showPassword ? (
                      <LucideEyeClosed
                        className="cursor-pointer"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <LucideEye
                        className="cursor-pointer"
                        onClick={() => setShowPassword(true)}
                      />
                    )
                  }
                  value={formData.passwordConfirmation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      passwordConfirmation: e.target.value,
                    })
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
                <div className="text-danger text-[0.7rem] mt-1">
                  {formError.passwordConfirmation}
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

export default UpdatePassword;
