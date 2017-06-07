import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Object } from './contracts/Object';
import { Policy } from './contracts/Policy';
import { AvolaClientService } from './services/avolaclient-service';
import { FixedValues } from './contracts/FixedValues';
import { CheckPolicyCoverage } from './contracts/CheckPolicyCoverage';
import { CheckPolicyCoverageVersion } from './contracts/CheckPolicyCoverageVersion';
import { LuggageClaimObjectCoverage } from './contracts/LuggageClaimObjectCoverage';
import { LuggageClaimObjectCalculatedCompensationAmount } from './contracts/LuggageClaimObjectCalculatedCompensationAmount';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

    public allObjects: Object[];
    public allPolicies: Policy[];
    public fixedValues: FixedValues;
    public Objects: Object[] = [];

    public allDecisions: any;
    public checkPolicyCoverageVersion: CheckPolicyCoverageVersion = new CheckPolicyCoverageVersion();
    public checkPolicyCoverage: CheckPolicyCoverage = new CheckPolicyCoverage();
    public selectedPolicy: Policy = null;
    public currentObject = 0;

    public luggageClaimObjectCoverage: LuggageClaimObjectCoverage = new LuggageClaimObjectCoverage();

    public luggageClaimObjectCalculatedCompensationAmount: LuggageClaimObjectCalculatedCompensationAmount
    = new LuggageClaimObjectCalculatedCompensationAmount();

    public listLuggageClaimObjectCoverage: LuggageClaimObjectCoverage[] = [];
    public listLuggageClaimObjectCalculatedCompensationAmount: LuggageClaimObjectCalculatedCompensationAmount[] = [];

    constructor(private http: Http, private avolaclient: AvolaClientService) { }

    public getJSON(): void {
        this.http.get('./assets/testdata.json')
            .map((res: any) => res.json())
            .subscribe(data => this.ImportData(data));
    }

    public getDecisions(): void {
        this.avolaclient.listAllDecisions().subscribe((response) => {
            console.log('decisions', response);
            this.allDecisions = response;
            // this.mapDecisions();
        });
    }

    // public mapDecisions(): void { 
    //     this.checkPolicyCoverageVersion = this.allDecisions[1].versions[0];
    //     console.log('version', this.checkPolicyCoverageVersion.InputData[0]);
    // }

    private ImportData(data: any) {
        this.allObjects = data.Objects;
        this.allPolicies = data.Policies;
        this.fixedValues = data.FixedValues[0];
    }
}