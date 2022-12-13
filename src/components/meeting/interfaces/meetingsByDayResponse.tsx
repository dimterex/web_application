import { MeetingsItem } from "../meetingsSlice";

export interface MeetingsByDayResponse {
    messages: MeetingsItem[] | null,
    status: 'ok' | 'error',
    exception: string | null,
}