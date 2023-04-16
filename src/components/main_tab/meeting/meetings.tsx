import React from 'react';

import { SUCCESS_WORKLOG_TIME } from '../worklog/worklogSlice';
import moment, { Moment } from 'moment';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import { Box, Button, Paper, Tooltip } from '@mui/material';
import { MeetingsItem } from '../../../api/meetings/meetingsItem';
import { Widget } from '../../../common/widget/baseWidget';
import HistoryWorklogByDayDialog from './dialogs/historyWorklogByDayDialog';
import WriteWorklogDialog from './dialogs/writeWorklogByDayDialog';
import { connect } from 'react-redux';
import { RootState, AppDispatch } from '../../../app/store';
import { MonthTime } from '../../../api/statistics/messages/monthTimesResponse';
import { Meeting } from './meeting';


type Props = {
    day: Moment,
    events: MeetingsItem[],
    worklogs: MonthTime[],

    day_durtion: number,
    is_correct: boolean,
  };
  
  type State = {
    open: boolean,
  }
  
  const mapStateToProps = (state: RootState) => {
    let day_durtion = state.worklog.events.find(x => state.meetings.day.isSame(moment(x.date), 'date'))?.duration ?? 0;

    return { 
        events: state.meetings.events,
        day: state.meetings.day,
        worklogs: state.worklog.events,

        day_durtion: day_durtion,
        is_correct: day_durtion > SUCCESS_WORKLOG_TIME,
    };
  };
  
  const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        
    };
  };
  
class Meetengs extends React.Component<Props, State> {  
    
    constructor(props: Props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    Empty: MeetingsItem = {
        name: 'Нет событий',
        start_time: moment().toString(),
        duration: 24,
        categories: null,
        description: 'Empty',
        location: 'Home'
    };

    render() { 
        return <Widget>
            <Accordion disableGutters>
                <AccordionSummary>
                    <Box >
                        <Tooltip title={this.props.day_durtion} onClick={this.handleClickOpen} >
                            <Box display="flex">
                                { this.props.is_correct ? <CheckCircleOutlineIcon  /> : <DangerousOutlinedIcon /> }
     
                                <Box style={{marginLeft: "10px" }}>
                                    { this.props.day.format('LL') }
                                </Box>
                            </Box>
                        </Tooltip>

                        { 
                           
                            this.props.is_correct
                                ? <HistoryWorklogByDayDialog day={this.props.day} open={this.state.open} onClose={this.handleClose} />
                                : <WriteWorklogDialog open={this.state.open} onClose={this.handleClose} day={this.props.day} />  
                        }
                   
                    </Box>
                </AccordionSummary>
            </Accordion>
        
            {
                this.props.events.length > 0
                    ? this.props.events.map((meeting, index) => ( 
                        <Meeting key={index} event={meeting} />
                    ))
                    :  <Meeting key={0} event={ this.Empty } />
            }
        </Widget>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Meetengs);
