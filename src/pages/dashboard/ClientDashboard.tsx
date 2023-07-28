import noData from '@/assets/svg/no-data-animate.svg';
import FirstSection from '@/components/clientHome/FirstSection';
import PreviousBookings from '@/components/clientHome/PreviousBookings';

const ClientDashboard = () => {
  const bookings: string[] = ['1'];
  return (
    <>
      <FirstSection />
      <div>
        {!bookings?.length ? (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl text-center mt-8">No Past Bookings</h1>
            <object
              data={noData}
              type="image/svg+xml"
              className="max-w-lg mx-auto mt-8"
            />
          </div>
        ) : (
          <div className="md:pt-10 text-center">
            <h2>Previous Bookings</h2>
            <div className="md:px-10 overflow-auto text-start">
              <PreviousBookings />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ClientDashboard;
