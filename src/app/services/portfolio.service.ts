import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

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

  uploadArtwork(artwork: Artwork): Observable<Artwork> {
    return this.connectionService.postRequest(this.endpointRoute + "setartwork", artwork);
  }



}