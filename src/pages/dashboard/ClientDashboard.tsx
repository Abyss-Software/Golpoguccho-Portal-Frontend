import noData from '@/assets/svg/no-data-animate.svg';
import FirstSection from '@/components/clientHome/FirstSection';

const ClientDashboard = () => {
  const bookings: string[] = [];
  return (
    <>
      <FirstSection />
      <div>
        {!bookings.length && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl text-center mt-8">No Past Bookings</h1>
            <object
              data={noData}
              type="image/svg+xml"
              className="max-w-lg mx-auto mt-8"
            />
          </div>
        )}
        {bookings.map((booking) => (
          <p>{booking}</p>
        ))}
      </div>
    </>
  );
};

export default ClientDashboard;
