//发送邮件

export class EmailReq {
    title: string
    content: string
    receiver?: string

    constructor(title: string, content: string, receiver?: string) {
        this.title = title;
        this.content = content;
        this.receiver = receiver;
    }
}