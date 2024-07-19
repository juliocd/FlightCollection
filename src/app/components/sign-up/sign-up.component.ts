import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import AlertsEnum from 'src/app/enums/alertsEnum';
import { passwordStrengthValidator } from 'src/app/helpers/utils';
import { AccountService } from 'src/app/services/AccountService';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
    alertText: string | null = null;
    alertType = AlertsEnum.ERROR;
    isLoading: boolean = false;

    userForm = this.formBuilder.group({
        email: ['', {
            validators: [
                Validators.required,
                Validators.email
            ],
            updateOn: 'blur'
        }],
        password: [
            '',
            [Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15)
            ]
        ],
        confirmPassword: [
            '',
            [Validators.required]
        ]
    });

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private accountService: AccountService) { }

    onSignUpFormSubmit() {
        this.alertType = AlertsEnum.ERROR;

        if (!this.userForm.valid) {
            this.alertText = 'All fields marked with * are required.';
            return;
        }

        if (!this.password.value || !this.email.value) {
            this.alertText = 'Email and password are required.';
            return;
        }

        if (!passwordStrengthValidator(this.password.value || '')) {
            this.alertText = 'Password must have an upper caase letter, a lower case letter, and a number';
            return;
        }

        if (this.password.value != this.confirmPassword.value) {
            this.alertText = 'Password and Confirm Password does not match.';
            return;
        }

        this.alertText = null;

        this.isLoadingValue = !this.isLoadingValue;
        this.accountService.signUp(this.email.value, this.password.value)
            .subscribe({
                next: () => {
                    this.isLoadingValue = !this.isLoadingValue;

                    this.alertType = AlertsEnum.SUCCESS;
                    this.alertText = 'You account has been created successfully. You will be redirected to the login page shortly.';
                    setInterval(() => {
                        this.router.navigateByUrl("/login");
                    }, 5000);
                },
                error: (err) => {
                    if (err.error?.error?.message === "EMAIL_EXISTS") {
                        this.alertType = AlertsEnum.WARNING;
                        this.alertText = 'The email provided already exist. Please, enter a different email or sing in from the login page.';
                    } else {
                        this.alertText = 'There was an error processing the request. Please, try later.';
                    }
                    this.isLoadingValue = !this.isLoadingValue;
                }
            });
    }

    get email() {
        return this.userForm.controls['email'];
    }

    get password() {
        return this.userForm.controls['password'];
    }

    get confirmPassword() {
        return this.userForm.controls['confirmPassword'];
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
