import { TitleCase } from "@/components/card/TitleCase";
import { Card, CardBody, CardHeader} from "@heroui/react";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link } from "react-router-dom";
import { LucidePencilLine } from "lucide-react";

export default function UpdateNews() {
  
  return (
    <>
      <BreadcrumbAdmin location="/Pegawai/Detail" />
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <TitleCase
          title="Detail Pegawai"
        />

        <Card className="border" shadow="none">
          <CardHeader>
            <Link to={'/pegawai/edit-data/1'} className="flex gap-2 items-center text-info bg-alert-info font-semibold p-2 text-sm rounded-md ms-auto">
              <LucidePencilLine size={18} /> Edit Data
            </Link>
          </CardHeader>
          <CardBody className="flex flex-col gap-2">
            <Card className="border relative overflow-hidden" shadow="none">
              <div className="absolute top-0 right-0 bg-primary text-white py-2 px-4 text-sm rounded-bl-lg">Admin</div>
              <CardBody className="p-4 flex items-center md:flex-row flex-col gap-4">
                <img src={`https://i.pravatar.cc/150?u=a042581f4e29026024d`} alt="profile" width={80} height={80} className="rounded-full" />
                <div className="text-sm flex flex-col gap-1 md:items-start items-center">
                  <p className="text-xs">Kepala Bidang Perdagangan</p>
                  <p className="font-semibold text-lg">Alfonso Philips</p>
                  <p className="text-xs">12345678901234567890</p>
                  <ul className={`ms-5 text-success font-semibold mt-1`}>
                    <li className="list-disc">Aktif</li>
                  </ul>
                </div>
              </CardBody>
            </Card>
            <Card className="border relative overflow-hidden" shadow="none">
              <CardBody className="p-4 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
                <div>
                  <p className="text-sm">Jabatan</p>
                  <h4 className="font-semibold">Kepala Bidang Perdagangan</h4>
                </div>
                <div>
                  <p className="text-sm">Status ASN</p>
                  <h4 className="font-semibold">ASN</h4>
                </div>
                <div>
                  <p className="text-sm">Dinas / UPTD</p>
                  <h4 className="font-semibold">UPTD I (Tambun)</h4>
                </div>
                <div>
                  <p className="text-sm">Eselon</p>
                  <h4 className="font-semibold">IV</h4>
                </div>
                <div>
                  <p className="text-sm">Golongan</p>
                  <h4 className="font-semibold">IV/b</h4>
                </div>
                <div>
                  <p className="text-sm">Status Kepegawaian</p>
                  <h4 className="font-semibold">Mutasi (Pindah)</h4>
                </div>
              </CardBody>
            </Card>
            <Card className="border relative overflow-hidden" shadow="none">
              <CardBody className="px-4 pb-4 grid md:grid-cols-2 grid-cols-1 gap-3">
                <div className="font-bold md:col-span-2 col-span-1">
                  Detail Lainnya
                </div>
                <div>
                  <p className="text-sm">Email</p>
                  <h4 className="font-semibold">email@gmail.com</h4>
                </div>
                <div>
                  <p className="text-sm">Kontak / No. Whatsapp</p>
                  <h4 className="font-semibold">082141241231</h4>
                </div>
                <div>
                  <p className="text-sm">Tempat Lahir</p>
                  <h4 className="font-semibold">Cikarang</h4>
                </div>
                <div>
                  <p className="text-sm">Tanggal Lahir</p>
                  <h4 className="font-semibold">20/03/1976</h4>
                </div>
                <div>
                  <p className="text-sm">Pangkat</p>
                  <h4 className="font-semibold">Mayor</h4>
                </div>
                <div>
                  <p className="text-sm">Pendidikan Terakhir</p>
                  <h4 className="font-semibold">S1</h4>
                </div>
                <div>
                  <p className="text-sm">Usia Pensiun</p>
                  <h4 className="font-semibold">70</h4>
                </div>
                <div>
                  <p className="text-sm">Tanggal Pensiun</p>
                  <h4 className="font-semibold">10/04/2026</h4>
                </div>
                <div>
                  <p className="text-sm">Tanggal TMT</p>
                  <h4 className="font-semibold">10/04/2026</h4>
                </div>
                <div>
                  <p className="text-sm">Tanggal KGB</p>
                  <h4 className="font-semibold">10/04/2026</h4>
                </div>
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
