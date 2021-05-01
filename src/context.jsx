import React, { useState, useContext } from "react";
import moment from "moment";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEvent, setEvent] = useState(false);

  const [dateInput, setDateInput] = useState("");
  const [startTimeInput, setStartTimeInput] = useState("");
  const [endTimeInput, setEndTimeInput] = useState("");

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const onOpenModal = (e) => {
    if (isEvent || e.target.closest(".event")) {
      return; // setEvent(false);
    }
    if (e.target.className === "calendar__time-slot") {
      // console.log(onOpenModalStartTime());
      setDateInput("");
      setStartTimeInput("");
      setEndTimeInput("");

      setEvent(false);
      setIsOpen(true);
      console.log(e);
      console.log(e.target.dataset);
      if (e.target.className === "calendar__day") {
        console.log(e.target.dataset);
      }
      return;
    }

    if (!e.target.closest("event")) {
      console.log(e.target.className);
      setDateInput(moment().format("YYYY-MM-DD"));
      setStartTimeInput(moment().format("HH:mm"));
      setEndTimeInput(moment().format("HH:mm"));

      setEvent(false);
      setIsOpen(true);
    }
  };

  // function onOpenModalStartTime(start) {
  //   setStartTimeInput(start);
  // }

  return (
    <AppContext.Provider
      value={{
        isOpen,
        isEvent,
        onCloseModal,
        onOpenModal,

        dateInput,
        startTimeInput,
        endTimeInput,
        // onOpenModalStartTime,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
