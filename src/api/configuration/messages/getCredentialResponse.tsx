import { CredentialModel } from "../../../components/configuration/interfaces/credentialModel";

export interface GetCredentialsResponse {
    status: 'ok' | 'error',
    exception: string,
    credentials: CredentialModel,
}