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

const PenilaianKinerja = lazy(() => import("@/pages/PenilaianKinerja"));
const ViewPenilaianKinerja = lazy(
  () => import("@/pages/PenilaianKinerja/View"),
);
const IKP = lazy(() => import("@/pages/IKP"));
const TambahIKP = lazy(() => import("@/pages/IKP/Tambah"));

const ExportPDFSummary = lazy(() => import("@/pages/export/pdf/SummaryPdf"));
const ExportExcelSummary = lazy(
  () => import("@/pages/export/excel/SummaryExcel"),
);

const Error404 = lazy(() => import("@/pages/Errors/Error404"));

const SuratPemeriksaan = lazy(() => import("@/pages/Surat/Pemeriksaan"));
const CreateSuratPemeriksaan = lazy(
  () => import("@/pages/Surat/Pemeriksaan/Created"),
);
const ViewSuratPemeriksaan = lazy(
  () => import("@/pages/Surat/Pemeriksaan/Detail"),
);
const ExportSuratPemeriksaan = lazy(
  () => import("@/pages/Surat/Pemeriksaan/Export"),
);
const SuratPemanggilan = lazy(() => import("@/pages/Surat/Pemanggilan"));
const CreateSuratPemanggilan = lazy(
  () => import("@/pages/Surat/Pemanggilan/Created"),
);
const ViewSuratPemanggilan = lazy(
  () => import("@/pages/Surat/Pemanggilan/Detail"),
);
const ExportSuratPemanggilan = lazy(
  () => import("@/pages/Surat/Pemanggilan/Export"),
);

const BeritaAcaraPermintaanKeterangan = lazy(
  () => import("@/pages/Surat/BeritaAcaraPermintaanKeterangan"),
);
const CreateBeritaAcaraPermintaanKeterangan = lazy(
  () => import("@/pages/Surat/BeritaAcaraPermintaanKeterangan/Created"),
);
const ViewBeritaAcaraPermintaanKeterangan = lazy(
  () => import("@/pages/Surat/BeritaAcaraPermintaanKeterangan/Detail"),
);
const ExportBeritaAcaraPermintaanKeterangan = lazy(
  () => import("@/pages/Surat/BeritaAcaraPermintaanKeterangan/Export"),
);

const BeritaAcaraPemeriksaan = lazy(
  () => import("@/pages/Surat/BeritaAcaraPemeriksaan"),
);
const CreateBeritaAcaraPemeriksaan = lazy(
  () => import("@/pages/Surat/BeritaAcaraPemeriksaan/Created"),
);
const ViewBeritaAcaraPemeriksaan = lazy(
  () => import("@/pages/Surat/BeritaAcaraPemeriksaan/Detail"),
);
const ExportBeritaAcaraPemeriksaan = lazy(
  () => import("@/pages/Surat/BeritaAcaraPemeriksaan/Export"),
);

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
          <Route path="/dialog-kinerja/tambah-data" element={<TambahIKP />} />
          <Route path="/e-filling" element={<EFilling />} />
          <Route path="/penilaian-kinerja" element={<PenilaianKinerja />} />
          <Route
            path="/penilaian-kinerja/detail-data/:id"
            element={<ViewPenilaianKinerja />}
          />

          <Route
            path="/surat-perintah-pemeriksaan"
            element={<SuratPemeriksaan />}
          />
          <Route
            path="/surat-perintah-pemeriksaan/tambah-data"
            element={<CreateSuratPemeriksaan />}
          />
          <Route
            path="/surat-perintah-pemeriksaan/detail-data/:id"
            element={<ViewSuratPemeriksaan />}
          />

          <Route path="/surat-pemanggilan" element={<SuratPemanggilan />} />
          <Route
            path="/surat-pemanggilan/tambah-data"
            element={<CreateSuratPemanggilan />}
          />
          <Route
            path="/surat-pemanggilan/detail-data/:id"
            element={<ViewSuratPemanggilan />}
          />

          <Route
            path="/berita-acara-permintaan-keterangan"
            element={<BeritaAcaraPermintaanKeterangan />}
          />
          <Route
            path="/berita-acara-permintaan-keterangan/tambah-data"
            element={<CreateBeritaAcaraPermintaanKeterangan />}
          />
          <Route
            path="/berita-acara-permintaan-keterangan/detail-data/:id"
            element={<ViewBeritaAcaraPermintaanKeterangan />}
          />

          <Route
            path="/berita-acara-pemeriksaan"
            element={<BeritaAcaraPemeriksaan />}
          />
          <Route
            path="/berita-acara-pemeriksaan/tambah-data"
            element={<CreateBeritaAcaraPemeriksaan />}
          />
          <Route
            path="/berita-acara-pemeriksaan/detail-data/:id"
            element={<ViewBeritaAcaraPemeriksaan />}
          />
        </Route>

        {/* export */}
        <Route
          path="/summary-report/export/pdf"
          element={<ExportPDFSummary />}
        />
        <Route
          path="/summary-report/export/excel"
          element={<ExportExcelSummary />}
        />
        <Route
          path="/surat-perintah-pemeriksaan/export-data/:id"
          element={<ExportSuratPemeriksaan />}
        />
        <Route
          path="/surat-pemanggilan/export-data/:id"
          element={<ExportSuratPemanggilan />}
        />
        <Route
          path="/berita-acara-permintaan-keterangan/export-data/:id"
          element={<ExportBeritaAcaraPermintaanKeterangan />}
        />
        <Route
          path="/berita-acara-pemeriksaan/export-data/:id"
          element={<ExportBeritaAcaraPemeriksaan />}
        />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
}
