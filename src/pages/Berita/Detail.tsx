import { BeritaOtherCard } from "@/components/card/HomeCard";
import { useGetAllBeritaHome, useGetDetailBeritaHome } from "@/services/berita";
import { timestampIndoToFormat } from "@/utils/dateFormater";
import { LucideCalendarDays } from "lucide-react";
import { useEffect, useMemo } from "react";
import { LuArrowRight } from "react-icons/lu";
import { TbFaceIdError } from "react-icons/tb";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Commet, TrophySpin } from "react-loading-indicators";
import { ErrorToast } from "@/utils/ToastMessage";

interface BeritaDataProps {
  thumbnail: string;
  slug: string;
  title: string;
  createdAt: string;
  content: string;
}

export default function DetailBerita() {
  const { id } = useParams();
  const { data, isFetching, refetch, error } = useGetDetailBeritaHome(
    id as string,
  );

  const navigate = useNavigate();

  const BeritaNow: BeritaDataProps | null = useMemo(() => {
    if (data) {
      const dataBerita = data.data;
      return {
        thumbnail: dataBerita.images,
        title: dataBerita.title,
        slug: dataBerita.id,
        createdAt: dataBerita.createdAt,
        content: dataBerita.description,
      };
    } else {
      return null;
    }
  }, [data]);

  const {
    data: dataALlBerita,
    isFetching: isFetchingAllBerita,
    refetch: refetchAllBerita,
  } = useGetAllBeritaHome(1, 6);
  const BeritaData: BeritaDataProps[] = useMemo(() => {
    if (dataALlBerita) {
      const dataBeritaAll = dataALlBerita.data.response;
      return dataBeritaAll.map((item) => ({
        thumbnail: item.images,
        title: item.title,
        slug: item.id,
        createdAt: item.createdAt,
        content: item.description,
      }));
    } else {
      return [];
    }
  }, [dataALlBerita]);

  useEffect(() => {
    refetch();
    refetchAllBerita();
  }, []);

  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/berita");
    }
  }, [isFetching, error]);

  return (
    <>
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="grid xl:grid-cols-4 grid-cols-5 gap-4">
          <div className="lg:col-span-3 col-span-5 bg-white xl:p-8 sm:p-6 p-4 rounded-xl shadow-lg border-lg">
            {isFetching ? (
              <div className="bg-slate-50 min-h-96 h-full w-full border flex items-center justify-center rounded-md">
                <Commet color="#32cd32" size="medium" text="" textColor="" />
              </div>
            ) : (
              <div className="relative group rounded-xl overflow-hidden">
                <img
                  src={BeritaNow?.thumbnail}
                  alt="thumbnail-berita"
                  className="w-full rounded-xl"
                />
                <div className="bg-black/20 absolute inset-0"></div>
                <div className="bg-black absolute -bottom-40 group-hover:bottom-0 w-full text-white lg:text-xl sm:text-base text-[0.5rem] font-semibold sm:p-4 p-2 duration-300">
                  {BeritaNow?.title}
                </div>
              </div>
            )}
            {!isFetching && (
              <div className="flex flex-col gap-4 mt-4">
                <h1 className="font-semibold xl:text-2xl sm:text-base text-sm">
                  {BeritaNow?.title}
                </h1>
                <div className="text-accent-primary font-medium flex items-center gap-4 xl:text-base sm:text-sm text-xs">
                  <LucideCalendarDays
                    size={20}
                    className="lg:scale-100 scale-75"
                  />
                  {BeritaNow
                    ? timestampIndoToFormat(" | ", BeritaNow.createdAt)
                    : "-"}
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: BeritaNow?.content || "" }}
                />
              </div>
            )}
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
            {isFetchingAllBerita ? (
              <div className="absolute inset-0 bg-slate-50/20 z-10 flex items-center justify-center">
                <TrophySpin
                  color="#32cd32"
                  size="medium"
                  text=""
                  textColor=""
                />
              </div>
            ) : (
              <>
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
                    <TbFaceIdError size={100} className="opacity-60" />
                    <h1 className="font-medium italic opacity-60 text-xl">
                      Tidak ada berita ditemukan
                    </h1>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
