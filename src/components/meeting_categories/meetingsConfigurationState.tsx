import { MeetingCategoryModel } from "./meetingCategoryModel";

export interface MeetingsConfigurationState {
    meetings_categories: MeetingCategoryModel[],
    meeting_state: 'loading' | 'idle',
}