import CustomChart from "@/components/Charts/Recharts";
import { Select, SelectItem } from "@heroui/react";

const PenilaianKinerjaLine = () => {
  return (
    <div className="p-6 grid grid-cols-1 gap-6 relative">
      <div className="flex sm:flex-row flex-col items-center justify-between gap-2">
        <h1 className="font-semibold">Hasil Kinerja Pegawai</h1>
        <Select
          aria-label="variabel-kualifikasi"
          variant="bordered"
          className="max-w-40"
          placeholder="Filter data"
        >
          <SelectItem>Hari Ini</SelectItem>
          <SelectItem>Minggu Ini</SelectItem>
          <SelectItem>Bulan Ini</SelectItem>
          <SelectItem>Tahun Ini</SelectItem>
        </Select>
      </div>
      <CustomChart
        type="line"
        data={[
          {
            data: "Jan",
            Kinerja: 400,
            Disiplin: 240,
            Loyalitas: 100,
            Kerjasama: 150,
            Attitude: 90,
          },
          {
            data: "Feb",
            Kinerja: 300,
            Disiplin: 139,
            Loyalitas: 90,
            Kerjasama: 110,
            Attitude: 80,
          },
          {
            data: "Mar",
            Kinerja: 200,
            Disiplin: 980,
            Loyalitas: 120,
            Kerjasama: 100,
            Attitude: 70,
          },
          {
            data: "Apr",
            Kinerja: 500,
            Disiplin: 220,
            Loyalitas: 130,
            Kerjasama: 160,
            Attitude: 100,
          },
          {
            data: "May",
            Kinerja: 450,
            Disiplin: 250,
            Loyalitas: 140,
            Kerjasama: 170,
            Attitude: 110,
          },
          {
            data: "Jun",
            Kinerja: 380,
            Disiplin: 270,
            Loyalitas: 150,
            Kerjasama: 180,
            Attitude: 120,
          },
          {
            data: "Jul",
            Kinerja: 470,
            Disiplin: 300,
            Loyalitas: 160,
            Kerjasama: 190,
            Attitude: 130,
          },
          {
            data: "Aug",
            Kinerja: 400,
            Disiplin: 310,
            Loyalitas: 170,
            Kerjasama: 200,
            Attitude: 140,
          },
          {
            data: "Sep",
            Kinerja: 350,
            Disiplin: 320,
            Loyalitas: 180,
            Kerjasama: 210,
            Attitude: 150,
          },
          {
            data: "Oct",
            Kinerja: 420,
            Disiplin: 330,
            Loyalitas: 190,
            Kerjasama: 220,
            Attitude: 160,
          },
          {
            data: "Nov",
            Kinerja: 460,
            Disiplin: 340,
            Loyalitas: 200,
            Kerjasama: 230,
            Attitude: 170,
          },
          {
            data: "Dec",
            Kinerja: 480,
            Disiplin: 350,
            Loyalitas: 210,
            Kerjasama: 240,
            Attitude: 180,
          },
        ]}
        dataKeys={["Kinerja", "Disiplin", "Loyalitas", "Kerjasama", "Attitude"]}
      />
    </div>
  );
};

const PenilaianKinerjaDougnhut = () => {
  return (
    <div className="p-6 grid grid-cols-1 gap-6 relative">
      <div className="flex sm:flex-row flex-col items-center justify-between gap-2">
        <h1 className="font-semibold">Variabel dan Kualifikasi</h1>
        <Select
          aria-label="variabel-kualifikasi"
          variant="bordered"
          className="max-w-40"
          placeholder="Filter data"
        >
          <SelectItem>Hari Ini</SelectItem>
          <SelectItem>Minggu Ini</SelectItem>
          <SelectItem>Bulan Ini</SelectItem>
          <SelectItem>Tahun Ini</SelectItem>
        </Select>
      </div>
      <CustomChart
        type="doughnut"
        dataKeys={["value"]}
        data={[
          { name: "Kinerja", value: 400 },
          { name: "Disiplin", value: 300 },
          { name: "Loyalitas", value: 300 },
          { name: "Kerjasama", value: 200 },
          { name: "Attitude", value: 200 },
        ]}
      />
    </div>
  );
};
export { PenilaianKinerjaLine, PenilaianKinerjaDougnhut };
