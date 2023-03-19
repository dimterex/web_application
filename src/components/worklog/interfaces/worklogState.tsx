import { MonthTime } from "../../../api/statistics/messages/monthTimesResponse";

export interface WorklogState {
  events: MonthTime[];

  history_message: Array<string> | null;
}