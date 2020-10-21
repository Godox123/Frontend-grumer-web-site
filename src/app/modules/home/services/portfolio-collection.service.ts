import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class PortfolioCollectionService {
  private url: string = environment.urlApi;

  constructor(private http: HttpClient) {}

  public getPortfolio(): Observable<Object> {
    return this.http.get(`${this.url}/portfolio`, { observe: 'response' });
  }

  public headers: HttpHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  public setPortfolio(
    photoUrlAfter: File,
    photoUrlBefore: File,
    description: string
  ): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('photoUrlBefore', photoUrlBefore);
    formData.append('photoUrlAfter', photoUrlAfter);
    formData.append('description', description);
    return this.http.post(`${this.url}/portfolio`, formData, {
      observe: 'response',
      reportProgress: true
    });
  }

  public updatePortfolio(
    id: string,
    photoUrlAfter: File,
    photoUrlBefore: File,
    description: string
  ): Observable<Object> {
    console.log(id, photoUrlAfter, photoUrlBefore, description);
    const formData: FormData = new FormData();
    formData.append('photoUrlBefore', photoUrlBefore);
    formData.append('photoUrlAfter', photoUrlAfter);
    formData.append('description', description);
    return this.http.patch(`${this.url}/portfolio/${id}`, formData, {
      observe: 'response',
      reportProgress: true
    });
  }

  public deletePortfolio(id: string): Observable<Object> {
    return this.http.delete(`${this.url}/portfolio/${id}`, {
      observe: 'response'
    });
  }
}
