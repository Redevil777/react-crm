import React from 'react';
import Modal from '../Modal/Modal';
import { UpdateUserModalProps } from './UpdateUserModal.props';
import styled from 'styled-components';
import { UserInputForm } from '../UserInputForm/UserInputForm';
import { FieldValues } from 'react-hook-form';
import { Button } from '../Button/Button';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { User } from '../UserList/UserList.interface';
import { deleteUser, updateUser } from '../../features/Users/users-slice';
import { TypedDispatch } from '../../store';


const TitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
	position: relative;
	& > h3 {
		margin-left: 50%;
		transform: translateX(-50%);
	}
`;

const DeleteButton = styled(Button)`
  background: none;
  font-size: 20px;
  color: #DA0404FF;

  &:hover {
    color: #c25656;
  }
`;

export const UpdateUserModal = ({ user, closeModal }: UpdateUserModalProps) => {
	const dispatch = useDispatch<TypedDispatch>();
	const saveFormHandler = (fieldValues: FieldValues) => {
		dispatch(updateUser(fieldValues as User));
		closeModal();
	}

	const onDeleteHandler = () => {
		dispatch(deleteUser(user._id));
		closeModal();
	}

	return (
		<Modal
			onClick={closeModal}>
			<TitleContainer>
				<h3>Update User</h3>
				<DeleteButton onClick={onDeleteHandler}>
					<AiFillDelete />
				</DeleteButton>
			</TitleContainer>
			<UserInputForm user={user} saveForm={saveFormHandler} />
		</Modal>
	);
};
