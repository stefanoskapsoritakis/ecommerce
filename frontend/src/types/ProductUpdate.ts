export interface ProductUpdate {
    id: string
    update: {
        title?: string
        price?: number
        description?: string
        images?: string[]
    }
}