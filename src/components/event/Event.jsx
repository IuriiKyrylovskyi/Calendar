import React, { useState, useEffect, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { validateOnDelete } from "../../validation/validateModalInputs";
import PropTypes from "prop-types";
import "./event.scss";

const Event = ({ id, height, marginTop, title, time, startTime, handleDelete, fetchEvents }) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const clickedHour = useRef();

  useOnClickOutside(clickedHour, () => setIsOpenDelete(false));

  function onCloseDelete() {
    if (!validateOnDelete(startTime)) {
      setIsOpenDelete(false);
      return alert("You can do it 15 mins to event");
    }
    handleDelete(id);
    fetchEvents();
    setIsOpenDelete(false);
  }

  const eventStyle = {
    height,
    marginTop,
  };

  return (
    <>
      <div
        ref={clickedHour}
        style={eventStyle}
        className="event"
        onClick={() => setIsOpenDelete(!isOpenDelete)}
        //
      >
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
        {isOpenDelete && (
          <span
            className="delete-event-btn"
            style={{ top: height - 10 }}
            onClick={onCloseDelete}
            //
          >
            <MdDelete /> Delete
          </span>
        )}
      </div>
    </>
  );
};

Event.propTypes = {
  id: PropTypes.string,
  height: PropTypes.number,
  marginTop: PropTypes.number,
  title: PropTypes.string,
  time: PropTypes.string,
  startTime: PropTypes.number,
  handleDelete: PropTypes.func,
  fetchEvents: PropTypes.func,
};
export default Event;

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}
