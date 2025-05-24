import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-compound',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './compound.component.html',
  styleUrl: './compound.component.css',
})
export class CompoundComponent {
  compound: any;
  id: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    console.log('Entered');
    this.id = this.route.snapshot.params['id'];
    const id = this.id;
    console.log('Id   ->', id);
    this.http.get(`http://localhost:4000/api/v1/compounds/${id}`).subscribe({
      next: (res: any) => {
        this.compound = res.data;
        console.log('data in compounds  -', this.compound);
      },
      error: (err) => {
        console.error('API error:', err);
      },
    });
  }
}
