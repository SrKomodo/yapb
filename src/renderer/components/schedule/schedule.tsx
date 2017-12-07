import "./schedule.css";

import React from "react";
import moment from "moment";

interface Props {
  name: string;
  starts: Time;
  ends: Time;
  days: number[];
}

function Schedule(props: Props) {
  const timeLeft = moment(`${props.ends.h} ${props.ends.m}`, "hh mm");
  return (
    <div className="schedule">
      <div>
        <span className="name">{props.name}</span>
        <span className="time">Ends {timeLeft.fromNow()}</span>
      </div>
      <div>
        <progress value="70" max="100"/>
      </div>
    </div>
  );
}

export { Schedule };