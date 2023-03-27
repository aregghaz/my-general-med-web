export type themesType = "light" | "dark"

export interface IImages {
    original: string,
    thumbnail?: string,
    ///  slug: string,
}

export interface IPartner {
    id: number;
    name: string;
    description: Array<string>;
    image: string;
    rating: number;
    slug?: string;
}

export interface IClientsData {
    trip_id: number,
    fullName: string,
    gender: string,
    pick_up_address: string,
    los: string,
    phone_number: string,
    date_of_service: string,
    pick_up: string,
    drop_down: string,
    request_type: number,
    status: number,
    origin: string,
    origin_phone: string,
    origin_comment: string,
    destination: string,
    destination_phone: string,
    destination_comment: string,
    miles: number,
    member_uniqie_identifer: number,
    birthday: number
    weight: number,
    height: number,
}

// export interface IClientsData {
//     show:false,
//             clientData :Array<any>
// }


export interface ITitle {
    name: string,
    show: boolean
}

export interface ITraditionalCraft {
    id: number;
    text: string;
    image: string;
    title: string;
    slug: string;
}

export interface ICulturalCustom {
    image: string;
    title: string;
    text: string;
    slug: string;
}

export interface IHandmadeProduct {
    id?: number;
    image: string;
    title: string;
    text: string;
    price: number;
    slug?: string;
    currency?: string;
}





















