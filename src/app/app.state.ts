import { Book } from "./models/book";

// inside of our AppState we want to store the information of books 
export interface AppState {
    readonly book: Book[]     // since our appstate is immutable, we are never changing the app state directly we can change it by reducer.
}

// in NgRx you called book and not books by convention