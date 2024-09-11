import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { shemaRegister } from './validation.schema';
import { ModalType } from "./types";
import { registerUser } from "./helpers/api";
import { useAuth } from "./context";

interface AuthRegisterProps {
  setModalContent: (arg: ModalType) => void;
}

const AuthRegister = ({ setModalContent }: AuthRegisterProps) => {
  const { setValidateUser, setOpen, setName } = useAuth()
  const { control, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(shemaRegister),
    mode: 'onChange',
  });

  const switchModal = () => {
    setModalContent('login');
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await registerUser(data);
      console.log(response)
      const token = response.token;
      localStorage.setItem('authToken', token)
      localStorage.setItem('userName', response.user.name)
      setValidateUser(true)
      setOpen(false)
      setName(response.user.name)
      console.log('Пользователь зареган')
    } catch(error) {
      if(error instanceof Error) {
        console.error('ошибка при авторизации', error.message)
      } else {
        console.error('Неизвестная ошибка', error)
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography sx={{ margin: '10px 0' }}>Register</Typography>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Login"
            error={!!errors.name}
            fullWidth
            helperText={errors.name ? errors.name.message : ''}
            sx={{ padding: '10px' }}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            fullWidth
            sx={{ padding: '10px' }}
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
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            fullWidth
            sx={{ padding: '10px' }}
          />
        )}
      />

      <Button 
        variant='outlined' 
        type="submit"
        disabled={!isValid}
      >
        Зарегистрироваться
      </Button>

      <Button onClick={switchModal}>Switch to Login</Button>
    </form>
  );
};

export default AuthRegister;
