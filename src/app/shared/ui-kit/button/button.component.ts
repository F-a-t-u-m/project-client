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
  public readonly severity = input<ButtonSeverity>('danger');
  public readonly color = input<string>('#007bff');
  public readonly size = input<number>(14);

  public readonly onClick = output<void>();
}
