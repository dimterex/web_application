export interface WriteWorklogDialogInterface {
    open: boolean,
    onClose: () => void,
    onApply: () => void,
    applyDisabled: boolean,
}