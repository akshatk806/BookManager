import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book } from '../models/book';
import { AddBook, RemoveBook } from '../books/book.action';

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
  constructor(private store: Store<{books: Book[]}>) { }

  addBook(id: string, title: string, author: string): void {
    // dispatch = starting an action
    this.store.dispatch(AddBook({ id, title, author} ));
  }

  removeBook(bookId: string) {
    this.store.dispatch(RemoveBook({ bookId }))
  }
}
