import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObservableService } from '../utils/observable.service';
import { environment } from '../../../environments/environment';

export type PingResponse = {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class PingService {
  constructor(
    private _http: HttpClient,
    private _observableService: ObservableService,
  ) { }

  ping(): Observable<PingResponse> {
    return this._http.get<PingResponse>(`${environment.apiUrl}/ping`)
      .pipe(this._observableService.extractToObject(['message']));
  }
}
