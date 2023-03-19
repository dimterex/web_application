import { UrlModel } from "../../../components/urls/urlModel";

export interface GeUrlsResponse {
    status: 'ok' | 'error',
    exception: string | null,
    urls: UrlModel[],
}