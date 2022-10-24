import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface FilterModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	closeModal: () => void;
}