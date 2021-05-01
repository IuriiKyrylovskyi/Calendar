import React, { Component } from 'react';
import './timeline.scss';

class TimeLine extends Component {
  state = {
    date: new Date(),
    isUpdate: true,
  }

  componentDidMount() {
    if (this.isCurrentDate()) {

      const timeSecDiff = 60 * 1000 - (new Date()).getMilliseconds();

      setTimeout(() => this.interval, timeSecDiff);

      this.interval = setInterval(() => {
        this.setState({
          date: new Date(),
          isUpdate: true,
        })
      }, 1000)
    }
  }

  componentWillUnmount() {
    this.setState({
      ...this.state,
      isUpdate: false
    })
    clearInterval(this.interval)
  }

  isCurrentDate = () => {
    const weekStartDate = this.props.weekStartDate.getTime();
    const weekEndDate = weekStartDate + 7 * 24 * 60 * 60* 1000;
    const nowTime = (new Date()).getTime();
 
    return (nowTime < weekEndDate && nowTime > weekStartDate);
  } 

  render() {
    console.log('render timeLine');
    const mins = this.state.date.getMinutes();
  
    return (
      this.state.isUpdate &&
      <div
        className="time-line"
        style={{top: mins}}
      >
      </div>
    )
  }
}

export default TimeLine;