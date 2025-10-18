type DayPeriod =
  | "early"
  | "morning"
  | "noon"
  | "afternoon"
  | "evening"
  | "night";

/** 返回当前时段关键字 */
export function getDayPeriod(hour: number = new Date().getHours()): DayPeriod {
  if (hour >= 0 && hour < 5) return "early";
  if (hour < 12) return "morning";
  if (hour < 14) return "noon";
  if (hour < 18) return "afternoon";
  return "evening"; // 18-23
}

/** 直接拿到中文问候语 */
export function getGreeting(period: DayPeriod = getDayPeriod()): string {
  const map: Record<DayPeriod, string> = {
    early: "凌晨好，早点休息哦~",
    morning: "早上好，元气满满！",
    noon: "中午好，记得吃午饭！",
    afternoon: "下午好，喝杯咖啡提提神！",
    evening: "晚上好，今天辛苦啦！",
    night: "夜深了，注意休息哦~",
  };
  return map[period];
}
