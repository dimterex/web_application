import { Box } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectSelectedType } from "./configurationSlice";
import { ConfigurationTypes } from "./configurationTypes";
import UrlslView from "../urls/urlslView";
import CredentionalView from "../credentials/credentionalView";
import PeriodicalTasksView from "../periodical_tasks/periodicalTasksView";
import TokenslView from "../tokens/tokenslView";

import MeetingsCategorieslView from "../meeting_categories/meetingsCategoriesView"
import TaskCategorieslView from "../task_categories/taskCategoriesView"

export function ConfigurationFactory() {

    let selectedSource = useAppSelector(selectSelectedType);

    const renderSwitch = function() {
        switch(selectedSource) {
            case ConfigurationTypes.credentials:
                return <CredentionalView />;
            case ConfigurationTypes.outlook_categories:
                return <MeetingsCategorieslView />
            case ConfigurationTypes.todoist_categories:
                return <TaskCategorieslView />
            case ConfigurationTypes.tokens:
                return <TokenslView />
            case ConfigurationTypes.urls: 
                return <UrlslView />
            case ConfigurationTypes.periodical_tasks:
                return <PeriodicalTasksView />
            default:
                return 'foo';
        }
    }

    return (
        <Box sx={{ bgcolor: 'background.paper' }} >
            {   
                renderSwitch()
            }
    </Box>
  );
}