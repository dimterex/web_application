import { MeetingCategoryModel } from "../../../components/configuration/interfaces/meetingCategoryModel";

export interface GetMeetingCategoriesResponse {
    status: 'ok' | 'error',
    exception: string | null,
    categories: Array<MeetingCategoryModel>
}