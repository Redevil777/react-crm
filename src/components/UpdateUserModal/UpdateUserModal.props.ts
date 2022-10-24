import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { User } from '../UserList/UserList.interface';

export interface UpdateUserModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	closeModal: () => void;
	user: User;
}