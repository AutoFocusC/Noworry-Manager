import { OrderBase, OrderDetail } from "../meta/order";

export interface OrderDetailInfo extends OrderDetail {
    commodityName?: string
    commodityBrief?: string
    commodityType?: number
    picLink?: string
    picLinkTem?: string
}

export interface Order extends OrderBase {
    orderDetailInfoGroup?: Array<OrderDetailInfo>;
    tips?: Array<{ title: string; children: Array<string> }>
}