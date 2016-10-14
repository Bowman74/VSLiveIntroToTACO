import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
import {Http, Response} from '@angular/http';

declare var navigator: any;
declare var Connection: any;

@Component({
    templateUrl: 'build/pages/primes/primes.html'
})
export class PrimesPage {
    
    constructor(private navController: NavController, private http: Http, private alertCtrl: AlertController, private loadingController: LoadingController) {
    }

    public maxValue: number = 0;

    findMaxPrime(e) : void {
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