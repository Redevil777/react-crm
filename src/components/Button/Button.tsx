import React from 'react';
import { ButtonProps } from './Button.props';
import styled from 'styled-components';

const ButtonCmp = styled.button`
	border: none;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Button = ({ className, onClick, children }: ButtonProps) => {
	return (
		<ButtonCmp onClick={onClick} className={className}>
			{children}
		</ButtonCmp>
	);
};

