import { Box } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectSelectedType } from "./configurationSlice";
import { ConfigurationTypes } from "./configurationTypes";
import CredentionalView from "./pages/credentionalView";
import MeetingsCategorieslView from "./pages/meetingsCategoriesView";
import TaskCategorieslView from "./pages/taskCategoriesView";

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