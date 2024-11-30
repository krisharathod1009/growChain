"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DoughnutChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); 

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Wheat", "Corn", "Barley", "Paddy"],
        datasets: [
          {
            label: "Crop Distribution",
            data: [11336, 7675, 3224, 2337],
            backgroundColor: ["#4CAF50", "#FF9800", "#F44336", "#9C27B0"],
            borderColor: "#fff",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        animation: {
          duration: 1500,
          easing: "easeOutBounce",
        },
        plugins: {
          legend: {
            display: false, 
          },
        },
        elements: {
          arc: {
            borderWidth: 1,
          },
        },
        cutout: "80%",
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const labels = ["Wheat", "Corn", "Barley", "Paddy"];
  const colors = ["#4CAF50", "#FF9800", "#F44336", "#9C27B0"];
  const data = [11336, 7675, 3224, 2337];
  const total = data.reduce((sum, value) => sum + value, 0); 

  return (
    <div className="flex flex-col gap-12 w-full">
      <div className="relative">
        <canvas ref={chartRef} className="doughnutPie m-auto" />
        <p className="absolute inset-0 flex justify-center items-center text-2xl">
          {total.toLocaleString()} Ha
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {data.map((item, index) => {
          const percentage = ((item / total) * 100).toFixed(2);
          return (
            <div key={index} className="flex justify-between">
              <div className="flex items-center">
                <p
                  className={`w-4 h-4 rounded-full`}
                  style={{ backgroundColor: colors[index] }}
                ></p>
                <p className="ml-2">{labels[index]}</p>
              </div>
              <p style={{ color: colors[index] }}>{`{${percentage}%}`}</p>
              <p>{`${item.toLocaleString()} Ha`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoughnutChart;
