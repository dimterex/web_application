export interface MonthTimesResponse {
    status: 'ok' | 'error',
    messages: Array<MonthTime> | null,
    exception: string | null,
}

export interface MonthTime {
    date: string;
    duration: number;
}