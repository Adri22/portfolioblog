import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import settings from '../../environment-settings.json';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private server = {
    host: settings.server.host,
    port: settings.server.port
  }

  private url = `http://${this.server.host}:${this.server.port}/api`;

  constructor(private http: HttpClient) { }

  requestAt(endpoint: string): Observable<string> {
    return this.http.get<string>(`${this.getURL()}${endpoint}`)
      .pipe(catchError(this.handleError<string>({ serviceName: endpoint, operation: "" })));
  }

  private getURL(): string {
    return this.url;
  }

  private handleError<T>({ serviceName, operation = "operation", result }: { serviceName: string; operation?: string; result?: T; }) {
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