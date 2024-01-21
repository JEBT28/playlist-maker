import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {

  constructor(private http: HttpClient) { }

  checkConnection() {
    const url = `${environment.api}/health`;
    return this.http.get(url);
  }
}
