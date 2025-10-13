import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useResetPasswordMutation } from "../services/api";
import { toast } from "react-toastify";
import logo from "../assets/spotlight.png";

const ForgotPassword = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [resetPassword] = useResetPasswordMutation();

  const onSubmit = async (data) => {
    try {
      const response = await resetPassword(data);
      toast.success(response.message);
      reset({
        email: "",
      });
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 bg-gradient-to-t from-[#dcc9f9] to-[#ffc2cd]">
      <div className="flex-col items-center justify-center">
        <img src={logo} alt="Logo" width={160} className="m-auto my-6" />
        <div className="bg-white shadow-md rounded-lg p-6 min-w-[400px]">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="mb-8">
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
            </div>
            {/* Submit Button */}
            <div className="mt-6">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="!bg-[#170048] text-white hover:bg-[#170048] h-[45px]"
              >
                Submit
              </Button>
            </div>
          </form>
          <Link to="/login">
            <div className="text-primary-2 text-center text-sm mt-4 cursor-pointer">
              Back To Login
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
