import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { User } from '../UserList/UserList.interface';
import { FieldValues } from 'react-hook-form';

export interface UserInputFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
	user?: User;
	saveForm: (fieldValues: FieldValues) => void;
}