import { Button } from "@mui/material";
import Calendar from "../components/calendar/calendar";
import { Meetengs } from "../components/meeting/meetings";

export function MainView() {
    return <div className='grid-container'>
      <Calendar classes='grid-child'  />
      <Meetengs classes='grid-child'  />
    </div>
}
