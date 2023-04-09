import Calendar from "../components/main_tab/calendar/calendar";
import { Meetengs } from "../components/main_tab/meeting/meetings";

import DockerContainerView from "../components/main_tab/docker/dockerContainerView"
import { WidgetGrid } from "../common/widget/baseWidget";

export function MainView() {
    return <WidgetGrid>
      <Calendar />
      <Meetengs />
      <DockerContainerView />
    </WidgetGrid>
}
