import { Button, Modal, ModalBody, ModalContent } from "@heroui/react";

interface props {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  handleSubmit: () => void;
}

const ConfirmModal = ({ isOpen, isLoading, onClose, handleSubmit }: props) => {
  return (
    <>
      <Modal isOpen={isOpen} backdrop="blur" hideCloseButton size="md">
        <ModalContent>
          <ModalBody className="max-h-[72vh] overflow-y-auto overflow-y-custom py-8">
            <div className="flex flex-col gap-2 items-center">
              <br />
              <h1 className="font-bold text-xl">Anda yakin ingin menyimpan data ini ?</h1>
              <p className="text-center">Pastikan semua informasi sudah benar sebelum melanjutkan.</p>
              <br />
              <div className="flex items-center w-full gap-2">
                <Button
                  isLoading={isLoading}
                  onPress={onClose}
                  className="flex-1 bg-danger text-white font-semibold"
                  size="sm"
                  radius="sm"
                >
                  Batal
                </Button>
                <Button
                  isLoading={isLoading}
                  onPress={handleSubmit}
                  className="flex-1 border border-button-primary bg-transparent text-button-primary font-semibold"
                  size="sm"
                  radius="sm"
                >
                  Ya, Simpan Data
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmModal;
