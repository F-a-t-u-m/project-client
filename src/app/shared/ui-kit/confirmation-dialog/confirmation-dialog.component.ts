import { Component, inject, input, output } from '@angular/core';
import { ConfirmationDialogConfig, DefaultConfirmationDialogConfig } from './models/confirmation-dialog.model';
import { ButtonComponent } from '../button/button.component';
import { NgStyle } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { ButtonAction } from '../dialog/models/dialog.model';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [ButtonComponent, NgStyle, DialogComponent],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  protected readonly ref = inject(DynamicDialogRef);
  public readonly loading = input<boolean>(false);
  public readonly config = input<ConfirmationDialogConfig>(DefaultConfirmationDialogConfig);
}
