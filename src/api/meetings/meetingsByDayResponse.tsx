import { MeetingsItem } from "./meetingsItem";

export interface MeetingsByDayResponse {
    messages: MeetingsItem[] | null,
    status: 'ok' | 'error',
    exception: string | null,
}