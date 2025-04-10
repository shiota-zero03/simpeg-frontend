import { useGetAllHubungiKamiHome } from "@/services/customer-service";
import { Card, CardBody, CardFooter, Textarea } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { LuSend } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function HubungiKamiGuest() {
  const [message, setMessage] = useState<string>("");

  const { data, isFetching, refetch } = useGetAllHubungiKamiHome(1, 1);

  const dataBuku = useMemo(() => {
    return data?.data?.response?.[0] ?? null;
  }, [data]);

  useEffect(() => {
    refetch();
    setMessage("");
  }, []);

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
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            classNames={{
              label: "font-semibold",
            }}
          />
        </CardBody>

        {!isFetching && dataBuku?.phoneNumber && (
          <CardFooter>
            <Link
              target="__blank"
              to={`https://wa.me/${dataBuku.phoneNumber}?text=${encodeURIComponent(message)}`}
              className="bg-accent-primary text-white font-normal flex items-center gap-2 p-2 text-sm rounded-lg"
            >
              Kirim Sekarang <LuSend size={14} />
            </Link>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
