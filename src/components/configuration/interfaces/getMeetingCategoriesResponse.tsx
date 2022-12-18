import { MeetingCategory } from "./meetingCategory";

export interface GetMeetingCategoriesResponse {
    status: 'ok' | 'error',
    exception: string | null,
    categories: Array<MeetingCategory>
}