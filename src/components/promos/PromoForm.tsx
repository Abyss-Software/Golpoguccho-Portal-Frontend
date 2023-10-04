import {
  Button,
  NumberInput,
  Select,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IPromoDto } from '@/interfaces/promoCodes.interface';
import { PromoValidationSchema } from '@/constants/validation/PromoValidationSchema';
import { DateInput } from '@mantine/dates';
import { statusOptions } from '@/constants/selectOptions';

function PromoForm({
  onPromoUpdate,
  onPromoCreate,
  isUpdate,
  defaultValues,
}: {
  onPromoUpdate?: SubmitHandler<IPromoDto>;
  onPromoCreate?: SubmitHandler<IPromoDto>;
  isUpdate?: boolean;
  defaultValues?: IPromoDto;
}) {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IPromoDto>({
    resolver: zodResolver(PromoValidationSchema),
    defaultValues: defaultValues,
  });

  const onSubmitClick = () => {
    if (isUpdate) {
      onPromoUpdate?.(getValues());
    } else {
      onPromoCreate?.(getValues());
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmitClick)}>
      <TextInput
        {...register('promoCode', { required: true })}
        size="md"
        label="Promo Code"
        placeholder="Enter Promo Code"
        disabled={isUpdate}
        error={errors?.promoCode && errors?.promoCode?.message}
      />

      <Textarea
        {...register('description', { required: true })}
        size="md"
        label="Description"
        placeholder="Enter Event Type Description"
        error={errors?.description && errors?.description?.message}
      />

      <NumberInput
        {...register('discountPercentage', { valueAsNumber: true })}
        size="md"
        min={0}
        max={100}
        precision={3}
        label="Discount Percentage"
        placeholder="Enter Discount Percentage"
        defaultValue={defaultValues?.discountPercentage}
        error={
          errors?.discountPercentage && errors?.discountPercentage?.message
        }
        onChange={(value) => setValue('discountPercentage', value || 0)}
      />

      <NumberInput
        {...register('maxUse', { valueAsNumber: true })}
        size="md"
        min={0}
        max={100}
        label="Max Use"
        placeholder="Enter Max Use"
        defaultValue={defaultValues?.maxUse}
        error={errors?.maxUse && errors?.maxUse?.message}
        onChange={(value) => setValue('maxUse', value || 0)}
      />

      <NumberInput
        {...register('maxDiscount', { valueAsNumber: true })}
        size="md"
        min={0}
        max={100}
        label="Max Discount"
        placeholder="Enter Max Discount"
        defaultValue={defaultValues?.maxDiscount}
        error={errors?.maxDiscount && errors?.maxDiscount?.message}
        onChange={(value) => setValue('maxDiscount', value || 0)}
      />

      <DateInput
        {...register(`expiryDate`)}
        withAsterisk
        clearable
        size="lg"
        label="Expiry Date"
        defaultValue={new Date(defaultValues?.expiryDate ?? Date.now())}
        minDate={new Date()}
        placeholder="Expiry Date"
        onChange={(value) => {
          setValue(`expiryDate`, new Date(value?.toISOString() ?? ''));
        }}
        error={errors?.expiryDate && errors?.expiryDate.message}
      />

      <Select
        {...register(`status`)}
        label="Status"
        size="lg"
        placeholder="Pick promo code status"
        searchable
        nothingFound="No options"
        data={statusOptions}
        defaultValue={defaultValues?.status}
        onChange={(value) => {
          setValue(`status`, value ?? '');
        }}
        error={errors?.status && errors?.status?.message}
      />

      <Button type="submit">Create Event Type</Button>
    </form>
  );
}

export default PromoForm;
