import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react";
import { LucideInfo } from "lucide-react";
import { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { LuTrash2, LuX } from "react-icons/lu";
import { TbFaceIdError } from "react-icons/tb";
import { Link } from "react-router-dom";
import DeleteModal from "../UtilsModal/DeleteModal";
import { useDeleteAssetHolder } from "@/services/asset/asset-holder";
import { ErrorToast, SuccessToast } from "@/utils/ToastMessage";

interface props {
  holder: {
    id: number;
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
  handleClose: () => void;
}

const ViewModal = ({ holder, isOpen, onClose, handleClose }: props) => {
  const [ selectedId, setSelectedId ] = useState<number | null>(null)

  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const { onOpen: onOpenDelete, onClose: onCloseDelete, isOpen: isOpenDelete } = useDisclosure();

  const { mutate: mutateDelete } = useDeleteAssetHolder();
  
  const handleDelete = () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      mutateDelete(
        { id: String(selectedId) },
        {
          onSuccess() {
            SuccessToast({ text: "Data berhasil dihapus" });
            setIsLoading(false);
            setSelectedId(null);
            onCloseDelete();
            onClose();
            handleClose()
          },
          onError(error) {
            setIsLoading(false);
            ErrorToast({
              text:
                error.response?.data.message ||
                "Terjadi kesalahan saat mengirim data",
            });
            throw error;
          },
        },
      );
    } catch (error) {
      ErrorToast({ text: "Terjadi kesalahan di server" });
      setIsLoading(false);
      throw error;
    }
  };

  return (
    <>
      <DeleteModal 
        isOpen={isOpenDelete} 
        isLoading={isLoading} 
        onClose={onCloseDelete} 
        handleSubmit={handleDelete}
      />
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="5xl">
        <ModalContent>
          <ModalHeader className="flex items-center justify-between">
            <span className="text-base font-semibold">
              Data Barang / Kendaraan
            </span>
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
                    <th className="text-left border-b-2 min-w-60 border-accent-gray p-2 text-sm bg-primary text-white">
                      Lampiran
                    </th>
                    <th className="text-left border-b-2 min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-tr-lg">
                      Aksi
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
                          {item.assetName || "-"}
                        </td>
                        <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                          {item.kategori === "PERALATAN"
                            ? "Peralatan Kantor / Mesin"
                            : "Kendaraan"}
                        </td>
                        <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                          {item.noBast || "-"}
                        </td>
                        <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                          {item.file ? (
                            <Link to={item.file} target="__blank">
                              <FaFileAlt className="text-button-primary" />
                            </Link>
                          ) : (
                            <LucideInfo className="text-danger" />
                          )}
                        </td>
                        <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm font-semibold text-left">
                          <Button
                            onPress={() => {
                              setSelectedId(item.id);
                              setTimeout(() => {
                                onOpenDelete();
                              }, 100);
                            }}
                            isIconOnly
                            radius="sm"
                            size="sm"
                            className="bg-alert-danger text-danger shadow-sm"
                          >
                            <LuTrash2 size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={9}
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
