
import store from "@/redux/store";
import BukuPetunjukGuest from "./Guest";

export default function BukuPetunjuk () {
  const { role } = store.getState().auth;

  return (
    <>
      <div className="md:pb-8 md:px-8 md:pt-4 pb-4 px-4 pt-6 grid grid-cols-1 gap-8">
        <h1 className="font-semibold md:text-xl text-base">Buku Petunjuk</h1>
        {!role ? (
          <BukuPetunjukGuest />
        ) : (
          <></>
        )}
      </div>
    </>
  )
}