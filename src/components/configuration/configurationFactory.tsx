import { Box } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectSelectedType } from "./configurationSlice";
import { ConfigurationTypes } from "./configurationTypes";
import CredentionalView from "./pages/credentionalView";
import MeetingsCategorieslView from "./pages/meetingsCategoriesView";
import PeriodicalTasksView from "./pages/periodicalTasksView";
import TaskCategorieslView from "./pages/taskCategoriesView";
import TokenslView from "./pages/tokenslView";
import UrlslView from "./pages/urlslView";

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