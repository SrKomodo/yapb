import "./style.css";

import fs from "fs";
import path from "path";

import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app/app";


ReactDOM.render(
  <App schedules={JSON.parse(fs.readFileSync(path.join(__static, "schedule.json"), "utf8")) as ScheduleEntry[]}/>,
  document.getElementById("app")
);