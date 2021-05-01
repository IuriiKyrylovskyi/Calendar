import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import Navigation from "./../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";
import Modal from "../modal/Modal";
import { fetchEventsList, deleteEvent } from "../../gateway/gateway.js";
// import events from "../../gateway/events";

import "./calendar.scss";

const Calendar = (props) => {
  const [events, setEvents] = useState([]);

  function fetchEvents() {
    fetchEventsList().then((eventsList) => {
      // console.log(eventsList);
      setEvents(eventsList);
    });
  }

  function handleEventDelete(id) {
    deleteEvent(id).then(() => fetchEvents());
  }

  const { isOpen } = useGlobalContext();

  useEffect(() => {
    fetchEvents();
  },[]);

  // handleEventCreate = () => {
  //   const { title, dateFrom, dateTo, description } = this.state;

  //   const newEvent = {
  //     title: title,
  //     dateFrom: dateFrom,
  //     dateTo: dateTo,
  //     description: description,
  //   }

  //   createEvent(newEvent)
  //     .then(() => this.fetchEvents())
  // }

  const { weekStartDate, weekDates } = props;
  // console.log(weekDates);
  // console.log(events);
  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={events}
            weekStartDate={weekStartDate}
            fetchEvents={fetchEvents}
            deleteEvent={handleEventDelete}
            //
          />
        </div>
      </div>
      {isOpen && <Modal fetchEvents={fetchEvents} events={events} />}
    </section>
  );
};

export default Calendar;

//------------------------------------------------------

// class Calendar extends Component {
//   state = {
//     events: [],
//   };

//   componentDidMount() {
//     this.fetchEvents();
//   }

//   // shouldComponentUpdate(nextProps) {
//   //   if (this.props.isOpen === false || nextProps.isOpen === true) {
//   //     return false;
//   //   }
//   // }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.isEvent === true) {
//       this.fetchEvents();
//       console.log('didUpdate event', this.state.events);
//     } else if (prevProps.isOpen === true) {
//       this.fetchEvents();
//       console.log('didUpdate modal', this.state.events);
//       //  return this.fetchEvents();

//       // console.log(this.state.events);
//       // console.log(prevState.events);

//       // return fetchEventsList().then((eventsList) => {
//       //   console.log(eventsList);
//       //   this.setState({
//       //     events: eventsList,
//       //   });
//       // });
//     }
//     // this.handleEventDelete();
//   }

//   fetchEvents = () => {
//     fetchEventsList().then((eventsList) => {
//       console.log(eventsList);
//       this.setState({
//         events: eventsList,
//       });
//     });
//   };

//   // handleEventCreate = () => {
//   //   this.fetchEvents();
//   // };

//   handleEventDelete = (id) => {
//     deleteEvent(id).then(() => this.fetchEvents());
//   };

//   render() {
//     const { weekStartDate, weekDates } = this.props;
//     // console.log(weekDates);
//     console.log(this.state.events);
//     return (
//       <section className="calendar">
//         <Navigation weekDates={weekDates} />
//         <div className="calendar__body">
//           <div className="calendar__week-container">
//             <Sidebar />
//             <Week
//               weekDates={weekDates}
//               events={this.state.events}
//               weekStartDate={weekStartDate}
//               //
//             />
//           </div>
//         </div>
//       </section>
//     );
//   }
// }

// export default Calendar;
