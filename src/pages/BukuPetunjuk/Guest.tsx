import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { LucideDownloadCloud } from "lucide-react";

export default function BukuPetunjukGuest() {
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
            <CardFooter>
              <Button
                variant="bordered"
                className="border-[0.8px] border-accent-primary text-accent-primary font-normal flex items-center gap-2"
                size="sm"
              >
                <LucideDownloadCloud size={16} /> Unduh Disini
              </Button>
            </CardFooter>
          </Card>
        </CardBody>
      </Card>
    </div>
  );
}
