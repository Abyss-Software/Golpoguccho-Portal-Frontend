import { paymentOptions } from '@/constants/selectOptions';
import useBookingAction from '@/hooks/useBookingAction';
import { ICreateBooking } from '@/interfaces/createBooking.interface';
import {
  Button,
  Group,
  Radio,
  SegmentedControl,
  Text,
  TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { AiOutlineCheckCircle as CheckIcon } from 'react-icons/ai';
import { BiErrorCircle as ErrorIcon } from 'react-icons/bi';
import BkashInstructions from './BkashInstructions';
import BankInstructions from './BankTransferInstructions';

export default function PaymentForm() {
  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<ICreateBooking>();

  const [payments, setPayments] = React.useState({
    totalPayment: 0,
    advancePayment: 0,
    duePayment: 0,
  });

  const [apply, setApply] = React.useState<boolean>(true);

  const { calculatePaymentMutation } = useBookingAction();

  const calculatePayment = () => {
    const packageIds = getValues('events').map((event) => event.packageId);

    calculatePaymentMutation.mutate(
      { packageIds, promoCode: getValues('promoCode') },
      {
        onSuccess: (data) => {
          setPayments(data.body);
          setValue('totalPayment', data.body.totalPayment);
          setValue('advancePayment', data.body.advancePayment);
          setValue('duePayment', data.body.duePayment);

          notifications.update({
            withBorder: true,
            id: 'priceValidation',
            color: 'green',
            title: 'Success',
            message: getValues('promoCode')
              ? apply
                ? 'Promo Applied'
                : 'Promo Cleared'
              : 'Pricing Calculated',
            icon: <CheckIcon size="2rem" />,
          });
        },
        onError: (error: any) => {
          notifications.update({
            withBorder: true,
            id: 'priceValidation',
            color: 'red',
            title: 'Failed',
            message: error?.response?.data?.message || 'Something went wrong',
            icon: <ErrorIcon size="2rem" />,
          });
        },
      }
    );
  };

  useEffect(() => {
    calculatePayment();
  }, []);

  return (
    <div className=" mx-auto pb-4 space-y-8">
      <div className="bg-primaryColor text-white p-4 rounded-lg mb-10">
        <h2 className="text-2xl font-bold">Booking Payment</h2>
      </div>

      <div className="space-y-2">
        <p>
          <span className="font-bold">Total Payment:</span>{' '}
          {payments.totalPayment}
        </p>
        {payments.advancePayment && (
          <p>
            <span className="font-bold">Advance Payment:</span>{' '}
            {payments.advancePayment}
          </p>
        )}
        {payments.duePayment && (
          <p>
            <span className="font-bold">Due Payment:</span>{' '}
            {payments.duePayment}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Text weight={700}>Have a Promo Code?</Text>
        <TextInput
          {...register(`promoCode`)}
          disabled={!apply}
          className="w-full"
          size="lg"
          type="text"
          placeholder="Promo Code"
        />
        {apply ? (
          <Button
            disabled={!watch('promoCode')}
            size="lg"
            type="button"
            onClick={() => {
              setApply(false);
              calculatePayment();
            }}
          >
            Apply
          </Button>
        ) : (
          <Button
            color="red"
            size="lg"
            type="button"
            onClick={() => {
              setApply(true);
              setValue('promoCode', undefined);
              calculatePayment();
            }}
          >
            Clear
          </Button>
        )}
      </div>
      <div>
        <p className="text-mg font-semibold text-primaryColor mb-2 uppercase">
          Payment Method
        </p>

        <Radio.Group
          onChange={(value) => {
            setValue(`advancePaymentMethod`, value);
          }}
          name="advancePaymentMethod"
          label="Advance Payment Method:"
          description="Select your advance payment method"
          withAsterisk
          error={
            errors?.advancePaymentMethod &&
            errors?.advancePaymentMethod?.message
          }
        >
          <Group mt="xs">
            <Radio value="bkash" label="bKash" />
            <Radio value="bank" label="Bank Transfer" />
          </Group>
        </Radio.Group>
      </div>

      {watch('advancePaymentMethod') === 'bkash' ? (
        <BkashInstructions amount={getValues('advancePayment') ?? 0} />
      ) : (
        <BankInstructions amount={getValues('advancePayment') ?? 0} />
      )}

      <div>
        <p className="text-mg font-semibold text-primaryColor mb-2 uppercase">
          Advance Payment Transaction Id
        </p>
        <TextInput
          {...register(`advanceTransactionId`)}
          className="w-full"
          size="lg"
          type="text"
          placeholder="Transaction Id"
          error={errors?.advanceTransactionId?.message}
        />
      </div>
    </div>
  );
}
