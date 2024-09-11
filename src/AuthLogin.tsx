import React from 'react';
import { Button, TextField } from '@mui/material';
import { ModalType } from './types';
import { useForm, Controller, Form } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaLogin } from './validation.schema';
import { loginUser } from './helpers/api';
import { useAuth } from './context';

interface AuthLoginProps {
  setModalContent: (type: ModalType) => void;
}

const AuthLogin = ({setModalContent}: AuthLoginProps) => {
  const { setValidateUser, setOpen, setName } = useAuth()
  const {control, handleSubmit, formState: {isValid, errors}} = useForm({
    resolver: yupResolver(schemaLogin),
    mode: 'onChange'
  })

  const switchModal = () => {
    setModalContent('register')
  }

  const onSubmit = async (data: any) => {
    try {
      const response = await loginUser(data)
      const token = response.token;
      localStorage.setItem('authToken', token)
      localStorage.setItem('userName', response.user.name)
      console.log(response)
      setValidateUser(true)
      setOpen(false)
      setName(response.user.name)
    } catch(error) {
      if(error instanceof Error) {
        console.error('ошибка при авторизации', error.message)
      } else {
        console.error('неизвестная ошибка', error)
      }
    }
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name='email'
        render={({ field }) => (
          <TextField sx={{
            padding: '10px'
          }}
          {...field}
          label="Email"
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
          fullWidth
          />
        )}
      />
      
      <Controller
        control={control}
        name='password'
        render={({ field }) => (
          <TextField sx={{
            padding: '10px'
          }}
          {...field}
          label="Password"
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
          fullWidth
          />
        )}
      />
        <Button 
        variant='outlined' 
        type="submit"
        disabled={!isValid}
      >
        Авторизоваться
      </Button>
      <Button onClick={() => switchModal()}>Switch to Register</Button>
    </form>
  )
}

export default AuthLogin;
