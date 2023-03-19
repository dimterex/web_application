import { PeriodicalTaskModel } from "../../../components/configuration_tab/periodical_tasks/periodicalTaskModel";

export interface GetPeriodicalTasksResponse {
    status: 'ok' | 'error',
    exception: string | null,
    tasks: Array<PeriodicalTaskModel>
}