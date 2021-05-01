import React from "react";
import Day from "../day/Day";

import "./week.scss";

const Week = ({ weekStartDate, weekDates, events, fetchEvents, deleteEvent }) => {
  // console.log(events.map((i) => console.log(i)));
  // console.log(weekDates);
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);
        //getting all events from the day we will render
        const dayEvents = events.filter(
          // (event) => event.dateFrom > dayStart && event.dateTo < dayEnd
          (event) => {
            // console.log(event);
            const dateFrom = new Date(event.date + " " + event.startTime).getTime();
            const dateTo = new Date(event.date + " " + event.endTime).getTime();
            // console.log(`'${event.date + "/" + event.startTime}'`);
            // console.log(event.startTime);
            // console.log(dateFrom);
            // console.log(dateTo);
            // console.log(dateTo < dateFrom);
            return dateFrom > dayStart && dateTo < dayEnd;
          }
        );
        // console.log(dayStart.getDate());
        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            weekDates={weekDates}
            weekStartDate={weekStartDate}
            fetchEvents={fetchEvents}
            deleteEvent={deleteEvent}
            //
          />
        );
      })}
    </div>
  );
};

export default Week;
