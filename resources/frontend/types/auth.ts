export interface ISelect {
    id: number
    name: string
}


export interface IUser {
    id?: number
    birthday: string | null
    business_address: null | string
    // spheresOfActivity?: Array<ISelect>
    email: string | null
    image?: string
    languages?: Array<ISelect>
    name: string
    description?: string
    phone_number: string
    region?: null | string
    surname: string
    rating?: number
    role: string
}


export interface IError {
    email?: string,
    password?: string,
    remember?: string
}
