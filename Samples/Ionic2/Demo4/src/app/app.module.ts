import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PrimesPage } from '../pages/primes/primes'
import { RegistrationsPage } from '../pages/registrations/registrations'
import { EditRegistrationPage } from '../pages/editregistration/editregistration'
import { AzureService } from '../services/azureservice';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PrimesPage,
    RegistrationsPage,
    EditRegistrationPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PrimesPage,
    RegistrationsPage,
    EditRegistrationPage
  ],
  providers: [{ provide: AzureService, useClass: AzureService }]
})
export class AppModule {}
