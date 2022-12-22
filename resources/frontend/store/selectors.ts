import {AppStateType} from './store'

export const getHomePageData = (state: AppStateType) => ({
  ///  filtered_data: state.homeReducer.filtered_data,
    titlesData: state.homeReducer.titles,
    // total:state.homeReducer.total,
    // last_page:state.homeReducer.last_page,
    // pagination: state.homeReducer.pagination,
})
export const getClientData = (state:AppStateType)=>({
    show: state.clientReducer.show,
    data:state.clientReducer.data,
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





