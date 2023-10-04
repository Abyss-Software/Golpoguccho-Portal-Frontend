import { ICreateBooking } from '@/interfaces/createBooking.interface';
import { Checkbox } from '@mantine/core';
import { useFormContext } from 'react-hook-form';

export default function BookingTerms() {
  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<ICreateBooking>();

  return (
    <div className=" mx-auto pb-4 space-y-8">
      <div className="bg-primaryColor text-white p-4 rounded-lg mb-10">
        <h2 className="text-2xl font-bold">Terms & Conditions</h2>
      </div>
      <div className="space-y-8">
        <h4>
          Please read the terms and conditions listed below thoroughly before
          placing a booking with us:
        </h4>
        <ol className="space-y-4">
          <li>
            {' '}
            Client must pay at least 70% money (Cash/Bkash/Bank Deposit) as
            advance to confirm booking. Less than 70% will be granted as token
            money to initiate an order but booking will not be confirmed.
          </li>
          <li>
            {' '}
            Advanced money is not refundable but transferable to future event.
          </li>
          <li>
            {' '}
            Clients must clear the due payment in order to take soft copies
            delivery. (Cash/Bkash/Bank Deposit only)
          </li>
          <li>
            {' '}
            Client must download their soft copies from the Golpoguccho Portal
            within 3 day. After that, the files can be deleted from online
            storage at any time!
          </li>
          <li>
            {' '}
            It will take about minimum 20 working days from event to process all
            the photos and videos.
          </li>
          <li>
            {' '}
            Client must provide transport up to a safe location (which will be
            discussed by both parties) if the event continues after 12:00 AM.
          </li>
          <li>
            {' '}
            If client wants to continue after allotted time period, additional
            2000 BDT will be charged per hour for each photographer and
            cinematographer.
          </li>
          <li>
            {' '}
            GolpoGuccho Phtography will have the copyright of all the pictures
            taken and can be used for promotional purposes.
          </li>
          <li>
            {' '}
            GolpoGuccho Phtography's Facebook page is just a showcase of our
            work and none of our package contains the offer to have photo in our
            page.
          </li>
          <li>
            {' '}
            Duration can be negotiated depending on special circumstances and
            availability.
          </li>
          <li>
            {' '}
            To avoid bitter experiences and to get best output from your event,
            it is highly recommended that you hire
            photographers/cinematographers from the same team.
          </li>
          <li>
            {' '}
            All printed copies selection must be made within 10 days of soft
            copy delivery at the GolpoGuccho Portal. otherwise GolpoGuccho
            Phtography will not take any responsibility of those files and
            printing service will be unavailable.
          </li>
          <li>
            {' '}
            Client should provide songs for the video within 7 days after
            cinematographer’s call. Delay of song provision may cause delayed
            delivery or cinematographer’s choice of song will be applicable with
            no further change.
          </li>
          <li>
            {' '}
            Client will get one chance to modify the video if major changes are
            needed. For further changes, additional charges(5000BDT) will be
            applicable.
          </li>
          <li>
            {' '}
            Client will get 7 day feedback/changes period. No appeal for any
            changes/complains will be granted after the time period.
          </li>
          <li>
            {' '}
            Due to unavoidable reasons if desired photographer fails to attend
            the event, equivalent photographer/package will be offered.
          </li>
          <li>
            {' '}
            Due to political issues/road block/natural disaster, GolpoGuccho
            Phtography will provide best equivalent solution or refund.
          </li>
          <li>
            {' '}
            If any loss occurs by accident/theft/technical failure of equipment,
            GolpoGuccho Phtography will refund against the file.
          </li>
        </ol>
      </div>
      <Checkbox
        size={'md'}
        label="I have fully read the booking terms and conditions and agree with them"
        onChange={(event) => {
          setValue(`acceptedTerms`, event.currentTarget.checked);
        }}
        error={errors?.advanceTransactionId?.message}
      />
      {errors?.acceptedTerms?.message && (
        <div className="text-red-500">{errors?.acceptedTerms?.message}</div>
      )}
    </div>
  );
}
