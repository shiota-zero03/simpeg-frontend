import CustomChart from "@/components/Charts/Recharts";
import { useGetAllPenilaianGrafikUser } from "@/services/penilaian";
import { useEffect, useMemo } from "react";
import { Commet } from "react-loading-indicators";

const PenilaianKinerjaLine = ({ id }: { id: string }) => {
  const { data, isFetching, refetch } = useGetAllPenilaianGrafikUser(
    id,
    String(new Date().getFullYear()),
  );

  const DATA_FETCHING = useMemo(() => {
    if (data) return data.data;
    return null;
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 gap-6 relative">
      {isFetching && (
        <div className="inset-0 flex items-center justify-center absolute z-10">
          <Commet color="#32cd32" size="medium" text="" textColor="" />
        </div>
      )}
      <div className="flex sm:flex-row flex-col items-center justify-between gap-2">
        <h1 className="font-semibold">Penilaian Pegawai Berdasarkan Bobot</h1>
      </div>
      <CustomChart
        type="line"
        data={[
          {
            data: "Jan",
            Kinerja: DATA_FETCHING?.bobot.performance[0] || 0,
            Disiplin: DATA_FETCHING?.bobot.discipline[0] || 0,
            Loyalitas: DATA_FETCHING?.bobot.loyalty[0] || 0,
            Kerjasama: DATA_FETCHING?.bobot.cooperation[0] || 0,
            Attitude: DATA_FETCHING?.bobot.attitude[0] || 0,
          },
          {
            data: "Feb",
            Kinerja: DATA_FETCHING?.bobot.performance[1] || 0,
            Disiplin: DATA_FETCHING?.bobot.discipline[1] || 0,
            Loyalitas: DATA_FETCHING?.bobot.loyalty[1] || 0,
            Kerjasama: DATA_FETCHING?.bobot.cooperation[1] || 0,
            Attitude: DATA_FETCHING?.bobot.attitude[1] || 0,
          },
          {
            data: "Mar",
            Kinerja: DATA_FETCHING?.bobot.performance[2] || 0,
            Disiplin: DATA_FETCHING?.bobot.discipline[2] || 0,
            Loyalitas: DATA_FETCHING?.bobot.loyalty[2] || 0,
            Kerjasama: DATA_FETCHING?.bobot.cooperation[2] || 0,
            Attitude: DATA_FETCHING?.bobot.attitude[2] || 0,
          },
          {
            data: "Apr",
            Kinerja: DATA_FETCHING?.bobot.performance[3] || 0,
            Disiplin: DATA_FETCHING?.bobot.discipline[3] || 0,
            Loyalitas: DATA_FETCHING?.bobot.loyalty[3] || 0,
            Kerjasama: DATA_FETCHING?.bobot.cooperation[3] || 0,
            Attitude: DATA_FETCHING?.bobot.attitude[3] || 0,
          },
          {
            data: "May",
            Kinerja: DATA_FETCHING?.bobot.performance[4] || 0,
            Disiplin: DATA_FETCHING?.bobot.discipline[4] || 0,
            Loyalitas: DATA_FETCHING?.bobot.loyalty[4] || 0,
            Kerjasama: DATA_FETCHING?.bobot.cooperation[4] || 0,
            Attitude: DATA_FETCHING?.bobot.attitude[4] || 0,
          },
          {
            data: "Jun",
            Kinerja: DATA_FETCHING?.bobot.performance[5] || 0,
            Disiplin: DATA_FETCHING?.bobot.discipline[5] || 0,
            Loyalitas: DATA_FETCHING?.bobot.loyalty[5] || 0,
            Kerjasama: DATA_FETCHING?.bobot.cooperation[5] || 0,
            Attitude: DATA_FETCHING?.bobot.attitude[5] || 0,
          },
          {
            data: "Jul",
            Kinerja: DATA_FETCHING?.bobot.performance[6] || 0,
            Disiplin: DATA_FETCHING?.bobot.discipline[6] || 0,
            Loyalitas: DATA_FETCHING?.bobot.loyalty[6] || 0,
            Kerjasama: DATA_FETCHING?.bobot.cooperation[6] || 0,
            Attitude: DATA_FETCHING?.bobot.attitude[6] || 0,
          },
          {
            data: "Aug",
            Kinerja: DATA_FETCHING?.bobot.performance[7] || 0,
            Disiplin: DATA_FETCHING?.bobot.discipline[7] || 0,
            Loyalitas: DATA_FETCHING?.bobot.loyalty[7] || 0,
            Kerjasama: DATA_FETCHING?.bobot.cooperation[7] || 0,
            Attitude: DATA_FETCHING?.bobot.attitude[7] || 0,
          },
          {
            data: "Sep",
            Kinerja: DATA_FETCHING?.bobot.performance[8] || 0,
            Disiplin: DATA_FETCHING?.bobot.discipline[8] || 0,
            Loyalitas: DATA_FETCHING?.bobot.loyalty[8] || 0,
            Kerjasama: DATA_FETCHING?.bobot.cooperation[8] || 0,
            Attitude: DATA_FETCHING?.bobot.attitude[8] || 0,
          },
          {
            data: "Oct",
            Kinerja: DATA_FETCHING?.bobot.performance[9] || 0,
            Disiplin: DATA_FETCHING?.bobot.discipline[9] || 0,
            Loyalitas: DATA_FETCHING?.bobot.loyalty[9] || 0,
            Kerjasama: DATA_FETCHING?.bobot.cooperation[9] || 0,
            Attitude: DATA_FETCHING?.bobot.attitude[9] || 0,
          },
          {
            data: "Nov",
            Kinerja: DATA_FETCHING?.bobot.performance[10] || 0,
            Disiplin: DATA_FETCHING?.bobot.discipline[10] || 0,
            Loyalitas: DATA_FETCHING?.bobot.loyalty[10] || 0,
            Kerjasama: DATA_FETCHING?.bobot.cooperation[10] || 0,
            Attitude: DATA_FETCHING?.bobot.attitude[10] || 0,
          },
          {
            data: "Dec",
            Kinerja: DATA_FETCHING?.bobot.performance[11] || 0,
            Disiplin: DATA_FETCHING?.bobot.discipline[11] || 0,
            Loyalitas: DATA_FETCHING?.bobot.loyalty[11] || 0,
            Kerjasama: DATA_FETCHING?.bobot.cooperation[11] || 0,
            Attitude: DATA_FETCHING?.bobot.attitude[11] || 0,
          },
        ]}
        dataKeys={["Kinerja", "Disiplin", "Loyalitas", "Kerjasama", "Attitude"]}
      />
    </div>
  );
};

const PenilaianKinerjaDougnhut = ({ id }: { id: string }) => {
  const { data, isFetching, refetch } = useGetAllPenilaianGrafikUser(
    id,
    String(new Date().getFullYear()),
  );

  const DATA_FETCHING = useMemo(() => {
    if (data) return data.data;
    return null;
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);
  return (
    <div className="p-6 grid grid-cols-1 gap-6 relative">
      {isFetching && (
        <div className="inset-0 flex items-center justify-center absolute z-10">
          <Commet color="#32cd32" size="medium" text="" textColor="" />
        </div>
      )}
      <div className="flex sm:flex-row flex-col items-center justify-between gap-2">
        <h1 className="font-semibold">Penilaian Pegawai Berdasarkan Nilai</h1>
      </div>
      <CustomChart
        type="doughnut"
        dataKeys={["value"]}
        data={[
          {
            name: "Kinerja",
            value:
              DATA_FETCHING?.nilai.performance.reduce(
                (sum, val) => sum + val,
                0,
              ) || 0,
          },
          {
            name: "Disiplin",
            value:
              DATA_FETCHING?.nilai.discipline.reduce(
                (sum, val) => sum + val,
                0,
              ) || 0,
          },
          {
            name: "Loyalitas",
            value:
              DATA_FETCHING?.nilai.loyalty.reduce((sum, val) => sum + val, 0) ||
              0,
          },
          {
            name: "Kerjasama",
            value:
              DATA_FETCHING?.nilai.cooperation.reduce(
                (sum, val) => sum + val,
                0,
              ) || 0,
          },
          {
            name: "Attitude",
            value:
              DATA_FETCHING?.nilai.attitude.reduce(
                (sum, val) => sum + val,
                0,
              ) || 0,
          },
        ]}
      />
    </div>
  );
};
export { PenilaianKinerjaLine, PenilaianKinerjaDougnhut };
