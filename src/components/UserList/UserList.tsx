import React, { useState } from 'react';
import styled from 'styled-components';
import { Column, User } from './UserList.interface';
import { UpdateUserModal } from '../UpdateUserModal/UpdateUserModal';

const users: User[] = [
	{
		"isActive": true,
		"balance": "$3,100.48",
		"age": '26',
		"eyeColor": "blue",
		"name": "Lottie Crane",
		"gender": "male",
		"company": "DENTREX",
		"email": "lottiecrane1@dentrex.com",
		"phone": "+1 (921) 417-3751",
		"address": "947 Lefferts Avenue, Chumuckla, Wyoming, 536"
	},
	{
		"isActive": false,
		"balance": "$3,100.48",
		"age": '26',
		"eyeColor": "brown",
		"name": "Lottie Crane",
		"gender": "female",
		"company": "DENTREX",
		"email": "lottiecrane2@dentrex.com",
		"phone": "+1 (921) 417-3751",
		"address": "947 Lefferts Avenue, Chumuckla, Wyoming, 536"
	},
	{
		"isActive": false,
		"balance": "$3,100.48",
		"age": '26',
		"eyeColor": "brown",
		"name": "Lottie Crane",
		"gender": "female",
		"company": "DENTREX",
		"email": "lottiecrane3@dentrex.com",
		"phone": "+1 (921) 417-3751",
		"address": "947 Lefferts Avenue, Chumuckla, Wyoming, 536"
	},
	{
		"isActive": false,
		"balance": "$3,100.48",
		"age": '26',
		"eyeColor": "brown",
		"name": "Lottie Crane",
		"gender": "female",
		"company": "DENTREX",
		"email": "lottiecrane4@dentrex.com",
		"phone": "+1 (921) 417-3751",
		"address": "947 Lefferts Avenue, Chumuckla, Wyoming, 536"
	}
];

const columns: Column[] = [
	{ label: 'Status', fieldName: 'isActive' },
	{ label: 'Balance', fieldName: 'balance' },
	{ label: 'Age', fieldName: 'age' },
	{ label: 'Eye Color', fieldName: 'eyeColor' },
	{ label: 'Name', fieldName: 'name' },
	{ label: 'Gender', fieldName: 'gender' },
	{ label: 'Company', fieldName: 'company' },
	{ label: 'Email', fieldName: 'email' },
	{ label: 'Phone', fieldName: 'phone' },
	{ label: 'Address', fieldName: 'address' },
];

const Container = styled.div`
	overflow: auto;
	width: 100%;
`;

const Table = styled.table`
	width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
`;

const Thead = styled.thead`
  background-color: rgba(0, 0, 0, 0.04);
`;

const Tbody = styled.tbody`
	tr:nth-child(even) {
    background-color: #EDF3FF;
    &:hover {
      background-color: rgba(237, 243, 255, .5);
    }
	}
`;

const TH = styled.th`
	padding: 20px 15px;
	text-align: left;
	font-weight: 500;
	font-size: 12px;
	text-transform: uppercase;
`;

const TD = styled.td`
	padding: 15px;
	text-align: left;
	vertical-align: middle;
	font-weight: 300;
	font-size: 12px;
	border-bottom: 1px solid rgba(255, 255, 255, .1);
  word-wrap: break-word;
`;

const TR = styled.tr`
	cursor: pointer;
	&:hover {
		background-color: rgba(0, 0, 0, .02);
  }
`;

const TableHeadColumn = styled.span`
	cursor: pointer;
`;

const Status = styled.div`
  border-radius: 5px;
  border: 0.5px solid #DADCE4;
  padding: 7px;
  position: relative;
  display: flex;
  width: 70px;
  align-items: center;
  justify-content: end;
  &:before {
    content: '';
    position: absolute;
    left: 8px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #41D18D;
  }
`;

const StatusActive = styled(Status)``;

const StatusInActive = styled(Status)`
  width: 75px;
	color: #ADAFBB;
  &:before {
    background-color: #ADAFBB;
  }
`;

export const UserList = () => {
	const [isUpdateUserModalShow, setIsUpdateUserModalShow] = useState(false);
	const [currentUser, setCurrentUser] = useState<User>({});

	const printColumn = (user: User, column: Column) => {
		if (column.fieldName !== 'isActive') {
			type UserKey = keyof typeof user;
			return user[column.fieldName as UserKey];
		}
		const { isActive } = user;
		if (isActive) return <StatusActive>Active</StatusActive>
		return <StatusInActive>Inactive</StatusInActive>
	}

	const showUpdateUserModal = (user: any) => {
		console.log('showUpdateUserModal');
		console.log(user);
		setIsUpdateUserModalShow(true);
		setCurrentUser(user);
	}

	const closeUpdateUserModal = () => {
		setIsUpdateUserModalShow(false);
		setCurrentUser({});
	}

	return (
		<>
			<Container>
				<Table>
					<Thead>
						<tr>
							{columns.map(column => (
								<TH key={column.label}>
									<TableHeadColumn>{column.label}</TableHeadColumn>
								</TH>
							))}
						</tr>
					</Thead>
					<Tbody>
						{users.map((user: User) => (
							<TR
								onClick={() => showUpdateUserModal(user)}
								key={user.email}>
								{columns.map((column: Column) => (
									<TD key={column.label}>{
										printColumn(user, column)
									}</TD>
								))}
							</TR>
						))}
					</Tbody>
				</Table>
			</Container>
			{ isUpdateUserModalShow &&
				<UpdateUserModal
          user={currentUser}
					closeModal={closeUpdateUserModal}
				/>}
		</>
	);
};
