import { ConfigurationTypes } from "../configurationTypes";
import { MeetingCategoryRow } from "../pages/meetingsCategoriesView";
import { TaskCategoryRow } from "../pages/taskCategoriesView";
import { CredentialModel } from "./credentialModel";
import { PeriodicalTaskModelRow } from "./periodicalTaskModelRow";
import { TokenModelRow } from "./tokenModelRow";
import { UrlModelRow } from "./urlModelRow";

export interface ConfigurationState {
    credentials: CredentialModel | null,
    selected_type: ConfigurationTypes,

    meetings_categories: MeetingCategoryRow[],
    meeting_state: 'loading' | 'idle',

    task_categories: TaskCategoryRow[],
    task_state: 'loading' | 'idle',


    token_state: 'loading' | 'idle',
    tokens: TokenModelRow[],
  
    url_state: 'loading' | 'idle',
    urls: UrlModelRow[],


    periodical_tasks_state: 'loading' | 'idle',
    periodical_tasks: PeriodicalTaskModelRow[],
}