import moment from "moment";

export interface SyncHistoryItem {
    id: number,
    login: string,
    timestamp: moment.Moment,
    action: 'Removed' | 'Uploaded' | 'Removed dictionaries' | 'Download',
    file: string,
}