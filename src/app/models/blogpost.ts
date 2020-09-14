import { Tag } from "./tag";

export interface Blogpost {
    _id: string;
    title: string;
    text: string;
    tags: Tag[];
    date: Date;
}