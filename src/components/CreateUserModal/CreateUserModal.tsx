import React from 'react';
import Modal from '../Modal/Modal';
import { CreateUserModalProps } from './CreateUserModal.props';
import styled from 'styled-components';
import { UserInputForm } from '../UserInputForm/UserInputForm';
import { FieldValues } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createUser } from '../../features/Users/users-slice';
import { TypedDispatch } from '../../store';

const Title = styled.h3`
	margin: 0 0 30px 0;
	text-align: center;
`;


export const CreateUserModal = ({ closeModal }: CreateUserModalProps) => {
	const dispatch = useDispatch<TypedDispatch>();

	const saveFormHandler = (fieldValues: FieldValues) => {
		dispatch(createUser(fieldValues));
		closeModal();
	}

	return (
		<Modal
			onClick={closeModal}>
			<Title>Create New User</Title>
			<UserInputForm saveForm={saveFormHandler} />
		</Modal>
	);
};
