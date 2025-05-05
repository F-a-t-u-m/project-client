import { Component, input, output } from '@angular/core';
import { ButtonModule, ButtonSeverity } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  public readonly label = input<string>('Click');
  public readonly severity = input<ButtonSeverity>('primary');
  public readonly size = input<number>(1.25); // rem
  public readonly onClick = output<void>();
}
