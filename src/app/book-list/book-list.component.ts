import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { AddBook, RemoveBook } from '../books/book.action';

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
  books$: Observable<Book[]>;

  constructor(private store: Store<{books: Book[]}>) {
    this.books$ = store.pipe(select('books'))             // we notify because we subscribed to obserable
   }

  addBook(id: string, title: string, author: string): void {
    // dispatch = starting an action
    this.store.dispatch(AddBook({ id, title, author} ));
  }

  removeBook(bookId: string) {
    this.store.dispatch(RemoveBook({ bookId }))
  }
}
