export const ChartSettings = {
  labels: ["Electric", "Fly", "Fight", "Fire", "Ice", "Water"],
  type: "bar",
  datasets: [
    {
      label: "Level",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 255, 0, 0.2)",
        "rgba(192, 192, 192, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 140, 0, 0.2)",
        "rgba(0, 255, 255, 0.2)",
        "rgba(0, 191, 255, 0.2)",
      ],
      borderColor: [
        "rgba(255, 255, 0, 1)",
        "rgba(192, 192, 192, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(0, 255, 255, 1)",
        "rgba(0, 191, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};
