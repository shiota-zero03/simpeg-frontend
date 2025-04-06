import React, { useEffect, useRef } from 'react';
import OrgChart from '@balkangraph/orgchart.js';

const OrganizationStructureComponent = () => {
  const chartRef = useRef<OrgChart | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let chart: OrgChart | null = null;

    if (containerRef.current) {
      chart = new OrgChart(containerRef.current, {
        nodes: [
          { id: 1, name: "CEO" },
          { id: 2, pid: 1, name: "Manager" },
          { id: 3, pid: 2, name: "Staff" }
        ],
        nodeBinding: {
          field_0: "name"
        }
      });

      chartRef.current = chart;
    }

    return () => {
      if (chartRef.current) {
        try {
          chartRef.current.destroy();
        } catch (err) {
          console.warn("Failed to destroy OrgChart", err);
        }
        chartRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '500px' }} />;
};

export default OrganizationStructureComponent;
