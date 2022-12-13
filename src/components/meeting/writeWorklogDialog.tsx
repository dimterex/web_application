import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { selectWorklogResultMessageState } from "../worklog/worklogSlice";
import { WriteWorklogDialogInterface } from "./interfaces/writeWorklogByDayDialogInterface";
import { useAppSelector } from '../../app/hooks';

export function WriteWorklogDialog(props: WriteWorklogDialogInterface) {

    const worklog_result_message = useAppSelector(selectWorklogResultMessageState);

    return  <Dialog
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to write off the time for a given day?"}
                </DialogTitle>

                {
                    worklog_result_message == null
                    ? null 
                    : <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            { worklog_result_message }                                        
                        </DialogContentText>
                        </DialogContent> 
                }

                <DialogActions>
                    <Button onClick={props.onClose}>Disagree</Button>
                    {worklog_result_message == null ? <Button disabled={props.applyDisabled} onClick={props.onApply} autoFocus>Agree</Button> : null}
                    
                </DialogActions>
            </Dialog>

}
