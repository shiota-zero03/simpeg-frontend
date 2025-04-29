import { useGetAllBeritaHome } from "@/services/berita";
import { DMYIndoToFormat } from "@/utils/dateFormater";
import { Button, Divider, Spinner } from "@heroui/react";
import { LucideCalendarDays } from "lucide-react";
import { useEffect, useMemo } from "react";
import { LuArrowRight, LuArrowUpRight } from "react-icons/lu";
import { TbFaceIdError } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import ImageHome from "@/assets/gambar-home.jpg";

interface BeritaDataProps {
  thumbnail: string;
  slug: string;
  title: string;
  createdAt: string;
  content: string;
}

const BeritaComponent = () => {
  const { data, isFetching, refetch } = useGetAllBeritaHome(1, 5);

  const BeritaData: BeritaDataProps[] = useMemo(() => {
    if (data) {
      return data.data.response.map((item) => ({
        // thumbnail: item.images,
        thumbnail: ImageHome,
        title: item.title,
        slug: item.id,
        createdAt: item.createdAt,
        content: item.description,
      }));
    } else {
      return [];
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Divider
            orientation="horizontal"
            className="bg-accent-primary py-0.5 w-10 sm:block hidden"
          />
          <h1 className="font-semibold">Berita Terbaru</h1>
        </div>
        <Button
          variant="bordered"
          onPress={() => navigate("/berita")}
          endContent={<LuArrowRight />}
          className="border-accent-primary text-accent-primary"
          size="sm"
        >
          <span className="sm:block hidden">Lihat Berita Lainnya</span>
        </Button>
      </div>

      <div className="min-h-60">
        {BeritaData.length > 0 ? (
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-3 gap-3 lg:max-h-80">
            {BeritaData.map((item, index) => {
              return index < 2 ? (
                <div
                  key={index}
                  className="cursor-pointer rounded-xl overflow-hidden row-span-3 bg-white border shadow-md group relative z-0"
                  onClick={() => navigate(`/berita/${item.slug}`)}
                >
                  <div className="absolute bg-black/10 inset-0 hidden group-hover:flex items-center justify-center p-4 text-center duration-300 animate-appearance-in z-10" />
                  <div className="w-full overflow-hidden relative group lg:h-52 h-32 z-0">
                    <img
                      src={item.thumbnail}
                      alt="galeri-image"
                      className="object-cover object-center min-w-full min-h-full group-hover:scale-90 group-hover:rounded-md duration-200"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    <h4 className="md:text-sm text-xs font-semibold">
                      {item.title.length > 60
                        ? item.title.slice(0, 60) + "..."
                        : item.title}
                    </h4>
                    <small className="flex md:text-xs text-[0.6rem] items-center gap-2 text-[#199FB1]">
                      <LucideCalendarDays size={12} />
                      {DMYIndoToFormat(item.createdAt)}
                    </small>
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className="row-span-1 bg-white border shadow-md p-4 rounded-xl lg:block hidden"
                >
                  <div className="text-sm flex flex-col xl:gap-3 gap-2">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="xl:text-sm text-xs font-semibold">
                        {item.title.length > 60
                          ? item.title.slice(0, 60) + "..."
                          : item.title}
                      </h4>
                      <Button
                        type="button"
                        isIconOnly
                        size="sm"
                        variant="flat"
                        radius="full"
                        className="shadow-md border"
                        onPress={() => navigate(`/berita/${item.slug}`)}
                      >
                        <LuArrowUpRight />
                      </Button>
                    </div>
                    <small className="flex xl:text-xs text-[0.6rem] items-center gap-2 text-[#199FB1]">
                      <LucideCalendarDays size={12} />
                      {DMYIndoToFormat(item.createdAt)}
                    </small>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col gap-2">
            <TbFaceIdError size={60} className="opacity-60" />
            <h1 className="font-medium italic opacity-60 text-sm">
              Tidak ada berita ditemukan
            </h1>
          </div>
        )}
      </div>

      {isFetching && (
        <div className="flex items-center justify-center inset-0 absolute bg-slate-50/10">
          <Spinner
            variant="dots"
            size="lg"
            classNames={{
              dots: "w-5 h-5",
              base: "w-full h-full",
              wrapper: "w-auto gap-2 h-auto",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BeritaComponent;
