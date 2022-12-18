import { Box } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getCredentialsAsync, selectCredentials, selectSelectedType } from "./configurationSlice";
import { ConfigurationTypes } from "./configurationTypes";
import CredentionalView from "./pages/credentionalView";
import MeetingsCategorieslView from "./pages/meetingsCategoriesView";
import {v4 as uuidv4} from 'uuid';

export function ConfigurationFactory() {

    //const dispatch = useAppDispatch();
    let selectedSource = useAppSelector(selectSelectedType);
    let credentionals = useAppSelector(selectCredentials);
    //let meetingCategories = useAppSelector(selectMeetingCategories);

    const renderSwitch = function() {
        switch(selectedSource) {
            case ConfigurationTypes.credentials:
                return <CredentionalView  />;
            case ConfigurationTypes.outlook_categories:
                return <MeetingsCategorieslView   />
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