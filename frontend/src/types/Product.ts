import { Category } from "./Category";

export interface Product {
    id: string,
    title: string,
    price: number,
    description: string,
    images: {
        link: string;
      }[];
}