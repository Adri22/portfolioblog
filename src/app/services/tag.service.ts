import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ConnectionService } from './sub/connection.service';
import { Tag } from '../models/tag'

@Injectable({
  providedIn: "root"
})
export class TagService {

  endpointRoute = "tags/";

  constructor(
    private connectionService: ConnectionService
  ) { }

  getTags(): Observable<Tag[]> {
    return this.connectionService.getRequest(this.endpointRoute + "gettags");
  }

  setTag(tag: Tag): Observable<Tag> {
    return this.connectionService.postRequest(this.endpointRoute + "settag", tag);
  }

  deleteTag(tag: Tag | number): Observable<Tag> {
    const id = typeof tag === 'number' ? tag : tag._id;
    return this.connectionService.deleteRequest(this.endpointRoute + "deletetag/" + id);
  }
}