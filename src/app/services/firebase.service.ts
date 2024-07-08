import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  user$: Observable<User | null>;

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.user$ = this.afAuth.authState as Observable<User | null>;
  }

  register(email: string, password: string): Promise<firebase.default.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  saveUserData(uid: string, email: string, username: string): Promise<void> {
    return this.firestore.collection('users').doc(uid).set({
      uid: uid,
      email: email,
      username: username,
      role: 'user'
    });
  }

  login(email: string, password: string): Promise<firebase.default.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  getAuthState(): Observable<firebase.default.User | null> {
    return this.afAuth.authState;
  }

  getUserData(uid: string): Observable<User | null> {
    return this.firestore.collection('users').doc<User>(uid).valueChanges().pipe(
      map((user: User | undefined) => user || null)
    );
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
}
