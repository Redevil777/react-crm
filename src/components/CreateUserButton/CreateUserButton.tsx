import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { MdAddCircleOutline } from 'react-icons/md';
import styled from 'styled-components';
import { CreateUserModal } from '../CreateUserModal/CreateUserModal';

const CreateUserBtn = styled(Button)`
  background-color: #133D82;
  color: #FFF;
  border-radius: 7px;
	padding: 5px 20px;
	&:hover {
		background-color: #154998;
	}
	&:active {
		transform: scale(.99);
	}
`;

const ButtonText = styled.span`
	margin-left: 15px;
	font-size: 1rem;
`;

export const CreateUserButton = () => {
	const [isShowCreateUserModal, setIsShowCreateUserModal] = useState(false);
	const openCreateUserModal = () => {
		setIsShowCreateUserModal(true);
	}
	const closeCreateUserModal = () => {
		setIsShowCreateUserModal(false);
	}

	return (
		<>
			<CreateUserBtn onClick={openCreateUserModal}>
				<MdAddCircleOutline size='2rem' />
				<ButtonText>Create User</ButtonText>
			</CreateUserBtn>
			{ isShowCreateUserModal &&  <CreateUserModal closeModal={closeCreateUserModal} />}
		</>
	);
};
