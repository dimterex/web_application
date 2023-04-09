import { Box, List, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { change_selected_type, selectSelectedType } from "./configurationSlice";
import { ConfigurationTypes } from "./configurationTypes";

export function ConfigurationsContainer() {

    const dispatch = useAppDispatch();
    let oldState = -1;

    const handleListItemClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      title: ConfigurationTypes,
    ) => {
        if (oldState == title)
            return;
        oldState = title;
        dispatch(change_selected_type(title));
    };
    
    let types = new Array<ConfigurationTypes>();
    types.push(ConfigurationTypes.credentials);
    types.push(ConfigurationTypes.outlook_categories);
    types.push(ConfigurationTypes.todoist_categories);
    types.push(ConfigurationTypes.tokens);
    types.push(ConfigurationTypes.urls);
    types.push(ConfigurationTypes.periodical_tasks);
    types.push(ConfigurationTypes.sync_history);

   
    let selectedSource = useAppSelector(selectSelectedType);
  
    return ( 
    <Box>
        <Divider />
        <List component="nav">
            {
                types.map((source, index) => (
                    <Box key={index}>
                        <ListItemButton
                            selected={selectedSource == source }
                            onClick={(event) => handleListItemClick(event, source)}>
                        <ListItemText primary={ConfigurationTypes[source]} />
                        </ListItemButton>
                        <Divider />
                    </Box>
                ))
            }
        </List>
    </Box>
    );
}
