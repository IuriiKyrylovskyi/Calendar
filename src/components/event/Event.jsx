import React, { useState } from "react";
import { useGlobalContext } from "../../context";
import { MdDelete } from "react-icons/md";
import { validateOnDelete } from "../../validation/validateModalInputs";
import "./event.scss";

const Event = ({ id, height, marginTop, title, time, startTime, handleDelete, fetchEvents }) => {
  const { isEvent, isOpen } = useGlobalContext();

  const [isClicked, setIsClicked] = useState(false);

  function handleClickOnEvent() {
    if (!isClicked) {
      document.addEventListener("click", handleOutsideClick, false);
    } else {
      document.removeEventListener("click", handleOutsideClick, false);
    }

    setIsClicked(!isClicked);
  }

  let node;
  function handleOutsideClick(e) {
    if (!node.contains(e.target)) {
      handleClickOnEvent();
    }
  }

  // const onOpenDelete = (e) => {
  //   if (isOpen) {
  //     return;
  //   }
  //   // if (e.target.className === 'event') {
  //   //   return setIsClicked(!isEvent);
  //   // }
  //   if (!isEvent && !isClicked) {
  //     return setIsClicked(!isEvent);
  //   }
  //   console.log(height);
  //   setIsClicked(false);
  //   return setIsClicked(!isClicked);
  // };

  function onCloseDelete() {
    if (!validateOnDelete(startTime)) {
      setIsClicked(false);
      return alert("You can do it 15 mins to event");
    }
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
        ref={node => {
          node = node;
        }}
        style={eventStyle}
        className="event"
        onClick={handleClickOnEvent}
        // onClick={onOpenDelete}
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
