import React, { useEffect, useState } from 'react';

import style from './styles/Header.module.css';
import CurrentModal from './Modal';
import { AuthContext } from './context';
import Search from './Search';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [validateUser, setValidateUser] = useState(false)
  const [name, setName] = useState('')

  const handleOpen = () => {
    setOpen(true)
  }

  useEffect(()=>{
    const token = localStorage.getItem('authToken')
    const userName = localStorage.getItem('userName')

    if(token && userName) {
      setValidateUser(true)
      setName(userName)
    }
  }, [])

  return(
    <AuthContext.Provider value={{ validateUser, open, setValidateUser, setOpen, setName}}>
      <header className={style.header}>
      <h2>DuNiceTub</h2>
      <Search />
      {validateUser ? (
      <div className={style.profileContainer}>
        {name}
      </div>
    ) : (
      <div className={style.btnContainer}>
        <button onClick={() => handleOpen()}>Log in</button>
      </div>
      )
      }
      {open && <CurrentModal />}
    </header>
    </AuthContext.Provider>
  )
}

export default Header;
