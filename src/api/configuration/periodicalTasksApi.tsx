import axios from "axios";
import { PeriodicalTaskModel } from "../../components/configuration_tab/periodical_tasks/periodicalTaskModel";
import { BaseSetResponse } from "../base_set_response";
import { CONFIGURATION_REQUEST_URL } from "./credentialsApi";
import { GetPeriodicalTasksResponse } from "./messages/getPeriodicalTasksResponse";


export async function getPeriodicalTasks() {
  let res = await axios.get(`${CONFIGURATION_REQUEST_URL}/get_periodical_tasks`);
  return res.data as GetPeriodicalTasksResponse;
}

export async function setPeriodicalTasks(tasks: PeriodicalTaskModel[]) {
  let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/set_periodical_tasks`, JSON.stringify(tasks));
  return res.data as BaseSetResponse;
}

export async function addNewPeriodicalTask() {
    let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/add_new_periodical_task`);
    return res.data as BaseSetResponse;
}

export async function removePeriodicalTasks(categories: Array<number>) {
    let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/remove_periodical_tasks`, JSON.stringify(categories));
    return res.data as BaseSetResponse;
}
