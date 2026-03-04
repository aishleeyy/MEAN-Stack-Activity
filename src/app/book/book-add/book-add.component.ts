import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService, Book } from '../../services/book.service';

@Component({
  selector: 'app-book-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './book-add.component.html',
  styleUrl: './book-add.component.css'
})
export class BookAddComponent {
  book: Book = { title: '', author: '', year: '', genre: '', description: '' };
  submitting = false;
  error = '';

  constructor(private bookService: BookService, private router: Router) {}

  onSubmit(): void {
    this.submitting = true;
    this.bookService.addBook(this.book).subscribe({
      next: () => { this.router.navigate(['/books']); },
      error: () => { this.error = 'Failed to add book. Make sure the API server is running.'; this.submitting = false; }
    });
  }
}
