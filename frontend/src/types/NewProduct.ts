export interface NewProduct{
    title: string
    description: string
    price: number
    inventory: number
    images: {
        link: string;
      }[];
}