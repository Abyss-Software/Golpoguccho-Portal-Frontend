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
    <div
      className="relative min-h-[400px] text-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dl8vvdyc5/image/upload/v1696533605/Assets/cover.png')",
      }}
    >
      <div className="absolute z-10 inset-0 bg-black bg-opacity-70">
        <div className="p-4 flex flex-col gap-6 items-center justify-center h-full  animate-[fadeUp_1s_ease-in-out] ">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Welcome, {userInfo?.name}
          </h1>
          <p className="text-xl text-white">Let us capture your moments</p>

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
  );
};

export default FirstSection;
