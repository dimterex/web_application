import { UrlModel } from "./urlModel";

export interface UrlsConfigurationState {
  
    url_state: 'loading' | 'idle',
    urls: UrlModel[],
}