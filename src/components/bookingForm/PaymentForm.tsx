import useBookingAction from '@/hooks/useBookingAction';
import { ICreateBooking } from '@/interfaces/createBooking.interface';
import {
  Button,
  Group,
  Input,
  SegmentedControl,
  Text,
  TextInput,
} from '@mantine/core';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export default function PaymentForm() {
  const { getValues } = useFormContext<ICreateBooking>();

  const [payments, setPayments] = React.useState({
    totalPayment: 0,
    advancePayment: 0,
    duePayment: 0,
  });

  const { calculatePaymentMutation } = useBookingAction();

  const calculatePayment = (promoCode?: string) => {
    const packageIds = getValues('events').map((event) => event.packageId);

    calculatePaymentMutation.mutate(
      { packageIds, promoCode },
      {
        onSuccess: (data) => {
          setPayments(data.body);
        },
      }
    );
  };

  useEffect(() => {
    calculatePayment();
  }, [getValues]);

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
          className="w-full"
          size="lg"
          type="text"
          placeholder="Promo Code"
        />
        <Button size="lg">Apply</Button>
      </div>
      <div>
        <p className="text-mg font-semibold text-primaryColor mb-2 uppercase">
          Payment Method
        </p>
        <SegmentedControl
          size="md"
          color="green"
          data={[
            { label: 'Bkash', value: 'bkash' },
            { label: 'Bank Transfer', value: 'bank' },
          ]}
        />
      </div>
      <div>
        <p className="text-mg font-semibold text-primaryColor mb-2 uppercase">
          Advance Payment (BDT. {payments.advancePayment}) Transaction Id
        </p>
        <TextInput
          className="w-full"
          size="lg"
          type="text"
          placeholder="Promo Code"
        />
      </div>
    </div>
  );
}
