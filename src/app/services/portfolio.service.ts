import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ConnectionService } from './sub/connection.service';
import { Artwork } from '../models/artwork'

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  endpointRoute = "portfolio/";

  constructor(
    private connectionService: ConnectionService
  ) { }

  uploadFile(file: File): Observable<File> {
    const httpOptions = {
      // headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
    };
    const formData: FormData = new FormData();
    formData.append("artworkfile", file);
    return this.connectionService.postRequest(this.endpointRoute + "setfile", formData, httpOptions);
  }

  setArtwork(artwork: Artwork): Observable<Artwork> {
    return this.connectionService.postRequest(this.endpointRoute + "setartwork", artwork);
  }



}