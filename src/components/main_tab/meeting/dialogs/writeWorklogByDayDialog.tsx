import { Dialog, DialogTitle, DialogActions, Button, Box, DialogContent, DialogContentText } from "@mui/material";
import { Moment } from "moment";
import React from "react";
import { connect } from "react-redux";
import { RootState, AppDispatch } from "../../../../app/store";
import { setWorklogByDateAsync } from "../../worklog/worklogSlice";

type Props = {
    open: boolean,
    day: Moment,
    onClose: () => void,
    writeDateTime: (day: Moment) => void,
  };
  
  type State = {
  }
  
  const mapStateToProps = (state: RootState) => {
    return { 
    };
  };
  
  const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        writeDateTime: async (day: Moment) => {
            dispatch(setWorklogByDateAsync(day));
        }
    };
  };
  
class WriteWorklogByDayDialog extends React.Component<Props, State> {  
    
    constructor(props: Props) {
        super(props);
    }

    onCloseClick = () => {
        this.props.onClose();
    }

    onApplyClick = () => {
        this.props.writeDateTime(this.props.day);
        this.onCloseClick();
    }

    render() {
        return <Dialog
            open={this.props.open}
            onClose={this.props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">

            <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to write off the time for a given day?"}
            </DialogTitle>
            <DialogActions>
                <Button onClick={this.onCloseClick}>Disagree</Button>
                <Button onClick={this.onApplyClick} autoFocus>Agree</Button>
            </DialogActions>
        </Dialog>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WriteWorklogByDayDialog);
