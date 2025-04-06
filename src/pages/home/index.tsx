import WaveDashboard from "@/assets/wave-dashboard.png";
import BeritaComponent from "@/components/home/BeritaComponent";
import GaleriComponent from "@/components/home/GaleriComponent";
import OrganizationStructureComponent from "@/components/home/OrganizationStructureComponent";

export default function Home() {
  return (
    <>
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="bg-[#137269] min-h-48 w-full lg:rounded-bl-[6rem] rounded-bl-[3rem] lg:rounded-tr-[6rem] rounded-tr-[3rem] lg:rounded-tl-3xl rounded-tl-[3rem] lg:rounded-br-3xl rounded-br-[3rem] flex justify-center flex-col overflow-hidden relative z-0">
          <img
            src={WaveDashboard}
            alt="wave-dashboard"
            loading="lazy"
            className="absolute right-0 top-0 w-52 z-0 md:block hidden"
          />
          <img
            src={WaveDashboard}
            alt="wave-dashboard"
            loading="lazy"
            className="absolute right-52 bottom-0 w-36 rounded-tr-[4rem] scale-y-[-1] z-0 lg:block hidden"
          />
          <div className="flex flex-col md:items-start items-center md:text-left text-center text-white lg:px-12 sm:px-10 px-2 gap-1.5 relative z-10">
            <p className="lg:text-sm text-xs font-light">
              Selamat Datang di Aplikasi
            </p>
            <h1 className="lg:text-3xl sm:text-2xl text-lg font-semibold my-1">
              Sistem Informasi Manajemen Pegawai Kabupaten Bekasi
            </h1>
            <p className="lg:text-sm text-xs font-light">
              Pengelolaan data pegawai, administrasi, dan layanan kepegawaian
              Dinas Perdagangan{" "}
            </p>
          </div>
        </div>
        <GaleriComponent />
        <BeritaComponent />
        <OrganizationStructureComponent />
      </div>
    </>
  );
}
