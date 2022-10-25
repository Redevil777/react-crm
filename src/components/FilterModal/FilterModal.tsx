import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { FilterModalProps } from './FilterModal.props';
import styled from 'styled-components';
import { Input } from '../UserInputForm/UserInputForm';
import { SaveButton } from '../SaveButton/SaveButton';
import { useDispatch, useSelector } from 'react-redux';
import { initialState, searchUsers, selectFilters, updateFilters } from '../../features/Users/users-slice';
import { MdOutlineCleaningServices } from 'react-icons/md';
import { TypedDispatch } from '../../store';

const Container = styled.div`
	margin: 20px;
`;

const TitleWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	& > h3 {
		margin-left: 50%;
		transform: translateX(-50%);
	}
`;

const ClearIcon = styled(MdOutlineCleaningServices)<any>`
  cursor: pointer;
	&:hover {
		color: #FF0000FF;
	}
`;

const FilterWrapper = styled.div`
  box-shadow: 0 4px 4px rgba(0, 0, 0, .2);
  padding: 20px;
  border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	& > label {
		width: 30%;
	}
	& > div {
    width: 70%;
    display: flex;
		flex-direction: column;
		gap: 10px;
	}
  & > div > select,
  & > div > input {
		height: 30px;
		align-self: end;
		border-radius: 5px;
  }
`;

export const Select = styled.select<any>`
	width: 70%;
	outline: none;
  border:0;
  box-shadow: 0 4px 4px 2px rgba(0, 0, 0, .1);
`;

export const FilterModal = ({ closeModal }: FilterModalProps) => {
	const filters = useSelector(selectFilters);
	const dispatch = useDispatch<TypedDispatch>();
	const [stateFilters, setStateFilters] = useState(filters);

	const saveFilterHandler = () => {
		closeModal();
		dispatch(updateFilters(stateFilters));
		dispatch(searchUsers());
	}

	const onChangeHandler = (e, name) => {
		setStateFilters(state => ({...state, [name]: e.target.value}))
	}

	const resetFilters = () => {
		setStateFilters(initialState.filters);
	}

	return (
		<Modal
			onClick={closeModal}
		>
			<Container>
				<TitleWrapper>
					<h3>Filters</h3>
					<ClearIcon onClick={resetFilters} />
				</TitleWrapper>
				<FilterWrapper>
					<label>Status</label>
					<div>
						<Select onChange={(e) => onChangeHandler(e, 'status')} value={stateFilters.status}>
							<option value={'all'}>All</option>)
							<option value={'active'}>Active</option>)
							<option value={'inactive'}>Inactive</option>)
						</Select>
					</div>
				</FilterWrapper>
				<FilterWrapper>
					<label>Age range</label>
					<div>
						<Input value={stateFilters.ageFrom} onChange={(e) => onChangeHandler(e, 'ageFrom')} type="number" placeholder='from'/>
						<Input value={stateFilters.ageTo} onChange={(e) => onChangeHandler(e, 'ageTo')} type="number" placeholder='to'/>
					</div>
				</FilterWrapper>
				<FilterWrapper>
					<label>Balance range</label>
					<div>
						<Input value={stateFilters.balanceFrom} onChange={(e) => onChangeHandler(e, 'balanceFrom')} type="number" placeholder='from'/>
						<Input value={stateFilters.balanceTo} onChange={(e) => onChangeHandler(e, 'balanceTo')} type="number" placeholder='to'/>
					</div>
				</FilterWrapper>
			</Container>
			<SaveButton onClick={saveFilterHandler}>SAVE</SaveButton>
		</Modal>
	);
};
