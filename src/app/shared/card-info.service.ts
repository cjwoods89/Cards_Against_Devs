import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

import { Http, Response } from '@angular/http'; //this is the response, data we are getting back
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class CardService {

    //Need to edit the URL to not include the auth code. User should receive that when they login
    private baseUrl: string = 'https://cah-devs.firebaseio.com/.json?auth=PGaZZQdruEaxw8jSt0ws2NIKClpRvgOiMZdegpM3';


    constructor(private http: Http) { }

    getCards(): Observable<any>{
        let apiUrl = `${this.baseUrl}`;
        console.log(apiUrl);
        return this.http.get(apiUrl)
          .map(this.extractData)   // "maps" the success- show the results
          .catch(this.handleError);
    }

    private extractData(res: Response) {
        let results = res.json();
        return results || [];
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            if(error.status === 0){
                errMsg = "Error connecting to API"
            }else{
                const errorJSON = error.json();
                errMsg = `${errorJSON.code} - ${errorJSON.message}`;
            }
        }

        return Observable.throw(errMsg);
    }

}
