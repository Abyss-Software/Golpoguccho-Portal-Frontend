import { Button, Card, Textarea } from '@mantine/core';
import React from 'react';

export const AfterPaymentClient = ({ bookingData }: any) => {
  return (
    <div className="mt-4 xl:mb-10">
      <h3 className="text-2xl font-semibold text-primaryColor mt-12 mb-4 uppercase">
        Your Library
      </h3>
      <Card radius={8} shadow="sm" padding={20}>
        <a href={bookingData.images} target="_blank">
          {' '}
          {bookingData.images}
        </a>
        {/* ) : (
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
        )} */}
      </Card>

      <h3 className="text-2xl font-semibold text-primaryColor mt-12 mb-4 uppercase">
        Feedback & Review
      </h3>
      <Card radius={8} shadow="sm" padding={20} className="space-y-4">
        <Textarea
          // {...register(`events.${itemIndex}.eventTitle`)}
          size="lg"
          autosize
          minRows={2}
          maxRows={5}
          label="Feedback"
          placeholder="Your feedback on your event pictures and videos"
          // error={
          //   errors?.events?.[itemIndex]?.eventTitle &&
          //   errors?.events?.[itemIndex]?.eventTitle?.message
          // }
        />
        <Textarea
          // {...register(`events.${itemIndex}.eventTitle`)}
          size="lg"
          autosize
          minRows={2}
          maxRows={5}
          label="Review"
          placeholder="Your review on our service"
          // error={
          //   errors?.events?.[itemIndex]?.eventTitle &&
          //   errors?.events?.[itemIndex]?.eventTitle?.message
          // }
        />

        <Button size="lg">Submit</Button>
      </Card>
    </div>
  );
};
