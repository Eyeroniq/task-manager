import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";

import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";

import { login } from "../../api/auth.api";
import { useAuth } from "../../hooks/useAuth";

import {
  loginSchema,
  type LoginFormData,
} from "../../utils/validation";

function Login() {
  const navigate = useNavigate();

  const { setUser, setToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

 const onSubmit = async (data: LoginFormData) => {
  try {
    const response = await login(data);

    console.log("LOGIN RESPONSE:", response);

    const { token, user } = response.data;

setToken(token);
setUser(user);

toast.success(response.message);

if (user.role === "ADMIN") {
  navigate("/admin", { replace: true });
} else {
  navigate("/dashboard", { replace: true });
}
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    if (axios.isAxiosError(error)) {
      console.error("AXIOS:", error.response?.data);

      toast.error(error.response?.data?.message ?? "Login failed");
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
          Manage tasks, collaborate with your team and stay
          productive.
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-1 items-center justify-center bg-slate-100 p-6">
        <div className="w-full max-w-md space-y-6">
          <Card>
            <h2 className="mb-2 text-3xl font-bold">
              Welcome Back
            </h2>

            <p className="mb-8 text-slate-500">
              Sign in to your account
            </p>

            <form
              className="space-y-5"
              onSubmit={handleSubmit(onSubmit)}
            >
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

              <Button loading={isSubmitting} type="submit">
                Login
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <Link
                className="font-semibold text-blue-600"
                to="/register"
              >
                Register
              </Link>
            </div>
          </Card>

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="font-semibold text-blue-700">
              Demo Admin
            </p>

            <p className="text-sm">
              Email: superadmin@example.com
            </p>

            <p className="text-sm">
              Password: password123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;