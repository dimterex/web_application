import axios from "axios";
import { REQUEST_URL } from "../../app/build";
import { GetCredentialsResponse } from "./messages/getCredentialResponse";
import { CredentialModel } from "../../components/configuration/interfaces/credentialModel";
import { MeetingCategoryModel } from "../../components/configuration/interfaces/meetingCategoryModel";
import { TaskCategoryModel } from "../../components/configuration/interfaces/taskCategoryModel";
import { SetCredentialsResponse } from "./messages/setCredentialResponse";
import { GetMeetingCategoriesResponse } from "./messages/getMeetingCategoriesResponse";
import { SetMeetingCategoriesResponse } from "./messages/setMeetingCategoriesResponse";
import { GeTaskCategoriesResponse } from "./messages/getTaskCategoriesResponse";
import { SetTaskCategoriesResponse } from "./messages/setTaskCategoriesResponse";

const CONFIGURATION_REQUEST_URL = `${REQUEST_URL}/configuration`


export async function getCredentials() {
    let res = await axios.get(`${CONFIGURATION_REQUEST_URL}/get_credentials`);
    return res.data as GetCredentialsResponse;
  }

export async function setCredentials(credentials: CredentialModel) {
  let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/set_credentials`, JSON.stringify(credentials));
  return res.data as SetCredentialsResponse;
}

export async function getMeetingCategories() {
  let res = await axios.get(`${CONFIGURATION_REQUEST_URL}/get_meeting_categories`);
  return res.data as GetMeetingCategoriesResponse;
}

export async function setMeetingCategories(categories: Array<MeetingCategoryModel>) {
  let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/set_meeting_categories`, JSON.stringify(categories));
  return res.data as SetMeetingCategoriesResponse;
}

export async function getTaskCategories() {
  let res = await axios.get(`${CONFIGURATION_REQUEST_URL}/get_task_categories`);
  return res.data as GeTaskCategoriesResponse;
}

export async function setTaskCategories(categories: Array<TaskCategoryModel>) {
  let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/set_task_categories`, JSON.stringify(categories));
  return res.data as SetTaskCategoriesResponse;
}
