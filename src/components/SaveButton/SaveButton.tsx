import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { SaveButtonProps } from './SaveButton.props';

const SaveBtn = styled<any>(Button)`
  margin: 50px auto 10px;
  background-color: #498249;
  color: #FFF;
  width: 200px;
  padding: 15px;
  border-radius: 5px;
	font-size: 16px;

  &:hover {
    background-color: #4e8c4e;
  }
`;

export const SaveButton = ({ ...props }: SaveButtonProps) => {
	return <SaveBtn { ...props }>SAVE</SaveBtn>;
};
