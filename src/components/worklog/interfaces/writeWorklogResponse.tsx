export interface WriteWorklogResponse {
    status: 'ok' | 'error',
    message: string | null,
    exception: string | null,
}