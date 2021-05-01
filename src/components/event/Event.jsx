import React, { useState } from "react";
import { useGlobalContext } from "../../context";
import { MdDelete } from "react-icons/md";
import "./event.scss";

const Event = ({ id, height, marginTop, title, time, handleDelete, fetchEvents }) => {
  const { isEvent, isOpen } = useGlobalContext();

  const [isClicked, setIsClicked] = useState(false);

  const onOpenDelete = (e) => {
    if (isOpen) {
      return;
    }
    // if (e.target.className === 'event') {
    //   return setIsClicked(!isEvent);
    // }
    if (!isEvent && !isClicked) {
      return setIsClicked(!isEvent);
    }
    console.log(height);
    return setIsClicked(!isClicked);
  };

  function onCloseDelete() {
    handleDelete(id);
    fetchEvents();
    setIsClicked(false);
  }

  const eventStyle = {
    height,
    marginTop,
  };

  return (
    <>
      <div
        style={eventStyle}
        className="event"
        onClick={onOpenDelete}
        //
      >
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
        {isClicked && (
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

export default Event;
