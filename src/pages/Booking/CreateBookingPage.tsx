import { Button, Stepper } from "@mantine/core";
import { FormProvider, useForm } from "react-hook-form";

import BackIcon from "remixicon-react/ArrowLeftSLineIcon";
import { CreateBookingValidationSchema } from "@/constants/validation/CreateBookingValidationSchema";
import EventDetailsForm from "@/components/bookingForm/EventDetailsForm";
import EventIcon from "remixicon-react/CalendarEventLineIcon";
import { ICreateBooking } from "@/interfaces/createBooking.interface";
import NextIcon from "remixicon-react/ArrowRightSLineIcon";
import PaymentIcon from "remixicon-react/CurrencyLineIcon";
import PersonalIcon from "remixicon-react/User3LineIcon";
import PersonalInfoForm from "@/components/bookingForm/PersonalInfoForm";
import SubmitIcon from "remixicon-react/CheckLineIcon";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const timelineContent = [
  {
    title: "Booking Info",
    subtitle: "Provide your personal information",
    icon: <PersonalIcon />,
  },
  {
    title: "Events",
    subtitle: "Give details of your events",
    icon: <EventIcon />,
  },
  {
    title: "Review & Payment",
    subtitle: "Review and make payment",
    icon: <PaymentIcon />,
  },
];

const CreateBookingPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const methods = useForm<ICreateBooking>({
    resolver: zodResolver(CreateBookingValidationSchema),
    shouldUnregister: true,
    defaultValues: {
      events: [
        {
          eventTypeId: "",
          packageId: "",
          eventTitle: "",
          eventDate: new Date(),
          eventTime: "",
          eventEndTime: "",
          dayOrEvening: "",
          dhakaOrOutside: "",
          numberOfGuests: 0,
          eventVenue: "",
          eventVenueAddress: "",
          additionalInfo: "",
        },
      ],
    },
  });

  const onNextClick = async () => {
    try {
      if (
        activeTab === 0 &&
        !(await methods.trigger([
          "fullName",
          "email",
          "contactPrimary",
          "contactSecondary",
          "address",
          "city",
        ]))
      )
        return;
      else if (activeTab === 1 && !(await methods.trigger(["events"]))) return;

      setActiveTab((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data: ICreateBooking) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="h-full flex">
        <div className="px-16 hidden md:block bg-backgroundColor">
          <Stepper
            active={activeTab}
            onStepClick={setActiveTab}
            orientation="vertical"
            className="sticky top-28 mx-auto"
          >
            {timelineContent.map((item, index) => (
              <Stepper.Step
                key={index}
                icon={item.icon}
                label={<h1 className="text-xl">{item.title}</h1>}
                description={
                  <p className="text-base text-slate-500 pt-2 pb-20">
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
          className="flex-1 space-y-4 overflow-y-scroll px-20 py-5"
        >
          <div
            style={{
              display: activeTab === 0 ? "block" : "none",
            }}
          >
            <PersonalInfoForm />
          </div>

          <div
            style={{
              display: activeTab === 1 ? "block" : "none",
            }}
          >
            <EventDetailsForm />
          </div>

          <div className="flex gap-4">
            <Button
              fullWidth
              type="button"
              size="lg"
              color="green"
              variant="light"
              leftIcon={<BackIcon />}
              disabled={activeTab === 0}
              onClick={() => setActiveTab((prev) => prev - 1)}
            >
              Go Back
            </Button>

            {activeTab === timelineContent.length ? (
              <Button
                fullWidth
                color="green"
                size="lg"
                type="submit"
                rightIcon={<SubmitIcon />}
              >
                Submit
              </Button>
            ) : (
              <Button
                fullWidth
                type="button"
                size="lg"
                color="green"
                variant="light"
                rightIcon={<NextIcon />}
                onClick={onNextClick}
              >
                Up Next
              </Button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default CreateBookingPage;
