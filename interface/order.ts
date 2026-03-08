export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum PaymentMethod {
  STRIPE = "STRIPE",
  CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
}

export interface OrderItem {
  _id?: string;
  product: string;
  quantity: number;
  price: number;
  title: string;
  image: string;
  description: string;
}

export interface ShippingAddress {
  streetAddress: string;
  apartment?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface PaymentInfo {
  paymentMethod: PaymentMethod;
  stripePaymentIntentId?: string;
  stripeCustomerId?: string;
  lastFourDigits?: string;
  cardBrand?: string;
  receiptUrl?: string;
  transactionId?: string;
  paymentMethodType?: string;
}

export interface Order {
  id: string; // Mongoose _id usually mapped to id in frontend
  _id: string;
  user?: string;
  orderItems: OrderItem[];
  customerInfo: CustomerInfo;
  shippingAddress: ShippingAddress;
  paymentInfo: PaymentInfo;
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  notes?: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}
