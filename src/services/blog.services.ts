import type { IBlog } from "@interfaces/Blog";
import { APIRequest } from "./api-request";

export class _BlogService extends APIRequest {

    createPost(payload: any, headers: any) {
        return this.post('create',payload, headers)
    }

    getPosts() {
        return this.get("posts")
    }

    getSinglePost(id: number|string) {
        return this.get(`posts/${id}`)
    }
    
}

export const BlogService = new _BlogService()