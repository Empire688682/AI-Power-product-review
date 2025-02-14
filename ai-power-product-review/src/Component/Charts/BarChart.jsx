import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const BarChart = ({ data }) => {
  const chartData = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        label: "Sentiment Analysis",
        data: [data.positive, data.negative, data.neutral],
        backgroundColor: ["#4CAF50", "#F44336", "#FFC107"],
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BarChart;
