import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PlayerDto } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private readonly http = inject(HttpClient);

  private readonly prefix = 'players';
  private readonly baseUrl = environment.apiUrl + this.prefix;

  createOrUpdate(address: string): Observable<PlayerDto> {
    return this.http.post<PlayerDto>(this.baseUrl, { address });
  }

  updateScore(address: string, score: number): Observable<PlayerDto> {
    return this.http.patch<PlayerDto>(`${this.baseUrl}/score`, { address, score });
  }

  incrementTransactions(address: string): Observable<PlayerDto> {
    return this.http.patch<PlayerDto>(`${this.baseUrl}/tx`, { address });
  }

  getFirst10(): Observable<PlayerDto[]> {
    return this.http.get<PlayerDto[]>(this.baseUrl);
  }

  getByAddress(address: string): Observable<PlayerDto> {
    const params = new HttpParams().set('address', address);
    return this.http.get<PlayerDto>(`${this.baseUrl}/address`, { params });
  }
}
