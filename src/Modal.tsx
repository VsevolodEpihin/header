import { Box, Modal } from "@mui/material";
import React from "react";

import { ModalType } from "./types";
import { useState } from "react";
import AuthRegister from "./AuthRegister";
import AuthLogin from "./AuthLogin";
import { useAuth } from "./context";

const CurrentModal = () => {
  const { open, setOpen } = useAuth()
  const [modalContent, setModalContent] = useState<ModalType>('login')

  const handleClose = () => {
    setOpen(false)
  }

  return(
    <Modal open={open} onClose = {handleClose}>
      <Box sx={{width: 300, padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '20vh'}}>
        {modalContent === 'login' ?(
          <AuthLogin setModalContent={setModalContent} />
        ):(
          <AuthRegister setModalContent={setModalContent}/>
        )
      }
      </Box>
    </Modal>
  )
}

export default CurrentModal;
