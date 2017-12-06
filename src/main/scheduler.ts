import * as fs from "fs";
import * as path from "path";

import { Schedule, ScheduleEntry } from "./schedule";

function initialize() {
  const schedules = [];
  const json: ScheduleEntry[] = JSON.parse(fs.readFileSync(path.join(__dirname, "schedule.json"), "utf8"));
  for (const entry of json) {
    schedules.push(new Schedule(entry));
  }
}

export {initialize};