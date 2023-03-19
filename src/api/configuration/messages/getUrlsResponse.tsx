import { UrlModel } from "../../../components/configuration_tab/urls/urlModel";

export interface GeUrlsResponse {
    status: 'ok' | 'error',
    exception: string | null,
    urls: UrlModel[],
}