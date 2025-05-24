import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'home',
  imports: [CardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  compounds: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:4000/api/v1/compounds').subscribe({
      next: (res: any) => {
        this.compounds = res.data;
        console.log('data in compounds  -', this.compounds);
      },
      error: (err) => {
        console.error('API error:', err);
      },
    });
  }
}
