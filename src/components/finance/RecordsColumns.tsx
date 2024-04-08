import { Button } from '@mantine/core';

import { BiTrash } from 'react-icons/bi';
import { IFinancialRecord } from '@/interfaces/financialRecord.interface';

const dateSort = (rowA: any, rowB: any) => {
  let dateA = rowA.transactionDate
    ? new Date(rowA.transactionDate).getTime()
    : 0;
  let dateB = rowB.transactionDate
    ? new Date(rowB.transactionDate).getTime()
    : 0;

  return dateA > dateB ? 1 : -1;
};

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
      new Date(row.transactionDate).toLocaleDateString('en-GB'),
    sortable: true,
    id: 'transactionDate',
    sortFunction: dateSort,
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
