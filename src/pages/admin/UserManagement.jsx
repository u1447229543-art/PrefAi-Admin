import { useState, useEffect } from "react";
import { PlusCircle, Trash } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from "@mui/material";
import CustomButton from "../../components/CustomButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../../Yup";
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUserQuery,
  useLazyGetUserByIdQuery,
} from "../../services/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import GlobalModal from "../../components/GlobalModal";
import { formatDateToDDMMYYYY } from "../../utils/date";

const UserManagement = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const [trigger, { data: userData, isLoading: userDataLoading }] =
    useLazyGetUserByIdQuery();

  const usersHeader = ["First Name", "Last Name", "Email", "Role", "Action"];

  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const [addUser, { isLoading }] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const { data: getUsers } = useGetUserQuery(currentPage);

  const [usersList, setUsersList] = useState([]);
  const [totalDocs, setTotalDocs] = useState(10);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleDeleteClick = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("first");
        const response = await deleteUser(id).unwrap();
        console.log(response, "response");

        if (response.success) {
          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the user. Please try again later.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleRowClick = (id) => {
    setOpenModal(true);
    trigger(id);
  };

  const onSubmit = async (values) => {
    try {
      const response = await addUser({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        role: values.role,
      }).unwrap();
      toast.success(response.message);
      reset({ firstName: "", lastName: "", email: "", password: "" });
    } catch (error) {
      toast.error(error.data.message);
      console.log(error.data.message);
    }
  };

  useEffect(() => {
    if (getUsers?.data?.users?.length) {
      console.log(getUsers?.data?.users);
      setUsersList(getUsers?.data?.users);
      setTotalDocs(getUsers?.data?.count);
    }
  }, [getUsers]);

  return (
    <>
      <div className="container mx-auto p-6 max-w-6xl bg-white shadow-lg rounded-xl">
        <div className="text-2xl font font-semibold py-4 text-primary-2">
          Add User
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-6 flex flex-col space-x-2 items-end"
        >
          <div className="flex items-center w-full">
            <div className="mx-2 w-1/2">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    margin="normal"
                  />
                )}
              />
            </div>
            <div className="mx-2 w-1/2">
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    margin="normal"
                  />
                )}
              />
            </div>
          </div>
          <div className="flex items-center w-full">
            <div className="mx-2 w-1/2">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    margin="normal"
                  />
                )}
              />
            </div>
            <div className="mx-2 w-1/2">
              <Controller
                name="password"
                control={control}
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
          </div>
          <div className="flex items-center w-full">
            <div className="mx-2 w-1/2">
              <Controller
                name="role"
                control={control}
                defaultValue="USER"
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="role-select-label">Role</InputLabel>
                    <Select
                      {...field}
                      labelId="role-select-label"
                      id="role-select"
                      label="Role"
                    >
                      <MenuItem value="USER">USER</MenuItem>
                      <MenuItem value="ADMIN">ADMIN</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </div>
          </div>
          <CustomButton
            disabled={isLoading}
            className="w-[200px] mt-1 h-[45px]"
          >
            <PlusCircle className="mr-2" /> Add User
          </CustomButton>
        </form>
      </div>
      <div className="container mx-auto mt-4 p-6 max-w-6xl bg-white shadow-lg rounded-xl">
        <div className="text-2xl font font-semibold py-4 text-primary-2">
          User List
        </div>

        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                {usersHeader.map((item, index) => {
                  return (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 text-left font-medium text-black uppercase"
                    >
                      {item}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {usersList.map((item, index) => {
                return (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(item._id)}
                    className="bg-white hover:bg-gray-100"
                  >
                    <td className="px-6 py-4">{item.firstName}</td>
                    <td className="px-6 py-4">{item.lastName || "-"}</td>
                    <td className="px-6 py-4">{item.email}</td>
                    <td className="px-6 py-4">{item.role}</td>
                    <td className="px-6 py-4 relative">
                      <IconButton
                        onClick={() => handleDeleteClick(item._id)}
                        aria-label="delete"
                      >
                        <Trash className="text-red-500" />
                      </IconButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {usersList.length === 0 && (
            <div className="text-3xl p-4 text-gray-500 text-center w-full">
              NO DATA
            </div>
          )}
        </div>
        <Pagination
          count={Math.ceil(totalDocs / 10)}
          page={currentPage}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
          color="primary"
          style={{ display: "flex", justifyContent: "end", padding: "16px" }}
        />
      </div>
      <GlobalModal
        open={openModal}
        close={() => setOpenModal(false)}
        loading={userDataLoading}
      >
      <h1 className="text-2xl text-center mb-4">User data</h1>
        <div className="flex items-center w-full">
          <div className="mx-2 w-1/2">
            <Controller
              name="firstNameEdit"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={userData?.data?.firstName}
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  margin="normal"
                />
              )}
            />
          </div>
          <div className="mx-2 w-1/2">
            <Controller
              name="lastNameEdit"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="outlined-basic"
                  value={userData?.data?.lastName}
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  margin="normal"
                />
              )}
            />
          </div>
        </div>
        <div className="flex items-center w-full">
          <div className="mx-2 w-1/2">
            <Controller
              name="emailEdit"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="outlined-basic"
                  value={userData?.data?.email}
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  margin="normal"
                />
              )}
            />
          </div>
          <div className="mx-2 w-1/2">
            <Controller
              name="role"
              control={control}
              defaultValue="USER"
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="role-select-label">Role</InputLabel>
                  <Select
                    {...field}
                    value={userData?.data?.role}
                    labelId="role-select-label"
                    id="role-select"
                    label="Role"
                  >
                    <MenuItem value="USER">USER</MenuItem>
                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </div>
        </div>
        <div className="flex items-center w-full">
          {userData?.data?.country && <div className="mx-2 w-1/2">
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="outlined-basic"
                  value={userData?.data?.country}
                  label="Country"
                  type="text"
                  variant="outlined"
                  fullWidth
                  error={!!errors.country}
                  helperText={errors.country?.message}
                  margin="normal"
                />
              )}
            />
          </div>}
          {userData?.data?.maritalStatus && <div className="mx-2 w-1/2">
            <Controller
              name="maritalStatus"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="outlined-basic"
                  value={userData?.data?.maritalStatus}
                  label="Marital Status"
                  type="text"
                  variant="outlined"
                  fullWidth
                  error={!!errors.maritalStatus}
                  helperText={errors.maritalStatus?.message}
                  margin="normal"
                />
              )}
            />
          </div>}
        </div>
        <div className="flex items-center w-full">
          {userData?.data?.dob && <div className="mx-2 w-1/2">
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="outlined-basic"
                  value={formatDateToDDMMYYYY(userData?.data?.dob)}
                  label="Date of Birth"
                  type="text"
                  variant="outlined"
                  fullWidth
                  error={!!errors.dob}
                  helperText={errors.dob?.message}
                  margin="normal"
                />
              )}
            />
          </div>}
          {userData?.data?.securityNumber && <div className="mx-2 w-1/2">
            <Controller
              name="securityNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="outlined-basic"
                  value={userData?.data?.securityNumber}
                  label="Security Number"
                  type="text"
                  variant="outlined"
                  fullWidth
                  error={!!errors.securityNumber}
                  helperText={errors.securityNumber?.message}
                  margin="normal"
                />
              )}
            />
          </div>}
        </div>
      </GlobalModal>
    </>
  );
};

export default UserManagement;
