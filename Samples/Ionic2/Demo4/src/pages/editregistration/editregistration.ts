import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Registration } from '../../models/registration';
import { AzureService } from '../../services/azureservice';

declare var WindowsAzure: any;

@Component({
    templateUrl: 'editregistration.html'
})
export class EditRegistrationPage {
    constructor(private navController: NavController, private params: NavParams, private alertCtrl: AlertController, private loadingController: LoadingController, private azureService: AzureService) {
        this.registration = this.params.get('registration');
    }

    public registration: Registration;

    onSave() {
        let loading = this.loadingController.create({
            content: "Please wait..."
        });
        loading.present();
        this.azureService.saveRegistration(this.registration).then((result: Registration) => {
            this.registration = result;
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