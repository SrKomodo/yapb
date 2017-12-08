import React from "react";

import { Schedule } from "../schedule/schedule";

interface Props {
  schedules: ScheduleEntry[];
}

function App(props: Props) {
  const schedules = props.schedules.filter(schedule => {
    const now = new Date();
    if (schedule.days.indexOf(now.getDay()) == -1) return false;
    if (
      schedule.starts.h * 60 + schedule.starts.m > now.getHours() * 60 + now.getMinutes() ||
      schedule.ends.h * 60 + schedule.ends.m < now.getHours() * 60 + now.getMinutes()
    ) return false;
    return true;
  })
  .map(schedule =>
    <Schedule {...schedule} key={schedule.name}/>
  );
  return (
    <div>
      {schedules}
    </div>
  );
}

export { App };