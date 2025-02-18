import { createAction, props } from "@ngrx/store";   // sometimes we create a action to remove a book but we have to specify the more information like which book to create and this is a kind of a property so we importing props here
import { Book } from "../models/book";

// creating constants
export const AddBook = createAction('[Book] Add Book', props<Book>())   // we are going to submit books to this action. props means extra information, here props -> here is the Book you should create 

// action for removing book
export const RemoveBook = createAction('[Book] Remove Book', props<{bookId: string}>())     // props -> here is bookId you should remove the book