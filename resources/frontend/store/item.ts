import {InferActionsTypes} from './store'

const initialState = {
    id: null as number,
    genre: '' as string,
    year: null as number,
    duration: null as number,
    kinopoisk_id: null as number,
    rating: null as number,
    name: '' as string,
    director: '' as string,
    quality: '' as string,
    translation: '' as string,
    description: '' as string,
    country: '' as string,
    slug: '' as string,
    image: '' as string,
    url: '' as string,
}
type InitialState = typeof initialState
type Actions = InferActionsTypes<typeof actions>

const itemReducer = (state = initialState, action: Actions): InitialState => {


    switch (action.type) {
        case 'FETCHING_MOVES_ITEM_PAGE_DATA':
            return {
                ...state,
                id: action.payload.id,
                genre: action.payload.genre,
                year: action.payload.year,
                duration: action.payload.duration,
                name: action.payload.name,
                slug: action.payload.slug,
                url: action.payload.url,
                kinopoisk_id: action.payload.kinopoisk_id,
                director: action.payload.director,
                quality: action.payload.quality,
                rating: action.payload.rating,
                description: action.payload.description,
                country: action.payload.country,
                image: action.payload.image,
            }
        case 'RESET_ITEM_PAGE_STATE':
            return {
                ...state,
                id: null,
                genre: '',
                year: null,
                duration: null,
                kinopoisk_id: null,
                name: '',
                slug: '',
                url: '',
                director: '',
                quality: '',
                description: '',
                country: '',
                rating: null,
                image: '',
            }
        default:
            return state
    }

}


export const actions = {
    fetching: (data: InitialState) => ({type: 'FETCHING_MOVES_ITEM_PAGE_DATA', payload: data} as const),
    resetState: () => ({type: 'RESET_ITEM_PAGE_STATE'} as const)
}


export default itemReducer
