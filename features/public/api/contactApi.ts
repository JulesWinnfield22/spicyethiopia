import ApiService from "~/service/ApiService";

const api = new ApiService();

export function getContactInfo() {
  return api.get("/contact");
}

export function sendMessage(data: {
  fullname: string;
  email: string;
  phoneNumber: string;
  message: string;
}) {
  return api.post("/messages", data);
}
