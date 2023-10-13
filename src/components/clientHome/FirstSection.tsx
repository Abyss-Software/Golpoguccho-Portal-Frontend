import { useAuthStore } from '@/contexts/authContext';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import CalendarEventLineIcon from 'remixicon-react/CalendarEventLineIcon';

const FirstSection = () => {
  const navigate = useNavigate();
  const userInfo = useAuthStore((state) => state.userInfo);

  return (
    <div className="relative min-h-[300px] text-center ">
      <div className="absolute z-10 inset-0 bg-black bg-opacity-70">
        <div className="p-4 flex flex-col items-center justify-center h-full  animate-[fadeUp_1s_ease-in-out] ">
          <h1 className="text-4xl font-bold text-white">
            Welcome, {userInfo?.name}
          </h1>
          <p className="text-xl text-white ">Let us capture your moments</p>

          <div className="flex items-center justify-center mt-8">
            <Button
              color="teal"
              size="lg"
              className="rounded-full bg-[#009247] px-8 "
              leftIcon={<CalendarEventLineIcon size="1rem" />}
              onClick={() => {
                navigate('/client/new-booking');
              }}
            >
              Create New Booking
            </Button>
          </div>
        </div>
      </div>
      <Fade
        cssClass="max-h-[calc(100vh-256px)]"
        arrows={false}
        canSwipe={false}
        duration={2500}
        onChange={function noRefCheck() {}}
        onStartChange={function noRefCheck() {}}
        pauseOnHover={false}
        transitionDuration={800}
      >
        <img
          className="w-full h-full object-cover"
          alt="First image"
          src="https://res.cloudinary.com/dl8vvdyc5/image/upload/v1696533605/Assets/cover.png"
        />

        <img
          className="w-full h-full object-cover"
          alt="Second image"
          src="https://res.cloudinary.com/dl8vvdyc5/image/upload/v1696533605/Assets/cover.png"
        />
      </Fade>
    </div>
  );
};

export default FirstSection;
