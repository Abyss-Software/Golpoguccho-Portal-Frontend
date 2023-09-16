import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ stats }: any) => {
  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '# of Sales',
        data: [] as number[],
        backgroundColor: [] as string[],
        borderColor: [] as string[],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (stats) {
      const labels = stats.map((item: any) => item.packagename);
      const data = stats.map((item: any) => item.count);
      const backgroundColor = Array.from(
        { length: 7 },
        () =>
          `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, 0.2)`
      );

      const borderColor = backgroundColor.map((color) =>
        color.replace('0.2', '1')
      );

      setPieChartData({
        labels,
        datasets: [
          {
            label: 'Sales',
            data,
            backgroundColor,
            borderColor,
            borderWidth: 1,
          },
        ],
      });
    }
  }, [stats]);

  return <Pie data={pieChartData} />;
};

export default PieChart;
