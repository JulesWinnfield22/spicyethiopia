import ApiService from "~/service/ApiService";

const api = new ApiService();
const path = "/contact";

export function getContactInfo() {
  return api.addAuthenticationHeader().get(path);
}

export function updateContactInfo(data: {
  description: string;
  phone_number: string[];
  email: string;
  location: string;
  social_media: { platform: string; url: string }[];
}) {
  return api.addAuthenticationHeader().put(path, data);
}
