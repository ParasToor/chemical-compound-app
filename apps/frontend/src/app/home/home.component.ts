import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'home',
  imports: [CardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  compounds: any[] = [];
  currentPage = 1;
  totalPages = 1;
  limit = 10;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCompounds(this.currentPage);
  }

  fetchCompounds(page: number) {
    this.http
      .get(
        `http://localhost:4000/api/v1/compounds?pageNumber=${page}&pageSize=${this.limit}`,
      )
      .subscribe({
        next: (res: any) => {
          // const { data, currentPage, totalPages } = res;
          // console.log('data   -', data);
          // console.log('currentPage   -', currentPage);
          // console.log('totalPages   -', totalPages);
          this.compounds = res.data;
          this.currentPage = +res.currentPage;
          this.totalPages = +res.totalPages;
        },
        error: (err) => {
          console.error('API error:', err);
        },
      });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.fetchCompounds(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.fetchCompounds(this.currentPage - 1);
    }
  }
}
