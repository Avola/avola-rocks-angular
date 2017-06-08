import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
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

    private travelPolicyCoverageDecisionId = 5;
    private luggageClaimObjectCoverageDecisionId = 2;
    private luggageClaimObjectCalculatedCompensationAmountDecisionId = 1;
    private luggageClaimObjectSettlementMandateDecisionId = 3;
    private travelClaimSettlementMandateDecisionId = 4;

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
        // tslint:disable-next-line:max-line-length
        return this.http.get(this.baseUrl + '/travel/getdecisionserviceversiondescription/' + this.travelPolicyCoverageDecisionId + '/' + 1, this.options)
            .map(this.extractData);
    }

    getLuggageClaimObjectCoverageDecision(): Observable<DecisionServiceVersionDescription> {
        // tslint:disable-next-line:max-line-length
        return this.http.get(this.baseUrl + '/travel/getdecisionserviceversiondescription/' + this.luggageClaimObjectCoverageDecisionId + '/' + 1, this.options)
            .map(this.extractData);
    }

    getLuggageClaimObjectCalculatedCompensationAmountDecision(): Observable<DecisionServiceVersionDescription> {
        // tslint:disable-next-line:max-line-length
        return this.http.get(this.baseUrl + '/travel/getdecisionserviceversiondescription/' + this.luggageClaimObjectCalculatedCompensationAmountDecisionId + '/' + 2, this.options)
            .map(this.extractData);
    }

    getLuggageClaimObjectSettlementMandate(): Observable<DecisionServiceVersionDescription> {
        // tslint:disable-next-line:max-line-length
        return this.http.get(this.baseUrl + '/travel/getdecisionserviceversiondescription/' + this.luggageClaimObjectSettlementMandateDecisionId + '/' + 1, this.options)
            .map(this.extractData);
    }

    getTravelClaimSettlementMandateDecision(): Observable<DecisionServiceVersionDescription> {
        // tslint:disable-next-line:max-line-length
        return this.http.get(this.baseUrl + '/travel/getdecisionserviceversiondescription/' + this.travelClaimSettlementMandateDecisionId + '/' + 1, this.options)
            .map(this.extractData);
    }

    getTravelPolicyCoverageDecisionVersions(): Observable<DecisionServiceVersionDescription[]> {
        return this.http.get(this.baseUrl + '/travel/listavailabledecisionservices/' + this.travelPolicyCoverageDecisionId, this.options)
            .map(this.extractData);
    }

    getLuggageClaimObjectCoverageDecisionVersions(): Observable<DecisionServiceVersionDescription[]> {
        // tslint:disable-next-line:max-line-length
        return this.http.get(this.baseUrl + '/travel/listavailabledecisionservices/' + this.luggageClaimObjectCoverageDecisionId, this.options)
            .map(this.extractData);
    }

    getLuggageClaimObjectCalculatedCompensationAmountDecisionVersions(): Observable<DecisionServiceVersionDescription[]> {
        // tslint:disable-next-line:max-line-length
        return this.http.get(this.baseUrl + '/travel/listavailabledecisionservices/' + this.luggageClaimObjectCalculatedCompensationAmountDecisionId, this.options)
            .map(this.extractData);
    }

    getLuggageClaimObjectSettlementMandateVersions(): Observable<DecisionServiceVersionDescription[]> {
        // tslint:disable-next-line:max-line-length
        return this.http.get(this.baseUrl + '/travel/listavailabledecisionservices/' + this.luggageClaimObjectSettlementMandateDecisionId, this.options)
            .map(this.extractData);
    }

    getTravelClaimSettlementMandateDecisionVersions(): Observable<DecisionServiceVersionDescription[]> {
        // tslint:disable-next-line:max-line-length
        return this.http.get(this.baseUrl + '/travel/listavailabledecisionservices/' + this.travelClaimSettlementMandateDecisionId, this.options)
            .map(this.extractData);
    }

    private extractData(res: Response) {
        return res.json();
    }



}