import React from "react";
import { useGlobalContext } from "../../context";
import PropTypes from "prop-types";
import { months } from "../../utils/dateUtils";
import "./header.scss";

const Header = (props) => {
  const { onOpenModal } = useGlobalContext();
  const { weekDates, handleTodayBtn, handleArrowBtn } = props;

  const monthAtWeekStart = months[new Date(weekDates[0]).getMonth()];
  const monthAtWeekEnd = months[new Date(weekDates[6]).getMonth()];

  return (
    <header className="header">
      <button
        className="button create-event-btn"
        onClick={() => {
          onOpenModal({});
        }}
      >
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
    </header>
  );
};

Header.propTypes = {
  weekDates: PropTypes.array.isRequired,
  handleTodayBtn: PropTypes.func.isRequired,
  handleArrowBtn: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

Header.defaultProps = {
  weekDates: [],
  onOpenModal: () => ({}),
};

export default Header;
