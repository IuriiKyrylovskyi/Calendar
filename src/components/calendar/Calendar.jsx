import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import Navigation from "./../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";
import Modal from "../modal/Modal";
import { fetchEventsList, deleteEvent } from "../../gateway/gateway";
import PropTypes from "prop-types";
import "./calendar.scss";

const Calendar = (props) => {
  const [events, setEvents] = useState([]);

  function fetchEvents() {
    fetchEventsList().then((eventsList) => {
      setEvents(eventsList);
    });
  }

  function handleEventDelete(id) {
    deleteEvent(id).then(() => fetchEvents());
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  const { isOpen } = useGlobalContext();
  const { weekStartDate, weekDates } = props;

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={events}
            weekStartDate={weekStartDate}
            fetchEvents={fetchEvents}
            deleteEvent={handleEventDelete}
            //
          />
        </div>
      </div>
      {isOpen && <Modal fetchEvents={fetchEvents} events={events} />}
    </section>
  );
};

Calendar.propTypes = {
  weekStartDate: PropTypes.instanceOf(Date),
  weekDates: PropTypes.array,
  isOpen: PropTypes.bool.isRequired,
};

Calendar.defaultProps = {
  isOpen: false,
};

export default Calendar;
