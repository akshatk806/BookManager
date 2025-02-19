import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { AddBook, RemoveBook } from '../books/book.action';
import { AppState } from '../app.state';

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
  books$: Observable<Book[]>;

  constructor(private store: Store<AppState>) {
    this.books$ = store.pipe(select('book'))             // Since this.books$ is an observable, the component can subscribe to it and get real-time updates whenever the books state changes.
  }

  addBook(id: string, title: string, author: string): void {
    // dispatch = starting an action
    this.store.dispatch(AddBook({ id, title, author} ));
  }

  removeBook(bookId: string) {
    this.store.dispatch(RemoveBook({ bookId }))
  }
}
