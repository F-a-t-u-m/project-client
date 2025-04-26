import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../shared/ui-kit/button/button.component';
import { BlockComponent } from '../../shared/ui-kit/block/block.component';
import { TableComponent } from '../../shared/ui-kit/table/table.component';
import { LayoutComponent } from '../../shared/layout/index/index.component';
import { INNER_BLOCK } from './configs/inner-block.config';

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<any>;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BlockComponent, LayoutComponent, TableComponent, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected readonly innerBlock = INNER_BLOCK;

  protected readonly walletAddress = signal<string | null>(null);
  constructor(private router: Router) {}
  async connectWallet() {
    if (typeof window !== 'undefined' && window.ethereum) {
      const ethereum = window.ethereum;

      try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        this.walletAddress.set(address);
        console.log('Connected account:', address);

        // TODO: надіслати адресу на бекенд

      } catch (error) {
        console.error('User rejected wallet connection:', error);
      }
    } else {
      console.error('MetaMask is not installed or not available!');
      alert('Please install MetaMask!');
    }
  }
  navigateToGame() {
    this.router.navigate(['/game']);
  }
}
