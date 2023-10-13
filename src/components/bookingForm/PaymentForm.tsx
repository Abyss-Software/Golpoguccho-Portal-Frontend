import {
  Button,
  Group,
  Radio,
  SegmentedControl,
  Text,
  TextInput,
} from '@mantine/core';
import { useEffect, useState } from 'react';

import BankInstructions from './BankTransferInstructions';
import BkashInstructions from './BkashInstructions';
import { AiOutlineCheckCircle as CheckIcon } from 'react-icons/ai';
import { BiErrorCircle as ErrorIcon } from 'react-icons/bi';
import { ICreateBooking } from '@/interfaces/createBooking.interface';
import { notifications } from '@mantine/notifications';
import useBookingAction from '@/hooks/useBookingAction';
import { useFormContext } from 'react-hook-form';
import CashPaymentInstructions from './CashPaymentInstructions';

export default function PaymentForm() {
  const {
    register,
    setValue,
    getValues,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<ICreateBooking>();

  const [apply, setApply] = useState<boolean>(true);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const { calculatePaymentMutation } = useBookingAction();

  const calculatePayment = () => {
    const packageIds = getValues('events').map((event) => event.packageId);

    calculatePaymentMutation.mutate(
      { packageIds, promoCode: getValues('promoCode') },
      {
        onSuccess: (data) => {
          setValue('totalPayment', data.body.totalPayment);
          setValue('advancePayment', data.body.advancePayment);
          setValue('duePayment', data.body.duePayment);
          setDiscountAmount(data.body.discountAmount);
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

  const onApplyPromo = () => {
    setApply(false);
    calculatePayment();
  };

  const onClearPromo = () => {
    setApply(true);
    setValue('promoCode', undefined);
    calculatePayment();
  };

  useEffect(() => {
    calculatePayment();
    setValue('advancePaymentMethod', 'bkash');
  }, []);

  useEffect(() => {
    if (getValues('advancePaymentMethod') === 'cash') {
      setValue('advanceTransactionId', 'N/A');
      trigger('advanceTransactionId');
    } else {
      setValue('advanceTransactionId', '');
    }
  }, [watch('advancePaymentMethod')]);

  console.log(getValues('advancePaymentMethod'));
  return (
    <div className=" mx-auto pb-4 space-y-8">
      <div className="bg-primaryColor text-white p-4 rounded-lg mb-10">
        <h2 className="text-2xl font-bold">Payment</h2>
      </div>

      <div className="space-y-2">
        <p className="text-mg font-semibold text-primaryColor mb-2 uppercase">
          Billing Information
        </p>
        <p>
          <span className="font-bold">Full Name:</span> {getValues('fullName')}
        </p>
        <p>
          <span className="font-bold">Email:</span> {getValues('email')}
        </p>
        <p>
          <span className="font-bold">Primary Contact:</span>{' '}
          {getValues('contactPrimary')}
        </p>
        <p>
          <span className="font-bold">Address:</span> {getValues('address')}
        </p>
      </div>

      <div>
        <p className="text-mg font-semibold text-primaryColor mb-2 uppercase">
          Payment Method
        </p>

        <SegmentedControl
          className="dark:bg-backgroundColor"
          onChange={(value) => {
            console.log(value);
            setValue(`advancePaymentMethod`, value);
          }}
          color="green"
          fullWidth
          defaultValue="bkash"
          size="md"
          data={[
            { value: 'bkash', label: 'bKash' },
            { value: 'bank', label: 'Bank Transfer' },
            { value: 'cash', label: 'Cash' },
          ]}
        />
      </div>

      {watch('advancePaymentMethod') === 'bkash' && (
        <BkashInstructions amount={getValues('advancePayment') ?? 0} />
      )}

      {watch('advancePaymentMethod') === 'bank' && (
        <BankInstructions amount={getValues('advancePayment') ?? 0} />
      )}

      {watch('advancePaymentMethod') === 'cash' && (
        <CashPaymentInstructions amount={getValues('advancePayment') ?? 0} />
      )}

      <hr />
      <div className="space-y-2 flex flex-col items-end text-lg">
        <p>
          <span className="font-bold">Total Payment: </span>
          <span> {getValues('totalPayment')} </span>
        </p>

        <p>
          <span className="font-bold">Advance Payment: </span>
          {getValues('advancePaymentMethod') === 'bkash' ? (
            <span className="text-green-500">
              {getValues('advancePayment') +
                (getValues('advancePayment') * 2) / 100}{' '}
            </span>
          ) : (
            <span className="text-green-500">
              {getValues('advancePayment')}{' '}
            </span>
          )}
        </p>

        <p>
          <span className="font-bold">Due Payment: </span>
          <span>{getValues('duePayment')} </span>
        </p>
        {discountAmount > 0 && <p className="text-sm">Promo Code Applied!</p>}
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <Text weight={700}>Have a Promo Code?</Text>
        <TextInput
          {...register(`promoCode`)}
          disabled={!apply}
          className="w-full"
          size="md"
          type="text"
          placeholder="Promo Code"
        />
        {apply ? (
          <Button
            disabled={!watch('promoCode')}
            size="md"
            type="button"
            onClick={onApplyPromo}
          >
            Apply
          </Button>
        ) : (
          <Button color="red" size="md" type="button" onClick={onClearPromo}>
            Clear
          </Button>
        )}
      </div>

      <div>
        <p className="text-mg font-semibold text-primaryColor mb-2 uppercase">
          Advance Payment Transaction Id
        </p>
        <TextInput
          {...register(`advanceTransactionId`)}
          className="w-full"
          size="md"
          type="text"
          placeholder="Transaction Id"
          disabled={watch('advancePaymentMethod') === 'cash'}
          error={errors?.advanceTransactionId?.message}
        />
      </div>
    </div>
  );
}
