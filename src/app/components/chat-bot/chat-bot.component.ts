import { environment } from './../../../environments/environment.prod';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent {
  userInput: string = '';
  messages: { from: 'user' | 'bot', text: string }[] = [];
  books: any[] = [];

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    const message = this.userInput;
    this.messages.push({ from: 'user', text: message });

    this.http.post<any>("http://localhost:8080/api/chat", { message }).subscribe({
      next: (response) => {
        if (Array.isArray(response.reply)) {
          this.books = response.reply;
          this.messages.push({ from: 'bot', text: 'Here are the books I found:' });
        } else {
          this.books = [];
          this.messages.push({ from: 'bot', text: response.reply || 'Hmm... I didn’t understand that.' });
        }
      },
      error: () => {
        this.messages.push({ from: 'bot', text: "Oops! Server error" });
      }
    });

    this.userInput = '';
  }
}