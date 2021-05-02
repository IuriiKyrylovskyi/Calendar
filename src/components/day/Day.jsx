import React from "react";
import Hour from "../hour/Hour";

import "./day.scss";

const Day = ({ weekStartDate, weekDates, dataDay, dayEvents, fetchEvents, deleteEvent }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map((hour) => {
        //getting all events from the day we will render
        const hourEvents = dayEvents.filter(
          (event) => {
            return parseInt(event.startTime) === hour;
          }
        );
        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            dataDay={dataDay}
            weekStartDate={weekStartDate}
            weekDates={weekDates}
            fetchEvents={fetchEvents}
            deleteEvent={deleteEvent}
            //
          />
        );
      })}
    </div>
  );
};

export default Day;
