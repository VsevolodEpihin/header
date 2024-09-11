import { Children, createContext, useContext } from 'react';

interface AuthContextProps {
  validateUser: boolean;
  open: boolean;
  setValidateUser: (arg: boolean) => void;
  setOpen: (arg: boolean) => void,
  setName: (arg: string) => void,
}

export const AuthContext = createContext<AuthContextProps>({
  validateUser: false,
  open: false,
  setValidateUser: () => {},
  setOpen: () => {},
  setName: () => {},
})

export const useAuth = () => useContext(AuthContext);
