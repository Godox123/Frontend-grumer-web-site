import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class NewService {
  private url: string = environment.urlApi;

  constructor(private http: HttpClient) {}

  public getServices(): Observable<Object> {
    return this.http.get(`${this.url}/services`, { observe: 'response' });
  }
  public setService(
    servicename: string,
    photoUrl: string,
    description: string
  ): Observable<Object> {
    return this.http.post(
      `${this.url}/services`,
      { servicename, photoUrl, description },
      { observe: 'response' }
    );
  }

  public updateService(
    id: string,
    servicename: string,
    photoUrl: string,
    description: string
  ): Observable<Object> {
    return this.http.patch(
      `${this.url}/services/${id}`,
      { servicename, photoUrl, description },
      {
        observe: 'response'
      }
    );
  }

  public deleteService(id: string): Observable<Object> {
    return this.http.delete(`${this.url}/services/${id}`, {
      observe: 'response'
    });
  }
}
