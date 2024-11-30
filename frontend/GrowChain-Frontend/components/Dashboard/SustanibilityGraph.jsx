import React, { useRef, useEffect } from "react";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
} from "chart.js";

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController
);

function SustanibilityGraph({ averageHydration }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!averageHydration) return;
    const ctx = chartRef.current.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgb(24, 153, 118, 0.6)");
    gradient.addColorStop(1, "rgb(24, 153, 118, 0)");

    let label = averageHydration.map(
      (item, index) => "Week " + (parseInt(index) + 1)
    );
    console.log(label);

    const data = {
      labels: label,
      datasets: [
        {
          label: "Hydration score",
          data: averageHydration,
          fill: true,
          backgroundColor: gradient,
          borderColor: "#189976",
          borderWidth: 2,
          pointRadius: 3,
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Hydration",
            },
          },
          x: {
            title: {
              display: true,
              text: "Weeks",
            },
          },
        },
      },
    };

    const myChart = new Chart(ctx, config);

    return () => myChart.destroy();
  }, []);

  return <canvas ref={chartRef} className="w-full h-fit"></canvas>;
}

export default SustanibilityGraph;
