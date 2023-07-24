import { Accordion } from "@mantine/core";
import React from "react";
import CalendarEventLineIcon from "remixicon-react/CalendarEventLineIcon";

const bookingData = {
  events: [
    {
      eventTitle: "Taha Wedding reception",
      eventDate: "2023-07-30T18:00:00.000Z",
      eventTime: "21:00",
      eventEndTime: "00:00",
      numberOfGuests: "500",
      eventVenue: "Random Convention Center",
      eventVenueAddress: "Random Convention center on random street of dhaka",
      additionalInfo: "information that is additional\nqazwsx\nplmokn",
      eventTypeId: "7f77bdd7-185d-49f9-9fa3-f78e8cfc5486",
      packageId: "62752196-dee4-4f6f-b741-68b4af7aa1cf",
      dayOrEvening: "evening",
      dhakaOrOutside: "dhaka",
    },
    {
      eventTypeId: "afefcfdb-ab38-465c-bff3-30f5b9c014ed",
      packageId: "33014292-be4d-4c0e-b9e3-fbe16f5c4e3d",
      eventTitle: "Rivu's Holud Event",
      eventDate: "2023-07-28T18:00:00.000Z",
      eventTime: "10:15",
      eventEndTime: "15:15",
      dayOrEvening: "day",
      dhakaOrOutside: "dhaka",
      numberOfGuests: "200",
      eventVenue: "roof of someones house",
      eventVenueAddress: "ranodm 3/5, mirpur 12, dhaka",
      additionalInfo: "update, index, value, control",
    },
  ],
  bookingTitle: "Taha and Rivu's Wedding Ceremony",
  fullName: "random name",
  email: "random123@gmail.com",
  contactPrimary: "0123456789",
  contactSecondary: "0198765432",
  address: "5/7 Mirpur 12, Dhaka - 1207",
  city: "Dhaka",
};

const BookingDetailsPage = () => {
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
    <div className=" mx-auto p-4 lg:p-10">
      <div className="bg-primaryColor text-white p-4 rounded-lg mb-10">
        <h2 className="text-2xl font-bold">Booking Details</h2>
      </div>
      <div className="mb-4 xl:mb-10">
        <h3 className="text-2xl font-semibold text-primaryColor mb-2 uppercase">
          Personal Information
        </h3>
        <div className="p-4 space-y-1">
          <p>
            <span className="font-bold">Full Name:</span>{" "}
            {bookingData?.fullName}
          </p>
          <p>
            <span className="font-bold">Email:</span> {bookingData?.email}
          </p>
          <p>
            <span className="font-bold">Primary Contact:</span>{" "}
            {bookingData?.contactPrimary}
          </p>
          <p>
            <span className="font-bold">Secondary Contact:</span>{" "}
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
      {/* <hr className="border-primaryColor mb-8" /> */}
      <div>
        <h3 className="text-2xl font-semibold text-primaryColor mb-2 uppercase">
          Events
        </h3>
        <Accordion
          variant="default"
          radius="md"
          defaultValue={[`${0}`]}
          transitionDuration={500}
          multiple
        >
          {bookingData?.events?.map((event, index) => (
            <div key={index}>
              <Accordion.Item value={`${index}`} bg="white">
                <div key={index} className=" p-2  ">
                  <Accordion.Control
                    icon={<CalendarEventLineIcon color="#009247" />}
                  >
                    <h4 className="text-xl font-bold  ">
                      <span className="text-primaryColor">
                        {" "}
                        Event {index + 1}:
                      </span>{" "}
                      {event.eventTitle}
                    </h4>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <div className="space-y-1 px-2">
                      <p>
                        <span className="font-bold">Event Type:</span>{" "}
                        {event.eventTypeId}
                      </p>
                      <p>
                        <span className="font-bold">Package ID:</span>{" "}
                        {event.packageId}
                      </p>
                      <p>
                        <span className="font-bold">Event Title:</span>{" "}
                        {event.eventTitle}
                      </p>
                      <p>
                        <span className="font-bold">Event Date:</span>{" "}
                        {event.eventDate}
                      </p>
                      <p>
                        <span className="font-bold">Event Time:</span>{" "}
                        {event.eventTime} - {event.eventEndTime}
                      </p>
                      <p>
                        <span className="font-bold">Day or Evening:</span>{" "}
                        {event.dayOrEvening}
                      </p>
                      <p>
                        <span className="font-bold">Dhaka or Outside:</span>{" "}
                        {event.dhakaOrOutside}
                      </p>
                      <p>
                        <span className="font-bold">Number of Guests:</span>{" "}
                        {event.numberOfGuests}
                      </p>
                      <p>
                        <span className="font-bold">Event Venue:</span>{" "}
                        {event.eventVenue}
                      </p>
                      <p>
                        <span className="font-bold">Event Venue Address:</span>{" "}
                        {event.eventVenueAddress}
                      </p>
                      {event.additionalInfo && (
                        <p>
                          <span className="font-bold">Additional Info:</span>{" "}
                          {event.additionalInfo}
                        </p>
                      )}
                    </div>
                  </Accordion.Panel>
                </div>
              </Accordion.Item>
            </div>
          ))}
        </Accordion>
      </div>
      <hr className="h-px my-8 mx-96 bg-gray-400 border-0 dark:bg-gray-700" />
      <div className="mb-4 xl:mb-10">
        <h3 className="text-2xl font-semibold text-primaryColor mb-2 uppercase">
          Payment Information
        </h3>
        <div className="p-4 space-y-1">
          <p>
            <span className="font-bold">Full Name:</span>{" "}
            {bookingData?.fullName}
          </p>
          <p>
            <span className="font-bold">Email:</span> {bookingData?.email}
          </p>
          <p>
            <span className="font-bold">Primary Contact:</span>{" "}
            {bookingData?.contactPrimary}
          </p>
          <p>
            <span className="font-bold">Secondary Contact:</span>{" "}
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
      {/* <div className="mt-4">
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
      </div> */}
    </div>
  );
};

export default BookingDetailsPage;
