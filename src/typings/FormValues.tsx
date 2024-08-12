// FormValues.ts
export interface FormValuesLogin {
    email: string;
    password: string;
}

export interface FormValuesRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
    phoneNumber?: string;
}
