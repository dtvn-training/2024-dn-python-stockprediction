import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as yup from "yup";
import { UsersManagementItemPageProps } from "./UsersManagementItemPage.types";
import { ControllerInput, FormSelect, PageLayout } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { UsersApi } from "../../services/api/users.api";
import { LoadingPage } from "../LoadingPage";
import { AvatarContainer, Container } from "./UsersManagementItemPage.styled";
import { Avatar, Button, TextField } from "@mui/material";
import { User } from "..";
import { ROLES } from "../../constants";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const validationSchema = yup.object().shape({
  avatar: yup.string().trim(),
  country: yup.string().trim(),
  dob: yup.date(),
  email: yup.string().trim().email(),
  id: yup.string().trim(),
  name: yup.string().trim(),
  role: yup.string().trim(),
});

const UsersManagementItemPage: React.FC<UsersManagementItemPageProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  const { id } = useParams();

  const { handleSubmit, control } = useForm<User>({
    defaultValues: user,
    mode: "onBlur",
    shouldUnregister: true,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    resolver: yupResolver(validationSchema),
  });

  const getUserHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await UsersApi.getUser(id ?? "");
      setUser(res.data);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (err.response.status === 404) {
        navigate("/management/users");
      }
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate]);

  const onToggleEdit = useCallback(() => {
    setIsEdit((_isEdit) => !_isEdit);
  }, []);

  const userRoleValue = useMemo(
    () => ROLES.find((item) => item.label === user?.role)?.value,
    [user?.role]
  );

  const onSubmitHandler: SubmitHandler<User> = useCallback(
    async (values) => {
      console.log({ values });
      const _values = {
        ...values,
        dob: dayjs(values.dob).format("YYYY-MM-DD"),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        roleId: !isNaN(values.role) ? +values.role : userRoleValue,
      };

      if (id) {
        const res = await UsersApi.updateUser(id, _values);

        if (res.status === 200) {
          setIsEdit(false);
          toast.success("Edit successfully!");
          navigate(-1);
        }
      }
    },
    [id, navigate, userRoleValue]
  );

  useEffect(() => {
    getUserHandler();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <PageLayout>
      <Container onSubmit={handleSubmit(onSubmitHandler)}>
        <AvatarContainer>
          <Avatar
            alt="user-avatar"
            src={user?.avatar}
            sx={{ width: 256, height: 256 }}
          />
        </AvatarContainer>
        <TextField
          id="user-id"
          label="User id"
          variant="outlined"
          defaultValue={user?.id}
          disabled
        />
        <ControllerInput
          id="user-name"
          label="User name"
          variant="outlined"
          defaultValue={user?.name}
          disabled={!isEdit}
          control={control}
          formField="name"
        />
        <ControllerInput
          id="user-email"
          label="Email"
          variant="outlined"
          defaultValue={user?.email}
          disabled={!isEdit}
          control={control}
          formField="email"
        />
        {/* <ControllerInput
          id="user-dob"
          label="Date of birth"
          variant="outlined"
          // defaultValue={
          //   user?.dob
          //     ? new Date(user?.dob ?? "").toISOString().split("T")[0]
          //     : ""
          // }
          defaultValue={"2023-01-01T12:00"}
          // disabled={!isEdit}
          type="date"
          control={control}
          formField="dob"
          InputLabelProps={{ shrink: true }}
        /> */}
        <FormSelect
          control={control}
          formField="role"
          label="Role"
          disabled={!isEdit}
          value={userRoleValue}
          options={ROLES}
        />
        {!isEdit && (
          <Button
            variant="contained"
            type="button"
            fullWidth
            onClick={onToggleEdit}
          >
            Edit User Profile
          </Button>
        )}
        {isEdit && (
          <Button variant="contained" type="submit" fullWidth>
            Edit User Profile
          </Button>
        )}
      </Container>
    </PageLayout>
  );
};

export default UsersManagementItemPage;
