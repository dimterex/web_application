import { SyncHistoryItem } from "./syncHistoryItem";

export interface SyncHistoryResponse {
    items: SyncHistoryItem[] | null,
    status: 'ok' | 'error',
    exception: string | null,
}