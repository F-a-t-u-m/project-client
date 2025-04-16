import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly apiService = inject(ApiService);

  protected readonly message = signal<string>('');

  ngOnInit() {
    this.getHelloMessage();
  }

  private getHelloMessage() {
    this.apiService.getHello().subscribe((res) =>
      this.message.set(res.message));
  }
}
