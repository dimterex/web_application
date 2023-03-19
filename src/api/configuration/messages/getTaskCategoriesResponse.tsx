import { TaskCategoryModel } from "../../../components/configuration_tab/task_categories/taskCategoryModel";

export interface GeTaskCategoriesResponse {
    status: 'ok' | 'error',
    exception: string | null,
    categories: Array<TaskCategoryModel>
}