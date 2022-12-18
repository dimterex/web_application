import axios from "axios";
import { REQUEST_URL } from "../../app/build";
import { LogHistoryForSourceResponse } from "./interfaces/logHistoryForSourceResponse";
import { LogSourcesResponse } from "./interfaces/logSourcesResponse";

export async function getLogSources() {
    let res = 
     await axios({
      url: `${REQUEST_URL}/get_log_sources`,
      method: 'get',
    });
    return res.data as LogSourcesResponse;
  }
  

  export async function getLogHistoryForSource(source: string, count: number) {
    let res = 
     await axios({
      url: `${REQUEST_URL}/get_log_history_for_source?source=${source}&count=${count}`,
      method: 'get',
    });
    return res.data as LogHistoryForSourceResponse;
  }
  