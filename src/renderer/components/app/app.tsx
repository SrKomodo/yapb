import React from "react";

import cloneObj from "../../cloneOjb";

import { Schedule } from "../schedule/schedule";
import { EditSchedule } from "../editSchedule/editSchedule";

import { readFile } from "fs";
import { join } from "path";

interface Props {
}

interface State {
  schedules: ScheduleEntry[];
  isEditing: boolean;
  scheduleToEdit: ScheduleEntry | undefined;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    this.state = {
      schedules: [],
      scheduleToEdit: undefined,
      isEditing: false
    }

    readFile(join(__static, "schedule.json"), "utf8", (err, data) => {
      const schedules: ScheduleEntry[] = JSON.parse(data);
      this.setState({schedules});
    });
  }

  handleScheduleClick(scheduleToEdit: ScheduleEntry) {
    this.setState({
      scheduleToEdit: cloneObj(scheduleToEdit) as ScheduleEntry,
      isEditing: true
    });
  }

  handleCloseClick() {
    this.setState({
      scheduleToEdit: undefined,
      isEditing: false
    })
  }

  render() {
    const editor = typeof this.state.scheduleToEdit === "undefined"
      ? null
      : <EditSchedule onClose={this.handleCloseClick.bind(this)} schedule={this.state.scheduleToEdit} />
    const schedules = this.state.schedules.map(schedule =>
      <Schedule onClick={this.handleScheduleClick.bind(this)} schedule={schedule} key={schedule.name} />
    );
    return (
      <div className={this.state.isEditing ? "editing" : "notEditing"}>
        {editor}
        <div className="schedules">
          {schedules}
        </div>
      </div>
    );
  }
}

export { App };