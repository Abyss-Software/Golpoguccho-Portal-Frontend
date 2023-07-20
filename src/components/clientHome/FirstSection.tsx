import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import CalendarEventLineIcon from "remixicon-react/CalendarEventLineIcon";

const FirstSection = () => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <div className="absolute z-10 inset-0 bg-black bg-opacity-70">
        <div className="flex flex-col items-center justify-center h-full  animate-[fadeUp_1s_ease-in-out] ">
          <h1 className="text-4xl font-bold text-white">Welcome, User</h1>
          <p className="text-xl text-white ">This is your dashboard</p>
          <div className="flex items-center justify-center mt-8">
            <Button
              color="teal"
              size="lg"
              className="rounded-full bg-[#009247] px-8 "
              leftIcon={<CalendarEventLineIcon size="1rem" />}
              onClick={() => {
                navigate("/client/new-booking");
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
          src="https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
        />

        <img
          className="w-full h-full object-cover"
          alt="Second image"
          src="https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80"
        />
      </Fade>
    </div>
  );
};

export default FirstSection;
