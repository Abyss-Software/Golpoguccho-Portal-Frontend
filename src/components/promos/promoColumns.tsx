import { IPromoCode } from '@/interfaces/promoCodes.interface';
import { Button } from '@mantine/core';
import { AiFillEdit } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';

export const promoCodesColumns = ({
  onPromoUpdate,
  onPromoDelete,
}: {
  onPromoUpdate: (data: IPromoCode) => void;
  onPromoDelete: (data: IPromoCode) => void;
}) => [
  {
    name: 'Promo Code',
    selector: (row: IPromoCode) => row.promo_code,
    sortable: false,
  },
  {
    name: 'Discount Percentage',
    selector: (row: IPromoCode) => row.percentage,
    sortable: false,
  },
  {
    name: 'Max Usage',
    selector: (row: IPromoCode) => row.max_use,
    sortable: false,
  },
  {
    name: 'Expiry Date',
    selector: (row: IPromoCode) => row.expiry_date,
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
  {
    name: 'Action',
    center: true,
    cell: (row: any) => {
      return (
        <div className="flex items-center gap-2">
          <Button onClick={() => onPromoUpdate(row)} variant="outline">
            <AiFillEdit size="1.5rem" color="green" />
          </Button>

          <Button
            onClick={() => onPromoDelete(row)}
            variant="outline"
            color="red"
          >
            <BiTrash size="1.5rem" color="red" />
          </Button>
        </div>
      );
    },
  },
];
