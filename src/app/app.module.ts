import { AngularFirestore } from 'angularfire2/firestore';
import { FormsModule } from '@angular/forms';
import { FirebaseConfig } from './../environments/firebase.config';
import { AuthguardGuard } from './authguard.guard';
import { UserService } from './user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LazyLoadModule } from './lazy-load/lazy-load.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { TesteComponent } from './teste/teste.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp, AngularFireModule } from 'angularfire2';
import { DataTableComponent } from './data-table/data-table/data-table.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LazyLoadModule,
    CoreModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(FirebaseConfig)
  ],
  providers: [UserService,
    AuthguardGuard,
    AngularFireAuth,
    AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
