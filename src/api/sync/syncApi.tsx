import axios from "axios";
import { REQUEST_URL } from "../../app/build";
import { SyncHistoryResponse } from "./syncHistoryResponse";


export async function getHistoryRequest() {
  let res = await axios.get(`${REQUEST_URL}/sync/history`);
  return res.data as SyncHistoryResponse;
}
