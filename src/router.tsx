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

const Profile = lazy(() => import("@/pages/Profile"));
const EditProfile = lazy(() => import("@/pages/Profile/EditProfile"));
const Jabatan = lazy(() => import("@/pages/Jabatan"));
const ExportExcelJabatan = lazy(
  () => import("@/pages/export/excel/JabatanExport"),
);
const Unit = lazy(() => import("@/pages/Unit"));
const Pegawai = lazy(() => import("@/pages/Pegawai"));
const CreatePegawai = lazy(() => import("@/pages/Pegawai/Created"));
const ViewPegawai = lazy(() => import("@/pages/Pegawai/Detail"));
const UpdatePegawai = lazy(() => import("@/pages/Pegawai/Updated"));
const ExportExcelPegawai = lazy(
  () => import("@/pages/export/excel/PegawaiExport"),
);
const CreatePelaporan = lazy(() => import("@/pages/Pegawai/CreatePelaporan"));
const UpdatePelaporan = lazy(() => import("@/pages/Pegawai/UpdatePelaporan"));
const DetailPelaporan = lazy(() => import("@/pages/Pegawai/DetailPelaporan"));
const ExportPelaporan = lazy(() => import("@/pages/Pegawai/ExportPelaporan"));
const Summary = lazy(() => import("@/pages/Summary"));
const News = lazy(() => import("@/pages/News"));
const NewsCreated = lazy(() => import("@/pages/News/Created"));
const NewsUpdated = lazy(() => import("@/pages/News/Updated"));
const Galeri = lazy(() => import("@/pages/Galeri"));
const GaleriCreated = lazy(() => import("@/pages/Galeri/Created"));
const GaleriUpdated = lazy(() => import("@/pages/Galeri/Updated"));
const SPPD = lazy(() => import("@/pages/SPPD"));
const CreateSPPD = lazy(() => import("@/pages/SPPD/Create"));
const UpdateSPPD = lazy(() => import("@/pages/SPPD/Updated"));
const ExportSPPD = lazy(() => import("@/pages/SPPD/ExportPDF"));
const ExportExcelSPPD = lazy(() => import("@/pages/export/excel/SPPDExport"));
const CreatePelaporanSPPD = lazy(() => import("@/pages/SPPD/CreatePelaporan"));
const UpdatePelaporanSPPD = lazy(() => import("@/pages/SPPD/UpdatePelaporan"));
const DetailPelaporanSPPD = lazy(() => import("@/pages/SPPD/DetailPelaporan"));
const ExportPelaporanSPPD = lazy(() => import("@/pages/SPPD/ExportPelaporan"));
const EFilling = lazy(() => import("@/pages/E-FIlling"));

const PenilaianKinerja = lazy(() => import("@/pages/PenilaianKinerja"));
const ViewPenilaianKinerja = lazy(
  () => import("@/pages/PenilaianKinerja/View"),
);
const ExportPenilaian = lazy(
  () => import("@/pages/PenilaianKinerja/ExportPDF"),
);
const IKP = lazy(() => import("@/pages/IKP"));
const TambahIKP = lazy(() => import("@/pages/IKP/Tambah"));
const DetailIKP = lazy(() => import("@/pages/IKP/Detail"));
const ExportIKP = lazy(() => import("@/pages/IKP/ExportPDF"));

const ExportPDFSummary = lazy(() => import("@/pages/Summary/SummaryExport"));
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
const HasilPemeriksaan = lazy(() => import("@/pages/Surat/HasilPemeriksaan"));
const CreateHasilPemeriksaan = lazy(
  () => import("@/pages/Surat/HasilPemeriksaan/Created"),
);
const ViewHasilPemeriksaan = lazy(
  () => import("@/pages/Surat/HasilPemeriksaan/Detail"),
);
const ExportHasilPemeriksaan = lazy(
  () => import("@/pages/Surat/HasilPemeriksaan/Export"),
);
const Keputusan = lazy(() => import("@/pages/Surat/Keputusan"));
const CreateKeputusan = lazy(() => import("@/pages/Surat/Keputusan/Created"));
const ViewKeputusan = lazy(() => import("@/pages/Surat/Keputusan/Detail"));
const ExportKeputusan = lazy(() => import("@/pages/Surat/Keputusan/Export"));

const Disposisi = lazy(() => import("@/pages/E-Disposisi"));
const ViewDisposisi = lazy(() => import("@/pages/E-Disposisi/DetailData"));
const VerifyDisposisi = lazy(() => import("@/pages/E-Disposisi/Verifikasi"));

const Asset = lazy(() => import("@/pages/Asset"));
const AssetCreated = lazy(() => import("@/pages/Asset/Asset/Created"));
const AssetUpdated = lazy(() => import("@/pages/Asset/Asset/Updated"));
const AssetHolderCreated = lazy(() => import("@/pages/Asset/Pemegang/Created"));
const AssetServiceCreated = lazy(
  () => import("@/pages/Asset/ServisPajakData/Created"),
);
const AssetServiceUpdated = lazy(
  () => import("@/pages/Asset/ServisPajakData/Updated"),
);

export default function Router() {
  return (
    <Suspense fallback={<LoaderPage />}>
      <ScrollToTop />
      <Routes>
        <Route
          path="/healthz"
          element={<div>{JSON.stringify({ status: "oke" })}</div>}
        />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/berita/:id" element={<DetailBerita />} />
          <Route path="/buku-petunjuk" element={<BukuPetunjuk />} />
          <Route path="/peta-jabatan" element={<PetaJabatan />} />
          <Route path="/hubungi-kami" element={<HubungiKami />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/position" element={<Jabatan />} />
          <Route path="/unit" element={<Unit />} />
          <Route path="/pegawai" element={<Pegawai />} />
          <Route path="/pegawai/tambah-data" element={<CreatePegawai />} />
          <Route path="/pegawai/edit-data/:id" element={<UpdatePegawai />} />
          <Route path="/pegawai/detail-data/:id" element={<ViewPegawai />} />

          <Route
            path="/pegawai/tambah-pelaporan"
            element={<CreatePelaporan />}
          />
          <Route
            path="/pegawai/edit-pelaporan/:id"
            element={<UpdatePelaporan />}
          />
          <Route
            path="/pegawai/detail-pelaporan/:id"
            element={<DetailPelaporan />}
          />

          <Route
            path="/sppd/tambah-pelaporan"
            element={<CreatePelaporanSPPD />}
          />
          <Route
            path="/sppd/edit-pelaporan/:id"
            element={<UpdatePelaporanSPPD />}
          />
          <Route
            path="/sppd/detail-pelaporan/:id"
            element={<DetailPelaporanSPPD />}
          />

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
          <Route path="/sppd/tambah-data" element={<CreateSPPD />} />
          <Route path="/sppd/update-data/:id" element={<UpdateSPPD />} />

          <Route path="/manajemen-aset" element={<Asset />} />
          <Route
            path="/manajemen-aset/tambah-aset"
            element={<AssetCreated />}
          />
          <Route
            path="/manajemen-aset/edit-aset/:id"
            element={<AssetUpdated />}
          />
          <Route
            path="/manajemen-aset/tambah-pemegang-aset"
            element={<AssetHolderCreated />}
          />

          <Route
            path="/manajemen-aset/tambah-service"
            element={<AssetServiceCreated />}
          />
          <Route
            path="/manajemen-aset/edit-service/:id"
            element={<AssetServiceUpdated />}
          />

          <Route path="/dialog-kinerja" element={<IKP />} />
          <Route path="/dialog-kinerja/tambah-data" element={<TambahIKP />} />
          <Route
            path="/dialog-kinerja/detail-data/:type/:id"
            element={<DetailIKP />}
          />
          <Route path="/e-filling" element={<EFilling />} />
          <Route path="/penilaian-kinerja" element={<PenilaianKinerja />} />
          <Route
            path="/penilaian-kinerja/detail-data/:id"
            element={<ViewPenilaianKinerja />}
          />

          <Route path="/e-disposisi" element={<Disposisi />} />
          <Route
            path="/e-disposisi/verifikasi-data/:id"
            element={<VerifyDisposisi />}
          />
          <Route
            path="/e-disposisi/detail-data/:id"
            element={<ViewDisposisi />}
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

          <Route
            path="/laporan-hasil-pemeriksaan"
            element={<HasilPemeriksaan />}
          />
          <Route
            path="/laporan-hasil-pemeriksaan/tambah-data"
            element={<CreateHasilPemeriksaan />}
          />
          <Route
            path="/laporan-hasil-pemeriksaan/detail-data/:id"
            element={<ViewHasilPemeriksaan />}
          />

          <Route path="/keputusan-hukuman-disiplin" element={<Keputusan />} />
          <Route
            path="/keputusan-hukuman-disiplin/tambah-data"
            element={<CreateKeputusan />}
          />
          <Route
            path="/keputusan-hukuman-disiplin/detail-data/:id"
            element={<ViewKeputusan />}
          />
        </Route>

        {/* export */}
        <Route
          path="/summary-report/export/excel"
          element={<ExportExcelSummary />}
        />
        <Route path="/pegawai/export-data" element={<ExportExcelPegawai />} />
        <Route path="/jabatan/export-data" element={<ExportExcelJabatan />} />
        <Route path="/sppd/export-data" element={<ExportExcelSPPD />} />

        <Route
          path="/summary-report/export/pdf"
          element={<ExportPDFSummary />}
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
        <Route
          path="/laporan-hasil-pemeriksaan/export-data/:id"
          element={<ExportHasilPemeriksaan />}
        />
        <Route
          path="/keputusan-hukuman-disiplin/export-data/:id"
          element={<ExportKeputusan />}
        />

        <Route path="/dialog-kinerja/export-pdf/:id" element={<ExportIKP />} />
        <Route
          path="/penilaian-kinerja/export-pdf/:id"
          element={<ExportPenilaian />}
        />
        <Route path="/sppd/export-pdf/:id" element={<ExportSPPD />} />

        <Route
          path="/pegawai/export-pelaporan/:id"
          element={<ExportPelaporan />}
        />
        <Route
          path="/sppd/export-pelaporan/:id"
          element={<ExportPelaporanSPPD />}
        />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
}
