import React, { useRef, useEffect } from "react";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarController,
} from "chart.js";

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  BarController
);

function TokenEarningsBreakdown({ averageQuality }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    let label = averageQuality.map((item, index) => "Week " + (parseInt(index) + 1));

    // Function to generate a random green color
    const getRandomGreen = () => {
      const red = Math.floor(Math.random() * 50); 
      const green = Math.floor(Math.random() * 256); 
      const blue = Math.floor(Math.random() * 50);
      return `rgba(${red}, ${green}, ${blue}, 0.5)`;
    };

    const data = {
      labels: label,
      datasets: [
        {
          label: "Quality",
          data: averageQuality,
          backgroundColor: averageQuality.map(() => getRandomGreen()),
          borderColor: averageQuality.map(() => "rgba(0, 128, 0, 1)"),
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: "bar",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Quality",
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
  }, [averageQuality]);

  return <canvas ref={chartRef} className="w-full-custom"></canvas>;
}

export default TokenEarningsBreakdown;
