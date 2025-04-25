import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CodeGateComponent } from './components/code-gate/code-gate.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { AdminAuthComponent } from './components/admin-auth/admin-auth.component';

const routes: Routes = [
  {path : '', component : CodeGateComponent },
  {path : 'tasks', component : TaskListComponent },
  {path : 'chat', component : ChatBotComponent },
  { 
    path: 'admin-auth', 
    loadComponent: () => import('./components/admin-auth/admin-auth.component')
      .then(m => m.AdminAuthComponent) 
  },
  {path : 'delete', component : ChatBotComponent},
  {path : '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
