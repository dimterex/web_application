import { CredentialModel } from "./credentialModel";

export interface CredentialsConfigurationState {
    state: 'loading' | 'idle',
    login: string,
    email: string,
    domain: string,
    password: string,
}