import { TaskCategoryModel } from "../../../components/configuration/interfaces/taskCategoryModel";

export interface GeTaskCategoriesResponse {
    status: 'ok' | 'error',
    exception: string | null,
    categories: Array<TaskCategoryModel>
}