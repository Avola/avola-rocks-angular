import { Component, Input, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Object } from './contracts/Object';
import { Policy } from './contracts/Policy';
import { AvolaClientService } from './services/avolaclient-service';
import { FixedValues } from './contracts/FixedValues';
import { CheckPolicyCoverage } from './contracts/CheckPolicyCoverage';
import { DecisionServiceVersionDescription } from './contracts/DecisionServiceVersionDescription';
import { LuggageClaimObjectCoverage } from './contracts/LuggageClaimObjectCoverage';
import { LuggageClaimObjectCalculatedCompensationAmount } from './contracts/LuggageClaimObjectCalculatedCompensationAmount';
import { InputData, ListData, PairData } from './contracts/DecisionServiceVersionDescriptionDetails';

@Injectable()
export class DataService {

    public allObjects: Object[];
    public allPolicies: Policy[];
    public fixedValues: FixedValues;
    public Objects: Object[] = [];

    public travelPolicyCoverageDecisionVersion: number;
    public luggageClaimObjectCoverageDecisionVersion: number;
    public luggageClaimObjectCalculatedCompensationAmountDecisionVersion: number;
    public luggageClaimObjectSettlementMandateVersion: number;
    public travelClaimSettlementMandateDecisionVersion: number;

    public travelPolicyCoverageDecisionVersionNumbers: number[];
    public luggageClaimObjectCoverageDecisionVersionNumbers: number[];
    public luggageClaimObjectCalculatedCompensationAmountDecisionVersionNumbers: number[];
    public luggageClaimObjectSettlementMandateVersionNumbers: number[];
    public travelClaimSettlementMandateDecisionVersionNumbers: number[];

    public mappedTravelPolicyCoverageDecisionVersions: { [version: number]: DecisionServiceVersionDescription } = {};
    public mappedLuggageClaimObjectCoverageDecisionVersions: { [version: number]: DecisionServiceVersionDescription } = {};
    // tslint:disable-next-line:max-line-length
    public mappedLuggageClaimObjectCalculatedCompensationAmountDecisionVersions: { [version: number]: DecisionServiceVersionDescription } = {};
    public mappedLuggageClaimObjectSettlementMandateVersions: { [version: number]: DecisionServiceVersionDescription } = {};
    public mappedTravelClaimSettlementMandateDecisionVersions: { [version: number]: DecisionServiceVersionDescription } = {};

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

    public getDecisionVersions(): void {
        this.avolaclient.getTravelPolicyCoverageDecisionVersions().subscribe((response) => {
            response.forEach((d) => this.mappedTravelPolicyCoverageDecisionVersions[d.VersionNumber] = d);
            this.travelPolicyCoverageDecisionVersionNumbers = response.map(({ VersionNumber }) => VersionNumber);
            this.travelPolicyCoverageDecisionVersion = Math.max.apply(Math, this.travelPolicyCoverageDecisionVersionNumbers);
        });
        this.avolaclient.getLuggageClaimObjectCoverageDecisionVersions().subscribe((response) => {
            response.forEach((d) => this.mappedLuggageClaimObjectCoverageDecisionVersions[d.VersionNumber] = d);
            this.luggageClaimObjectCoverageDecisionVersionNumbers = response.map(({ VersionNumber }) => VersionNumber);
            this.luggageClaimObjectCoverageDecisionVersion = Math.max.apply(Math, this.luggageClaimObjectCoverageDecisionVersionNumbers);
        });
        this.avolaclient.getLuggageClaimObjectCalculatedCompensationAmountDecisionVersions().subscribe((response) => {
            response.forEach((d) => this.mappedLuggageClaimObjectCalculatedCompensationAmountDecisionVersions[d.VersionNumber] = d);
            this.luggageClaimObjectCalculatedCompensationAmountDecisionVersionNumbers = response.map(({ VersionNumber }) => VersionNumber);
            // tslint:disable-next-line:max-line-length
            this.luggageClaimObjectCalculatedCompensationAmountDecisionVersion = Math.max.apply(Math, this.luggageClaimObjectCalculatedCompensationAmountDecisionVersionNumbers);
        });
        this.avolaclient.getLuggageClaimObjectSettlementMandateVersions().subscribe((response) => {
            response.forEach((d) => this.mappedLuggageClaimObjectSettlementMandateVersions[d.VersionNumber] = d);
            this.luggageClaimObjectSettlementMandateVersionNumbers = response.map(({ VersionNumber }) => VersionNumber);
            this.luggageClaimObjectSettlementMandateVersion = Math.max.apply(Math, this.luggageClaimObjectSettlementMandateVersionNumbers);
        });
        this.avolaclient.getTravelClaimSettlementMandateDecisionVersions().subscribe((response) => {
            response.forEach((d) => this.mappedTravelClaimSettlementMandateDecisionVersions[d.VersionNumber] = d);
            this.travelClaimSettlementMandateDecisionVersionNumbers = response.map(({ VersionNumber }) => VersionNumber);
            // tslint:disable-next-line:max-line-length
            this.travelClaimSettlementMandateDecisionVersion = Math.max.apply(Math, this.travelClaimSettlementMandateDecisionVersionNumbers);
        });
    }

    public mapFormData(): void {
        let selectedVersion = this.mappedTravelPolicyCoverageDecisionVersions[this.travelPolicyCoverageDecisionVersion];
        selectedVersion.InputData.forEach((d) => this.mappedDatas[d.BusinessDataId] = d);
        selectedVersion.ListData.forEach((d) => this.mappedLists[d.ListId] = d);
        selectedVersion.PairData.forEach((d) => this.mappedPairs[d.PairId] = d);

        selectedVersion = this.mappedLuggageClaimObjectCoverageDecisionVersions[this.luggageClaimObjectCoverageDecisionVersion];
        selectedVersion.InputData.forEach((d) => this.mappedDatas[d.BusinessDataId] = d);
        selectedVersion.ListData.forEach((d) => this.mappedLists[d.ListId] = d);
        selectedVersion.PairData.forEach((d) => this.mappedPairs[d.PairId] = d);

        // tslint:disable-next-line:max-line-length
        selectedVersion = this.mappedLuggageClaimObjectCalculatedCompensationAmountDecisionVersions[this.luggageClaimObjectCalculatedCompensationAmountDecisionVersion];
        selectedVersion.InputData.forEach((d) => this.mappedDatas[d.BusinessDataId] = d);
        selectedVersion.ListData.forEach((d) => this.mappedLists[d.ListId] = d);
        selectedVersion.PairData.forEach((d) => this.mappedPairs[d.PairId] = d);

        selectedVersion = this.mappedLuggageClaimObjectSettlementMandateVersions[this.luggageClaimObjectSettlementMandateVersion];
        selectedVersion.InputData.forEach((d) => this.mappedDatas[d.BusinessDataId] = d);
        selectedVersion.ListData.forEach((d) => this.mappedLists[d.ListId] = d);
        selectedVersion.PairData.forEach((d) => this.mappedPairs[d.PairId] = d);

        selectedVersion = this.mappedTravelClaimSettlementMandateDecisionVersions[this.travelClaimSettlementMandateDecisionVersion];
        selectedVersion.InputData.forEach((d) => this.mappedDatas[d.BusinessDataId] = d);
        selectedVersion.ListData.forEach((d) => this.mappedLists[d.ListId] = d);
        selectedVersion.PairData.forEach((d) => this.mappedPairs[d.PairId] = d);
    }

    private ImportData(data: any) {
        this.allObjects = data.Objects;
        this.allPolicies = data.Policies;
        this.fixedValues = data.FixedValues[0];
    }
}