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
    trip_id:number,
    name:string,
    surname:string,
    gender:string,
    pick_up_address:string,
    los:string,
    phone_number:string,
    date_of_service:string,
    appointment_time:string,
    pick_up:string,
    drop_down:string,
    request_type: number,
    status:number,

    origin_name:string,
    origin_street:string,
    origin_suite:string,
    origin_city:string,
    origin_state:string,
    origin_postal:string,
    origin_country:string,
    origin_phone:string,
    origin_comment:string,
    destination_name:string,
    destination_street:string,
    destination_suite:string,
    destination_city:string,
    destination_state:string,
    destination_postal:string,
    destination_country:string,
    destination_phone:string,
    destination_comment:string,
    escortType:number,
    type_of_trip:number,
    miles:number,
    member_uniqie_identifer:number,
    birthday:number}
// export interface IClientsData {
//     show:false,
//             clientData :Array<any>    
// }


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



















