import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CodeGateComponent } from './app/components/code-gate/code-gate.component';
import { TaskListComponent } from './app/components/task-list/task-list.component';
import { ChatBotComponent } from './app/components/chat-bot/chat-bot.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(FormsModule),
    provideRouter([
      { path: '', component: CodeGateComponent },
      { path: 'tasks', component: TaskListComponent },
      { path: 'chat', component: ChatBotComponent },
      { path: '**', redirectTo: '' }
    ])
  ]
}).catch(err => console.error(err));