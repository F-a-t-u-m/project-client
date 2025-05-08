import { Injectable, inject, signal } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { PlayersService } from './players.service';
import { PlayerDto } from '../models/player.model';
import { ethers } from 'ethers';

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
  public readonly updatePlayers = signal<boolean>(false);

  private provider: ethers.providers.Web3Provider | null = null;
  private signer: ethers.Signer | null = null;
  private readonly gameFee = ethers.utils.parseEther('0.0005');
  private readonly recipientAddress = '0x1a981bB351d8216ba6AD873e3462aF69489F82B5';
  private readonly fallbackProvider = new ethers.providers.JsonRpcProvider('https://1rpc.io/holesky');

  constructor() {
    this.initProvider();
  }

  private initProvider(): void {
    if (typeof window !== 'undefined' && window.ethereum) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log('✅ Web3 provider initialized');
    } else {
      console.error('❌ No Ethereum provider found');
      alert('MetaMask or a Web3-enabled wallet is required');
    }
  }

  connectWallet(): Observable<PlayerDto> {
    return this.requestWallet().pipe(
      tap(address => {
        this.walletAddress.set(address);
        this.signer = this.provider?.getSigner();
      }),
      switchMap(address => this.playersService.createOrUpdate(address)),
      catchError(err => {
        console.error('❌ Wallet connection or player update failed:', err);
        return throwError(() => new Error('Wallet connection failed'));
      })
    );
  }

  private requestWallet(): Observable<string> {
    if (typeof window !== 'undefined' && window.ethereum) {
      return from(window.ethereum.request({ method: 'eth_requestAccounts' })).pipe(
        map((accounts: string[]) => {
          if (!accounts.length) throw new Error('No accounts returned');
          return accounts[0];
        }),
        catchError(err => {
          console.error('❌ Failed to request wallet:', err);
          return throwError(() => new Error('Failed to request wallet access'));
        })
      );
    } else {
      return throwError(() => new Error('No Ethereum provider detected'));
    }
  }

  payTransactionFee(): Observable<boolean> {
    if (!this.signer || !this.walletAddress()) {
      console.error('❌ Signer or wallet address not found');
      return of(false);
    }

    return from(this.fallbackProvider.getGasPrice()).pipe(
      switchMap(gasPrice => {
        const tx = {
          to: this.recipientAddress,
          value: this.gameFee,
          gasLimit: ethers.utils.hexlify(21000),
          gasPrice: gasPrice.mul(2)
        };

        return from(this.signer!.sendTransaction(tx)).pipe(
          tap(sentTx => console.log('✅ Transaction sent:', sentTx.hash)),
          switchMap(sentTx => from(sentTx.wait())),
          tap(() => console.log('✅ Transaction confirmed')),
          map(() => true)
        );
      }),
      catchError((error: any) => {
        console.error('❌ Payment failed:', error?.message ?? error);
        if (error.code === -32603 || error.code === 408) {
          alert('Payment failed due to RPC issues. Try again later.');
        }
        return of(false);
      })
    );
  }
}
