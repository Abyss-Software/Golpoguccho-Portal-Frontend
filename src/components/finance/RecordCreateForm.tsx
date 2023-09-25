import { Button, NumberInput, Select, TextInput } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IFinancialRecord } from '@/interfaces/financialRecord.interface';
import { FinancialReportCreateValidatorSchema } from '@/constants/validation/FinancialRecordCreateValidationSchema';
import {
  recordMediumOptions,
  recordTypeOptions,
} from '@/constants/selectOptions';
import { DateInput } from '@mantine/dates';

function RecordCreateFrom({
  onRecordCreate,
}: {
  onRecordCreate?: SubmitHandler<IFinancialRecord>;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,

    formState: { errors },
  } = useForm<IFinancialRecord>({
    resolver: zodResolver(FinancialReportCreateValidatorSchema),
  });

  const onSubmitClick = () => {
    onRecordCreate?.(getValues());
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmitClick)}>
      <h2> Add Financial Record</h2>
      <TextInput
        {...register('title', { required: true })}
        size="md"
        label="Title"
        placeholder="Enter Record Title"
        error={errors?.title && errors?.title?.message}
      />

      <Select
        {...register(`type`)}
        size="md"
        placeholder="Pick record type"
        searchable
        label="Type"
        nothingFound="No options"
        data={recordTypeOptions}
        onChange={(value) => {
          setValue(`type`, value ?? '');
        }}
        error={errors?.type && errors?.type?.message}
      />

      <NumberInput
        {...register(`amount`, {
          valueAsNumber: true,
        })}
        size="md"
        min={0}
        max={100000}
        placeholder="Amount"
        label="Amount"
        onChange={(value) => {
          setValue(`amount`, value || 0);
        }}
        error={errors?.amount && errors?.amount?.message}
      />
      <DateInput
        {...register(`transactionDate`)}
        withAsterisk
        clearable
        size="md"
        label="Transaction Date"
        placeholder="Date of Transaction"
        onChange={(value) => {
          setValue(`transactionDate`, new Date(value?.toISOString() ?? ''));
        }}
        error={errors?.transactionDate?.message}
      />
      <TextInput
        {...register('category', { required: true })}
        size="md"
        label="Category"
        placeholder="Enter Category"
        error={errors?.category && errors?.category?.message}
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

      <Button type="submit">Add new record</Button>
    </form>
  );
}

export default RecordCreateFrom;
