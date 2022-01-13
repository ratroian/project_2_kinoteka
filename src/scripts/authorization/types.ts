export type TDomElements = {
    signUpForm: HTMLFormElement,
    signInForm: HTMLFormElement,
    passwordSignIn: HTMLFormElement,
    headerLink: HTMLAnchorElement,
    signInButton: HTMLButtonElement,
    signUpButton: HTMLButtonElement,
    errorTemplate: string
};

export type TLogin = {
    login: string,
    password: string,
};

export type TUserData = {
    id: number,
    token: string,
};

export type TUserSignUp = {
    first_name: string,
    last_name: string,
    login: string,
    password: string,
};

export type TErrorObject = {
    status: boolean,
    message: string,
};

export type TFormSignUp = {
    login: HTMLInputElement,
    password: HTMLInputElement,
    firstName: HTMLInputElement,
    lastName: HTMLInputElement,
};

export type TFormSignIn = {
    login: HTMLInputElement,
    password: HTMLInputElement,
};
