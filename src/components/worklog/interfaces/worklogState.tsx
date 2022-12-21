import { MonthTime } from "./monthTimesResponse";

export interface WorklogState {
  events: MonthTime[];

  history_message: Array<string> | null;
}