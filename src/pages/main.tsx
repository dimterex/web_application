import { Button } from "@mui/material";
import Calendar from "../components/calendar/calendar";
import { Meetengs } from "../components/meeting/meetings";

export function MainPage() {
    return <div className='calendar_container'>
      <Calendar />
      <Meetengs />
    </div>
}
