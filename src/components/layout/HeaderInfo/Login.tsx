import { Link, useNavigate } from "react-router-dom";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useEffect, useMemo, useState } from "react";
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
import LogoutModal from "@/components/modals/LogoutModal";
import { useGetAllBeritaHome } from "@/services/berita";
import { useGetProfile } from "@/services/auth";

export default function Header() {
  const { role } = store.getState().auth;

  const navigate = useNavigate();

  const { data: dataProfile, refetch: refetchProfile } = useGetProfile(!!role);
  const getDataProfile = useMemo(() => {
    if (dataProfile) return dataProfile.data;
    return null;
  }, [dataProfile]);

  const [berita, setBerita] = useState<{ title: string }[]>([]);

  const { data: dataALlBerita, refetch: refetchAllBerita } =
    useGetAllBeritaHome(1, 6);
  useEffect(() => {
    if (dataALlBerita) {
      const mappedData = dataALlBerita.data.response.map((item) => ({
        title: item.title,
      }));

      setBerita((prev) => [...prev, ...mappedData]);
    }
  }, [dataALlBerita]);

  const {
    isOpen: isOpenLogout,
    onOpen: onOpenLogout,
    onClose: onCloseLogout,
  } = useDisclosure();

  useEffect(() => {
    refetchAllBerita();
    if (role) {
      refetchProfile();
    }
  }, []);

  const { open } = useSidebar();

  return (
    <div
      className={`${open ? "md:w-[calc(100%-16rem)]" : "md:w-[calc(100%-3rem)]"} w-full md:h-[72px] h-[72px] fixed bg-white shadow-sm duration-300 ms-auto md:me-2 !z-40 flex flex-col items-center justify-center`}
    >
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
                <div className="flex items-center gap-2 text-accent-primary font-bold text-sm min-w-[150px]">
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
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    radius="full"
                    size="md"
                    className="bg-[#86F8EE33] text-primary border"
                  >
                    <LuBellDot />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem
                    key="profile"
                    className="text-xs text-center mb-2"
                    onPress={() => navigate("/profile")}
                    textValue="profile"
                  >
                    <div className="flex items-center justify-center text-xs gap-2">
                      <LuUserCog /> Profil Saya
                    </div>
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    textValue="logout"
                    className="bg-danger text-white flex items-center justify-center gap-2 text-center"
                    onPress={onOpenLogout}
                  >
                    <div className="flex items-center justify-center gap-2 text-xs">
                      <FaPowerOff /> Log Out
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <User
                    as="button"
                    avatarProps={{
                      isBordered: true,
                      src: `${getDataProfile?.photo ? getDataProfile?.photo : "https://i.pravatar.cc/150?u=a042581f4e29026024d"}`,
                      size: "sm",
                    }}
                    className="transition-transform"
                    name={`${getDataProfile?.name ? getDataProfile?.name : "Mas Admin"}`}
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
                    textValue="profile"
                  >
                    <div className="flex items-center justify-center text-xs gap-2">
                      <LuUserCog /> Profil Saya
                    </div>
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    textValue="logout"
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
