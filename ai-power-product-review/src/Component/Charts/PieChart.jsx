import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJs.register(ArcElement, Tooltip, Legend);
const PieChart = ({data}) => {
    const chartData = {
        labels: ["Positive", "Negative", "Neutral"],
        datasets: [
            {
                data: [data.positive, data.negative, data.neutral],
                backgroundColor: ["#4CAF50", "#F44336", "#FFC107"],
            },
        ],
    };

    return <Pie data={chartData} />
}

export default PieChart
