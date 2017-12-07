declare const __static: string;

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