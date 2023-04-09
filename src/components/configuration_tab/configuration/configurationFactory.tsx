import { Box } from "@mui/material";
import { selectSelectedType } from "./configurationSlice";
import { ConfigurationTypes } from "./configurationTypes";
import UrlslView from "../urls/urlslView";
import TokenslView from "../tokens/tokenslView";

import TaskCategorieslView from "../task_categories/taskCategoriesView"
import MeetingsCategorieslView from "../meeting_categories/meetingsCategoriesView"
import SyncHistorylView from "../syncHistory/syncHistorylView";
import { useAppSelector } from "../../../app/hooks";
import CredentionalView from "../credentials/credentionalView";
import PeriodicalTasksView from "../periodical_tasks/periodicalTasksView";

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
            case ConfigurationTypes.sync_history:
                return  <SyncHistorylView />
            default:
                return <Box />
        }
    }

    return ( 
        <Box>
            {   
                renderSwitch()
            }
    </Box>
  );
}