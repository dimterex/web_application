import { Button } from "@mui/material";
import Calendar from "../components/main_tab/calendar/calendar";
import { Meetengs } from "../components/main_tab/meeting/meetings";

import DockerContainerView from "../components/main_tab/docker/dockerContainerView"

export function MainView() {
    return <div className='grid-container'>
      <Calendar classes='grid-child'  />
      <Meetengs classes='grid-child'  />
      <DockerContainerView />
    </div>
}
