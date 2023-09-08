import { Button, Card, TextInput, Textarea, Text } from '@mantine/core';
import React from 'react';

export const AdminSpecific = ({ bookingData }: any) => {
  return (
    <div className="mt-4 xl:mb-10">
      <h3 className="text-2xl font-semibold text-primaryColor mt-12 mb-4 uppercase">
        Your Library
      </h3>
      <Card radius={8} shadow="sm" padding={20}>
        <div className="flex gap-3  items-center">
          <TextInput
            // {...register(`events.${itemIndex}.eventTitle`)}
            size="lg"
            placeholder="Link to Image library"
            className="w-full"
            // error={
            //   errors?.events?.[itemIndex]?.eventTitle &&
            //   errors?.events?.[itemIndex]?.eventTitle?.message
            // }
          />
          <Button size="lg">Submit</Button>
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
  );
};
