import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  _id?: string;
  title: string;
  author: string;
  year: number | string;
  genre: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class BookService {
  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> { return this.http.get<Book[]>(this.apiUrl); }
  getBook(id: string): Observable<Book> { return this.http.get<Book>(`${this.apiUrl}/${id}`); }
  addBook(book: Book): Observable<any> { return this.http.post(this.apiUrl, book); }
  updateBook(id: string, book: Book): Observable<any> { return this.http.put(`${this.apiUrl}/${id}`, book); }
  deleteBook(id: string): Observable<any> { return this.http.delete(`${this.apiUrl}/${id}`); }
}
