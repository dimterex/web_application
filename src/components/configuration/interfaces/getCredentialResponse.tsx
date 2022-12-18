import { CredentialModel } from "./credentialModel";

export interface GetCredentialsResponse {
    status: 'ok' | 'error',
    exception: string,
    credentials: CredentialModel,
}