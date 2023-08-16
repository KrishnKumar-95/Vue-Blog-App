import router from "@router/index";
import { isUrl } from "@utils/validators"

export abstract class APIRequest {

    // CHECK STATUS & SEND RESPONSE
    private checkStatus(response: Response) {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }
        if (response.status === 401) {
            router.push('/auth/login');
          throw new Error('Forbidden in the action!');
        }
        throw response.clone().json();
    }

    // CHECK STATUS & PARSE
    private parseJSON(response: Response) {
      if (response.status === 204 || response.status === 205) {
        return null;
      }
      return response.json();
    }

    request(
        url: string, 
        method?: string, 
        body?: any, 
        headers?: { [key: string]: string }
    ) {
        const verb = (method || 'get').toUpperCase()
        const updatedHeader = {
            'Content-Type': 'application/json',
            ...headers || {}
        }

        const options = {
          method: verb,
          body: body
        }

        const __options = {
          method: verb,
          headers: updatedHeader,
          body: body
      }

        return fetch(isUrl(url) ? url : import.meta.env.VITE_BASE_URL + url, verb === "POST" ? options : __options)
        .then(this.checkStatus)
        .then(this.parseJSON)
    }

    // GET BLOG
    get(url: string, headers?: { [key: string]: string }) {
        return this.request(url, 'get', null, headers);
    }
    
    // ADD POST
    post(
      url: string, 
      data: any,
    headers?: { [key: string]: string }) {
      // const formData = new FormData();
      // data.forEach((d) => formData.append(d.fieldname, d.file, d.file.name));
      return this.request(url, 'post', data, headers);
    }
}