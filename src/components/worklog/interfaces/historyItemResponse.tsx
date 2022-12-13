export interface HistoryItemResponse {
    status: 'ok' | 'error',
    messages: Array<string> | null,
    exception: string | null,
}