const eventDuration = 6 * 60 * 60 * 1000;

const formateToMscs = (date, time) => new Date(date + " " + time).getTime();

export const validateEventRange = (date, start, end) => {
  const begin = formateToMscs(date, start);
  const finish = formateToMscs(date, end);

  return begin < finish && finish - begin <= eventDuration;
};
