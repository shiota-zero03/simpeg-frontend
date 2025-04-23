import store from "@/redux/store";
import HubungiKamiGuest from "./Guest";
import HubungikamiAdmin from "./Admin";
import { TitleCase } from "@/components/card/TitleCase";

export default function HubungiKami() {
  const { role } = store.getState().auth;

  return (
    <>
      <div className="md:pb-8 md:px-8 md:pt-4 pb-4 px-4 pt-6 grid grid-cols-1 gap-8">
        <TitleCase
          title="Hubungi Kami"
          text={
            !role
              ? ""
              : "Berikut ini mengelola Nomor Whatsapp untuk fitur Hubungi Kami"
          }
        />
        {!role || role !== "SUPERUSERS" ? (
          <HubungiKamiGuest />
        ) : (
          <HubungikamiAdmin />
        )}
      </div>
    </>
  );
}
