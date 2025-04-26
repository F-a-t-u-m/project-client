import { Component, inject, signal } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ButtonComponent } from '../../ui-kit/button/button.component';

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<any>;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, ButtonComponent],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})

export class TopBarComponent {
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

      } catch (error) {
        console.error('User rejected wallet connection:', error);
      }
    } else {
      console.error('MetaMask is not installed or not available!');
      alert('Please install MetaMask!');
    }
  }
}
