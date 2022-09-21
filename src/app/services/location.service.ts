import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  retrieveCityCoordinates(city: string): Observable<any> {
    const query = `https://restcountries.com/v3.1/capital/${city}`
    return this.http.get(query);
  }
}
