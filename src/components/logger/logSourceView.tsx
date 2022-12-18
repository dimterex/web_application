import { Box, List, ListItemButton, ListItemIcon, ListItemText, Divider, Stack, makeStyles } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ClassesProps } from "../interfaces/commonComponentProps";
import { selectLoadedEventsSource, selectSelectedSource } from "./loggerSlice";

import { DataGrid, GridCallbackDetails, GridColDef, GridRowParams, GridRowSpacingParams, GridToolbar, GridValueGetterParams, MuiEvent } from '@mui/x-data-grid';
import { LogMessage } from "./interfaces/logMessage";
import { nameofFactory } from "../../app/helper";
import {v4 as uuidv4} from 'uuid';


export function LogSelectedSourceView(props: ClassesProps) {

    const nameOfLogMessage = nameofFactory<LogMessage>();
    let loadedEventsSource = useAppSelector(selectLoadedEventsSource);

    const columns: GridColDef[] = [
        { field: nameOfLogMessage('datetime'), headerName: nameOfLogMessage('datetime'), flex: 1,  },
        { field: nameOfLogMessage('level'), headerName: nameOfLogMessage('level') },
        { field: nameOfLogMessage('tag'), headerName: nameOfLogMessage('tag') },
        { field: nameOfLogMessage('message'), headerName: nameOfLogMessage('message'), flex: 4 },
      ];

      const getRowSpacing = React.useCallback((params: GridRowSpacingParams) => {
        return {
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        };
      }, []);


  
    return (<Box>
              <DataGrid
                    autoHeight
                    hideFooter
                    density='compact'
                    getRowHeight={() => 'auto'}
                    getRowId={(row) => uuidv4()}
                    rows={loadedEventsSource}
                    columns={columns}
                    getRowSpacing={getRowSpacing}
                />
        </Box>
    );
}