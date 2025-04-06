import { Button, Card, CardBody, CardFooter, Textarea } from "@heroui/react";
import { LuSend } from "react-icons/lu";

export default function HubungiKamiGuest() {
  return (
    <div>
        <Card shadow="sm" radius="sm" className="md:p-4 p-2">
            <CardBody className="md:text-sm text-xs text-justify">
                <Textarea
                    label="Pesan anda"
                    labelPlacement="outside"
                    placeholder="Masukkan pesan atau pertanyaan anda"
                    variant="bordered"
                    radius="sm"
                    classNames={{
                        label: 'font-semibold'
                    }}
                />
            </CardBody>
            <CardFooter>
                <Button variant="solid" className="bg-accent-primary text-white font-normal flex items-center gap-2" size="sm">
                    Kirim Sekarang <LuSend size={16} />
                </Button>
            </CardFooter>
        </Card>
    </div>
  );
}
