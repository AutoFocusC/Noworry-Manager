import { VisaProduct } from "../meta/visa"

export interface VisaProductRes extends VisaProduct {
    picLink?: string
    picLinkTem?: string
    tips?: Array<Tip>;
}

interface Tip {
    children?: Tip[];
    title?: string;
}