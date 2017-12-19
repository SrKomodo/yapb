import "./dayInput.scss";
import React from "react";

const days = [
  "Sun",
  "Mon",
  "Tues",
  "Wed",
  "Thurs",
  "Fri",
  "Sat"
];

interface Props {
  day: number;
  enabled: boolean;
  onChange: (day: number, enabled: boolean) => any;
}

class DayInput extends React.Component<Props> {
  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange(this.props.day, e.target.checked);
  }

  render() {
    return (
      <div className="dayInput">
        <input id={this.props.day.toString()} onChange={this.handleChange.bind(this)} type="checkbox" checked={this.props.enabled}/>
        <label htmlFor={this.props.day.toString()}/>
        <div>{days[this.props.day]}</div>
      </div>
    )
  }
}

export {DayInput}