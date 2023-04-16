import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box } from "@mui/material";

import React from "react";
import { connect } from "react-redux";
import { RootState, AppDispatch } from "../../../../app/store";
import { clear_worklog_message, getHistoryWorklogByDateAsync } from "../../worklog/worklogSlice";
import { Moment } from "moment";

type Props = {
    history: Array<string>,
    open: boolean,
    day: Moment,
    onClose: () => void,

    initialize: (day: Moment) => void,
    clearHistoryMessage: () => void,
  };
  
  type State = {
    isOpen: boolean,    
  }
  
  const mapStateToProps = (state: RootState) => {
    return { 
        history: state.worklog.history_message
    };
  };
  
  const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        initialize: async (day: Moment) => {
            dispatch(getHistoryWorklogByDateAsync(day));
        },
        clearHistoryMessage: async () => {
            dispatch(clear_worklog_message());
        }
    };
  };
  
class HistoryWorklogByDayDialog extends React.Component<Props, State> {  
    
    constructor(props: Props) {
        super(props);
        this.state = { 
            isOpen: this.props.open,
        }
    }

    onCloseClick = () => {
        this.props.clearHistoryMessage();
        this.props.onClose();
    }

    componentDidUpdate() {

        if (this.props.open) {
            if (this.state.isOpen) {
                return;
            }

            this.setState({
                isOpen: true,
            });
            this.props.initialize(this.props.day);
        }
        else {
            if (!this.state.isOpen) {
                return;
            }

            this.setState({
                isOpen: false,
            });
        }
      }

     render() {

        return <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">

        <DialogTitle id="alert-dialog-title">
            {"History log"}
        </DialogTitle>

        {
           <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {
                    this.props.history.map((message, index) => ( 
                        <Box key={index}>{message}</Box>
                    ))
                }
                                        
            </DialogContentText>
           </DialogContent> 
        }
        <DialogActions>
            <Button onClick={ this.onCloseClick }>Close</Button>
        </DialogActions>
    </Dialog>

     }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryWorklogByDayDialog);
