export default function format(date) {
  if (!date) return;
  const time = new Date(+date);
  const getYear = time.getFullYear().toString().padStart(2, "0");
  const getMonth = (time.getMonth() + 1).toString().padStart(2, "0");
  const getday = time.getDate().toString().padStart(2, "0");
  const getHours = time.getHours().toString().padStart(2, "0");
  const getMinutes = time.getMinutes().toString().padStart(2, "0");
  const getSeconds = time.getSeconds().toString().padStart(2, "0");
  const weekArr = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const week = weekArr[time.getDay()];
  return `${getYear}-${getMonth}-${getday} ${getHours}:${getMinutes}:${getSeconds} ${week}`;
}
