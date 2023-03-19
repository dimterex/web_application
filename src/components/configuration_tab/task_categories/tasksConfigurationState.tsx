import { TaskCategoryModel } from "./taskCategoryModel";

export interface TasksConfigurationState {
    task_categories: TaskCategoryModel[],
    tasks_state: 'loading' | 'idle',
}