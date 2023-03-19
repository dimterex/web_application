import { MeetingCategoryModel } from "../../components/configuration_tab/meeting_categories/meetingCategoryModel";

export interface GetMeetingCategoriesResponse {
    status: 'ok' | 'error',
    exception: string | null,
    categories: Array<MeetingCategoryModel>
}