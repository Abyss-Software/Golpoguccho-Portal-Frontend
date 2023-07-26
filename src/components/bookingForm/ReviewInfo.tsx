import { ICreateBooking } from '@/interfaces/createBooking.interface';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const ReviewInfo = () => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<ICreateBooking>();

  const [bookingData, setBookingData] = useState<ICreateBooking>();

  useEffect(() => {
    setTimeout(() => {
      setBookingData(getValues());
    }, 1500);
  }, []);

  if (!bookingData)
    return (
      <div className="h-96 mx-auto pb-4 flex items-center justify-center">
        <object
          data="/src/assets/svg/loader.svg"
          type="image/svg+xml"
          className="h-32"
        />
      </div>
    );

  return (
    <div className=" mx-auto pb-4">
      <div className="bg-primaryColor text-white p-4 rounded-lg mb-10">
        <h2 className="text-2xl font-bold">Booking Preview</h2>
      </div>
      <div className="mb-4">
        <h3 className="text-2xl font-semibold text-primaryColor mb-2 uppercase">
          Personal Information
        </h3>
        <div className="p-4 space-y-1">
          <p>
            <span className="font-bold">Full Name:</span>{' '}
            {bookingData?.fullName}
          </p>
          <p>
            <span className="font-bold">Email:</span> {bookingData?.email}
          </p>
          <p>
            <span className="font-bold">Primary Contact:</span>{' '}
            {bookingData?.contactPrimary}
          </p>
          <p>
            <span className="font-bold">Secondary Contact:</span>{' '}
            {bookingData?.contactSecondary}
          </p>
          <p>
            <span className="font-bold">Address:</span> {bookingData?.address}
          </p>
          <p>
            <span className="font-bold">City:</span> {bookingData?.city}
          </p>
        </div>
      </div>
      <hr className="border-primaryColor mb-8" />
      <div>
        <h3 className="text-2xl font-semibold text-primaryColor mb-2 uppercase">
          Events
        </h3>
        {bookingData?.events?.map((event, index) => (
          <div key={index} className=" p-4 rounded-lg mb-4 space-y-1">
            <h4 className="text-xl font-bold text-primaryColor ">
              Event {index + 1}
            </h4>
            <div className="space-y-1 px-2">
              <p>
                <span className="font-bold">Event Type:</span>{' '}
                {event.eventTypeId}
              </p>
              <p>
                <span className="font-bold">Package ID:</span> {event.packageId}
              </p>
              <p>
                <span className="font-bold">Event Title:</span>{' '}
                {event.eventTitle}
              </p>
              <p>
                <span className="font-bold">Event Date:</span>{' '}
                {event.eventDate.toDateString()}
              </p>
              <p>
                <span className="font-bold">Event Time:</span> {event.eventTime}{' '}
                - {event.eventEndTime}
              </p>
              <p>
                <span className="font-bold">Day or Evening:</span>{' '}
                {event.dayOrEvening}
              </p>
              <p>
                <span className="font-bold">Dhaka or Outside:</span>{' '}
                {event.dhakaOrOutside}
              </p>
              <p>
                <span className="font-bold">Number of Guests:</span>{' '}
                {event.numberOfGuests}
              </p>
              <p>
                <span className="font-bold">Event Venue:</span>{' '}
                {event.eventVenue}
              </p>
              <p>
                <span className="font-bold">Event Venue Address:</span>{' '}
                {event.eventVenueAddress}
              </p>
              {event.additionalInfo && (
                <p>
                  <span className="font-bold">Additional Info:</span>{' '}
                  {event.additionalInfo}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <hr className="border-primaryColor mt-4" />
      <div className="mt-4">
        <p>
          <span className="font-bold">Total Payment:</span>{' '}
          {bookingData?.totalPayment}
        </p>
        {bookingData?.advancePayment && (
          <p>
            <span className="font-bold">Advance Payment:</span>{' '}
            {bookingData?.advancePayment}
          </p>
        )}
        {bookingData?.duePayment && (
          <p>
            <span className="font-bold">Due Payment:</span>{' '}
            {bookingData?.duePayment}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewInfo;
