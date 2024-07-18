import { environment } from "src/environments/environment";

export enum SeriveProviders {
    FIREBASE = 'firebase',
    MONSETER_RESERVATION_GROUP = 'mosnterReservationGroup'
}

export function getHost(provider: SeriveProviders): string {
    return environment[provider] ? `${environment[provider].host}` : '';
}

export function getApiKey(provider: SeriveProviders): string {
    return environment[provider] ? `${environment[provider].apiKey}` : '';
}

export function getToken(provider: SeriveProviders) {
    return environment[provider] ?  `${environment[provider].token}` : '';
}