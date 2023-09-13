import { Button, Group, Radio, TextInput } from '@mantine/core';
import BkashInstructions from '../bookingForm/BkashInstructions';
import BankInstructions from '../bookingForm/BankTransferInstructions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DuePaymentValidationSchema } from '@/constants/validation/DuePaymentValidationSchema';
import { IDuePayment } from '@/interfaces/bookings.interface';
import useBookingAction from '@/hooks/useBookingAction';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { AiOutlineCheckCircle as CheckIcon } from 'react-icons/ai';
import { BiErrorCircle as ErrorIcon } from 'react-icons/bi';

export default function DuePaymentForm({
  bookingId,
  duePayment,
}: {
  bookingId: string;
  duePayment: number;
}) {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IDuePayment>({
    resolver: zodResolver(DuePaymentValidationSchema),
  });

  const { makeDuePaymentMutation } = useBookingAction();

  const onSubmitClick = (data: IDuePayment) => {
    makeDuePaymentMutation.mutate(
      { ...data, bookingId },
      {
        onSuccess: () => {
          notifications.update({
            withBorder: true,
            id: 'duePayment',
            color: 'green',
            title: 'Success',
            message: 'Due Payment Info Added',
            icon: <CheckIcon size="2rem" />,
          });
          modals.closeAll();
        },
        onError: (error: any) => {
          notifications.update({
            withBorder: true,
            id: 'duePayment',
            color: 'red',
            title: 'Failed',
            message: error?.response?.data?.message || 'Something went wrong',
            icon: <ErrorIcon size="2rem" />,
          });
        },
      }
    );
  };

  console.log(getValues(), errors);

  return (
    <form className="space-y-4 m-3" onSubmit={handleSubmit(onSubmitClick)}>
      <div>
        <p className="text-mg font-semibold text-primaryColor mb-2 uppercase">
          Payment Method
        </p>

        <Radio.Group
          onChange={(value) => {
            setValue(`duePaymentMethod`, value);
          }}
          size="md"
          name="duePaymentMethod"
          label="Due Payment Method:"
          description="Select your due payment method"
          withAsterisk
          error={errors?.duePaymentMethod && errors?.duePaymentMethod?.message}
        >
          <Group mt="xs">
            <Radio value="bkash" label="bKash" />
            <Radio value="bank" label="Bank Transfer" />
          </Group>
        </Radio.Group>
      </div>

      {watch('duePaymentMethod') === 'bkash' ? (
        <BkashInstructions amount={duePayment ?? 0} />
      ) : watch('duePaymentMethod') === 'bank' ? (
        <BankInstructions amount={duePayment ?? 0} />
      ) : null}

      <div>
        <p className="text-mg font-semibold text-primaryColor mb-2 uppercase">
          Due Payment Transaction Id
        </p>
        <TextInput
          {...register(`dueTransactionId`)}
          className="w-full"
          size="lg"
          type="text"
          placeholder="Transaction Id"
          error={errors?.dueTransactionId?.message}
        />
      </div>
      <Button type="submit">Create Event Type</Button>
    </form>
  );
}
