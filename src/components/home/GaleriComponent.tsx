import { GaleryDummy } from "@/constants/DummyData";
import { Button, Divider, Modal, ModalContent, ModalBody, Spinner } from "@heroui/react";
import { useMemo, useState } from "react";
import { LuRefreshCcw } from "react-icons/lu";
import { TbFaceIdError } from "react-icons/tb";

interface GaleryDataProps {
  image: string;
  title: string | null;
}

const GaleriComponent = () => {
  const [isFetchingGallery, setIsFetchingGallery] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const GaleriData: GaleryDataProps[] = useMemo(() => {
    return GaleryDummy.slice(0, 3).map((item) => ({
      image: item.image,
      title: item.title,
    }));
  }, [GaleryDummy]);

  const refetchGallery = () => {
    setIsFetchingGallery(true);
    setInterval(() => {
      setIsFetchingGallery(false);
    }, 500);
  };

  return (
    <div className="relative flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Divider
            orientation="horizontal"
            className="bg-accent-primary py-0.5 w-10 sm:block hidden"
          />
          <h1 className="font-semibold">Galeri dan Kegiatan</h1>
        </div>
        <Button
          variant="bordered"
          onPress={refetchGallery}
          endContent={<LuRefreshCcw />}
          className="border-accent-primary text-accent-primary"
          size="sm"
        >
          <span className="sm:block hidden">Lihat Lainnya</span>
        </Button>
      </div>

      <div>
        {GaleriData.length > 0 ? (
          <div className="grid sm:grid-cols-8 grid-cols-1 gap-3 grid-rows-2 md:max-h-96">
            {GaleriData.map((item, index) => 
                {
                    return index === 0 ? (
                        <div key={index} className="lg:col-span-6 sm:col-span-5 cursor-pointer row-span-2" onClick={() => setSelectedImage(GaleriData[0].image)}>
                            <div className="w-full overflow-hidden rounded-xl relative group h-full bg-black">
                            <div className="absolute bg-black/60 inset-0 hidden group-hover:flex items-center justify-center p-4 text-center duration-300 animate-appearance-in">
                                <h1 className="text-white font-semibold 2xl:text-4xl lg:text-2xl sm:text-base text-xs">
                                {item.title}
                                </h1>
                            </div>
                            <img
                                src={item.image}
                                alt="galeri-image"
                                className="object-cover object-center min-w-full min-h-full"
                            />
                            </div>
                        </div>
                    ) : (
                        <div key={index} className="lg:col-span-2 sm:col-span-3 grid grid-cols-1 gap-3 row-span-1">
                            <div className="sm:h-full sm:max-h-full max-h-40 overflow-hidden rounded-xl relative group cursor-pointer" onClick={() => setSelectedImage(GaleriData[2].image)}>
                            <div className="absolute bg-black/60 inset-0 hidden group-hover:flex items-center justify-center p-4 text-center duration-300 animate-appearance-in">
                                <h1 className="text-white font-semibold lg:text-sm text-xs">
                                {item.title}
                                </h1>
                            </div>
                            <img
                                src={item.image}
                                alt="galeri-image"
                                className="object-cover object-center min-w-full min-h-full"
                            />
                            </div>
                        </div>
                    )
                }
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col gap-2">
            <TbFaceIdError size={60} className="opacity-60" />
            <h1 className="font-medium italic opacity-60 text-sm">
              Tidak ada kegiatan atau galeri ditemukan
            </h1>
          </div>
        )}
      </div>

      {isFetchingGallery && (
        <div className="flex items-center justify-center inset-0 absolute bg-slate-50/10">
          <Spinner
            variant="wave"
            size="lg"
            classNames={{
              dots: "w-5 h-5",
              base: "w-full h-full",
              wrapper: "w-auto gap-2 h-auto",
            }}
          />
        </div>
      )}

      {/* Modal Gambar */}
      <Modal isOpen={!!selectedImage} onOpenChange={() => setSelectedImage(null)} size="full">
        <ModalContent className="flex items-center justify-center bg-black bg-opacity-90">
          <ModalBody className="flex items-center justify-center p-4">
            <img src={selectedImage ?? ""} alt="popup-image" className="max-w-full max-h-screen object-contain" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default GaleriComponent;
