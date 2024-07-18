export function passwordStrengthValidator(password: string): boolean {

    const hasUpperCase = /[A-Z]+/.test(password);
    const hasLowerCase = /[a-z]+/.test(password);
    const hasNumeric = /[0-9]+/.test(password);
    return hasUpperCase && hasLowerCase && hasNumeric;
}