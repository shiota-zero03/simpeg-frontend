import { TitleCase } from "@/components/card/TitleCase";
import { Card, CardBody } from "@heroui/react";

import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import ListKaryawan from "./penilaian";
import { PenilaianKinerjaDougnhut, PenilaianKinerjaLine } from "@/components/Charts/penilaian-kinerja";

export default function BobotKinerja() {
  return (
    <>
      <BreadcrumbAdmin location="/Penilaian Kinerja" />
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <TitleCase
          title="Penilaian Kinerja"
          text="Berikut ini menampilkan Penilaian Kinerja Berdasarkan Nilai"
        />
        <Card>
          <CardBody className="grid md:grid-cols-2 grid-cols-1">
            <PenilaianKinerjaLine />
            <PenilaianKinerjaDougnhut />
          </CardBody>
        </Card>
        <div className="bg-white shadow-md rounded-xl border min-h-[64vh]">
          <div className="md:p-4 p-2">
            <ListKaryawan />
          </div>
        </div>
      </div>
    </>
  );
}
