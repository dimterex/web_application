import { DockerModel } from "./dockerModel";

export interface DockerState {
    status: 'loading' | 'idle',
    containers: DockerModel[],
}