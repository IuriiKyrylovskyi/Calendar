import React, { useState, useContext } from "react";
import moment from "moment";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [dateInput, setDateInput] = useState("");
  const [startTimeInput, setStartTimeInput] = useState("");
  const [endTimeInput, setEndTimeInput] = useState("");

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const onOpenModal = ({ start, end }) => {
    setDateInput(start ? moment(start).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"));
    setStartTimeInput(start ? moment(start).format("HH:mm") : moment().format("HH:mm"));
    setEndTimeInput(end ? moment(end).format("HH:mm") : moment().format("HH:mm"));

    setIsOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        isOpen,
        onCloseModal,
        onOpenModal,

        dateInput,
        startTimeInput,
        endTimeInput,
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
