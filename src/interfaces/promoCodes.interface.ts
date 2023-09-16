export interface IPromoCode {
  id: string;
  promo_code: string;
  description: string;
  percentage: number;
  max_use: number;
  max_discount: number;
  expiry_date: Date;
  status: string;
  createdAt: Date;
}

export interface IPromoDto {
  id?: string;
  promoCode: string;
  description: string;
  discountPercentage: number;
  maxUse: number;
  maxDiscount: number;
  expiryDate: Date;
  status: string;
}
