// AuthContextValueUSER.ts
import {  Dispatch, SetStateAction } from "react";

export interface AuthContextValueUSER {
    user: any;
    setUser: Dispatch<SetStateAction<any>>;
    login: (user_email: string, user_password: string) => Promise<{ success: boolean; message: string }>;
    logout: () => Promise<{ success: boolean; message: string }>;
    register: (values: {
        user_name: string;
        user_email: string;
        user_password: string;
        user_password_confirm: string;
    }) => Promise<{ success: boolean; message: string }>;
    forgot: (user_email: string) => Promise<{ success: boolean; message: string }>;
    loading: boolean;
    error: string | null;
}
