import { TaskCategoryModel } from "../../../components/task_categories/taskCategoryModel";

export interface GeTaskCategoriesResponse {
    status: 'ok' | 'error',
    exception: string | null,
    categories: Array<TaskCategoryModel>
}