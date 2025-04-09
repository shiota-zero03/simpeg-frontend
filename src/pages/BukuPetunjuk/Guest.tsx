import { useGetAllManualBookHome } from "@/services/manual-book";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { LucideDownloadCloud } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

export default function BukuPetunjukGuest() {
  const { data, isFetching, refetch } = useGetAllManualBookHome(1, 1);

  const dataBuku = useMemo(() => {
    return data ? data.data.response[0]?.files || null : null;
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <Card shadow="sm" radius="sm">
        <CardBody className="md:p-8 p-4">
          <Card className="border" radius="sm" shadow="sm">
            <CardHeader className="font-semibold md:text-base text-sm">
              Unduh Buku Petunjuk Penggunaan SIMPEG
            </CardHeader>
            <CardBody className="md:text-sm text-xs text-justify">
              Dapatkan panduan lengkap penggunaan Aplikasi SIMPEG Dinas
              Perdagangan Kabupaten Bekasi. Buku petunjuk ini akan membantu Anda
              memahami fitur, cara penggunaan, dan pengelolaan data kepegawaian
              dengan lebih mudah. Klik tombol di bawah untuk mengunduh sekarang!
            </CardBody>
            {!isFetching && (
              <CardFooter>
                <Link
                  to={dataBuku || ""}
                  target="__blank"
                  className="border-[0.8px] border-accent-primary text-accent-primary font-normal flex items-center gap-2 p-2 rounded-lg"
                >
                  <LucideDownloadCloud size={16} /> Unduh Disini
                </Link>
              </CardFooter>
            )}
          </Card>
        </CardBody>
      </Card>
    </div>
  );
}
