import React, { useState } from 'react';
import styled from 'styled-components';
import { IoOptionsOutline } from 'react-icons/io5';
import { FilterModal } from '../FilterModal/FilterModal';

const FilterIcon = styled(IoOptionsOutline)`
	position: absolute;
	top: 40px;
	right: 30px;
	font-size: 20px;
	cursor: pointer;
`;

export const FilterButton = () => {
	const [showFilterModal, setShowFilterModal] = useState(false);

	const filterHandler = () => {
		console.log('openFilter');
		setShowFilterModal(true);
	}

	const closeFilterModal = () => {
		setShowFilterModal(false);
	}

	return (
		<>
			<FilterIcon onClick={filterHandler} />
			{showFilterModal && <FilterModal closeModal={closeFilterModal}/>}
		</>
	);
};

