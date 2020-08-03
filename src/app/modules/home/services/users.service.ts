import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
  private url: string = environment.urlApi;

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<Object> {
    return this.http.post(`${this.url}/auth`, { observe: 'response' });
  }

  public deleteUser(id: string): Observable<Object> {
    return this.http.delete(`${this.url}/auth/${id}`, { observe: 'response' });
  }
}
