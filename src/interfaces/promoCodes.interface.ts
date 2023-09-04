export interface IPromoCode {
  code: string;
  discountPercentage: string;
  maxUsage: string;
  expiryDate: string;
  status: string;
  createdAt: string;
}

export const promoCodesColumns = [
  {
    name: 'Promo Code',
    selector: (row: IPromoCode) => row.code,
    sortable: false,
  },
  {
    name: 'Discount Percentage',
    selector: (row: IPromoCode) => row.discountPercentage,
    sortable: false,
  },
  {
    name: 'Max Usage',
    selector: (row: IPromoCode) => row.maxUsage,
    sortable: false,
  },
  {
    name: 'Expiry Date',
    selector: (row: IPromoCode) => row.expiryDate,
    sortable: false,
  },
  {
    name: 'Status',
    selector: (row: IPromoCode) => row.status,
    sortable: false,
  },
  {
    name: 'Created At',
    selector: (row: IPromoCode) => row.createdAt,
    sortable: false,
  },
];
