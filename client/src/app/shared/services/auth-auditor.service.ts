import {Injectable} from '@angular/core';
import {Auditor, Organization} from "../interfaces";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthAuditorServiceService {
  private token = null;

  constructor(private http: HttpClient) {
  }

  login(auditor: Auditor): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auditor/auth/login', auditor)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token);
            this.setToken(token);
          }
        )
      );
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): String {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }
}
