import { Tag } from "./tag";

export interface Artwork {
    _id: string;
    title: string;
    description: string;
    file: File;
    fileID: string;
    tags: Tag[];
    date: Date;
}