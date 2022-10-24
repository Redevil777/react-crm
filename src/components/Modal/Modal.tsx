import React from 'react';
import styled, { keyframes } from 'styled-components';
import { BackdropProps } from './Backdrop.props';
import { ModalWindowProps } from './ModalWindow.props';
import { createPortal } from 'react-dom';
import { ModalProps } from './Modal.props';

const BackdropContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 20;
	background-color: rgba(0, 0, 0, .75);
`;

const Backdrop = ({ onClick = () => {} }: BackdropProps) => {
	return <BackdropContainer onClick={onClick} />
}

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-3rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalWindowContainer = styled.div`
	position: fixed;
	top: 20vh;
	left: 5%;
	width: 90%;
	background-color: #FFF;
	padding: 16px;
	border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: ${slideDown} 300ms ease-out forwards;
	@media (min-width: 768px) {
		width: 640px;
		left: calc(50% - 320px);
	}
`;

const ModalWindow = ({ children }: ModalWindowProps) => {
	return <ModalWindowContainer>{ children }</ModalWindowContainer>
}

const overlays = document.getElementById('overlays') as HTMLElement;

const Modal = ({ children, onClick }: ModalProps) => {
	return (
		<>
			{ createPortal(<Backdrop onClick={onClick} />, overlays) }
			{ createPortal(<ModalWindow>{ children }</ModalWindow>, overlays) }
		</>
	);
};

export default Modal;
