export interface VisaCategory {
    categoryId?: number
    categoryName?: string
    parentId?: number
    remark?: string
}


export interface VisaProduct {
    commodityId?: number
    commodityType?: number
    commodityName?: string
    commodityBrief?: string
    initialQuantity?: number
    remainQuantity?: number
    originPrice?: number
    currentPrice?: number
    commodityStatus?: number
}

export interface VisaTip {
    stringId?: number
    visaType?: number
    stringContent?: string
}
