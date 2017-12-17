import "./editSchedule.scss";
import React from "react";

interface Props {
  schedule: ScheduleEntry | undefined;
  onClick: () => any;
}

class EditSchedule extends React.Component<Props> {
  handleClick() {
    this.props.onClick();
  }

  render() {
    if (this.props.schedule === undefined) {
      return null;
    }
    return (
      <div className="editSchedule">
        <button onClick={this.handleClick.bind(this)}>close</button>
        <div>Editing {this.props.schedule.name}</div>
      </div>
    )
  }
}

export { EditSchedule };