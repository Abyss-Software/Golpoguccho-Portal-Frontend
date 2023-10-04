import { Button, Card, LoadingOverlay } from '@mantine/core';
import CommonDataTable from '../dataTable/CommonDataTable';
import { IFinancialRecord } from '@/interfaces/financialRecord.interface';
import { modals } from '@mantine/modals';
import { Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { AiOutlineCheckCircle as CheckIcon } from 'react-icons/ai';
import { BiErrorCircle as ErrorIcon } from 'react-icons/bi';
import useRecordAction from '@/hooks/useRecordAction';
import { useEffect, useState } from 'react';
import { DateInput } from '@mantine/dates';
import { useIsMutating } from '@tanstack/react-query';
import RecordCreateForm from './RecordCreateForm';
import { financialRecordsColumns } from './RecordsColumns';

export default function FinancialRecordsTable() {
  const {
    fetchRecords,
    fetchRecordsBetweenMutation,
    createRecordMutation,
    deleteRecordMutation,
  } = useRecordAction();

  const { data: financialRecords } = fetchRecords();

  const handleDeleteRecord = (id: string) => {
    deleteRecordMutation.mutate(id, {
      onSuccess: () => {
        notifications.update({
          withBorder: true,
          id: 'recordDelete',
          color: 'green',
          title: 'Success',
          message: 'Record Deleted',
          icon: <CheckIcon size="2rem" />,
        });
        modals.closeAll();
      },
      onError: (error: any) => {
        notifications.update({
          withBorder: true,
          id: 'recordDelete',
          color: 'red',
          title: 'Failed',
          message: error?.response?.data?.message || 'Something went wrong',
          icon: <ErrorIcon size="2rem" />,
        });
      },
    });
  };

  const onRecordDelete = (row: IFinancialRecord) => {
    modals.openConfirmModal({
      title: 'Please confirm your action',
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete this Promo Code?</Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => handleDeleteRecord(row.id!),
    });
  };

  const onRecordCreate = (data: IFinancialRecord) => {
    createRecordMutation.mutate(data, {
      onSuccess: () => {
        notifications.update({
          withBorder: true,
          id: 'recordCreation',
          color: 'green',
          title: 'Success',
          message: 'Financial record added',
          icon: <CheckIcon size="2rem" />,
        });
        modals.closeAll();
      },
      onError: (error: any) => {
        notifications.update({
          withBorder: true,
          id: 'recordCreation',
          color: 'red',
          title: 'Failed',
          message: error?.response?.data?.message || 'Something went wrong',
          icon: <ErrorIcon size="2rem" />,
        });
      },
    });
  };

  const isMutating = useIsMutating({
    mutationKey: ['countsBetween', 'monthlyCounts'],
  });

  const [startDate, setStartDate] = useState<Date | null>(
    new Date('2023-09-15')
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const [records, setRecords] = useState<IFinancialRecord[]>([]);

  const handleRecordsBetween = async () => {
    fetchRecordsBetweenMutation.mutate(
      { start: startDate!, end: endDate! },
      {
        onSuccess: (res) => {
          setRecords(res.body);
        },
      }
    );
  };

  const handleRecordCreate = () => {
    modals.open({
      title: 'Add New Record',
      centered: true,
      size: 'lg',
      children: <RecordCreateForm onRecordCreate={onRecordCreate} />,
    });
  };

  useEffect(() => {
    if (financialRecords) {
      setRecords(financialRecords.body);
    }
  }, [financialRecords]);

  const [finance, setFinance] = useState({
    income: 0,
    expense: 0,
    profit: 0,
  });

  useEffect(() => {
    if (records) {
      setFinance({
        income: 0,
        expense: 0,
        profit: 0,
      });

      const result = {
        income: 0,
        expense: 0,
        profit: 0,
      };

      records.forEach((record) => {
        if (record.type === 'INCOME') {
          result.income += record.amount;
        } else {
          result.expense += record.amount;
        }
      });
      result.profit = result.income - result.expense;
      setFinance(result);
    }
  }, [records]);

  return (
    <div className="mt-5 space-y-4">
      <LoadingOverlay visible={isMutating > 0} overlayBlur={2} />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Financial Records</h1>
        <Button onClick={handleRecordCreate} color="green" size="lg">
          Add New Record
        </Button>
      </div>
      <div className="flex items-end gap-3 ">
        <DateInput
          label="Start Date"
          placeholder="Start Date"
          size="lg"
          className="w-full"
          value={startDate}
          onChange={setStartDate}
        />
        <DateInput
          label="End Date"
          placeholder="End Date"
          size="lg"
          className="w-full"
          value={endDate}
          onChange={setEndDate}
        />

        <Button
          onClick={handleRecordsBetween}
          loading={isMutating > 0}
          color="green"
          size="lg"
          className=""
        >
          Get Records
        </Button>
      </div>
      <div className="flex items-center justify-between ">
        <Card
          shadow="sm"
          radius="md"
          className="p-5 text-center"
          style={{ width: '32%' }}
        >
          <h4>Income: BDT. {finance.income} </h4>
        </Card>
        <Card
          shadow="sm"
          radius="md"
          className="p-5 text-center"
          style={{ width: '32%' }}
        >
          <h4>Expense: BDT. {finance.expense}</h4>
        </Card>
        <Card
          shadow="sm"
          radius="md"
          className="p-5 text-center"
          style={{ width: '32%' }}
        >
          <h4>Profit: BDT. {finance.profit}</h4>
        </Card>
      </div>
      {records && (
        <CommonDataTable<IFinancialRecord>
          data={records}
          columns={financialRecordsColumns({
            onRecordDelete: onRecordDelete,
          })}
          defaultSortField="transactionDate"
        />
      )}
    </div>
  );
}
