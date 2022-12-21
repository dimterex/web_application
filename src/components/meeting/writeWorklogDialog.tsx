import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { WriteWorklogDialogInterface } from "./interfaces/writeWorklogByDayDialogInterface";

export function WriteWorklogDialog(props: WriteWorklogDialogInterface) {

    return  <Dialog
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to write off the time for a given day?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={props.onClose}>Disagree</Button>
                    <Button disabled={props.applyDisabled} onClick={props.onApply} autoFocus>Agree</Button>
                </DialogActions>
            </Dialog>

}
