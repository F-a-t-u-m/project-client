import { Component, computed, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../shared/ui-kit/button/button.component';
import { BlockComponent } from '../../shared/ui-kit/block/block.component';
import { TableComponent } from '../../shared/ui-kit/table/table.component';
import { LayoutComponent } from '../../shared/layout/index/index.component';
import { INNER_BLOCK } from './configs/inner-block.config';
import { Router } from '@angular/router';
import { LEADERBOARD_TABLE_CONFIG } from '../../shared/ui-kit/table/configs/leaderbord.config';
import { MY_SCORE_CONFIG } from '../../shared/ui-kit/table/configs/my-score.config';
import { MY_SCORE_MOCK } from '../../shared/mocks/my-score.mock';
import { switchMap } from 'rxjs';
import { PlayersService } from '../../shared/services/players.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BlockComponent, LayoutComponent, TableComponent, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly router = inject(Router);
  private readonly playersService = inject(PlayersService);

  protected readonly innerBlock = INNER_BLOCK;
  protected readonly leaderboardTableConfig = LEADERBOARD_TABLE_CONFIG;
  protected readonly myScoreData = MY_SCORE_MOCK;
  protected readonly myScoreTableConfig = MY_SCORE_CONFIG;

  private readonly updatePlayers = signal(true);
  private readonly players$ = toObservable(computed(() => this.updatePlayers())).pipe(
    switchMap(() => this.playersService.getFirst10()),
  );
  protected readonly players = toSignal(this.players$, {
    initialValue: [],
  });

  protected navigateToGame() {
    this.router.navigate(['/game']);
  }

  protected openModalsPage() {
    this.router.navigate(['/test-modals']);
  }
}
