import { bookingStatusOptions } from '@/constants/selectOptions';
import useBookingAction from '@/hooks/useBookingAction';
import { Button, Card, TextInput, Textarea, Text, Select } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import React, { useState } from 'react';
import { AiOutlineCheckCircle as CheckIcon } from 'react-icons/ai';
import { BiErrorCircle as ErrorIcon } from 'react-icons/bi';

export const AdminSpecific = ({ bookingData }: any) => {
  const { setLinkMutation, changeStatusMutation } = useBookingAction();

  const [statusUpdate, setStatusUpdate] = useState(bookingData?.status ?? '');

  const handleStatusChange = (status: string) => {
    changeStatusMutation.mutate(
      { bookingId: bookingData?.id, status },
      {
        onSuccess: () => {
          notifications.update({
            withBorder: true,
            id: 'changeStatus',
            color: 'green',
            title: 'Success',
            message: 'Booking Status Updated',
            icon: <CheckIcon size="2rem" />,
          });
        },
        onError: (error: any) => {
          notifications.update({
            withBorder: true,
            id: 'changeStatus',
            color: 'red',
            title: 'Failed',
            message: error?.response?.data?.message || 'Something went wrong',
            icon: <ErrorIcon size="2rem" />,
          });
        },
      }
    );
  };

  const onStatusChange = (status: string) => {
    modals.openConfirmModal({
      title: 'Please confirm your action',
      centered: true,
      children: (
        <div className="space-y-3">
          <Text size="lg">Are you sure you want to change status?</Text>
          <Text size="md" color="red">
            Current Status: {bookingData.status}
          </Text>
          <Text size="md" color="green">
            Change status to: {status}
          </Text>
        </div>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'green' },
      onConfirm: () => handleStatusChange(status),
    });
  };

  const [link, setLink] = React.useState<string>('');

  const handleSetLink = (link: string) => {
    setLinkMutation.mutate(
      { bookingId: bookingData?.id, link },
      {
        onSuccess: () => {
          notifications.update({
            withBorder: true,
            id: 'setLink',
            color: 'green',
            title: 'Success',
            message: 'Library Link Updated',
            icon: <CheckIcon size="2rem" />,
          });
        },
        onError: (error: any) => {
          notifications.update({
            withBorder: true,
            id: 'setLink',
            color: 'red',
            title: 'Failed',
            message: error?.response?.data?.message || 'Something went wrong',
            icon: <ErrorIcon size="2rem" />,
          });
        },
      }
    );
  };

  return (
    <div>
      <div className="space-y-4 mb-4 xl:mb-10">
        <p className="text-2xl font-semibold text-primaryColor mb-2 uppercase">
          Booking Status
        </p>
        <div className="flex gap-2 items-center justify-start">
          <Select
            className="w-fit"
            size="md"
            placeholder="Pick booking status"
            nothingFound="No options"
            data={bookingStatusOptions}
            defaultValue={bookingData?.status}
            onChange={(value) => {
              setStatusUpdate(value);
            }}
          />
          <Button
            onClick={() => {
              onStatusChange(statusUpdate);
            }}
          >
            Update Status
          </Button>
        </div>
      </div>

      <div className="mt-4 xl:mb-10">
        <h3 className="text-2xl font-semibold text-primaryColor mt-12 mb-4 uppercase">
          Your Library
        </h3>
        <Card radius={8} shadow="sm" padding={20}>
          <div className="flex gap-3  items-center">
            <TextInput
              size="lg"
              placeholder="Link to Image library"
              className="w-full"
              defaultValue={bookingData?.images}
              onChange={(e) => setLink(e.currentTarget.value)}
            />
            <Button size="lg" onClick={() => handleSetLink(link)}>
              Submit
            </Button>
          </div>
        </Card>

        <h3 className="text-2xl font-semibold text-primaryColor mt-12 mb-4 uppercase">
          Feedback & Review
        </h3>
        <Card radius={8} shadow="sm" padding={20} className="space-y-4">
          <Text size="lg">
            <span className="font-bold">Feedback:</span>{' '}
          </Text>
          {bookingData?.feedback}
          <Text size="lg">
            <span className="font-bold">Review:</span>{' '}
          </Text>
          {bookingData?.review}
        </Card>
      </div>
    </div>
  );
};
