import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'card',
  imports: [MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() data: any;

  constructor(private router: Router) {}

  clickHandler() {
    console.log('clicked');
    this.router.navigate(['/compounds/', this.data.id]);
  }
}
