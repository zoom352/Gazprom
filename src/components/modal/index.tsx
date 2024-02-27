import React, {FC, Dispatch, SetStateAction, ReactNode} from 'react';
import {StyledModal, StyledModalContent} from './styles'

interface IModal {
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>,
  children: ReactNode
}

const Modal: FC<IModal> = (props) => {
  const {
    active,
    setActive, 
    children
  } = props

  return (
    <StyledModal className={active ? "active" : ""} onClick={() => setActive(false)}>
      <StyledModalContent onClick={e => e.stopPropagation()}>
        {children}
      </StyledModalContent>
    </StyledModal>
  );
}

export default Modal
