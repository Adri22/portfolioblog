import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ConnectionService } from './sub/connection.service';

@Injectable({
  providedIn: "root"
})
export class SitedataService {

  endpointRoute = "";

  constructor(
    private connectionService: ConnectionService
  ) { }

  getData(): Observable<any> { // change any to matching datatype?
    return this.connectionService.getRequest("gettest");
  }

  setData(data: any): Observable<any> {
    return this.connectionService.postRequest("settest", data);
  }
}