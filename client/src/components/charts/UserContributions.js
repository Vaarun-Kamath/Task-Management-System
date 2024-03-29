"use client";
import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { GetUserContributions } from "@/app/api/task/handler";

export default function UserContributions(props) {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectId = props.projectId;
        const response = await GetUserContributions(projectId);
        setChartData(response.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.projectId]);

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const context = chartRef.current.getContext("2d");

      const newChart = new Chart(context, {
        type: "bar",
        data: {
          labels: chartData.assignees,
          // ["Chocolate", "Vanilla", "Strawberry"],
          // chartData.labels,

          datasets: [
            {
              label: "Completed Tasks",
              fillColor: "rgb(23, 203, 71, 0.7)",
              data: chartData.completed,
            },
            {
              label: "Pending Tasks",
              fillColor: "rgb(255, 202, 0, 0.7)",
              data: chartData.pending,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: "category",
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      chartRef.current.chart = newChart;
    }
  }, [chartData]);

  return (
    // <div style={{ position: "relative", width: "1000px", height: "500px" }}>
    <div className={props.className}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
