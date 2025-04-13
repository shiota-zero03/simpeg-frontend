import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { LuX } from "react-icons/lu";
import "react-datepicker/dist/react-datepicker.css";
import { PegawaiDummy } from "@/constants/DummyData";

interface props {
  type: string;
  isOpen: boolean;
  onClose: () => void;
}

const PegawaiModal = ({ type, isOpen, onClose }: props) => {
  console.log(type);

  const pegawai = PegawaiDummy;

  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="5xl">
        <ModalContent>
          <ModalHeader className="flex items-center justify-between">
            <span className="text-base font-semibold">Daftar Pegawai</span>
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
                            NIP
                          </th>
                          <th className="text-left border-b-2 min-w-60 border-accent-gray p-2 text-sm bg-primary text-white">
                            Nama Pegawai
                          </th>
                          <th className="text-left border-b-2 min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-tr-lg">
                            Jabatan
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {pegawai.length > 0 ? pegawai.map((item, index) => (
                          <tr key={index}>
                            <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10 text-center">
                              {index + 1}
                            </td>
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                              {item.nip || "-"}
                            </td>
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                              {item.nama}
                            </td>
                            <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm font-semibold">
                              {item.jabatan}
                            </td>
                          </tr>
                        )) : (
                          <tr></tr>
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

export default PegawaiModal;
