import { Link } from "react-router-dom";
import { SidebarTrigger } from "../ui/sidebar";
import { useEffect, useState } from "react";
import { GrAnnounce } from "react-icons/gr";
import { LucideArrowRightCircle } from "lucide-react";

export default function Header() {
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

  return (
    <div className="md:w-[calc(100%-16rem)] w-full md:h-[72px] h-[72px] fixed bg-white shadow-sm duration-300 ms-auto md:me-2 !z-40 flex flex-col items-center justify-center">
      <div className="md:px-6 px-4 flex justify-between w-full">
        <div className="flex items-center gap-2 w-[60%] overflow-hidden">
          <div className="border me-2 rounded-md hover:bg-background">
            <SidebarTrigger />
          </div>
          <div className="lg:flex flex-col gap-1 hidden">
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
            <RealTimeClock />
          </div>
        </div>
        <div className="flex items-center md:gap-4 gap-2">
          <Link to="/login" className="bg-accent-primary text-white rounded-lg">
            <div className="flex gap-2 items-center text-xs font-semibold py-2 px-3">
              Masuk
              <LucideArrowRightCircle size={12} />
            </div>
          </Link>
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
