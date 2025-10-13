import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { changePasswordSchema, profileSchema } from "../Yup";
import { Eye, EyeOff, PlusCircle } from "lucide-react";
import CustomButton from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  useChangePasswordMutation,
  useProfileEditMutation,
} from "../services/api";
import { toast } from "react-toastify";

const Setting = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const {
    control: profileControl,
    reset: resetControl,
    handleSubmit: profileHandleSubmit,
    formState: { errors: profileErrors },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const role = user.role;
  const userId = user._id;

  const [changePassword] = useChangePasswordMutation();
  const [updateProfile] = useProfileEditMutation();

  const [checkOldPassword, setCheckOldPassword] = useState(false);
  const [checkNewPassword, setCheckNewPassword] = useState(false);
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(false);

  const confirmPasswordClicked = () => {
    setCheckConfirmPassword((prev) => !prev);
  };
  const newPasswordClicked = () => {
    setCheckNewPassword((prev) => !prev);
  };
  const oldPasswordClicked = () => {
    setCheckOldPassword((prev) => !prev);
  };

  const onSubmit = async (values) => {
    try {
      const data = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      const response = await changePassword(data).unwrap();
      toast.success(response.message);
      reset();
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  const onProfileSubmit = async (values) => {
    try {
      const checkRole = {
        COMPANY: "company",
        INTERVIEWER: "interviewer",
        RECRUITER: "recruiter",
      };
      const data = {
        name: values.name,
      };
      const response = await updateProfile({
        data,
        role: checkRole[role],
        id: userId,
      }).unwrap();
      toast.success(response?.message);
      let user = JSON.parse(localStorage.getItem("userData"));
      user.user.name = values.name;
      localStorage.setItem("userData", JSON.stringify(user));
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const dynamicLabel = {
    ADMIN: "Admin",
    COMPANY: "Company",
    RECRUITER: "Recruiter",
    INTERVIEWER: "Interviewer",
  };

  useEffect(() => {
    if (user.name) {
      resetControl({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  return (
    <>
      <div className="container mx-auto p-6 mb-6 max-w-6xl bg-white shadow-lg rounded-xl ">
        <div className="text-2xl font font-semibold py-4 text-primary-2">
          Profile Details
        </div>
        <form
          onSubmit={profileHandleSubmit(onProfileSubmit)}
          className="mb-6 flex flex-col space-x-2 items-end"
        >
          <div className="flex items-center w-full">
            <div className="relative mr-2 w-1/2">
              <Controller
                name="name"
                control={profileControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label={`${dynamicLabel[role]} Name`}
                    variant="outlined"
                    focused
                    disabled={role === "ADMIN"}
                    fullWidth
                    error={!!profileErrors.name}
                    helperText={profileErrors.name?.message}
                    margin="normal"
                  />
                )}
              />
            </div>
            <div className="relative ml-2 w-1/2">
              <Controller
                name="email"
                control={profileControl}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label={`${dynamicLabel[role]} Email`}
                    variant="outlined"
                    focused
                    className="pointer-events-none"
                    type="email"
                    fullWidth
                    error={!!profileErrors.email}
                    helperText={profileErrors.email?.message}
                    margin="normal"
                  />
                )}
              />
            </div>
          </div>
          <CustomButton disabled={false} className="w-[200px] mt-1 h-[45px]">
            <PlusCircle className="mr-2" /> Update Details
          </CustomButton>
        </form>
      </div>
      <div className="container mx-auto p-6 max-w-6xl bg-white shadow-lg rounded-xl">
        <div className="text-2xl font font-semibold py-4 text-primary-2">
          Change Password
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-6 flex flex-col space-x-2 items-end"
        >
          <div className="flex items-center w-full">
            <div className="relative mr-2 w-full">
              <Controller
                name="oldPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type={checkOldPassword ? "text" : "password"}
                    id="outlined-basic"
                    label="Old Password"
                    variant="outlined"
                    fullWidth
                    error={!!errors.oldPassword}
                    helperText={errors.oldPassword?.message}
                    margin="normal"
                  />
                )}
              />
              <div
                onClick={oldPasswordClicked}
                className="absolute top-8 right-3"
              >
                {checkOldPassword ? <Eye /> : <EyeOff />}
              </div>
            </div>
          </div>
          <div className="flex items-center w-full">
            <div className="relative mr-2 w-1/2">
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type={checkNewPassword ? "text" : "password"}
                    id="outlined-basic"
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
            <div className="relative ml-2 w-1/2">
              <Controller
                name="confirmPassword"
                control={control}
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
          </div>
          <CustomButton disabled={false} className="w-[200px] mt-1 h-[45px]">
            <PlusCircle className="mr-2" /> Submit
          </CustomButton>
        </form>
      </div>
    </>
  );
};

export default Setting;
