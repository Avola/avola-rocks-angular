import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as Globals from './globals';

@Injectable()
export class AvolaClientService {
    private baseUrl: string;
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(
        private http: Http
    ) {
        this.baseUrl = Globals.baseUri;
    }

    checkPolicyCoverage(obj: Object): Observable<Object> {
        return this.http.post(this.baseUrl + '/Travel/checkpolicycoverage', obj, this.options)
            .map(this.extractData);
    }

    checkObjectCoverage(obj: Object): Observable<Object> {
        return this.http.post(this.baseUrl + '/Travel/checkobjectcoverage', obj, this.options)
            .map(this.extractData);
    }

    listAllDecisions(): Observable<Object> {
        return this.http.get(this.baseUrl + '/travel/listallservices', this.options)
            .map(this.extractData);
    }

    private extractData(res: Response) {
        return res.json();
    }



}