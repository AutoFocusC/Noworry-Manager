import { UserInfo } from "../meta/userinfo"

export interface UserRes {
    userInfo?: UserInfo
    token?: string
    status?: boolean
}

export interface AccessToken {
    access_token?: string
    expires_in?: number
    errcode?: number
    errmsg?: string
}