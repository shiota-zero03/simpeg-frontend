import CreateModal from "@/components/modals/ManualBookModal/CreatedModal";
import { useGetAllManualBook } from "@/services/manual-book";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  useDisclosure,
} from "@heroui/react";
import { useEffect, useMemo } from "react";
import { LuEye, LuPencilLine } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function BukuPetunjukAdmin() {
  const { data, isFetching, refetch } = useGetAllManualBook(1, 1);

  const dataBuku = useMemo(() => {
    return data ? data.data.response[0] || null : null;
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <CreateModal
        isOpen={isOpen}
        onClose={onClose}
        handleClose={() => {
          refetch();
          onClose();
        }}
        id={dataBuku?.id || ""}
        title={dataBuku?.title || ""}
        description={dataBuku?.description || ""}
      />
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
              <CardFooter className="flex items-center justify-between gap-2 md:flex-row flex-col">
                <Link
                  to={dataBuku?.files || ""}
                  target="__blank"
                  className="border-[0.8px] border-accent-primary text-accent-primary font-normal flex items-center gap-2 p-2 rounded-lg text-xs"
                >
                  <LuEye size={16} /> Preview Buku Petunjuk
                </Link>
                <Button
                  onPress={onOpen}
                  size="sm"
                  className="bg-alert-info text-info font-semibold border border-info"
                >
                  <LuPencilLine />
                  Edit Data
                </Button>
              </CardFooter>
            )}
          </Card>
        </CardBody>
      </Card>
    </div>
  );
}
