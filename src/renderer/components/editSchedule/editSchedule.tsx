import "./editSchedule.scss";
import React from "react";

import { TimeInput } from "../timeInput/timeInput";
import { DayInput } from "../dayInput/dayInput";

interface Props {
  schedule: ScheduleEntry;
  onClose: () => any;
}

class EditSchedule extends React.Component<Props, ScheduleEntry> {
  constructor(props: Props) {
    super(props);
    this.state = props.schedule;
  }

  componentWillReceiveProps(props: Props) {
    this.setState(props.schedule);
  }

  handleClose() {
    this.props.onClose();
  }

  handleStartChange(starts: { h: number, m: number }) {
    this.setState({starts});
  }

  handleEndChange(ends: { h: number, m: number }) {
    this.setState({ends});
  }

  handleWebsiteChange(e: React.ChangeEvent<HTMLInputElement>) {
    const websites = e.target.value.trim().split(" ");
    this.setState(prevState => {
      const newState: ScheduleEntry = Object.create(prevState);
      newState.blocks.websites = websites;
      return newState;
    });
  }

  handleProgramChange(e: React.ChangeEvent<HTMLInputElement>) {
    const programs = e.target.value.trim().split(" ");
    this.setState(prevState => {
      const newState: ScheduleEntry = Object.create(prevState);
      newState.blocks.programs = programs;
      return newState;
    });
  }

  handleDayChange(day: number, enabled: boolean) {
    if (enabled) {
      this.setState(prevState => {
        const newState: ScheduleEntry = Object.create(prevState);
        newState.days.push(day);
        newState.days.sort((a, b) => a - b);
        return newState;
      });
    }
    else {
      this.setState(prevState => {
        const newState: ScheduleEntry = Object.create(prevState);
        newState.days.splice(newState.days.indexOf(day), 1);
        return newState;
      });
    }
  }

  render() {
    const days = [];
    for (let i = 0; i <= 6; i++) {
      days.push(<DayInput onChange={this.handleDayChange.bind(this)} day={i} enabled={this.state.days.indexOf(i) !== -1} key={i}/>);
    }
    return (
      <div className="editSchedule">
        <div className="header">
          <span>Editing {this.state.name}</span>
          <span onClick={this.handleClose.bind(this)}>✓</span>
        </div>
        <div className="timeInputs">
          <div>
            <div>Starts at:</div>
            <TimeInput
              h={this.state.starts.h}
              m={this.state.starts.m}
              onChange={this.handleStartChange.bind(this)}
            />
          </div>
          <div>
            <div>Ends at:</div>
            <TimeInput
              h={this.state.ends.h}
              m={this.state.ends.m}
              onChange={this.handleEndChange.bind(this)}
            />
          </div>
        </div>
        <div className="blockInputs">
          <div>
            <div>Blocks websites:</div>
            <input onChange={this.handleWebsiteChange.bind(this)} value={this.state.blocks.websites.join(" ")}/>
          </div>
          <div>
            <div>Blocks programs:</div>
            <input onChange={this.handleProgramChange.bind(this)} value={this.state.blocks.programs.join(" ")}/>
          </div>
        </div>
        <div className="dayInputs">
          {days}
        </div>
      </div>
    )
  }
}

export { EditSchedule };