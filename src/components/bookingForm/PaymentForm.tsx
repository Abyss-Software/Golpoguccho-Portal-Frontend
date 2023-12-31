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
        <h2 className="text-2xl font-bold">Booking Payment</h2>
      </div>
      <div className="space-y-2">
        <p>
          <span className="font-bold">Total Payment: </span>
          {getValues('totalPayment')}
        </p>

        <p>
          <span className="font-bold">Advance Payment: </span>
          {getValues('advancePayment')}
        </p>

        <p>
          <span className="font-bold">Due Payment: </span>
          {getValues('duePayment')}
        </p>
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
            onClick={onApplyPromo}
          >
            Apply
          </Button>
        ) : (
          <Button color="red" size="lg" type="button" onClick={onClearPromo}>
            Clear
          </Button>
        )}
      </div>
      <div>
        <p className="text-mg font-semibold text-primaryColor mb-2 uppercase">
          Payment Method
        </p>

        {/* <Radio.Group
          {...register(`advancePaymentMethod`)}
          onChange={(value) => {
            console.log(value);
            setValue(`advancePaymentMethod`, value);
          }}
          label="Advance Payment Method:"
          description="Select your advance payment method"
          withAsterisk
          error={errors?.advancePaymentMethod?.message}
        >
          <Group mt="xs">
            <Radio value="bkash" label="bKash" />
            <Radio value="bank" label="Bank Transfer" />
            <Radio value="cash" label="Cash" />
          </Group>
        </Radio.Group> */}
        <SegmentedControl
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
          disabled={watch('advancePaymentMethod') === 'cash'}
          error={errors?.advanceTransactionId?.message}
        />
      </div>
    </div>
  );
}
