import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule]
})

export class TaskListComponent implements OnInit{
  tasks: Task[] = [];

  constructor(private taskService: TaskService, 
              private router: Router){}

  ngOnInit():void{
    const isAuthorized = localStorage.getItem("access_granted") === 'true';

    if(!isAuthorized){
      this.router.navigate(['/']);
      return;
    }
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
    });
  }

}
