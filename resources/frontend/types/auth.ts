export interface ISelect {
    id: number;
    name: string;
    slug: string;
    count?: number;
}


export interface IUser {
    id?: number;
    birthday: string | null;
    business_address: null | string;
    // spheresOfActivity?: Array<ISelect>
    email: string | null;
    image?: string;
    languages?: Array<ISelect>;
    name: string;
    count: number;
    description?: string;
    phone_number: string;
    region?: null | string;
    surname: string;
    rating?: number;
    role: string;
    pages:  Array<ISelect>;
}


export interface IError {
    email?: string,
    password?: string,
    remember?: string
}
