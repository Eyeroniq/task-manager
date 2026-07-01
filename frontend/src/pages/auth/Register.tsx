import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";

import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";

import { register as registerUser } from "../../api/auth.api";

import {
  registerSchema,
  type RegisterFormData,
} from "../../utils/validation";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });

      toast.success("Registration successful");

      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Registration failed"
        );
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left */}
      <div className="hidden w-1/2 bg-blue-600 p-16 text-white lg:flex lg:flex-col lg:justify-center">
        <h1 className="mb-6 text-5xl font-bold">
          Task Manager
        </h1>

        <p className="max-w-md text-lg text-blue-100">
          Create an account and start managing your tasks efficiently.
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-1 items-center justify-center bg-slate-100 p-6">
        <div className="w-full max-w-md">
          <Card>
            <h2 className="mb-2 text-3xl font-bold text-slate-800">
              Create Account
            </h2>

            <p className="mb-8 text-slate-500">
              Register to continue
            </p>

            <form
              className="space-y-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                error={errors.fullName?.message}
                {...register("fullName")}
              />

              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                error={errors.email?.message}
                {...register("email")}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                error={errors.password?.message}
                {...register("password")}
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              <Button loading={isSubmitting} type="submit">
                Register
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:underline"
              >
                Login
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Register;