import axios from "axios";
import { REQUEST_URL } from "../../app/build";
import { HistoryItemResponse } from "./interfaces/historyItemResponse";
import { MonthTimesResponse } from "./interfaces/monthTimesResponse";
import { WriteWorklogResponse } from "./interfaces/writeWorklogResponse";

export async function getMonthStatistics(day: moment.Moment, force: boolean = false) {
    let res = await axios({
      url: `${REQUEST_URL}/get_month_times?month=${day.month() + 1}&year=${day.year()}&force=${force}`,
      method: 'get',
    });
  
    return res.data as MonthTimesResponse;
}

export async function setWorklogByDate(day: moment.Moment) {
  let res = await axios({
    url: `${REQUEST_URL}/set_worklog_time?month=${day.month() + 1}&year=${day.year()}&day=${day.date()}`,
    method: 'get',
  });

  return res.data as WriteWorklogResponse;
}

export async function getHistoryWorklogByDate(day: moment.Moment) {
  let res = await axios({
    url: `${REQUEST_URL}/get_day_worklogs?month=${day.month() + 1}&year=${day.year()}&day=${day.date()}`,
    method: 'get',
  });

  return res.data as HistoryItemResponse;
}


