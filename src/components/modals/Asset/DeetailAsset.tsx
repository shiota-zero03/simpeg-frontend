import {
    Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { useEffect, useMemo } from "react";
import { LuArchiveRestore, LuX } from "react-icons/lu";
import { Commet } from "react-loading-indicators";
import { useGetDetailAsset } from "@/services/asset/asset";
import { BiErrorCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

interface props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

const ViewModal = ({ id, isOpen, onClose }: props) => {

  const { data, isFetching, refetch } = useGetDetailAsset(id || "");

  const DETAIL_DATA = useMemo(() => {
    if(data){
        return data.data;
    } else {
        return null
    }
  }, [id, data])

  useEffect(() => {
    refetch();
  }, [isOpen]);


  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="5xl">
        <ModalContent>
          {isFetching && (
            <div className="inset-0 flex items-center justify-center absolute">
              <Commet color="#32cd32" size="medium" text="" textColor="" />
            </div>
          )}
          <ModalHeader className="flex items-center justify-between">
            <span className="text-base font-semibold">Detail Aset</span>
            <LuX
              className="text-danger border border-danger rounded-full p-2 cursor-pointer"
              onClick={onClose}
              size={32}
            />
          </ModalHeader>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom flex flex-col gap-2 pb-8">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
                <div className="flex flex-col gap-1">
                    <label htmlFor="lokasi" className="text-xs font-semibold">
                        ID Barang
                    </label>
                    <Input
                        aria-label="lokasi"
                        variant="bordered"
                        radius="sm"
                        isReadOnly
                        value={DETAIL_DATA?.idBarang}
                        placeholder="No Data"
                        classNames={{
                        input: "text-xs",
                        }}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="lokasi" className="text-xs font-semibold">
                        Kode Barang
                    </label>
                    <Input
                        aria-label="lokasi"
                        variant="bordered"
                        radius="sm"
                        isReadOnly
                        value={DETAIL_DATA?.kodeBarang}
                        placeholder="No Data"
                        classNames={{
                        input: "text-xs",
                        }}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="lokasi" className="text-xs font-semibold">
                        No. Registrasi
                    </label>
                    <Input
                        aria-label="lokasi"
                        variant="bordered"
                        radius="sm"
                        isReadOnly
                        value={DETAIL_DATA?.nomorRegistrasi}
                        placeholder="No Data"
                        classNames={{
                        input: "text-xs",
                        }}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="lokasi" className="text-xs font-semibold">
                        Kategori / Jenis Aset
                    </label>
                    <Input
                        aria-label="lokasi"
                        variant="bordered"
                        radius="sm"
                        isReadOnly
                        value={DETAIL_DATA?.kategori === "KENDARAAN" ? "Kendaraan" : "Peralatan Kantor/Mesin"}
                        placeholder="No Data"
                        classNames={{
                        input: "text-xs",
                        }}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="lokasi" className="text-xs font-semibold">
                        Nama Barang
                    </label>
                    <Input
                        aria-label="lokasi"
                        variant="bordered"
                        radius="sm"
                        isReadOnly
                        value={DETAIL_DATA?.namaBarang}
                        placeholder="No Data"
                        classNames={{
                        input: "text-xs",
                        }}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="lokasi" className="text-xs font-semibold">
                        Merk / Tipe
                    </label>
                    <Input
                        aria-label="lokasi"
                        variant="bordered"
                        radius="sm"
                        isReadOnly
                        value={DETAIL_DATA?.merkTipe}
                        placeholder="No Data"
                        classNames={{
                        input: "text-xs",
                        }}
                    />
                </div>
            </div>
            <Divider className="my-2" />
            {DETAIL_DATA?.kategori && (
                <div className="grid sm:grid-cols-6 grid-cols-1 gap-2">
                    <div className="sm:col-span-3 col-span-1">
                        <div className="mb-1">
                        <label
                            htmlFor="content"
                            className="font-semibold text-xs"
                        >
                            Harga
                        </label>
                        </div>
                        <Input
                        isReadOnly
                        value={`Rp ${DETAIL_DATA?.harga.toLocaleString('id-ID')}`}
                        aria-label="Judul"
                        labelPlacement="outside"
                        placeholder="No Data"
                        variant="bordered"
                        radius="sm"
                        classNames={{
                            inputWrapper: "border-[0.8px]",
                            input: "text-xs",
                        }}
                        />
                    </div>
                    <div className="sm:col-span-3 col-span-1">
                        <div className="mb-1">
                        <label
                            htmlFor="content"
                            className="font-semibold text-xs"
                        >
                            Tahun Perolehan
                        </label>
                        </div>
                        <Input
                        isReadOnly
                        value={DETAIL_DATA?.tahunPerolehan ? String(new Date(DETAIL_DATA?.tahunPerolehan).getFullYear()) : ""}
                        aria-label="Judul"
                        labelPlacement="outside"
                        placeholder="No Data"
                        variant="bordered"
                        radius="sm"
                        classNames={{
                            inputWrapper: "border-[0.8px]",
                            input: "text-xs",
                        }}
                        />
                    </div>
                    <div className="sm:col-span-2 col-span-1">
                        <div className="mb-1">
                        <label
                            htmlFor="content"
                            className="font-semibold text-xs"
                        >
                            Jenis Bahan
                        </label>
                        </div>
                        <Input
                        isReadOnly
                        value={DETAIL_DATA?.jenisBahan}
                        aria-label="Judul"
                        labelPlacement="outside"
                        placeholder="No Data"
                        variant="bordered"
                        radius="sm"
                        classNames={{
                            inputWrapper: "border-[0.8px]",
                            input: "text-xs",
                        }}
                        />
                    </div>
                    <div className="sm:col-span-2 col-span-1">
                        <div className="mb-1">
                        <label
                            htmlFor="content"
                            className="font-semibold text-xs"
                        >
                            Nomor Pabrik
                        </label>
                        </div>
                        <Input
                        isReadOnly
                        value={DETAIL_DATA?.nomorPabrik}
                        aria-label="Judul"
                        labelPlacement="outside"
                        placeholder="No Data"
                        variant="bordered"
                        radius="sm"
                        classNames={{
                            inputWrapper: "border-[0.8px]",
                            input: "text-xs",
                        }}
                        />
                    </div>
                    <div className="sm:col-span-2 col-span-1">
                        <div className="mb-1">
                        <label
                            htmlFor="content"
                            className="font-semibold text-xs"
                        >
                            Nomor Mesin / Barang
                        </label>
                        </div>
                        <Input
                        isReadOnly
                        value={DETAIL_DATA?.nomorMesin}
                        aria-label="Judul"
                        labelPlacement="outside"
                        placeholder="No Data"
                        variant="bordered"
                        radius="sm"
                        classNames={{
                            inputWrapper: "border-[0.8px]",
                            input: "text-xs",
                        }}
                        />
                    </div>
                    {DETAIL_DATA?.kategori === "KENDARAAN" && (
                        <div className="sm:col-span-2 col-span-1">
                        <div className="mb-1">
                            <label
                            htmlFor="content"
                            className="font-semibold text-xs"
                            >
                            Ukuran / CC
                            </label>
                        </div>
                        <Input
                            isReadOnly
                            value={DETAIL_DATA?.ukuranCC}
                            aria-label="Judul"
                            labelPlacement="outside"
                            placeholder="No Data"
                            variant="bordered"
                            radius="sm"
                            classNames={{
                            inputWrapper: "border-[0.8px]",
                            input: "text-xs",
                            }}
                        />
                        </div>
                    )}
                    {DETAIL_DATA?.kategori === "KENDARAAN" && (
                        <div className="sm:col-span-2 col-span-1">
                        <div className="mb-1">
                            <label
                            htmlFor="content"
                            className="font-semibold text-xs"
                            >
                            Nomor Rangka
                            </label>
                        </div>
                        <Input
                            isReadOnly
                            value={DETAIL_DATA?.nomorRangka}
                            aria-label="Judul"
                            labelPlacement="outside"
                            placeholder="No Data"
                            variant="bordered"
                            radius="sm"
                            classNames={{
                            inputWrapper: "border-[0.8px]",
                            input: "text-xs",
                            }}
                        />
                        </div>
                    )}
                    {DETAIL_DATA?.kategori === "KENDARAAN" && (
                        <div className="sm:col-span-2 col-span-1">
                        <div className="mb-1">
                            <label
                            htmlFor="content"
                            className="font-semibold text-xs"
                            >
                            Nomor Polisi
                            </label>
                        </div>
                        <Input
                            isReadOnly
                            value={DETAIL_DATA?.nomorPolisi}
                            aria-label="Judul"
                            labelPlacement="outside"
                            placeholder="No Data"
                            variant="bordered"
                            radius="sm"
                            classNames={{
                            inputWrapper: "border-[0.8px]",
                            input: "text-xs",
                            }}
                        />
                        </div>
                    )}
                    {DETAIL_DATA?.kategori === "KENDARAAN" && (
                        <div className="sm:col-span-6 col-span-1 flex sm:flex-row flex-col w-full gap-2">
                        <div className="w-full">
                            <div className="mb-1">
                            <label
                                htmlFor="content"
                                className="font-semibold text-xs"
                            >
                                Nomor BPKB/STNK
                            </label>
                            </div>
                            <Input
                            isReadOnly
                            value={DETAIL_DATA?.dokumenNomor}
                            aria-label="Judul"
                            labelPlacement="outside"
                            placeholder="No Data"
                            variant="bordered"
                            radius="sm"
                            classNames={{
                                inputWrapper: "border-[0.8px]",
                                input: "text-xs",
                            }}
                            />
                        </div>
                        </div>
                    )}
                    <div className="sm:col-span-6 col-span-1">
                        <div className="mb-1">
                        <label
                            htmlFor="content"
                            className="font-semibold text-xs"
                        >
                            Keterangan Aset
                        </label>
                        </div>
                        <Input
                        isReadOnly
                        value={DETAIL_DATA?.keterangan}
                        aria-label="Judul"
                        labelPlacement="outside"
                        placeholder="No Data"
                        variant="bordered"
                        radius="sm"
                        classNames={{
                            inputWrapper: "border-[0.8px]",
                            input: "text-xs",
                        }}
                        />
                    </div>
                    <div className="sm:col-span-6 col-span-1">
                        <div className="max-w-80">
                        <div className="mb-1">
                            <label
                            htmlFor="content"
                            className="font-semibold text-xs"
                            >
                            Foto
                            </label>
                        </div>
                        <div className="border p-8 mb-2 flex items-center justify-center">
                            {DETAIL_DATA?.dokumen ? (
                                <Link to={DETAIL_DATA?.dokumen} target="__blank">
                                    <LuArchiveRestore size={32} />
                                </Link>
                            ) : (
                            <BiErrorCircle size={32} />
                            )}
                        </div>
                        </div>
                    </div>
                </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewModal;
