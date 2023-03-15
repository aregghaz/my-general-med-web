export interface ISerialItem {
    img: string;
    title: string;
    text: string;
    image: string;
    url: string;
    genre?: string;
    year?: number;
    duration?: number;
}

export interface ISerialCard {
    id: number;
    genre?: string;
    year?: number;
    duration?: number;
    title: string;
    slug?: string;
    image: string;
    url: string;
    crudKey: string;
    quality?: string;
    rating?: number;
    description?: string;
    country?: string;
    director?: string;
    translation?: string;
    handlerLink?: (id: number, crudKey: string) => void;
    setSerialOpen?: (status: boolean) => void;
    home: boolean;
}

export interface IModalCard {
    id: number;
    genre?: string;
    year?: number;
    duration?: number;
    title: string;
    slug?: string;
    image: string;
    url: string;
    quality?: string;
    rating?: number;
    description?: string;
    country?: string;
    director?: string;
    translation?: string;
    setSerialOpen?: (status: boolean) => void;
    setMovesOpen?: (status: boolean) => void;
    serial: boolean;
}

export interface ISelect {
    id: number;
    name: string;
}


export interface ISerialData {
    text: string;
    description: string;
    items: Array<ISerialItem>;
}
