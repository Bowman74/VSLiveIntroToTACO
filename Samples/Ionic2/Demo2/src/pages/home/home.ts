import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PrimesPage } from '../primes/primes';

@Component({
    templateUrl: 'home.html'
})
export class HomePage {
    constructor(private navController: NavController) {
    }

    tapEvent(e) {
        this.navController.push(PrimesPage, {
        });
    }
}