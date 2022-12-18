import { ConfigurationTypes } from "../configurationTypes";
import { MeetingCategoryRow } from "../pages/meetingsCategoriesView";
import { TaskCategoryRow } from "../pages/taskCategoriesView";
import { CredentialModel } from "./credentialModel";

export interface ConfigurationState {
    credentials: CredentialModel | null,
    selected_type: ConfigurationTypes,

    meetings_categories: MeetingCategoryRow[],
    meeting_state: 'loading' | 'idle',

    task_categories: TaskCategoryRow[],
    task_state: 'loading' | 'idle',
}