import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

declare var navigator: any;
declare var Connection: any;

@Component({
    templateUrl: 'primes.html'
})
export class PrimesPage {
    http: Http;
    alertCtrl: AlertController;
    loadingController: LoadingController;

    constructor(private navController: NavController, http: Http, alertCtrl: AlertController, loadingController: LoadingController) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingController = loadingController;
    }

    public maxValue: number = 0;

    findMaxPrime(e) {
        if (this.isNumber(this.maxValue)) {
            if (!this.activeConnection()) {
                let alert = this.alertCtrl.create({
                    title: 'No connection available',
                    subTitle: 'Cannot calculate largest prime',
                    buttons: ['OK']
                });
                alert.present();
            } else {
                let loading = this.loadingController.create({
                    content: "Please wait..."
                });
                loading.present();
                this.http.get('http://calcmaxprimeservice.azurewebsites.net/api/maxprimes/' + this.maxValue)
                        .map((res: Response) => res.json()).subscribe(res => {
                        loading.dismiss();
                        let alert = this.alertCtrl.create({
                            title: 'Prime Calculated',
                            subTitle: 'Largest Prime found ' + res,
                            buttons: ['OK']
                        });
                        alert.present();
                    }, error => {
                        loading.dismiss();
                        let alert = this.alertCtrl.create({
                            title: 'Error',
                            subTitle: 'Error calculating the max prime: ' + error,
                            buttons: ['OK']
                        });
                });
            }
        } else {
            let alert = this.alertCtrl.create({
                title: 'Prime Calculation Error',
                subTitle: 'Must enter a numeric max value: ' + this.maxValue,
                buttons: ['OK']
            });
            alert.present();
        }
    }

    activeConnection(): boolean {
        return navigator.connection && navigator.connection.type != Connection.NONE;
    }

    isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}