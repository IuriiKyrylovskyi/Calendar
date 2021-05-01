import React, { useState } from "react";
// import { createPortal } from "react-dom";
import { useGlobalContext } from "../../context";
import { createEvent } from "../../gateway/gateway";
// import moment from "moment";
import "./modal.scss";
import { validateEventRange, validateEventsInCalendarCell } from "../../validation/validateModalInputs";

// const modalRoot = document.querySelector("#modal");

const Modal = (props) => {
  const { dateInput, startTimeInput, endTimeInput } = useGlobalContext();

  const [form, setForm] = useState({
    title: "",
    date: dateInput,
    // date: moment().format("YYYY-MM-DD"),
    startTime: startTimeInput,
    // startTime: moment().format("HH:mm"),
    endTime: endTimeInput,
    // endTime: moment().format("HH:mm"),
    description: "",
  });

  // function handleInputsField(e) {
  //   if (e.target.className === "event") {
  //     dateInput = 0;
  //     startTimeInput = 0;
  //     endTimeInput = 0;
  //     return;
  //   }
  //   dateInput = moment().format("YYYY-MM-DD");
  //   startTimeInput = moment().format("HH:mm");
  //   endTimeInput = moment().format("HH:mm");
  // }

  // const element = document.createElement("div");

  // useEffect(() => {
  //   modalRoot.appendChild(element);
  //   return modalRoot.removeChild(element);
  // });

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
    let id; // = Math.random()*1000;
    const newEvent = {
      id: id,
      title: title,
      date: date,
      startTime: startTime,
      endTime: endTime,
      description: description,
    };

    // console.log(date);
    // console.log(startTime);
    // console.log(endTime);
    !validateEventRange(date, startTime, endTime) ? alert("Event shouldn't be more than 6 hours!") : !validateEventsInCalendarCell(props.events, newEvent) ? alert("Put 1 event at a time period") : createEvent(newEvent).then(() => fetchEvents());
  };

  const { isOpen, onCloseModal } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    handleEventCreate();
    onCloseModal();
  };

  // const dayMonthYear = moment().format("YYYY-MM-DD");
  // const timeStart = moment().format("HH:mm");
  // const timeEnd = moment().format("HH:mm");

  // console.log(timeStart);
  // console.log(timeEnd);
  // console.log(this.state);

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
                // onSelect={selected}
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
