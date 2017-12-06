import { Job, scheduleJob } from "node-schedule";

// import { join } from "path";

// const hostFileLocation = process.platform === "win32"
//   ? join(process.env.SystemRoot, "System32", "drivers", "etc", "hosts")
//   : join("etc", "hosts");

interface Time {
  h: number;
  m: number;
}

interface ScheduleEntry {
  name: string;
  starts: Time;
  ends: Time;
  days: number[];
  blocks: {
    websites: string[],
    programs: string[]
  };
}

class Schedule {
  startTime: Job;
  endTime: Job;
  name: string;
  blocks: {
    websites: string[],
    programs: string[]
  };

  constructor(entry: ScheduleEntry) {
    this.name = entry.name;
    this.blocks = entry.blocks;

    this.startTime = scheduleJob(
      `${entry.starts.m} ${entry.starts.h} * * ${entry.days.join(",")}`,
      this.startBlock
    );

    this.endTime = scheduleJob(
      `${entry.ends.m} ${entry.ends.h} * * ${entry.days.join(",")}`,
      this.endBlock
    );
  }

  startBlock() {
    console.log("start");
  }

  endBlock() {
    console.log("end");
  }
}

export {Schedule, ScheduleEntry};