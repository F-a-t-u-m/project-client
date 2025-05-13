import { Injectable, inject, signal } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { PlayersService } from './players.service';
import { PlayerDto } from '../models/player.model';
import Web3 from 'web3';

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<any>;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
    web3?: Web3;
  }
}

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  private readonly playersService = inject(PlayersService);
  public readonly walletAddress = signal<string | null>(null);
  public readonly updatePlayers = signal<boolean>(false);

  private web3: Web3 | null = null;
  private account: string | null = null;
  private readonly gameFee = Web3.utils.toWei('0.0005', 'ether');
  private readonly recipientAddress = '0x1a981bB351d8216ba6AD873e3462aF69489F82B5';

  constructor() {
    this.initWeb3();
  }

  private initWeb3(): void {
    if (typeof window !== 'undefined' && window.ethereum) {
      this.web3 = new Web3(window.ethereum as any);
      console.log('✅ Web3 initialized');
    } else {
      console.error('❌ No Ethereum provider found');
      alert('MetaMask or a Web3-enabled wallet is required');
    }
  }

  connectWallet(): Observable<PlayerDto> {
    return this.requestWallet().pipe(
      tap((address) => {
        this.walletAddress.set(address);
        this.account = address;
      }),
      switchMap((address) => this.playersService.createOrUpdate(address)),
      catchError((err) => {
        console.error('❌ Wallet connection or player update failed:', err);
        return throwError(() => new Error('Wallet connection failed'));
      }),
    );
  }

  private requestWallet(): Observable<string> {
    if (typeof window !== 'undefined' && window.ethereum) {
      return from(window.ethereum.request({ method: 'eth_requestAccounts' })).pipe(
        map((accounts: string[]) => {
          if (!accounts.length) throw new Error('No accounts returned');
          return accounts[0];
        }),
        catchError((err) => {
          console.error('❌ Failed to request wallet:', err);
          return throwError(() => new Error('Failed to request wallet access'));
        }),
      );
    } else {
      return throwError(() => new Error('No Ethereum provider detected'));
    }
  }

  payTransactionFee(): Observable<boolean> {
    if (!this.web3 || !this.account) {
      console.error('❌ Web3 or account not available');
      return of(false);
    }

    return from(this.web3.eth.getGasPrice()).pipe(
      switchMap((gasPrice: bigint): Observable<boolean> => {
        const doubledGasPrice = (BigInt(gasPrice) * 2n).toString();

        const txParams = {
          from: this.account!,
          to: this.recipientAddress,
          value: this.gameFee,
          gas: 21000,
          gasPrice: doubledGasPrice,
        };

        return from(this.web3!.eth.sendTransaction(txParams)).pipe(
          tap((receipt) => console.log('✅ Transaction confirmed:', receipt.transactionHash)),
          map(() => true),
        );
      }),
      catchError((error: any) => {
        console.error('❌ Payment failed:', error?.message ?? error);
        if (error.code === -32603 || error.code === 408) {
          alert('Payment failed due to RPC issues. Try again later.');
        }
        return of(false);
      }),
    );
  }
}
