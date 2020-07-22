import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  private url: string = environment.urlApi;

  public login(
    email: string,
    password: string
  ): Observable<HttpResponse<Object>> {
    return this.http.post(
      `${this.url}/auth/login`,
      { email, password },
      { observe: 'response' }
    );
  }

  public registration(
    email: string,
    password: string,
    username: string,
    phone: number
  ): Observable<HttpResponse<Object>> {
    return this.http.post(
      `${this.url}/auth/register`,
      { email, password, username, phone },
      { observe: 'response' }
    );
  }
  public getUserInformation(): Observable<Object> {
    return this.http.post(`${this.url}/auth/user`, { observe: 'response' });
  }

  public logOut(): Observable<Object> {
    return this.http.get(`${this.url}/auth/logout`);
  }

  public forgot(email: string): Observable<HttpResponse<Object>> {
    return this.http.post(
      `${this.url}/auth/forgot`,
      { email },
      { observe: 'response' }
    );
  }

  public reset(
    password: string,
    token: string
  ): Observable<HttpResponse<Object>> {
    return this.http.post(
      `${this.url}/auth/reset/${token}`,
      { password },
      { observe: 'response' }
    );
  }
}
