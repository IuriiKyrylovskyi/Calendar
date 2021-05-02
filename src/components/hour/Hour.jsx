import React from "react";
import { useGlobalContext } from "../../context";
import TimeLine from "../timeLine/TimeLine";
import Event from "../event/Event";

const Hour = ({ weekStartDate, weekDates, dataDay, dataHour, hourEvents, fetchEvents, deleteEvent }) => {
  const currentMonth = new Date(weekDates[new Date().getDay()]).getMonth();
  // console.log(dataDay);
  const currentDate =
    weekStartDate.getFullYear() === new Date().getFullYear() &&
    currentMonth && //
    dataDay === new Date().getDate() &&
    dataHour === new Date().getHours();

  const { onOpenModal } = useGlobalContext();

  // console.log(currentDate);
  // console.log(currentMonth);

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {/* if no events in the current hour nothing will render here */}
      {hourEvents.length ? (
        hourEvents.map(({ id, date, startTime, endTime, title }) => {
          const dateFrom = new Date(date + " " + startTime);
          const dateTo = new Date(date + " " + endTime);

          // console.log(id, date, startTime, endTime, title);
          // console.log((dateTo - dateFrom) / 1000 / 60 / 60);
          // const eventDuration = (dateTo - dateFrom) / 1000 / 60 / 60;

          return (
            <Event
              key={id}
              id={id}
              //calculating event height = duration of event in minutes
              height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
              marginTop={dateFrom.getMinutes()}
              time={`${startTime} - ${endTime}`}
              startTime={dateFrom.getTime()}
              title={title}
              fetchEvents={fetchEvents}
              handleDelete={deleteEvent}
            />
          );
        })
      ) : (
        <div
          style={{ width: "100%", height: "100%" }}
          onClick={() => {
            const date = weekDates.filter((dayDate) => dayDate.getDate() === dataDay);
            // console.log(new Date(new Date(date).setHours(dataHour)).getHours());
            const start = new Date(date).setHours(dataHour);
            const end = new Date(date).setHours(dataHour + 1);
            // end.setHours(end.getHours() + 1);
            onOpenModal({ start, end });
          }}
        ></div>
      )}
      {currentDate && <TimeLine weekStartDate={weekStartDate} />}
    </div>
  );
};

export default Hour;
