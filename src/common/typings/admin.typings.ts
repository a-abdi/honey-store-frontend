export interface Admin {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
};

export interface AdminData {
    data: { 
        access_token: string
    };
};

export interface AdminLoginData {
    phoneNumber: string | null;
    password: string | null;
};