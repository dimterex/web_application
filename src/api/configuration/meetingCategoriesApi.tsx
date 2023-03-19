import axios from "axios";
import { BaseSetResponse } from "../base_set_response";
import { CONFIGURATION_REQUEST_URL } from "./credentialsApi";
import { GetMeetingCategoriesResponse } from "../meetings/getMeetingCategoriesResponse";
import { MeetingCategoryModel } from "../../components/configuration_tab/meeting_categories/meetingCategoryModel";

export async function getMeetingCategories() {
    let res = await axios.get(`${CONFIGURATION_REQUEST_URL}/get_meeting_categories`);
    return res.data as GetMeetingCategoriesResponse;
}
  
export async function setMeetingCategories(categories: Array<MeetingCategoryModel>) {
    let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/set_meeting_categories`, JSON.stringify(categories));
    return res.data as BaseSetResponse;
}

export async function addNewMeetingCategory() {
    let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/add_new_meeting_category`);
    return res.data as BaseSetResponse;
}

export async function removeMeetingCategories(categories: Array<number>) {
    let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/remove_meeting_categories`, JSON.stringify(categories));
    return res.data as BaseSetResponse;
}