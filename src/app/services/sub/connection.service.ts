import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import settings from '../../../../environment-settings.json';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private server = {
    host: settings.server.host,
    port: settings.server.port
  }

  private apiURL = `http://${this.server.host}:${this.server.port}/api/`;

  private httpOptions = { // TODO: build up dynamically
    // headers: new HttpHeaders({ 'Content-Type': undefined }),
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    params: {}
  };

  constructor(private http: HttpClient) { }

  getRequest<T>(endpoint: string, data?: HttpParams): Observable<T> {
    this.resetParams();
    this.httpOptions.params = data;
    return this.http.get<T>(`${this.getAPIURL()}${endpoint}`, this.httpOptions)
      .pipe(catchError(this.handleError<T>({ operation: endpoint })));
  }

  postRequest<T>(endpoint: string, data: any, httpOptions?: {}): Observable<T> {
    this.resetParams();
    return this.http.post<T>(`${this.getAPIURL()}${endpoint}`, data, httpOptions === undefined ? this.httpOptions : httpOptions)
      .pipe(catchError(this.handleError<T>({ operation: endpoint })));
  }

  putRequest<T>(endpoint: string, data: any): Observable<T> {
    this.resetParams();
    return this.http.put<T>(`${this.getAPIURL()}${endpoint}`, data, this.httpOptions)
      .pipe(catchError(this.handleError<T>({ operation: endpoint })));
  }

  deleteRequest<T>(endpoint: string, data: HttpParams): Observable<T> {
    this.httpOptions.params = data;
    return this.http.delete<T>(`${this.getAPIURL()}${endpoint}`, this.httpOptions)
      .pipe(catchError(this.handleError<T>({ operation: endpoint })));
  }

  getAPIURL(): string {
    return this.apiURL;
  }

  private resetParams(): void {
    this.httpOptions.params = {};
  }

  private handleError<T>({ service = "service", operation = "operation", result }:
    { service?: string; operation?: string; result?: T; }) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${service}: ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}