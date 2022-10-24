import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { CreateUserModalProps } from './CreateUserModal.props';
import styled from 'styled-components';
import { UserInputForm } from '../UserInputForm/UserInputForm';
import { Button } from '../Button/Button';
import { User } from '../UserList/UserList.interface';
import { ActionMeta, SingleValue } from 'react-select';
import { FieldValues } from 'react-hook-form';

const SaveBtn = styled(Button)`
  margin: 50px auto 10px;
  background-color: #498249;
  color: #FFF;
  width: 200px;
  padding: 15px;
  border-radius: 5px;

  &:hover {
    background-color: #4e8c4e;
  }
`;

const Title = styled.h3`
	margin: 0 0 30px 0;
	text-align: center;
`;


export const CreateUserModal = ({ closeModal }: CreateUserModalProps) => {

	const saveFormHandler = (fieldValues: FieldValues) => {
		console.log('fieldValues');
		console.log(fieldValues);
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
