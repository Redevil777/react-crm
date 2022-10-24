import React from 'react';
import styled from 'styled-components';
import { CreateUserButton } from '../CreateUserButton/CreateUserButton';

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
	return (
		<Container>
			<TitleWrapper>
				<Title>Users</Title>
				<span>38 users</span>
			</TitleWrapper>
			<CreateUserButton />
		</Container>
	);
};
