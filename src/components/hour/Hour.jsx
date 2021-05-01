import React from "react";
import { useGlobalContext } from "../../context";
import TimeLine from "../timeLine/TimeLine";
import Event from "../event/Event";

// import Modal from "../modal/Modal";

// import { deleteEvent } from '../../gateway/gateway';
// import { formatMins } from "../../../src/utils/dateUtils.js";

const Hour = ({ weekStartDate, weekDates, dataDay, dataHour, hourEvents, fetchEvents, deleteEvent }) => {
  const currentMonth = new Date(weekDates[new Date().getDay()]).getMonth();

  const currentDate =
    weekStartDate.getFullYear() === new Date().getFullYear() &&
    currentMonth && //
    dataDay === new Date().getDate() &&
    dataHour === new Date().getHours();

  const { isOpen, onOpenModal, onOpenModalStartTime } = useGlobalContext();
  
  // console.log(currentDate);
  // console.log(currentMonth);
  
  return (
    <div
      className="calendar__time-slot"
      data-time={dataHour + 1}
      onClick={onOpenModal}
      // onTarget={() => console.log(dataDay)}
      //
    >
      {/* if no events in the current hour nothing will render here */}
      {hourEvents.map(({ id, date, startTime, endTime, title }) => {
        const dateFrom = new Date(date + " " + startTime);
        const dateTo = new Date(date + " " + endTime);

        // console.log(id, date, startTime, endTime, title);
        // console.log((dateTo - dateFrom) / 1000 / 60 / 60);
        // const eventDuration = (dateTo - dateFrom) / 1000 / 60 / 60;

        return (
          //eventDuration <= 6 &&
          <Event
            key={id}
            id={id}
            //calculating event height = duration of event in minutes
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${startTime} - ${endTime}`}
            title={title}
            fetchEvents={fetchEvents}
            handleDelete={deleteEvent}
            // handleDelete={onDeleteEvent}
          />
        );
      })}
      {currentDate && <TimeLine weekStartDate={weekStartDate} />}
      {/* {isOpen && <Modal fetchEvents={fetchEvents} />} */}
      {/* <TimeLine weekStartDate={weekStartDate} /> */}
    </div>
  );
};

export default Hour;
