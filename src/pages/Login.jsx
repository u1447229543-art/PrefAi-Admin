import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../Yup";
import { useLoginMutation } from "../services/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { CircularProgress } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [loginUser, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      console.log(response, "response");
      if (!response.success) {
        return toast.error("Login Failed");
      }
      toast.success("Login successful!");
      dispatch(setUser(response.data));
      console.log("here 23")
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("role", response.data.userInfo.role);
      localStorage.setItem("userData", JSON.stringify(response.data));

      navigate("/admin/user");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-t from-[#dcc9f9] to-[#ffc2cd] ">
      <div className="flex-col items-center justify-center">
        <img src="https://res.cloudinary.com/deaezftpx/image/upload/v1760396526/Frame_410_tqamkz.png" alt="Logo" width={80} className="m-auto my-6" />
        <div className="bg-white shadow-md rounded-lg p-6 min-w-[400px]">
          <h2 className="text-2xl font-semibold text-center">Login</h2>
          <p className="text-sm   text-gray-600  text-center my-2 ">
            Please enter your credentials to continue.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="mb-8">
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    margin="normal"
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    margin="normal"
                  />
                )}
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
                {!isLoading ? (
                  "Login"
                ) : (
                  <CircularProgress
                    size={24}
                    color="inherit"
                    className="absolute left-1/2 transform -translate-x-1/2"
                  />
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
