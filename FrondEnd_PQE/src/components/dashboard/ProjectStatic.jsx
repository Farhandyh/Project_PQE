import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const ProjetStatic = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = {
    series: [
      {
        name: "kWh Battery",
        data: [2500, 2418, 2456, 2526, 2356, 3500],
        color: "#1A56DB",
      },
      {
        name: "Duration Battery",
        data: [3.29, 2.45, 2.55, 2.43, 3.12, 3.21],
        color: "#7E3BF2",
      },
    ],
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: true,
      },
    },
    legend: {
      show: true,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    xaxis: {
      categories: [
        "01 Feb",
        "02 Feb",
        "03 Feb",
        "04 Feb",
        "05 Feb",
        "06 Feb",
        "07 Feb",
      ],
      labels: {
        show: true,
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
    },
    yaxis: {
      show: true,
      labels: {
        formatter: function (value) {
          return "" + value;
        },
      },
    },
  };

  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && typeof ApexCharts !== "undefined") {
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [options]);

  return (
    <>
      <div className="w-full bg-white rounded-xl p-4 md:p-6">
        <div className="flex justify-between">
          <div>
            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
              9456kWh
            </h5>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              KWH this week
            </p>
          </div>
          <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
            23%
            <svg
              className="w-3 h-3 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13V1m0 0L1 5m4-4 4 4"
              />
            </svg>
          </div>
        </div>
        <div ref={chartRef} id="data-series-chart"></div>
      </div>
    </>
  );
};

export default ProjetStatic;
