import axios from "axios";
import { REQUEST_URL } from "../../app/build";
import { GetContainerWithPortsResponse } from "./messages/getContainerWithPortsResponse";


export async function getContainerWithPorts() {
    let res = await axios.get(`${REQUEST_URL}/get_container_with_ports`);
    return res.data as GetContainerWithPortsResponse;
  }
  