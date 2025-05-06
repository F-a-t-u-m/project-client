import { Component, inject, output } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TransactionsService } from '../../services/transactions.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Wallet } from './enums/wallet.enum';

@Component({
  selector: 'app-connect-wallet-modal',
  standalone: true,
  imports: [DialogComponent],
  templateUrl: './connect-wallet-dialog.component.html',
  styleUrls: ['./connect-wallet-dialog.component.scss'],
})
export class ConnectWalletDialogComponent {
  protected readonly ref = inject(DynamicDialogRef);
  protected readonly wallet = Wallet;

  protected openWalletSite(wallet: Wallet) {
    const urls = {
      metamask: 'https://metamask.io/',
      taho: 'https://taho.xyz/',
      zerion: 'https://zerion.io/',
      okx: 'https://www.okx.com/web3',
    };
    this.ref.close(urls[wallet])
  }
}
