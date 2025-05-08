import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ButtonComponent } from '../../ui-kit/button/button.component';
import { TransactionsService } from '../../services/transactions.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConnectWalletDialogComponent } from '../../ui-kit/connect-wallet-dialog/connect-wallet-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, ButtonComponent],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  providers: [DialogService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent {
  private readonly transactionsService = inject(TransactionsService);
  private readonly dialogService = inject(DialogService);
  private readonly destroyRef = inject(DestroyRef);

  protected connectWallet() {
    this.dialogService
      .open(ConnectWalletDialogComponent, {
        header: 'Test',
      })
      .onClose.pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((wallet) => this.transactionsService.connectWallet()),
      )
      .subscribe({
        next: (player) => {
          this.transactionsService.updatePlayers.update((prev : boolean) => !prev)
          console.log('Wallet registered/updated successfully:', player);
        },
        error: (err) => {
          console.error('Failed to register wallet:', err);
        },
      });
  }
}
