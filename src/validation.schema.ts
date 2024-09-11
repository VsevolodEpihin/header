import * as yup from 'yup'

export const shemaRegister = yup.object().shape({
  name: yup.string().min(1, 'Логин должен быть больше 1 символа').max(255, 'максимально допустимая длина логина 255 символов').required('Login обязателен'),
  email: yup.string().email('Неверный формат email').required('Email обязателен'),
  password: yup.string().min(1, 'Пароль должен быть больше 1 символа').max(255, 'максимально допустимая длина пароля 255 символов').required('Password обязателен'),
})

export const schemaLogin = yup.object().shape({
  email: yup.string().email('Неверный формат email').required('Email обязателен'),
  password: yup.string().min(1, 'Пароль должен быть больше 1 символа').max(255, 'максимально допустимая длина пароля 255 символов').required('Password обязателен'),
})
