import Wave from "@/assets/wave-auth.png";
import Logo from "@/assets/logo.png";
import { LuEye, LuEyeClosed, LuGlobe, LuInstagram } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SignInAuth } from "@/interface/request/auth.interface";
import { FaHome } from "react-icons/fa";
import { Button, Input } from "@heroui/react";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearAuthTokens, setAuthTokens } from "@/redux/slices/auth.slice";
import { useAuthSignIn } from "@/services/auth";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";

interface errorProps {
  username?: string;
  password?: string;
}

export default function Login() {
  const navigate = useNavigate();

  const authTokens = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (authTokens?.accessToken) {
      navigate("/");
    }
  }, [authTokens, navigate]);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isButtonActive, setIsButtonActive] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignInAuth>({
    username: "",
    password: "",
  });

  const [formError, setFormError] = useState<errorProps>({});

  const rules = () => {
    const error: errorProps = {};
    if (!formData.username)
      error.username = "Username / NIP tidak boleh kosong";
    if (!formData.password) {
      error.password = "Password tidak boleh kosong";
    } else if (formData.password.length < 8) {
      error.password = "Password minimal terdiri dari 8 karakter";
    }
    return error;
  };

  const { mutate: mutateLogin } = useAuthSignIn();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(clearAuthTokens());
    setIsLoading(true);

    const errorRules = rules();
    setFormError(errorRules);

    if (Object.keys(errorRules).length > 0) {
      setIsLoading(false);
      ErrorToast({ text: "Validasi gagal, cek kembali form anda" });
      return true;
    }

    try {
      mutateLogin(formData, {
        onSuccess: (res) => {
          const userData = {
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            role: res.data.user.role,
          };

          dispatch(setAuthTokens(userData));

          SuccessToast({ text: "Anda berhasil masuk ke dalam sistem" });

          setTimeout(() => {
            navigate("/");
          }, 100);
        },
        onError: (error: AxiosError<BaseErrorRes>) => {
          ErrorToast({
            text:
              (error.response?.data.message as string) || "User login error",
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

  useEffect(() => {
    if (formData.username && formData.password) {
      setIsButtonActive(false);
    } else {
      setIsButtonActive(true);
    }
  }, [formData]);

  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1 h-screen overflow-hidden">
        <div className="h-screen md:m-8 m-4 overflow-hidden lg:block hidden">
          <div className="h-[calc(100%-4rem)] w-full bg-primary flex items-center justify-center lg:rounded-bl-[6rem] rounded-bl-[3rem] lg:rounded-tr-[6rem] rounded-tr-[3rem] lg:rounded-tl-3xl rounded-tl-[3rem] lg:rounded-br-3xl rounded-br-[3rem] overflow-hidden relative z-0">
            <div className="absolute top-0 flex items-center justify-between w-full">
              <div className="text-white flex items-center justify-center gap-3 ps-8">
                <img src={Logo} alt="logo-simpeg" width={40} />
                <div>
                  <h5 className="xl:text-base text-sm font-semibold -mb-1">
                    DINAS PERDAGANGAN
                  </h5>
                  <span className="text-xs font-light">KABUPATEN BEKASI</span>
                </div>
              </div>
              <img src={Wave} alt="wave-top" loading="lazy" width={220} />
            </div>
            <div className="relative z-10 text-left px-8 text-white flex flex-col gap-3">
              <h3 className="font-medium xl:text-lg text-base">
                Selamat Datang di Aplikasi
              </h3>
              <h1 className="font-semibold xl:text-3xl text-2xl">
                Sistem Informasi Manajemen Pegawai
              </h1>
              <h5 className="xl:text-base text-sm">
                Kelola data pegawai, administrasi, dan layanan kepegawaian
                dengan mudah dalam satu sistem terpadu.
              </h5>
            </div>
            <div className="absolute bottom-0 flex items-center justify-between w-full">
              <img
                src={Wave}
                alt="wave-bottom"
                loading="lazy"
                className="-scale-[1]"
                width={220}
              />
              <div className="text-white  pe-8 flex flex-col gap-2 items-end">
                <span className="text-sm font-light text-end">
                  Kunjungi dan Ikuti Kami
                </span>
                <div className="flex items-center gap-2">
                  <Link
                    className="border p-1.5 font-semibold rounded-full"
                    to={"https://disperdag.bekasikab.go.id/"}
                    target="__blank"
                  >
                    <LuGlobe />
                  </Link>
                  <Link
                    className="border p-1.5 font-semibold rounded-full"
                    to={"https://www.instagram.com/disdagkabbekasi/"}
                    target="__blank"
                  >
                    <LuInstagram />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-screen md:m-8 m-4 overflow-hidden">
          <div className="h-[calc(100%-4rem)] w-full flex flex-col justify-between">
            <div className="flex items-center justify-end pt-4">
              <Link
                to={"/"}
                className="flex items-center gap-2 text-accent-primary font-semibold text-sm"
              >
                <FaHome size={16} />
                Home
              </Link>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="text-center font-medium xl:text-2xl md:text-lg text-sm">
                  Masukkan username atau NIP dan password untuk masuk ke
                  halaman dashboard admin.
                </div>
                <div>
                  <Input
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    label="Username/NIP"
                    placeholder="Masukkan Username atau Nomor Induk Pegawai"
                    variant="bordered"
                    size="sm"
                    classNames={{
                      label: "-mt-8 bg-white px-2 font-semibold",
                      inputWrapper: "border-[0.8px]",
                      input: "text-xs mb-2",
                    }}
                  />
                  <div className="text-danger text-[0.7rem] mt-1">
                    {formError.username}
                  </div>
                </div>
                <div>
                  <Input
                    type={!showPassword ? "password" : "text"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    label="Kata Sandi"
                    placeholder="8+ characters required"
                    variant="bordered"
                    size="sm"
                    endContent={
                      !showPassword ? (
                        <LuEye
                          className="text-accent-primary mb-1 cursor-pointer"
                          onClick={() => setShowPassword(true)}
                        />
                      ) : (
                        <LuEyeClosed
                          className="text-accent-primary mb-1 cursor-pointer"
                          onClick={() => setShowPassword(false)}
                        />
                      )
                    }
                    classNames={{
                      label: "-mt-8 bg-white px-2 font-semibold",
                      inputWrapper: "border-[0.8px]",
                      input: "text-xs mb-2",
                    }}
                  />
                  <div className="text-danger text-xs mt-1">
                    {formError.password}
                  </div>
                </div>
                <div className="text-end -my-1">
                  <Link
                    className="text-accent-primary font-semibold text-xs hover:underline"
                    to={"#"}
                  >
                    Lupa Password ?
                  </Link>
                </div>
                <div>
                  <Button
                    isDisabled={isButtonActive}
                    isLoading={isLoading}
                    type="submit"
                    size="sm"
                    className="bg-accent-primary w-full text-white"
                  >
                    Masuk
                  </Button>
                </div>
              </form>
            </div>
            <div className="text-center text-sm font-medium pb-4">
              &copy; 2025 |{" "}
              <span className="text-accent-primary font-semibold">
                SIMPEG - Dinas Perdagangan Kabupaten Bekasi
              </span>
              . All right reserved
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
