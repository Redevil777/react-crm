import React from 'react';
import styled from 'styled-components';
import { CiSearch } from 'react-icons/ci';
import { FilterButton } from '../FilterButton/FilterButton';

const InputWrapper = styled.form`
	position: relative;
`;

const Input = styled.input`
	border: .5px solid rgba(0, 0, 0, .1);
	height: 40px;
	width: calc(100% - 40px);
	margin: 30px 20px;
	box-shadow: 0 0 0 20px #FAFBFF;
	border-radius: 5px;
	outline: none;
	padding: 0 40px 0 40px;
	&::placeholder {
		color: #BABCC6;
	}
`;

const SearchIcon = styled(CiSearch)`
	position: absolute;
	top: 37px;
	left: 30px;
	font-size: 25px;
  cursor: pointer;
`;

export const SearchInput = () => {
	const submitSearchHandler = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent) => {
		e.preventDefault();
		console.log('search');
	}

	return (
		<InputWrapper onSubmit={submitSearchHandler}>
			<Input placeholder='Search for name, email, company...' />
			<SearchIcon onClick={submitSearchHandler} />
			<FilterButton />
		</InputWrapper>
	);
};
