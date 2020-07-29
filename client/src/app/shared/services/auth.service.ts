import {Injectable} from '@angular/core';
import {Organization} from "../interfaces";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = null;

  constructor(private http: HttpClient) {
  }

  login(organization: Organization): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', organization)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token);
            this.setToken(token);
          }
        )
      );
  }

  register(organization: Organization): Observable<Organization> {
    return this.http.post<Organization>('/api/auth/register', organization);
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
