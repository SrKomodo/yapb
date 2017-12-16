import { parseExpression } from "cron-parser";
import "./schedule.scss";

import React from "react";
import moment from "moment";

// Magic shim to get the type of a function's return
const dummyCronExpression = (false as true) && parseExpression("");
type CronExpression = typeof dummyCronExpression;

interface Props {
  name: string;
  starts: Time;
  ends: Time;
  days: number[];
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

    this.startInterval = parseExpression(
      `${this.props.starts.m} ${this.props.starts.h} * * ${this.props.days.join(",")}`
    );

    this.endInterval = parseExpression(
      `${this.props.ends.m} ${this.props.ends.h} * * ${this.props.days.join(",")}`
    );
  }

  resetIntervals() {
    this.startInterval.reset();
    this.endInterval.reset();
  }

  setProgressIntervals() {
    this.startInterval = parseExpression(
      `${this.props.starts.m} ${this.props.starts.h} * * ${this.props.days.join(",")}`
    );

    this.endInterval = parseExpression(
      `${this.props.ends.m} ${this.props.ends.h} * * ${this.props.days.join(",")}`
    );

    const nextStart = this.startInterval.next().toDate();
    const nextEnd = this.endInterval.next().toDate();
    
    this.resetIntervals();

    const prevStart = this.startInterval.prev().toDate();
    const prevEnd = this.startInterval.prev().toDate();

    this.resetIntervals();

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

  render() {
    const nextStart = this.startInterval.next().toDate();
    const nextEnd = this.endInterval.next().toDate();

    this.resetIntervals();
    
    const caption = nextStart < nextEnd ?
    "Starts " + moment(nextStart).fromNow() :
      "Ends " + moment(nextEnd).fromNow();
    
    return (
      <div className="schedule">
        <div>
          <span className="name">
            <span className="edit">✎</span>
            {this.props.name}
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