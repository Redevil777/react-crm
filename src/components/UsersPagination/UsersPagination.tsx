import React from 'react';
import styled from 'styled-components';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
	SearchParams,
	searchUsers,
	selectSearchParams,
	selectUserAmount,
	updateSearchParams
} from '../../features/Users/users-slice';
import { TypedDispatch } from '../../store';

const Container = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	justify-content: end;
	padding: 30px 15px;
	border-radius: 5px;
  background-color: #FAFBFF;
	margin-top: 50px;
`;

const PaginationInfo = styled.span`
	
`;

const Arrow = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
  cursor: pointer;
	width: 40px;
	height: 40px;
	background-color: #FFF;
	border-radius: 8px;
	border: .5px solid rgba(0, 0, 0, .2);
  &:disabled {
    cursor: not-allowed;
  }
`;

const ArrowLeftIcon = styled(FiArrowLeft)`
	font-size: 20px;
`;

const ArrowRightIcon = styled(FiArrowRight)`
	font-size: 20px;
`;

const selectOptions = [
	{ value: 25, label: 25 },
	{ value: 50, label: 50 },
	{ value: 100, label: 100 },
	{ value: 200, label: 200 },
];

const Select = styled.select`
	height: 38px;
	width: 50px;
	border-radius: 5px;
	border: 1px solid #CCCCCC;
`;

const Option = styled.option`
	text-align: center;
`;

export const UsersPagination = () => {
	const dispatch = useDispatch<TypedDispatch>();
	const searchParams = useSelector(selectSearchParams) as SearchParams;
	const userAmount = useSelector(selectUserAmount);

	const updateLimitHandler = (e) => {
		dispatch(updateSearchParams({ value: +e.target.value, name: 'limit' }));
		dispatch(searchUsers());
	}

	const arrowLeftHandler = () => {
		let newSkipValue = +searchParams.skip - +searchParams.limit;
		if (newSkipValue < 1) {
			newSkipValue = 0
		}
		dispatch(updateSearchParams({ value: newSkipValue, name: 'skip' }));
		dispatch(searchUsers());
	}

	const arrowRightHandler = () => {
		const newSkipValue = +searchParams.skip + +searchParams.limit;
		dispatch(updateSearchParams({ value: newSkipValue, name: 'skip' }));
		dispatch(searchUsers());
	}

	const from = searchParams.skip + 1;

	const to = userAmount >= searchParams.limit ? (searchParams.limit + searchParams.skip) > userAmount ? userAmount : searchParams.limit + searchParams.skip : userAmount;

	return (
		<Container>
			<span>Rows per page:</span>
			<Select value={searchParams.limit} onChange={updateLimitHandler}>
				{selectOptions.map(opt => <Option key={opt.value} value={opt.value}>{opt.label}</Option>)}
			</Select>
			<Arrow onClick={arrowLeftHandler} disabled={from === 1} >
				<ArrowLeftIcon />
			</Arrow>
			<PaginationInfo>
				{`${from}-${to} of ${userAmount}`}
			</PaginationInfo>
			<Arrow onClick={arrowRightHandler} disabled={(userAmount - to) <= 0} >
				<ArrowRightIcon />
			</Arrow>
		</Container>
	);
};
