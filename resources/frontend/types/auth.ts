export interface ISelect {
    id: number
    name: string
}


export interface IUser {
    id?: number
    birthday: string | null
    business_address: null | string
    description: Array<ISelect>
    email: string | null
    image?: string
    languages?: Array<ISelect>
    name: string
    phone_number: string
    region: null | string
    surname: string
    rating?: number
}


export interface IError {
    email?: string,
    password?: string,
    remember?: string
}
