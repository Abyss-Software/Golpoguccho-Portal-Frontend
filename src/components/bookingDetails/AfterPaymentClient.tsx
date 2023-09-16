import useBookingAction from '@/hooks/useBookingAction';
import { Button, Card, Textarea } from '@mantine/core';
import { AiOutlineCheckCircle as CheckIcon } from 'react-icons/ai';
import { BiErrorCircle as ErrorIcon } from 'react-icons/bi';
import { notifications } from '@mantine/notifications';
import React, { useState } from 'react';

export const AfterPaymentClient = ({ bookingData }: any) => {
  const [feedbackReview, setFeedbackReview] = useState({
    feedback: '',
    review: '',
  });

  const { giveFeedbackMutation } = useBookingAction();

  const handleGiveFeedback = () => {
    giveFeedbackMutation.mutate(
      { bookingId: bookingData?.id, ...feedbackReview },
      {
        onSuccess: () => {
          notifications.update({
            withBorder: true,
            id: 'giveFeedback',
            color: 'green',
            title: 'Success',
            message: 'Feedback & Review Added',
            icon: <CheckIcon size="2rem" />,
          });
        },
        onError: (error: any) => {
          notifications.update({
            withBorder: true,
            id: 'giveFeedback',
            color: 'red',
            title: 'Failed',
            message: error?.response?.data?.message || 'Something went wrong',
            icon: <ErrorIcon size="2rem" />,
          });
        },
      }
    );
  };

  const redirectToExternalLink = (link: string) => () => {
    if (!link.startsWith('http://') && !link.startsWith('https://')) {
      link = 'https://' + link;
    }
    window.open(link, '_blank');
  };

  return (
    <div className="mt-4 xl:mb-10">
      <h3 className="text-2xl font-semibold text-primaryColor mt-12 mb-4 uppercase">
        Your Library
      </h3>
      <Card radius={8} shadow="sm" padding={20}>
        <p
          className="cursor-pointer"
          onClick={redirectToExternalLink(bookingData.images)}
        >
          {' '}
          {bookingData.images}
        </p>
      </Card>

      <h3 className="text-2xl font-semibold text-primaryColor mt-12 mb-4 uppercase">
        Feedback & Review
      </h3>
      <Card radius={8} shadow="sm" padding={20} className="space-y-4">
        <Textarea
          size="lg"
          autosize
          minRows={2}
          maxRows={5}
          label="Feedback"
          placeholder="Your feedback on your event pictures and videos"
          defaultValue={bookingData.feedback}
          onChange={(e) =>
            setFeedbackReview({
              ...feedbackReview,
              feedback: e.currentTarget.value,
            })
          }
        />
        <Textarea
          size="lg"
          autosize
          minRows={2}
          maxRows={5}
          label="Review"
          placeholder="Your review on our service"
          defaultValue={bookingData.review}
          onChange={(e) =>
            setFeedbackReview({
              ...feedbackReview,
              review: e.currentTarget.value,
            })
          }
        />

        <Button size="lg" onClick={handleGiveFeedback}>
          Submit
        </Button>
      </Card>
    </div>
  );
};
