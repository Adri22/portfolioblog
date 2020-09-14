import { Artwork } from "./artwork";

export interface Article {
    _id: string;
    artwork: Artwork;
    price: number;
    forSale: boolean;
}