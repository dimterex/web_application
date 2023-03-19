import { TokenModel } from "./tokenModel";

export interface TokensConfigurationState {
    token_state: 'loading' | 'idle',
    tokens: TokenModel[],
}