import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl: string = 'http://localhost:3000/api';

  public getHello(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(`${this.baseUrl}/hello`);
  }
}
