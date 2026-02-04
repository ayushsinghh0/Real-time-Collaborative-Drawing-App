import { User } from "../Usertypes";


declare global {
    namespace Express {
        export interface Request {
            user:User
        }
    }
}