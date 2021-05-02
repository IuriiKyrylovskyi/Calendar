import React from "react";
import Day from "../day/Day";
import PropTypes from "prop-types";
import "./week.scss";

const Week = ({ weekStartDate, weekDates, events, fetchEvents, deleteEvent }) => {
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);
        //getting all events from the day we will render
        const dayEvents = events.filter((event) => {
          const dateFrom = new Date(event.date + " " + event.startTime).getTime();
          const dateTo = new Date(event.date + " " + event.endTime).getTime();

          return dateFrom > dayStart && dateTo < dayEnd;
        });
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

Week.propTypes = {
  weekStartDate: PropTypes.instanceOf(Date),
  weekDates: PropTypes.array,
  events: PropTypes.array.isRequired,
  fetchEvents: PropTypes.func,
  deleteEvent: PropTypes.func,
};

Week.defaultProps = {
  events: [],
};

export default Week;
