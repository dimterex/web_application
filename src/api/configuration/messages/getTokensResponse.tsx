import { TokenModel } from "../../../components/tokens/tokenModel";

export interface GeTokensResponse {
    status: 'ok' | 'error',
    exception: string | null,
    tokens: Array<TokenModel>
}