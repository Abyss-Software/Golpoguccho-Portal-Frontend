import googleSVG from "@/assets/svg/googly.svg";
import loginSVG from "@/assets/svg/login.svg";
import LoginForm from "@/components/auth/LoginForm";
import SignUpForm from "@/components/auth/SignUpForm";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function LoginPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const googleLogin = useGoogleLogin({
    onSuccess: async (response: any) => {
      try {
        const data = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        console.log(data);

        // const payload: ISocialLoginPayload = {
        //   email: data.data.email,
        //   firstName: data.data.given_name,
        //   lastName: data.data.family_name,
        // };
        // socialLogin(payload);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center items-center ">
      <div className="h-full p-4 bg-black  flex-1 flex items-center justify-center">
        {/* <img className="w-full max-w-md" src={authImg} alt="Sample image" /> */}
        <object
          data={loginSVG}
          type="image/svg+xml"
          className="w-full max-w-md"
        />
      </div>
      <div className="bg-background h-full p-4 flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div
            onClick={() => googleLogin()}
            className="  cursor-pointer flex mb-3 btn btn-google w-100 p-2.5 justify-center bg-slate-200 rounded-md dark:bg-slate-800 "
          >
            <span className="me-3">
              <object
                data={googleSVG}
                type="image/svg+xml"
                className="w-5 aspect-square"
              />
            </span>
            Continue with Google
          </div>
          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className=" flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            {searchParams.get("register") ? <SignUpForm /> : <LoginForm />}
          </div>
        </div>
      </div>
    </section>
  );
}
