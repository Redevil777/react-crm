import React from 'react';
import { Card, SearchInput, UserList, UsersHeader, UsersPagination } from '../../components';
import styled from 'styled-components';

const Container = styled.div`
  background: linear-gradient(180deg, rgba(246,242,236,1) 0%, rgba(231,240,238,1) 25%, rgba(225,239,244,1) 100%);
  height: 100vh;
	width: 100vw;
	overflow-x: hidden;
	justify-content: center;
	align-items: center;
	padding: 100px 50px;
	@media (max-width: 1100px) {
		padding: 0;
	}
`;

const Users = () => {
	return (
		<Container>
			<Card>
				<UsersHeader />
				<SearchInput />
				<UserList />
				<UsersPagination />
			</Card>
		</Container>
	);
};

export default Users;
