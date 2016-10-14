import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
import {EditRegistrationPage} from '../editregistration/editregistration';
import {Registration} from '../../models/registration';

declare var WindowsAzure: any;

@Component({
    templateUrl: 'build/pages/registrations/registrations.html'
})

export class RegistrationsPage {

    constructor(private navController: NavController, private alertCtrl: AlertController, private loadingController: LoadingController) {
        this.registrations = [];
    }

    onPageDidEnter() {
        let loading = this.loadingController.create({
            content: "Please wait..."
        });
        loading.present();
        var azureConnection = new WindowsAzure.MobileServiceClient('https://malor2014jsmobileservice.azure-mobile.net/', '<some key here>');
        var tableRef = azureConnection.getTable('Registration');
        tableRef.take(100).read().done((results) => {
            this.registrations = results;
            loading.dismiss();
        }, (error) => {
            loading.dismiss();
            let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'An error has occurred ' + error,
                buttons: ['OK']
            });
            alert.present();
        });
    }

    public registrations: Registration[];

    itemSelected(registration: Registration) : void {
        this.navController.push(EditRegistrationPage, {
            registration: registration
        });
    }
}