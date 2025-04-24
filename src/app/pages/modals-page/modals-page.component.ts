import { Component, DestroyRef, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/ui-kit/button/button.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationDialogComponent } from '../../shared/ui-kit/confirmation-dialog/confirmation-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonAction } from '../../shared/ui-kit/dialog/models/dialog.model';

@Component({
  selector: 'app-modals-page',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './modals-page.component.html',
  styleUrl: './modals-page.component.scss',
  providers: [DialogService]
})
export class ModalsPageComponent {
  private readonly dialogService = inject(DialogService);
  private readonly destroyRef = inject(DestroyRef);

  protected openModal() {
    this.dialogService.open(ConfirmationDialogComponent, {
      header: 'Test',
    }).onClose.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((action) => this.handleConfirmationAction(action));
  }

  private handleConfirmationAction(action: ButtonAction) {
    const actionMap = {
      [ButtonAction.Confirm]: () => console.log('Confirm Action'),
      [ButtonAction.Cancel]: () => console.log('Cancel Action'),
    }

    actionMap[action]();
  }
}
