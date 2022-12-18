import axios from "axios";
import { REQUEST_URL } from "../../app/build";
import { GetCredentialsResponse } from "./interfaces/getCredentialResponse";
import { CredentialModel } from "./interfaces/credentialModel";
import { GetMeetingCategoriesResponse } from "./interfaces/getMeetingCategoriesResponse";
import { SetMeetingCategoriesResponse } from "./interfaces/setMeetingCategoriesResponse";
import { SetCredentialsResponse } from "./interfaces/setCredentialResponse copy";
import { MeetingCategory } from "./interfaces/meetingCategory";

export async function getCredentials() {
    let res = await axios.get(`${REQUEST_URL}/get_credentials`);
    return res.data as GetCredentialsResponse;
  }

export async function setCredentials(credentials: CredentialModel) {
  let res = await axios.put(`${REQUEST_URL}/set_credentials`, JSON.stringify(credentials));
  return res.data as SetCredentialsResponse;
}

export async function getMeetingCategories() {
  let res = await axios.get(`${REQUEST_URL}/get_meeting_categories`);
  return res.data as GetMeetingCategoriesResponse;
}

export async function setMeetingCategories(categories: Array<MeetingCategory>) {
  let res = await axios.put(`${REQUEST_URL}/set_meeting_categories`, JSON.stringify(categories));
  return res.data as SetMeetingCategoriesResponse;
}
