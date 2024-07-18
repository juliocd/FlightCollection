import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { getApiKey, getHost, getToken, SeriveProviders } from "../helpers/settings";
import IFlight from "../models/IFlight";

@Injectable({
    providedIn: 'root'
})
export class FlightService {
    private host = getHost(SeriveProviders.MONSETER_RESERVATION_GROUP);
    private token = getToken(SeriveProviders.MONSETER_RESERVATION_GROUP);

    constructor(public httpClient: HttpClient){}

    flightInfoChallenge(flight: IFlight) {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'candidate': 'Julio Diaz',
              'token': this.token
            }),
          };
      
        return this.httpClient.post<any>(`${this.host}/flightInfoChallenge`, flight, options);
    }

}