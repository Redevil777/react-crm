import React from 'react';
import styled from 'styled-components';
import { CreateUserButton } from '../CreateUserButton/CreateUserButton';
import { useSelector } from 'react-redux';
import { selectUserAmount } from '../../features/Users/users-slice';

const Container = styled.div`
	display: flex;
	justify-content: space-between;
`;

const TitleWrapper = styled.div`
	
`;

const Title = styled.h2`
	margin: 0;
`;


export const UsersHeader = () => {
	const userAmount = useSelector(selectUserAmount);
	return (
		<Container>
			<TitleWrapper>
				<Title>Users</Title>
				<span>{`${userAmount} ${userAmount === 1 ? 'user' : 'users'}`}</span>
			</TitleWrapper>
			<CreateUserButton />
		</Container>
	);
};
