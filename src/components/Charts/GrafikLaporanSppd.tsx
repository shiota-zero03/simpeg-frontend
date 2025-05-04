import {
  VictoryBar,
  VictoryPie,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from "victory";
import { Card, CardBody, CardHeader } from "@heroui/react";

interface props {
  no: number;
  nama: string;
  norek: string;
  nosp: string;
  tgl: string;
  tujuan: string;
  uraian: string;
  transport: number;
  xtransport: number;
  jumlahtransport: number;
  representatif: number;
  xrepresentatif: number;
  jumlahrepresentatif: number;
  daily: number;
  xdaily: number;
  jumlahdaily: number;
  total: number;
  type: string;
  issame: boolean;
}

const getTop10Pegawai = (data: props[]) => {
  const pegawaiCount: { [key: string]: number } = {};

  data.forEach((item) => {
    const nama = item.nama || "-";
    pegawaiCount[nama] = pegawaiCount[nama] ? pegawaiCount[nama] + 1 : 1;
  });

  const topPegawai = Object.entries(pegawaiCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return topPegawai.map(([name, count]) => ({
    x: name,
    y: count,
  }));
};

const getPerbandinganTipe = (data: props[]) => {
  const typeMap: { [key: string]: number } = {};

  data.forEach((item) => {
    const type = item.type || "Tidak Diketahui";
    typeMap[type] = typeMap[type] ? typeMap[type] + 1 : 1;
  });

  return Object.entries(typeMap).map(([type, count]) => ({
    x: type,
    y: count,
  }));
};

const GrafikSPPD = ({ data }: { data: props[] }) => {
  const top10Pegawai = getTop10Pegawai(data);
  const perbandinganTipe = getPerbandinganTipe(data);

  return (
    <div className="grid grid-cols-1 gap-6 mt-6 px-2">
      <div>
        <Card shadow="sm" radius="sm">
          <CardHeader className="font-semibold text-12">
            Data Top 10 pegawai dengan perjalanan dinas terbanyak
          </CardHeader>
          <CardBody>
            <VictoryChart
              theme={VictoryTheme.material}
              height={120}
              padding={{ top: 10, bottom: 10, left: 32, right: 32 }}
              domainPadding={{ x: 10 }}
              containerComponent={
                <VictoryVoronoiContainer
                  labels={({ datum }) => `${datum.x}: ${datum.y} Perjalanan`}
                  labelComponent={
                    <VictoryTooltip
                      flyoutStyle={{
                        fill: "#ffffff",
                        stroke: "#1AB29E",
                        padding: 1,
                      }}
                      flyoutWidth={60}
                      flyoutHeight={12}
                      style={{
                        fontSize: 2.5,
                        fill: "#333",
                        wordWrap: "break-word",
                      }}
                      cornerRadius={2}
                      pointerLength={4}
                    />
                  }
                />
              }
            >
              <VictoryAxis
                style={{
                  axis: { stroke: "#1AB29E", strokeWidth: 2 },
                  tickLabels: {
                    fontSize: 3, // Ukuran font
                    textAnchor: "middle",
                  },
                }}
                tickLabelComponent={<VictoryLabel dy={-6} />}
                tickFormat={(t: string) =>
                  t.length > 8 ? `${t.substring(0, 10)}...` : t
                }
                // gridComponent={<></>}
              />
              <VictoryAxis
                dependentAxis
                domain={[
                  Math.min(...top10Pegawai.map((d) => d.y)) - 1,
                  Math.max(...top10Pegawai.map((d) => d.y)) + 2,
                ]}
                tickLabelComponent={<VictoryLabel dx={-2} />}
                style={{
                  axis: { stroke: "#1AB29E", strokeWidth: 1 },
                  tickLabels: { fontSize: 3, fill: "#756f6a" },
                }}
              />
              <VictoryBar
                barWidth={10}
                data={top10Pegawai}
                style={{ data: { fill: "#1AB29E", stroke: "#1AB29E" } }}
              />
            </VictoryChart>
          </CardBody>
        </Card>
      </div>
      <div>
        <Card shadow="sm" radius="sm">
          <CardHeader className="font-semibold text-12">
            Pegawai berdasarkan tipe perjalanan dinas
          </CardHeader>
          <CardBody className="pb-8">
            <VictoryPie
              data={perbandinganTipe}
              innerRadius={35}
              cornerRadius={5}
              labels={({ datum }) =>
                `${datum.x === "PERJALANAN_BIASA" ? "Perjalanan Dinas Biasa" : "Perjalanan Dinas Dalam Kota"} (${datum.y} Perjalanan)`
              }
              colorScale={["#33CEB7", "#137269"]}
              height={120} // Mengurangi tinggi grafik agar lebih kecil
              padding={{ top: 40, bottom: 40, left: 20, right: 20 }} // Menyesuaikan padding agar label tidak terpotong
              labelComponent={
                <VictoryLabel style={{ fontSize: 6, fill: "#333" }} />
              }
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default GrafikSPPD;
