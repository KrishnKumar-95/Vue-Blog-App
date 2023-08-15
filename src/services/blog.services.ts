import type { IBlog } from "@interfaces/Blog";
import { APIRequest } from "./api-request";

export class BlogService extends APIRequest {

    createPost(payload: IBlog,headers: any) {
        return this.post('/create',payload, headers)
    }
    
}