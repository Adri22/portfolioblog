import { Tag } from "./tag";

export interface Artwork {
    _id: string;
    title: string;
    description: string;
    image: string;
    tags: Tag[];
    date: Date;
}