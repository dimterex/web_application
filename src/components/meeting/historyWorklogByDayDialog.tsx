import { HistoryWorklogByDayDialogInterface } from "./interfaces/historyWorklogByDayDialogInterface";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectHistoryWorklogResultState } from "../worklog/worklogSlice";

export function HistoryWorklogByDayDialog(props: HistoryWorklogByDayDialogInterface) {

    const history_result_message = useAppSelector(selectHistoryWorklogResultState);
    var messages = new Array<string>;

    history_result_message?.forEach(element => {
        console.log(element);
        element.split("\n").forEach(row => {
            messages.push(row);
        })
    });
 
    
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
                {
                    messages.map((message, index) => ( 
                        <Box key={index}>{message}</Box>
                    ))
                }
                                           
               </DialogContentText>
               </DialogContent> 
            }

            <DialogActions>
                <Button onClick={props.onClose}>Close</Button>
            </DialogActions>
        </Dialog>
}