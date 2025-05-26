import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

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
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit() {
    console.log('Entered');
    this.id = this.route.snapshot.params['id'];
    const id = this.id;
    this.http.get(`http://localhost:4000/api/v1/compounds/${id}`).subscribe({
      next: (res: any) => {
        this.compound = res.data;
      },
      error: (err) => {
        console.error('API error:', err);
      },
    });
  }

  backHandler() {
    this.location.back();
  }

  editHandler() {
    this.router.navigate(['/compound/edit/', this.id]);
  }

  deleteHandler() {
    this.http
      .delete(`http://localhost:4000/api/v1/compounds/${this.id}`)
      .subscribe({
        next: (res: any) => {
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('API error:', err);
        },
      });
  }
}
