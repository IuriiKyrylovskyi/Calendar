import React, { useState, useEffect } from "react";
import Header from "./components/header/Header";
import Calendar from "./components/calendar/Calendar";
import { useGlobalContext } from "./context";

import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";

import "./common.scss";

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(new Date()));

  function handleTodayBtnClick() {
    const weekStartTime = generateWeekRange(getWeekStartDate(weekStartDate))[0].getTime();
    const weekEndTime = weekStartTime + 7 * 24 * 60 * 60 * 1000;
    const nowTime = new Date().getTime();

    if (nowTime > weekStartTime && nowTime < weekEndTime) {
      return;
    }

    return setWeekStartDate(getWeekStartDate(new Date()));
  }

  function handleArrowBtnClick(diff) {
    const date = weekStartDate;
    date.setDate(date.getDate() + diff);

    return setWeekStartDate(getWeekStartDate(date));
  }

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const { isEvent, isOpen } = useGlobalContext();

  return (
    <>
      <Header
        weekDates={weekDates}
        handleTodayBtn={handleTodayBtnClick}
        handleArrowBtn={handleArrowBtnClick}
        //
      />
      <Calendar
        weekDates={weekDates}
        weekStartDate={weekStartDate}
        isEvent={isEvent}
        isOpen={isOpen}
        //
      />
    </>
  );
};

export default App;
