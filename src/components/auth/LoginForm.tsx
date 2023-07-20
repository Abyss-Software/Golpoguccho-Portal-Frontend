import { ILoginPayload } from "@/interfaces/auth.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import LockPasswordLineIcon from "remixicon-react/LockPasswordLineIcon";
import MailLineIcon from "remixicon-react/MailLineIcon";
import Checkbox from "../ui/input/checkbox";
import Input from "../ui/input/input";
import { Button } from "@mantine/core";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILoginPayload>();
  const onSubmit: SubmitHandler<ILoginPayload> = (data) => navigate("/");

  return (
    <form
      className="w-full flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="email"
        label="Email"
        placeholder="Your Email"
        startIcon={MailLineIcon}
        {...register("email", {
          validate: (value) => !!value.trim() || "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email is invalid",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <Input
        type="password"
        label="Password"
        placeholder="Your Password"
        startIcon={LockPasswordLineIcon}
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <div className="flex justify-between font-semibold text-sm">
        <Checkbox label="Remember Me" {...register("rememberMe")} />
        <a
          className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
          href="#"
        >
          Forgot Password?
        </a>
      </div>

      <Button
        color="teal"
        radius="sm"
        size="md"
        className="uppercase mt-2 bg-[#009247]"
        type="submit"
      >
        Login
      </Button>

      <div className="mt-2 font-semibold text-sm text-slate-500 text-center md:text-left">
        Don't have an account?{" "}
        <Link
          className="text-primaryColor hover:underline hover:underline-offset-4"
          to="/auth?register=true"
        >
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
