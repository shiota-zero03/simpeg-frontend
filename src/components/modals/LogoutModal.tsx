import { useAppDispatch } from "@/redux/hooks";
import { clearAuthTokens } from "@/redux/slices/auth.slice";
import { SuccessToast } from "@/utils/ToastMessage";
import { Button, Modal, ModalBody, ModalContent } from "@heroui/react";
import { useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface props {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal = ({ isOpen, onClose }: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (isLoading) return; // Cegah pemanggilan ganda

    setIsLoading(true);

    const redirectPath = "/login";
    SuccessToast({ text: "Anda berhasil logout" });
    setIsLoading(false);
    dispatch(clearAuthTokens());
    navigate(redirectPath);
  };

  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="md">
        <ModalContent>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom py-8">
            <div className="flex flex-col gap-2 items-center">
              <FaPowerOff className="text-danger" size={80} />
              <br />
              <h1 className="font-bold text-xl">Anda yakin ingin keluar ?</h1>
              <p className="text-center">
                Jika Anda keluar, Anda harus login kembali untuk mengakses
                halaman ini.
              </p>
              <br />
              <div className="flex items-center w-full gap-2">
                <Button
                  isLoading={isLoading}
                  onPress={onClose}
                  className="flex-1 bg-primary text-white font-semibold"
                  size="sm"
                  radius="sm"
                >
                  Batal
                </Button>
                <Button
                  isLoading={isLoading}
                  onPress={handleSubmit}
                  className="flex-1 border border-danger bg-transparent text-danger font-semibold"
                  size="sm"
                  radius="sm"
                >
                  Ya, Keluar
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LogoutModal;
