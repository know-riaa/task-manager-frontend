import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent {
  pin: string = '';
  error: boolean = false;

  private readonly adminPin = '4321';

  constructor(private router: Router) {}

  verifyPin() {
    if (this.pin === this.adminPin) {
      this.router.navigate(['/delete']);
    } else {
      this.error = true;
    }
  }

  goBack() {
    this.router.navigate(['/chat']);
  }
}