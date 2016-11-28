import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { EditRegistrationPage } from '../editregistration/editregistration';
import { Registration } from '../../models/registration';
import { AzureService } from '../../services/azureservice';

declare var WindowsAzure: any;

@Component({
    templateUrl: 'registrations.html'
})

export class RegistrationsPage {

    constructor(private navController: NavController, private alertCtrl: AlertController, private loadingController: LoadingController, private azureService: AzureService) {
        this.registrations = [];
    }

    ionViewDidEnter() {
        let loading = this.loadingController.create({
            content: "Please wait..."
        });
        loading.present();
        this.azureService.getRegistrations().then((result : Registration[]) => {
            this.registrations = result;
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

    itemSelected(registration: Registration): void {
        this.navController.push(EditRegistrationPage, {
            registration: registration
        });
    }
}