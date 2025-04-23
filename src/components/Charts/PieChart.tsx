import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface PieChartComponentProps {
  data: { name: string; value: number }[];
  colors?: string[];
}

const DEFAULT_COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#8dd1e1",
  "#a28dd1",
  "#ff9f7f",
];

const PieChartComponent: React.FC<PieChartComponentProps> = ({
  data,
  colors = DEFAULT_COLORS,
}) => {
  const [visibleKeys, setVisibleKeys] = useState<string[]>(
    data.map((item) => item.name),
  );

  const toggleKey = (key: string) => {
    setVisibleKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
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

  const filteredData = data.map((item) => ({
    ...item,
    value: visibleKeys.includes(item.name) ? item.value : 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={filteredData}
          dataKey="value"
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
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
