import { UrlModel } from "../../../components/configuration/interfaces/urlModel";

export interface GeUrlsResponse {
    status: 'ok' | 'error',
    exception: string | null,
    urls: UrlModel[],
}