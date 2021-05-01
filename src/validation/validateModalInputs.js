const eventDuration = 6 * 60 * 60 * 1000;

const formateToMscs = (date, time) => new Date(date + " " + time).getTime();

export const validateEventRange = (date, start, end) => {
  const begin = formateToMscs(date, start);
  const finish = formateToMscs(date, end);

  return begin < finish && finish - begin <= eventDuration;
};

export const validateEventsInCalendarCell = (events, newEvent) => {
  const newEventStart = formateToMscs(newEvent.date, newEvent.startTime);
  const newEventEnd = formateToMscs(newEvent.date, newEvent.endTime);

  const onlyOneEventPerTime = events.filter((event) => {
    const eventStart = formateToMscs(event.date, event.startTime);
    const eventEnd = formateToMscs(event.date, event.endTime);

    console.log(`${newEventStart} >= ${eventEnd} || ${newEventEnd} <= ${eventStart}`);
    return newEventStart >= eventEnd || newEventEnd <= eventStart;
    // || (newEventStart < eventStart && newEventEnd > eventStart) || (newEventStart < eventEnd && newEventEnd > eventEnd);
  });
  console.log(onlyOneEventPerTime.length === events.length);
  return onlyOneEventPerTime.length === events.length;
};
