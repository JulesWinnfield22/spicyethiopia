import ApiService from "~/service/ApiService";

const api = new ApiService();

const path = "/content";

export function setText(id: string, content: string) {
  return api.addAuthenticationHeader().put(`${path}/text/${id}`, {content});
}

export function setImage(id: string, content: FormData) {
  return api.addAuthenticationHeader().put(`${path}/image/${id}`, content, {
    headers: {
      'Content-Type': 'multippart/form-data'
    }
  });
}

export function getContent(id: string) {
  return api.addAuthenticationHeader().get(`${path}/${id}`)
}
