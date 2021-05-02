import React, { useState, useEffect } from "react";
import "./timeline.scss";

const TimeLine = () => {
  const [date, setDate] = useState(new Date());
  const [isUpdate, setIsUpdate] = useState(true);

  useEffect(() => {
    const secondsToMin = 60 - new Date().getSeconds();

    const timeout = setTimeout(
      () =>
        setInterval(() => {
          setDate(new Date());
        }, 1000),
      secondsToMin * 1000
    );

    return () => {
      clearInterval(timeout);
      setIsUpdate(false);
    };
  }, []);

  const mins = date.getMinutes();

  return isUpdate && <div className="time-line" style={{ top: mins }}></div>;
};

export default TimeLine;
