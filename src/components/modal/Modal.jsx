import React, { useState } from "react";
// import { createPortal } from "react-dom";
import { useGlobalContext } from "../../context";
import { createEvent } from "../../gateway/gateway";
import "./modal.scss";
import { validateEventRange, validateEventsInCalendarCell, validateInputMins } from "../../validation/validateModalInputs";

// const modalRoot = document.querySelector("#modal");

const Modal = (props) => {
  const { dateInput, startTimeInput, endTimeInput } = useGlobalContext();

  const [form, setForm] = useState({
    title: "",
    date: dateInput,
    startTime: startTimeInput,
    endTime: endTimeInput,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleEventCreate = () => {
    const { title, date, startTime, endTime, description } = form;
    const { fetchEvents } = props;
    let id;

    const newEvent = {
      id: id,
      title: title,
      date: date,
      startTime: startTime,
      endTime: endTime,
      description: description,
    };

    const start = newEvent.startTime;
    const end = newEvent.startTime;
    console.log(start);
    console.log(startTime);
    if (!validateInputMins(start) || !validateInputMins(end)) {
      return alert("minuts should be multiple of 15");
    }
   
    !validateEventRange(date, startTime, endTime) ? alert("Event shouldn't be more than 6 hours!") : !validateEventsInCalendarCell(props.events, newEvent) ? alert("Put 1 event at a time period") : createEvent(newEvent).then(() => fetchEvents());
  };

  const { isOpen, onCloseModal } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    handleEventCreate();
    onCloseModal();
  };

  if (!isOpen) {
    return null;
  }

  const { title, date, startTime, endTime, description } = form;

  return (
    <div className="modal overlay" onClick={onCloseModal}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="create-event">
          <button
            className="create-event__close-btn"
            onClick={onCloseModal}
            //
          >
            +
          </button>
          <form
            className="event-form"
            onSubmit={handleSubmit}
            //
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              value={title}
              onChange={handleChange}
              //
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={date}
                onChange={handleChange}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={startTime}
                onChange={handleChange}
                //
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={endTime}
                onChange={handleChange}
                //
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={description}
              onChange={handleChange}
              //
            ></textarea>
            <button
              type="submit"
              className="event-form__submit-btn"
              //
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
    // ,
    // element
  );
};

export default Modal;
