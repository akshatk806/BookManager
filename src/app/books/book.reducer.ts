import { createReducer, on } from "@ngrx/store";

// reducer processing actions
import { AddBook, RemoveBook } from "./book.action";

import { Book } from "../models/book";  
// But why reducer needs to know about book? -> most important
// The reducer itself is taking care of segement like small part of entire state (like book)
// If we could have users and books, the Appstate is both users and books but the bookreducer only take care of books
// * A Reducer only handles a segment of the app state


// the reducer always need a initial state
export const initialState: Book[] = [];

// reducer, If a reducer processes an action then you will take current state -> copy -> make changes and returns a new state. So in order that we can copy a state we need a initialState atleast
export const BookReducer = createReducer(
    initialState,
    // registering two actions in our reducer
    on(AddBook, (state, { id, title, author }) => [...state, { id, title, author }]),     // ... -> create a new array and copy all elements from old state into it   
    // we are registering a kind of listener for our AddBook action and once this action appears now we have to define what the reducer should realy do? we use spread operator to take all books from previous state(copy) finally add a new book [...state, { id, title, author }] -> this is new book 
    
    on(RemoveBook, (state, { bookId }) => state.filter(book => book.id !== bookId))  // results into new array
);