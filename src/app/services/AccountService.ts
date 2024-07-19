import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { getApiKey, getHost, SeriveProviders } from "../helpers/settings";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private host = getHost(SeriveProviders.FIREBASE);
    private apiKey = getApiKey(SeriveProviders.FIREBASE);

    constructor(public httpClient: HttpClient){}

    signIn(email: string, password: string):Observable<any> {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }),
          };
      
        return this.httpClient.post<any>(`${this.host}signInWithPassword?key=${this.apiKey}`, {
            email,
            password,
            returnSecureToken: true
        }, options);
    }

    signUp(email: string, password: string):Observable<any> {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }),
          };
      
        return this.httpClient.post<any>(`${this.host}signUp?key=${this.apiKey}`, {
            email,
            password,
            returnSecureToken: true
        }, options);
    }

    getUserData(idToken: string) {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }),
          };
      
        return this.httpClient.post<any>(`${this.host}lookup?key=${this.apiKey}`, {idToken}, options);
    }
}