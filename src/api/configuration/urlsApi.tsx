import axios from "axios";
import { UrlModel } from "../../components/urls/urlModel";
import { BaseSetResponse } from "../base_set_response";
import { CONFIGURATION_REQUEST_URL } from "./credentialsApi";
import { GeUrlsResponse } from "./messages/getUrlsResponse";


export async function getUrls() {
  let res = await axios.get(`${CONFIGURATION_REQUEST_URL}/get_urls`);
  return res.data as GeUrlsResponse;
}

export async function setUrls(urls: UrlModel[]) {
  let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/set_urls`, JSON.stringify(urls));
  return res.data as BaseSetResponse;
}

export async function addNewUrl() {
    let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/add_new_url`);
    return res.data as BaseSetResponse;
}

export async function removeUrls(categories: Array<number>) {
    let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/remove_urls`, JSON.stringify(categories));
    return res.data as BaseSetResponse;
}
