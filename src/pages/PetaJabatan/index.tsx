import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { TitleCase } from "@/components/card/TitleCase";
import OrgChart from "@/components/home/PetaJabatan";

export default function HomePage() {
  return (
    <div>
      <BreadcrumbAdmin location="/Peta-Jabatan" />
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <TitleCase
          title="Peta Jabatan"
        />
        <OrgChart />
      </div>
    </div>
  );
}
