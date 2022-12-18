import { LogMessage } from "./logMessage";

export interface LoggerState {
    sources: Array<string>
    selected_source: string,
    loaded_events: Array<LogMessage>, 
}