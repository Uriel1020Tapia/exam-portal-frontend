import { User } from "./User";

export interface CustomResponse {
    timeStamp:Date;
    statusCode: number;
    status:string;
    reason:string;
    message:string;
    developerMessage:string;
    data: { users :User[],user?:User}
}