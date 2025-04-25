import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  players = [
    { address: '0x56DF97eD3DA145cBb2242cC85469f1e5e81d75de', points: 100 },
    
    { address: '0x56DF97eD3DA145cBb2242cC85469f1e5e81d75dg', points: 80 },
    { address: '0x56DF97eD3DA145cBb2242cC85469f1e5e81d75dh', points: 70 },
    { address: '0x56DF97eD3DA145cBb2242cC85469f1e5e81d75di', points: 60 },
    { address: '0x56DF97eD3DA145cBb2242cC85469f1e5e81d75dj', points: 50 },
    { address: '0x56DF97eD3DA145cBb2242cC85469f1e5e81d75dk', points: 40 },
    { address: '0x56DF97eD3DA145cBb2242cC85469f1e5e81d75dl', points: 30 },
    { address: '0x56DF97eD3DA145cBb2242cC85469f1e5e81d75df', points: 90 },
    { address: '0x56DF97eD3DA145cBb2242cC85469f1e5e81d75dm', points: 20 },
    { address: '0x56DF97eD3DA145cBb2242cC85469f1e5e81d75dn', points: 10 }
  ];

  ngOnInit() {
    this.players.sort((a, b) => b.points - a.points);
  }
  
  getPlayerPlace(index: number): number {
    return index + 1;
  }

  // Truncate Address
  truncateAddress(address: string): string {
    return address.substring(0, 6) + '...' + address.substring(address.length - 4);
  }
}
