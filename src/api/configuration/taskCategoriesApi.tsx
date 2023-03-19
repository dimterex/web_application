import axios from "axios";
import { TaskCategoryModel } from "../../components/configuration_tab/task_categories/taskCategoryModel";
import { BaseSetResponse } from "../base_set_response";
import { CONFIGURATION_REQUEST_URL } from "./credentialsApi";
import { GeTaskCategoriesResponse } from "./messages/getTaskCategoriesResponse";

export async function getTaskCategories() {
    let res = await axios.get(`${CONFIGURATION_REQUEST_URL}/get_task_categories`);
    return res.data as GeTaskCategoriesResponse;
  }
  
  export async function setTaskCategories(categories: TaskCategoryModel[]) {
    let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/set_task_categories`, JSON.stringify(categories));
    return res.data as BaseSetResponse;
  }

export async function addNewTaskCategory() {
    let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/add_new_task_category`);
    return res.data as BaseSetResponse;
}

export async function removeTaskCategories(categories: Array<number>) {
    let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/remove_task_categories`, JSON.stringify(categories));
    return res.data as BaseSetResponse;
}
