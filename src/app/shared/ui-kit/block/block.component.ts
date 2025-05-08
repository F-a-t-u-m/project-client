import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-block',
  imports: [],
  templateUrl: './block.component.html',
  styleUrl: './block.component.scss'
})
export class BlockComponent {
  public readonly width = input<string>('auto');
  public readonly height = input<string>('auto');
  public readonly background = input<string>('linear-gradient(#EB7397, #B94567)');
  public readonly border = input<string>('20px solid #762B41');
  public readonly margin = input<string>('0rem');
}
