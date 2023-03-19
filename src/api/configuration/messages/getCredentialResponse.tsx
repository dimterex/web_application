import { CredentialModel } from "../../../components/credentials/credentialModel";

export interface GetCredentialsResponse {
    status: 'ok' | 'error',
    exception: string,
    credentials: CredentialModel,
}