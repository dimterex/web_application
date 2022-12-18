export interface LogSourcesResponse {
    status: 'ok' | 'error',
    sources: Array<string> | null,
    exception: string | null,
}