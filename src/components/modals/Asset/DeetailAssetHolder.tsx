import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { LuX } from "react-icons/lu";
import { TbFaceIdError } from "react-icons/tb";

interface props {
  holder: {
    tanggal: string;
    assetId: string;
    kodeBarang: string;
    nomorRegistrasi: string;
    kategori: string;
    assetName: string;
    merk: string;
    harga: number;
    file: string;
    noBast: string;
  }[];
  isOpen: boolean;
  onClose: () => void;
}

const ViewModal = ({ holder, isOpen, onClose }: props) => {

  

  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="5xl">
        <ModalContent>
          <ModalHeader className="flex items-center justify-between">
            <span className="text-base font-semibold">Data Barang / Kendaraan</span>
            <LuX
              className="text-danger border border-danger rounded-full p-2 cursor-pointer"
              onClick={onClose}
              size={32}
            />
          </ModalHeader>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom flex flex-col gap-2 pb-8">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr>
                        <th className="text-center border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-tl-lg">
                        No
                        </th>
                        <th className="text-left border-b-2 min-w-60 border-accent-gray p-2 text-sm bg-primary text-white">
                        Kode Barang
                        </th>
                        <th className="text-left border-b-2 min-w-60 border-accent-gray p-2 text-sm bg-primary text-white">
                        No. Reg
                        </th>
                        <th className="text-left border-b-2 min-w-60 border-accent-gray p-2 text-sm bg-primary text-white">
                        Nama Barang
                        </th>
                        <th className="text-left border-b-2 min-w-60 border-accent-gray p-2 text-sm bg-primary text-white">
                        Dokumen Pendukung
                        </th>
                        <th className="text-left border-b-2 min-w-60 border-accent-gray p-2 text-sm bg-primary text-white">
                        No. BAST
                        </th>
                        <th className="text-left border-b-2 min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-tr-lg">
                        Lampiran
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {holder.length > 0 ? (
                        holder.map((item, index) => (
                        <tr key={index}>
                            <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10 text-center">
                            {index + 1}
                            </td>
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            {item.kodeBarang || "-"}
                            </td>
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            {item.nomorRegistrasi || "-"}
                            </td>
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            {item.kategori || "-"}
                            </td>'
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            {item.assetName || "-"}
                            </td>
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            {item.nomorRegistrasi || "-"}
                            </td>'
                            {/* <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm font-semibold">
                            {item.jabatan ? item.jabatan.nameJob : ""}
                            </td> */}
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td
                            colSpan={8}
                            className="py-4 border-b-2 border-x-2 border-accent-gray text-center"
                        >
                            <div className="w-full flex items-center justify-center flex-col text-primary opacity-20">
                            <TbFaceIdError size={120} />
                            <span className="italic text-xl font-semibold">
                                No Data Found
                            </span>
                            </div>
                        </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewModal;
