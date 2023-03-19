import { DockerModel } from "../../../components/docker/dockerModel";

export interface GetContainerWithPortsResponse {
    status: 'ok' | 'error',
    exception: string | null,
    messages: Array<DockerModel>
}