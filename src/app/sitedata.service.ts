import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: "root"
})
export class SitedataService {

  constructor(
    private connectionService: ConnectionService,
    private http: HttpClient
  ) { }

  getData(): Observable<string> {
    return this.http.get<string>(`${this.connectionService.getURL()}/test`)
      .pipe(catchError(this.connectionService.handleError<string>("getData", "")));
  }

  setData(data) {
    // this.test = data;
  }
}