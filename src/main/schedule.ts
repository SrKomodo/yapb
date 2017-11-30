import * as later from "later";
import { join } from "path";

const hostFileLocation = process.platform === "win32"
  ? join(process.env.SystemRoot, "System32", "drivers", "etc", "hosts")
  : join("etc", "hosts");

interface Time {
  h: number,
  m: number
}

interface ScheduleEntry {
  name: string,
  starts: Time
  ends: Time
  days: number[],
  blocks: {
    websites: string[],
    programs: string[]
  }
}

class Schedule {
  startTime: later.ScheduleData
  endTime: later.ScheduleData
  name: string
  blocks: {
    websites: string[]
    programs: string[]
  }
  
  constructor(entry: ScheduleEntry) {
    this.startTime = {
      schedules: [{
        h: [entry.starts.h],
        m: [entry.starts.m],
        dw: entry.days
      }],
      exceptions: [],
      error: 0
    }

    this.endTime = {
      schedules: [{
        h: [entry.ends.h],
        m: [entry.ends.m],
        dw: entry.days
      }],
      exceptions: [],
      error: 0
    }

    this.name = entry.name;
    this.blocks = entry.blocks;

    later.setInterval(() => {
      console.log("start");
    }, this.startTime);

    later.setInterval(() => {
      console.log("end");
    }, this.endTime);
  }
}

export {Schedule, ScheduleEntry};