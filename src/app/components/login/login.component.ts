import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import AlertsEnum from 'src/app/enums/alertsEnum';
import { AccountService } from 'src/app/services/AccountService';
import { SessionService } from 'src/app/services/SessionService';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    alertText: string | null = null;
    alertType = AlertsEnum.ERROR;
    isLoading: boolean = false;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private accountService: AccountService,
        private sessinService: SessionService) { }

    loginForm = this.formBuilder.group({
        email: ['', {
            validators: [
                Validators.required,
                Validators.email
            ],
            updateOn: 'blur'
        }],
        password: [
            '',
            [Validators.required
            ]
        ]
    });

    onLoginFormSubmit() {
        this.alertType = AlertsEnum.ERROR;

        if (!this.loginForm.valid || !this.password.value || !this.email.value) {
            this.alertText = 'Email and password are required.';
            return;
        }

        this.alertText = null;

        this.isLoadingValue = !this.isLoadingValue;
        this.accountService.signIn(this.email.value, this.password.value)
            .subscribe({
                next: (result) => {
                    this.isLoadingValue = !this.isLoadingValue;

                    this.sessinService.setUserSession({
                        email: result.email
                    });
                    this.sessinService.setSession({
                        idToken: result.idToken,
                        refreshToken: result.refreshToken,
                        expiresIn: result.expiresIn
                    });

                    this.router.navigateByUrl("/home");
                },
                error: (err: any) => {
                    if (err.error?.error?.message === "INVALID_LOGIN_CREDENTIALS") {
                        this.alertText = 'Email or password is not correct.';
                    } else {
                        this.alertText = 'There was an error processing the request. Please, try later.';
                    }

                    this.isLoadingValue = !this.isLoadingValue;
                }
            });;
    }

    get email() {
        return this.loginForm.controls['email'];
    }

    get password() {
        return this.loginForm.controls['password'];
    }

    get isLoadingValue() {
        return this.isLoading;
    }

    set isLoadingValue(isLoading) {
        this.isLoading = isLoading;
    }

    onCloseAlert() {
        this.alertText = null;
        this.alertType = AlertsEnum.ERROR;
    }

}
