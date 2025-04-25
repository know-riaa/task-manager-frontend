import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-book-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './book-upload.component.html',
  styleUrls: ['./book-upload.component.css']
})
export class BookUploadComponent {
  title = '';
  author = '';
  isbn = '';
  selectedFile!: File;
  message = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('author', this.author);
    formData.append('isbn', this.isbn);
    formData.append('file', this.selectedFile);

    this.http.post("http://18.116.147.248:8080/api/books/upload", formData)
      .subscribe({
        next: () => this.message = 'Book uploaded successfully!',
        error: () => this.message = 'Upload failed. Try again.'
      });
  }
}