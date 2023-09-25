import { Button } from '@mantine/core';

import { BiTrash } from 'react-icons/bi';
import { IFinancialRecord } from '@/interfaces/financialRecord.interface';

export const financialRecordsColumns = ({
  onRecordDelete,
}: {
  onRecordDelete: (data: IFinancialRecord) => void;
}) => [
  {
    name: 'Title',
    selector: (row: IFinancialRecord) => row.title,
    sortable: false,
    wrap: true,
    width: '20%',
  },
  {
    name: 'Transaction Date',
    selector: (row: IFinancialRecord) =>
      new Date(row.transactionDate).toLocaleDateString(),
    sortable: true,
    id: 'transactionDate',
  },
  {
    name: 'Type',
    selector: (row: IFinancialRecord) => row.type,
    sortable: true,
  },
  {
    name: 'Amount',
    selector: (row: IFinancialRecord) => row.amount,
    sortable: true,
  },
  {
    name: 'Category',
    selector: (row: IFinancialRecord) => row.category,
    sortable: false,
    wrap: true,
  },
  {
    name: 'Medium',
    selector: (row: IFinancialRecord) => row.medium,
    sortable: false,
  },
  {
    name: 'Transaction Id',
    selector: (row: IFinancialRecord) => row.trxId,
    sortable: false,
  },
  {
    name: 'Action',
    center: true,
    cell: (row: any) => {
      return (
        <Button
          onClick={() => onRecordDelete(row)}
          variant="outline"
          color="red"
          size="xs"
        >
          <BiTrash size="1.5rem" color="red" />
        </Button>
      );
    },
  },
];
