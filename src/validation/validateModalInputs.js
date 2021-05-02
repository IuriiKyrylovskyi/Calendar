const formateToMscs = (date, time) => new Date(date + " " + time).getTime();

export const validateEventRange = (date, start, end) => {
  const begin = formateToMscs(date, start);
  const finish = formateToMscs(date, end);
  const eventDuration = 6 * 60 * 60 * 1000;

  return begin < finish && finish - begin <= eventDuration;
};

export const validateEventsInCalendarCell = (events, newEvent) => {
  const newEventStart = formateToMscs(newEvent.date, newEvent.startTime);
  const newEventEnd = formateToMscs(newEvent.date, newEvent.endTime);

  const onlyOneEventPerTime = events.filter((event) => {
    const eventStart = formateToMscs(event.date, event.startTime);
    const eventEnd = formateToMscs(event.date, event.endTime);

    return newEventStart >= eventEnd || newEventEnd <= eventStart;
  });
  return onlyOneEventPerTime.length === events.length;
};

export const validateOnDelete = (startTime) => {
  const timeNow = new Date().getTime();
  const timeDiff = startTime - timeNow;
  const FIFTEEN_MINS = 15 * 60 * 1000;

  return timeDiff <= FIFTEEN_MINS || timeDiff <= 0;
};

export const validateInputMins = (time) => {
  return time.slice(-2) % 15 === 0;
};

