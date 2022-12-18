import { Box, List, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ClassesProps } from "../interfaces/commonComponentProps";
import { change_selected_source, getLogHistoryForSourceAsync, selectLogSources, selectSelectedSource } from "./loggerSlice";

export function LogSourcesView(props: ClassesProps) {

    const dispatch = useAppDispatch();

    const handleListItemClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      title: string,
    ) => {
        dispatch(change_selected_source(title));
        dispatch(getLogHistoryForSourceAsync({
            source: title,
            count: 100,
        }))
    };

    let sources = useAppSelector(selectLogSources);
    let selectedSource = useAppSelector(selectSelectedSource);
  
    return (
      <Box className={props.classes} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folder">
            {
                sources.map((source, index) => ( 
                    <div key={index}>
                        <ListItemButton
                            selected={selectedSource == source}
                            onClick={(event) => handleListItemClick(event, source)}>
                            <ListItemText primary={source} />
                        </ListItemButton>
                        <Divider />

                    </div>
                ))
            }
        </List>
      </Box>
    );
}

