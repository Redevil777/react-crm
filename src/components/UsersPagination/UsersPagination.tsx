import React from 'react';
import styled from 'styled-components';
import Select from 'react-select'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 30px 15px;
	border-radius: 5px;
  background-color: #FAFBFF;
	margin-top: 100px;
`;

const PaginationInfo = styled.span`
	
`;

const PaginationCtrl = styled.div`
	display: flex;
	gap: 40px;
`;

const RowsPicker = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const PaginationButtons = styled.div`
	display: flex;
	gap: 10px;
`;

const Arrow = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	background-color: #FFF;
	border-radius: 8px;
	border: .5px solid rgba(0, 0, 0, .2);
`;

const ArrowLeftIcon = styled(FiArrowLeft)`
	font-size: 20px;
`;

const ArrowRightIcon = styled(FiArrowRight)`
	font-size: 20px;
`;

const selectOptions = [
	{ value: 5, label: 5 },
	{ value: 10, label: 10 },
	{ value: 15, label: 15 },
	{ value: 20, label: 20 },
];

const customStyles = {
	// @ts-ignore
	control: styles => ({ ...styles, backgroundColor: 'white' }),
	// @ts-ignore
	singleValue: (provided, state) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = 'opacity 300ms';

		return { ...provided, opacity, transition };
	}
}

export const UsersPagination = () => {
	return (
		<Container>
			<PaginationInfo>
				1-5 of 23
			</PaginationInfo>
			<PaginationCtrl>
				<RowsPicker>
					Rows per page:
					<Select
						styles={customStyles}
						value={selectOptions[0]}
						options={selectOptions}
					/>
				</RowsPicker>
				<PaginationButtons>
					<Arrow>
						<ArrowLeftIcon />
					</Arrow>
					<Arrow>
						<ArrowRightIcon />
					</Arrow>
				</PaginationButtons>
			</PaginationCtrl>
		</Container>
	);
};
