import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoaderPage from "./components/loader/LoaderPage";

const Layout = lazy(() => import("@/components/layout"));

const Login = lazy(() => import("@/pages/auth/Login"));
const Home = lazy(() => import("@/pages/home"));
const Berita = lazy(() => import("@/pages/Berita"));
const DetailBerita = lazy(() => import("@/pages/Berita/Detail"));
const BukuPetunjuk = lazy(() => import("@/pages/BukuPetunjuk"));
const HubungiKami = lazy(() => import("@/pages/HubungiKami"));

export default function Router() {
  return (
    <Suspense fallback={<LoaderPage />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/berita/:slug" element={<DetailBerita />} />
          <Route path="/buku-petunjuk" element={<BukuPetunjuk />} />
          <Route path="/peta-jabatan" element={<Home />} />
          <Route path="/buku-petunjuk" element={<Home />} />
          <Route path="/customer-service" element={<Home />} />
          <Route path="/hubungi-kami" element={<HubungiKami />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
