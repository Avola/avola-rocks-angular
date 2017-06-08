import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as Globals from './globals';
import { DecisionServiceVersionDescription } from '../contracts/DecisionServiceVersionDescription';

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

    getTravelPolicyCoverageDecision(): Observable<DecisionServiceVersionDescription> {
        return this.http.get(this.baseUrl + '/travel/getdecisionserviceversiondescription/' + 5 + '/' + 1, this.options)
            .map(this.extractData);
    }

    getLuggageClaimObjectCoverageDecision(): Observable<DecisionServiceVersionDescription> {
        return this.http.get(this.baseUrl + '/travel/getdecisionserviceversiondescription/' + 2 + '/' + 1, this.options)
            .map(this.extractData);
    }

    getLuggageClaimObjectCalculatedCompensationAmountDecision(): Observable<DecisionServiceVersionDescription> {
        return this.http.get(this.baseUrl + '/travel/getdecisionserviceversiondescription/' + 1 + '/' + 2, this.options)
            .map(this.extractData);
    }

    getLuggageClaimObjectSettlementMandate(): Observable<DecisionServiceVersionDescription> {
        return this.http.get(this.baseUrl + '/travel/getdecisionserviceversiondescription/' + 3 + '/' + 1, this.options)
            .map(this.extractData);
    }

    getTravelClaimSettlementMandateDecision(): Observable<DecisionServiceVersionDescription> {
        return this.http.get(this.baseUrl + '/travel/getdecisionserviceversiondescription/' + 4 + '/' + 1, this.options)
            .map(this.extractData);
    }

    private extractData(res: Response) {
        return res.json();
    }



}