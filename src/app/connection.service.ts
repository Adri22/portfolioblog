import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private server = { // TODO: add to external settings-file
    host: "localhost",
    port: "3000"
  }

  private url = `http://${this.server.host}:${this.server.port}/api`;

  /*
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  */

  constructor() { }

  getURL(): string {
    return this.url;
  }

  handleError<T>(serviceName: string, operation = "operation", result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${serviceName}: ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}