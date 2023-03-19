import axios from "axios";
import { REQUEST_URL } from "../../app/build";
import { GetCredentialsResponse } from "./messages/getCredentialResponse";
import { BaseSetResponse } from "../base_set_response";
import { CredentialModel } from "../../components/configuration_tab/credentials/credentialModel";

export const CONFIGURATION_REQUEST_URL = `${REQUEST_URL}/configuration`


export async function getCredentials() {
    let res = await axios.get(`${CONFIGURATION_REQUEST_URL}/get_credentials`);
    return res.data as GetCredentialsResponse;
  }

export async function setCredentials(credentials: CredentialModel) {
  let res = await axios.put(`${CONFIGURATION_REQUEST_URL}/set_credentials`, JSON.stringify(credentials));
  return res.data as BaseSetResponse;
}
