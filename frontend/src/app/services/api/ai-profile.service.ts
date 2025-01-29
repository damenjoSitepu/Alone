import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObservableService } from '../utils/observable.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export type CreateAiProfileResponse = {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiProfileService {
  constructor(
    private _http: HttpClient,
    private _observableService: ObservableService,
  ) { }

  create(name: string): Observable<CreateAiProfileResponse> {
    return this._http.post<CreateAiProfileResponse>(`${environment.apiUrl}/ai-profile`, [name])
      .pipe(this._observableService.extractToObject(['message']));
  }
}
