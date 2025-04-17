import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoaderPage from "./components/loader/LoaderPage";
import ScrollToTop from "./utils/ScrollToTop";

const Layout = lazy(() => import("@/components/layout"));

const Login = lazy(() => import("@/pages/auth/Login"));
const Home = lazy(() => import("@/pages/home"));
const PetaJabatan = lazy(() => import("@/pages/PetaJabatan"));
const Berita = lazy(() => import("@/pages/Berita"));
const DetailBerita = lazy(() => import("@/pages/Berita/Detail"));
const BukuPetunjuk = lazy(() => import("@/pages/BukuPetunjuk"));
const HubungiKami = lazy(() => import("@/pages/HubungiKami"));

const Jabatan = lazy(() => import("@/pages/Jabatan"));
const Unit = lazy(() => import("@/pages/Unit"));
const Pegawai = lazy(() => import("@/pages/Pegawai"));
const CreatePegawai = lazy(() => import("@/pages/Pegawai/Created"));
const ViewPegawai = lazy(() => import("@/pages/Pegawai/Detail"));
const UpdatePegawai = lazy(() => import("@/pages/Pegawai/Updated"));
const Summary = lazy(() => import("@/pages/Summary"));
const News = lazy(() => import("@/pages/News"));
const NewsCreated = lazy(() => import("@/pages/News/Created"));
const NewsUpdated = lazy(() => import("@/pages/News/Updated"));
const Galeri = lazy(() => import("@/pages/Galeri"));
const GaleriCreated = lazy(() => import("@/pages/Galeri/Created"));
const GaleriUpdated = lazy(() => import("@/pages/Galeri/Updated"));
const SPPD = lazy(() => import("@/pages/SPPD"));
const EFilling = lazy(() => import("@/pages/E-FIlling"));
const BobotKinerja = lazy(() => import("@/pages/PenilaianKinerja/Bobot"));
const ViewBobotKinerja = lazy(
  () => import("@/pages/PenilaianKinerja/Bobot/View"),
);
const NilaiKinerja = lazy(() => import("@/pages/PenilaianKinerja/Nilai"));
const ViewNilaiKinerja = lazy(
  () => import("@/pages/PenilaianKinerja/Nilai/View"),
);
const IKP = lazy(() => import("@/pages/IKP"));

const ExportPDFSummary = lazy(() => import("@/pages/export/pdf/SummaryPdf"));

const Error404 = lazy(() => import("@/pages/Errors/Error404"));

export default function Router() {
  return (
    <Suspense fallback={<LoaderPage />}>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/berita/:id" element={<DetailBerita />} />
          <Route path="/buku-petunjuk" element={<BukuPetunjuk />} />
          <Route path="/peta-jabatan" element={<PetaJabatan />} />
          <Route path="/hubungi-kami" element={<HubungiKami />} />

          <Route path="/position" element={<Jabatan />} />
          <Route path="/unit" element={<Unit />} />
          <Route path="/pegawai" element={<Pegawai />} />
          <Route path="/pegawai/tambah-data" element={<CreatePegawai />} />
          <Route path="/pegawai/edit-data/:id" element={<UpdatePegawai />} />
          <Route path="/pegawai/detail-data/:id" element={<ViewPegawai />} />
          <Route path="/summary-report" element={<Summary />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/tambah-data" element={<NewsCreated />} />
          <Route path="/news/edit-data/:id" element={<NewsUpdated />} />
          <Route path="/galeri-dokumentasi" element={<Galeri />} />
          <Route
            path="/galeri-dokumentasi/tambah-data"
            element={<GaleriCreated />}
          />
          <Route
            path="/galeri-dokumentasi/edit-data/:id"
            element={<GaleriUpdated />}
          />
          <Route path="/sppd" element={<SPPD />} />
          <Route path="/dialog-kinerja" element={<IKP />} />
          <Route path="/e-filling" element={<EFilling />} />
          <Route
            path="/penilaian-kinerja/berdasarkan-bobot"
            element={<BobotKinerja />}
          />
          <Route
            path="/penilaian-kinerja/berdasarkan-bobot/detail-data/:id"
            element={<ViewBobotKinerja />}
          />
          <Route
            path="/penilaian-kinerja/berdasarkan-nilai"
            element={<NilaiKinerja />}
          />
          <Route
            path="/penilaian-kinerja/berdasarkan-nilai/detail-data/:id"
            element={<ViewNilaiKinerja />}
          />
        </Route>
        <Route
          path="/summary-report/export/pdf"
          element={<ExportPDFSummary />}
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
}
