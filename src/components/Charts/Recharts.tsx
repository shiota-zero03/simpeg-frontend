import React, { useState } from "react";
import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

interface ChartProps {
  data: any[];
  dataKeys: string[]; // Untuk line dan bar bisa lebih dari satu, pie hanya satu
  type: "line" | "bar" | "doughnut";
  colors?: string[];
  xKey?: string; // Default: 'data'
}

const DEFAULT_COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1", "#a28dd1", "#ff9f7f"];

const CustomChart: React.FC<ChartProps> = ({ data, dataKeys, type, colors = DEFAULT_COLORS, xKey = "data" }) => {
  const defaultVisible = type === "doughnut" ? data.map(item => item.name) : [...dataKeys];
  const [visibleKeys, setVisibleKeys] = useState<string[]>(defaultVisible);

  const toggleKey = (key: string) => {
    setVisibleKeys((prev) =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const renderLegend = (value: string) => {
    const isVisible = visibleKeys.includes(value);
    return (
      <span
        onClick={() => toggleKey(value)}
        style={{
          cursor: "pointer",
          textDecoration: isVisible ? "none" : "line-through",
          opacity: isVisible ? 1 : 0.5,
        }}
      >
        {value}
      </span>
    );
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        {type === "line" ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend formatter={renderLegend} />
            {dataKeys.map((key, idx) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[idx % colors.length]}
                strokeWidth={3}
                dot={{ r: 4 }}
                hide={!visibleKeys.includes(key)}
              />
            ))}
          </LineChart>
        ) : type === "bar" ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend formatter={renderLegend} />
            {dataKeys.map((key, idx) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[idx % colors.length]}
                barSize={20}
                radius={[10, 10, 0, 0]}
                hide={!visibleKeys.includes(key)}
              />
            ))}
          </BarChart>
        ) : (
          <PieChart>
            <Pie
              data={data.map(item => ({
                ...item,
                [dataKeys[0]]: visibleKeys.includes(item.name) ? item[dataKeys[0]] : 0
              }))}
              dataKey={dataKeys[0]}
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              label
            >
              {data.map((entry, index) => {
                const isVisible = visibleKeys.includes(entry.name);
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                    fillOpacity={isVisible ? 1 : 0.3}
                  />
                );
              })}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              align="center"
              formatter={renderLegend}
            />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default CustomChart;
