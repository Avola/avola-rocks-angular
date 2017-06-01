import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Object } from './Object';
import { Policy } from './Policy';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

    public allObjects: Object[];
    public allPolicies: Policy[];

    constructor(private http: Http) { }

    public getJSON(): void {
        this.http.get('./assets/testdata.json')
            .map((res: any) => res.json())
            .subscribe(data => this.ImportData(data));
    }

    private ImportData(data: any) {
        this.allObjects = data.Objects;
        this.allPolicies = data.Policies;
    }
}