import React from "react";

import { Schedule } from "../schedule/schedule";

interface Props {
  schedules: ScheduleEntry[];
}

function App(props: Props) {
  const schedules = props.schedules.map(schedule =>
    <Schedule {...schedule} key={schedule.name}/>
  );
  return (
    <div>
      {schedules}
    </div>
  );
}

export { App };