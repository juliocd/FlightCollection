import { inject } from '@angular/core';
import { SessionService } from '../services/SessionService';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/AccountService';
import { catchError, map } from 'rxjs/operators';

export const canGetHome: CanActivateFn = () => {
    const sessionService = inject(SessionService);
    const accountService = inject(AccountService);
    const router = inject(Router);

    const session = sessionService.getSession();

    if (!session) {
        router.navigateByUrl('/login');
        return false;
    }

    return accountService.getUserData(session.idToken).pipe(
        map((result) => {
            const user = result.users[0];
            sessionService.setUserSession({
                email: user.email
            })

            return true;
        }),
        catchError((err, caught) => {
            console.error(err.error);

            router.navigateByUrl('/login');
            return caught;
        })
    );
}

export const isPublicPath: CanActivateFn = (route, state) => {
    const sessionService = inject(SessionService);
    const router = inject(Router);

    const session = sessionService.getSession();

    if (session) {
        router.navigateByUrl('/home');
        return false;
    }

    return true;
}
