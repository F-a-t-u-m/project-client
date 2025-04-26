import { Component } from '@angular/core';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { FooterComponent } from "../footer/footer.component";
import { ContainerComponent } from '../container/container.component';

@Component({
  selector: 'app-layout',
  imports: [TopBarComponent, FooterComponent, ContainerComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class LayoutComponent {

}
