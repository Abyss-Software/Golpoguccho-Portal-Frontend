import { Button, Stepper } from '@mantine/core';
import { FormProvider, useForm } from 'react-hook-form';

import BackIcon from 'remixicon-react/ArrowLeftSLineIcon';
import { AiOutlineCheckCircle as CheckIcon } from 'react-icons/ai';
import { CreateBookingValidationSchema } from '@/constants/validation/CreateBookingValidationSchema';
import { BiErrorCircle as ErrorIcon } from 'react-icons/bi';
import EventDetailsForm from '@/components/bookingForm/EventDetailsForm';
import EventIcon from 'remixicon-react/CalendarEventLineIcon';
import { ICreateBooking } from '@/interfaces/createBooking.interface';
import NextIcon from 'remixicon-react/ArrowRightSLineIcon';
import PaymentForm from '@/components/bookingForm/PaymentForm';
import PaymentIcon from 'remixicon-react/CurrencyLineIcon';
import PersonalIcon from 'remixicon-react/User3LineIcon';
import ReviewIcon from 'remixicon-react/CheckboxCircleLineIcon';
import TermsIcon from 'remixicon-react/FileWarningLineIcon';
import PersonalInfoForm from '@/components/bookingForm/PersonalInfoForm';
import ReviewInfo from '@/components/bookingForm/ReviewInfo';
import SubmitIcon from 'remixicon-react/CheckLineIcon';
import { convertTime } from '@/utils/common.util';
import { notifications } from '@mantine/notifications';
import { twMerge } from 'tailwind-merge';
import { useAuthStore } from '@/contexts/authContext';
import useBookingAction from '@/hooks/useBookingAction';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import BookingTerms from '@/components/bookingForm/BookingTerms';

const timelineContent = [
  {
    title: 'Booking Info',
    subtitle: 'Provide your personal information',
    icon: <PersonalIcon />,
  },
  {
    title: 'Events',
    subtitle: 'Give details of your events',
    icon: <EventIcon />,
  },
  {
    title: 'Review',
    subtitle: 'Double check your information',
    icon: <ReviewIcon />,
  },
  {
    title: 'Terms & Conditions',
    subtitle: 'Read and accept our terms and conditions',
    icon: <TermsIcon />,
  },
  {
    title: 'Payment',
    subtitle: 'Make advance payment',
    icon: <PaymentIcon />,
  },
];

const CreateBookingPage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const { userInfo } = useAuthStore();

  const { createBookingMutation } = useBookingAction();

  const methods = useForm<ICreateBooking>({
    resolver: zodResolver(CreateBookingValidationSchema),
    shouldUnregister: true,
    defaultValues: {
      clientId: userInfo?.id,
      events: [
        {
          eventTypeId: '',
          packageId: '',
          eventTitle: '',
          eventDate: new Date(),
          eventTime: '',
          eventEndTime: '',
          dayOrEvening: '',
          dhakaOrOutside: '',
          numberOfGuests: 0,
          eventVenue: '',
          eventVenueAddress: '',
          additionalInfo: '',
        },
      ],
    },
  });

  const onNextClick = async () => {
    try {
      if (
        activeTab === 0 &&
        !(await methods.trigger([
          'bookingTitle',
          'fullName',
          'email',
          'contactPrimary',
          'contactSecondary',
          'address',
          'city',
        ]))
      )
        return;
      else if (activeTab === 1 && !(await methods.trigger(['events']))) return;
      else if (activeTab === 3 && !(await methods.trigger(['acceptedTerms'])))
        return;
      else if (
        activeTab === 4 &&
        !(await methods.trigger([
          'totalPayment',
          'advancePayment',
          'advancePaymentMethod',
          'advanceTransactionId',
        ]))
      )
        return;

      setActiveTab((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  console.log('errors:', methods.formState.errors);
  console.log('values:', methods.getValues());

  const onSubmit = (data: ICreateBooking) => {
    data.events.map((event) => {
      event.eventTime = convertTime(event.eventTime);
      event.eventEndTime = convertTime(event.eventEndTime);
    });

    createBookingMutation.mutate(
      { ...data, clientId: userInfo?.id! },
      {
        onSuccess: (data) => {
          notifications.update({
            withBorder: true,
            id: 'bookingCreation',
            color: 'green',
            title: 'Success',
            message: 'Booking Created',
            icon: <CheckIcon size="2rem" />,
          });
          navigate(`/client/booking-details/${data.body.bookingResult.id}`);
        },
        onError: (error: any) => {
          notifications.update({
            withBorder: true,
            id: 'bookingCreation',
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
    <FormProvider {...methods}>
      <div className="h-full flex">
        <div className="px-16 hidden xl:block bg-backgroundColor">
          <Stepper
            active={activeTab}
            orientation="vertical"
            className="sticky top-28 mx-auto"
          >
            {timelineContent.map((item, index) => (
              <Stepper.Step
                key={index}
                icon={item.icon}
                label={<h1 className="text-xl">{item.title}</h1>}
                description={
                  <p className="text-base text-slate-500 pt-2 pb-10">
                    {item.subtitle}
                  </p>
                }
                color="teal"
              />
            ))}
          </Stepper>
        </div>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex-1 space-y-4 overflow-y-scroll px-6 md:px-20 py-5"
        >
          <div
            style={{
              display: activeTab === 0 ? 'block' : 'none',
            }}
          >
            <PersonalInfoForm />
          </div>

          <div
            style={{
              display: activeTab === 1 ? 'block' : 'none',
            }}
          >
            <EventDetailsForm />
          </div>

          {activeTab === 2 && <ReviewInfo />}

          {activeTab === 3 && <BookingTerms />}

          {activeTab === 4 && <PaymentForm />}

          <div className="flex gap-4 py-10">
            <Button
              fullWidth
              type="button"
              size="lg"
              color="gray"
              variant="light"
              leftIcon={<BackIcon />}
              disabled={activeTab === 0}
              onClick={() => setActiveTab((prev) => prev - 1)}
              className="border-gray-500"
            >
              Go Back
            </Button>

            <Button
              className={twMerge(
                activeTab !== timelineContent.length - 1 && 'hidden'
              )}
              fullWidth
              size="lg"
              type="submit"
              rightIcon={<SubmitIcon />}
            >
              Submit
            </Button>

            <Button
              className={twMerge(
                'border-primaryColor',
                activeTab === timelineContent.length - 1 && 'hidden'
              )}
              fullWidth
              type="button"
              size="lg"
              variant="light"
              rightIcon={<NextIcon />}
              onClick={onNextClick}
            >
              Up Next
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default CreateBookingPage;
