import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { resetPasswordSchema } from "../Yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCreatePasswordMutation } from "../services/api";
import { toast } from "react-toastify";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [resetPassword, { isLoading }] = useCreatePasswordMutation();
  const token = searchParams.get("token");

  const [checkNewPassword, setCheckNewPassword] = useState(false);
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(false);

  const confirmPasswordClicked = () => {
    setCheckConfirmPassword((prev) => !prev);
  };
  const newPasswordClicked = () => {
    setCheckNewPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    console.log(data, "data");
    try {
      const response = await resetPassword({
        token: token,
        password: data.newPassword,
      }).unwrap();
      toast.success(response.message);
      navigate("/login");
    } catch (error) {
      toast.success(error.data.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 w-[500px]">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Enter Password
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mb-3">
              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    type={checkNewPassword ? "text" : "password"}
                    label="New Password"
                    variant="outlined"
                    fullWidth
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
                    margin="normal"
                  />
                )}
              />
              <div
                onClick={newPasswordClicked}
                className="absolute top-8 right-3"
              >
                {checkNewPassword ? <Eye /> : <EyeOff />}
              </div>
            </div>
            <div className="relative mb-3">
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    type={checkConfirmPassword ? "text" : "password"}
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    margin="normal"
                  />
                )}
              />
              <div
                onClick={confirmPasswordClicked}
                className="absolute top-8 right-3"
              >
                {checkConfirmPassword ? <Eye /> : <EyeOff />}
              </div>
            </div>
            {/* Submit Button */}
            <div className="mt-6">
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                fullWidth
                className="bg-primary-2 text-white hover:bg-blue-700 h-[45px]"
              >
                Submit
              </Button>
            </div>
          </form>
          <div className="text-sm text-gray-400 mt-2">
            *Password must contain atleast 1 Uppercase letter, 1 Special
            character
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
