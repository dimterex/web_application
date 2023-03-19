import { TokenModel } from "../../../components/configuration_tab/tokens/tokenModel";

export interface GeTokensResponse {
    status: 'ok' | 'error',
    exception: string | null,
    tokens: Array<TokenModel>
}