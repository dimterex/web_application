import { Button } from "@mui/material";
import Calendar from "../components/calendar/calendar";
import { Meetengs } from "../components/meeting/meetings";
import DockerContainerView from "../components/docker/dockerContainer";

export function MainView() {
    return <div className='grid-container'>
      <Calendar classes='grid-child'  />
      <Meetengs classes='grid-child'  />
      <DockerContainerView />
    </div>
}
