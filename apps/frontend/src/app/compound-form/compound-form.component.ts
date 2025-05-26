import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Validators } from '@angular/forms';

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
    private location: Location,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      image: new FormControl('', [
        Validators.required,
        Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)$/i),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  cancelHandler() {
    this.location.back();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isEditMode = !!this.id;

    if (this.isEditMode) {
      this.http
        .get(`http://localhost:4000/api/v1/compounds/${this.id}`)
        .subscribe({
          next: (res: any) => {
            this.form.patchValue(res.data);
          },
          error: (err) => {
            console.log('API error:', err);
          },
        });
    }
  }

  submit() {
    console.log('clicked');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;

    if (this.isEditMode) {
      this.http
        .patch(`http://localhost:4000/api/v1/compounds/${this.id}`, data)
        .subscribe({
          next: (res: any) => {
            // alert('Compound updated');
            // this.router.navigate(['/compounds/', this.id]);
            this.location.back();
          },
          error: (err) => {
            console.log('API error:', err);
          },
        });
    } else {
      this.http.post(`http://localhost:4000/api/v1/compounds`, data).subscribe({
        next: (res: any) => {
          // this.router.navigate(['/']);
          this.location.back();
        },
        error: (err) => {
          console.log('API error:', err);
        },
      });
    }
  }
}
