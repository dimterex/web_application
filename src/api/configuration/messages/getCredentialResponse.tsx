import { CredentialModel } from "../../../components/configuration_tab/credentials/credentialModel";

export interface GetCredentialsResponse {
    status: 'ok' | 'error',
    exception: string,
    credentials: CredentialModel,
}