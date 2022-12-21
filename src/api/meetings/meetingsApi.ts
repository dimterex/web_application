import axios from "axios";
import moment from "moment";
import { REQUEST_URL } from "../../app/build";
import { MeetingsByDayResponse } from "./meetingsByDayResponse";


export async function getMeetingsByDate(day: moment.Moment) {
  let res = await axios.get(`${REQUEST_URL}/get_day_events?month=${day.month() + 1}&year=${day.year()}&day=${day.date()}`);
  return res.data as MeetingsByDayResponse;
}
