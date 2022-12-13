import { HistoryWorklogByDayDialogInterface } from "./interfaces/historyWorklogByDayDialogInterface";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectHistoryWorklogResultState } from "../worklog/worklogSlice";

export function HistoryWorklogByDayDialog(props: HistoryWorklogByDayDialogInterface) {

    const history_result_message = useAppSelector(selectHistoryWorklogResultState);
 
    
    return  <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">

            <DialogTitle id="alert-dialog-title">
                {"History log"}
            </DialogTitle>

            {
               <DialogContent>
               <DialogContentText id="alert-dialog-description">
                   { history_result_message }                                        
               </DialogContentText>
               </DialogContent> 
            }

            <DialogActions>
                <Button onClick={props.onClose}>Close</Button>
            </DialogActions>
        </Dialog>
}