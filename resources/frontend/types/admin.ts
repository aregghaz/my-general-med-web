export interface IPaginationTypes {
    count: ICount
    last_page:number
    activeItem:  number
    handlerChangeItem?: (id: number) => void
}

export interface ICount {
    from : number,
    to :number
}