// storage.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private currentUserSubject = new BehaviorSubject<User | null>(null)

  constructor() {
    const currentUser = JSON.parse(localStorage['currentUser'] || 'null');
    this.currentUserSubject = new BehaviorSubject<any>(currentUser);
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  public get currentUser() : Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  public set currentUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  public clearCurrentUser() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
