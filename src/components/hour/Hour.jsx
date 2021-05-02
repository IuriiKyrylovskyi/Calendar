import React from "react";
import { useGlobalContext } from "../../context";
import TimeLine from "../timeLine/TimeLine";
import Event from "../event/Event";
import PropTypes from "prop-types";

const Hour = ({ weekStartDate, weekDates, dataDay, dataHour, hourEvents, fetchEvents, deleteEvent }) => {
  const date = weekDates.filter((dayDate) => dayDate.getDate() === dataDay);
  const start = new Date(date).setHours(dataHour);
  const end = new Date(date).setHours(dataHour + 1);
  const timeNow = new Date().getTime();
  
  const currentDate = (start <= timeNow) && (timeNow < end);

  const { onOpenModal } = useGlobalContext();

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {/* if no events in the current hour nothing will render here */}
      {hourEvents.length ? (
        hourEvents.map(({ id, date, startTime, endTime, title }) => {
          const dateFrom = new Date(date + " " + startTime);
          const dateTo = new Date(date + " " + endTime);

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
            onOpenModal({ start, end });
          }}
        ></div>
      )}
      {currentDate && <TimeLine weekStartDate={weekStartDate} />}
    </div>
  );
};

Hour.propTypes = {
  weekStartDate:PropTypes.instanceOf(Date),
  weekDates:PropTypes.array,
  dataDay:PropTypes.number,
  dataHour:PropTypes.number,
  hourEvents:PropTypes.array,
  fetchEvents:PropTypes.func,
  deleteEvent:PropTypes.func,
};

export default Hour;
