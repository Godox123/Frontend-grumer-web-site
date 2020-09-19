import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class NewService {
  private url: string = environment.urlApi;

  constructor(private http: HttpClient) {}

  public getServices(): Observable<Object> {
    return this.http.get(`${this.url}/services`, { observe: 'response' });
  }

  public headers: HttpHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  public setService(
    servicename: string,
    photoUrl: File,
    price: string,
    description: string
  ): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('servicename', servicename);
    formData.append('photoUrl', photoUrl);
    formData.append('price', price);
    formData.append('description', description);
    return this.http.post(`${this.url}/services`, formData, {
      observe: 'response',
      reportProgress: true
    });
  }

  public updateService(
    id: string,
    servicename: string,
    photoUrl: File,
    price: string,
    description: string
  ): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('servicename', servicename);
    formData.append('photoUrl', photoUrl);
    formData.append('price', price);
    formData.append('description', description);
    return this.http.patch(`${this.url}/services/${id}`, formData, {
      observe: 'response',
      reportProgress: true
    });
  }

  public deleteService(id: string): Observable<Object> {
    return this.http.delete(`${this.url}/services/${id}`, {
      observe: 'response'
    });
  }
}
