import { Injectable, inject, signal } from '@angular/core';
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PlayersService } from './players.service';
import { PlayerDto } from '../models/player.model';


interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<any>;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  private readonly playersService = inject(PlayersService);
  public readonly walletAddress = signal<string | null>(null);

  connectWallet(): Observable<PlayerDto> {
    return from(this.requestWallet()).pipe(
      switchMap((address) => {
        this.walletAddress.set(address);
        return this.playersService.createOrUpdate(address);
      })
    );
  }

  private async requestWallet(): Promise<string> {
    if (typeof window !== 'undefined' && window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return accounts[0];
    } else {
      throw new Error('No Ethereum provider detected');
    }
  }
}
