import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookService, Book } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  loading = true;
  error = '';
  successMsg = '';

  constructor(private bookService: BookService) {}
  ngOnInit(): void { this.loadBooks(); }

  loadBooks(): void {
    this.loading = true;
    this.bookService.getBooks().subscribe({
      next: (data) => { this.books = data; this.loading = false; },
      error: () => { this.error = 'Could not connect. Ensure the API server is running.'; this.loading = false; }
    });
  }

  deleteBook(id: string): void {
    if (!confirm('Remove this book from the collection?')) return;
    this.bookService.deleteBook(id).subscribe({
      next: () => { this.successMsg = 'Book removed.'; this.loadBooks(); setTimeout(() => this.successMsg = '', 3000); },
      error: () => { this.error = 'Failed to remove book.'; }
    });
  }
}
