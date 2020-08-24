import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class SitedataService {

  private server = { // TODO: add to external settings-file
    host: "localhost",
    port: "3000"
  }

  private url = "http://" + this.server.host + ":" + this.server.port + "/api";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(
    private http: HttpClient
  ) { }

  getData(): Observable<string> {
    return this.http.get<string>(this.url + "/bla")
      .pipe(catchError(this.handleError<string>("getData", "")));
  }

  setData(data) {
    // this.test = data;
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(operation + " failed: " + error.message);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log("SitedataService: " + message);
  }
}