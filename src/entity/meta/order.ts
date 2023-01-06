
export interface OrderBase {
    orderId?: number
    openid?: string
    contact?: string
    orderStatus?: number
    orderTotalPrice?: number
    favourablePrice?: number
    orderPaymentPrice?: number
    createTime?: Date
    updateTime?: Date
}


export interface OrderDetail {
    orderDetailId?: number
    orderId?: number
    status?: number
    commodityId?: number
    boughtQuantity?: number
    invPrice?: number
    remark?: string
    createTime?: Date
    updateTime?: Date
}