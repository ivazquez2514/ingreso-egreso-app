import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction, UnsetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();
  private usuario: User;

  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    private router: Router,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    this.afAuth.authState
      .subscribe( (fbUser: firebase.User) => {
        if ( fbUser ) {
          this.userSubscription = this.afDB.doc( `${ fbUser.uid }/usuario` )
            .valueChanges()
            .subscribe( ( usuarioObj: any ) => {
              const newUser = new User( usuarioObj );
              this.usuario =  newUser;
              this.store.dispatch( new SetUserAction( newUser ) );
            });
        } else {
          this.userSubscription.unsubscribe();
        }
      });
  }

  public crearUsuario( nombre: string, email: string, password: string ) {

    this.store.dispatch( new ActivarLoadingAction() );

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
            this.store.dispatch( new DesactivarLoadingAction() );
          })
          .catch( e => {
            console.error(e);
          });

        })
        .catch( e => {
          console.error(e);
          this.store.dispatch( new DesactivarLoadingAction() );
          Swal.fire({
            title: 'Error!',
            text: e.message,
            type: 'error',
            confirmButtonText: 'Ok'
          });
      });
  }

  public login( email: string, password: string ) {

    this.store.dispatch( new ActivarLoadingAction() );

    this.afAuth.auth
      .signInWithEmailAndPassword( email, password )
      .then( response => {
        this.router.navigate(['/']);
        this.store.dispatch( new DesactivarLoadingAction() );
      })
      .catch( e => {
        console.error(e);
        this.store.dispatch( new DesactivarLoadingAction() );
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

    this.store.dispatch( new UnsetUserAction() );
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

  getUsuario() {
    return { ...this.usuario };
  }

}
