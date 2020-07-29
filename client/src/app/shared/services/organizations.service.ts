import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Client, Message, Organization} from "../interfaces";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  constructor(private http: HttpClient) {
  }

  fetch(params: any = {}): Observable<Organization[]> {
    return this.http.get<Organization[]>('/api/auditor/organizations/',{
      params: new HttpParams({
        fromObject: params
      })
    });
  }
}
