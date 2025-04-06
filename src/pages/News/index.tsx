import WaveDashboard from "@/assets/wave-dashboard.png";
import { BeritaCard } from "@/components/card/HomeCard";
import { TitleCase } from "@/components/card/TitleCase";
import { BeritaDummy } from "@/constants/DummyData";
import { Button, Input, Spinner } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { TbFaceIdError } from "react-icons/tb";

interface BeritaDataProps {
  thumbnail: string;
  slug: string;
  title: string;
  createdAt: string;
  content: string;
}

export default function News() {
  // const limit = 10;
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFetchingGallery, setIsFetchingGallery] = useState<boolean>(false);

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
    setCurrentPage(1);
    setSearch("");
    setTotalPage(2);
    setTimeout(() => {
      setIsFetchingGallery(false);
    }, 500);
  }, []);

  const refetchGallery = () => {
    setIsFetchingGallery(true);
    setInterval(() => {
      setCurrentPage(currentPage + 1);
      setIsFetchingGallery(false);
    }, 500);
  };

  return (
    <>
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <TitleCase
          title="Berita"
          text="Berikut ini menampilkan Daftar Berita yang sudah tersimpan"
        />
        <div className="bg-[#137269] min-h-48 w-full lg:rounded-bl-[6rem] rounded-bl-[3rem] lg:rounded-tr-[6rem] rounded-tr-[3rem] lg:rounded-tl-3xl rounded-tl-[3rem] lg:rounded-br-3xl rounded-br-[3rem] flex justify-center flex-col overflow-hidden relative z-0">
          <img
            src={WaveDashboard}
            alt="wave-dashboard"
            loading="lazy"
            className="absolute right-0 top-0 w-52 z-0 md:block hidden"
          />
          <img
            src={WaveDashboard}
            alt="wave-dashboard"
            loading="lazy"
            className="absolute right-52 bottom-0 w-36 rounded-tr-[4rem] scale-y-[-1] z-0 lg:block hidden"
          />
          <div className="flex items-center justify-between md:flex-row flex-col lg:px-12 sm:px-10 px-2 gap-4">
            <div className="flex flex-col md:items-start items-center md:text-left text-center text-white gap-1.5 relative z-10">
              <h1 className="lg:text-3xl sm:text-2xl text-lg font-semibold my-1">
                Berita Terkini
              </h1>
              <p className="lg:text-sm text-xs font-light">
                Dinas Perdagangan Kabupaten Bekasi
              </p>
            </div>
            <div>
              <Input
                aria-label="search"
                placeholder="Cari Berita Disini"
                value={search || ""}
                radius="full"
                onChange={(e) => setSearch(e.target.value)}
                endContent={
                  <button className="bg-accent-primary text-white md:p-2 p-1 -me-2 rounded-full border">
                    <LuSearch />
                  </button>
                }
                className="xl:w-96 md:w-52 w-full"
                variant="bordered"
                classNames={{
                  inputWrapper: "bg-white/20 border border-white md:h-12 h-10",
                  input:
                    "placeholder:text-white placeholder:italic font-light text-white",
                }}
                size="sm"
              />
            </div>
          </div>
        </div>
        <div className="relative p-4 z-0">
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
              <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-3 gap-4">
                {BeritaData.map((item, index) => (
                  <BeritaCard
                    key={index}
                    title={item.title}
                    thumbnail={item.thumbnail}
                    createdAt={item.createdAt}
                    slug={item.slug}
                    content={item.content}
                  />
                ))}
              </div>
              {currentPage < totalPage && (
                <div className="text-center">
                  <Button
                    variant="bordered"
                    radius="sm"
                    className="!border-[0.2px] px-20 border-accent-primary font-medium"
                    onPress={refetchGallery}
                  >
                    <span className="text-accent-primary">Lihat Lainnya</span>
                  </Button>
                </div>
              )}
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
    </>
  );
}
