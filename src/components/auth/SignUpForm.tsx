import { ISignupPayload } from "@/interfaces/auth.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import LockPasswordLineIcon from "remixicon-react/LockPasswordLineIcon";
import MailLineIcon from "remixicon-react/MailLineIcon";
import Input from "../ui/input/input";
import { Button } from "@mantine/core";

const SignUpForm = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignupPayload>();
  const onSubmit: SubmitHandler<ISignupPayload> = (data) => console.log(data);

  return (
    <form
      className="w-full flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="text"
        label="Name"
        placeholder="Your Name"
        {...register("name", {
          validate: (value) => !!value.trim() || "Name is required",
          minLength: {
            value: 2,
            message: "Name must be at least 2 characters",
          },
        })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

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

      <Button
        color="teal"
        radius="sm"
        size="md"
        className="uppercase mt-2 bg-[#009247]"
        type="submit"
      >
        Register
      </Button>

      <div className="mt-2 font-semibold text-sm text-slate-500 text-center md:text-left">
        Already have an account?{" "}
        <Link
          className="text-primaryColor hover:underline hover:underline-offset-4"
          to="/auth"
        >
          Login
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
