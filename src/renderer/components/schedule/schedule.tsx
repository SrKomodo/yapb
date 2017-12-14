import { RecurrenceRule } from "node-schedule";
import "./schedule.scss";

import React from "react";
import moment from "moment";

interface Props {
  name: string;
  starts: Time;
  ends: Time;
  days: number[];
}

function Schedule(props: Props) {
  const now = new Date();
  const startInterval = new RecurrenceRule(
    undefined, undefined, undefined,
    props.days,
    props.starts.h,
    props.starts.m
  ).nextInvocationDate(now);

  const endInterval = new RecurrenceRule(
    undefined, undefined, undefined,
    props.days,
    props.ends.h,
    props.ends.m
  ).nextInvocationDate(now);

  const caption = startInterval < endInterval ?
    "Starts " + moment(startInterval).fromNow() :
    "Ends " + moment(endInterval).fromNow()

  return (
    <div className="schedule">
      <div>
        <span className="name">
          <span className="edit">✎</span>
          {props.name}
        </span>
        <span className="time">{caption}</span>
      </div>
      <div>
        <progress value="70" max="100"/>
      </div>
    </div>
  );
}

export { Schedule };