import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PrimesPage } from '../pages/primes/primes';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PrimesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PrimesPage
  ],
  providers: []
})
export class AppModule {}
