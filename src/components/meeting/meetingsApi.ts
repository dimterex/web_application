import axios from "axios";
import moment from "moment";
import { REQUEST_URL } from "../../app/build";
import { MeetingsByDayResponse } from "./interfaces/meetingsByDayResponse";


export async function getMeetingsByDate(day: moment.Moment) {
  let res = 
   await axios({
    url: `${REQUEST_URL}/get_day_events?month=${day.month() + 1}&year=${day.year()}&day=${day.date()}`,
    method: 'get',
  });
  return res.data as MeetingsByDayResponse;
}
