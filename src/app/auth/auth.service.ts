import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    private router: Router
  ) { }

  initAuthListener() {
    this.afAuth.authState
      .subscribe( (fbUser: firebase.User) => {
        console.log('User', fbUser);
      });
  }

  public crearUsuario( nombre: string, email: string, password: string ) {
    this.afAuth.auth
      .createUserWithEmailAndPassword( email, password )
      .then( response => {

        const user: User = {
          uid: response.user.uid,
          nombre,
          email: response.user.email,
        };

        this.afDB.doc( `${ user.uid }/usuario` )
          .set( user )
          .then( () => {
            this.router.navigate(['/']);
          })
          .catch( e => {
            console.error(e);
          });

      })
      .catch( e => {
        console.error(e);
        Swal.fire({
          title: 'Error!',
          text: e.message,
          type: 'error',
          confirmButtonText: 'Ok'
        });
      });
  }

  public login( email: string, password: string ) {
    this.afAuth.auth
      .signInWithEmailAndPassword( email, password )
      .then( response => {
        this.router.navigate(['/']);
      })
      .catch( e => {
        console.error(e);
        Swal.fire({
          title: 'Error!',
          text: e.message,
          type: 'error',
          confirmButtonText: 'Ok'
        });
      });
  }

  public logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState
      .pipe(
        map( fbUser => {
          if (fbUser === null) {
            this.router.navigate(['/login']);
          }

          return fbUser !== null;
        })
      );
  }

}
