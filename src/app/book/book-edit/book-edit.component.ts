import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService, Book } from '../../services/book.service';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent implements OnInit {
  book: Book = { title: '', author: '', year: '', genre: '', description: '' };
  loading = true;
  submitting = false;
  error = '';
  bookId = '';

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id') || '';
    if (this.bookId) {
      this.bookService.getBook(this.bookId).subscribe({
        next: (data) => { this.book = data; this.loading = false; },
        error: () => { this.error = 'Failed to load book.'; this.loading = false; }
      });
    }
  }

  onSubmit(): void {
    this.submitting = true;
    this.bookService.updateBook(this.bookId, this.book).subscribe({
      next: () => { this.router.navigate(['/books']); },
      error: () => { this.error = 'Failed to update book.'; this.submitting = false; }
    });
  }
}
