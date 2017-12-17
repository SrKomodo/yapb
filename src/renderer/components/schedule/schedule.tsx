import { parseExpression } from "cron-parser";
import "./schedule.scss";

import React from "react";
import moment from "moment";

// Magic shim to get the type of a function's return
const dummyCronExpression = (false as true) && parseExpression("");
type CronExpression = typeof dummyCronExpression;

interface Props {
  schedule: ScheduleEntry;
  onClick: (schedule: ScheduleEntry) => any; 
}

interface State {
  progress: number;
}

class Schedule extends React.Component<Props, State> {
  timer: NodeJS.Timer;
  startInterval: CronExpression;
  endInterval: CronExpression;

  constructor(props: Props) {
    super(props);
    this.state = {progress: 0}
    this.resetIntervals();
  }

  resetIntervals() {
    this.startInterval = parseExpression(
      `${this.props.schedule.starts.m} ${this.props.schedule.starts.h} * * ${this.props.schedule.days.join(",")}`
    );

    this.endInterval = parseExpression(
      `${this.props.schedule.ends.m} ${this.props.schedule.ends.h} * * ${this.props.schedule.days.join(",")}`
    );
  }

  setProgressIntervals() {

    this.resetIntervals();
    const nextStart = this.startInterval.next().toDate();
    const nextEnd = this.endInterval.next().toDate();
    
    this.resetIntervals();
    const prevStart = this.startInterval.prev().toDate();
    const prevEnd = this.startInterval.prev().toDate();


    const start = prevStart > prevEnd ? prevStart : prevEnd;
    const end = nextStart < nextEnd ? nextStart : nextEnd;

    const length = end.getTime() - start.getTime();

    this.setState({
      progress: (new Date().getTime() - start.getTime()) / length
    });

    this.timer = setInterval(() => {
      const progress = (new Date().getTime() - start.getTime()) / length;
      if (progress > 1) {
        clearInterval(this.timer);
        return this.setProgressIntervals();
      }
      this.setState({
        progress: progress
      });
    }, length / 100);
  }

  componentDidMount() {
    this.setProgressIntervals();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleClick() {
    this.props.onClick(this.props.schedule);
  }

  render() {
    this.resetIntervals();

    const nextStart = this.startInterval.next().toDate();
    const nextEnd = this.endInterval.next().toDate();

    const caption = nextStart < nextEnd ?
    "Starts " + moment(nextStart).fromNow() :
      "Ends " + moment(nextEnd).fromNow();
    
    return (
      <div className="schedule">
        <div>
          <span className="name">
            <span onClick={this.handleClick.bind(this)} className="edit">✎</span>
            {this.props.schedule.name}
          </span>
          <span className="time">{caption}</span>
        </div>
        <div>
          <progress value={this.state.progress} />
        </div>
      </div>
    );
  }
}

export { Schedule };