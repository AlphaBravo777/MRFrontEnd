﻿// The alert component passes alert messages to the template whenever a message is received from the alert service.
// It does this by subscribing to the alert service's getMessage() method which returns an Observable.

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from './alert.service';

@Component({
    selector: 'app-auth-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(message => {
            if (!message) {return; }
            this.message = message;
            console.log('===', message);
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
