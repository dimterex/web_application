import { DockerModel } from "../../../components/main_tab/docker/interfaces/dockerModel";

export interface GetContainerWithPortsResponse {
    status: 'ok' | 'error',
    exception: string | null,
    messages: Array<DockerModel>
}