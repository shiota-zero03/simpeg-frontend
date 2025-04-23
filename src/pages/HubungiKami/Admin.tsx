import CreateModal from "@/components/modals/HubungiKamiModal/CreatedModal";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@heroui/react";
import { useEffect, useMemo } from "react";
import { LuPencilLine } from "react-icons/lu";
import Whatsapp from "@/assets/whatsapp.png";
import { useGetAllHubungiKami } from "@/services/customer-service";
import { BlinkBlur } from "react-loading-indicators";

export default function HubungikamiAdmin() {
  const { data, isFetching, refetch } = useGetAllHubungiKami(1, 1);

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
        phoneNumber={dataBuku?.phoneNumber || ""}
      />
      <Card shadow="sm" radius="sm">
        <CardBody className="md:p-8 p-4">
          <Card className="border p-4" radius="lg" shadow="sm">
            <CardHeader className="font-semibold md:text-base text-sm flex items-center gap-2">
              <img width={24} src={Whatsapp} alt="logo-whatsapp" /> Nomor
              Whatsapp
            </CardHeader>
            {isFetching ? (
              <div className="inset-0 fixed flex items-center justify-center z-20">
                <BlinkBlur color="#32cd32" size="medium" text="" textColor="" />
              </div>
            ) : (
              <CardBody className="md:text-sm text-xs text-justify flex items-center md:flex-row flex-col justify-between gap-3 -mt-2">
                <h1 className="text-base font-semibold">
                  {dataBuku?.phoneNumber || "----"}
                </h1>
                <Button
                  onPress={onOpen}
                  size="sm"
                  className="bg-alert-info text-info font-semibold border border-info"
                >
                  <LuPencilLine />
                  Edit Data
                </Button>
              </CardBody>
            )}
          </Card>
        </CardBody>
      </Card>
    </div>
  );
}
