import "./timeInput.scss";
import React from "react";

interface Props {
  h: number;
  m: number;
  onChange: (time: {h: number, m: number}) => any;
}

class TimeInput extends React.Component<Props> {

  handleMinuteChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange({h: this.props.h, m: parseInt(e.target.value, 10)});
  }

  handleHourChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange({h: parseInt(e.target.value, 10), m: this.props.m});
  }

  render() {
    return (
      <div className="timeInput">
        <input type="number" min="0" max="23" onChange={this.handleHourChange.bind(this)} value={this.props.h.toString().padStart(2, "0")} />
        <span>:</span>
        <input type="number" min="0" max="59" onChange={this.handleMinuteChange.bind(this)} value={this.props.m.toString().padStart(2, "0")} />
      </div>
    )
  }
}

export {TimeInput};