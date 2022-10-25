import React from 'react';
import styled, { keyframes } from 'styled-components';

const hitZak = keyframes`
  0% {
    left: 0;
    transform: translateX(-1%);
  }
  100% {
    left: 100%;
    transform: translateX(-99%);
  }
`;

const LoaderMock = styled.div`
  height: 4px;
  width: 100%;
	display: inline-block;
`;

const LoaderSpan = styled.span`
  width: 100%;
  height: 4px;
  display: inline-block;
  position: relative;
  overflow: hidden;
  background-color: #BABCC6;
	&:after {
    content: '';
    background-color: #FFF;
    width: 100px;
    height: 4px;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    animation: ${hitZak} 0.6s ease-in-out infinite alternate
	}
`;

export const Loader = ({ isShow }) => {
	return isShow ? <LoaderSpan /> : <LoaderMock />;
};
