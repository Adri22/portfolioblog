import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: "root"
})
export class SitedataService {

  constructor(
    private connectionService: ConnectionService
  ) { }

  getData(): Observable<string> { // any?
    return this.connectionService.getRequest("/gettest");
  }

  setData(data: string): Observable<boolean> {
    return this.connectionService.postRequest("/settest", data);
  }
}