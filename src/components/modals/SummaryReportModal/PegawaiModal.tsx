import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { LuX } from "react-icons/lu";
import "react-datepicker/dist/react-datepicker.css";
import { PegawaiRes } from "@/interface/responses/pegawai.interface";
import { TbFaceIdError } from "react-icons/tb";

interface props {
  pegawai: PegawaiRes[];
  isOpen: boolean;
  onClose: () => void;
}

const PegawaiModal = ({ pegawai, isOpen, onClose }: props) => {
  // const pegawai = PegawaiDummy;

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
                  {pegawai.length > 0 ? (
                    pegawai.map((item, index) => (
                      <tr key={index}>
                        <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10 text-center">
                          {index + 1}
                        </td>
                        <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                          {item.nip || "-"}
                        </td>
                        <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                          {item.name}
                        </td>
                        <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm font-semibold">
                          {item.jabatan ? item.jabatan.nameJob : ""}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
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

export default PegawaiModal;
