import {AppStateType} from './store'

export const getHomePageData = (state: AppStateType) => ({
    data: state.homeReducer.data,
    pagination: state.homeReducer.pagination,
})

export const getUserData = (state: AppStateType) => ({user: state.authReducer.user})

export const getAdminData = (state: AppStateType) => ({
    admin: state.authReducer.user,
    loggedIn: state.authReducer.loggedIn
})


export const getLoginError = (state: AppStateType) => ({error: state.authReducer.error})

export const getSerialsData = (state: AppStateType) => ({
    data: state.serialsReducer.data,
    category: state.serialsReducer.category,
})
export const getItemData = (state: AppStateType) => ({
    id: state.itemReducer.id,
    genre: state.itemReducer.genre,
    year: state.itemReducer.year,
    duration: state.itemReducer.duration,
    title: state.itemReducer.name,
    slug: state.itemReducer.slug,
    url: state.itemReducer.url,
    kinopoisk_id: state.itemReducer.kinopoisk_id,
    translation: state.itemReducer.translation,
    rating: state.itemReducer.rating,
    quality: state.itemReducer.quality,
    director: state.itemReducer.director,
    description: state.itemReducer.description,
    country: state.itemReducer.country,
    image: state.itemReducer.image,
})





