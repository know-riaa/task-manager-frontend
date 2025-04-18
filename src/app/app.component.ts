import { Component } from '@angular/core';
import { CodeGateComponent } from './components/code-gate/code-gate.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
   <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAuthorized = localStorage.getItem('access_granted') === 'true';
}