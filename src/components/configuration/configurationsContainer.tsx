import { Box, List, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ClassesProps } from "../interfaces/commonComponentProps";
import { change_selected_type, getCredentialsAsync, getMeetingCategoriesAsync, selectSelectedType } from "./configurationSlice";
import { ConfigurationTypes } from "./configurationTypes";

export function ConfigurationsContainer(props: ClassesProps) {

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

   
    let selectedSource = useAppSelector(selectSelectedType);
  
    return (
      <Box className={props.classes} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Divider />
  
        <List component="nav" aria-label="secondary mailbox folder">
            {
                types.map((source, index) => ( 
                    <div key={index}>
                        <ListItemButton
                            selected={selectedSource == source }
                            onClick={(event) => handleListItemClick(event, source)}>
                            <ListItemText primary={ConfigurationTypes[source]} />
                        </ListItemButton>
                        <Divider />

                    </div>
                ))
            }
        </List>
      </Box>
    );
}

