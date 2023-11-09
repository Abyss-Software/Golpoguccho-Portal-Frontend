import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Bookings, Events and Users',
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Month',
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Value',
      },
      suggestedMin: 0,
      suggestedMax: 1,
    },
  },
};

const LineChart = ({ stats }: any) => {
  return <Line data={stats} options={options} />;
};

export default LineChart;
