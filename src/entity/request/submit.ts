import { OrderBase, OrderDetail } from "../meta/order";
import { SheetJapaneseVisa, SheetSchengen, SheetUSVisa } from "../meta/sheet";

//用户端-订单提交表单
export interface OrderSubmitForm {
    //后续需要放在cookie里
    token?: string,
    orderId?: number
    orderTotalPrice?: number,
    favourablePrice?: number,
    orderPaymentPrice?: number,
    payStatus?: number,
    payWay?: 0 | 1 | 2,//0 微信支付 1 客服辅助支付
    orderDetail?: [
        {
            commodityId: number,
            remark?: string,
            boughtQuantity: number,
            invPrice: number
        }
    ],
    contact?: string
}

//用户端-填写表单
export interface SheetSchengenReq {
    token: string,
    sheet: SheetSchengen
}

export interface SheetUSVisaReq {
    token: string,
    sheet: SheetUSVisa
}

export interface SheetJPVisaReq {
    token: string,
    sheet: SheetJapaneseVisa
}

//管理端-商品提交表单
export interface VisaForm {
    commodityBrief: null | string;
    commodityId: number;
    commodityName: string;
    commodityStatus: number;
    commodityType?: number;
    currentPrice: number;
    initialQuantity?: number | null;
    originPrice?: number | null;
    picLink?: string;
    picLinkTem?: string;
    remainQuantity?: number;
    tips?: Tip[] | null;
}

export interface Tip {
    children?: Tip[];
    title?: string;
}

//管理端-操作更新表单状态
export interface OrderBaseStatus {
    orderId?: number
    status?: number //修改后的订单状态
    data?: OrderBase
}

//管理端-操作更新详单状态
export interface OrderDetailStatus {
    orderDetailId?: number
    status?: number //修改后的详单状态
    data?: OrderDetail
    sheet?: SheetSchengen | SheetUSVisa | SheetJapaneseVisa
}