import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {Registration} from '../../models/registration';

declare var WindowsAzure: any;

@Component({
    templateUrl: 'build/pages/editregistration/editregistration.html'
})
export class EditRegistrationPage {
    constructor(private navController: NavController, private params: NavParams, private alertCtrl: AlertController, private loadingController: LoadingController) {
        this.registration = this.params.get('registration');
    }

    public registration: Registration;

    onSave() {
        let loading = this.loadingController.create({
            content: "Please wait..."
        });
        loading.present();
        var azureConnection = new WindowsAzure.MobileServiceClient('https://malor2014jsmobileservice.azure-mobile.net/', '<some key here>');
        var tableRef = azureConnection.getTable('Registration');
        tableRef.update(this.registration).done((results) => {
            this.registration = results;
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

}