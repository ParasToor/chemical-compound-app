import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compound-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './compound-form.component.html',
  styleUrl: './compound-form.component.css',
})
export class CompoundFormComponent {
  form: FormGroup;
  isEditMode = false;
  id: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  ) {
    this.form = new FormGroup({
      name: new FormControl(''),
      image: new FormControl(''),
      description: new FormControl(''),
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isEditMode = !!this.id;

    if (this.isEditMode) {
      this.http
        .get(`http://localhost:4000/api/v1/compounds/${this.id}`)
        .subscribe({
          next: (res: any) => {
            this.form.patchValue(res.data); // Fill form with existing data
          },
          error: (err) => {
            console.log('API error:', err);
          },
        });
    }
  }

  submit() {
    const data = this.form.value;

    if (this.isEditMode) {
      this.http
        .patch(`http://localhost:4000/api/v1/compounds/${this.id}`, data)
        .subscribe({
          next: (res: any) => {
            alert('Compound updated');
            this.router.navigate(['/compounds/', this.id]);
          },
          error: (err) => {
            console.log('API error:', err);
          },
        });
    } else {
      this.http.post(`http://localhost:4000/api/v1/compounds`, data).subscribe({
        next: (res: any) => {
          alert('Compound created');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log('API error:', err);
        },
      });
    }
  }
}
