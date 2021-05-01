import React from "react";
import { useGlobalContext } from "../../context";
// import Modal from "../modal/Modal";

// import moment from 'moment';

import { months } from "../../utils/dateUtils.js";

import "./header.scss";

const Header = (props) => {
  const { onOpenModal } = useGlobalContext();
  const { weekDates, handleTodayBtn, handleArrowBtn } = props;
  // const prevMonth = moment(props.weekDates[0]).format('MMM');
  // const nextMonth = moment(props.weekDates[6]).format('MMM');

  const monthAtWeekStart = months[new Date(weekDates[0]).getMonth()];
  const monthAtWeekEnd = months[new Date(weekDates[6]).getMonth()];

  return (
    <header className="header">
      <button className="button create-event-btn" onClick={onOpenModal}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button" onClick={handleTodayBtn}>
          Today
        </button>
        <button className="icon-button navigation__nav-icon" onClick={() => handleArrowBtn(-7)}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="icon-button navigation__nav-icon" onClick={() => handleArrowBtn(7)}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">{`${monthAtWeekStart === monthAtWeekEnd ? monthAtWeekStart : monthAtWeekStart + " - " + monthAtWeekEnd}`}</span>
      </div>
      {/* {isOpen && <Modal isOpen={isOpen} onCloseModal={onCloseModal} />} */}
    </header>
  );
};

export default Header;
