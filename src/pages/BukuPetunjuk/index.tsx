import store from "@/redux/store";
import BukuPetunjukGuest from "./Guest";
import BukuPetunjukAdmin from "./Admin";
import { TitleCase } from "@/components/card/TitleCase";

export default function BukuPetunjuk() {
  const { role } = store.getState().auth;

  return (
    <>
      <div className="md:pb-8 md:px-8 md:pt-4 pb-4 px-4 pt-6 grid grid-cols-1 gap-8">
        <TitleCase
          title="Buku Petunjuk"
          text={
            !role || role === "PEGAWAI"
              ? ""
              : "Berikut ini mengelola Buku Petunjuk penggunaan Aplikasi"
          }
        />
        {!role || role === "PEGAWAI" ? (
          <BukuPetunjukGuest />
        ) : (
          <BukuPetunjukAdmin />
        )}
      </div>
    </>
  );
}
