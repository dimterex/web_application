import { TokenModel } from "../../../components/configuration/interfaces/tokenModel";

export interface GeTokensResponse {
    status: 'ok' | 'error',
    exception: string | null,
    tokens: Array<TokenModel>
}