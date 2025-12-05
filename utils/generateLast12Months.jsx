function generateLast12Months(data) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const result = months.map((m) => ({ month: m, views: 0 }));

  data.forEach((item) => {
    const date = new Date(item.createdAt);
    const monthIndex = date.getMonth(); // 0–11
    result[monthIndex].views += item.views;
  });

  return result;
}
export default generateLast12Months;
