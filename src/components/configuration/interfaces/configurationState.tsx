import { ConfigurationTypes } from "../configurationTypes";
import { MeetingCategoryRow } from "../pages/meetingsCategoriesView";
import { CredentialModel } from "./credentialModel";

export interface ConfigurationState {
    credentials: CredentialModel | null,
    selected_type: ConfigurationTypes,
    meetings_categories: MeetingCategoryRow[],
    meeting_state: 'loading' | 'idle'
}