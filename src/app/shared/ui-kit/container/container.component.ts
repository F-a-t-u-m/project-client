import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {
  @Input() maxWidth = '1320px';  // default max width
  @Input() padding = '2rem 1rem';   // optional padding
}
