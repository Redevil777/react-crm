import React from 'react';
import Modal from '../Modal/Modal';
import { FilterModalProps } from './FilterModal.props';
import styled from 'styled-components';
import { Input } from '../UserInputForm/UserInputForm';

const Container = styled.div`
	padding: 100px;
`;

const Label = styled.label`
  box-shadow: 0 4px 4px rgba(0, 0, 0, .2);
	padding: 20px;
	border-radius: 10px;
  display: flex;
	justify-content: space-between;
`;

const RangeWrapper = styled.div`
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
  & > div > input {
		align-self: end;
  }
`;

export const FilterModal = ({ closeModal }: FilterModalProps) => {
	return (
		<Modal
			onClick={closeModal}
		>
			<Container>
				<Label>
					Show only active users
					<input type="checkbox"/>
				</Label>
				<RangeWrapper>
					<label>Age range</label>
					<div>
						<Input type="number" placeholder='from'/>
						<Input type="number" placeholder='to'/>
					</div>
				</RangeWrapper>
				<RangeWrapper>
					<label>Balance range</label>
					<div>
						<Input type="number" placeholder='from'/>
						<Input type="number" placeholder='to'/>
					</div>
				</RangeWrapper>
			</Container>
		</Modal>
	);
};
