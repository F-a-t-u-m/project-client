import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../shared/ui-kit/button/button.component';
import { BlockComponent } from '../../shared/ui-kit/block/block.component';
import { TableComponent } from '../../shared/ui-kit/table/table.component';
import { LayoutComponent } from '../../shared/layout/index/index.component';
import { INNER_BLOCK } from './configs/inner-block.config';
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
  imports: [BlockComponent, LayoutComponent, TableComponent, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly router = inject(Router);

  protected readonly innerBlock = INNER_BLOCK;


  navigateToGame() {
    this.router.navigate(['/game']);
  }

  protected openModalsPage() {
    this.router.navigate(['/test-modals']);
  }
}
