import { PeriodicalTaskModel } from "../../../components/configuration/interfaces/periodicalTaskModel";

export interface GetPeriodicalTasksResponse {
    status: 'ok' | 'error',
    exception: string | null,
    tasks: Array<PeriodicalTaskModel>
}