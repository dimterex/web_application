import axios from "axios";
import { TokenModel } from "../../components/configuration_tab/tokens/tokenModel";
import { BaseSetResponse } from "../base_set_response";
import { CONFIGURATION_REQUEST_URL } from "./credentialsApi";
import { GeTokensResponse } from "./messages/getTokensResponse";


export async function getTokens() {
  let res = await axios.get(`${CONFIGURATION_REQUEST_URL}/get_tokens`);
  return res.data as GeTokensResponse;
}

export async function setTokens(tokens: TokenModel[]) {
  let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/set_tokens`, JSON.stringify(tokens));
  return res.data as BaseSetResponse;
}

export async function addNewToken() {
    let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/add_new_token`);
    return res.data as BaseSetResponse;
}

export async function removeTokens(categories: Array<number>) {
    let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/remove_tokens`, JSON.stringify(categories));
    return res.data as BaseSetResponse;
}
