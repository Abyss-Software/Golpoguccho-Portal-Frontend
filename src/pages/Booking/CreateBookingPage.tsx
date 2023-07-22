import CreateBookingForm from '@/components/bookingForm/CreateBookingForm';
import { Stepper, Timeline } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import PersonalIcon from 'remixicon-react/User3LineIcon';
import EventIcon from 'remixicon-react/CalendarEventLineIcon';
import PaymentIcon from 'remixicon-react/CurrencyLineIcon';
import ListSettingsIcon from 'remixicon-react/ListSettingsLineIcon';

const timelineContent = [
  {
    title: 'Booking Info',
    subtitle: 'Provide your personal information',
    icon: <PersonalIcon />,
  },
  {
    title: 'Event Type',
    subtitle: 'Select the type of event',
    icon: <ListSettingsIcon />,
  },
  {
    title: 'Events',
    subtitle: 'Give details of your events',
    icon: <EventIcon />,
  },
  {
    title: 'Review & Payment',
    subtitle: 'Review and make payment',
    icon: <PaymentIcon />,
  },
];

const CreateBookingPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  // const onChangeView = (value: string) => {
  //   setActiveTab(value);
  // };

  return (
    <div className="h-full flex">
      <div className="flex-1 border-r-2 py-8 px-4 hidden md:block">
        <Stepper
          active={activeTab}
          onStepClick={setActiveTab}
          orientation="vertical"
        >
          {timelineContent.map((item, index) => (
            <Stepper.Step
              key={index}
              icon={item.icon}
              label={<h1 className="text-xl">{item.title}</h1>}
              description={
                <p className="text-sm opacity-70 pt-2 pb-10">{item.subtitle}</p>
              }
              color="teal"
            />
          ))}
        </Stepper>
      </div>
      <div className="flex-[4] overflow-y-scroll">
        <CreateBookingForm />
      </div>
    </div>
  );
};

export default CreateBookingPage;
