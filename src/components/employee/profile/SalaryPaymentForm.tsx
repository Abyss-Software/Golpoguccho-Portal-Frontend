import { Button, NumberInput, Select, TextInput } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ISalaryRecordDto } from '@/interfaces/financialRecord.interface';
import { SalaryRecordValidatorSchema } from '@/constants/validation/FinancialRecordCreateValidationSchema';
import { recordMediumOptions } from '@/constants/selectOptions';
import { DatePickerInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { AiOutlineCheckCircle as CheckIcon } from 'react-icons/ai';
import { BiErrorCircle as ErrorIcon } from 'react-icons/bi';
import { modals } from '@mantine/modals';
import useEmployeeAction from '@/hooks/useEmployeeActions';

function SalaryPaymentForm({ employeeId }: { employeeId: string }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ISalaryRecordDto>({
    resolver: zodResolver(SalaryRecordValidatorSchema),
  });

  const { salaryPaymentMutation } = useEmployeeAction();

  const handleSalaryPayment = (data: ISalaryRecordDto) => {
    data = { ...data, id: employeeId };
    salaryPaymentMutation.mutate(data, {
      onSuccess: () => {
        notifications.update({
          withBorder: true,
          id: 'salaryRecordCreation',
          color: 'green',
          title: 'Success',
          message: 'Salary record added',
          icon: <CheckIcon size="2rem" />,
        });
        modals.closeAll();
      },
      onError: (error: any) => {
        notifications.update({
          withBorder: true,
          id: 'salaryRecordCreation',
          color: 'red',
          title: 'Failed',
          message: error?.response?.data?.message || 'Something went wrong',
          icon: <ErrorIcon size="2rem" />,
        });
      },
    });
  };

  const onSubmitClick = (data: ISalaryRecordDto) => {
    handleSalaryPayment(data);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmitClick)}>
      <h2> Make Salary Payment</h2>
      <TextInput
        {...register('title', { required: true })}
        size="md"
        label="Title"
        placeholder="Enter Record Title"
        error={errors?.title && errors?.title?.message}
      />

      <NumberInput
        {...register(`amount`, {
          valueAsNumber: true,
        })}
        size="md"
        min={0}
        max={100000}
        placeholder="Salary Amount"
        label="Amount"
        onChange={(value) => {
          setValue(`amount`, value || 0);
        }}
        error={errors?.amount && errors?.amount?.message}
      />

      <DatePickerInput
        {...register(`transactionDate`)}
        withAsterisk
        clearable
        dropdownType="modal"
        size="md"
        label="Transaction Date"
        placeholder="Date of Transaction"
        onChange={(value) => {
          setValue(`transactionDate`, new Date(value?.toISOString() ?? ''));
        }}
        error={errors?.transactionDate?.message}
      />

      <Select
        {...register(`medium`)}
        size="md"
        placeholder="Pick record medium"
        searchable
        label="Medium"
        nothingFound="No options"
        data={recordMediumOptions}
        onChange={(value) => {
          setValue(`medium`, value ?? '');
        }}
        error={errors?.medium && errors?.medium?.message}
      />

      <TextInput
        {...register('trxId')}
        size="md"
        label="Transaction Id"
        placeholder="Enter Transaction ID"
        error={errors?.trxId && errors?.trxId?.message}
      />

      <Button type="submit">Pay Salary</Button>
    </form>
  );
}

export default SalaryPaymentForm;
