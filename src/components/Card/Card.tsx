import React from 'react';
import { CardProps } from './Card.props';
import styled from 'styled-components';

const Container = styled.div`
	background-color: #FFF;
	border-radius: 15px;
	padding: 40px;
`;

export const Card = ({ children }: CardProps) => {
	return (
		<Container>
			{ children }
		</Container>
	);
};
