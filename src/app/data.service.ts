import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Object } from './Classes/Object';
import { Policy } from './Classes/Policy';
import { FixedValues } from './Classes/FixedValues';
import { CheckPolicyCoverage } from './Classes/CheckPolicyCoverage';
import { LuggageClaimObjectCoverage } from './Classes/LuggageClaimObjectCoverage';
import { LuggageClaimObjectCalculatedCompensationAmount } from './Classes/LuggageClaimObjectCalculatedCompensationAmount';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

    public allObjects: Object[];
    public allPolicies: Policy[];
    public fixedValues: FixedValues;
    public Objects: Object[] = [];
    public checkPolicyCoverage: CheckPolicyCoverage = new CheckPolicyCoverage();
    public selectedPolicy: Policy = null;
    public currentObject = 0;
    public luggageClaimObjectCoverage: LuggageClaimObjectCoverage = new LuggageClaimObjectCoverage();
    public luggageClaimObjectCalculatedCompensationAmount: LuggageClaimObjectCalculatedCompensationAmount
        = new LuggageClaimObjectCalculatedCompensationAmount();

    public listLuggageClaimObjectCoverage: LuggageClaimObjectCoverage[] = [];
    public listLuggageClaimObjectCalculatedCompensationAmount: LuggageClaimObjectCalculatedCompensationAmount[] = [];

    constructor(private http: Http) { }

    public getJSON(): void {
        this.http.get('./assets/testdata.json')
            .map((res: any) => res.json())
            .subscribe(data => this.ImportData(data));
    }

    private ImportData(data: any) {
        this.allObjects = data.Objects;
        this.allPolicies = data.Policies;
        this.fixedValues = data.FixedValues[0];
    }
}