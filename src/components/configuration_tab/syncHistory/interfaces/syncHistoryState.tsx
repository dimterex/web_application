import { SyncHistoryItem } from "../../../../api/sync/syncHistoryItem";

export interface SyncState {
    events: SyncHistoryItem[],
    state: 'loading' | 'idle',
}