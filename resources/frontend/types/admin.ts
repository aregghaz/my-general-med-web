export interface IPaginationTypes {
    count: ICount
    activeItem:  number
    handlerChangeItem?: (id: number) => void
}

export interface ICount {
    from : number,
    to :number
}