import axios from "axios";
import { REQUEST_URL } from "../../app/build";
import { GetCredentialsResponse } from "./messages/getCredentialResponse";
import { CredentialModel } from "../../components/configuration/interfaces/credentialModel";
import { MeetingCategoryModel } from "../../components/configuration/interfaces/meetingCategoryModel";
import { TaskCategoryModel } from "../../components/configuration/interfaces/taskCategoryModel";
import { GetMeetingCategoriesResponse } from "./messages/getMeetingCategoriesResponse";
import { GeTaskCategoriesResponse } from "./messages/getTaskCategoriesResponse";
import { GeTokensResponse } from "./messages/getTokensResponse";
import { BaseSetResponse } from "../base_set_response";
import { TokenModel } from "../../components/configuration/interfaces/tokenModel";
import { UrlModel } from "../../components/configuration/interfaces/urlModel";
import { GeUrlsResponse } from "./messages/getUrlsResponse";
import { PeriodicalTaskModel } from "../../components/configuration/interfaces/periodicalTaskModel";
import { GetPeriodicalTasksResponse } from "./messages/getPeriodicalTasksResponse";

const CONFIGURATION_REQUEST_URL = `${REQUEST_URL}/configuration`


export async function getCredentials() {
    let res = await axios.get(`${CONFIGURATION_REQUEST_URL}/get_credentials`);
    return res.data as GetCredentialsResponse;
  }

export async function setCredentials(credentials: CredentialModel) {
  let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/set_credentials`, JSON.stringify(credentials));
  return res.data as BaseSetResponse;
}

export async function getMeetingCategories() {
  let res = await axios.get(`${CONFIGURATION_REQUEST_URL}/get_meeting_categories`);
  return res.data as GetMeetingCategoriesResponse;
}

export async function setMeetingCategories(categories: Array<MeetingCategoryModel>) {
  let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/set_meeting_categories`, JSON.stringify(categories));
  return res.data as BaseSetResponse;
}

export async function getTaskCategories() {
  let res = await axios.get(`${CONFIGURATION_REQUEST_URL}/get_task_categories`);
  return res.data as GeTaskCategoriesResponse;
}

export async function setTaskCategories(categories: TaskCategoryModel[]) {
  let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/set_task_categories`, JSON.stringify(categories));
  return res.data as BaseSetResponse;
}

export async function getTokens() {
  let res = await axios.get(`${CONFIGURATION_REQUEST_URL}/get_tokens`);
  return res.data as GeTokensResponse;
}

export async function setTokens(tokens: TokenModel[]) {
  let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/set_tokens`, JSON.stringify(tokens));
  return res.data as BaseSetResponse;
}

export async function getUrls() {
  let res = await axios.get(`${CONFIGURATION_REQUEST_URL}/get_urls`);
  return res.data as GeUrlsResponse;
}

export async function setUrls(tokens: UrlModel[]) {
  let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/set_urls`, JSON.stringify(tokens));
  return res.data as BaseSetResponse;
}

export async function getPeriodicalTasks() {
  let res = await axios.get(`${CONFIGURATION_REQUEST_URL}/get_periodical_tasks`);
  return res.data as GetPeriodicalTasksResponse;
}

export async function setPeriodicalTasks(tasks: PeriodicalTaskModel[]) {
  let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/set_periodical_tasks`, JSON.stringify(tasks));
  return res.data as BaseSetResponse;
}