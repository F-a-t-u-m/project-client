import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { WinnerDto } from '../models/winner.model';

@Injectable({
  providedIn: 'root',
})
export class WinnersService {
  private readonly http = inject(HttpClient);

  private readonly prefix = 'winners';
  private readonly baseUrl = environment.apiUrl + this.prefix;

  getAllWinners(): Observable<WinnerDto[]> {
    return this.http.get<WinnerDto[]>(`${this.baseUrl}`);
  }

  getLastWinner(): Observable<WinnerDto> {
    return this.http.get<WinnerDto>(`${this.baseUrl}/last`);
  }
}
