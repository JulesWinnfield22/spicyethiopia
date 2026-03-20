import ApiService from "~/service/ApiService";

const path = "/contact";

export function getContactInfo() {
  const api = useApiService();
  return api.addAuthenticationHeader().get(path);
}

export function updateContactInfo(data: {
  description: string;
  phone_number: string[];
  email: string;
  location: string;
  social_media: { platform: string; url: string }[];
}) {
  const api = useApiService();
  return api.addAuthenticationHeader().put(path, data);
}
