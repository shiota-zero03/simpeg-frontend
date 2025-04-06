import { BeritaOtherCard } from "@/components/card/HomeCard";
import { BeritaDummy } from "@/constants/DummyData";
import { timestampIndoToFormat } from "@/utils/dateFormater";
import { Spinner } from "@heroui/react";
import { LucideCalendarDays } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { TbFaceIdError } from "react-icons/tb";
import { Link } from "react-router-dom";

interface BeritaDataProps {
  thumbnail: string;
  slug: string;
  title: string;
  createdAt: string;
  content: string;
}

export default function DetailBerita() {
  const [isFetchingGallery, setIsFetchingGallery] = useState<boolean>(false);

  const BeritaNow: BeritaDataProps = useMemo(() => {
    return {
      thumbnail: BeritaDummy[0].thumbnail,
      title: BeritaDummy[0].title,
      slug: BeritaDummy[0].slug,
      createdAt: BeritaDummy[0].createdAt,
      content: BeritaDummy[0].content,
    };
  }, []);

  const BeritaData: BeritaDataProps[] = useMemo(() => {
    return BeritaDummy.map((item) => ({
      thumbnail: item.thumbnail,
      title: item.title,
      slug: item.slug,
      createdAt: item.createdAt,
      content: item.content,
    }));
  }, []);

  useEffect(() => {
    setIsFetchingGallery(true);
    setTimeout(() => {
      setIsFetchingGallery(false);
    }, 500);
  }, []);

  return (
    <>
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="grid xl:grid-cols-4 grid-cols-5 gap-4">
          <div className="lg:col-span-3 col-span-5 bg-white xl:p-8 sm:p-6 p-4 rounded-xl shadow-lg border-lg">
            {isFetchingGallery && (
              <div className="absolute inset-0 bg-slate-50/20 z-10 flex items-center justify-center">
                <Spinner
                  variant="wave"
                  size="lg"
                  classNames={{
                    dots: "w-5 h-5",
                    base: "w-full h-full",
                    wrapper: "w-auto gap-2 h-auto",
                  }}
                />
              </div>
            )}
            <div className="relative group rounded-xl overflow-hidden">
              <img
                src={BeritaNow.thumbnail}
                alt="thumbnail-berita"
                className="w-full rounded-xl"
              />
              <div className="bg-black/20 absolute inset-0"></div>
              <div className="bg-black absolute -bottom-40 group-hover:bottom-0 w-full text-white lg:text-xl sm:text-base text-[0.5rem] font-semibold sm:p-4 p-2 duration-300">
                {BeritaNow.title}
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <h1 className="font-semibold xl:text-2xl sm:text-base text-sm">
                {BeritaNow.title}
              </h1>
              <div className="text-accent-primary font-medium flex items-center gap-4 xl:text-base sm:text-sm text-xs">
                <LucideCalendarDays
                  size={20}
                  className="lg:scale-100 scale-75"
                />
                {timestampIndoToFormat(" | ", BeritaNow.createdAt)}
              </div>
              <div dangerouslySetInnerHTML={{ __html: BeritaNow.content }} />
            </div>
          </div>
          <div className="relative z-0 xl:col-span-1 lg:col-span-2 col-span-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold xl:text-base text-sm">
                Berita Terkini
              </h4>
              <Link
                to={"/berita"}
                className="border-accent-primary text-accent-primary flex items-center xl:text-sm text-xs font-semibold"
              >
                <span className="sm:block hidden">Lihat Semua</span>
                <LuArrowRight />
              </Link>
            </div>
            {isFetchingGallery && (
              <div className="absolute inset-0 bg-slate-50/20 z-10 flex items-center justify-center">
                <Spinner
                  variant="wave"
                  size="lg"
                  classNames={{
                    dots: "w-5 h-5",
                    base: "w-full h-full",
                    wrapper: "w-auto gap-2 h-auto",
                  }}
                />
              </div>
            )}
            {BeritaData.length > 0 ? (
              <div className="flex flex-col gap-8">
                <div className="grid lg:grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
                  {BeritaData.map((item, index) => (
                    <BeritaOtherCard
                      key={index}
                      title={item.title}
                      thumbnail={item.thumbnail}
                      createdAt={item.createdAt}
                      slug={item.slug}
                      content={item.content}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center flex-col gap-2 text-center">
                <TbFaceIdError size={120} className="opacity-60" />
                <h1 className="font-medium italic opacity-60 text-2xl">
                  Tidak ada berita ditemukan
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
