import { Link, useNavigate } from "react-router-dom";
import { SidebarTrigger } from "../ui/sidebar";
import { useEffect, useState } from "react";
import { GrAnnounce } from "react-icons/gr";
import { LucideArrowRightCircle } from "lucide-react";
import store from "@/redux/store";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
  User,
} from "@heroui/react";
import { LuBellDot, LuUserCog } from "react-icons/lu";
import { FaPowerOff } from "react-icons/fa";
import LogoutModal from "../modals/LogoutModal";

export default function Header() {
  const { role } = store.getState().auth;

  const navigate = useNavigate();

  const berita = [
    {
      title:
        "Untuk penambahan alokasi pupuk, harap menghubungi Dinas Pertanian",
    },
    { title: "Pendaftaran petani subsidi pupuk telah dibuka, segera daftar!" },
    { title: "Program bantuan pertanian terbaru telah diumumkan." },
    { title: "Pastikan data RDKK Anda sudah diperbarui tahun ini." },
    { title: "Musim tanam akan dimulai, persiapkan kebutuhan pertanian Anda!" },
  ];

  const {
    isOpen: isOpenLogout,
    onOpen: onOpenLogout,
    onClose: onCloseLogout,
  } = useDisclosure();

  return (
    <div className="md:w-[calc(100%-16rem)] w-full md:h-[72px] h-[72px] fixed bg-white shadow-sm duration-300 ms-auto md:me-2 !z-40 flex flex-col items-center justify-center">
      <LogoutModal isOpen={isOpenLogout} onClose={onCloseLogout} />
      <div className="md:px-6 px-4 flex justify-between w-full">
        <div className="flex items-center gap-2 w-[60%] overflow-hidden">
          <div className="border me-2 rounded-md hover:bg-background">
            <SidebarTrigger />
          </div>
          <div className="lg:flex flex-col gap-1 hidden">
            {role ? (
              <div className="text-sm font-semibold">
                Dashboard Admin Dinas Perdagangan Kabupaten Bekasi
              </div>
            ) : (
              <div className="flex overflow-hidden items-center">
                <div className="flex items-center gap-2 text-accent-primary font-bold text-sm w-[118px]">
                  <GrAnnounce className="-rotate-12" size={14} />
                  Berita Terkini
                </div>
                <div className="me-3 font-bold text-primary">|</div>
                <div className="relative w-[40%] overflow-hidden">
                  <div className="marquee">
                    {[...berita, ...berita].map((item, index) => (
                      <span key={index} className="text-sm font-semibold">
                        {item.title} &nbsp;&nbsp;&nbsp;&nbsp; -
                        &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <RealTimeClock />
          </div>
        </div>
        <div className="flex items-center md:gap-4 gap-2">
          {role ? (
            <div className="flex items-center md:gap-4 gap-2">
              <Button
                isIconOnly
                radius="full"
                size="sm"
                className="bg-[#86F8EE33] text-primary border"
              >
                <LuBellDot />
              </Button>
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <User
                    as="button"
                    avatarProps={{
                      isBordered: true,
                      src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                      size: "sm",
                    }}
                    className="transition-transform"
                    name="Mas Admin"
                    classNames={{
                      name: "font-semibold text-xs",
                    }}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem
                    key="profile"
                    className="text-xs text-center mb-2"
                    onPress={() => navigate("/profile")}
                  >
                    <div className="flex items-center justify-center text-xs gap-2">
                      <LuUserCog /> Profil Saya
                    </div>
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    className="bg-danger text-white flex items-center justify-center gap-2 text-center"
                    onPress={onOpenLogout}
                  >
                    <div className="flex items-center justify-center gap-2 text-xs">
                      <FaPowerOff /> Log Out
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-accent-primary text-white rounded-lg"
            >
              <div className="flex gap-2 items-center text-xs font-semibold py-2 px-3">
                Masuk
                <LucideArrowRightCircle size={12} />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

const getFormattedDate = () => {
  const now = new Date();
  const day = now.toLocaleString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = now.toLocaleString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <span>
      {day} &nbsp; | &nbsp; {time}
    </span>
  );
};

const RealTimeClock = () => {
  const [time, setTime] = useState(getFormattedDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFormattedDate());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className="text-xs font-medium">{time}</div>;
};
