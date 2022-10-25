import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Column, User } from './UserList.interface';
import { UpdateUserModal } from '../UpdateUserModal/UpdateUserModal';
import {
	searchUsers,
	selectLoading,
	selectSortParams,
	selectUsers,
	updateSortParams
} from '../../features/Users/users-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { MdModeEditOutline, MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { Loader } from '../Loader/Loader';
import { TypedDispatch } from '../../store';

const columns: Column[] = [
	{ label: 'Name', fieldName: 'name', size: '6%' },
	{ label: 'Gender', fieldName: 'gender', size: '6%' },
	{ label: 'Age', fieldName: 'age', size: '6%' },
	{ label: 'Email', fieldName: 'email', size: '12%' },
	{ label: 'Balance', fieldName: 'balance', size: '8%' },
	{ label: 'Company', fieldName: 'company', size: '10%' },
	{ label: 'Phone', fieldName: 'phone', size: '10%' },
	{ label: 'Eye Color', fieldName: 'eyeColor', size: '6%' },
	{ label: 'Address', fieldName: 'address', size: '15%' },
	{ label: 'Status', fieldName: 'isActive', size: '10%' },
];

const Container = styled.div`
	overflow: auto;
	width: 100%;
	height: 300px;
`;

const Table = styled.table`
	width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed
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
	font-size: 11px;
	text-transform: uppercase;
	position: sticky;
	top: 0;
	z-index: 1;
	background-color: #F5F5F5;
`;

const THEdit = styled(TH)`
	width: 4%;
`;

const TD = styled.td`
	padding: 15px;
	text-align: left;
	vertical-align: middle;
	font-weight: 300;
	font-size: 12px;
	border-bottom: 1px solid rgba(255, 255, 255, .1);
  overflow-wrap: break-word;
	height: 60px;
`;

const TDEdit = styled(TD)`
  cursor: pointer;
`;

const TR = styled.tr`
	&:hover {
		background-color: rgba(0, 0, 0, .02);
  }
`;

const TableHeadColumn = styled.span<any>`
	cursor: pointer;
	display: flex;
	align-items: center;
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

const VirtualScrollChild = ({ children }) => {
	const [ref, inView] = useInView();
	return (
		<span ref={ref}>
			{ inView ? children : null }
		</span>
	);
}

export const UserList = () => {
	const [isUpdateUserModalShow, setIsUpdateUserModalShow] = useState(false);
	const [currentUser, setCurrentUser] = useState<User>({});
	const dispatch = useDispatch<TypedDispatch>();
	const users: User[] = useSelector(selectUsers);
	const sortParams = useSelector(selectSortParams);
	const isLoading = useSelector(selectLoading);

	useEffect(() => {
		dispatch(searchUsers());
	}, [dispatch]);


	const printColumn = (user: User, column: Column) => {
		if (column.fieldName === 'balance') {
			return currencyFormat(user[column.fieldName])
		}
		if (column.fieldName !== 'isActive') {
			return user[column.fieldName];
		}
		const { isActive } = user;
		if (isActive) return <StatusActive>Active</StatusActive>
		return <StatusInActive>Inactive</StatusInActive>
	}

	const showUpdateUserModal = (user: User) => {
		setIsUpdateUserModalShow(true);
		setCurrentUser(user);
	}

	const closeUpdateUserModal = () => {
		setIsUpdateUserModalShow(false);
		setCurrentUser({});
	}

	const columnSortHandler = (fieldName: string) => {
		dispatch(updateSortParams(fieldName));
		dispatch(searchUsers());
	}

	const currencyFormat = (num: string = '') => {
		return '$' + (+num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	}

	return (
		<>
			<Loader isShow={isLoading} />
			<Container>
				<Table>
					<Thead>
						<tr>
							{columns.map(column => (
								<TH key={column.label} style={{ width: column.size }}>
									<TableHeadColumn
										onClick={() => columnSortHandler(column.fieldName)}>
										{column.label}
										{ sortParams[column.fieldName] === 1 && <MdKeyboardArrowUp /> }
										{ sortParams[column.fieldName] === -1 && <MdKeyboardArrowDown /> }
									</TableHeadColumn>
								</TH>
							))}
							<THEdit />
						</tr>
					</Thead>
					<Tbody>
						{users.map((user: User) => (
							<TR
								key={user.email}>
								{columns.map((column: Column) => (
									<TD key={column.label}>
										{<VirtualScrollChild>
											{ printColumn(user, column) }
										</VirtualScrollChild>}
									</TD>
								))}
								<TDEdit onClick={() => showUpdateUserModal(user)}>
									<MdModeEditOutline />
								</TDEdit>
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
