import axios, { AxiosError } from 'axios';

import { AuthResponse, LoginData, RegisterData } from '../types';

const api = axios.create({
  baseURL:'http://localhost:3005'
})

export const loginUser = async (data: LoginData) => {
  try {
    const response = await api.post<AuthResponse>('api/auth/login', data);
    return response.data;
  } catch(error) {
    if(axios.isAxiosError(error)){
      throw new Error(error.response?.data?.message || error.message)
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

export const registerUser = async (data: RegisterData) => {
  try {
    console.log(data)
    const response = await api.post<AuthResponse>('api/auth/register', data)
    console.log(response)
    return response.data;
  } catch(error) {
    if(axios.isAxiosError(error)){
      throw new Error(error.response?.data?.message || error.message)
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}