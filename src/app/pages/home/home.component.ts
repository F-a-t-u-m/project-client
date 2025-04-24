import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { ButtonComponent } from '../../shared/ui-kit/button/button.component';
import { Router } from '@angular/router';

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
  imports: [ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);

  protected readonly walletAddress = signal<string | null>(null);

  async connectWallet() {
    if (typeof window !== 'undefined' && window.ethereum) {
      const ethereum = window.ethereum;

      try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        this.walletAddress.set(address);
        console.log('Connected account:', address);

        // TODO: надіслати адресу на бекенд
        // await this.apiService.sendWalletAddress(address);

      } catch (error) {
        console.error('User rejected wallet connection:', error);
      }
    } else {
      console.error('MetaMask is not installed or not available!');
      alert('Please install MetaMask!');
    }
  }

  protected openModalsPage() {
    console.log('here');

    this.router.navigate(['/test-modals']);
  }
}
