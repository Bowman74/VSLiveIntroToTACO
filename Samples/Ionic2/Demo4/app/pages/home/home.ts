import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PrimesPage} from '../primes/primes';
import {RegistrationsPage} from '../registrations/registrations';

@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    constructor(private navController: NavController) {
    }

    tapPrimes(e) : void {
        this.navController.push(PrimesPage, {
        });
    }

    tapRegistrations(e) : void {
        this.navController.push(RegistrationsPage, {
        });
    }
}