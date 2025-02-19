import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as bookActions from "./book.action";
import { BookService } from "./book.service";
import { mergeMap, map, catchError, of } from "rxjs";


@Injectable()
export class BookEffects {
    
    // This is an NgRx effect that responds to 'AddBook' actions.
    addBook$ = createEffect(() => this.actions$.pipe(
        // Listen for actions of type 'AddBook'
        ofType(bookActions.AddBook),                                            // this effect will only run when a specific action of type AddBook occurs in our application

        // For each 'AddBook' action, call 'addBook' on the book service
        // 'mergeMap' allows multiple concurrent 'addBook' calls
        mergeMap((action) => this.bookService.addBook(action)                   //  what we want to do when this action occurs, the (action) is book here(props)

            // If the 'addBook' call is successful, dispatch 'AddBookSuccess' action with the book data.
            .pipe(
                map(book => bookActions.AddBookSuccess(book)),  

                // If the 'addBook' call fails, dispatch 'AddBookFailure' action with the error.
                catchError((error) => of(bookActions.AddBookFailure({error})))
            )))                                  
    );                                           // we only run this effect when specific action appears

    /* step by step creation of effects
        1. we create a effect, createEffect. We only want to run this effect if a specific action appears in this case we only want to run this effect when AddBook action appers which is our initial one
        2. we using mergeMap functionality this allows us to take an obserable or multiple obserable entrance format into a single obserable for stuff like saving things, adding things to database so we use mergeMap
        3. mergeMap takes an obserable then mapping them to one new obserable
        4. we take action in mergeMap and then we call this.bookService.addBook(action), here we call addBook method on our service which then maybe put the book into database, it would return any type of response so in our case it is an obserable 
            and we want to pipe this 
        5. what map is doing here -> it takes the book which we getting from book service and then we are mapping it into in AddBookSuccess action (starting the action)
        6. if any error occurs we catch that error then we creating a obserable from of for the AddBookFailure which is basically then starting the action including the error message
    */

    constructor(private actions$: Actions, private bookService: BookService) { }
    // actions$ -> whatever actions are currently running inside our NgRx application, whenever we dispatch our action from application let say add book initial action we will get that the freshly dispatched actions via injection right here
    // actions$ -> how we can access to actions that got dispatched in our application
    // actions$ -> is a way how we can notified about new actions that got dispatched in our application

}