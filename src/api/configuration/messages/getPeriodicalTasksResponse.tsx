import { PeriodicalTaskModel } from "../../../components/periodical_tasks/periodicalTaskModel";

export interface GetPeriodicalTasksResponse {
    status: 'ok' | 'error',
    exception: string | null,
    tasks: Array<PeriodicalTaskModel>
}