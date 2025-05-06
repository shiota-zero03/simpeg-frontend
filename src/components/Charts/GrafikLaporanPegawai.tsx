import { PegawaiRes } from "@/interface/responses/pegawai.interface";
import {
  VictoryBar,
  VictoryPie,
  VictoryChart,
  VictoryTheme,
  VictoryArea,
  VictoryAxis,
  VictoryLabel,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from "victory";
import {
  EselonData,
  GolonganData,
  pendidikanTerakhir,
} from "@/constants/DummyData"; // sesuaikan path
import { Card, CardBody, CardHeader } from "@heroui/react";
import { useGetAllUnitOption } from "@/services/unit";
import { useEffect, useMemo } from "react";

function countByField<T extends string>(
  data: PegawaiRes[],
  fieldSelector: (item: PegawaiRes) => T,
): { x: T; y: number }[] {
  const counts: Record<T, number> = {} as Record<T, number>;
  data.forEach((item) => {
    const key = fieldSelector(item);
    if (key in counts) {
      counts[key]++;
    } else {
      counts[key] = 1;
    }
  });
  return Object.entries(counts).map(([key, value]) => ({
    x: key as T,
    y: value as number,
  }));
}

function countFromDefinedKeys<T extends string>(
  data: PegawaiRes[],
  keys: { key: T; nama?: string; singkatan?: T }[],
  fieldSelector: (item: PegawaiRes) => T,
): { x: T; y: number }[] {
  return keys.map(({ singkatan, key }) => ({
    x: singkatan || key,
    y: data.filter((item) => fieldSelector(item) === key).length,
  }));
}

function countFromDefinedName<T extends string>(
  data: PegawaiRes[],
  keys: { nama: string }[],
  fieldSelector: (item: PegawaiRes) => T,
): { x: T; y: number }[] {
  return keys.map(({ nama }) => ({
    x: nama as T, // Assert that 'nama' is of type T
    y: data.filter((item) => fieldSelector(item) === nama).length,
  }));
}

function simplifyUnitName(name: string): string {
  const nameLower = name.toLowerCase();

  if (nameLower.includes("dinas")) {
    return "DINAS";
  }

  const uptdWilayahRegex = /wilayah\s*(ix|vi{1,3}|v|i{1,3})/i;
  const match = name.match(uptdWilayahRegex);
  if (match) {
    const wilayah = match[1].toUpperCase(); // ambil I, II, III, ...
    return `UPTD ${wilayah}`;
  }

  return name; // fallback pakai nama asli
}

const GrafikPegawai = ({ data }: { data: PegawaiRes[] }) => {
  const { data: dataUnit, refetch: refetchUnit } = useGetAllUnitOption();
  const DATA_FETCHING_UNIT = useMemo(() => {
    if (dataUnit && dataUnit.data) {
      const filteredUnits = dataUnit.data?.filter(
        (item) =>
          item.nameUnit.toLowerCase().includes("dinas") ||
          item.nameUnit.toLowerCase().includes("uptd"),
      );

      return [...filteredUnits].sort((a, b) => a.id - b.id); // ascending berdasarkan id
    } else {
      return null;
    }
  }, [dataUnit]);
  useEffect(() => {
    refetchUnit();
  }, []);

  const dataEselon = countFromDefinedName(
    data,
    EselonData,
    (d) => d.jabatan.eselon,
  );
  const dataGroup = countFromDefinedKeys(data, GolonganData, (d) => d.group); // fix: semua golongan
  const dataEducation = countFromDefinedKeys(
    data,
    pendidikanTerakhir,
    (d) => d.education,
  );
  const dataGender = countByField(data, (d) => d.gender);

  const dataAsn = useMemo(() => {
    if (!DATA_FETCHING_UNIT) return [];

    const filteredData = data.filter((pegawai) => pegawai.statusAsn === true);

    const simplifiedUnitNames = Array.from(
      new Set(
        DATA_FETCHING_UNIT.map((unit) => simplifyUnitName(unit.nameUnit)),
      ),
    ).map((name) => ({ nama: name }));

    return countFromDefinedName(filteredData, simplifiedUnitNames, (d) =>
      simplifyUnitName(d.jabatan.unit.nameUnit),
    );
  }, [DATA_FETCHING_UNIT, data]);
  const dataNonAsn = useMemo(() => {
    if (!DATA_FETCHING_UNIT) return [];

    const filteredData = data.filter((pegawai) => pegawai.statusAsn !== true);

    const simplifiedUnitNames = Array.from(
      new Set(
        DATA_FETCHING_UNIT.map((unit) => simplifyUnitName(unit.nameUnit)),
      ),
    ).map((name) => ({ nama: name }));
    return countFromDefinedName(filteredData, simplifiedUnitNames, (d) =>
      simplifyUnitName(d.jabatan.unit.nameUnit),
    );
  }, [DATA_FETCHING_UNIT, data]);

  const dataJabatanFungsional = useMemo(() => {
    const analisPerdagangan = data.filter(
      (it) =>
        it.jabatan?.nameJob.toLowerCase() === "analis perdagangan ahli madya" ||
        it.jabatan?.nameJob.toLowerCase() === "analis perdagangan ahli muda" ||
        it.jabatan?.nameJob.toLowerCase() === "analis perdagangan ahli pertama",
    );
    const pengawasPerdagangan = data.filter(
      (it) =>
        it.jabatan?.nameJob.toLowerCase() ===
          "pengawas perdagangan ahli madya" ||
        it.jabatan?.nameJob.toLowerCase() ===
          "pengawas perdagangan ahli muda" ||
        it.jabatan?.nameJob.toLowerCase() ===
          "pengawas perdagangan ahli pertama",
    );
    const penera = data.filter(
      (it) =>
        it.jabatan?.nameJob.toLowerCase() === "penera ahli madya" ||
        it.jabatan?.nameJob.toLowerCase() === "penera ahli muda" ||
        it.jabatan?.nameJob.toLowerCase() === "penera ahli pertama",
    );

    return [
      {
        x: "Analis Perdagangan",
        y: analisPerdagangan.length,
      },
      {
        x: "Pengawas Perdagangan",
        y: pengawasPerdagangan.length,
      },
      {
        x: "Penera",
        y: penera.length,
      },
    ];
  }, [data]);

  return (
    <div className="grid grid-cols-1 gap-6 mt-6 px-2">
      <div>
        <Card shadow="sm" radius="sm">
          <CardHeader className="font-semibold text-12">Pegawai ASN</CardHeader>
          <CardBody>
            <VictoryChart
              // domainPadding={{ x: 10 }}
              theme={VictoryTheme.material}
              height={120}
              padding={{ top: 10, bottom: 10, left: 32, right: 32 }}
              containerComponent={
                <VictoryVoronoiContainer
                  labels={({ datum }) => `${datum.x}: ${datum.y}`}
                  labelComponent={
                    <VictoryTooltip
                      flyoutStyle={{
                        fill: "#ffffff",
                        stroke: "#31D8FF",
                        padding: 1,
                      }}
                      flyoutWidth={40}
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
                  axis: { stroke: "#31D8FF", strokeWidth: 2 },
                  tickLabels: {
                    fontSize: 2.7,
                    // angle: -15,
                    // textAnchor: "start",
                    // top: -5,
                  },
                }}
                tickLabelComponent={<VictoryLabel dy={-6} />}
                // gridComponent={<></>}
              />
              <VictoryAxis
                dependentAxis
                domain={[0, Math.max(...dataAsn.map((d) => d.y)) + 10]}
                tickLabelComponent={<VictoryLabel dx={6} />}
                style={{
                  axis: { stroke: "#31D8FF", strokeWidth: 1 },
                  tickLabels: { fontSize: 3, fill: "#756f6a" },
                }}
              />
              <VictoryArea
                data={dataAsn}
                style={{ data: { fill: "#16B1FFB2", stroke: "#31D8FF" } }}
              />
            </VictoryChart>
          </CardBody>
        </Card>
      </div>
      <div>
        <Card shadow="sm" radius="sm">
          <CardHeader className="font-semibold text-12">
            Pegawai Non-ASN
          </CardHeader>
          <CardBody>
            <VictoryChart
              // domainPadding={{ x: 10 }}
              theme={VictoryTheme.material}
              height={120}
              padding={{ top: 10, bottom: 10, left: 32, right: 32 }}
              containerComponent={
                <VictoryVoronoiContainer
                  labels={({ datum }) => `${datum.x}: ${datum.y}`}
                  labelComponent={
                    <VictoryTooltip
                      flyoutStyle={{
                        fill: "#ffffff",
                        stroke: "#1AB29E",
                        padding: 1,
                      }}
                      flyoutWidth={40}
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
                    fontSize: 2.7,
                    // angle: -15,
                    // textAnchor: "start",
                    // top: -5,
                  },
                }}
                tickLabelComponent={<VictoryLabel dy={-6} />}
                // gridComponent={<></>}
              />
              <VictoryAxis
                dependentAxis
                domain={[0, Math.max(...dataNonAsn.map((d) => d.y)) + 10]}
                tickLabelComponent={<VictoryLabel dx={6} />}
                style={{
                  axis: { stroke: "#1AB29E", strokeWidth: 1 },
                  tickLabels: { fontSize: 3, fill: "#756f6a" },
                }}
              />
              <VictoryBar
                data={dataNonAsn}
                style={{ data: { fill: "#1AB29E", stroke: "#1AB29E" } }}
              />
            </VictoryChart>
          </CardBody>
        </Card>
      </div>
      <div className="print:break-after-page">
        <Card shadow="sm" radius="sm">
          <CardHeader className="font-semibold text-12">
            Pegawai Berdasarkan Eselon
          </CardHeader>
          <CardBody>
            <VictoryChart
              // domainPadding={{ x: 10 }}
              theme={VictoryTheme.material}
              height={120}
              padding={{ top: 10, bottom: 10, left: 32, right: 32 }}
              containerComponent={
                <VictoryVoronoiContainer
                  labels={({ datum }) => `${datum.x}: ${datum.y}`}
                  labelComponent={
                    <VictoryTooltip
                      flyoutStyle={{
                        fill: "#ffffff",
                        stroke: "#128F82",
                        padding: 1,
                      }}
                      flyoutWidth={40}
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
                  axis: { stroke: "#128F82", strokeWidth: 2 },
                  tickLabels: {
                    fontSize: 2.7,
                    // angle: -15,
                    // textAnchor: "start",
                    // top: -5,
                  },
                }}
                tickLabelComponent={<VictoryLabel dy={-6} />}
                // gridComponent={<></>}
              />
              <VictoryAxis
                dependentAxis
                domain={[0, Math.max(...dataEselon.map((d) => d.y)) + 10]}
                tickLabelComponent={<VictoryLabel dx={6} />}
                style={{
                  axis: { stroke: "#128F82", strokeWidth: 1 },
                  tickLabels: { fontSize: 3, fill: "#756f6a" },
                }}
              />
              <VictoryArea
                data={dataEselon}
                interpolation="natural"
                style={{ data: { fill: "#9DF2E0", stroke: "#128F82" } }}
              />
            </VictoryChart>
          </CardBody>
        </Card>
      </div>
      <br />
      <div>
        <Card shadow="sm" radius="sm">
          <CardHeader className="font-semibold text-12">
            Pegawai Berdasarkan Golongan
          </CardHeader>
          <CardBody>
            <VictoryChart
              // domainPadding={{ x: 10 }}
              theme={VictoryTheme.material}
              height={120}
              padding={{ top: 10, bottom: 10, left: 32, right: 32 }}
              containerComponent={
                <VictoryVoronoiContainer
                  labels={({ datum }) => `${datum.x}: ${datum.y}`}
                  labelComponent={
                    <VictoryTooltip
                      flyoutStyle={{
                        fill: "#ffffff",
                        stroke: "#128F82",
                        padding: 1,
                      }}
                      flyoutWidth={40}
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
                  axis: { stroke: "#128F82", strokeWidth: 2 },
                  tickLabels: {
                    fontSize: 2.7,
                    // angle: -15,
                    // textAnchor: "start",
                    // top: -5,
                  },
                }}
                tickLabelComponent={<VictoryLabel dy={-6} />}
                // gridComponent={<></>}
              />
              <VictoryAxis
                dependentAxis
                domain={[
                  Math.min(...dataGroup.map((d) => d.y)) - 2,
                  Math.max(...dataGroup.map((d) => d.y)) + 10,
                ]}
                tickLabelComponent={<VictoryLabel dx={6} />}
                style={{
                  axis: { stroke: "#128F82", strokeWidth: 1 },
                  tickLabels: { fontSize: 3, fill: "#756f6a" },
                }}
              />
              <VictoryArea
                data={dataGroup}
                interpolation={"natural"}
                style={{ data: { fill: "transparent", stroke: "#128F82" } }}
              />
            </VictoryChart>
          </CardBody>
        </Card>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        <Card shadow="sm" radius="sm">
          <CardHeader className="font-semibold text-12">
            Pegawai Berdasarkan Jabatan Fungsional
          </CardHeader>
          <CardBody className="pb-8">
            <VictoryChart
              domainPadding={{ x: 32 }}
              theme={VictoryTheme.material}
              height={120}
              padding={{ top: 10, bottom: 10, left: 32, right: 32 }}
              containerComponent={
                <VictoryVoronoiContainer
                  labels={({ datum }) => `${datum.x}: ${datum.y}`}
                  labelComponent={
                    <VictoryTooltip
                      flyoutStyle={{
                        fill: "#ffffff",
                        stroke: "#128F82",
                        padding: 1,
                      }}
                      flyoutWidth={40}
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
                  axis: { stroke: "#128F82", strokeWidth: 2 },
                  tickLabels: {
                    fontSize: 5,
                    angle: 0,
                    textAnchor: "start",
                  },
                }}
                tickLabelComponent={<VictoryLabel dy={-6} dx={4} />}
                // gridComponent={<></>}
              />
              <VictoryAxis
                dependentAxis
                domain={[
                  0,
                  Math.max(...dataJabatanFungsional.map((d) => d.y)) + 10,
                ]}
                tickLabelComponent={<VictoryLabel dx={6} />}
                style={{
                  axis: { stroke: "#128F82", strokeWidth: 1 },
                  tickLabels: { fontSize: 3, fill: "#756f6a" },
                }}
              />
              <VictoryBar
                data={dataJabatanFungsional}
                style={{
                  data: {
                    fill: ({ index }) => {
                      const colors = ["#7BDFF2", "#137269", "33CEB7"];
                      const safeIndex = typeof index === "number" ? index : 0;
                      return colors[safeIndex % colors.length];
                    },
                    stroke: "#128F82",
                  },
                }}
              />
            </VictoryChart>
          </CardBody>
        </Card>
        <Card shadow="sm" radius="sm">
          <CardHeader className="font-semibold text-12">
            Pegawai Berdasarkan Jenis Kelamin
          </CardHeader>
          <CardBody className="pb-8">
            <VictoryPie
              data={dataGender}
              innerRadius={16}
              cornerRadius={4}
              labels={({ datum }) =>
                `${datum.x === "LAKI_LAKI" ? "Laki - Laki" : "Perempuan"} (${datum.y})`
              }
              labelRadius={64}
              colorScale={["#33CEB7", "#137269"]}
              height={160}
              padding={{ top: 20, bottom: 20, left: 32, right: 32 }}
              labelComponent={<VictoryLabel style={{ fontSize: 14 }} />}
            />
          </CardBody>
        </Card>
      </div>
      <div>
        <Card shadow="sm" radius="sm">
          <CardHeader className="font-semibold text-12">
            Pegawai Berdasarkan Pendidikan Terakhir
          </CardHeader>
          <CardBody>
            <VictoryChart
              domainPadding={{ x: 10 }}
              theme={VictoryTheme.material}
              height={120}
              padding={{ top: 10, bottom: 10, left: 32, right: 32 }}
              containerComponent={
                <VictoryVoronoiContainer
                  labels={({ datum }) => `${datum.x}: ${datum.y}`}
                  labelComponent={
                    <VictoryTooltip
                      flyoutStyle={{
                        fill: "#ffffff",
                        stroke: "#128F82",
                        padding: 1,
                      }}
                      flyoutWidth={40}
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
                  axis: { stroke: "#128F82", strokeWidth: 2 },
                  tickLabels: {
                    fontSize: 2.7,
                    // angle: -15,
                    // textAnchor: "start",
                    // top: -5,
                  },
                }}
                tickLabelComponent={<VictoryLabel dy={-6} />}
                // gridComponent={<></>}
              />
              <VictoryAxis
                dependentAxis
                domain={[0, Math.max(...dataEducation.map((d) => d.y)) + 10]}
                tickLabelComponent={<VictoryLabel dx={6} />}
                style={{
                  axis: { stroke: "#128F82", strokeWidth: 1 },
                  tickLabels: { fontSize: 3, fill: "#756f6a" },
                }}
              />
              <VictoryBar
                data={dataEducation}
                style={{
                  data: {
                    fill: ({ index }) => {
                      const colors = [
                        "#9DF2E0",
                        "#7BDFF2",
                        "#B2F7EF",
                        "#EFF7F6",
                        "#F7D6E0",
                      ];
                      const safeIndex = typeof index === "number" ? index : 0;
                      return colors[safeIndex % colors.length];
                    },
                    stroke: "#128F82",
                  },
                }}
              />
            </VictoryChart>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default GrafikPegawai;
