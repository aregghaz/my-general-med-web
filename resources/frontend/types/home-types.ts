export type themesType = 'light' | 'dark'

export interface IPartner {
    id: number
    name: string
    description: Array<string>
    image: string
    rating: number
    slug?: string
}

export interface IClientsData {
    id: number
    client_id: number
    driver_id: number
    surname: string
    name: string
    drop_down_address: string
    pick_up_address: string
    apartament_number: string
    birthday: string
    email: string
    id_number: number
    phone_number: string
    status: number
    ccn: number
    pick_up:string
    drop_down:string
}


export interface ITitle {
    name: string,
    show: boolean
}

export interface ITraditionalCraft {
    id: number
    text: string
    image: string
    title: string
    slug: string
}

export interface ICulturalCustom {
    image: string
    title: string
    text: string
    slug: string
}

export interface IHandmadeProduct {
    id?: number
    image: string
    title: string
    text: string
    price: number
    slug?: string
    currency?: string
}


export interface IService {
    image: string
    title: string
    text: string
    slug: string
}



















