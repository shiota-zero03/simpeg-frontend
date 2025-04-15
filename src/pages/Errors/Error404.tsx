import WaveTop from "@/assets/background404-top.png";
import WaveBottom from "@/assets/background404-bottom.png";
import NotFound404 from "@/assets/notfound_404.png";
import { Button } from "@heroui/react";
import { LuArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#F3FBFB]">
      <div className="absolute top-0 right-0">
        <img src={WaveTop} alt="wave-top" className="md:max-w-60 max-w-24" />
      </div>
      <div className="absolute bottom-0 left-0">
        <img
          src={WaveBottom}
          alt="wave-bottom"
          className="md:max-w-72 max-w-24"
        />
      </div>
      <div className="flex items-center sm:flex-row flex-col gap-4 relative z-50">
        <img
          src={NotFound404}
          alt="404-image"
          className="sm:max-w-[440px] max-w-[240px]"
        />
        <div className="flex flex-col gap-2 max-w-[480px] sm:items-start items-center">
          <h1 className="font-semibold lg:text-2xl">
            Oops! Halaman Tidak Ditemukan
          </h1>
          <p className="lg:text-base text-sm lg:text-left sm:text-left text-center">
            Kami tidak dapat menemukan halaman yang Anda cari. Mungkin URL salah
            atau halaman telah dipindahkan.
          </p>
          <div>
            <Button
              onPress={() => navigate(-1)}
              size="sm"
              className="text-button-primary font-medium border border-button-primary xl:text-sm text-xs"
              variant="bordered"
              radius="sm"
            >
              Kembali ke halaman sebelumnya <LuArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
