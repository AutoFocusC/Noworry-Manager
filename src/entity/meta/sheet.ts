export interface SheetSchengen {
    sheetId?: number
    orderDetailId?: number

    handSignCountry?: string
    handSignCity?: string
    handHistoryExist?: number
    handHistoryDate?: string
    handHistoryCountry?: string
    handHistoryValidity?: string
    handHistoryCode?: string

    chineseName?: string
    firstName?: string
    lastName?: string

    birthday?: string
    sex?: number
    marriedStatus?: number
    birthplace?: string
    nationality?: string
    nationalityPre?: string

    phoneEngland?: string
    email?: string
    addressEngland?: string
    passportCode?: string
    passportIssue?: string
    passportValidity?: string

    BRPNumber?: string
    BRPIssue?: string
    BRPValidity?: string
    collegeName?: string
    collegeAddress?: string
    collegePhone?: string
    collegeEmail?: string
    subjectName?: string

    estDepartureTime?: string
    estReturnTime?: string

    wechatId?: string
}

export interface SheetUSVisa {
    sheetId?: number
    orderDetailId?: number

    chineseName?: string
    firstName?: string
    lastName?: string

    birthday?: string
    sex?: number
    marriedStatus?: number
    birthplace?: string
    nationality?: string
    nationalityPre?: string

    phoneEngland?: string
    email?: string
    passportCode?: string

    handSignCity?: string

    tableDLS?: number

    DLS_number?: string

    visaType?: number

    handHistoryExist?: number

    handHistoryValidity?: string

    estInterviewTime?: string

    wechatId?: string

    mailAddress?: string
}

export interface SheetJapaneseVisa {
    sheetId?: number
    orderDetailId?: number

    chineseName?: string
    lastName?: string
    firstName?: string
    handSignCity?: string
    birthday?: string
    sex?: number
    marriedStatus?: number
    birthplace?: string
    nationality?: string
    nationalityPre?: string
    phoneEngland?: string
    email?: string
    addressEngland?: string
    passportCode?: string
    passportFrom?: string
    passportIssue?: string
    passportValidity?: string
    BRPNumber?: string
    BRPIssue?: string
    BRPValidity?: string
    applyPurpose?: string
    personStatus?: string
    collegeName?: string
    collegeAddress?: string
    collegePhone?: string
    collegeEmail?: string
    subjectName?: string
    estDepartureTime?: string
    estReturnTime?: string
    wechatId?: string
}