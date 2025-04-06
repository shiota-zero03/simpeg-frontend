import { DMYIndoToFormat } from "@/utils/dateFormater";
import { Button } from "@heroui/react";
import { LucideCalendarDays } from "lucide-react";
import { LuArrowUpRight } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface BeritaDataProps {
  thumbnail: string;
  slug: string;
  title: string;
  createdAt: string;
  content: string;
}

const BeritaCard = ({
  thumbnail,
  slug,
  title,
  createdAt,
  content
}: BeritaDataProps) => {

  const navigate = useNavigate();

  return (
    <div className="cursor-pointer rounded-xl overflow-hidden row-span-3 bg-white border shadow-md group relative z-0" onClick={() => navigate(`/berita/${slug}`)}>
      <div className="absolute bg-slate-50/20 inset-0 hidden group-hover:flex items-center justify-center p-4 text-center duration-300 animate-appearance-in z-10" />
      <div className="overflow-hidden relative group lg:h-52 h-32 z-0 w-[94%] rounded-md mx-auto my-4">
        <img
          src={thumbnail}
          alt="galeri-image"
          className="object-cover object-center min-w-full min-h-full group-hover:scale-125 duration-200"
        />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-3">
            <small className="flex md:text-xs text-[0.6rem] items-center gap-2 text-[#199FB1]">
              <LucideCalendarDays size={12} />
              {DMYIndoToFormat(createdAt)}
            </small>
            <h4 className="lg:text-base text-sm font-semibold">{title.length > 60 ? title.slice(0, 60) + "..." : title}</h4>
          </div>
          <Button type="button" isIconOnly variant="flat" radius="full" className="shadow-md border bg-transparent text-accent-primary border-accent-primary" onPress={() => navigate(`/berita/${slug}`)}>
            <LuArrowUpRight />
          </Button>
        </div>
        <h4 className="lg:text-sm text-xs font-light">{content.length > 60 ? content.slice(0, 60) + "..." : content}</h4>
      </div>
    </div>
  );
};

const BeritaOtherCard = ({
  thumbnail,
  slug,
  title,
  createdAt,
}: BeritaDataProps) => {

  return (
    <Link to={`/berita/${slug}`} className="flex items-center bg-white p-3 rounded-md shadow-md">
      <div className="overflow-hidden relative group w-16 h-16 z-0 rounded-full xl:block hidden">
        <img
          src={thumbnail}
          alt="galeri-image"
          className="object-cover object-center duration-200 w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-2 xl:w-[calc(100%-4rem)] px-4">
          <small className="flex xl:text-xs text-[0.6rem] items-center gap-2 text-[#199FB1]">
            <LucideCalendarDays size={12} />
            {DMYIndoToFormat(createdAt)}
          </small>
          <h4 className="xl:text-sm text-xs font-semibold">{title.length > 60 ? title.slice(0, 60) + "..." : title}</h4>
        </div>
    </Link>
  );
};

export { BeritaCard, BeritaOtherCard };
