import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements OnInit{
  userInput: string = '';
  messages: { from: 'user' | 'bot', text: string }[] = [];
  books: any[] = [];

  successMessage = '';

  showAddBookForm = false;
  deleteMode = false;

  bookTitle = '';
  bookAuthor = '';
  bookIsbn = '';
  bookFile: File | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  routeMode: 'chat' | 'delete' = 'chat';

ngOnInit(): void {
  const currentPath = this.router.url;
  this.routeMode = currentPath.includes('/delete') ? 'delete' : 'chat';

  if (this.routeMode === 'delete') {
    this.messages.push({ from: 'bot', text: 'Enter the ISBN of the book to delete:' });
    this.deleteMode = true;
  }
}

sendMessage() {
  if (!this.userInput.trim()) return;

  const message = this.userInput.trim().toLowerCase();
  this.messages.push({ from: 'user', text: message });

  // 🔍 Fancy command detection
  const isAddCommand = /\b(add|upload|new|insert)\b/.test(message);
  const isDeleteCommand = /\b(delete|remove|erase|trash|destroy)\b/.test(message);

  // Step 1: Handle delete flow - second step (ISBN entered on /delete route)
  if (this.deleteMode || this.routeMode === 'delete') {
    const isbn = this.userInput.trim();
    this.http.delete(`http://18.116.147.248:8080/api/books/${isbn}`, { responseType: 'text' }).subscribe({
      next: (res) => {
        this.messages.push({ from: 'bot', text: res });
        this.books = this.books.filter(book => book.isbn !== isbn);
        this.deleteMode = false;
        this.successMessage = 'Book deleted successfully! Returning to chat...';
    
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/chat']);
        }, 2000);
      },
      error: () => {
        this.messages.push({ from: 'bot', text: 'Failed to delete book. Please check the ISBN.' });
        this.deleteMode = false;
        this.router.navigate(['/chat']);
      }
    });
    this.userInput = '';
    return;
  }

  if (isAddCommand) {
    this.showAddBookForm = true;
    this.messages.push({ from: 'bot', text: 'Please enter the book details below.' });
    this.userInput = '';
    return;
  }

  if (isDeleteCommand) {
    this.router.navigate(['/admin-auth']);
    return;
  }

  this.http.post<any>("http://18.116.147.248:8080/api/chat", { message }).subscribe({
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

  onFileSelected(event: any) {
    this.bookFile = event.target.files[0];
  }

  uploadBook() {
    if (!this.bookFile) return;

    const formData = new FormData();
    formData.append('title', this.bookTitle);
    formData.append('author', this.bookAuthor);
    formData.append('isbn', this.bookIsbn);
    formData.append('file', this.bookFile);

    this.http.post("http://18.116.147.248:8080/api/books/upload", formData, { responseType: 'text' })
      .subscribe({
        next: () => {
          this.messages.push({ from: 'bot', text: 'Book uploaded successfully!' });
          this.resetForm();
        },
        error: (err) => {
          console.error(err);
          this.messages.push({ from: 'bot', text: 'Failed to upload book.' });
        }
      });
  }

  resetForm() {
    this.bookTitle = '';
    this.bookAuthor = '';
    this.bookIsbn = '';
    this.bookFile = null;
    this.showAddBookForm = false;
  }

  downloadBook(url: string, filename: string) {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
