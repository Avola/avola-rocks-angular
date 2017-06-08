import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Object } from './contracts/Object';
import { Policy } from './contracts/Policy';
import { AvolaClientService } from './services/avolaclient-service';
import { FixedValues } from './contracts/FixedValues';
import { CheckPolicyCoverage } from './contracts/CheckPolicyCoverage';
import { DecisionServiceVersionDescription } from './contracts/DecisionServiceVersionDescription';
import { LuggageClaimObjectCoverage } from './contracts/LuggageClaimObjectCoverage';
import { LuggageClaimObjectCalculatedCompensationAmount } from './contracts/LuggageClaimObjectCalculatedCompensationAmount';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { InputData } from './contracts/DecisionServiceVersionDescriptionDetails';
import { ListData } from './contracts/DecisionServiceVersionDescriptionDetails';
import { PairData } from './contracts/DecisionServiceVersionDescriptionDetails';

@Injectable()
export class DataService {

    public allObjects: Object[];
    public allPolicies: Policy[];
    public fixedValues: FixedValues;
    public Objects: Object[] = [];

    public travelPolicyCoverageDecision: DecisionServiceVersionDescription;
    public luggageClaimObjectCoverageDecision: DecisionServiceVersionDescription;
    public luggageClaimObjectCalculatedCompensationAmountDecision: DecisionServiceVersionDescription;
    public luggageClaimObjectSettlementMandate: DecisionServiceVersionDescription;
    public travelClaimSettlementMandateDecision: DecisionServiceVersionDescription;

    public checkPolicyCoverage: CheckPolicyCoverage = new CheckPolicyCoverage();
    public selectedPolicy: Policy = null;
    public currentObject = 0;

    public luggageClaimObjectCoverage: LuggageClaimObjectCoverage = new LuggageClaimObjectCoverage();
    // tslint:disable-next-line:max-line-length
    public luggageClaimObjectCalculatedCompensationAmount: LuggageClaimObjectCalculatedCompensationAmount = new LuggageClaimObjectCalculatedCompensationAmount();

    public listLuggageClaimObjectCoverage: LuggageClaimObjectCoverage[] = [];
    public listLuggageClaimObjectCalculatedCompensationAmount: LuggageClaimObjectCalculatedCompensationAmount[] = [];

    public mappedDatas: { [id: number]: InputData } = {};
    public mappedPairs: { [id: number]: PairData } = {};
    public mappedLists: { [id: number]: ListData } = {};


    constructor(private http: Http, private avolaclient: AvolaClientService) { }

    public getJSON(): void {
        this.http.get('./assets/testdata.json')
            .map((res: any) => res.json())
            .subscribe(data => this.ImportData(data));
    }

    public getDecisions(): void {
        this.avolaclient.getTravelPolicyCoverageDecision().subscribe((response) => {
            this.travelPolicyCoverageDecision = response;
            response.InputData.forEach((d) => this.mappedDatas[d.BusinessDataId] = d);
            response.ListData.forEach((d) => this.mappedLists[d.ListId] = d);
            response.PairData.forEach((d) => this.mappedPairs[d.PairId] = d);
            // console.log('travelPolicyCoverageDecision', response);
        });
        this.avolaclient.getLuggageClaimObjectCoverageDecision().subscribe((response) => {
            this.luggageClaimObjectCoverageDecision = response;
            response.InputData.forEach((d) => this.mappedDatas[d.BusinessDataId] = d);
            response.ListData.forEach((d) => this.mappedLists[d.ListId] = d);
            response.PairData.forEach((d) => this.mappedPairs[d.PairId] = d);
        });
        this.avolaclient.getLuggageClaimObjectCalculatedCompensationAmountDecision().subscribe((response) => {
            this.luggageClaimObjectCalculatedCompensationAmountDecision = response;
            response.InputData.forEach((d) => this.mappedDatas[d.BusinessDataId] = d);
            response.ListData.forEach((d) => this.mappedLists[d.ListId] = d);
            response.PairData.forEach((d) => this.mappedPairs[d.PairId] = d);
        });
        this.avolaclient.getLuggageClaimObjectSettlementMandate().subscribe((response) => {
            this.luggageClaimObjectSettlementMandate = response;
            response.InputData.forEach((d) => this.mappedDatas[d.BusinessDataId] = d);
            response.ListData.forEach((d) => this.mappedLists[d.ListId] = d);
            response.PairData.forEach((d) => this.mappedPairs[d.PairId] = d);
        });
        this.avolaclient.getTravelClaimSettlementMandateDecision().subscribe((response) => {
            this.travelClaimSettlementMandateDecision = response;
            response.InputData.forEach((d) => this.mappedDatas[d.BusinessDataId] = d);
            response.ListData.forEach((d) => this.mappedLists[d.ListId] = d);
            response.PairData.forEach((d) => this.mappedPairs[d.PairId] = d);
        });
    }

    private ImportData(data: any) {
        this.allObjects = data.Objects;
        this.allPolicies = data.Policies;
        this.fixedValues = data.FixedValues[0];
    }
}