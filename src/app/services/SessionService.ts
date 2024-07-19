import { Injectable } from "@angular/core";
import IUser from "../models/IUser";
import IAuthenticationInfo from "../models/IAuthenticationInfo";

const sessionStorageKey = "fc_key"

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private userSession: IUser | null = null;
    private authenticationInfo: IAuthenticationInfo | null = null;

    setUserSession(user: IUser) {
        this.userSession = user;
    }

    setSession(authenticationInfo: IAuthenticationInfo) {
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(authenticationInfo));
        this.authenticationInfo = authenticationInfo;
    }

    getSession(): IAuthenticationInfo | null {
        const sessionToken = sessionStorage.getItem(sessionStorageKey);

        if (!sessionToken) {
            return null;
        }

        const sessionData = <IAuthenticationInfo>JSON.parse(sessionToken);
        if (!sessionData.idToken) {
            return null;
        }

        return sessionData;
    }

    destroySession() {
        sessionStorage.removeItem(sessionStorageKey);
        this.userSession = null;
    }

};