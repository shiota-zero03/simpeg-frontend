import { TitleCase } from "@/components/card/TitleCase";
import {
  Button,
  Card,
  CardBody,
  Input,
  useDisclosure,
  Tooltip,
} from "@heroui/react";

import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link } from "react-router-dom";
import { LuArrowLeft, LuCalendarDays } from "react-icons/lu";
import { LucideCalendarDays, LucidePencilLine } from "lucide-react";
import { FaFilePdf, FaQuestionCircle } from "react-icons/fa";
import { PenilaianKinerjaDougnhut } from "@/components/Charts/penilaian-kinerja";
import EditPenilaianNilai from "@/components/modals/Penilaian/EditPenilaianNilai";

export default function ViewBobotKinerja() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <EditPenilaianNilai
        nama="Lincoln George"
        jabatan="Kepala Dinas UPTD"
        nip="198203028014061400"
        isOpen={isOpen}
        onClose={onClose}
        handleClose={onClose}
      />
      <BreadcrumbAdmin location="/Penilaian Kinerja" />
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="flex">
          <Link
            to={`/penilaian-kinerja/berdasarkan-nilai`}
            className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
          >
            <LuArrowLeft /> Kembali
          </Link>
        </div>
        <TitleCase title="Detail Penilaian Kinerja" />
        <div className="bg-white shadow-md rounded-xl border min-h-[64vh] flex flex-col gap-1">
          <div className="md:p-4 p-2 grid md:grid-cols-5 grid-cols-1 gap-4">
            <div className="flex flex-col gap-2 md:col-span-2 grid-cols-1 mb-2">
              <Card className="border relative overflow-hidden" shadow="none">
                <CardBody className="p-4 flex items-center md:flex-row flex-col gap-4">
                  <img
                    src={`https://i.pravatar.cc/150?u=a042581f4e29026024d`}
                    alt="profile"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div className="text-sm flex flex-col gap-1 md:items-start items-center">
                    <p className="text-sm">Kepala Bidang Perdagangan</p>
                    <p className="font-semibold text-lg">Alfonso Philips</p>
                    <p className="text-sm">12345678901234567890</p>
                  </div>
                </CardBody>
              </Card>
              <Card className="border relative w-full" shadow="none">
                <CardBody className="p-4">
                  <PenilaianKinerjaDougnhut />
                </CardBody>
              </Card>
            </div>
            <div className="flex flex-col gap-2 md:col-span-3 grid-cols-1">
              <Card className="border relative w-full" shadow="none">
                <CardBody className="p-4">
                  <div className="flex items-center my-6 justify-end">
                    <div className="flex items-end gap-2">
                      <div className="flex sm:flex-row flex-col gap-2 items-end w-full">
                        <Input
                          type="month"
                          label="Pilih Periode"
                          labelPlacement="outside"
                          radius="sm"
                          size="sm"
                          variant="bordered"
                          placeholder="Cari nama pegawai disini"
                          startContent={
                            <LuCalendarDays className="text-accent-gray text-xs" />
                          }
                          classNames={{
                            inputWrapper: "border-[0.8px]",
                            input: "text-xs",
                            label: "font-semibold",
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={"#"}
                          className="border-[0.8px] text-xs flex items-center p-1.5 border-danger text-danger rounded-md w-28 gap-2 justify-center"
                        >
                          <FaFilePdf size={12} /> Export .pdf
                        </Link>
                        <Button
                          onPress={onOpen}
                          variant="solid"
                          radius="sm"
                          size="sm"
                          startContent={<LucidePencilLine size={12} />}
                          className="border-[0.8px] w-28 text-xs text-info bg-alert-info"
                        >
                          Edit Data
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-3">
                      <span className="font-semibold text-xs">Tanggal</span>
                      <div className="flex items-center gap-2 font-semibold text-xs">
                        <LucideCalendarDays
                          className="text-button-primary text-xs"
                          size={18}
                        />{" "}
                        14 April 2025
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="lokasi"
                          className="text-xs font-semibold flex items-center gap-2"
                        >
                          Kinerja
                          <Tooltip
                            content="Tidak ada file"
                            radius="full"
                            color="primary"
                            placement="top-start"
                            size="sm"
                          >
                            <FaQuestionCircle
                              className="text-info border-info"
                              size={12}
                            />
                          </Tooltip>
                          <span className="text-danger">*</span>
                        </label>
                        <Input
                          aria-label="lokasi"
                          readOnly
                          value={"Tingkat V (Nilai 5) - Sangat Baik"}
                          variant="bordered"
                          radius="sm"
                          placeholder="Masukkan Disini"
                          classNames={{
                            input: "text-xs cursor-not-allowed",
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="lokasi"
                          className="text-xs font-semibold flex items-center gap-2"
                        >
                          Bukti Pendukung
                        </label>
                        <Link
                          className="text-info underline text-sm mt-2 italic"
                          target="__blank"
                          to={`#`}
                        >
                          File Lampiran
                        </Link>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="lokasi"
                          className="text-xs font-semibold flex items-center gap-2"
                        >
                          Disiplin
                          <Tooltip
                            content="Tidak ada file"
                            radius="full"
                            color="primary"
                            placement="top-start"
                            size="sm"
                          >
                            <FaQuestionCircle
                              className="text-info border-info"
                              size={12}
                            />
                          </Tooltip>
                          <span className="text-danger">*</span>
                        </label>
                        <Input
                          aria-label="lokasi"
                          readOnly
                          value={"Tingkat V (Nilai 5) - Sangat Baik"}
                          variant="bordered"
                          radius="sm"
                          placeholder="Masukkan Disini"
                          classNames={{
                            input: "text-xs cursor-not-allowed",
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="lokasi"
                          className="text-xs font-semibold flex items-center gap-2"
                        >
                          Bukti Pendukung
                        </label>
                        <Link
                          className="text-info underline text-sm mt-2 italic"
                          target="__blank"
                          to={`#`}
                        >
                          File Lampiran
                        </Link>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="lokasi"
                          className="text-xs font-semibold flex items-center gap-2"
                        >
                          Loyalitas
                          <Tooltip
                            content="Tidak ada file"
                            radius="full"
                            color="primary"
                            placement="top-start"
                            size="sm"
                          >
                            <FaQuestionCircle
                              className="text-info border-info"
                              size={12}
                            />
                          </Tooltip>
                          <span className="text-danger">*</span>
                        </label>
                        <Input
                          aria-label="lokasi"
                          readOnly
                          value={"Tingkat V (Nilai 5) - Sangat Baik"}
                          variant="bordered"
                          radius="sm"
                          placeholder="Masukkan Disini"
                          classNames={{
                            input: "text-xs cursor-not-allowed",
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="lokasi"
                          className="text-xs font-semibold flex items-center gap-2"
                        >
                          Bukti Pendukung
                        </label>
                        <Link
                          className="text-info underline text-sm mt-2 italic"
                          target="__blank"
                          to={`#`}
                        >
                          File Lampiran
                        </Link>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="lokasi"
                          className="text-xs font-semibold flex items-center gap-2"
                        >
                          Kerjasama
                          <Tooltip
                            content="Tidak ada file"
                            radius="full"
                            color="primary"
                            placement="top-start"
                            size="sm"
                          >
                            <FaQuestionCircle
                              className="text-info border-info"
                              size={12}
                            />
                          </Tooltip>
                          <span className="text-danger">*</span>
                        </label>
                        <Input
                          aria-label="lokasi"
                          readOnly
                          value={"Tingkat V (Nilai 5) - Sangat Baik"}
                          variant="bordered"
                          radius="sm"
                          placeholder="Masukkan Disini"
                          classNames={{
                            input: "text-xs cursor-not-allowed",
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="lokasi"
                          className="text-xs font-semibold flex items-center gap-2"
                        >
                          Bukti Pendukung
                        </label>
                        <Link
                          className="text-info underline text-sm mt-2 italic"
                          target="__blank"
                          to={`#`}
                        >
                          File Lampiran
                        </Link>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="lokasi"
                          className="text-xs font-semibold flex items-center gap-2"
                        >
                          Attitude
                          <Tooltip
                            content="Tidak ada file"
                            radius="full"
                            color="primary"
                            placement="top-start"
                            size="sm"
                          >
                            <FaQuestionCircle
                              className="text-info border-info"
                              size={12}
                            />
                          </Tooltip>
                          <span className="text-danger">*</span>
                        </label>
                        <Input
                          aria-label="lokasi"
                          readOnly
                          value={"Tingkat V (Nilai 5) - Sangat Baik"}
                          variant="bordered"
                          radius="sm"
                          placeholder="Masukkan Disini"
                          classNames={{
                            input: "text-xs cursor-not-allowed",
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="lokasi"
                          className="text-xs font-semibold flex items-center gap-2"
                        >
                          Bukti Pendukung
                        </label>
                        <Link
                          className="text-info underline text-sm mt-2 italic"
                          target="__blank"
                          to={`#`}
                        >
                          File Lampiran
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
