import { Injectable, signal } from '@angular/core';
import type { User } from '../types';
import { DataStore } from '../store/data.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private dataStore = new DataStore();

  userSignal = signal<User | null>(this.dataStore.currentUser);
  private initialUser = this.dataStore.currentUser;

  get user(): User | null {
    return this.userSignal();
  }

  get isAuthenticated(): boolean {
    return this.userSignal() !== null;
  }

  login(username: string, password: string): boolean {
    const user = this.dataStore.login(username, password);
    if (user) {
      this.userSignal.set(user);
      return true;
    }
    return false;
  }

  signup(username: string, password: string): boolean {
    const user = this.dataStore.signup(username, password);
    if (user) {
      this.userSignal.set(user);
      return true;
    }
    return false;
  }

  logout(): void {
    this.dataStore.logout();
    this.userSignal.set(null);
  }
}
