import { TitleCase } from "@/components/card/TitleCase";
import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { useEffect, useMemo } from "react";
import { DMYIndoToFormat } from "@/utils/dateFormater";
import { Commet } from "react-loading-indicators";
import { useGetProfile } from "@/services/auth";
import { LucideKey, LucidePencilLine } from "lucide-react";
import UpdateProfil from "@/components/modals/Profil/UpdateProfil";
import UpdatePassword from "@/components/modals/Profil/UpdatePassword";

export default function DataProfile() {
  const { data, isFetching, refetch } = useGetProfile();

  const DATA_FETCHING = useMemo(() => {
    if (!data) return null;
    return data.data;
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();

  const {
    isOpen: isOpenPassword,
    onOpen: onOpenPassword,
    onClose: onClosePassword,
  } = useDisclosure();

  const handleClose = () => {
    refetch();
    onCloseUpdate();
    onClosePassword();
  };

  return (
    <div className="py-8 px-4">
      {DATA_FETCHING && (
        <UpdateProfil
          data={DATA_FETCHING}
          isOpen={isOpenUpdate}
          onClose={onCloseUpdate}
          handleClose={handleClose}
        />
      )}

      <UpdatePassword
        isOpen={isOpenPassword}
        onClose={onClosePassword}
        handleClose={handleClose}
      />
      {isFetching && (
        <div className="inset-0 flex items-center justify-center absolute z-10">
          <Commet color="#32cd32" size="medium" text="" textColor="" />
        </div>
      )}
      <div className="flex items-center justify-between lg:flex-row flex-col">
        <TitleCase title="Profil Akun" />
        <div className="flex items-center gap-2">
          <Button
            onPress={onOpenUpdate}
            className="flex gap-2 items-center text-info bg-alert-info font-semibold p-2 text-sm rounded-md ms-auto"
          >
            <LucidePencilLine size={18} /> Ubah Profil
          </Button>
          <Button
            className="flex gap-2 items-center text-warning bg-alert-warning font-semibold p-2 text-sm rounded-md ms-auto"
            onPress={onOpenPassword}
          >
            <LucideKey size={18} /> Ubah Password
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <Card className="border relative overflow-hidden" shadow="none">
          <div className="absolute top-0 right-0 bg-primary text-white py-2 px-4 text-sm rounded-bl-lg">
            {DATA_FETCHING?.role === "PEGAWAI" ? "Pegawai" : "Admin"}
          </div>
          <CardBody className="p-4 flex items-center md:flex-row flex-col gap-4">
            <img
              src={
                DATA_FETCHING?.photo ??
                `https://ui-avatars.com/api/?name=${DATA_FETCHING?.name ?? "Dinas Perdagangan"}&background=random`
              }
              alt="profile"
              width={80}
              height={80}
              className="rounded-full border"
            />
            <div className="text-sm flex flex-col gap-1 md:items-start items-center">
              <p className="text-xs">
                {DATA_FETCHING?.jabatan.nameJob}{" "}
                {DATA_FETCHING?.isPimpinan ? `( Pimpinan )` : ""}
              </p>
              <p className="font-semibold text-lg">{DATA_FETCHING?.name}</p>
              <p className="text-xs">{DATA_FETCHING?.nip}</p>
              <ul
                className={`ms-5 ${DATA_FETCHING?.status ? "text-success" : "text-danger"} font-semibold mt-1`}
              >
                <li className="list-disc">
                  {DATA_FETCHING?.status ? "Aktif" : "Tidak Aktif"}
                </li>
              </ul>
            </div>
          </CardBody>
        </Card>
        <Card className="border relative overflow-hidden" shadow="none">
          <CardBody className="p-4 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
            <div>
              <p className="text-sm">Jabatan</p>
              <h4 className="font-semibold">
                {DATA_FETCHING?.jabatan.nameJob}
              </h4>
            </div>
            <div>
              <p className="text-sm">Status ASN</p>
              <h4 className="font-semibold">
                {DATA_FETCHING?.statusAsn ? "ASN" : "Non-ASN"}
              </h4>
            </div>
            <div>
              <p className="text-sm">Unit</p>
              <h4 className="font-semibold">
                {DATA_FETCHING?.unit?.nameUnit || "-"}
              </h4>
            </div>
            <div>
              <p className="text-sm">Eselon</p>
              <h4 className="font-semibold">{DATA_FETCHING?.eselon ?? "-"}</h4>
            </div>
            <div>
              <p className="text-sm">Golongan</p>
              <h4 className="font-semibold">{DATA_FETCHING?.group ?? "-"}</h4>
            </div>
            <div>
              <p className="text-sm">Status Kepegawaian</p>
              <h4 className="font-semibold">
                {DATA_FETCHING?.employmentStatus ?? "-"}
              </h4>
            </div>
            <div>
              <p className="text-sm">Email</p>
              <h4 className="font-semibold">{DATA_FETCHING?.email ?? "-"}</h4>
            </div>
            <div>
              <p className="text-sm">Kontak / No. Whatsapp</p>
              <h4 className="font-semibold">
                {DATA_FETCHING?.phoneNumber ?? "-"}
              </h4>
            </div>
            <div>
              <p className="text-sm">Jenis Kelamin</p>
              <h4 className="font-semibold">{DATA_FETCHING?.gender ?? "-"}</h4>
            </div>
          </CardBody>
        </Card>
        <Card className="border relative overflow-hidden" shadow="none">
          <CardBody className="px-4 pb-4 grid md:grid-cols-2 grid-cols-1 gap-3">
            <div className="font-bold md:col-span-2 col-span-1">
              Detail Lainnya
            </div>
            <div>
              <p className="text-sm">Tempat Lahir</p>
              <h4 className="font-semibold">
                {DATA_FETCHING?.placeOfBirth ?? "-"}
              </h4>
            </div>
            <div>
              <p className="text-sm">Tanggal Lahir</p>
              <h4 className="font-semibold">
                {DATA_FETCHING?.dateOfBirth
                  ? DMYIndoToFormat(DATA_FETCHING.dateOfBirth)
                  : "-"}
              </h4>
            </div>
            <div>
              <p className="text-sm">Pangkat</p>
              <h4 className="font-semibold">{DATA_FETCHING?.rank ?? "-"}</h4>
            </div>
            <div>
              <p className="text-sm">Pendidikan Terakhir</p>
              <h4 className="font-semibold">
                {DATA_FETCHING?.education ?? "-"}
              </h4>
            </div>
            <div>
              <p className="text-sm">Usia Pensiun</p>
              <h4 className="font-semibold">
                {DATA_FETCHING?.pensionAge ?? "-"}
              </h4>
            </div>
            <div>
              <p className="text-sm">Tanggal Pensiun</p>
              <h4 className="font-semibold">
                {DATA_FETCHING?.pensionDate
                  ? DMYIndoToFormat(DATA_FETCHING.pensionDate)
                  : "-"}
              </h4>
            </div>
            <div>
              <p className="text-sm">Tanggal TMT</p>
              <h4 className="font-semibold">
                {DATA_FETCHING?.employmentDate
                  ? DMYIndoToFormat(DATA_FETCHING.employmentDate)
                  : "-"}
              </h4>
            </div>
            <div>
              <p className="text-sm">Tanggal KGB</p>
              <h4 className="font-semibold">
                {DATA_FETCHING?.tanggalKGB
                  ? DMYIndoToFormat(DATA_FETCHING.tanggalKGB)
                  : "-"}
              </h4>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
