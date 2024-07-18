import { environment } from "src/environments/environment";

export function getHost() {
    return `${environment.host}`;
}

export function getApiKey() {
    return `${environment.apiKey}`;
}