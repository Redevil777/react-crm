import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CreateUserModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	closeModal: () => void;
}