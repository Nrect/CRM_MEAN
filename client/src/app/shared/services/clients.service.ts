import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Client, Message} from "../interfaces";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) {
  }

  fetch(params: any = {}): Observable<Client[]> {
    return this.http.get<Client[]>('/api/clients',{
      params: new HttpParams({
        fromObject: params
      })
    });
  }

  getById(id: string): Observable<Client> {
    return this.http.get<Client>(`/api/clients/${id}`);
  }

  createClient(name: string, age: any, language: string,
               married: string, partner: string, phone: string, address: string, haveChildren: string, listChild: string,
               image?: File): Observable<Client> {
    const formData = new FormData();
    if (image) {
      formData.append('image', image, image.name);
    }
    formData.append('name', name);
    formData.append('age', age);
    formData.append('language', language);
    formData.append('married', married);
    formData.append('partner', partner);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('haveChildren', haveChildren);
    formData.append('listChild', listChild);

    return this.http.post<Client>('/api/clients', formData);
  }

  updateClient(id: string, name: string, age: any, language: string,
               married: string, partner: string, phone: string, address: string,
               haveChildren: string, listChild: string, image?: File): Observable<Client> {
    const formData = new FormData();
    if (image) {
      formData.append('image', image, image.name);
    }
    formData.append('name', name);
    formData.append('age', age);
    formData.append('language', language);
    formData.append('married', married);
    formData.append('partner', partner);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('haveChildren', haveChildren);
    formData.append('listChild', listChild);

    return this.http.patch<Client>(`/api/clients/${id}`, formData);
  }

  deleteClient(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/clients/${id}`);
  }
}
