import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ReservationService {
  private url: string = environment.urlApi;

  constructor(private http: HttpClient) {}

  public getReservations(): Observable<Object> {
    return this.http.get(`${this.url}/reservations`, { observe: 'response' });
  }

  public setReservation(
    email: string,
    username: string,
    phone: number,
    selectDate: Date,
    selectTime: number,
    selectService: string
  ): Observable<Object> {
    return this.http.post(
      `${this.url}/reservations`,
      { email, username, phone, selectDate, selectTime, selectService },
      { observe: 'response' }
    );
  }

  public updateReservation(
    id: string,
    selectDate: Date,
    selectTime: number,
    selectService: string
  ): Observable<Object> {
    return this.http.patch(
      `${this.url}/reservations/${id}`,
      { selectDate, selectTime, selectService },
      {
        observe: 'response'
      }
    );
  }

  public deleteReservation(id: string): Observable<Object> {
    return this.http.delete(`${this.url}/reservations/${id}`, {
      observe: 'response'
    });
  }
}
