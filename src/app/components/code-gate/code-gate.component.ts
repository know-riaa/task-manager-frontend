import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-code-gate',
  standalone: true,
  templateUrl: './code-gate.component.html',
  styleUrls: ['./code-gate.component.css'],
  imports: [FormsModule, CommonModule]
})
export class CodeGateComponent {
  accessCode = '';
  errorMessage = '';
  secret = '1234';

  constructor(private router : Router) {}

  validateCode() {
    if (this.accessCode === this.secret) {
      localStorage.setItem('access_granted', 'true');
      setTimeout(() => {
        this.router.navigate(['/tasks']);
      }, 100);
    } else {
      this.errorMessage = 'Incorrect Code. Try Again.';
    }
  }
}