import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {
  public readonly maxWidth = input<string>('1320px');
  public readonly padding = input<string>('2rem 1rem');
}
