import { Injectable } from '@angular/core';
import { Registration } from '../models/registration';

declare var WindowsAzure: any;

@Injectable()
export class AzureService {
    private azureService: any;

    private getAzureService(): any {
        if (this.azureService == null) {
            this.azureService = new WindowsAzure.MobileServiceClient('https://malor2014jsmobileservice.azure-mobile.net/', 'pdFskoBXcwzaDNTpuRWdVRhUIRYcFF14');
        }
        return this.azureService;
    }

    getRegistrations(): Promise<Registration[]> {
        return new Promise<Registration[]>((resolve, reject) => {
            this.getAzureService().getTable('Registration').take(100).read().done((results) => {
                resolve(results);
            }, (err) => {
                reject(err.message);
            });
        });
    }

    saveRegistration(registration: Registration): Promise<Registration> {
        return new Promise<Registration>((resolve, reject) => {
            this.getAzureService().getTable('Registration').update(registration).done((results : Registration) => {
                resolve(results);
            }, (err) => {
                reject(err.message);
            });
        });
    }
}