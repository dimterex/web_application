import { LogMessage } from "./logMessage";

export interface LogHistoryForSourceResponse {
    status: 'ok' | 'error',
    messages: Array<LogMessage> | null,
    exception: string | null,
}
