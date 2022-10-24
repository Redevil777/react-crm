import React from 'react';
import Modal from '../Modal/Modal';
import { UpdateUserModalProps } from './UpdateUserModal.props';
import styled from 'styled-components';
import { UserInputForm } from '../UserInputForm/UserInputForm';
import { FieldValues } from 'react-hook-form';

const Title = styled.h3`
	margin: 0 0 30px 0;
	text-align: center;
`;

export const UpdateUserModal = ({ user, closeModal }: UpdateUserModalProps) => {
	const saveFormHandler = (fieldValues: FieldValues) => {
		console.log('fieldValues');
		console.log(fieldValues);
		closeModal();
	}

	return (
		<Modal
			onClick={closeModal}>
			<Title>Update User</Title>
			<UserInputForm user={user} saveForm={saveFormHandler} />
		</Modal>
	);
};
