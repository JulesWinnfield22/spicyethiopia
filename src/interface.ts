export interface AsyncResponse<T = any> {
  status?: number;
  success?: boolean;
  data?: T;
  error?: string;
}

export enum Status {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  SUSPENDED = "SUSPENDED",
}

export enum PaymentStatus {
  REQUESTED = "Requested",
  PROCESSED = "Processed",
  CHECKED = "Checked",
  APPROVED = "Approved",
  AUTHORIZED = "Authorized",
}

export type ButtonClickHandler = (event: MouseEvent) => void;

export type Query = Record<string, any>;

interface Permissions {
  id: string;
  name: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permissions[];
}

type Gender = {
  Male: "Male";
  Female: "Female";
};

export interface User {
  id: string;
  email: string;
  roleName: string;
  firstName: string;
  fathersName: string;
  grandFathersName: string;
  gender: Gender;
  password?: string;
  phone_number: string;
  status: Status;
  roles: Role[];
}

export type CreateProductForm = {
  title: string;
  images: { name: ""; file: File }[];
  description: string;
  ingredients: string[];
  instructions: string[];
  price: number;
  discountPercentage: number;
  discountExpiry?: Date;
  discountedPrice?: number;
  isDiscounted: boolean;
  weight: string;
  weightUnit: "g" | "kg" | "ml" | "l";
  quantity: number;
  status: string;
};
