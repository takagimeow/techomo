export function convertDateToAgoText(date: Date) {
  const today = new Date();
  const difference = today.getTime() - date.getTime();
  let base = 60 * 60;
  if (difference / base < 60) {
    const result = Math.floor(difference / base);
    return `${result}秒前`;
  }
  if (difference / base >= 60) {
    base *= 60;
    const result = Math.floor(difference / base);
    return `${result}分前`;
  }
  if (difference / base >= 60 * 60) {
    base *= 60 * 60;
    const result = Math.floor(difference / base);
    return `${result}時間前`;
  }
  if (difference / base >= 60 * 60 * 60) {
    base *= 60 * 60 * 60;
    const result = Math.floor(difference / base);
    return `${result}日前`;
  }
  if (difference / base >= 60 * 60 * 60 * 60) {
    base *= 60 * 60 * 60 * 60;
    const result = Math.floor(difference / base);
    return `${result}年前`;
  }

  return 'ERROR秒前';
}
