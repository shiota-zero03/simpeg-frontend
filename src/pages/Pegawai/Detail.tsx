import { TitleCase } from "@/components/card/TitleCase";
import { Card, CardBody, CardHeader } from "@heroui/react";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LucidePencilLine } from "lucide-react";
import { useGetDetailPegawai } from "@/services/pegawai";
import { useEffect, useMemo } from "react";
import { ErrorToast } from "@/utils/ToastMessage";
import { DMYIndoToFormat } from "@/utils/dateFormater";
import { Commet } from "react-loading-indicators";
import store from "@/redux/store";
import { useGetAllJabatanOption } from "@/services/jabatan";

export default function UpdateNews() {
  const role = store.getState().auth.role as string;
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isFetching, refetch, error } = useGetDetailPegawai(id || "");
  const {
    data: allDataJabatan,
    isFetching: isFetchingJabatan,
    refetch: refetchJabatan,
  } = useGetAllJabatanOption();
  const JABATAN_SELECT = useMemo(() => {
    if (!allDataJabatan) return [];
    return allDataJabatan.data;
  }, [allDataJabatan]);

  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/pegawai");
    }
  }, [isFetching, refetch]);

  const DATA_FETCHING = useMemo(() => {
    if (!data) return null;
    return data.data;
  }, [data, id]);

  useEffect(() => {
    refetch();
    refetchJabatan();
  }, []);

  return (
    <>
      <BreadcrumbAdmin location="/Pegawai/Detail" />
      {(isFetching || isFetchingJabatan) && (
        <div className="inset-0 flex items-center justify-center absolute z-10">
          <Commet color="#32cd32" size="medium" text="" textColor="" />
        </div>
      )}
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <TitleCase title="Detail Pegawai" />

        <Card className="border" shadow="none">
          {role === "ADMIN" || role === "SUPERUSERS"  && (
            <CardHeader>
              <Link
                to={`/pegawai/edit-data/${id}`}
                className="flex gap-2 items-center text-info bg-alert-info font-semibold p-2 text-sm rounded-md ms-auto"
              >
                <LucidePencilLine size={18} /> Edit Data
              </Link>
            </CardHeader>
          )}
          <CardBody className="flex flex-col gap-2">
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
              <CardBody className="p-4 grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
                <div>
                  <p className="text-sm">Jabatan</p>
                  <h4 className="font-semibold">
                    {DATA_FETCHING?.jabatan.nameJob}
                  </h4>
                </div>
                <div>
                  <p className="text-sm">Unit Kerja</p>
                  <h4 className="font-semibold">
                    {JABATAN_SELECT.find(
                      (it) => it.id === DATA_FETCHING?.jabatan.id,
                    )?.subUnor === "PEMERINTAH"
                      ? "Pemerintah Kab. Bekasi"
                      : "Dinas Perdagangan Kab. Bekasi"}
                  </h4>
                </div>
                <div>
                  <p className="text-sm">Sub Unor</p>
                  <h4 className="font-semibold">
                    {JABATAN_SELECT.find(
                      (it) => it.id === DATA_FETCHING?.jabatan.id,
                    )?.unit?.nameUnit || "-"}
                  </h4>
                </div>
                <div>
                  <p className="text-sm">Eselon</p>
                  <h4 className="font-semibold">
                    {JABATAN_SELECT.find(
                      (it) => it.id === DATA_FETCHING?.jabatan.id,
                    )?.eselon || "-"}
                  </h4>
                </div>
                <div>
                  <p className="text-sm">Pangkat</p>
                  <h4 className="font-semibold">
                    {DATA_FETCHING?.rank ?? "-"}
                  </h4>
                </div>
                <div>
                  <p className="text-sm">Golongan</p>
                  <h4 className="font-semibold">
                    {DATA_FETCHING?.group ?? "-"}
                  </h4>
                </div>
                <div>
                  <p className="text-sm">Status Kepegawaian</p>
                  <h4 className="font-semibold">
                    {DATA_FETCHING?.employmentStatus ?? "-"}
                  </h4>
                </div>
                <div>
                  <p className="text-sm">Email</p>
                  <h4 className="font-semibold">
                    {DATA_FETCHING?.email ?? "-"}
                  </h4>
                </div>
                <div>
                  <p className="text-sm">Kontak / No. Whatsapp</p>
                  <h4 className="font-semibold">
                    {DATA_FETCHING?.phoneNumber ?? "-"}
                  </h4>
                </div>
              </CardBody>
            </Card>
            <Card className="border relative overflow-hidden" shadow="none">
              <CardBody className="px-4 pb-4 grid md:grid-cols-2 grid-cols-1 gap-3">
                <div className="font-bold md:col-span-2 col-span-1">
                  Detail Lainnya
                </div>
                <div>
                  <p className="text-sm">Jenis Kelamin</p>
                  <h4 className="font-semibold">
                    {DATA_FETCHING?.gender === "LAKI_LAKI"
                      ? "Laki - Laki"
                      : "Perempuan"}
                  </h4>
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
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
