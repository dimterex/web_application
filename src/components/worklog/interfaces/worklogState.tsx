import { MonthTime } from "./monthTimesResponse";

export interface WorklogState {
  events: MonthTime[];

  worklog_message: string | null;

  history_message: Array<string> | null;
}