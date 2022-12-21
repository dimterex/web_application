import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Meeting } from "./meeting";
import { selecSelectedDayState, selectMeetingsState, } from './meetingsSlice';

import { clear_worklog_message, getHistoryWorklogByDateAsync, selectWorklogResultState, setWorklogByDateAsync, SUCCESS_WORKLOG_TIME } from '../worklog/worklogSlice';
import moment from 'moment';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import { Paper, Tooltip } from '@mui/material';
import { WriteWorklogDialog } from './writeWorklogDialog';
import { HistoryWorklogByDayDialog } from './historyWorklogByDayDialog';
import { ClassesProps } from '../interfaces/commonComponentProps';

  
export function Meetengs(props: ClassesProps) {
    const [open, setOpen] = React.useState(false);
    const [applyDisabled, setApplyDisabled] = React.useState(false);
    
    const meetings_state = useAppSelector(selectMeetingsState);
    const selected_day_state = useAppSelector(selecSelectedDayState);
    const worklog_state = useAppSelector(selectWorklogResultState);
 
 
    const dispatch = useAppDispatch();

    let current_day = moment(selected_day_state);

    let current_day_duration = worklog_state.find(x => current_day.isSame(moment(x.date), 'date'))?.duration ?? 0;

    let isWrote = current_day_duration > SUCCESS_WORKLOG_TIME;

    const handleClickOpen = () => {
        dispatch(getHistoryWorklogByDateAsync(current_day));
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setApplyDisabled(false);
        dispatch(clear_worklog_message())
    };

    const handleApply = () => {
        dispatch(setWorklogByDateAsync(current_day));
        handleClose();
    }

    return  <div  className={props.classes}>
        <Accordion disableGutters>
            <AccordionSummary>
                <div className='grid-container'>                    
                    <div className='grid-child' >
                        {selected_day_state}
                    </div>
                    
                    <div className='grid-child last'>
                        <Tooltip title={current_day_duration}>
                            { isWrote ? <CheckCircleOutlineIcon onClick={handleClickOpen} /> : <DangerousOutlinedIcon onClick={handleClickOpen} /> }
                        </Tooltip>

                        { 
                            isWrote
                                ? <HistoryWorklogByDayDialog open={open} onClose={handleClose} />
                                : <WriteWorklogDialog open={open} onClose={handleClose} onApply={handleApply} applyDisabled={applyDisabled} />  
                        }
                    
                    </div>
                </div>
            </AccordionSummary>
        </Accordion>
    
        {
            meetings_state.map((meeting, index) => ( 
                <Meeting key={index} event={meeting} />
            ))
        }
    </div>
}

