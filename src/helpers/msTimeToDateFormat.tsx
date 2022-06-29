const msTimeToDateFormat = (msTime: number, format = "YYYY.MM.DD") => {
  const date = new Date(msTime);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return format
    .replace("YYYY", String(year))
    .replace("MM", String(month))
    .replace("DD", String(day))
    .replace("hh", String(hours))
    .replace("mm", String(minutes))
    .replace("ss", String(seconds));
};


export const msTimeToDateFormatV2 = (msTime: number, format = "YYYY년 MM월 DD일") => {
  const date = new Date(msTime);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return format
    .replace("YYYY", String(year))
    .replace("MM", String(month))
    .replace("DD", String(day))
    .replace("hh", String(hours))
    .replace("mm", String(minutes))
    .replace("ss", String(seconds));
};

export const timeStampToDateFormatV2 = (timestamp: string) => {

  const yyyymmdd = timestamp.substr(0, 10);
  const hhmm = timestamp.substr(11, 5);
  return `${yyyymmdd} ${hhmm}`;
};


export default msTimeToDateFormat;
