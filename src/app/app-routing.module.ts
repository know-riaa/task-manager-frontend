import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CodeGateComponent } from './components/code-gate/code-gate.component';

const routes: Routes = [
  {path : '', component : CodeGateComponent },
  {path : 'tasks', component : TaskListComponent },
  {path : '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
