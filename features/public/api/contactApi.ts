import ApiService from "~/service/ApiService";

export function getContactInfo() {
  const api = useApiService();
  return api.get("/contact");
}

export function sendMessage(data: {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
}) {
  const api = useApiService();
  return api.post("/messages", data);
}
