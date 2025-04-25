import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-block',
  imports: [],
  templateUrl: './block.component.html',
  styleUrl: './block.component.scss'
})
export class BlockComponent {
  @Input() width = 'auto';  // e.g., '300px' or '25%'
  @Input() height = 'auto'; // e.g., '200px' or 'fit-content'
  @Input() background = 'linear-gradient(#EB7397, #B94567)'; // default background
  @Input() border = '20px solid #762B41'; // default border
}
