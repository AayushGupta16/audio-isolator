import React from 'react';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Spinner = styled.div`
  width: 1.5em;
  height: 1.5em;
  border: 0.2em solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: btn-loading-spinner 0.75s linear infinite;
  color: #007bff;

  @keyframes btn-loading-spinner {
    to {
      transform: rotate(1turn);
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.p`
  color: #007bff;
  font-weight: bold;
  margin-left: 10px;
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>Loading...</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;
