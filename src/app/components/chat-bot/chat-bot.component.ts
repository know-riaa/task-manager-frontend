import { environment } from './../../../environments/environment';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent {
  userInput: string = '';
  messages: {from: 'user' | 'bot', text: string } [] = [];

  constructor(private http: HttpClient){}
  
  sendMessage(){
    if(!this.userInput.trim()) return;

    const message = this.userInput;
    this.messages.push({from: 'user', text: message });

    this.http.post<any>(`${environment.apiBaseUrl}/api/chat`, {message: message}).subscribe({
      next: (response)=> {
        this.messages.push({from: 'bot', text: response.reply});
      },
      error: () => {
        this.messages.push({from: 'bot', text:"OOps! Server error"});
      }
    });

    this.userInput= '';
  }
}
