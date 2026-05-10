import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  users$: Observable<any[]>;

  constructor() {

    const users = [
      { id: 1, name: 'Kanak', age: 20 },
      { id: 2, name: 'Rahul', age: 17 },
      { id: 3, name: 'Priya', age: 22 },
      { id: 4, name: 'Aman', age: 15 },
      { id: 5, name: 'Sneha', age: 25 }
    ];

    this.users$ = of(users).pipe(

      map(users =>
        users.filter(user => user.age >= 18)
      ),

      map(users =>
        users.map(user => ({
          ...user,
          status: 'Adult'
        }))
      )
    );
  }
}