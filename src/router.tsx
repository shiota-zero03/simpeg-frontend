import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoaderPage from "./components/loader/LoaderPage";
import ScrollToTop from "./utils/ScrollToTop";

const Layout = lazy(() => import("@/components/layout"));

const Login = lazy(() => import("@/pages/auth/Login"));
const Home = lazy(() => import("@/pages/home"));
const Berita = lazy(() => import("@/pages/Berita"));
const DetailBerita = lazy(() => import("@/pages/Berita/Detail"));
const BukuPetunjuk = lazy(() => import("@/pages/BukuPetunjuk"));
const HubungiKami = lazy(() => import("@/pages/HubungiKami"));

const Jabatan = lazy(() => import("@/pages/Jabatan"));
const News = lazy(() => import("@/pages/News"));
const NewsCreated = lazy(() => import("@/pages/News/Created"));
const NewsUpdated = lazy(() => import("@/pages/News/Updated"));
const SPPD = lazy(() => import("@/pages/SPPD"));
const BobotKinerja = lazy(() => import("@/pages/PenilaianKinerja/Bobot"));

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
          <Route path="/peta-jabatan" element={<Home />} />
          <Route path="/buku-petunjuk" element={<Home />} />
          <Route path="/customer-service" element={<Home />} />
          <Route path="/hubungi-kami" element={<HubungiKami />} />

          <Route path="/position" element={<Jabatan />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/tambah-data" element={<NewsCreated />} />
          <Route path="/news/edit-data/:id" element={<NewsUpdated />} />
          <Route path="/sppd" element={<SPPD />} />
          <Route
            path="/penilaian-kinerja/berdasarkan-bobot"
            element={<BobotKinerja />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}
