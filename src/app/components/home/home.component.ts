import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import AlertsEnum from 'src/app/enums/alertsEnum';
import IFlight from 'src/app/models/IFlight';
import { FlightService } from 'src/app/services/FlightService';
import { SessionService } from 'src/app/services/SessionService';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    alertText: string | null = null;
    alertType = AlertsEnum.ERROR;
    isLoading: boolean = false;

    constructor(
        private router: Router,
        private sessionService: SessionService,
        private formBuilder: FormBuilder,
        private flightService: FlightService) { }

    flightInfoForm = this.formBuilder.group({
        airline: ['', {
            validators: [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50)
            ],
            updateOn: 'blur'
        }],
        arrivalDate: ['', {
            validators: [
                Validators.required,
                Validators.minLength(7),
                Validators.maxLength(10)
            ],
            updateOn: 'blur'
        }],
        arrivalTime: ['', {
            validators: [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(7)
            ],
            updateOn: 'blur'
        }],
        flightNumber: ['', {
            validators: [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(50),
                Validators.pattern('^[a-zA-Z0-9]*$')
            ],
            updateOn: 'blur'
        }],
        numOfGuests: [0, {
            validators: [
                Validators.required,
                Validators.min(0)
            ],
            updateOn: 'blur'
        }],
        comments: ['']
    });

    get airline() {
        return this.flightInfoForm.controls['airline'];
    }

    get arrivalDate() {
        return this.flightInfoForm.controls['arrivalDate'];
    }

    get arrivalTime() {
        return this.flightInfoForm.controls['arrivalTime'];
    }

    get flightNumber() {
        return this.flightInfoForm.controls['flightNumber'];
    }

    get numOfGuests() {
        return this.flightInfoForm.controls['numOfGuests'];
    }

    get comments() {
        return this.flightInfoForm.controls['comments'];
    }

    get isLoadingValue() {
        return this.isLoading;
    }

    set isLoadingValue(isLoading) {
        this.isLoading = isLoading;
    }

    onFlightInfoFormSubmit() {
        this.alertType = AlertsEnum.ERROR;

        if (!this.flightInfoForm.valid) {
            this.alertText = 'All fields marked with * are required.';
            return;
        }

        this.alertText = null;

        const flight: IFlight = {
            airline: '',
            arrivalDate: '',
            arrivalTime: '',
            flightNumber: '',
            numOfGuests: 0
        }

        if (this.airline.value) {
            flight.airline = this.airline.value;
        }
        if (this.arrivalDate.value) {
            flight.arrivalDate = this.arrivalDate.value;
        }
        if (this.arrivalTime.value) {
            flight.arrivalTime = this.arrivalTime.value;
        }
        if (this.flightNumber.value) {
            flight.flightNumber = this.flightNumber.value;
        }
        if (this.numOfGuests.value) {
            flight.numOfGuests = this.numOfGuests.value || 0;
        }
        if (this.comments.value) {
            flight.comments = this.comments.value;
        }

        this.isLoadingValue = !this.isLoadingValue;
        this.flightService.flightInfoChallenge(flight)
            .subscribe({
                next: (result) => {
                    this.isLoadingValue = !this.isLoadingValue;
                    this.alertType = AlertsEnum.SUCCESS;
                    this.alertText = 'The Flight information has been stored successfully.';
                    setInterval(() => {
                        this.onCloseAlert();
                    }, 5000);

                    this.onCleanForm();
                },
                error: (err) => {
                    this.alertText = 'There was an error processing the request. Please, try later.';
                    this.isLoadingValue = !this.isLoadingValue;
                }
            });;
    }

    onCloseAlert() {
        this.alertText = null;
        this.alertType = AlertsEnum.ERROR;
    }

    onCleanForm() {
        this.flightInfoForm.reset()
    }

    onLogOut() {
        this.sessionService.destroySession();
        this.router.navigateByUrl('login');
    }
}
